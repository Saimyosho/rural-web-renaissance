-- Add role column to user_profiles for superadmin support
-- Migration: Add role and update generation limits for superadmin

-- Add role column with default 'user'
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- Create index for role queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- Comment on the role column
COMMENT ON COLUMN user_profiles.role IS 'User role: user, pro, superadmin';

-- Grant superadmin unlimited generations (will be set after signup)
-- Superadmin accounts will have generation_limit set to 999999

-- Note: After Sheldon Gunby (Dachiznit@gmail.com) signs up, run:
-- UPDATE user_profiles 
-- SET role = 'superadmin', generation_limit = 999999 
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'Dachiznit@gmail.com');
