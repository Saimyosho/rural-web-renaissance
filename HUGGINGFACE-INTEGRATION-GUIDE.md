# 🤖 Hugging Face AI Integration Guide

Complete guide for integrating FREE Hugging Face AI models into your portfolio demos.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Setup Steps](#setup-steps)
3. [Getting Your Free API Key](#getting-your-free-api-key)
4. [Local Development](#local-development)
5. [Deploying to Vercel](#deploying-to-vercel)
6. [Testing the Integration](#testing-the-integration)
7. [Troubleshooting](#troubleshooting)
8. [Cost & Limits](#cost--limits)

---

## Overview

### What's Been Implemented

✅ **Two AI-Powered Demos:**
- **Review Response Agent**: Generates professional responses to customer reviews
- **Content Writer**: Creates marketing content (emails, social posts, etc.)

✅ **Technology Stack:**
- **Frontend**: React TypeScript component (`AIToolsDemoTabs.tsx`)
- **Backend**: Vercel Edge Function (`api/hf-inference.ts`)
- **AI Models**: Hugging Face Inference API (FREE tier)

✅ **Models Used:**
- **Review Agent**: `HuggingFaceH4/zephyr-7b-beta` (7B parameter model)
- **Content Writer**: `mistralai/Mistral-7B-Instruct-v0.1` (7B parameter model)

---

## Setup Steps

### Step 1: Install Dependencies

Already completed! The package is installed:
```bash
npm install @huggingface/inference
```

### Step 2: Get Your Free Hugging Face API Key

See [Getting Your Free API Key](#getting-your-free-api-key) below.

### Step 3: Configure Environment Variables

Add your HF API key to your `.env` file:

```bash
# .env
HF_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx
```

> **Note**: Never commit your `.env` file to git. It's already in `.gitignore`.

### Step 4: Test Locally

```bash
npm run dev
```

Navigate to the hero section and click "Try Review Agent" or "Try Content Writer".

### Step 5: Deploy to Vercel

See [Deploying to Vercel](#deploying-to-vercel) below.

---

## Getting Your Free API Key

### Option 1: Web Interface (Easiest)

1. **Go to Hugging Face**: https://huggingface.co/settings/tokens

2. **Create Account** (if you don't have one):
   - Click "Sign Up" (top right)
   - Use email or sign in with GitHub/Google
   - **No credit card required!** ✅

3. **Create New Token**:
   - Click "New token" button
   - **Name**: `portfolio-demos` (or any name)
   - **Type**: Select "Read" (sufficient for inference)
   - Click "Generate a token"

4. **Copy Your Token**:
   - Starts with `hf_`
   - Example: `hf_aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890`
   - **Save it immediately** - you won't see it again!

5. **Add to .env**:
   ```bash
   HF_API_KEY=hf_your_actual_token_here
   ```

### Option 2: Using Hugging Face CLI

```bash
# Install HF CLI
pip install huggingface-hub

# Login (will prompt for token)
huggingface-cli login

# Your token is now saved in ~/.huggingface/token
# Copy it to your .env file
```

---

## Local Development

### Running the Dev Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Testing the AI Demos

1. **Navigate to Home Page** - Hero section is at the top
2. **Scroll Down** to the demo section (or it may be visible immediately)
3. **Click "Try Review Agent"**:
   - Should generate a response to the sample review
   - Takes ~2-5 seconds (HF models are running on their servers)
   - Response will appear below the sample review

4. **Switch to "Content Writer"**:
   - Click "Try Content Writer" button
   - Generates an email about "Spring Sale"
   - Takes ~3-7 seconds

### Expected Behavior

**✅ Success:**
```
[2-5 seconds processing]
→ AI-generated text appears
→ "Powered by HuggingFace AI" badge shown
```

**⚠️ Fallback (No API Key):**
```
→ Shows demo/mock response
→ "⚠️ Using demo mode: [error message]"
```

**❌ Error:**
```
→ Falls back to demo mode
→ Error logged to console
```

---

## Deploying to Vercel

### Prerequisites

- Vercel account (free): https://vercel.com/signup
- Project connected to GitHub

### Step 1: Add Environment Variable to Vercel

**Option A: Vercel Dashboard**

1. Go to your project: https://vercel.com/dashboard
2. Click your project name
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key**: `HF_API_KEY`
   - **Value**: `hf_your_token_here` (paste your token)
   - **Environments**: Check all (Production, Preview, Development)
5. Click **Save**

**Option B: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add environment variable
vercel env add HF_API_KEY
# Paste your token when prompted
# Select all environments
```

### Step 2: Deploy

```bash
# Deploy to production
vercel --prod

# Or just push to main branch (auto-deploys if connected to GitHub)
git push origin main
```

### Step 3: Verify Deployment

1. Visit your deployed site
2. Test the AI demos
3. Check Vercel logs if issues occur:
   ```bash
   vercel logs
   ```

---

## Testing the Integration

### Manual Testing Checklist

- [ ] **Review Agent** generates unique responses (not always the same)
- [ ] **Content Writer** generates relevant content
- [ ] Loading states work (spinner shows during processing)
- [ ] Error handling works (try with invalid API key)
- [ ] Fallback mode works (shows demo when API fails)
- [ ] Mobile responsive (test on phone/tablet)

### API Testing

Test the Edge Function directly:

```bash
# Test Review Agent
curl -X POST http://localhost:5173/api/hf-inference \
  -H "Content-Type: application/json" \
  -d '{
    "task": "review-response",
    "input": "Amazing service! Highly recommend."
  }'

# Test Content Writer
curl -X POST http://localhost:5173/api/hf-inference \
  -H "Content-Type: application/json" \
  -d '{
    "task": "content-generation",
    "input": {
      "topic": "Holiday Sale",
      "format": "Email"
    }
  }'
```

Expected response:
```json
{
  "success": true,
  "text": "Generated content here...",
  "model": "zephyr-7b" or "mistral-7b"
}
```

---

## Troubleshooting

### Issue: "Failed to connect to AI service"

**Possible Causes:**
1. Missing or invalid `HF_API_KEY`
2. HF API is down (rare)
3. Rate limit exceeded (1000 req/day)

**Solutions:**
```bash
# 1. Check your .env file
cat .env | grep HF_API_KEY

# 2. Verify token is valid
curl https://huggingface.co/api/whoami \
  -H "Authorization: Bearer $HF_API_KEY"

# 3. Check HF status
# Visit: https://status.huggingface.co
```

### Issue: "Rate limit exceeded"

**Cause**: Free tier limit (1000 requests/day per model)

**Solutions:**
1. Wait 24 hours for reset
2. Create multiple tokens (one per model)
3. Implement request caching
4. Upgrade to HF Pro ($9/month for unlimited)

### Issue: Slow Response Times

**Normal:** 2-7 seconds (models run on HF servers)

**Too Slow (>10 seconds):**
- HF servers may be busy
- Try different model
- Implement timeout handling

### Issue: Edge Function Not Working on Vercel

**Check:**
```bash
# 1. Verify environment variable is set
vercel env ls

# 2. Check build logs
vercel logs

# 3. Redeploy
vercel --prod --force
```

---

## Cost & Limits

### 100% Free Tier ✅

**Hugging Face Inference API:**
- ✅ **Free**: 1,000 requests/day per model
- ✅ **Rate Limit**: 30 requests/minute
- ✅ **No Credit Card**: Required
- ✅ **Models**: All public models available

**Your Stack:**
- ✅ **Frontend**: Vercel (100GB bandwidth/month free)
- ✅ **Backend**: Vercel Edge Functions (100GB-hours/month free)
- ✅ **Database**: Supabase (500MB free)
- ✅ **AI**: Hugging Face (1000 req/day free)

**Total Monthly Cost**: **$0.00** 💰

### Upgrade Options (Optional)

If you exceed free tier:

**Hugging Face Pro** ($9/month):
- Unlimited API requests
- Faster inference
- Priority support

**Vercel Pro** ($20/month):
- Unlimited bandwidth
- More Edge Function hours
- Team features

**For Portfolio Use**: Free tier is plenty! 🎉

---

## Advanced Configuration

### Using Different Models

Edit `api/hf-inference.ts`:

```typescript
// Review Agent - Options:
model: 'HuggingFaceH4/zephyr-7b-beta'  // Current (best quality)
model: 'mistralai/Mistral-7B-v0.1'     // Alternative
model: 'tiiuae/falcon-7b-instruct'     // Faster

// Content Writer - Options:
model: 'mistralai/Mistral-7B-Instruct-v0.1'  // Current
model: 'google/flan-t5-large'                // Smaller/faster
model: 'facebook/opt-6.7b'                   // Alternative
```

### Implementing Caching

Reduce API calls by caching responses:

```typescript
// Simple in-memory cache
const cache = new Map();

async function getCachedResponse(key: string, generateFn: () => Promise<string>) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const response = await generateFn();
  cache.set(key, response);
  return response;
}
```

### Adding More Demos

1. Add new task type in `api/hf-inference.ts`
2. Update `AIToolsDemoTabs.tsx` with new tab
3. Choose appropriate HF model
4. Test thoroughly

---

## Support & Resources

### Documentation
- **Hugging Face Docs**: https://huggingface.co/docs/api-inference
- **Vercel Edge Docs**: https://vercel.com/docs/functions/edge-functions
- **Models Hub**: https://huggingface.co/models

### Community
- **HF Discord**: https://hf.co/join/discord
- **Vercel Discord**: https://vercel.com/discord

### Need Help?
1. Check logs: `vercel logs`
2. Test API directly with curl
3. Verify environment variables
4. Check HF status page

---

## Summary

✅ **Installation**: Complete (dependencies installed)
✅ **Edge Function**: Created (`api/hf-inference.ts`)
✅ **Frontend**: Updated (`src/components/AIToolsDemoTabs.tsx`)
✅ **Environment**: Configured (`.env.example` updated)

**Next Steps:**
1. Get your free HF API key
2. Add to `.env` file
3. Test locally with `npm run dev`
4. Deploy to Vercel
5. Enjoy free AI-powered demos! 🚀

**Cost**: $0/month forever (within free tier limits)

---

*Last Updated: October 20, 2025*
