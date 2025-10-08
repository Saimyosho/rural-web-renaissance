import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

interface ContactSubmission {
  name: string
  email: string
  company?: string
  message: string
  interested_in?: string
  created_at: string
}

interface GeminiAnalysis {
  leadScore: number
  leadTemperature: string
  projectType: string
  complexity: string
  timeEstimate: string
  marketValue: string
  fitScore: number
  whyHot: string[]
  mvpFeatures: string[]
  niceToHave: string[]
  premiumFeatures: string[]
  techStack: {
    framework: string
    styling: string
    backend: string
    deployment: string
  }
  designStyle: string
  colorPalette: string
  quickPrompt: string
  standardPrompt: string
  premiumPrompt: string
  followUpQuestions: string[]
  autoReplyMessage: string
  redFlags: string[]
  opportunities: string[]
}

async function analyzeWithGemini(record: ContactSubmission): Promise<GeminiAnalysis> {
  const analysisPrompt = `You are an expert web development project analyst. Analyze this contact form submission and provide a comprehensive assessment for a web developer.

CONTACT FORM DATA:
Name: ${record.name}
Email: ${record.email}
Business: ${record.company || 'Not provided'}
Message: ${record.message}
Interested In: ${record.interested_in || 'Not specified'}

ANALYSIS REQUIRED:
1. LEAD SCORING (1-10): Rate this lead's quality
2. TEMPERATURE: Hot (9-10), Warm (6-8), Cold (1-5)
3. PROJECT TYPE: Restaurant, E-commerce, Portfolio, Service, Other
4. COMPLEXITY: Simple, Medium, Complex
5. TIME ESTIMATE: Hours to build
6. MARKET VALUE: What this project is worth
7. FIT SCORE (1-10): How well it fits a portfolio-building developer
8. WHY HOT: 3-5 reasons this is (or isn't) a great lead
9. MVP FEATURES: Must-have features for minimum viable product
10. NICE-TO-HAVE: Features that add value
11. PREMIUM FEATURES: Advanced features for upselling
12. TECH STACK: Best framework, styling, backend, deployment
13. DESIGN STYLE: Modern, Classic, Minimal, Playful, Professional
14. COLOR PALETTE: Suggested colors based on business type
15. RED FLAGS: Any concerns or issues to watch for
16. OPPORTUNITIES: Potential for expansion or upselling

17. CLAUDE PROMPTS: Generate 3 prompts for Claude 4.5 Sonnet:
    - QUICK (1-2 hours): Minimal viable product
    - STANDARD (3-5 hours): Full featured, recommended
    - PREMIUM (6-8 hours): Enhanced with animations and extras
    
    Each prompt should be complete and copy-paste ready, including:
    - Full project context
    - Client details
    - All requirements
    - Technical stack
    - Design specifications
    - File structure guidance
    - Deployment instructions

18. FOLLOW-UP QUESTIONS: 3-5 questions to clarify if needed
19. AUTO-REPLY: Professional message to send to the prospect

Format your response as valid JSON with this structure:
{
  "leadScore": number,
  "leadTemperature": "Hot" | "Warm" | "Cold",
  "projectType": string,
  "complexity": "Simple" | "Medium" | "Complex",
  "timeEstimate": string,
  "marketValue": string,
  "fitScore": number,
  "whyHot": [string],
  "mvpFeatures": [string],
  "niceToHave": [string],
  "premiumFeatures": [string],
  "techStack": {
    "framework": string,
    "styling": string,
    "backend": string,
    "deployment": string
  },
  "designStyle": string,
  "colorPalette": string,
  "quickPrompt": string,
  "standardPrompt": string,
  "premiumPrompt": string,
  "followUpQuestions": [string],
  "autoReplyMessage": string,
  "redFlags": [string],
  "opportunities": [string]
}`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: analysisPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          }
        })
      }
    )

    const data = await response.json()
    const textResponse = data.candidates[0].content.parts[0].text
    
    // Extract JSON from response (Gemini might wrap it in markdown)
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from Gemini response')
    }
    
    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('Gemini analysis failed:', error)
    // Return fallback analysis
    return {
      leadScore: 7,
      leadTemperature: "Warm",
      projectType: "General Website",
      complexity: "Medium",
      timeEstimate: "3-5 hours",
      marketValue: "$1,500-2,500",
      fitScore: 7,
      whyHot: ["Needs analysis", "Contact form submitted"],
      mvpFeatures: ["Homepage", "Contact form", "Responsive design"],
      niceToHave: ["Blog", "Gallery"],
      premiumFeatures: ["Animations", "CMS integration"],
      techStack: {
        framework: "React + Vite",
        styling: "Tailwind CSS",
        backend: "Supabase",
        deployment: "Vercel"
      },
      designStyle: "Modern",
      colorPalette: "Blue and white",
      quickPrompt: `Create a simple website for ${record.company || record.name}`,
      standardPrompt: `Create a professional website for ${record.company || record.name} with: ${record.message}`,
      premiumPrompt: `Create an advanced website for ${record.company || record.name} with animations and premium features`,
      followUpQuestions: ["What's your timeline?", "Do you have a budget in mind?"],
      autoReplyMessage: "Thanks for reaching out! I'll review your request and get back to you within 24 hours.",
      redFlags: ["Needs more information"],
      opportunities: ["Potential for ongoing work"]
    }
  }
}

