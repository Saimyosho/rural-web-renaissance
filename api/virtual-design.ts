import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, imageUrl, model = 'stabilityai/stable-diffusion-xl-base-1.0' } = req.body;

    // Validate required fields
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Get Hugging Face API token from environment
    const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
    
    if (!HF_TOKEN || HF_TOKEN === 'your_huggingface_token_here') {
      return res.status(500).json({ 
        error: 'Hugging Face API token not configured. Please add HUGGINGFACE_API_TOKEN to your environment variables.' 
      });
    }

    // Prepare the request to Hugging Face Inference API
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          // Additional parameters can be added here
          parameters: {
            num_inference_steps: 30,
            guidance_scale: 7.5,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error:', errorText);
      
      // Handle specific error cases
      if (response.status === 503) {
        return res.status(503).json({ 
          error: 'Model is currently loading. Please try again in a few moments.',
          retryAfter: 20 
        });
      }
      
      if (response.status === 401) {
        return res.status(401).json({ 
          error: 'Invalid Hugging Face API token. Please check your configuration.' 
        });
      }

      return res.status(response.status).json({ 
        error: `Hugging Face API error: ${response.statusText}`,
        details: errorText
      });
    }

    // Get the image blob
    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert to base64 for easy frontend handling
    const base64Image = buffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64Image}`;

    return res.status(200).json({
      success: true,
      imageUrl: dataUrl,
      prompt: prompt,
      model: model
    });

  } catch (error: any) {
    console.error('Virtual design API error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.message 
    });
  }
}
