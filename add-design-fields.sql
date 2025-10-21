-- Add design preference fields to existing chat_leads table
ALTER TABLE chat_leads 
ADD COLUMN IF NOT EXISTS inspiration_sites TEXT[],
ADD COLUMN IF NOT EXISTS preferred_colors TEXT,
ADD COLUMN IF NOT EXISTS design_style TEXT;
