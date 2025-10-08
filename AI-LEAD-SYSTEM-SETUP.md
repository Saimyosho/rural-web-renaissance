# 🤖 AI-Powered Lead Qualification System - Setup Guide

## What You're Getting

An intelligent system that automatically:
1. ✅ Analyzes every contact form submission with Gemini AI
2. ✅ Scores leads (1-10) and categorizes (Hot/Warm/Cold)
3. ✅ Generates 3 ready-to-use Claude 4.5 Sonnet prompts
4. ✅ Sends you a beautiful HTML email with full analysis
5. ✅ Auto-replies to prospects professionally
6. ✅ Includes project scoping, tech stack recommendations, and more

---

## 📧 What Your Emails Will Look Like

### **Email to YOU (Dachiznit@gmail.com):**
```
Subject: 🔥🔥🔥 HOT LEAD: Sarah Miller - Restaurant Website (3-5 hours)

📊 QUICK STATS:
- Lead Score: 9/10
- Portfolio Fit: 10/10
- Time: 3-5 hours
- Value: $2,000-3,000
- Complexity: Medium
- Temperature: HOT

👤 CONTACT INFO:
Name: Sarah Miller
Email: sarah@westmontcafe.com
Business: Westmont Cafe

💬 THEIR MESSAGE:
[Full message]

🔥 WHY THIS LEAD IS HOT:
✅ Clear requirements
✅ Local business (Johnstown!)
✅ Portfolio-worthy project
✅ Realistic scope

✅ MVP FEATURES TO BUILD:
✅ Hero section with photos
✅ Interactive menu
✅ Online ordering
✅ Location/hours
✅ Contact form

⭐ NICE-TO-HAVE:
⭐ Instagram feed
⭐ Newsletter signup

💎 PREMIUM UPSELL:
💎 Animations
💎 SEO optimization
💎 Performance tuning

🛠️ TECH STACK:
Framework: React + Vite + TypeScript
Styling: Tailwind CSS + Shadcn/ui
Backend: Supabase
Deployment: Vercel

⚡ QUICK VERSION PROMPT (2 hours):
[Copy-paste ready prompt for fast build]

🎯 STANDARD VERSION PROMPT (4 hours) ← RECOMMENDED:
[Full copy-paste ready prompt - COPY THIS ONE]

💎 PREMIUM VERSION PROMPT (6 hours):
[Enhanced copy-paste ready prompt]

✅ NEXT STEPS:
1. Copy STANDARD prompt
2. Paste into Claude 4.5 Sonnet
3. Deploy to Vercel
4. Share with Sarah
5. Add to portfolio!

[Open Claude] [View in Supabase] [Email Sarah]

✨ Auto-reply sent to Sarah confirming receipt!
```

### **Auto-Reply to PROSPECT:**
```
Subject: Thanks for reaching out, Sarah!

✨ Message Received!

Hi Sarah,

Thanks for contacting me about your Westmont Cafe website! 
I've received your request and I'm excited about the 
opportunity to work together.

What happens next:
1. I'm reviewing your request right now
2. You'll hear from me within 24 hours
3. I'll share a proposal and timeline
4. We'll discuss any questions you have

Looking forward to building something amazing for your 
business!

Sheldon Gunby
Web Developer
Johnstown, PA
```

---

## 🚀 Setup Instructions

### **Step 1: Get Resend API Key**

1. Go to https://resend.com
2. Sign up (FREE - 100 emails/day)
3. Click "API Keys"
4. Create new API key
5. Copy it (starts with `re_...`)

**Cost:** FREE forever (100 emails/day is plenty)

---

### **Step 2: Add API Keys to Supabase**

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Settings** → **Edge Functions** → **Secrets**
4. Add two secrets:

```
Secret 1:
Name: RESEND_API_KEY
Value: [Your Resend API Key from resend.com]

Secret 2:
Name: GEMINI_API_KEY
Value: [Your Gemini API Key from Google Cloud Console]
```

