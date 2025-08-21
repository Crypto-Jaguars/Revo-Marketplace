/**
 * @fileoverview Server-only email service - DO NOT import in client components
 * @server-only
 */

// Prevent client-side bundling
if (typeof window !== 'undefined') {
  throw new Error('This module can only be used on the server side');
}

import type { WaitlistSubmission } from '@/types/waitlist';
import { getEmailTransporter } from './nodemailer';
import { generateUnsubscribeToken } from '@/services/email/unsubscribe';

// Basic email structure
interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

function getRoleLabel(role?: string, locale: string = 'en'): string {
  const labels = {
    en: {
      farmer: 'Farmer/Producer',
      investor: 'Investor',
      consumer: 'Consumer/Buyer',
      partner: 'Business Partner',
      other: 'Other',
    },
    es: {
      farmer: 'Agricultor/Productor',
      investor: 'Inversionista',
      consumer: 'Consumidor/Comprador',
      partner: 'Socio Comercial',
      other: 'Otro',
    },
  };

  if (!role) return '';
  return labels[locale as 'en' | 'es']?.[role as keyof typeof labels.en] || role;
}

// HTML escape helper to prevent injection
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateWaitlistEmailTemplate(submission: any, locale = 'en') {
  const isSpanish = locale === 'es';
  const name = submission.name || (isSpanish ? 'Amigo' : 'Friend');
  const roleLabel = getRoleLabel(submission.role, locale);
  
  // Escape user-controlled values for HTML safety
  const safeName = escapeHtml(name);
  const safeRoleLabel = escapeHtml(roleLabel);
  const safeLocale = escapeHtml(locale);
  
  // Dynamic current year
  const currentYear = new Date().getFullYear();
  
  // Create time-limited unsubscribe token (24 hours TTL)
  const TTL_HOURS = 24;
  const expTimestamp = Math.floor(Date.now() / 1000) + (TTL_HOURS * 60 * 60);
  const emailLowercased = submission.email.toLowerCase().trim();
  const payload = `${emailLowercased}:${expTimestamp}`;
  const unsubscribeToken = generateUnsubscribeToken(payload);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
  const unsubscribeUrl = `${baseUrl}/api/waitlist/unsubscribe?email=${encodeURIComponent(submission.email)}&token=${unsubscribeToken}&exp=${expTimestamp}`;

  const subject = isSpanish
    ? '¡Bienvenido a la Lista de Espera de Revo Farmers!'
    : 'Welcome to the Revo Farmers Waitlist!';

  const html = `
    <!DOCTYPE html>
    <html lang="${safeLocale}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6f927e 0%, #375B42 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
        .content { background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px; }
        .button { display: inline-block; padding: 12px 24px; background: #A0D911; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .social-links { margin-top: 30px; text-align: center; }
        .social-links a { margin: 0 10px; text-decoration: none; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
        .highlight { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">${isSpanish ? '¡Bienvenido a Revo Farmers!' : 'Welcome to Revo Farmers!'}</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">${isSpanish ? 'Revolucionando la agricultura con blockchain' : 'Revolutionizing agriculture with blockchain'}</p>
        </div>
        
        <div class="content">
          <p style="font-size: 18px; color: #111827;">
            ${isSpanish ? `¡Hola ${safeName}!` : `Hi ${safeName}!`}
          </p>
          
          <p style="color: #4b5563; line-height: 1.6;">
            ${isSpanish
              ? 'Gracias por unirte a nuestra lista de espera. Estás oficialmente en el camino para ser parte de la revolución agrícola.'
              : "Thank you for joining our waitlist. You're officially on track to be part of the agricultural revolution."
            }
          </p>

          ${roleLabel ? `
          <div class="highlight">
            <strong>${isSpanish ? 'Tu rol de interés:' : 'Your interest role:'}</strong> ${safeRoleLabel}
          </div>
          ` : ''}

          <h2 style="color: #111827; font-size: 20px; margin-top: 30px;">
            ${isSpanish ? '¿Qué sigue?' : "What's Next?"}
          </h2>
          
          <ul style="color: #4b5563; line-height: 1.8;">
            <li>${isSpanish ? 'Te mantendremos actualizado sobre nuestro progreso' : "We'll keep you updated on our progress"}</li>
            <li>${isSpanish ? 'Obtendrás acceso anticipado cuando lancemos' : "You'll get early access when we launch"}</li>
            <li>${isSpanish ? 'Disfruta de beneficios exclusivos como miembro fundador' : 'Enjoy exclusive benefits as a founding member'}</li>
            <li>${isSpanish ? 'Ayúdanos a dar forma al futuro de la agricultura' : 'Help us shape the future of agriculture'}</li>
          </ul>

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #4b5563; margin-bottom: 15px;">
              ${isSpanish ? 'Mientras tanto, síguenos en redes sociales:' : 'Meanwhile, follow us on social media:'}
            </p>
            <div class="social-links">
              <a href="https://x.com/revofarmers" style="color: #1DA1F2;">Twitter</a>
              <a href="https://www.linkedin.com/company/revofarmers/" style="color: #0077B5;">LinkedIn</a>
              <a href="https://github.com/Crypto-Jaguars" style="color: #333;">GitHub</a>
            </div>
          </div>

        </div>

        <div class="footer">
          <p>
            ${isSpanish
              ? 'Estás recibiendo este correo porque te registraste en la lista de espera de Revo Farmers.'
              : 'You are receiving this email because you signed up for the Revo Farmers waitlist.'
            }
          </p>
          <p>
            <a href="${unsubscribeUrl}" style="color: #6b7280;">
              ${isSpanish ? 'Cancelar suscripción' : 'Unsubscribe'}
            </a>
            |
            <a href="${baseUrl}/${locale}/privacy-policy" style="color: #6b7280;">
              ${isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}
            </a>
          </p>
          <p style="margin-top: 20px;">
            © ${currentYear} Revolutionary Farmers. ${isSpanish ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = isSpanish
    ? `¡Hola ${name}!

Gracias por unirte a la lista de espera de Revo Farmers.

${roleLabel ? `Tu rol de interés: ${roleLabel}\n` : ''}
¿Qué sigue?
- Te mantendremos actualizado sobre nuestro progreso
- Obtendrás acceso anticipado cuando lancemos
- Disfruta de beneficios exclusivos como miembro fundador
- Ayúdanos a dar forma al futuro de la agricultura

Síguenos en redes sociales:
Twitter: https://x.com/revofarmers
LinkedIn: https://www.linkedin.com/company/revofarmers/
GitHub: https://github.com/Crypto-Jaguars

© ${currentYear} Revolutionary Farmers. Todos los derechos reservados.`
    : `Hi ${name}!

Thank you for joining the Revo Farmers waitlist.

${roleLabel ? `Your interest role: ${roleLabel}\n` : ''}
What's Next?
- We'll keep you updated on our progress
- You'll get early access when we launch
- Enjoy exclusive benefits as a founding member
- Help us shape the future of agriculture

Follow us on social media:
Twitter: https://x.com/revofarmers
LinkedIn: https://www.linkedin.com/company/revofarmers/
GitHub: https://github.com/Crypto-Jaguars

© ${currentYear} Revolutionary Farmers. All rights reserved.`;

  return { subject, html, text };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendWaitlistConfirmationEmail(submission: any, locale = 'en') {
  try {
    const template = generateWaitlistEmailTemplate(submission, locale);
    const transporter = getEmailTransporter();
    
    const mailOptions = {
      from: {
        name: 'Revolutionary Farmers',
        address: process.env.GMAIL_USER || 'Revolutionaryfarmer@gmail.com',
      },
      to: submission.email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}