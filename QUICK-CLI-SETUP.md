# 🚀 Quick CLI Setup Guide

## Complete Setup in 3 Commands

### Step 1: Copy SQL to Clipboard
Copy the content of `setup-renovation-app.sql` to your clipboard.

### Step 2: Run SQL in Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "SQL Editor" in left sidebar
4. Paste the SQL from `setup-renovation-app.sql`
5. Click "Run" button

**OR** Use Supabase CLI (if you have it connected):

```bash
# Read the SQL file and execute via stdin
cat setup-renovation-app.sql | npx supabase db execute
```

### Step 3: Sign Up
Visit your app and sign up:

```bash
# Open in browser
start http://localhost:8080/signup
```

Or manually go to: http://localhost:8080/signup
- Email: `Dachiznit@gmail.com`
- Password: (your choice)

### Step 4: Grant Superadmin (if signup was before SQL)
If you signed up BEFORE running the SQL, run this one more time:

```sql
UPDATE user_profiles 
SET role = 'superadmin', generation_limit = 999999 
WHERE id = (SELECT id FROM auth.users WHERE email = 'Dachiznit@gmail.com');
```

---

## 🎯 That's It!

Now:
1. Login at http://localhost:8080/login
2. You'll see Dashboard with "Superadmin" badge 👑
3. Click "Launch App" on AI Renovation Tool
4. Upload image + generate! ✨

---

## Alternative: Manual Supabase Dashboard Steps

If CLI doesn't work, use the dashboard:

### 1. Add Role Column
Dashboard → SQL Editor → New Query:
```sql
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
```

### 2. Create Storage Bucket
Dashboard → Storage → Create new bucket:
- Name: `renovation-images`
- Public: ✅ Yes

### 3. Add Storage Policies
Dashboard → Storage → renovation-images → Policies → New Policy:

**Policy 1: Upload**
```sql
CREATE POLICY "Users can upload own images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'renovation-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 2: View**
```sql
CREATE POLICY "Users can view own images"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'renovation-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### 4. Grant Superadmin
After signing up, Dashboard → SQL Editor:
```sql
UPDATE user_profiles 
SET role = 'superadmin', generation_limit = 999999 
WHERE id = (SELECT id FROM auth.users WHERE email = 'Dachiznit@gmail.com');
```

Done! 🎉
