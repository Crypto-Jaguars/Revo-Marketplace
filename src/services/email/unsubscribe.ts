import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import { WaitlistSubmissionModel } from '@/models/WaitlistSubmission';

export function generateUnsubscribeToken(payload: string) {
  const secret = process.env.EMAIL_UNSUBSCRIBE_SECRET;
  
  if (!secret) {
    throw new Error('EMAIL_UNSUBSCRIBE_SECRET environment variable is required but not set');
  }
  
  return crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
    .substring(0, 32);
}

export function verifyUnsubscribeToken(payload: string, token: string) {
  const expectedToken = generateUnsubscribeToken(payload);
  
  // Convert to buffers for constant-time comparison
  const tokenBuffer = Buffer.from(token, 'utf8');
  const expectedBuffer = Buffer.from(expectedToken, 'utf8');
  
  // Check buffer lengths first - timingSafeEqual throws on unequal lengths
  if (tokenBuffer.length !== expectedBuffer.length) {
    return false;
  }
  
  // Constant-time comparison
  return crypto.timingSafeEqual(tokenBuffer, expectedBuffer);
}

export async function isUnsubscribed(email: string) {
  try {
    await connectDB();
    const submission = await WaitlistSubmissionModel.findOne({ 
      email: email.toLowerCase().trim(),
      unsubscribed: true 
    });
    return !!submission;
  } catch (error) {
    console.error('Error checking unsubscribe status:', error);
    return false;
  }
}

export async function addToUnsubscribed(email: string, reason?: string) {
  try {
    await connectDB();
    await WaitlistSubmissionModel.updateOne(
      { email: email.toLowerCase().trim() },
      { 
        unsubscribed: true,
        unsubscribedAt: new Date(),
        unsubscribeReason: reason || 'No reason provided'
      }
    );
  } catch (error) {
    console.error('Error adding to unsubscribed:', error);
  }
}

export async function isAlreadyUnsubscribed(email: string) {
  return await isUnsubscribed(email);
}