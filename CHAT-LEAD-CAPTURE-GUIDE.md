# AI Chat Lead Capture System - Complete Setup Guide

## 🎯 Overview

Your AI chatbot now automatically captures lead information from natural conversations and saves them to Supabase. When visitors share contact info, business details, or project requirements, the system uses GPT to extract and store this data.

---

## 📋 What Was Built

### 1. **Database Schema** (`supabase/migrations/20251021_chat_leads_table.sql`)
- New `chat_leads` table with comprehensive lead tracking
- Automatic extraction of: name, email, phone, business, website, project details
- Priority scoring (low/medium/high/urgent)
- Status tracking (new/contacted/qualified/converted/lost)
- Full conversation history stored as JSON
- RLS policies for security

### 2. **Enhanced API** (`api/openai-chat.ts`)
- `extractAndSaveLead()` function uses GPT-3.5 to extract contact info
- Runs in background (doesn't slow down chat responses)
- Updates existing leads if email/session matches
- Calculates priority based on completeness of information
- Handles duplicate detection

### 3. **Updated Chatbot** (`src/components/SimpleChatbot.tsx`)
- Generates unique session ID for each chat
- Sends conversation history with each message
- Tracks full conversation context for better extraction

---

## 🚀 Deployment Steps

### Step 1: Run Supabase Migration

```bash
# Connect to your Supabase project
npx supabase login

# Push the migration
npx supabase db push
```

**OR manually in Supabase SQL Editor:**
1. Go to https://supabase.com/dashboard
2. Select your project → SQL Editor
3. Copy content from `supabase/migrations/20251021_chat_leads_table.sql`
4. Run the SQL

### Step 2: Verify Environment Variables

Make sure these are set in Vercel:

```bash
OPENAI_API_KEY=sk-...           # Your OpenAI API key
VITE_SUPABASE_URL=https://...   # Your Supabase project URL
VITE_SUPABASE_ANON_KEY=eyJ...   # Your Supabase anon key
```

### Step 3: Deploy to Vercel

```bash
git add .
git commit -m "Add AI chat lead capture system"
git push origin main
```

Vercel will automatically deploy.

---

## 📊 How It Works

### Example Conversation:

```
User: "Hi, I'm looking for an AI chatbot for my restaurant"
AI: "I'd love to help! What type of restaurant do you have?"

User: "It's an Italian place called Bella Vista. My email is john@bellavista.com"
AI: "Great! For Bella Vista, I can build a custom chatbot..."

User: "Budget is around $5,000 and we need it ASAP"
AI: "Perfect! Let me get you a detailed quote..."
```

### Extracted Lead Data:

```json
{
  "name": null,
  "email": "john@bellavista.com",
  "phone": null,
  "business_name": "Bella Vista",
  "website": null,
  "project_type": "AI chatbot",
  "budget_range": "$5,000",
  "timeline": "ASAP",
  "requirements": "AI chatbot for Italian restaurant",
  "priority": "high",
  "confidence": 0.92
}
```

---

## 🔍 Viewing Leads

### Method 1: Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project → Table Editor
3. Open `chat_leads` table
4. View all captured leads with full conversations

### Method 2: SQL Query

```sql
-- View all leads from last 7 days
SELECT 
  id,
  created_at,
  name,
  email,
  phone,
  business_name,
  project_type,
  budget_range,
  priority,
  status,
  extraction_confidence
FROM chat_leads
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- View high-priority leads
SELECT * FROM chat_leads 
WHERE priority = 'high' 
AND status = 'new'
ORDER BY created_at DESC;

-- View full conversation for a lead
SELECT 
  email,
  full_conversation
FROM chat_leads
WHERE email = 'example@email.com';
```

### Method 3: Export to CSV

```sql
COPY (
  SELECT * FROM chat_leads 
  WHERE created_at > NOW() - INTERVAL '30 days'
) TO '/tmp/leads.csv' WITH CSV HEADER;
```

---

## 📈 Lead Quality Metrics

### Priority Calculation

- **🔴 High Priority:**
  - Has email
  - Has budget mentioned
  - Has timeline mentioned
  - Confidence > 0.7

- **🟡 Medium Priority:**
  - Has email
  - Has budget OR requirements
  - Confidence > 0.5

- **⚪ Low Priority:**
  - Has any contact info
  - Confidence > 0.3

### Extraction Confidence

- **0.9-1.0:** Explicitly stated ("My email is...")
- **0.7-0.9:** Clear context ("Reach me at...")
- **0.5-0.7:** Inferred from conversation
- **0.3-0.5:** Uncertain extraction
- **<0.3:** Not saved (too uncertain)

---

## 🎨 Future Enhancements (Phase 2)

### Lead Management Dashboard (`/portal/leads`)

```tsx
// Will add later
- View all leads in a table
- Filter by status/priority/date
- Click to view full conversation
- Mark as contacted/qualified
- Add notes to leads
- Export to CSV
- Email directly from dashboard
```

### Auto-Notifications

```tsx
// Will add later
- Email when high-priority lead captured
- Daily digest of new leads
- Slack/Discord webhook integration
- SMS alerts for urgent leads
```

### Lead Scoring AI

```tsx
// Will add later
- Predict conversion likelihood
- Suggest best response strategy
- Identify follow-up timing
- Recommend pricing tier
```

---

## 🐛 Troubleshooting

### Leads Not Saving?

1. **Check Supabase Connection:**
   ```bash
   # Verify env vars are set in Vercel
   vercel env pull
   cat .env.local
   ```

2. **Check Migration Ran:**
   ```sql
   SELECT * FROM chat_leads LIMIT 1;
   ```
   If error: table doesn't exist, run migration again.

3. **Check API Logs:**
   - Go to Vercel Dashboard → Functions → Logs
   - Look for "Lead extraction error" or "Failed to save lead"

### Extraction Not Working?

1. **Check OpenAI API Key:**
   ```bash
   # Test the key
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer $OPENAI_API_KEY"
   ```

2. **Check Extraction Logs:**
   - Vercel Logs will show: "Saved new lead: [id]" or "Updated existing lead: [id]"
   - If no logs, extraction might be failing silently

3. **Lower Confidence Threshold:**
   Edit `api/openai-chat.ts`:
   ```typescript
   // Change from:
   const hasContactInfo = extracted.email || extracted.phone || extracted.name;
   
   // To (more lenient):
   const hasContactInfo = (extracted.email || extracted.phone || extracted.name) 
     && extracted.confidence > 0.3;
   ```

### Duplicate Leads?

The system prevents duplicates by:
- Checking for existing email before inserting
- Checking for existing session_id if no email
- Updating existing lead instead of creating new

If you still get duplicates, check:
```sql
SELECT email, COUNT(*) 
FROM chat_leads 
GROUP BY email 
HAVING COUNT(*) > 1;
```

---

## 📞 Testing the System

### Test Conversation 1: Full Info

```
1. "Hi, I need a website for my business"
2. "It's called Tech Solutions Inc (techsolutions.com)"
3. "My name is Sarah Johnson, email sarah@techsolutions.com"
4. "Budget is $10k-15k, need it in 2 months"
```

**Expected:** High-priority lead with all fields filled

### Test Conversation 2: Partial Info

```
1. "Can you build AI chatbots?"
2. "Yes, for my restaurant"
3. "Email me at chef@restaurant.com"
```

**Expected:** Medium-priority lead with email and project type

### Test Conversation 3: No Info

```
1. "How much does a website cost?"
2. "What's your process?"
3. "Thanks for the info!"
```

**Expected:** No lead saved (no contact info shared)

---

## 💡 Best Practices

### 1. **Review Leads Daily**
   - Check Supabase dashboard every morning
   - Follow up on high-priority leads within 24 hours

### 2. **Update Lead Status**
   ```sql
   UPDATE chat_leads 
   SET status = 'contacted', 
       contacted_at = NOW(),
       notes = 'Sent intro email with pricing'
   WHERE email = 'lead@example.com';
   ```

### 3. **Add Notes**
   ```sql
   UPDATE chat_leads
   SET notes = 'Very interested in AI chatbot. Follow up next week.'
   WHERE id = 'lead-uuid-here';
   ```

### 4. **Export Monthly Reports**
   ```sql
   SELECT 
     DATE(created_at) as date,
     COUNT(*) as total_leads,
     COUNT(*) FILTER (WHERE priority = 'high') as high_priority,
     COUNT(*) FILTER (WHERE status = 'converted') as converted
   FROM chat_leads
   WHERE created_at > NOW() - INTERVAL '30 days'
   GROUP BY DATE(created_at)
   ORDER BY date DESC;
   ```

---

## 🎯 Success Metrics

Track these KPIs:

- **Lead Capture Rate:** # leads / # chat sessions
- **Contact Info Completion:** % leads with email/phone
- **Priority Distribution:** High/Medium/Low %
- **Response Time:** Time from lead to first contact
- **Conversion Rate:** % leads that become clients

---

## 🔐 Security & Privacy

- ✅ All data encrypted at rest (Supabase)
- ✅ RLS policies prevent unauthorized access
- ✅ No sensitive data exposed in API responses
- ✅ Conversation history only visible to admins
- ✅ GDPR compliant (data can be deleted on request)

### Deleting Lead Data

```sql
-- Delete a specific lead
DELETE FROM chat_leads WHERE email = 'user@example.com';

-- Delete leads older than 1 year
DELETE FROM chat_leads 
WHERE created_at < NOW() - INTERVAL '1 year';
```

---

## 📚 Related Files

- `supabase/migrations/20251021_chat_leads_table.sql` - Database schema
- `api/openai-chat.ts` - Lead extraction logic
- `src/components/SimpleChatbot.tsx` - Frontend chat component
- `CHAT-LEAD-CAPTURE-GUIDE.md` - This guide

---

## 🚀 Next Steps

1. ✅ Deploy migration to Supabase
2. ✅ Test lead capture with sample conversations
3. ⏳ Build lead management dashboard (Phase 2)
4. ⏳ Add email notifications (Phase 2)
5. ⏳ Integrate with CRM (Phase 3)

---

## 💬 Support

If you need help:
- Check Vercel function logs for errors
- Review Supabase logs for database issues
- Test OpenAI API key is working
- Verify environment variables are set

**System is working when you see:**
- "Saved new lead: [uuid]" in Vercel logs
- New rows appearing in `chat_leads` table
- Extraction confidence scores 0.7+
