-- =====================================================
-- EMAIL NOTIFICATION SETUP FOR CONTACT FORM
-- =====================================================

-- This sets up automatic email notifications when someone
-- submits the contact form. You'll get instant emails!

-- STEP 1: Create the database webhook trigger
-- This automatically calls your Edge Function when a new row is inserted

CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function via pg_net (Supabase's HTTP client)
  PERFORM
    net.http_post(
      url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-contact-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer YOUR_SUPABASE_ANON_KEY'
      ),
      body := jsonb_build_object(
        'record', row_to_json(NEW)
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 2: Create the trigger
DROP TRIGGER IF EXISTS on_contact_submission ON contact_submissions;

CREATE TRIGGER on_contact_submission
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();

-- =====================================================
-- MANUAL SETUP INSTRUCTIONS:
-- =====================================================

/*

EASY 3-STEP SETUP TO GET EMAIL NOTIFICATIONS:

1️⃣ GET A FREE RESEND API KEY:
   - Go to https://resend.com
   - Sign up (free tier = 100 emails/day)
   - Create an API key
   - Copy the key (starts with re_...)

2️⃣ ADD TO SUPABASE:
   - Go to your Supabase Dashboard
   - Project Settings > Edge Functions
   - Add Secret: Name = RESEND_API_KEY, Value = your_key
   
3️⃣ DEPLOY THE EDGE FUNCTION:
   In your terminal, run:
   
   npx supabase functions deploy send-contact-notification
   
   (You'll need Supabase CLI installed: npm install -g supabase)

4️⃣ UPDATE THIS SQL:
   - Replace YOUR_PROJECT_REF with your actual project ref
   - Replace YOUR_SUPABASE_ANON_KEY with your anon key
   - Run this SQL in Supabase SQL Editor

DONE! You'll now get emails whenever someone contacts you! 📧

---

ALTERNATIVE: Simpler Setup (No Edge Functions)
If you don't want to set up Edge Functions, you can:

Option A: Use Supabase Webhooks (in Dashboard)
   - Database > Webhooks
   - Create webhook for INSERT on contact_submissions
   - Use services like Zapier, Make.com, or IFTTT
   
Option B: Check Dashboard Periodically
   - Set a daily reminder to check Supabase
   - Table Editor > contact_submissions
   - View all submissions

Option C: Use Supabase Realtime (Advanced)
   - Subscribe to database changes in real-time
   - Get browser notifications
   
*/
