-- Update all existing free tier users to 3 generation limit
-- Run this in Supabase SQL Editor

UPDATE user_profiles 
SET generation_limit = 3
WHERE tier = 'free' 
AND generation_limit != 3;

-- Verify the update
SELECT 
  id,
  tier,
  generation_count,
  generation_limit,
  role
FROM user_profiles
WHERE tier = 'free';
