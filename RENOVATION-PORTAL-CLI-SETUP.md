# AI Renovation Portal - Supabase CLI Setup Guide

Quick guide to set up the database using Supabase CLI.

## 🚨 Important: Unpause Your Project First

Your Supabase project is currently **paused**. Before running any commands:

1. Go to https://supabase.com/dashboard/project/lceafhcfdpreqoxepqcm
2. Click **"Restore project"** or **"Unpause"**
3. Wait for the project to become active (usually takes 1-2 minutes)

## ✅ Step 1: Link Your Project

Once your project is active, link the CLI to your remote database:

```bash
npx supabase link --project-ref lceafhcfdpreqoxepqcm
```

You'll be prompted for your database password. Find it here:
- Dashboard → Settings → Database → Database password
- Or use your Supabase account password

## ✅ Step 2: Push Migration to Remote Database

Once linked, push the migration:

```bash
npx supabase db push
```

This will:
- Create all tables (projects, renovation_images, user_profiles, generation_usage)
- Set up Row Level Security policies
- Create triggers for auto-profile creation
- Add indexes for performance

## ✅ Step 3: Verify Migration

Check that everything was created:

```bash
npx supabase db diff --schema public
```

Or go to your dashboard:
- Dashboard → Table Editor - Should see your new tables
- Dashboard → Database → Policies - Should see RLS policies

## 🗄️ What Gets Created:

### Tables:
- ✅ `projects` - Contractor project data
- ✅ `renovation_images` - Before/after images
- ✅ `user_profiles` - User info and usage limits
- ✅ `generation_usage` - AI generation tracking

### Security:
- ✅ Row Level Security on all tables
- ✅ Users can only access their own data
- ✅ Automatic profile creation trigger

### Performance:
- ✅ Indexes on foreign keys
- ✅ Updated_at triggers

## 📦 Alternative: Manual SQL Method

If CLI doesn't work, you can still use the SQL Editor:

1. Go to Dashboard → SQL Editor
2. Click "New Query"
3. Copy content from `supabase/migrations/20251018_renovation_portal_schema.sql`
4. Paste and click "Run"

## 🔐 Create Storage Bucket

The migration creates tables, but you need to manually create the storage bucket:

```bash
npx supabase storage create renovation-images --public=false
```

Or in Dashboard:
1. Go to Storage
2. Click "Create a new bucket"
3. Name: `renovation-images`
4. Public: **Uncheck** (keep private)
5. Click "Create bucket"

### Add Storage Policies:

Run this in SQL Editor after creating the bucket:

```sql
-- Upload policy
CREATE POLICY "Users can upload own images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'renovation-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- View policy
CREATE POLICY "Users can view own images"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'renovation-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Delete policy
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'renovation-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

## ✅ Test the Setup

After migration, test authentication:

```bash
npm run dev
```

Then:
1. Visit `http://localhost:5173/signup`
2. Create a test account
3. Check Dashboard → Authentication → Users
4. Check Table Editor → user_profiles (should auto-create)

## 🐛 Troubleshooting

### "Project is paused"
- Unpause from dashboard
- Free tier projects auto-pause after 7 days of inactivity
- Simply restore/unpause to continue

### "Failed to connect"
- Verify project is unpaused
- Check your database password
- Try resetting password in Dashboard → Settings → Database

### "Migration already applied"
- Migration uses `create table if not exists`
- Safe to run multiple times
- Won't duplicate data

### Can't create storage bucket via CLI
- Create manually in Dashboard → Storage
- Then add policies via SQL Editor

## 📋 Quick Reference

```bash
# Link project
npx supabase link --project-ref lceafhcfdpreqoxepqcm

# Push migration
npx supabase db push

# Create storage bucket
npx supabase storage create renovation-images --public=false

# Check status
npx supabase status

# View logs
npx supabase logs
```

## 🎯 Next Steps

Once migration is complete:

1. ✅ Database tables created
2. ✅ Storage bucket created
3. ✅ Test authentication working
4. → Build Dashboard page
5. → Build AI Generator tool
6. → Build Project Management

---

**Migration file**: `supabase/migrations/20251018_renovation_portal_schema.sql`
**Status**: Ready to deploy once project is unpaused
