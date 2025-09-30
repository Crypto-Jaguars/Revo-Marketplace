import mongoose from 'mongoose';
import type { AnalyticsEvent } from '@/types/waitlist';

const analyticsEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['page_view', 'form_start', 'form_submit', 'form_success', 'form_error'],
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    page: String,
    userAgent: String,
    ip: String,
    country: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
    sessionId: String,
  },
  {
    collection: 'analytics_events',
    timestamps: true,
  }
);

// Add basic indexes
analyticsEventSchema.index({ type: 1, timestamp: -1 });
analyticsEventSchema.index({ source: 1 });

export const AnalyticsEventModel =
  mongoose.models.AnalyticsEvent || mongoose.model('AnalyticsEvent', analyticsEventSchema);