⚠️ **SECURITY NOTE:** The Gemini key you provided is now in our conversation. 
I recommend rotating it after setup for security.

---

### **Step 3: Deploy the Edge Function**

#### **Option A: Using Supabase CLI (Recommended)**

```bash
# Install Supabase CLI (one time only)
npm install -g supabase

# Login to Supabase
npx supabase login

# Link your project (replace YOUR_PROJECT_REF with your actual project ref)
npx supabase link --project-ref YOUR_PROJECT_REF

# Deploy the function
npx supabase functions deploy send-contact-notification

# Success! Function is live.
```

#### **Option B: Manual Upload (If CLI doesn't work)**

1. Go to Supabase Dashboard
2. Click **Edge Functions**
3. Click **New Function**
4. Name: `send-contact-notification`
5. Copy the entire content from:
   `supabase/functions/send-contact-notification/index.ts`
6. Paste into the editor
7. Click **Deploy**

---

### **Step 4: Set Up Database Trigger**

1. Go to Supabase Dashboard → **SQL Editor**
2. Create new query
3. Paste this SQL:

```sql
-- Enable pg_net extension for HTTP calls
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to trigger Edge Function
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
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

-- Create trigger on contact_submissions
DROP TRIGGER IF EXISTS on_contact_submission ON contact_submissions;

CREATE TRIGGER on_contact_submission
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();
```

4. **Replace placeholders:**
   - `YOUR_PROJECT_REF` → Find in Settings → API → Project URL
   - `YOUR_SUPABASE_ANON_KEY` → Find in Settings → API → anon/public key

5. Click **Run**

---

### **Step 5: Test It!**

1. Go to your website
2. Fill out contact form
3. Submit it
4. Check Dachiznit@gmail.com
5. You should receive TWO emails:
   - ✅ Your analysis email (with Claude prompts)
   - ✅ Confirmation that auto-reply was sent

6. Check the prospect's email
   - ✅ They should receive professional auto-reply

---

## 🎯 What Each Email Contains

### **Your Analysis Email Includes:**

1. **Quick Stats Dashboard**
   - Lead Score (1-10)
   - Portfolio Fit (1-10)
   - Time Estimate
   - Market Value
   - Complexity
   - Temperature

2. **Contact Information**
   - Name, Email, Business
   - Their full message
   - What they're interested in
   - Timestamp

3. **AI Analysis**
   - Why this lead is Hot/Warm/Cold
   - Red flags to watch
   - Opportunities for upselling

4. **Feature Breakdown**
   - MVP features (must build)
   - Nice-to-have features
   - Premium features for upselling

5. **Tech Stack Recommendations**
   - Framework suggestion
   - Styling approach
   - Backend choice
   - Deployment platform
   - Design style
   - Color palette

6. **Three Claude Prompts**
   - ⚡ Quick (1-2 hours)
   - 🎯 Standard (3-5 hours) ← **RECOMMENDED**
   - 💎 Premium (6-8 hours)

7. **Follow-Up Questions**
   - Pre-written questions if clarification needed

8. **Action Buttons**
   - Open Claude
   - View in Supabase
   - Email prospect directly

---

## 🤖 How Gemini Analyzes Each Lead

Gemini AI evaluates:

