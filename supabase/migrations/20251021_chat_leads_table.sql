-- Create chat_leads table for capturing leads from AI chatbot conversations
CREATE TABLE IF NOT EXISTS chat_leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information (extracted from chat)
  name TEXT,
  email TEXT,
  phone TEXT,
  business_name TEXT,
  website TEXT,
  
  -- Project Details
  project_type TEXT, -- "website", "ai chatbot", "automation", etc.
  budget_range TEXT, -- "under $5k", "$5k-15k", "$15k+", etc.
  timeline TEXT, -- "urgent", "1-3 months", "flexible", etc.
  requirements TEXT, -- Full description of what they want
  
  -- Metadata
  full_conversation JSONB DEFAULT '[]'::jsonb, -- Complete chat history
  extraction_confidence FLOAT DEFAULT 0.0, -- AI confidence score (0-1)
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  session_id TEXT, -- To track multiple conversations from same user
  
  -- Lead Management
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  notes TEXT, -- Manual notes from sales team
  contacted_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE,
  
  -- Email validation constraint
  CONSTRAINT valid_email CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Indexes for fast searching and filtering
CREATE INDEX IF NOT EXISTS idx_chat_leads_email ON chat_leads(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_chat_leads_phone ON chat_leads(phone) WHERE phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_chat_leads_created_at ON chat_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_leads_status ON chat_leads(status);
CREATE INDEX IF NOT EXISTS idx_chat_leads_priority ON chat_leads(priority);
CREATE INDEX IF NOT EXISTS idx_chat_leads_session ON chat_leads(session_id) WHERE session_id IS NOT NULL;

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_chat_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER chat_leads_updated_at
  BEFORE UPDATE ON chat_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_leads_updated_at();

-- Enable Row Level Security
ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all leads
CREATE POLICY "Authenticated users can read chat leads"
  ON chat_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to insert leads
CREATE POLICY "Authenticated users can insert chat leads"
  ON chat_leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update leads
CREATE POLICY "Authenticated users can update chat leads"
  ON chat_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow service role (API) to insert leads
CREATE POLICY "Service role can insert chat leads"
  ON chat_leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Allow anon (for API) to insert leads
CREATE POLICY "Anonymous can insert chat leads"
  ON chat_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Comments
COMMENT ON TABLE chat_leads IS 'Leads captured from AI chatbot conversations with automatic contact extraction';
COMMENT ON COLUMN chat_leads.extraction_confidence IS 'AI confidence score (0-1) for extracted information accuracy';
COMMENT ON COLUMN chat_leads.full_conversation IS 'Complete chat history as JSON array of message objects';
COMMENT ON COLUMN chat_leads.priority IS 'Calculated based on budget, timeline, and completeness of information';
