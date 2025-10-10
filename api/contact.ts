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
  const FROM_EMAIL = process.env.FROM_EMAIL || 'Lead Form <onboarding@resend.dev>';
  const TO_EMAIL = process.env.TO_EMAIL || 'dachiznit@gmail.com';
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Missing RESEND_API_KEY server env var' });
  }

  // Parse JSON body safely (supports string, object, Buffer, or stream)
  const body: unknown = await getJsonBody(req);
  if (body === null) {
    return res.status(400).json({ error: 'Invalid JSON body' });
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
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: sanitizeEmail(email),
        subject: `New lead: ${name}`,
        html,
      }),
    });

    if (!resp.ok) {
      const provider = 'resend';
      let details = '';
      let code: string | number | undefined;
      try {
        const j = await resp.json();
        const data = (j as { message?: string; error?: string; name?: string; code?: string | number } | null);
        details = data ? (data.message || data.error || JSON.stringify(data)) : '';
        code = data ? (data.name || data.code) : undefined;
      } catch {
        try {
          details = await resp.text();
        } catch {
          details = '';
        }
      }
      const requestId = (resp as Response).headers?.get('x-resend-id') ?? null;
      const hint =
        resp.status === 401 || resp.status === 403
          ? 'Check RESEND_API_KEY permission and verify your sender/domain in Resend.'
          : resp.status === 422
          ? 'Invalid payload. Ensure FROM_EMAIL is verified and "to" is allowed.'
          : undefined;

      console.error('Resend send failed', { status: resp.status, requestId, code, details });
      return res.status(500).json({
        error: 'Email send failed',
        status: resp.status,
        provider,
        code,
        details,
        requestId,
        hint,
      });
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

function sanitizeEmail(input: unknown) {
  const s = String(input || '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? s : '';
}

type NodeReq = {
  body?: unknown;
  on?: (event: string, cb: (...args: unknown[]) => void) => void;
};

async function getJsonBody(req: NodeReq): Promise<unknown> {
  try {
    const b = req?.body;
    if (b != null) {
      if (typeof b === 'string') return JSON.parse(b);
      // If Buffer/Uint8Array, convert to string then parse
      if (typeof Buffer !== 'undefined' && (b instanceof Uint8Array)) {
        return JSON.parse(Buffer.from(b).toString('utf8'));
      }
      if (typeof b === 'object') return b;
    }
    // Fallback: read from stream (Node runtime)
    if (typeof req?.on === 'function') {
      const chunks: Uint8Array[] = [];
      await new Promise<void>((resolve, reject) => {
        req.on?.('data', (c: unknown) => {
          if (typeof c === 'string') {
            chunks.push(Buffer.from(c));
          } else if (Buffer.isBuffer(c)) {
            chunks.push(c);
          } else if (c instanceof Uint8Array) {
            chunks.push(Buffer.from(c));
          } else {
            chunks.push(Buffer.from(String(c)));
          }
        });
        req.on?.('end', () => resolve());
        req.on?.('error', (e: unknown) => reject(e));
      });
      const raw = Buffer.concat(chunks).toString('utf8');
      return raw ? JSON.parse(raw) : {};
    }
    return {};
  } catch {
    return null;
  }
}
