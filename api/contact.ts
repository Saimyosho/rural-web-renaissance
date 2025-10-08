interface RequestLike {
  method?: string
  body?: unknown
}
interface ResponseLike {
  status(code: number): { json(body: unknown): unknown }
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Missing RESEND_API_KEY server env var' });
  }

  // Parse JSON body safely
  let body: unknown = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' })
    }
  }

  const obj = typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {}
  const {
    name,
    email,
    company,
    message,
    interested_in,
  } = obj as {
    name?: string
    email?: string
    company?: string | null
    message?: string
    interested_in?: string
  }
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height:1.6; color:#333;">
        <h2 style="margin:0 0 10px 0;">New Contact Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeAttr(email)}">${escapeHtml(email)}</a></p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
        ${interested_in ? `<p><strong>Interested In:</strong> ${escapeHtml(interested_in)}</p>` : ''}
        <div style="margin-top:16px; padding:12px; background:#f8f9fa; border-left:4px solid #667eea; border-radius:6px;">
          <div style="font-weight:600; margin-bottom:6px;">Message</div>
          <div>${escapeHtml(String(message)).replace(/\n/g, '<br>')}</div>
        </div>
      </body>
    </html>
  `;

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: 'Lead Form <onboarding@resend.dev>',
        to: ['Dachiznit@gmail.com'],
        subject: `New lead: ${name}`,
        html,
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text().catch(() => '');
      return res.status(500).json({ error: 'Email send failed', details: txt });
    }

    return res.status(200).json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return res.status(500).json({ error: 'Unexpected error sending email', details: msg });
  }
}

function escapeHtml(input: unknown) {
  return String(input)
    .replace(/&/g, '&')
    .replace(/"/g, '"')
    .replace(/'/g, '&#39;')
    .replace(/</g, '<')
    .replace(/>/g, '>')
}

function escapeAttr(input: unknown) {
  return String(input)
    .replace(/&/g, '&')
    .replace(/"/g, '"')
    .replace(/'/g, '&#39;')
    .replace(/</g, '<')
    .replace(/>/g, '>')
}
