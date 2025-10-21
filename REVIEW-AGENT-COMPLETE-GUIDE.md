# 🤖 Review Response Agent - Complete Setup Guide

## Overview

The Review Response Agent automatically fetches reviews from Google Business, Yelp, and Facebook, then uses AI (Google Gemini) to generate personalized, context-aware responses.

---

## 🎯 Features

✅ **Multi-Platform Support**
- Google Business Profile reviews
- Yelp reviews
- Facebook reviews (coming soon)

✅ **AI-Powered Responses**
- Context-aware replies using Google Gemini
- Sentiment analysis (positive vs. negative)
- Personalized business name inclusion
- Professional, friendly tone

✅ **Bulk Operations**
- Generate responses for multiple reviews at once
- Edit AI responses before publishing
- Copy responses to clipboard
- Track response history

---

## 📦 What Was Built

### 1. **Python Backend API** (`api/review-agent.py`)
Complete serverless function with:
- Google Places API integration
- Yelp Fusion API integration
- Google Gemini AI integration
- Supabase database storage
- Error handling and validation

### 2. **React Frontend** (`src/pages/portal/apps/ReviewReplierApp.tsx`)
Full-featured UI with:
- Platform connection settings
- Review fetching interface
- AI response generator
- Response editor
- Bulk operations
- Real-time feedback

### 3. **Database Table** (`supabase/migrations/20251018_review_responses_table.sql`)
- Stores generated responses
- Row Level Security enabled
- User-specific access
- Tracking published status

### 4. **Dashboard Integration**
- Fixed superadmin detection
- Shows unlimited generations for superadmin
- Launch buttons work correctly

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Run Database Migration

```bash
# Connect to Supabase
supabase db remote commit

# Or run SQL directly in Supabase Dashboard
# Copy content from: supabase/migrations/20251018_review_responses_table.sql
```

### Step 2: Get API Keys

#### Google Gemini API Key
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

#### Google Places API Key
1. Go to https://console.cloud.google.com/
2. Enable "Places API"
3. Create credentials → API Key
4. Copy the key

#### Yelp API Key
1. Go to https://www.yelp.com/developers/v3/manage_app
2. Create new app
3. Copy "API Key"

### Step 3: Add Environment Variables

Add to your `.env` file:

```bash
# Google Gemini (for AI responses)
GOOGLE_GEMINI_API_KEY=your_gemini_key_here

# Google Places (for Google Business reviews)
GOOGLE_PLACES_API_KEY=your_places_key_here

# Yelp Fusion API (for Yelp reviews)
YELP_API_KEY=your_yelp_key_here
```

### Step 4: Deploy to Vercel

```bash
# Add environment variables to Vercel
vercel env add GOOGLE_GEMINI_API_KEY
vercel env add GOOGLE_PLACES_API_KEY
vercel env add YELP_API_KEY

# Deploy
vercel --prod
```

### Step 5: Test the App

1. **Login:** http://localhost:8080/login
2. **Go to Dashboard:** http://localhost:8080/portal/dashboard
3. **Click "Launch App"** on Review Response Agent
4. **Connect Platform:**
   - Go to Settings tab
   - Enter your business name
   - Select platform (Google or Yelp)
   - Enter Place ID or Business ID
   - Click "Fetch Reviews"
5. **Generate Responses:**
   - Click on a review
   - Click "Generate AI Response"
   - Edit if needed
   - Copy to clipboard
   - Paste into your review platform

---

## 🔑 Finding Your Platform IDs

### Google Place ID

**Method 1: Google Business Profile**
1. Go to https://business.google.com
2. Select your business
3. Click "Profile" → "Edit profile"
4. Look at URL: `account=XXXXXXXXX`
5. This is your Place ID

**Method 2: Place ID Finder**
1. Go to https://developers.google.com/maps/documentation/places/web-service/place-id
2. Search for your business
3. Copy the Place ID

### Yelp Business ID

1. Go to your Yelp business page
2. Look at the URL: `https://www.yelp.com/biz/your-business-name-city`
3. The business ID is: `your-business-name-city`

Example:
- URL: `https://www.yelp.com/biz/joes-pizza-new-york`
- Business ID: `joes-pizza-new-york`

---

## 📊 Database Schema

```sql
review_responses (
  id UUID PRIMARY KEY,
  user_id UUID (references auth.users),
  platform TEXT ('google' | 'yelp' | 'facebook'),
  review_id TEXT (unique per user/platform),
  review_text TEXT,
  review_rating INTEGER (1-5),
  author_name TEXT,
  ai_response TEXT,
  published BOOLEAN,
  published_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

---

## 🎨 API Endpoints

### 1. Fetch Reviews
```http
POST /api/review-agent/fetch-reviews
Content-Type: application/json