1. **Lead Quality** (1-10 scoring)
2. **Project Complexity** (Simple/Medium/Complex)
3. **Time Required** (Realistic hours estimate)
4. **Market Value** (What it's worth professionally)
5. **Portfolio Fit** (How good for your portfolio)
6. **Red Flags** (Issues to watch for)
7. **Opportunities** (Upselling potential)
8. **Tech Stack** (Best tools for the job)
9. **Feature Prioritization** (MVP vs Nice-to-Have vs Premium)
10. **Claude Prompts** (3 variations ready to use)
11. **Follow-Up Questions** (If clarification needed)
12. **Auto-Reply Message** (Professional response)

---

## 💡 How to Use This System

### **When You Get a Lead Email:**

1. **Check the Score** (9-10 = Drop everything, 7-8 = Today, 5-6 = This week)
2. **Review Red Flags** (Any deal-breakers?)
3. **Check Time Estimate** (Do you have time?)
4. **Copy the STANDARD Claude Prompt** (Usually the best choice)
5. **Open Claude 4.5 Sonnet**
6. **Paste the prompt**
7. **Review generated code**
8. **Deploy to Vercel**
9. **Share preview link with prospect**
10. **Add to portfolio!**

---

## 🔧 Troubleshooting

### **Not Receiving Emails?**

1. Check Supabase Edge Functions logs
2. Verify RESEND_API_KEY is set correctly
3. Verify GEMINI_API_KEY is set correctly
4. Check spam folder
5. Verify trigger is active: `SELECT * FROM pg_trigger WHERE tgname = 'on_contact_submission';`

### **Auto-Reply Not Sending?**

1. Check Resend dashboard for delivery status
2. Verify prospect's email is valid
3. Check Edge Function logs for errors

### **Gemini Analysis Failing?**

The system has fallback analysis if Gemini fails:
- Returns sensible defaults
- Logs error for debugging
- Still generates Claude prompts
- Email still sent

### **Need to Update the Prompts?**

Edit the `analyzeWithGemini` function in:
`supabase/functions/send-contact-notification/index.ts`

Then redeploy: `npx supabase functions deploy send-contact-notification`

---

## 📊 Cost Breakdown

| Service | Free Tier | Cost After Free |
|---------|-----------|-----------------|
| Resend | 100 emails/day | $0.10/1000 emails |
| Gemini | 50 requests/day | $0.00035/request |
| Supabase | 500K Edge Function calls | Free forever |

**Your monthly cost:** $0 (with your volume)

---

## 🎨 Customization Options

### **Want Different Email Style?**

Edit the HTML template in the Edge Function (line 208+)

### **Want Different Gemini Analysis?**

Edit the `analysisPrompt` variable (line 47-114)

### **Want to Change Auto-Reply Message?**

Gemini generates it automatically, or edit line 430+

### **Want to Send to Different Email?**

Change line 221: `to: ['Dachiznit@gmail.com']`

---

## 🚀 Next Steps After Setup

Once this is working, you can add:

1. **SMS Notifications** (Twilio integration)
2. **Slack/Discord Alerts** (Webhook integration)
3. **CRM Integration** (Auto-add to HubSpot/Salesforce)
4. **Calendar Booking** (Auto-schedule follow-up calls)
5. **Project Tracking** (Move leads through pipeline)
6. **Analytics Dashboard** (Track conversion rates)

---

## ✅ Checklist

- [ ] Sign up for Resend
- [ ] Get Resend API key
- [ ] Add RESEND_API_KEY to Supabase
- [ ] Add GEMINI_API_KEY to Supabase
- [ ] Deploy Edge Function
- [ ] Run SQL trigger setup
- [ ] Test with sample form submission
- [ ] Verify you receive analysis email
- [ ] Verify prospect receives auto-reply
- [ ] 🎉 System is live!

---

## 🆘 Need Help?

If anything isn't working:
1. Check Supabase Edge Functions logs
2. Check Resend dashboard for delivery status
3. Verify all environment variables are set
4. Test the Edge Function directly in Supabase dashboard
5. Let me know and I can help debug!

---

## 🎯 What Makes This Special

Most developers just get a raw contact form submission.

You get:
- ✅ AI analysis of lead quality
- ✅ Ready-to-use Claude prompts
- ✅ Tech stack recommendations
- ✅ Time and value estimates
- ✅ Feature prioritization
- ✅ Professional auto-reply
- ✅ All in one beautiful email

**This is next-level automation** that saves hours per lead! 🚀
