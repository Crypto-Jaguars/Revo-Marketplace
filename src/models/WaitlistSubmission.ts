import mongoose from 'mongoose';

const waitlistSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['farmer', 'investor', 'consumer', 'partner', 'other'],
    },
    consent: {
      type: Boolean,
      required: true,
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
  },
  {
    collection: 'waitlist_submissions',
    timestamps: true,
  }
);

// Explicit unique index for email (database-level enforcement)
waitlistSubmissionSchema.index({ email: 1 }, { unique: true });

// Basic indexes for queries we actually use
waitlistSubmissionSchema.index({ createdAt: -1 });
waitlistSubmissionSchema.index({ unsubscribed: 1 });

export const WaitlistSubmissionModel =
  mongoose.models.WaitlistSubmission ||
  mongoose.model('WaitlistSubmission', waitlistSubmissionSchema);
