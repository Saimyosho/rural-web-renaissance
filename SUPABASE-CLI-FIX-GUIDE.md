# Fix Contact Form with Supabase CLI

## Yes! You Can Use the Supabase CLI

The Supabase CLI is a command-line tool that lets you manage your Supabase project from your terminal. It's faster than using the dashboard!

## Check If Supabase CLI Is Installed

```bash
supabase --version
```

If you see a version number, you're good to go! If not, see installation section below.

## Quick Fix - Run SQL via CLI

### Option 1: Direct SQL Execution (Fastest)

```bash
supabase db execute --file fix-rls-permissions.sql --project-ref YOUR_PROJECT_REF
```

Replace `YOUR_PROJECT_REF` with your actual project reference (found in your Supabase dashboard URL).

### Option 2: Using Link + Execute

If you've linked your project:

```bash
# First, link your project (one time only)
supabase link --project-ref YOUR_PROJECT_REF

# Then run the SQL file
supabase db execute --file fix-rls-permissions.sql
```

### Option 3: Inline SQL (No File Needed)

```bash
supabase db execute --sql "
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS \"Enable insert for anon users\" ON contact_submissions;

CREATE POLICY \"Enable insert for anon users\" ON contact_submissions
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY \"Enable insert for authenticated users\" ON contact_submissions
    FOR INSERT TO authenticated WITH CHECK (true);
" --project-ref YOUR_PROJECT_REF
```

## Finding Your Project Reference

Your project ref is in your Supabase URL:
- Dashboard URL: `https://supabase.com/dashboard/project/YOUR_PROJECT_REF`
- Or in your `.env` file: Look for `VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co`

## Complete CLI Workflow

### Step 1: Install Supabase CLI (If Needed)

**Windows (PowerShell):**
```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

Or with npm:
```bash
npm install -g supabase
```

**Mac:**
```bash
brew install supabase/tap/supabase
```

**Linux:**
```bash
brew install supabase/tap/supabase
```

### Step 2: Login to Supabase

```bash
supabase login
```

This opens your browser to authenticate.

### Step 3: Link Your Project (One Time)

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

You'll need your database password (from Supabase dashboard).

### Step 4: Run the Fix

```bash
supabase db execute --file fix-rls-permissions.sql
```

Done! ✅

## Verify It Worked

Check if policies were created:

```bash
supabase db execute --sql "
SELECT tablename, policyname, roles 
FROM pg_policies 
WHERE tablename = 'contact_submissions';
"
```

You should see output showing your policies!

## Advantages of Using CLI

### ✅ Faster
- No need to open browser
- Run from your terminal
- Script-friendly

### ✅ Version Control
- SQL files tracked in Git
- Easy rollback
- Team collaboration

### ✅ Automation
- Include in deployment scripts
- CI/CD integration
- Repeatable processes

### ✅ Local Development
- Test locally before production
- Consistent environment
- Better debugging

## Full Example Script

Create a file called `apply-fix.sh`:

```bash
#!/bin/bash

# Fix contact form RLS permissions
echo "Fixing contact form RLS permissions..."

supabase db execute --file fix-rls-permissions.sql

if [ $? -eq 0 ]; then
    echo "✅ Success! Contact form RLS fixed."
    echo "Verifying policies..."
    
    supabase db execute --sql "
    SELECT tablename, policyname, roles 
    FROM pg_policies 
    WHERE tablename = 'contact_submissions';
    "
else
    echo "❌ Error: Failed to apply RLS fix"
    exit 1
fi
```

Make it executable:
```bash
chmod +x apply-fix.sh
```

Run it:
```bash
./apply-fix.sh
```

## Common CLI Commands

### Database Commands

```bash
# Execute SQL file
supabase db execute --file your-file.sql

# Execute inline SQL
supabase db execute --sql "SELECT * FROM your_table;"

# Reset database (careful!)
supabase db reset

# Generate types
supabase gen types typescript --local > database.types.ts
```

### Project Commands

```bash
# Initialize new project
supabase init

# Link to existing project
supabase link

# Start local Supabase
supabase start

# Stop local Supabase
supabase stop
```

### Migration Commands

```bash
# Create new migration
supabase migration new fix_contact_form_rls

# List migrations
supabase migration list

# Apply migrations
supabase db push
```

## Best Practice: Use Migrations

For production, create a proper migration:

```bash
# Create migration file
supabase migration new fix_contact_form_rls
```

This creates a file like `supabase/migrations/20250108000000_fix_contact_form_rls.sql`

Edit it:
```sql
-- Fix RLS permissions for contact_submissions table
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable insert for anon users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON contact_submissions;

CREATE POLICY "Enable insert for anon users" ON contact_submissions
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users" ON contact_submissions
    FOR INSERT TO authenticated WITH CHECK (true);
```

Apply it:
```bash
supabase db push
```

## Comparison: Dashboard vs CLI

### Use Dashboard When:
- ✅ Quick one-time fixes
- ✅ Exploring/testing queries
- ✅ Visual table editing
- ✅ Viewing logs/metrics
- ✅ Managing API keys

### Use CLI When:
- ✅ Automated deployments
- ✅ Version-controlled changes
- ✅ Team collaboration
- ✅ CI/CD pipelines
- ✅ Local development
- ✅ Scripting/automation

## Troubleshooting CLI

### "Command not found: supabase"

Install the CLI:
```bash
npm install -g supabase
```

### "Project not linked"

Link your project:
```bash
supabase link --project-ref YOUR_PROJECT_REF
```

### "Authentication failed"

Login again:
```bash
supabase login
```

### "Permission denied"

Check your database password and project access.

### "File not found"

Make sure you're in the correct directory:
```bash
ls fix-rls-permissions.sql  # Should show the file
```

## Your Quick Command

Since you already have the `fix-rls-permissions.sql` file:

```bash
# Option A: If not linked yet
supabase db execute --file fix-rls-permissions.sql --project-ref YOUR_PROJECT_REF

# Option B: If already linked
supabase db execute --file fix-rls-permissions.sql
```

That's it! Your contact form will work. ✅

## Recommended Workflow

1. **Development:** Use CLI with local Supabase (`supabase start`)
2. **Testing:** Apply changes to staging with CLI
3. **Production:** Use migrations (`supabase db push`)
4. **Emergency Fix:** Use dashboard or CLI direct execute

## Resources

- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [CLI Reference](https://supabase.com/docs/reference/cli/introduction)
- [Database Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)

---

**Quick Answer:** Yes! Just run:
```bash
supabase db execute --file fix-rls-permissions.sql --project-ref YOUR_PROJECT_REF
```

**Related Files:**
- `fix-rls-permissions.sql` - The SQL to run
- `CONTACT-FORM-FIX-GUIDE.md` - Dashboard method
- `SUPABASE-SNIPPETS-GUIDE.md` - Saving as snippet

**Last Updated:** October 8, 2025
