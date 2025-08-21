import mongoose from 'mongoose';

const waitlistSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['farmer', 'investor', 'consumer', 'partner', 'other'],
  },
  consent: {
    type: Boolean,
    default: true,
  },
  source: String,
  ip: String,
  userAgent: String,
  country: String,
  sessionId: String,
  emailSent: {
    type: Boolean,
    default: false,
  },
  emailSentAt: Date,
  unsubscribed: {
    type: Boolean,
    default: false,
  },
  unsubscribedAt: Date,
  unsubscribeReason: String,
}, {
  collection: 'waitlist_submissions',
  timestamps: true,
});

// Basic indexes for queries we actually use
waitlistSubmissionSchema.index({ email: 1 });
waitlistSubmissionSchema.index({ createdAt: -1 });
waitlistSubmissionSchema.index({ unsubscribed: 1 });

export const WaitlistSubmissionModel = mongoose.models.WaitlistSubmission || 
  mongoose.model('WaitlistSubmission', waitlistSubmissionSchema);