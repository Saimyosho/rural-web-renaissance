# Hugging Face AI Virtual Design Setup Guide

This guide will help you set up the Hugging Face API integration for the AI Virtual Design & Renovation tool on your website.

## What You've Built

You now have a complete AI-powered virtual design system that includes:

1. **Hero Section Feature** - Eye-catching showcase on your homepage
2. **API Route** (`/api/virtual-design.ts`) - Secure backend integration
3. **Interactive Demo Component** - Full-featured design generator
4. **Environment Configuration** - Secure token management

## Step 1: Get Your Hugging Face API Token

### Create an Account
1. Go to https://huggingface.co
2. Click "Sign Up" (top right)
3. Complete the registration with your email

### Generate Your Token
1. Log in to Hugging Face
2. Click your profile picture (top right)
3. Select **"Settings"**
4. Navigate to **"Access Tokens"** in the left sidebar
5. Click **"New token"**
6. Fill in the form:
   - **Name**: `Rural Web Renaissance API` (or any name you prefer)
   - **Type**: Select **"Read"** (sufficient for using models)
7. Click **"Generate a token"**
8. **IMPORTANT**: Copy the token immediately! It looks like: `hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Step 2: Add Token to Your Environment

### Local Development

1. Open your `.env` file in the project root
2. Find the line: `HUGGINGFACE_API_TOKEN=your_huggingface_token_here`
3. Replace `your_huggingface_token_here` with your actual token:
   ```
   HUGGINGFACE_API_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. Save the file

### Vercel Deployment

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Click **"Settings"**
4. Navigate to **"Environment Variables"**
5. Add a new variable:
   - **Key**: `HUGGINGFACE_API_TOKEN`
   - **Value**: Your token (starts with `hf_`)
   - **Environments**: Check all (Production, Preview, Development)
6. Click **"Save"**
7. **Redeploy** your site for changes to take effect

## Step 3: Test the Integration

### Local Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Virtual Design demo
3. Enter a prompt like: "A modern kitchen with white cabinets"
4. Click "Generate Design"
5. Wait 20-30 seconds for the first generation (model loads)
6. Subsequent generations should be faster

### Troubleshooting

**Error: "Model is loading"**
- This is normal on first use
- Wait 20-30 seconds and try again
- The model needs to "wake up" on Hugging Face's servers

**Error: "Invalid token"**
- Check that you copied the full token (starts with `hf_`)
- Verify the token in your environment variables
- Make sure there are no extra spaces

**Error: "Rate limit exceeded"**
- Free tier has limits (~1000 requests/day)
- Wait a few minutes or upgrade to a paid plan

## Step 4: Understanding the Models

### Default Model
- **stabilityai/stable-diffusion-xl-base-1.0**
- Great for general image generation
- Best for architectural and design visualizations

### Alternative Models (can be configured in the code)
- **runwayml/stable-diffusion-v1-5** - Faster, good quality
- **stabilityai/stable-diffusion-2-1** - Higher quality, slower
- **CompVis/stable-diffusion-v1-4** - Classic, reliable

To change the model, edit the `model` parameter in:
- `src/components/ai-demos/VirtualDesignDemo.tsx` (line ~50)

## Step 5: Pricing & Limits

### Free Tier
- **~1,000 requests per month**
- Rate limits apply
- Model loading delays on first use
- Perfect for testing and demos

### Paid Options
If you need more:
1. **Hugging Face Pro** ($9/month)
   - Higher rate limits
   - Faster model loading
   - More storage

2. **Inference Endpoints** (custom pricing)
   - Dedicated infrastructure
   - Guaranteed uptime
   - No cold starts
   - Starting at ~$60/month

## API Endpoint Documentation

### Request Format
```javascript
POST /api/virtual-design
Content-Type: application/json

{
  "prompt": "A modern living room with minimalist furniture",
  "model": "stabilityai/stable-diffusion-xl-base-1.0" // optional
}
```

### Response Format
```javascript
{
  "success": true,
  "imageUrl": "data:image/png;base64,...", 
  "prompt": "A modern living room...",
  "model": "stabilityai/stable-diffusion-xl-base-1.0"
}
```

### Error Responses
```javascript
{
  "error": "Error message",
  "details": "Additional information",
  "retryAfter": 20 // seconds (for 503 errors)
}
```

## Security Best Practices

1. **Never commit** your `.env` file to Git
2. **Use environment variables** for all API keys
3. **Rotate tokens** periodically for security
4. **Monitor usage** in Hugging Face dashboard
5. **Set up alerts** for unusual activity

## Next Steps

### Enhance Your Integration

1. **Add more models** for different styles
2. **Implement image upload** for image-to-image generation
3. **Add style presets** (modern, rustic, minimalist, etc.)
4. **Create a gallery** of generated designs
5. **Add user authentication** to track user generations
6. **Implement caching** to reduce API calls

### Advanced Features

- **Inpainting**: Edit specific areas of an image
- **Outpainting**: Extend images beyond their borders
- **ControlNet**: Guide generation with edge detection
- **Image Variations**: Generate multiple versions

## Support Resources

- **Hugging Face Docs**: https://huggingface.co/docs/api-inference
- **Model Hub**: https://huggingface.co/models
- **Community Forum**: https://discuss.huggingface.co
- **Status Page**: https://status.huggingface.co

## Files Created/Modified

1. ✅ `.env` - Added HUGGINGFACE_API_TOKEN
2. ✅ `.env.example` - Added token template
3. ✅ `api/virtual-design.ts` - Backend API route
4. ✅ `src/components/ai-demos/VirtualDesignDemo.tsx` - Frontend component
5. ✅ `src/components/Hero.tsx` - Added feature showcase
6. ✅ `package.json` - Added @vercel/node dependency

## Questions?

If you run into issues:
1. Check the browser console for errors
2. Verify your token is correct
3. Test the API directly with curl/Postman
4. Check Hugging Face status page
5. Review server logs in Vercel dashboard

---

**Ready to generate stunning AI designs! 🎨✨**
