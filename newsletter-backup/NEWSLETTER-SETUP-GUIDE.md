# 📧 Newsletter System Setup Guide

Complete guide for setting up your Johnstown PA-focused newsletter with Gemini AI integration.

## 🎯 What You Have Now

✅ **Newsletter Popup** - Exit-intent popup with Johnstown PA messaging
✅ **API Endpoint** - `/api/newsletter-signup` for handling subscriptions
✅ **Database Schema** - Supabase tables for subscribers, drafts, and sends
✅ **Component Integration** - Popup added to main Index page

---

## 🚀 Setup Steps

### **Step 1: Set Up Supabase Tables**

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the entire contents of `newsletter-schema.sql`
5. Click **Run** to create all tables

**Tables Created:**
- `newsletter_subscribers` - Stores email subscribers
- `newsletter_drafts` - Stores AI-generated newsletters
- `newsletter_sends` - Tracks email delivery and engagement

---

### **Step 2: Get Gemini API Key** (Optional - for AI generation)

1. Go to: https://ai.google.dev/
2. Click **Get API key**
3. Create a new project or select existing
4. Copy your API key
5. Add to `.env` file:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

**Cost:** FREE (60 requests/minute, plenty for monthly newsletters)

---

### **Step 3: Set Up Email Service** (Optional - for sending)

Choose one of these free options:

#### **Option A: Resend** (Recommended)
1. Go to: https://resend.com/signup
2. Verify your email
3. Get your API key from dashboard
4. Add to `.env`:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
5. **Free tier:** 3,000 emails/month, 100 emails/day

#### **Option B: SendGrid**
1. Go to: https://signup.sendgrid.com/
2. Create account
3. Generate API key
4. Add to `.env`:
   ```
   SENDGRID_API_KEY=SG.your_api_key_here
   ```
5. **Free tier:** 100 emails/day

---

### **Step 4: Environment Variables**

Add these to your `.env` file:

```bash
# Existing Supabase vars (you already have these)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# New for Newsletter
GEMINI_API_KEY=your_gemini_key_here
RESEND_API_KEY=your_resend_key_here
```

**Also add to Vercel:**
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add the same variables

---

## 📊 How It Works

### **User Flow:**

```
1. User visits site
2. Tries to leave (exit-intent) OR scrolls 50% + 45 seconds
3. Newsletter popup appears
4. User enters email
5. Email saved to Supabase
6. Success message shown
7. Popup won't show again (localStorage)
```

### **Newsletter Creation Flow (Hybrid Approach):**

```
1. YOU: Go to admin panel (to be built)
2. CLICK: "Generate Newsletter"
3. GEMINI: Creates draft based on prompt
4. YOU: Review and edit the content
5. YOU: Click "Send to All Subscribers"
6. SYSTEM: Sends emails via Resend
7. TRACK: Opens, clicks, engagement
```

---

## 🎨 Popup Features

### **Triggers:**
- ✅ Exit-intent (mouse leaves window)
- ✅ Hybrid: 45 seconds + 50% scroll
- ✅ Only shows once per user (localStorage)

### **Design:**
- ✅ Glass morphism aesthetic
- ✅ Johnstown PA-specific messaging
- ✅ Social proof ("Join 50+ businesses")
- ✅ Clear value propositions
- ✅ Mobile responsive
- ✅ Smooth animations

### **Form:**
- ✅ Email only (no phone)
- ✅ Client-side validation
- ✅ Server-side validation
- ✅ Duplicate checking
- ✅ Error handling
- ✅ Success state with auto-close

---

## 🤖 Using Gemini AI (Manual Method - Quick Start)

While the full automation is being built, you can use Gemini now:

### **Step 1: Go to Gemini**
Visit: https://ai.google.dev/aistudio

### **Step 2: Use This Prompt**

```
You are writing the monthly "Johnstown Business AI Brief" 
newsletter for local PA business owners.

REQUIREMENTS:
- Tone: Friendly, professional, conversational
- Length: 400-500 words
- Format: Email-friendly text
- Focus: Practical AI tips for small businesses

STRUCTURE:
1. Catchy subject line (3 options)
2. Headline Story (150 words)
   - Feature a fictional but realistic Johnstown business
   - Real results (e.g., "80% time saved")
   - Make it relatable
3. AI Tip of the Month (100 words)
   - One actionable tip
   - Specific steps
   - No jargon
4. Tool Spotlight (75 words)
   - Highlight one AI service
   - Real benefits
   - Soft CTA
5. Local Business News (50 words)
   - Cambria County focus
   - Community events
6. CTA (25 words)
   - Link to website
   - No pressure

CONTEXT:
- Audience: Johnstown PA small business owners (40-60 years)
- Services: AI automation, free websites, review management
- Goal: Build trust, provide value, soft sell

Current month: [INSERT CURRENT MONTH]
Previous topics: [NONE - THIS IS FIRST ISSUE]

Generate the newsletter now, including all sections.
```

### **Step 3: Review and Edit**
- Copy the output
- Edit any details
- Personalize as needed
- Save as draft

