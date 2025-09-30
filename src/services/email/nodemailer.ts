/**
 * @fileoverview Server-only email service - DO NOT import in client components
 * @server-only
 */

// Prevent client-side bundling
if (typeof window !== 'undefined') {
  throw new Error('This module can only be used on the server side');
}

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

export function getEmailTransporter(): Transporter {
  if (!transporter) {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Missing Gmail credentials in env');
    }

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  return transporter;
}

export async function verifyEmailConfiguration() {
  try {
    const transport = getEmailTransporter();
    await transport.verify();
    console.log('Email config ok');
    return true;
  } catch (error) {
    console.error('Email verification error:', error);
    return false;
  }
}