function getScoreEmoji(score: number): string {
  if (score >= 9) return "🔥🔥🔥"
  if (score >= 7) return "🔥🔥"
  if (score >= 5) return "🔥"
  return "❄️"
}

function getTemperatureColor(temp: string): string {
  if (temp === "Hot") return "#ff4444"
  if (temp === "Warm") return "#ff9944"
  return "#4499ff"
}

serve(async (req) => {
  try {
    const { record } = await req.json() as { record: ContactSubmission }
    
    // Analyze with Gemini
    console.log('Starting Gemini analysis...')
    const analysis = await analyzeWithGemini(record)
    console.log('Gemini analysis complete')

    // Send comprehensive email to developer
    const developerEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Lead Analyzer <onboarding@resend.dev>',
        to: ['Dachiznit@gmail.com'],
        subject: `${getScoreEmoji(analysis.leadScore)} ${analysis.leadTemperature.toUpperCase()} LEAD: ${record.name} - ${analysis.projectType} (${analysis.timeEstimate})`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
    .score-badge { display: inline-block; background: ${getTemperatureColor(analysis.leadTemperature)}; color: white; padding: 10px 20px; border-radius: 20px; font-weight: bold; font-size: 18px; margin: 10px 0; }
    .section { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .section-title { font-size: 20px; font-weight: bold; color: #667eea; margin-bottom: 15px; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
    .feature-list { list-style: none; padding: 0; }
    .feature-list li { padding: 8px 0; padding-left: 30px; position: relative; }
    .feature-list li:before { content: "✅"; position: absolute; left: 0; }
    .nice-to-have li:before { content: "⭐"; }
    .premium li:before { content: "💎"; }
    .red-flag li:before { content: "⚠️"; }
    .opportunity li:before { content: "🎯"; }
    .prompt-box { background: #2d3748; color: #e2e8f0; padding: 20px; border-radius: 8px; margin: 15px 0; font-family: 'Courier New', monospace; font-size: 13px; white-space: pre-wrap; overflow-x: auto; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0; }
    .stat-card { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
    .stat-value { font-size: 24px; font-weight: bold; color: #667eea; }
    .stat-label { font-size: 12px; color: #666; margin-top: 5px; }
    .contact-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 10px 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${getScoreEmoji(analysis.leadScore)} ${analysis.leadTemperature.toUpperCase()} LEAD ALERT!</h1>
      <div class="score-badge">Score: ${analysis.leadScore}/10 | ${analysis.projectType}</div>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">New lead from ${record.name} - Analysis complete!</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${analysis.leadScore}/10</div>
        <div class="stat-label">Lead Score</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${analysis.fitScore}/10</div>
        <div class="stat-label">Portfolio Fit</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${analysis.timeEstimate}</div>
        <div class="stat-label">Time Estimate</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${analysis.marketValue}</div>
        <div class="stat-label">Market Value</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${analysis.complexity}</div>
        <div class="stat-label">Complexity</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${analysis.leadTemperature}</div>
        <div class="stat-label">Temperature</div>
      </div>
    </div>

    <div class="contact-info">
      <h2 style="color: #667eea; margin-top: 0;">👤 Contact Information</h2>
      <p><strong>Name:</strong> ${record.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${record.email}">${record.email}</a></p>
      ${record.company ? `<p><strong>Business:</strong> ${record.company}</p>` : ''}
      <p><strong>Submitted:</strong> ${new Date(record.created_at).toLocaleString()}</p>
      
      <h3 style="color: #667eea; margin-top: 20px;">💬 Their Message:</h3>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
        ${record.message.replace(/\n/g, '<br>')}
      </div>
      
      ${record.interested_in ? `
        <h3 style="color: #667eea; margin-top: 20px;">🎯 Interested In:</h3>
        <p>${record.interested_in}</p>
      ` : ''}
    </div>

    <div class="section">
      <div class="section-title">🔥 Why This Lead is ${analysis.leadTemperature}:</div>
      <ul class="feature-list">
        ${analysis.whyHot.map(reason => `<li>${reason}</li>`).join('')}
      </ul>
    </div>

    ${analysis.redFlags.length > 0 ? `
    <div class="section">
      <div class="section-title">⚠️ Red Flags to Watch:</div>
      <ul class="feature-list red-flag">
        ${analysis.redFlags.map(flag => `<li>${flag}</li>`).join('')}
      </ul>
    </div>
    ` : ''}

    ${analysis.opportunities.length > 0 ? `
    <div class="section">
      <div class="section-title">🎯 Opportunities:</div>
      <ul class="feature-list opportunity">
        ${analysis.opportunities.map(opp => `<li>${opp}</li>`).join('')}
      </ul>
    </div>
    ` : ''}

    <div class="section">
      <div class="section-title">✅ MVP Features (Must Build):</div>
      <ul class="feature-list">
        ${analysis.mvpFeatures.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    </div>

    <div class="section">
      <div class="section-title">⭐ Nice-to-Have Features:</div>
      <ul class="feature-list nice-to-have">
        ${analysis.niceToHave.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    </div>

    <div class="section">
      <div class="section-title">💎 Premium Features (Upsell):</div>
      <ul class="feature-list premium">
        ${analysis.premiumFeatures.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    </div>

    <div class="section">
      <div class="section-title">🛠️ Recommended Tech Stack:</div>
      <p><strong>Framework:</strong> ${analysis.techStack.framework}</p>
      <p><strong>Styling:</strong> ${analysis.techStack.styling}</p>
      <p><strong>Backend:</strong> ${analysis.techStack.backend}</p>
      <p><strong>Deployment:</strong> ${analysis.techStack.deployment}</p>
      <p><strong>Design Style:</strong> ${analysis.designStyle}</p>
      <p><strong>Color Palette:</strong> ${analysis.colorPalette}</p>
    </div>

    <div class="section">
      <div class="section-title">⚡ QUICK VERSION (${analysis.timeEstimate.split('-')[0]} hours)</div>
      <p style="margin-bottom: 10px;">Minimal viable product - fastest turnaround</p>
      <div class="prompt-box">${analysis.quickPrompt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>

    <div class="section">
      <div class="section-title">🎯 STANDARD VERSION (Recommended)</div>
      <p style="margin-bottom: 10px;">Full-featured, production-ready - <strong>COPY THIS ONE</strong></p>
      <div class="prompt-box">${analysis.standardPrompt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>

    <div class="section">
      <div class="section-title">💎 PREMIUM VERSION (${analysis.timeEstimate.split('-')[1] || '6'} hours)</div>
      <p style="margin-bottom: 10px;">Enhanced with animations, optimizations, and extras</p>
      <div class="prompt-box">${analysis.premiumPrompt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>

    ${analysis.followUpQuestions.length > 0 ? `
    <div class="section">
      <div class="section-title">❓ Follow-Up Questions (if needed):</div>
      <p style="margin-bottom: 10px;">Send these to ${record.name} to clarify requirements:</p>
      <ol>
        ${analysis.followUpQuestions.map(q => `<li style="margin: 10px 0;">${q}</li>`).join('')}
      </ol>
    </div>
    ` : ''}

    <div class="section" style="background: #e6f7ff; border-left-color: #1890ff;">
      <div class="section-title" style="color: #1890ff; border-bottom-color: #1890ff;">✅ Next Steps:</div>
      <ol>
        <li>Copy the <strong>STANDARD VERSION</strong> prompt above</li>
        <li>Paste into Claude 4.5 Sonnet</li>
        <li>Review generated code</li>
        <li>Deploy to Vercel</li>
        <li>Share preview link with ${record.name}</li>
        <li>Add to your portfolio!</li>
      </ol>
      <p style="margin-top: 15px;"><strong>⏱️ Estimated completion:</strong> ${analysis.timeEstimate}</p>
      <p><strong>💰 Portfolio value:</strong> ${analysis.marketValue}</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://claude.ai" class="cta-button">Open Claude →</a>
      <a href="https://supabase.com/dashboard" class="cta-button">View in Supabase →</a>
      <a href="mailto:${record.email}" class="cta-button">Email ${record.name} →</a>
    </div>

    <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin-top: 30px; text-align: center; color: #666;">
      <p style="margin: 0;">✨ <strong>Auto-reply sent to ${record.name}</strong> confirming receipt!</p>
      <p style="margin: 10px 0 0 0; font-size: 12px;">They expect to hear back within 24 hours</p>
    </div>
  </div>
</body>
</html>
        `
      })
    })

    // Send auto-reply to prospect
    const prospectEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Sheldon @ Johnstown Web Dev <onboarding@resend.dev>',
        to: [record.email],
        subject: `Thanks for reaching out, ${record.name.split(' ')[0]}!`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 10px; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">✨ Message Received!</h1>
    </div>
    
    <div class="content">
      ${analysis.autoReplyMessage.replace(/\n/g, '<br><br>')}
      
      <p style="margin-top: 30px;"><strong>What happens next:</strong></p>
      <ol>
        <li>I'm reviewing your request right now</li>
        <li>You'll hear from me within 24 hours</li>
        <li>I'll share a proposal and timeline</li>
        <li>We'll discuss any questions you have</li>
      </ol>
      
      <p style="margin-top: 20px;">Looking forward to building something amazing for ${record.company || 'your business'}!</p>
      
      <p style="margin-top: 30px;">
        <strong>Sheldon Gunby</strong><br>
        Web Developer<br>
        Johnstown, PA<br>
        <a href="mailto:Dachiznit@gmail.com">Dachiznit@gmail.com</a>
      </p>
    </div>
    
    <div class="footer">
      <p>Powered by AI-assisted lead analysis 🤖</p>
    </div>
  </div>
</body>
</html>
        `
      })
    })

    return new Response(
      JSON.stringify({ 
        success: true,
        analysis: {
          score: analysis.leadScore,
          temperature: analysis.leadTemperature,
          projectType: analysis.projectType
        }
      }),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
})
