import { NextResponse } from 'next/server';
import { farmerSubscriptionSchema } from '@/components/modules/farmer/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = farmerSubscriptionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues.map((i: { message: string }) => i.message).join(', '),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    // Anti-spam: honeypot must be empty
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // Optional forward to external API if configured
    const endpoint = process.env.FARMERS_API_URL;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (e) {
        // Continue even if external integration fails, but note it
        console.error('External FARMERS_API_URL request failed:', e);
      }
    }

    // Optional email verification webhook
    const emailWebhook = process.env.EMAIL_WEBHOOK_URL;
    if (emailWebhook) {
      try {
        await fetch(emailWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: data.email, template: 'farmer_verification' }),
        });
      } catch (e) {
        console.error('EMAIL_WEBHOOK_URL request failed:', e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
