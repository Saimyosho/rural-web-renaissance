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
