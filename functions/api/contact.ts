interface Env {
  RESEND_API_KEY: string;
}

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  try {
    const data = await request.formData();
    const email   = (data.get('email')   ?? '').toString().trim();
    const subject = (data.get('subject') ?? '').toString().trim();
    const message = (data.get('message') ?? '').toString().trim();

    if (!email || !subject || !message) {
      return json({ ok: false, error: 'All fields are required.' }, 400);
    }

    if (!env.RESEND_API_KEY) {
      // Fail gracefully in preview — log and return success-like so devs aren't blocked
      console.warn('RESEND_API_KEY not set; skipping email send.');
      return json({ ok: true });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'contact@henkas.eu',
        to:   'henkas@henkas.eu',
        reply_to: email,
        subject: `[henkas.eu] ${subject}`,
        text: `From: ${email}\n\n${message}`,
        html: `<p><strong>From:</strong> ${email}</p><p>${message.replace(/\n/g, '<br>')}</p>`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('Resend error:', res.status, body);
      return json({ ok: false, error: 'Failed to send — please try emailing directly.' }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return json({ ok: false, error: 'Unexpected error.' }, 500);
  }
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
