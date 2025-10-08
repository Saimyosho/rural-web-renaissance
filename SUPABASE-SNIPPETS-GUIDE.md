# Supabase SQL Snippets Guide

## What Are SQL Snippets in Supabase?

SQL Snippets are **saved, reusable SQL queries** in your Supabase project that you can quickly run whenever needed. They're like bookmarks for SQL commands you use frequently.

## Why Use Snippets?

Instead of:
- Finding the SQL file on your computer
- Copy-pasting the same SQL commands repeatedly
- Rewriting queries from memory

You can:
- **Click and run** saved queries instantly
- **Organize** commonly used SQL in one place
- **Share** snippets with team members
- **Never lose** important SQL commands

## How to Create a Snippet

### Method 1: Save from SQL Editor

1. **Open SQL Editor** in your Supabase dashboard
2. **Write or paste** your SQL query
3. **Click "Save"** or the bookmark icon
4. **Name your snippet** (e.g., "Fix Contact Form RLS")
5. **Add a description** (optional but helpful)
6. Click **"Save Snippet"**

### Method 2: From Snippets Library

1. Go to **SQL Editor** in Supabase
2. Click **"Snippets"** in the left sidebar
3. Click **"New Snippet"**
4. Enter your SQL and metadata
5. Save it

## Example: Saving the Contact Form Fix as a Snippet

### Step-by-Step

1. **Navigate to SQL Editor**
   - In your Supabase dashboard
   - Click "SQL Editor" in left sidebar

2. **Paste the SQL**
   ```sql
   -- Fix RLS permissions for contact_submissions table
   ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
   
   DROP POLICY IF EXISTS "Enable insert for anon users" ON contact_submissions;
   
   CREATE POLICY "Enable insert for anon users" ON contact_submissions
       FOR INSERT
       TO anon
       WITH CHECK (true);
   ```

3. **Save as Snippet**
   - Click "Save" button (top right)
   - Name: "Fix Contact Form RLS Permissions"
   - Description: "Allows anonymous users to submit contact forms"
   - Click "Save"

4. **Run Anytime**
   - Go to Snippets → "Fix Contact Form RLS Permissions"
   - Click "Run"
   - Done!

## Useful Snippets to Create for Your Project

### 1. Check RLS Policies
```sql
-- View all RLS policies for contact_submissions
SELECT schemaname, tablename, policyname, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'contact_submissions';
```
**Name:** "Check Contact Form Policies"

### 2. View Recent Submissions
```sql
-- View last 10 contact form submissions
SELECT id, name, email, company, created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 10;
```
**Name:** "Recent Contact Submissions"

### 3. Count Submissions by Day
```sql
-- Count submissions per day (last 7 days)
SELECT 
    DATE(created_at) as submission_date,
    COUNT(*) as total_submissions
FROM contact_submissions
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY submission_date DESC;
```
**Name:** "Weekly Submission Stats"

### 4. Reset RLS (If Needed)
```sql
-- Remove all policies and start fresh
DROP POLICY IF EXISTS "Enable insert for anon users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON contact_submissions;

-- Disable RLS temporarily (for testing only!)
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
```
**Name:** "Reset RLS (Testing Only)" ⚠️

### 5. Enable RLS Properly
```sql
-- Enable RLS and create proper policies
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for anon users" ON contact_submissions
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users" ON contact_submissions
    FOR INSERT TO authenticated WITH CHECK (true);
```
**Name:** "Enable RLS with Insert Policies"

## Managing Your Snippets

### Organizing Snippets
- Use **clear, descriptive names**
- Add **helpful descriptions**
- Group related snippets together
- Use **folders** (if available in your Supabase version)

### Naming Conventions
Good names:
- ✅ "Fix Contact Form RLS"
- ✅ "View Recent Submissions"
- ✅ "Reset Database Policies"

Bad names:
- ❌ "Query 1"
- ❌ "Test"
- ❌ "Untitled"

### Descriptions
Include:
- **What it does**: "Allows anonymous contact form submissions"
- **When to use**: "Run this after creating the contact_submissions table"
- **Warning**: "⚠️ This disables security - testing only!"

## Best Practices

### 1. Comment Your SQL
```sql
-- Fix contact form 401 errors
-- This enables anonymous users to submit the contact form
-- Run this once after setting up the database

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
```

### 2. Include Rollback Commands
```sql
-- Enable feature
CREATE POLICY "new_policy" ON table_name ...;

-- Rollback (run if something goes wrong):
-- DROP POLICY "new_policy" ON table_name;
```

### 3. Test Before Saving
- Run the SQL first
- Verify it works
- Then save as snippet

### 4. Keep Snippets Updated
- If you modify a table, update related snippets
- Remove obsolete snippets
- Update descriptions when logic changes

## Common Use Cases

### Development
- Create/reset test data
- Enable/disable features
- Check database state

### Maintenance
- View logs and submissions
- Check policies and permissions
- Analyze usage statistics

### Troubleshooting
- Reset RLS policies
- Verify configurations
- Debug permission issues

### Deployment
- Run migrations
- Update policies
- Initialize new features

## Snippet Categories for Your Project

### 🔧 Setup & Configuration
- Initial database setup
- Enable RLS on tables
- Create policies

### 📊 Analytics & Reports
- Count submissions
- View statistics
- Generate reports

### 🐛 Debugging
- Check policies
- View recent errors
- Test permissions

### 🔄 Maintenance
- Clean old data
- Update configurations
- Reset features

## Tips & Tricks

### Keyboard Shortcuts
- **Run Query**: Usually `Ctrl+Enter` or `Cmd+Enter`
- **Save Snippet**: `Ctrl+S` or `Cmd+S`
- **New Tab**: Open multiple queries at once

### Variables in Snippets
Some Supabase versions support variables:
```sql
-- Example with variable
SELECT * FROM contact_submissions 
WHERE email = '{{email}}';
```
Replace `{{email}}` when you run it.

### Chaining Snippets
Run multiple snippets in sequence:
1. Reset policies
2. Create new policies
3. Verify policies

## Security Warnings ⚠️

### Don't Save These as Snippets:
- ❌ Passwords or API keys
- ❌ Production deletion commands
- ❌ Sensitive user data queries
- ❌ Dangerous ALTER/DROP commands without safety checks

### Safe to Save:
- ✅ SELECT queries (read-only)
- ✅ Policy creation with proper checks
- ✅ Analytics queries
- ✅ Development/testing helpers

## For Your Contact Form Fix

### Recommended Snippet
**Name:** "Fix Contact Form 401 Error"

**Description:**
```
Fixes the 401 Unauthorized error on contact form submissions.
Enables anonymous users to insert into contact_submissions table.
Run this once after creating the database table.
Safe for production use.
```

**SQL:**
```sql
-- Fix RLS permissions for contact_submissions table
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable insert for anon users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON contact_submissions;

CREATE POLICY "Enable insert for anon users" ON contact_submissions
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users" ON contact_submissions
    FOR INSERT TO authenticated WITH CHECK (true);

-- Verify
SELECT tablename, policyname, roles 
FROM pg_policies 
WHERE tablename = 'contact_submissions';
```

Now you can fix the contact form with one click anytime! 🎉

---

**Related Files:**
- `fix-rls-permissions.sql` - The SQL to save as a snippet
- `CONTACT-FORM-FIX-GUIDE.md` - Full troubleshooting guide

**Last Updated:** October 8, 2025
