# 🚀 Vercel Environment Variables Setup

## ⚠️ CRITICAL: Contact Form Won't Work Without This!

Your contact form is failing because Vercel doesn't have the Supabase credentials. Follow these steps:

---

## 📋 Step-by-Step Guide

### **Step 1: Go to Vercel Dashboard**

1. Visit https://vercel.com/dashboard
2. Click on your project: **rural-web-renaissance**
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar

---

### **Step 2: Add Environment Variables**

Add these TWO variables:

#### **Variable 1:**
```
Name: VITE_SUPABASE_URL
Value: https://lceafhcfdpreqoxepqcm.supabase.co
Environment: Production, Preview, Development (check all 3)
```

#### **Variable 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZWFmaGNmZHByZXFveGVwcWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzQ3MzksImV4cCI6MjA3NTIxMDczOX0.OtkRRczVyPx2ETI_JXRDsCDxZLrkdevnbrv2Jp_Lxvc
Environment: Production, Preview, Development (check all 3)
```

---

### **Step 3: Redeploy**

After adding the variables:

1. Go to **Deployments** tab
2. Click the three dots `...` on the latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes for rebuild

---

## ✅ Testing

Once redeployed:

1. Visit your live site
2. Go to contact form
3. Fill it out
4. Submit
5. Should see success message! ✨

---

## 🔍 If Still Not Working

### **Check 1: Verify Variables Are Set**
- Go to Vercel Settings → Environment Variables
- Make sure both variables show up
- Make sure all 3 environments are checked (Production, Preview, Development)

### **Check 2: Check Supabase Table**
1. Go to https://supabase.com/dashboard
2. Select project: **lceafhcfdpreqoxepqcm**
3. Click **Table Editor**
4. Check if `contact_submissions` table exists
5. If not, run the SQL from `supabase-setup.sql`

### **Check 3: Browser Console**
1. Open your live site
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Try submitting form
5. Look for errors
6. Share error message if needed

---

## 📞 Quick Checklist

- [ ] Added VITE_SUPABASE_URL to Vercel
- [ ] Added VITE_SUPABASE_ANON_KEY to Vercel
- [ ] Checked all 3 environments for both variables
- [ ] Redeployed from Vercel dashboard
- [ ] Waited 2-3 minutes for build
- [ ] Tested contact form on live site
- [ ] ✅ Contact form works!

---

## 💡 Why This Happened

Your `.env` file works locally but isn't pushed to Git (for security).
Vercel needs these same values configured in its dashboard.

**Local:** Reads from `.env` file ✅
**Production:** Reads from Vercel environment variables ❌ (not set yet)

---

## 🎯 After Setup

Once this is working, you can also set up the AI lead system by adding these to Supabase Secrets:

1. `RESEND_API_KEY` (from resend.com)
2. `GEMINI_API_KEY` (from Google Cloud)

But first, get the contact form working! 🚀
