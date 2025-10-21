-- Add lead scoring column to chat_leads table
ALTER TABLE chat_leads 
ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_leads_score ON chat_leads(lead_score DESC);

-- Update existing leads with calculated scores
UPDATE chat_leads
SET lead_score = (
  -- Budget completeness (+30 points)
  CASE 
    WHEN budget_range IS NOT NULL AND budget_range != '' THEN 30
    ELSE 0
  END +
  -- Timeline urgency (+25 points for ASAP/urgent keywords)
  CASE 
    WHEN timeline ILIKE '%asap%' OR timeline ILIKE '%urgent%' OR timeline ILIKE '%immediately%' THEN 25
    WHEN timeline IS NOT NULL AND timeline != '' THEN 15
    ELSE 0
  END +
  -- Design preferences (+20 points if has inspiration sites)
  CASE 
    WHEN inspiration_sites IS NOT NULL AND inspiration_sites != '' THEN 20
    WHEN preferred_colors IS NOT NULL OR design_style IS NOT NULL THEN 10
    ELSE 0
  END +
  -- Email validation (+15 points)
  CASE 
    WHEN email IS NOT NULL AND email LIKE '%@%.%' THEN 15
    ELSE 0
  END +
  -- Phone number (+10 points)
  CASE 
    WHEN phone IS NOT NULL AND phone != '' THEN 10
    ELSE 0
  END
)
WHERE lead_score = 0;

-- Auto-update status based on score
UPDATE chat_leads
SET 
  status = CASE 
    WHEN lead_score >= 80 THEN 'qualified'
    ELSE status
  END,
  priority = CASE
    WHEN lead_score >= 80 THEN 'high'
    WHEN lead_score >= 60 THEN 'medium'
    ELSE 'low'
  END
WHERE lead_score > 0;

-- Create function to auto-calculate lead score on insert/update
CREATE OR REPLACE FUNCTION calculate_lead_score()
RETURNS TRIGGER AS $$
BEGIN
  NEW.lead_score := (
    -- Budget completeness (+30 points)
    CASE 
      WHEN NEW.budget_range IS NOT NULL AND NEW.budget_range != '' THEN 30
      ELSE 0
    END +
    -- Timeline urgency (+25 points for ASAP/urgent keywords)
    CASE 
      WHEN NEW.timeline ILIKE '%asap%' OR NEW.timeline ILIKE '%urgent%' OR NEW.timeline ILIKE '%immediately%' THEN 25
      WHEN NEW.timeline IS NOT NULL AND NEW.timeline != '' THEN 15
      ELSE 0
    END +
    -- Design preferences (+20 points if has inspiration sites)
    CASE 
      WHEN NEW.inspiration_sites IS NOT NULL AND NEW.inspiration_sites != '' THEN 20
      WHEN NEW.preferred_colors IS NOT NULL OR NEW.design_style IS NOT NULL THEN 10
      ELSE 0
    END +
    -- Email validation (+15 points)
    CASE 
      WHEN NEW.email IS NOT NULL AND NEW.email LIKE '%@%.%' THEN 15
      ELSE 0
    END +
    -- Phone number (+10 points)
    CASE 
      WHEN NEW.phone IS NOT NULL AND NEW.phone != '' THEN 10
      ELSE 0
    END
  );
  
  -- Auto-assign status and priority based on score
  IF NEW.lead_score >= 80 THEN
    NEW.status := 'qualified';
    NEW.priority := 'high';
  ELSIF NEW.lead_score >= 60 THEN
    NEW.priority := 'medium';
  ELSE
    NEW.priority := 'low';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-calculate score
DROP TRIGGER IF EXISTS trigger_calculate_lead_score ON chat_leads;
CREATE TRIGGER trigger_calculate_lead_score
  BEFORE INSERT OR UPDATE ON chat_leads
  FOR EACH ROW
  EXECUTE FUNCTION calculate_lead_score();

-- Add comment
COMMENT ON COLUMN chat_leads.lead_score IS 'Auto-calculated lead quality score (0-100). Higher = more qualified lead.';
