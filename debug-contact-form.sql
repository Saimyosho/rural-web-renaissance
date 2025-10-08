-- DEBUG SCRIPT FOR CONTACT FORM
-- Run this in Supabase SQL Editor to diagnose the issue

-- 1. Check if RLS policies exist and are correct
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'contact_submissions';

-- 2. Check if any triggers exist (these might be causing errors)
SELECT 
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'contact_submissions';

-- 3. Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'contact_submissions'
ORDER BY ordinal_position;

-- 4. Try a test insert (this will tell us exactly what's wrong)
-- Comment out the lines below after running queries above
/*
INSERT INTO contact_submissions (name, email, company, message, interested_in)
VALUES ('Test User', 'test@example.com', 'Test Co', 'Test message', 'Test inspiration');
*/

-- If the test insert works, the issue is the trigger
-- If it fails, the issue is RLS or table structure

-- ============================================
-- SOLUTION: Disable trigger temporarily
-- ============================================
-- Run this if trigger exists and is causing errors:

DROP TRIGGER IF EXISTS on_contact_submission ON contact_submissions;
DROP FUNCTION IF EXISTS notify_new_contact();

-- After running this, test the contact form again
-- It should work and save data (just won't send AI emails yet)
