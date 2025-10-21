import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Simple in-memory rate limiting (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Types for lead extraction
interface ExtractedLead {
  name: string | null;
  email: string | null;
  phone: string | null;
  businessName: string | null;
  website: string | null;
  projectType: string | null;
  budgetRange: string | null;
  timeline: string | null;
  requirements: string | null;
  confidence: number;
}

interface Message {
  role: string;
  content: string;
}

function getRateLimitKey(req: VercelRequest): string {
  // Get IP from various headers (Vercel provides these)
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0]) : req.socket.remoteAddress;
  return ip || 'unknown';
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const limit = 10; // 10 requests per hour
  const windowMs = 60 * 60 * 1000; // 1 hour

  let record = rateLimitMap.get(key);

  // Clean up old entries
  if (record && now > record.resetTime) {
    rateLimitMap.delete(key);
    record = undefined;
  }

  if (!record) {
    record = { count: 0, resetTime: now + windowMs };
    rateLimitMap.set(key, record);
  }

  record.count++;

  return {
    allowed: record.count <= limit,
    remaining: Math.max(0, limit - record.count),
  };
}

// Extract lead information using GPT
async function extractAndSaveLead(
  conversation: Message[],
  metadata: { ip: string; userAgent: string; referrer: string; sessionId: string },
  apiKey: string
): Promise<void> {
  if (!supabase) {
    console.log('Supabase not configured, skipping lead extraction');
    return;
  }

  // Build extraction prompt
  const conversationText = conversation
    .map(m => `${m.role}: ${m.content}`)
    .join('\n');

  const extractionPrompt = `Analyze this conversation and extract ANY contact information, business details, or project requirements.

Conversation:
${conversationText}

Extract and return ONLY valid JSON (no markdown, no explanation):
{
  "name": "full name if mentioned, otherwise null",
  "email": "email address if mentioned, otherwise null",
  "phone": "phone number if mentioned (any format), otherwise null",
  "businessName": "business or company name if mentioned, otherwise null",
  "website": "website URL if mentioned, otherwise null",
  "projectType": "type of project needed (website, chatbot, automation, etc) or null",
  "budgetRange": "budget mentioned (e.g., '$5k-10k', 'under $5000') or null",
  "timeline": "timeline mentioned (e.g., 'urgent', '1-2 months', 'ASAP') or null",
  "requirements": "brief summary of what they need or null",
  "confidence": 0.0-1.0 score
}

Return null for any field not found. Be conservative - only extract explicitly mentioned information.`;

  try {
    // Call GPT for extraction
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a data extraction assistant. Extract contact information from conversations and return valid JSON only.' },
          { role: 'user', content: extractionPrompt }
        ],
        temperature: 0.1, // Low temperature for consistent extraction
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      console.error('GPT extraction failed:', await response.text());
      return;
    }

    const data = await response.json();
    const extractedText = data.choices[0]?.message?.content || '{}';
    
    // Parse JSON (handle markdown wrapping)
    let extracted: ExtractedLead;
    try {
      const jsonMatch = extractedText.match(/\{[\s\S]*\}/);
      extracted = JSON.parse(jsonMatch ? jsonMatch[0] : extractedText);
    } catch (e) {
      console.error('Failed to parse extracted JSON:', extractedText);
      return;
    }

    // Only save if we have at least some contact info
    const hasContactInfo = extracted.email || extracted.phone || extracted.name;
    if (!hasContactInfo) {
      return; // No lead to save
    }

    // Calculate priority
    let priority = 'low';
    if (extracted.email && extracted.budgetRange && extracted.timeline) {
      priority = 'high';
    } else if (extracted.email && (extracted.budgetRange || extracted.requirements)) {
      priority = 'medium';
    }

    // Check if lead already exists (by email or session)
    let existingLead = null;
    if (extracted.email) {
      const { data: existing } = await supabase
        .from('chat_leads')
        .select('id, full_conversation')
        .eq('email', extracted.email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      existingLead = existing;
    } else if (metadata.sessionId) {
      const { data: existing } = await supabase
        .from('chat_leads')
        .select('id, full_conversation')
        .eq('session_id', metadata.sessionId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      existingLead = existing;
    }

    if (existingLead) {
      // Update existing lead with new info
      await supabase
        .from('chat_leads')
        .update({
          name: extracted.name || undefined,
          email: extracted.email || undefined,
          phone: extracted.phone || undefined,
          business_name: extracted.businessName || undefined,
          website: extracted.website || undefined,
          project_type: extracted.projectType || undefined,
          budget_range: extracted.budgetRange || undefined,
          timeline: extracted.timeline || undefined,
          requirements: extracted.requirements || undefined,
          full_conversation: conversation,
          extraction_confidence: extracted.confidence,
          priority,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingLead.id);
      
      console.log('Updated existing lead:', existingLead.id);
    } else {
      // Insert new lead
      const { data, error } = await supabase
        .from('chat_leads')
        .insert({
          name: extracted.name,
          email: extracted.email,
          phone: extracted.phone,
          business_name: extracted.businessName,
          website: extracted.website,
          project_type: extracted.projectType,
          budget_range: extracted.budgetRange,
          timeline: extracted.timeline,
          requirements: extracted.requirements,
          full_conversation: conversation,
          extraction_confidence: extracted.confidence,
          ip_address: metadata.ip,
          user_agent: metadata.userAgent,
          referrer: metadata.referrer,
          session_id: metadata.sessionId,
          priority,
          status: 'new',
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to save lead:', error);
      } else {
        console.log('Saved new lead:', data.id);
      }
    }
  } catch (error) {
    console.error('Lead extraction error:', error);
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting check
  const rateLimitKey = getRateLimitKey(req);
  const { allowed, remaining } = checkRateLimit(rateLimitKey);

  // Add rate limit headers
  res.setHeader('X-RateLimit-Limit', '10');
  res.setHeader('X-RateLimit-Remaining', remaining.toString());

  if (!allowed) {
    return res.status(429).json({ 
      error: 'Rate limit exceeded. Please try again later.',
      success: false 
    });
  }

  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Missing input' });
    }

    // Input length validation (prevent abuse)
    if (input.length > 500) {
      return res.status(400).json({ 
        error: 'Input too long. Please keep messages under 500 characters.',
        success: false 
      });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not found in environment variables');
      return res.status(500).json({ 
        error: 'API key not configured',
        success: false 
      });
    }

    // System prompt to guide the AI
    const systemPrompt = `You are Sheldon Gunby's AI assistant on his portfolio website (rural-web-renaissance.vercel.app).

ABOUT SHELDON GUNBY:
- Full Stack Developer & AI Integration Specialist
- Based in rural Pennsylvania, passionate about bringing modern tech to underserved communities
- Southern New Hampshire University student (Computer Science & Business)
- 4+ years experience in web development and AI/ML
- Expert in modern web technologies and AI integration
- Contact: SheldonGunby@icloud.com | 724-490-8102

TECHNICAL EXPERTISE:
Frontend: React, TypeScript, Next.js, TailwindCSS, Framer Motion, shadcn/ui
Backend: Node.js, Python, Supabase, Vercel Edge Functions
AI/ML: OpenAI GPT-4/3.5, HuggingFace (Gemma-2, Llama), Custom ML models
Databases: Supabase/PostgreSQL, Redis, Vector databases
DevOps: Vercel, GitHub Actions, Docker, CI/CD pipelines
Design: Figma, responsive design, accessibility (WCAG), UI/UX best practices

SERVICES OFFERED:

1. AI Integration Services ($2,500 - $15,000):
   - Custom ChatGPT chatbots for customer service
   - AI-powered review response automation
   - Content generation systems
   - Sentiment analysis & data insights
   - RAG (Retrieval Augmented Generation) systems
   - AI agent development for business automation

2. Full-Stack Web Development ($3,000 - $25,000):
   - Custom SaaS platforms from scratch
   - Modern, responsive websites with animations
   - Progressive Web Apps (PWAs)
   - Real-time applications
   - API development and integration
   - Database design and optimization

3. Business Automation ($1,500 - $10,000):
   - Booking and appointment systems
   - CRM integrations
   - Workflow automation
   - Email automation
   - Payment processing integration
   - Analytics dashboards

4. Specialized Solutions:
   - Medical transport optimization (AI route planning)
   - Restaurant booking systems with AI recommendations
   - Salon/spa management platforms
   - E-commerce with AI product recommendations
   - Virtual interior design tools
   - Renovation project portals

PORTFOLIO HIGHLIGHTS:
- Rural Web Renaissance: Multi-tenant SaaS with AI chatbot, user auth, analytics
- AI Transport Optimizer: Medical transport route optimization using ML
- Review Response AI: Automated professional review replies
- Virtual Design Studio: AI-powered interior design suggestions
- Content Writer AI: SEO-optimized content generation
- Custom renovation portals with real-time collaboration

PRICING STRUCTURE:
- Consultation: FREE initial call (30 minutes)
- Small projects: $1,500 - $5,000 (landing pages, simple automation)
- Medium projects: $5,000 - $15,000 (full websites, AI chatbots, booking systems)
- Large projects: $15,000 - $50,000+ (SaaS platforms, complex AI systems)
- Hourly rate: $75/hour (for maintenance and small tasks)
- Monthly retainers available: $500 - $5,000/month

TIMELINE:
- Simple websites: 1-2 weeks
- AI chatbot integration: 1-3 weeks
- Medium SaaS: 6-12 weeks
- Complex platforms: 3-6 months
- Rush projects: +30% fee

IDEAL CLIENTS:
- Small businesses wanting to automate operations
- Restaurants, salons, medical offices
- Rural businesses needing digital transformation
- Startups needing MVP development
- Companies wanting AI integration
- Businesses outgrowing no-code tools

WHY CHOOSE SHELDON:
- Brings Silicon Valley quality to rural/small business budgets
- Personal attention (not an agency with 20 clients)
- Transparent communication throughout project
- Modern tech stack (future-proof)
- AI expertise (ChatGPT, HuggingFace, custom models)
- Responsive design & mobile-first approach
- Ongoing support and maintenance available
- Understands small business needs and constraints

PROCESS:
1. Free consultation to understand needs
2. Custom quote and project timeline
3. 50% deposit to start
4. Weekly progress updates
5. Iterative development with feedback
6. Testing and deployment
7. Training and documentation
8. 30 days post-launch support included
9. Ongoing maintenance plans available

YOUR ROLE AS AI ASSISTANT:
- Answer questions about Sheldon's services, pricing, and expertise
- Explain technical concepts in simple terms
- Help visitors understand how AI/tech can solve their business problems
- Provide realistic timelines and budgets
- Encourage them to book a FREE consultation
- Be friendly, professional, and helpful
- Keep responses concise (2-5 sentences) but informative
- Use visitor's language level (avoid jargon unless they use it)
- Ask clarifying questions when helpful
- Share relevant portfolio examples
- Emphasize value and ROI, not just features

RESPONSE STYLE:
- Start warm and conversational ("Great question!" or "I'd love to help!")
- Be specific with numbers (prices, timelines)
- Use examples from portfolio when relevant
- End with gentle call-to-action (book consultation, email, call)
- Balance technical accuracy with accessibility
- Show enthusiasm for solving their problem
- Be honest about what can/can't be done

COMMON QUESTIONS TO HANDLE:
- "How much does a website cost?" → Explain range, factors, ask about their needs
- "Can you build X?" → Yes, explain how, share similar examples
- "Do you work with small businesses?" → Absolutely! That's the specialty
- "How long does it take?" → Provide range based on scope
- "Do you do AI?" → Yes! Explain AI capabilities with examples
- "What makes you different?" → Personal service, modern tech, fair pricing
- "Can you help my [industry]?" → Yes, explain relevant experience

Remember: You're representing Sheldon, so be competent, friendly, and solution-focused. The goal is to start conversations that lead to consultations!`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: input }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return res.status(response.status).json({ 
        error: 'AI service error',
        success: false 
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      return res.status(500).json({ 
        error: 'No response from AI',
        success: false 
      });
    }

    // Extract lead information from the conversation
    const conversationHistory = req.body.conversationHistory || [];
    const fullConversation = [
      ...conversationHistory,
      { role: 'user', content: input },
      { role: 'assistant', content: aiResponse }
    ];

    // Try to extract lead info (run in background, don't block response)
    if (supabase) {
      extractAndSaveLead(
        fullConversation,
        {
          ip: getRateLimitKey(req),
          userAgent: req.headers['user-agent'] as string || '',
          referrer: req.headers['referer'] as string || req.headers['referrer'] as string || '',
          sessionId: req.body.sessionId || '',
        },
        OPENAI_API_KEY
      ).catch(err => console.error('Lead extraction error:', err));
    }

    return res.status(200).json({
      success: true,
      text: aiResponse.trim(),
      model: 'gpt-3.5-turbo'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      success: false 
    });
  }
}
