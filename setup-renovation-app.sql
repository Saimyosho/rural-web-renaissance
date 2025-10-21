-- AI Renovation App Complete Setup Script
-- Run this in Supabase SQL Editor or via CLI

-- 1. Add role column to user_profiles
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- 2. Create Supabase Storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('renovation-images', 'renovation-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up storage policies
-- Allow users to upload their own images
CREATE POLICY IF NOT EXISTS "Users can upload own images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'renovation-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to view their own images
CREATE POLICY IF NOT EXISTS "Users can view own images"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'renovation-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own images
CREATE POLICY IF NOT EXISTS "Users can delete own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'renovation-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 4. Grant superadmin to Sheldon Gunby (Dachiznit@gmail.com)
-- NOTE: This will only work after you sign up with this email
-- If the user doesn't exist yet, this will silently fail (that's okay)
UPDATE user_profiles 
SET 
  role = 'superadmin', 
  generation_limit = 999999,
  generation_count = 0
WHERE id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'Dachiznit@gmail.com'
);

-- 5. Show confirmation
SELECT 
  'Setup complete!' as status,
  COUNT(*) FILTER (WHERE role = 'superadmin') as superadmin_count,
  COUNT(*) as total_users
FROM user_profiles;

-- If you haven't signed up yet, run this AFTER signing up:
-- UPDATE user_profiles 
-- SET role = 'superadmin', generation_limit = 999999 
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'Dachiznit@gmail.com');
