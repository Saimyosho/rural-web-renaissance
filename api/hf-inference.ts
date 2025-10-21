import { HfInference } from '@huggingface/inference';

export const config = {
  runtime: 'edge',
};

const hf = new HfInference(process.env.HF_API_KEY);

export default async function handler(req: Request) {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { task, input } = await req.json();

    if (!task || !input) {
      return new Response(
        JSON.stringify({ error: 'Missing task or input' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let result;

    switch (task) {
      case 'review-response':
        // Generate professional review response
        result = await hf.textGeneration({
          model: 'HuggingFaceH4/zephyr-7b-beta',
          inputs: `You are a professional business owner. Write a friendly, professional response to this customer review. Keep it under 50 words and be genuine.

Review: "${input}"

Response:`,
          parameters: {
            max_new_tokens: 100,
            temperature: 0.7,
            top_p: 0.95,
            repetition_penalty: 1.1,
          },
        });
        break;

      case 'content-generation':
        // Generate marketing content
        result = await hf.textGeneration({
          model: 'google/gemma-2-9b-it',
          inputs: `Write a ${input.format} about "${input.topic}". Make it professional, engaging, and concise (under 100 words).

${input.format}:`,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.8,
            top_p: 0.95,
            repetition_penalty: 1.15,
          },
        });
        break;

      case 'hero-chat':
        // Hero chatbot - Natural language conversation
        result = await hf.textGeneration({
          model: 'google/gemma-2-9b-it',
          inputs: `You are Sheldon Gunby's professional AI assistant. Answer questions naturally and professionally about his services, expertise, and how he can help businesses.

ABOUT SHELDON:
- Full Stack Developer with 10+ years experience in Microsoft/Azure systems
- Specializes in: React, TypeScript, Node.js, Python, AI/ML integration, HuggingFace
- Background: Senior Windows/Azure Administrator → Full Stack Developer
- Education: B.S. Information Technology (SNHU, 3.8 GPA)
- Certifications: CompTIA Cloud+, Security+, Network+, A+
- Location: Greater Pittsburgh Area, PA
- Contact: SheldonGunby@icloud.com, 724-490-8102

SERVICES OFFERED:
1. Custom Website Design - Award-winning, mobile-first, modern aesthetics
2. AI Social Media & Booking - Auto-posts content + 24/7 AI booking bot (saves 30+ hours/week)
3. AI Review Response Agent - Instantly replies to Google/Yelp reviews with personalized responses
4. AI Competitor Intelligence - 24/7 monitoring of competitors' pricing & strategies (unfair advantage)
5. Lightning Performance - Sub-1s load times, SEO optimized
6. Enterprise Security - SSL, secure forms, daily backups

SAAS BENEFITS:
- 24/7 AI Automation - AI never sleeps, handles booking, reviews, social media
- Massive Time Savings - Save 30+ hours weekly with AI agents
- Competitive Edge - Real-time competitor tracking & auto-adjustment
- Instant ROI - Most clients see ROI within 30 days
- Scalable - Start free, add premium features as you grow
- Enterprise quality at small business prices

PRICING APPROACH:
- Free websites to start (no commitment, no credit card)
- Premium AI features available when ready to scale
- Flexible, affordable pricing for small businesses

PORTFOLIO PROJECTS:
- AI Portal Platform (Multi-tenant SaaS with React, Supabase, HuggingFace)
- Review Response Agent (Python, FastAPI, NLP automation)
- Content Generation Tool (TypeScript, Edge Functions, AI-driven)
- Medical Transport Optimizer (Route optimization system)
- Virtual Design Tool (AI-powered visualization)

User question: "${input}"

Respond naturally and professionally in 50-100 words. Be helpful, conversational, and focus on business value:`,
          parameters: {
            max_new_tokens: 180,
            temperature: 0.7,
            top_p: 0.92,
            repetition_penalty: 1.15,
          },
        });
        break;

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown task type' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Clean up the generated text
    let generatedText = result.generated_text;
    
    // Remove the prompt from the response if it's included
    if (generatedText.includes('Response:')) {
      generatedText = generatedText.split('Response:')[1]?.trim() || generatedText;
    }
    if (generatedText.includes(`${input.format}:`)) {
      generatedText = generatedText.split(`${input.format}:`)[1]?.trim() || generatedText;
    }

    return new Response(
      JSON.stringify({
        success: true,
        text: generatedText,
        model: task === 'review-response' ? 'zephyr-7b' : 'mistral-7b',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Hugging Face API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate AI response';
    
    return new Response(
      JSON.stringify({
        error: errorMessage,
        fallback: true,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
