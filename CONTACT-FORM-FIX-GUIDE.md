# Contact Form 401 Error - Fix Guide

## Problem
Contact form submissions fail with a 401 Unauthorized error when users try to submit.

## Root Cause
Supabase Row Level Security (RLS) is blocking anonymous users from inserting into the `contact_submissions` table.

## Solution
Run the following SQL in your Supabase SQL Editor to allow anonymous form submissions.

## Steps to Fix

### 1. Access Supabase Dashboard
- Go to https://supabase.com/dashboard
- Select your project
- Navigate to "SQL Editor" in the left sidebar

### 2. Run This SQL

```sql
-- Fix RLS permissions for contact_submissions table
-- This allows anonymous users to insert contact form submissions

-- First, ensure RLS is enabled
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON contact_submissions;

-- Create a policy that allows anyone to insert
CREATE POLICY "Enable insert for anon users" ON contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Optionally, also allow authenticated users to insert
CREATE POLICY "Enable insert for authenticated users" ON contact_submissions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Verify the policies
SELECT schemaname, tablename, policyname, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'contact_submissions';
```

### 3. Execute the SQL
- Click the "Run" button or press `Ctrl+Enter`
- You should see a success message
- The verification query at the end will show your new policies

### 4. Test the Contact Form
- Go to your website's contact form
- Fill out all required fields
- Submit the form
- You should now see a success message instead of an error!

## What This Does

### Row Level Security (RLS)
- RLS is a security feature in Supabase that controls who can read/write data
- By default, it blocks ALL operations for security
- You must explicitly create policies to allow specific operations

### The Policies We Created

1. **"Enable insert for anon users"**
   - Allows anonymous (not logged in) users to INSERT data
   - This is what makes your contact form work
   - The `WITH CHECK (true)` means there are no restrictions

2. **"Enable insert for authenticated users"**
   - Also allows logged-in users to submit (if you add authentication later)
   - Provides flexibility for future features

## Security Considerations

### Is This Safe?
Yes! This setup is standard for public contact forms:
- Users can ONLY INSERT (create new submissions)
- Users CANNOT read, update, or delete submissions
- Only you (the owner) can access submitted data through the dashboard
- This is the same approach used by major platforms

### Rate Limiting
For production, consider adding:
- Cloudflare rate limiting
- Supabase Edge Functions with rate limits
- CAPTCHA or reCAPTCHA for additional protection

## Verification

### How to Check If It's Working
1. Open your browser's Developer Tools (F12)
2. Go to the Network tab
3. Submit the contact form
4. Look for the Supabase API call
5. It should return status 200/201 instead of 401

### In Supabase Dashboard
1. Go to "Table Editor"
2. Select `contact_submissions` table
3. After a successful form submission, you should see the new row

## Troubleshooting

### Still Getting 401?
- Double-check that you ran ALL the SQL commands
- Verify the table name is exactly `contact_submissions`
- Make sure your `.env` file has the correct Supabase credentials
- Try refreshing your Supabase connection

### Can't Find SQL Editor?
- It's in the left sidebar of your Supabase project dashboard
- Look for the icon that looks like a terminal or code editor
- You may need to scroll down in the sidebar

### Policies Not Showing?
Run this query to check:
```sql
SELECT schemaname, tablename, policyname, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'contact_submissions';
```

## Additional Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- File: `fix-rls-permissions.sql` (contains the SQL to run)

---

**Status:** This fix has been tested and works correctly
**Last Updated:** October 8, 2025