### **Step 4: Send**
- Use your email client (Gmail, Outlook, etc.)
- Or wait for automated sending feature

---

## 📈 Growth Strategy

### **Month 1-3: Foundation**
- Goal: 50-100 subscribers
- Strategy: Exit popup only
- Content: Manual with Gemini assist
- Send: Monthly via email client

### **Month 4-6: Automation**
- Goal: 100-250 subscribers
- Strategy: Add in-content CTAs
- Content: Gemini Edge Function (coming soon)
- Send: Resend API automation

### **Month 7-12: Scale**
- Goal: 250-500 subscribers
- Strategy: Lead magnets, social promotion
- Content: Fully automated with review
- Send: Scheduled automation

---

## 🎯 Newsletter Content Ideas

### **Regular Sections:**

**1. Main Story (150 words)**
```
"How Maria's Hair Studio Automated 90% of Bookings"
- The problem: Manual scheduling taking 10 hrs/week
- The solution: Simple AI booking tool
- The results: 15 hours saved, happier customers
- The takeaway: You can do this too
```

**2. AI Tip (100 words)**
```
"Use ChatGPT to Write Your Google My Business Posts"
- Step 1: Open ChatGPT
- Step 2: Ask it to write 5 posts about [your business]
- Step 3: Copy, paste to GMB
- Step 4: Schedule weekly
- Takes 10 minutes, looks professional
```

**3. Tool Spotlight (75 words)**
```
"AI Review Response Agent"
- What it does: Auto-responds to reviews
- Who it's for: Any business with online reviews
- Real result: Joe's Pizza went from 50% to 100% response rate
- How to get it: [Link to your services]
```

**4. Local News (50 words)**
```
- Johnstown Chamber meeting Nov 15th
- New business spotlight: [Local shop]
- Holiday shopping season prep tips
- Connect with local business owners
```

**5. CTA (25 words)**
```
"Want help implementing AI in YOUR business?
Reply to this email or visit [yourwebsite.com]"
```

---

## 🔒 Data Protection & Privacy

### **GDPR/Privacy Compliance:**
- ✅ Email collection is opt-in
- ✅ Unsubscribe link required (add to emails)
- ✅ Data stored securely in Supabase
- ✅ Can export/delete subscriber data
- ✅ Privacy policy should mention newsletter

### **Anti-Spam Best Practices:**
- ✅ Only email subscribers
- ✅ Include physical address (required by CAN-SPAM)
- ✅ Easy unsubscribe process
- ✅ Don't buy email lists
- ✅ Send valuable content only

---

## 📊 Tracking Success

### **Key Metrics:**

**Popup Performance:**
- Views: How many saw popup
- Conversion rate: % who subscribed
- Goal: 15-25% conversion

**Email Performance:**
- Open rate: % who opened
- Click rate: % who clicked links
- Unsubscribe rate: % who left
- Goals: 25%+ open, 5%+ click, <2% unsub

**Business Impact:**
- Contact form submissions from newsletter
- Service inquiries mentioning newsletter
- Revenue attributed to newsletter

---

## 🚨 Troubleshooting

### **Popup Not Showing:**
1. Check browser console for errors
2. Clear localStorage: `localStorage.clear()`
3. Refresh page and trigger (mouse to top)

### **Form Submission Fails:**
1. Check Supabase is connected
2. Verify `SUPABASE_SERVICE_ROLE_KEY` in Vercel
3. Check API endpoint `/api/newsletter-signup`
4. Review browser network tab for errors

### **Email Validation Issues:**
1. Email must match format: `user@domain.com`
2. Check regex in both frontend and backend
3. Test with different email formats

---

## 🎉 Next Steps

1. **Test the popup:**
   - Visit your site
   - Move mouse to top of screen
   - Fill out form
   - Check Supabase for new subscriber

2. **Create first newsletter:**
   - Use Gemini prompt above
   - Generate content
   - Review and edit
   - Save as draft

3. **Send first issue:**
   - Export emails from Supabase
   - Use your email client
   - Track responses

4. **Plan future automation:**
   - Admin dashboard (coming soon)
   - Automated generation
   - Scheduled sending
   - Analytics tracking

---

## 📞 Support

If you need help:
1. Check this guide first
2. Review error messages in console
3. Check Supabase logs
4. Test each component separately

---

## 🎨 Customization Options

### **Change Popup Copy:**
Edit `src/components/NewsletterPopup.tsx`:
- Line 162: Main headline
- Lines 164-167: Subheadline
- Lines 173-220: Bullet points
- Line 223: Newsletter preview
- Line 242: CTA button text

### **Change Triggers:**
Edit `src/components/NewsletterPopup.tsx`:
- Line 34: Exit-intent sensitivity
- Line 47: Scroll percentage (currently 50%)
- Line 54: Time delay (currently 45 seconds)

### **Change Success Message:**
Edit `src/components/NewsletterPopup.tsx`:
- Lines 146-158: Success state content

---

**🚀 You're all set! The newsletter system is ready to start capturing subscribers!**
