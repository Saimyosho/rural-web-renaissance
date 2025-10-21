# AI Renovation Portal - Complete Setup Guide

This guide will help you set up the login-protected AI Renovation Portal for contractors.

## 🎯 What You've Built

A **professional contractor portal** with:
- ✅ User authentication (login/signup)
- ✅ Protected routes requiring login
- ✅ User profiles with usage tracking
- ✅ Database schema for projects and images
- ✅ Beautiful, responsive UI

## 📋 Phase 1: Database Setup (DO THIS FIRST)

### Step 1: Run the Database Schema

1. Open your **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **"New Query"**
5. Copy the entire contents of `supabase-renovation-portal.sql`
6. Paste into the SQL editor
7. Click **"Run"** or press `Ctrl+Enter`
8. You should see: "Renovation Portal database schema created successfully!"

### Step 2: Create Storage Bucket

1. In Supabase Dashboard, go to **Storage** (left sidebar)
2. Click **"Create a new bucket"**
3. Configure:
   - **Name**: `renovation-images`
   - **Public bucket**: Leave **UNCHECKED** (private)
   - Click **"Create bucket"**

### Step 3: Set Storage Policies

1. Click on the `renovation-images` bucket
2. Go to **"Policies"** tab
3. Click **"New Policy"**
4. Add three policies:

**Policy 1: Upload Images**
```sql
CREATE POLICY "Users can upload own images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'renovation-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 2: View Images**
```sql
CREATE POLICY "Users can view own images"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'renovation-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 3: Delete Images**
```sql
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'renovation-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### Step 4: Enable Email Auth (if not already enabled)

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize confirmation and password reset emails

## 📋 Phase 2: Test Authentication

### Local Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/signup`

3. Create a test account:
   - Email: `test@example.com`
   - Password: `test123`
   - Company: `Test Company`

4. Check your database:
   - Go to Supabase Dashboard → **Table Editor**
   - Look in `auth.users` - your user should be there
   - Look in `user_profiles` - profile should be auto-created

5. Try logging out and back in at `/login`

## 📋 Phase 3: What's Built So Far

### ✅ Completed Components

1. **Authentication System**
   - `src/contexts/AuthContext.tsx` - Auth state management
   - `src/pages/Login.tsx` - Login page
   - `src/pages/Signup.tsx` - Signup page
   - `src/components/ProtectedRoute.tsx` - Route protection

2. **Database Schema**
   - `projects` table - Store renovation projects
   - `renovation_images` table - Before/after images
   - `user_profiles` table - User info and limits
   - `generation_usage` table - Track AI usage

3. **Security**
   - Row Level Security (RLS) enabled
   - Users can only see their own data
   - Automatic profile creation on signup
   - Secure storage buckets

### 📦 Files Created

```
supabase-renovation-portal.sql          ← Database schema
src/contexts/AuthContext.tsx            ← Auth management
src/pages/Login.tsx                     ← Login page
src/pages/Signup.tsx                    ← Signup page  
src/components/ProtectedRoute.tsx       ← Route protection
src/App.tsx                             ← Updated with routes
RENOVATION-PORTAL-SETUP-GUIDE.md        ← This file
```

## 📋 Phase 4: Next Steps (To Be Built)

### 1. Dashboard Page (`/portal/dashboard`)
- Welcome message with user info
- Usage stats (X/10 generations used)
- Recent projects list
- Quick actions (New Project, Generate Image)

### 2. AI Renovation Tool (`/portal/generate`)
- Upload "before" image
- Enter renovation prompt
- Select style presets (modern, rustic, etc.)
- Generate AI "after" image
- Save to project

### 3. Projects Page (`/portal/projects`)
- List all user projects
- Create/edit/delete projects
- View project details
- Image gallery per project

### 4. Project Detail Page (`/portal/projects/:id`)
- Before/after image comparison slider
- Download generated images
- Share project via link
- Add notes to project

### 5. Settings Page (`/portal/settings`)
- Update profile info
- Change password
- Upgrade to Pro tier
- View usage history

### 6. Image-to-Image API
- Upgrade `/api/virtual-design.ts`
- Support base64 image input
- Use Hugging Face inpainting models
- Return transformed images

## 🚀 Quick Start Commands

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Environment Variables Needed

Make sure your `.env` file has:

```env
# Supabase (already set up)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Hugging Face (for AI generation)
HUGGINGFACE_API_TOKEN=your_huggingface_token
```

## 📊 Database Tables Overview

### `projects`
- Stores contractor projects
- Links to user via `user_id`
- Has client info, location, etc.

### `renovation_images`
- Stores before/after image pairs
- Links to project
- Tracks AI model used

### `user_profiles`
- Extended user information
- Tier system (free/pro/enterprise)
- Usage limits and tracking

### `generation_usage`
- Tracks each AI generation
- For billing and analytics
- Links to user and image

## 🎨 Free Tier Limits

Current setup (can be modified in `supabase-renovation-portal.sql`):

- **Generations**: 10 per month
- **Storage**: Unlimited (within Supabase limits)
- **Projects**: Unlimited
- **Image Size**: 10MB max (configured in Storage)

## 🔄 User Flow

1. **Visitor** → Browse public site
2. **Click "Get Started"** → Redirects to `/signup`
3. **Create Account** → Auto-creates profile
4. **Redirects to Dashboard** → `/portal/dashboard`
5. **Create Project** → Add client info
6. **Upload Image** → Before photo
7. **Generate AI Image** → Enter prompt
8. **Save Results** → Download or share

## 🛡️ Security Features

- ✅ Row Level Security on all tables
- ✅ Secure storage with user-based policies
- ✅ Password requirements (6+ characters)
- ✅ Email verification (optional, can enable in Supabase)
- ✅ Session management
- ✅ Protected routes

## 📱 Responsive Design

All pages are fully responsive:
- Mobile-first design
- Touch-friendly UI
- Optimized for tablets
- Desktop enhancements

## 🎯 Next Development Phase

To continue building, focus on:

1. **Dashboard** - User's main landing page
2. **AI Generator** - The core renovation tool
3. **Project Management** - CRUD operations
4. **Image Gallery** - Before/after viewer

Would you like me to build any of these next?

## 🐛 Troubleshooting

### "User not found" after signup
- Check Supabase logs
- Verify email confirmation is not required
- Check database trigger is working

### Can't upload images
- Verify storage bucket is created
- Check storage policies are active
- Confirm bucket name is `renovation-images`

### Login redirects to home instead of dashboard
- Dashboard route not created yet (Phase 4)
- Temporarily redirects to `/portal/dashboard`
- Will work once dashboard page is built

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check Supabase logs
3. Verify environment variables
4. Test database connection

---

**Status**: Phase 1 Complete ✅
**Next**: Build Dashboard & AI Generator Tool
**ETA**: 1-2 hours for full portal

Ready to continue? Let me know which component to build next!