{
  "platform": "google",
  "identifier": "ChIJN1t_tDeuEmsRUsoy..."
}
```

**Response:**
```json
{
  "success": true,
  "reviews": [
    {
      "platform": "google",
      "review_id": "google_1234567890_John Doe",
      "author": "John Doe",
      "rating": 5,
      "text": "Great service!",
      "timestamp": 1697654400,
      "profile_photo": "https://..."
    }
  ],
  "count": 5
}
```

### 2. Generate Response
```http
POST /api/review-agent/generate-response
Content-Type: application/json

{
  "review_text": "Great service!",
  "rating": 5,
  "business_name": "Joe's Pizza",
  "user_id": "uuid..."
}
```

**Response:**
```json
{
  "success": true,
  "response": "Thank you so much for your kind words! We're thrilled you enjoyed your experience at Joe's Pizza. We look forward to serving you again soon!"
}
```

### 3. Bulk Generate
```http
POST /api/review-agent/bulk-generate
Content-Type: application/json

{
  "reviews": [...],
  "business_name": "Joe's Pizza",
  "user_id": "uuid..."
}
```

---

## 💡 Usage Tips

### For Best AI Responses:

1. **Use Your Actual Business Name**
   - Makes responses more personal
   - Better context for AI

2. **Review Before Publishing**
   - Edit AI responses to match your voice
   - Add specific details about your business
   - Personalize for repeat customers

3. **Respond Quickly**
   - Fetch reviews daily
   - Use bulk generate for efficiency
   - Respond within 24-48 hours

### Response Strategies:

**5-Star Reviews:**
- Express genuine gratitude
- Highlight specific mentions
- Invite them back

**4-Star Reviews:**
- Thank them for feedback
- Address any concerns
- Show improvement commitment

**1-3 Star Reviews:**
- Apologize sincerely
- Address issues specifically
- Offer solution/compensation
- Take conversation offline

---

## 🐛 Troubleshooting

### "Failed to fetch reviews"

**Cause:** Invalid API keys or wrong IDs

**Fix:**
1. Check `.env` file has correct keys
2. Verify Place ID / Business ID is correct
3. Check API key permissions in Google Cloud Console
4. For Yelp, ensure API key is activated

### "Failed to generate AI response"

**Cause:** Gemini API issues

**Fix:**
1. Check GOOGLE_GEMINI_API_KEY in `.env`
2. Verify key is active at https://makersuite.google.com
3. Check API quota hasn't been exceeded
4. Try generating again (temporary API issue)

### "No reviews showing"

**Cause:** Wrong Place ID or no recent reviews

**Fix:**
1. Double-check Place ID using Place ID Finder
2. Verify your business has public reviews
3. Try fetching again

---

## 🔒 Security Notes

✅ **API Keys Protected**
- All keys in environment variables
- Never exposed to frontend
- Server-side processing only

✅ **User Data Protected**
- Row Level Security enabled
- Users only see their own responses
- Secure authentication required

✅ **Rate Limiting**
- Consider adding rate limits in production
- Monitor API usage
- Set up billing alerts

---

## 📈 Next Steps

### Enhancements to Add:

1. **Auto-Publishing**
   - Integrate with platform APIs to post directly
   - Requires OAuth for Google/Yelp

2. **Scheduled Fetching**
   - Cron job to fetch daily
   - Email notifications for new reviews

3. **Analytics**
   - Track response time
   - Sentiment analysis trends
   - Response effectiveness

4. **Templates**
   - Save response templates
   - Quick responses for common scenarios

---

## 🆘 Support

Need help? Check:
1. Console logs in browser DevTools
2. Vercel function logs
3. Supabase logs
4. API documentation:
   - [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
   - [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3)
   - [Google Gemini API](https://ai.google.dev/tutorials)

---

## ✅ Checklist

- [ ] Database migration run
- [ ] All API keys added to `.env`
- [ ] Environment variables added to Vercel
- [ ] App deployed to production
- [ ] Tested fetching reviews
- [ ] Tested generating responses
- [ ] Responses saved to database
- [ ] Dashboard shows superadmin badge
- [ ] Can access Review Agent from dashboard

---

**Congratulations! Your Review Response Agent is ready to use! 🎉**

This will save hours of manual work responding to reviews across platforms.
