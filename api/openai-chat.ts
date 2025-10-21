import type { VercelRequest, VercelResponse } from '@vercel/node';

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

  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Missing input' });
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
    const systemPrompt = `You are Sheldon Gunby's AI assistant on his portfolio website. 

About Sheldon:
- Full Stack Developer specializing in AI-powered web applications
- Expert in React, TypeScript, Node.js
- Experienced with AI/ML integration using HuggingFace, OpenAI, and custom models
- Builds modern SaaS applications, booking systems, and automation tools
- Located in rural Pennsylvania, helping businesses digitize and automate
- Contact: SheldonGunby@icloud.com | 724-490-8102

Services:
- Custom AI integrations (chatbots, automation, ML models)
- Full-stack web applications (React, Next.js, Node.js)
- SaaS platform development
- Booking and appointment systems
- Review response automation
- Content generation tools
- Business process automation

Your role:
- Answer questions about Sheldon's services, experience, and skills
- Provide information about pricing (custom quotes based on project scope)
- Explain technical capabilities in an accessible way
- Encourage visitors to reach out for consultations
- Be professional, friendly, and helpful
- Keep responses concise (2-4 sentences usually)

Style:
- Professional but approachable
- Clear and direct
- Focus on value and results
- Encourage engagement`;

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
