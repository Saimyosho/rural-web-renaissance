-- Analytics Schema for Data Monetization
-- Only accessible by superadmin role

-- Extended user profiles with business intelligence data
CREATE TABLE IF NOT EXISTS user_profiles_extended (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Company Profile
  company_name TEXT,
  naics_code VARCHAR(10),
  industry_category TEXT,
  headcount VARCHAR(20) CHECK (headcount IN ('1-5', '6-20', '21-50', '51-100', '100+')),
  
  -- Location
  city TEXT,
  postal_code VARCHAR(20),
  country VARCHAR(2) DEFAULT 'US',
  region TEXT,
  operating_radius_km INTEGER,
  
  -- Business Goals (JSONB array of {type, priority})
  goals JSONB DEFAULT '[]'::jsonb,
  
  -- Budget & Timeline
  monthly_budget VARCHAR(20) CHECK (monthly_budget IN ('<500', '500-1000', '1000-2500', '2500+')),
  urgency_weeks VARCHAR(10) CHECK (urgency_weeks IN ('<2', '2-4', '4-8', '8+')),
  decision_stage VARCHAR(20) CHECK (decision_stage IN ('researching', 'comparing', 'ready', 'need_approval')),
  
  -- Stack Intent
  stack_needs TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Competitive Intelligence
  competitors TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Style Preferences
  style_preferences JSONB DEFAULT '{}'::jsonb,
  
  -- Content Readiness
  has_content JSONB DEFAULT '{}'::jsonb,
  
  -- Consent & Privacy
  consent_preferences JSONB DEFAULT '{"analytics": true, "product_improvement": true, "partner_insights": false}'::jsonb,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events tracking table
CREATE TABLE IF NOT EXISTS events (
  event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID,
  event_type VARCHAR(50) NOT NULL,
  page VARCHAR(255),
  
  -- UTM Parameters
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_term VARCHAR(100),
  
  -- Geo Data
  country VARCHAR(2),
  region VARCHAR(100),
  postal VARCHAR(20),
  
  -- Device Info
  device_class VARCHAR(20) CHECK (device_class IN ('mobile', 'desktop', 'tablet')),
  device_os VARCHAR(50),
  device_browser VARCHAR(50),
  
  -- Context
  schema_version VARCHAR(10) DEFAULT 'v1',
  ab_variant VARCHAR(50),
  feature_flags TEXT[],
  
  -- Flexible payload
  payload JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_ts ON events(ts DESC);
CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_ext_naics ON user_profiles_extended(naics_code);
CREATE INDEX IF NOT EXISTS idx_user_profiles_ext_country ON user_profiles_extended(country, region);

-- Analytics Views (for fast queries)

-- Daily signups by source
CREATE OR REPLACE VIEW analytics_daily_signups AS
SELECT 
  DATE(e.ts) as signup_date,
  COALESCE(e.utm_source, 'direct') as source,
  COALESCE(e.utm_campaign, 'none') as campaign,
  COUNT(DISTINCT e.user_id) as signups
FROM events e
WHERE e.event_type = 'signup_submitted'
GROUP BY 1, 2, 3
ORDER BY 1 DESC;

-- Conversion funnel
CREATE OR REPLACE VIEW analytics_conversion_funnel AS
SELECT 
  p.naics_code,
  p.country,
  COUNT(DISTINCT p.user_id) as total_signups,
  COUNT(DISTINCT CASE WHEN onboard.user_id IS NOT NULL THEN p.user_id END) as completed_onboarding,
  COUNT(DISTINCT CASE WHEN pub.user_id IS NOT NULL THEN p.user_id END) as published_site,
  COUNT(DISTINCT CASE WHEN paid.user_id IS NOT NULL THEN p.user_id END) as converted_paid,
  ROUND(
    COUNT(DISTINCT CASE WHEN pub.user_id IS NOT NULL THEN p.user_id END)::NUMERIC / 
    NULLIF(COUNT(DISTINCT p.user_id), 0) * 100, 
    2
  ) as publish_rate_pct
FROM user_profiles_extended p
LEFT JOIN events onboard ON p.user_id = onboard.user_id AND onboard.event_type = 'onboarding_completed'
LEFT JOIN events pub ON p.user_id = pub.user_id AND pub.event_type = 'site_published'
LEFT JOIN events paid ON p.user_id = paid.user_id AND paid.event_type = 'subscription_upgraded'
WHERE p.created_at > NOW() - INTERVAL '90 days'
GROUP BY 1, 2
HAVING COUNT(DISTINCT p.user_id) >= 5  -- Privacy: K-anonymity
ORDER BY total_signups DESC;

-- AI Tool Usage
CREATE OR REPLACE VIEW analytics_ai_usage AS
SELECT 
  DATE(e.ts) as usage_date,
  e.payload->>'app_name' as app_name,
  COUNT(*) as generations,
  COUNT(DISTINCT e.user_id) as unique_users,
  AVG(CAST(e.payload->>'generation_time_ms' AS INTEGER)) as avg_generation_time_ms
FROM events e
WHERE e.event_type = 'ai_generation_completed'
  AND e.ts > NOW() - INTERVAL '30 days'
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC;

-- User engagement metrics
CREATE OR REPLACE VIEW analytics_user_engagement AS
SELECT 
  p.user_id,
  p.naics_code,
  p.monthly_budget,
  up.tier,
  up.generation_count,
  COUNT(DISTINCT e.event_id) as total_events,
  COUNT(DISTINCT DATE(e.ts)) as active_days,
  MAX(e.ts) as last_active,
  EXTRACT(EPOCH FROM (NOW() - MAX(e.ts)))/86400 as days_since_last_active,
  COUNT(DISTINCT CASE WHEN e.event_type LIKE 'integration_%' THEN e.event_id END) as integration_attempts
FROM user_profiles_extended p
JOIN user_profiles up ON p.user_id = up.id
LEFT JOIN events e ON p.user_id = e.user_id
WHERE p.created_at > NOW() - INTERVAL '90 days'
GROUP BY 1, 2, 3, 4, 5
ORDER BY total_events DESC;

-- Industry benchmarks (K-anonymous, k>=10)
CREATE OR REPLACE VIEW analytics_industry_benchmarks AS
SELECT 
  p.naics_code,
  p.country,
  COUNT(DISTINCT p.user_id) as total_users,
  AVG(EXTRACT(EPOCH FROM (pub.ts - signup.ts))/86400) as avg_days_to_publish,
  COUNT(DISTINCT CASE WHEN pub.user_id IS NOT NULL THEN p.user_id END)::FLOAT / 
    NULLIF(COUNT(DISTINCT p.user_id), 0) as publish_rate,
  AVG(up.generation_count) as avg_generations_used,
  COUNT(DISTINCT CASE WHEN up.tier = 'pro' THEN p.user_id END)::FLOAT / 
    NULLIF(COUNT(DISTINCT p.user_id), 0) as conversion_to_paid_rate
FROM user_profiles_extended p
JOIN user_profiles up ON p.user_id = up.id
LEFT JOIN events signup ON p.user_id = signup.user_id AND signup.event_type = 'signup_submitted'
LEFT JOIN events pub ON p.user_id = pub.user_id AND pub.event_type = 'site_published'
WHERE p.created_at > NOW() - INTERVAL '90 days'
GROUP BY 1, 2
HAVING COUNT(DISTINCT p.user_id) >= 10  -- K-anonymity threshold
ORDER BY total_users DESC;

-- Churn risk indicators
CREATE OR REPLACE VIEW analytics_churn_risk AS
SELECT 
  p.user_id,
  p.company_name,
  p.naics_code,
  up.tier,
  up.generation_count,
  up.generation_limit,
  EXTRACT(EPOCH FROM (NOW() - MAX(e.ts)))/86400 as days_inactive,
  COUNT(DISTINCT CASE WHEN e.event_type LIKE '%_error' THEN e.event_id END) as error_count,
  CASE 
    WHEN EXTRACT(EPOCH FROM (NOW() - MAX(e.ts)))/86400 > 14 THEN 'high'
    WHEN EXTRACT(EPOCH FROM (NOW() - MAX(e.ts)))/86400 > 7 THEN 'medium'
    ELSE 'low'
  END as churn_risk_level
FROM user_profiles_extended p
JOIN user_profiles up ON p.user_id = up.id
LEFT JOIN events e ON p.user_id = e.user_id
WHERE up.tier != 'superadmin'
  AND p.created_at < NOW() - INTERVAL '7 days'
GROUP BY 1, 2, 3, 4, 5, 6
HAVING EXTRACT(EPOCH FROM (NOW() - MAX(e.ts)))/86400 > 3
ORDER BY days_inactive DESC;

-- RLS Policies (Only superadmin can access)
ALTER TABLE user_profiles_extended ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Superadmin can see everything
CREATE POLICY "Superadmin full access to extended profiles" ON user_profiles_extended
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'superadmin'
    )
  );

CREATE POLICY "Superadmin full access to events" ON events
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'superadmin'
    )
  );

-- Users can only see their own extended profile
CREATE POLICY "Users can view own extended profile" ON user_profiles_extended
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own extended profile" ON user_profiles_extended
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Function to update extended profile timestamp
CREATE OR REPLACE FUNCTION update_extended_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_extended_updated_at
  BEFORE UPDATE ON user_profiles_extended
  FOR EACH ROW
  EXECUTE FUNCTION update_extended_profile_updated_at();

-- Grant access to views for superadmin
GRANT SELECT ON analytics_daily_signups TO authenticated;
GRANT SELECT ON analytics_conversion_funnel TO authenticated;
GRANT SELECT ON analytics_ai_usage TO authenticated;
GRANT SELECT ON analytics_user_engagement TO authenticated;
GRANT SELECT ON analytics_industry_benchmarks TO authenticated;
GRANT SELECT ON analytics_churn_risk TO authenticated;
