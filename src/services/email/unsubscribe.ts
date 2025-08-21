import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import { WaitlistSubmissionModel } from '@/models/WaitlistSubmission';

export function generateUnsubscribeToken(email: string) {
  const secret = process.env.ADMIN_API_KEY || 'default-secret';
  return crypto
    .createHmac('sha256', secret)
    .update(email.toLowerCase())
    .digest('hex')
    .substring(0, 32);
}

export function verifyUnsubscribeToken(email: string, token: string) {
  const expectedToken = generateUnsubscribeToken(email);
  return token === expectedToken;
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