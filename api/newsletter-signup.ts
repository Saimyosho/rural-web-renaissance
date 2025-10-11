import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { email, source = 'unknown' } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('email, status')
      .eq('email', email.toLowerCase())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing subscriber:', checkError);
      throw checkError;
    }

    if (existing) {
      if (existing.status === 'active') {
        return res.status(200).json({ 
          message: 'Already subscribed',
          alreadySubscribed: true 
        });
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ status: 'active', subscribed_at: new Date().toISOString() })
          .eq('email', email.toLowerCase());

        if (updateError) {
          console.error('Error reactivating subscription:', updateError);
          throw updateError;
        }

        return res.status(200).json({ 
          message: 'Subscription reactivated',
          reactivated: true 
        });
      }
    }

    // Add new subscriber
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: email.toLowerCase(),
          source,
          status: 'active',
          subscribed_at: new Date().toISOString(),
          metadata: {
            ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown'
          }
        }
      ]);

    if (insertError) {
      console.error('Error inserting subscriber:', insertError);
      throw insertError;
    }

    // TODO: Send welcome email via Resend
    // This will be implemented when you set up Resend API

    return res.status(201).json({ 
      message: 'Successfully subscribed',
      success: true 
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return res.status(500).json({ 
      error: 'Failed to subscribe. Please try again later.' 
    });
  }
}
