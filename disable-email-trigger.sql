-- Temporarily disable the email trigger
-- This allows contact form to work without AI/email features

-- Drop the trigger (this stops the error)
DROP TRIGGER IF EXISTS on_contact_submission ON contact_submissions;

-- Drop the function too (optional, for cleanliness)
DROP FUNCTION IF EXISTS notify_new_contact();

-- ✅ CONTACT FORM WILL NOW WORK!
-- Data will save to contact_submissions table
-- You can view submissions in Supabase Table Editor

-- To check your submissions:
-- Go to Supabase → Table Editor → contact_submissions

-- When you're ready to enable AI emails later:
-- Run the SQL from supabase-email-setup.sql
-- But for now, this fixes the "something went wrong" error
