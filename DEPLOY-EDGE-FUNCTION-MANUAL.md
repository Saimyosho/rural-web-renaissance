# 🚀 Deploy AI Edge Function - Manual Method (No CLI Needed)

Since Supabase CLI installation isn't working, use this **easier manual method** via the Supabase Dashboard!

---

## ✅ Manual Deployment Steps (5 minutes)

### **Step 1: Get Your API Keys**

#### **1a. Get Resend API Key**
1. Go to https://resend.com
2. Sign up (FREE - 100 emails/day)
3. Click "API Keys"
4. Create new API key
5. **Copy it** (starts with `re_...`)

#### **1b. Get Your Gemini API Key**
1. Go to https://console.cloud.google.com/apis/credentials
2. Create or select a project
3. Click "Create Credentials" → "API Key"
4. Copy your API key

---

### **Step 2: Add Secrets to Supabase**

1. Go to https://supabase.com/dashboard
2. Select your project: **lceafhcfdpreqoxepqcm**
3. Click **Edge Functions** in left sidebar
4. Click **Manage Secrets** (or Settings → Edge Functions)
5. Add two secrets:

```
Secret 1:
Name: RESEND_API_KEY
Value: [paste your Resend API key from Step 1a]

Secret 2:
Name: GEMINI_API_KEY
Value: [paste your Gemini API key from Step 1b]
```

6. Click **Save**

---

### **Step 3: Create Edge Function Manually**

1. Still in **Edge Functions** section
2. Click **Create a new function**
3. Name it: `send-contact-notification`
4. In the code editor, **delete all existing code**
5. Open your local file: `supabase/functions/send-contact-notification/index.ts`
6. **Copy ALL the code** from that file
7. **Paste it** into the Supabase editor
8. Click **Deploy function**
9. Wait for deployment to complete (~30 seconds)

---

### **Step 4: Set Up Database Trigger**

1. In Supabase Dashboard, click **SQL Editor**
2. Click **New query**
3. Paste this SQL (with YOUR values filled in):

```sql
-- Enable pg_net extension for HTTP calls
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to trigger Edge Function
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://lceafhcfdpreqoxepqcm.supabase.co/functions/v1/send-contact-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZWFmaGNmZHByZXFveGVwcWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzQ3MzksImV4cCI6MjA3NTIxMDczOX0.OtkRRczVyPx2ETI_JXRDsCDxZLrkdevnbrv2Jp_Lxvc'
      ),
      body := jsonb_build_object(
        'record', row_to_json(NEW)
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on contact_submissions
DROP TRIGGER IF EXISTS on_contact_submission ON contact_submissions;

CREATE TRIGGER on_contact_submission
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();
```

4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

---

### **Step 5: Test It!**

1. Go to your live website: https://rural-web-renaissance-r1y4wyk13-dachiznit-2813s-projects.vercel.app
2. Scroll to contact form
3. Fill it out with test data:
   ```
   Name: Test User
   Email: test@example.com
   Business: Test Business
   Message: This is a test of the AI system
   Inspiration 1: https://example.com
   Inspiration 2: https://example2.com
   ```
4. Click "Send Message"
5. **Check your email:** Dachiznit@gmail.com
6. You should receive:
   - ✅ AI analysis email with Claude prompts
   - ✅ Confirmation email

---

## 🔍 Troubleshooting

### **Not Receiving Emails?**

1. **Check Edge Function Logs:**
   - Dashboard → Edge Functions
   - Click `send-contact-notification`
   - Click **Logs** tab
   - Look for errors

2. **Check Secrets Are Set:**
   - Dashboard → Edge Functions → Manage Secrets
   - Verify `RESEND_API_KEY` and `GEMINI_API_KEY` are there

3. **Check Spam Folder:**
   - Sometimes first email goes to spam

4. **Verify Trigger Is Active:**
   - Dashboard → SQL Editor
   - Run: `SELECT * FROM pg_trigger WHERE tgname = 'on_contact_submission';`
   - Should return one row

5. **Test Edge Function Directly:**
   - Dashboard → Edge Functions
   - Click `send-contact-notification`
   - Click **Invoke** tab
   - Paste test payload:
   ```json
   {
     "record": {
       "name": "Test",
       "email": "test@example.com",
       "message": "Test message",
       "company": "Test Co",
       "created_at": "2025-01-07T22:00:00Z"
     }
   }
   ```
   - Click **Invoke**
   - Check logs for errors

### **Gemini Analysis Not Working?**

The system has fallback - even if Gemini fails, you'll still get:
- Email notification
- Basic analysis
- Claude prompts
- Auto-reply sent

Check Edge Function logs to see Gemini error if any.

### **Auto-Reply Not Sending?**

1. Check Resend dashboard: https://resend.com/emails
2. Look for delivery status
3. Verify prospect's email is valid

---

## ✅ Success Checklist

- [ ] Signed up for Resend
- [ ] Got Resend API key
- [ ] Added RESEND_API_KEY to Supabase
- [ ] Added GEMINI_API_KEY to Supabase
- [ ] Created Edge Function manually
- [ ] Deployed Edge Function
- [ ] Ran SQL trigger
- [ ] Tested with contact form
- [ ] Received analysis email
- [ ] 🎉 System working!

---

## 📧 What You'll Receive

Every time someone fills out your contact form, you get:

### **Email Subject:**
```
🔥🔥 HOT LEAD: [Name] - [Project Type] (Time estimate)
```

### **Email Contains:**
- 📊 6 Quick Stats (Score, Fit, Time, Value, Complexity, Temperature)
- 👤 Full contact information
- 💬 Their complete message
- 🔥 Why this lead is hot/warm/cold
- ⚠️ Red flags to watch for
- 🎯 Opportunities for upselling
- ✅ MVP features to build
- ⭐ Nice-to-have features
- 💎 Premium features
- 🛠️ Tech stack recommendations
- ⚡ Quick Claude prompt (1-2 hours)
- 🎯 Standard Claude prompt (3-5 hours) ← **COPY THIS**
- 💎 Premium Claude prompt (6-8 hours)
- ❓ Follow-up questions (if needed)
- 🎬 Action buttons (Open Claude, View DB, Email prospect)

### **Prospect Receives:**
Professional auto-reply confirming receipt and setting expectations.

---

## 🎯 How to Use

1. Get the email
2. Check the lead score (9-10 = hot)
3. Copy the STANDARD Claude prompt
4. Paste into Claude 4.5 Sonnet
5. Review generated code
6. Deploy to Vercel
7. Share with prospect
8. Add to portfolio!

---

## 💰 Cost

**$0/month** with your volume:
- Resend: FREE (100 emails/day, you'll use ~1-5/day)
- Gemini: FREE (50 requests/day, you'll use ~1-5/day)
- Supabase Edge Functions: FREE (500K calls/month)

---

## 🚀 You're Done!

No CLI needed - everything done through the dashboard!

Your AI-powered lead qualification system is now live! 🎉
