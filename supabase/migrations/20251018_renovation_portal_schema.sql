-- Renovation Portal Database Schema
-- Migration: Initial schema for AI Renovation Portal

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Projects table - stores renovation projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  client_name text,
  location text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Renovation images table - stores before/after image pairs
create table if not exists renovation_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  original_image_url text not null,
  generated_image_url text,
  prompt text not null,
  model_used text default 'stabilityai/stable-diffusion-xl-base-1.0',
  created_at timestamp with time zone default now()
);

-- User profiles table - extended user information
create table if not exists user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_name text,
  phone text,
  tier text default 'free', -- free, pro, enterprise
  generation_count integer default 0,
  generation_limit integer default 3, -- free tier limit (strict)
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Usage tracking table - track AI generation usage
create table if not exists generation_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  image_id uuid references renovation_images(id) on delete set null,
  generation_type text not null, -- 'text-to-image' or 'image-to-image'
  tokens_used integer,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table projects enable row level security;
alter table renovation_images enable row level security;
alter table user_profiles enable row level security;
alter table generation_usage enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view own projects" on projects;
drop policy if exists "Users can create own projects" on projects;
drop policy if exists "Users can update own projects" on projects;
drop policy if exists "Users can delete own projects" on projects;

drop policy if exists "Users can view own images" on renovation_images;
drop policy if exists "Users can create own images" on renovation_images;
drop policy if exists "Users can update own images" on renovation_images;
drop policy if exists "Users can delete own images" on renovation_images;

drop policy if exists "Users can view own profile" on user_profiles;
drop policy if exists "Users can update own profile" on user_profiles;

drop policy if exists "Users can view own usage" on generation_usage;

-- Projects policies
create policy "Users can view own projects"
  on projects for select
  using (auth.uid() = user_id);

create policy "Users can create own projects"
  on projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on projects for update
  using (auth.uid() = user_id);

create policy "Users can delete own projects"
  on projects for delete
  using (auth.uid() = user_id);

-- Renovation images policies
create policy "Users can view own images"
  on renovation_images for select
  using (auth.uid() = user_id);

create policy "Users can create own images"
  on renovation_images for insert
  with check (auth.uid() = user_id);

create policy "Users can update own images"
  on renovation_images for update
  using (auth.uid() = user_id);

create policy "Users can delete own images"
  on renovation_images for delete
  using (auth.uid() = user_id);

-- User profiles policies
create policy "Users can view own profile"
  on user_profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on user_profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on user_profiles for insert
  with check (auth.uid() = id);

-- Generation usage policies
create policy "Users can view own usage"
  on generation_usage for select
  using (auth.uid() = user_id);

create policy "Users can insert own usage"
  on generation_usage for insert
  with check (auth.uid() = user_id);

-- Function to create user profile automatically on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, tier, generation_count, generation_limit)
  values (new.id, 'free', 0, 3);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
drop trigger if exists update_projects_updated_at on projects;
create trigger update_projects_updated_at
  before update on projects
  for each row execute procedure update_updated_at_column();

drop trigger if exists update_user_profiles_updated_at on user_profiles;
create trigger update_user_profiles_updated_at
  before update on user_profiles
  for each row execute procedure update_updated_at_column();

-- Indexes for better query performance
create index if not exists idx_projects_user_id on projects(user_id);
create index if not exists idx_renovation_images_user_id on renovation_images(user_id);
create index if not exists idx_renovation_images_project_id on renovation_images(project_id);
create index if not exists idx_generation_usage_user_id on generation_usage(user_id);

-- Grant access to authenticated users
grant usage on schema public to authenticated;
grant all on all tables in schema public to authenticated;
grant all on all sequences in schema public to authenticated;
