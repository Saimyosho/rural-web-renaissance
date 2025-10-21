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
          model: 'mistralai/Mistral-7B-Instruct-v0.1',
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
