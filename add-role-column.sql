-- Add role column to existing user_profiles table
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- Create index for faster role queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- Show confirmation
SELECT 'Role column added successfully!' as status;
