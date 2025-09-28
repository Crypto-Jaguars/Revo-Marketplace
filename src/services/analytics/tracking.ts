import type { AnalyticsEvent, ConversionFunnel } from '@/types/waitlist';
import { getGeolocationFromIP } from './geolocation';
import connectDB from '@/lib/mongodb';
import { AnalyticsEventModel } from '@/models/AnalyticsEvent';

export async function trackEvent(
  type: string,
  ip: string,
  userAgent: string,
  source = 'direct',
  page = '/waitlist',
  sessionId: string
) {
  try {
    await connectDB();

    const geoData = await getGeolocationFromIP(ip);

    const eventData = {
      type,
      source: determineSource(source),
      page,
      userAgent,
      ip,
      country: geoData.country,
      sessionId,
    };

    const event = new AnalyticsEventModel(eventData);
    await event.save();

    console.log('Event tracked:', type);
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

function determineSource(referer: string) {
  if (!referer) return 'direct';

  const url = referer.toLowerCase();

  // Common sources
  if (url.includes('google')) return 'google';
  if (url.includes('facebook')) return 'facebook';
  if (url.includes('twitter')) return 'twitter';
  if (url.includes('linkedin')) return 'linkedin';

  // UTM params
  if (url.includes('utm_source=email')) return 'email';
  if (url.includes('utm_source=social')) return 'social';

  return 'referral';
}

export async function getConversionFunnels() {
  try {
    await connectDB();

    const sources = await AnalyticsEventModel.distinct('source');
    const funnels = new Map();

    sources.forEach((source) => {
      funnels.set(source, {
        source,
        pageViews: 0,
        formStarts: 0,
        formSubmissions: 0,
        successfulSignups: 0,
        conversionRate: 0,
      });
    });

    const eventCounts = await AnalyticsEventModel.aggregate([
      {
        $group: {
          _id: { source: '$source', type: '$type' },
          count: { $sum: 1 },
        },
      },
    ]);

    eventCounts.forEach(({ _id, count }) => {
      const funnel = funnels.get(_id.source);
      if (!funnel) return;

      switch (_id.type) {
        case 'page_view':
          funnel.pageViews = count;
          break;
        case 'form_start':
          funnel.formStarts = count;
          break;
        case 'form_submit':
          funnel.formSubmissions = count;
          break;
        case 'form_success':
          funnel.successfulSignups = count;
          break;
      }
    });

    // Quick conversion calc
    funnels.forEach((funnel) => {
      if (funnel.pageViews > 0) {
        funnel.conversionRate = (funnel.successfulSignups / funnel.pageViews) * 100;
      }
    });

    return Array.from(funnels.values()).sort((a, b) => b.conversionRate - a.conversionRate);
  } catch (error) {
    console.error('Funnel error:', error);
    return [];
  }
}

export async function getAnalyticsEvents() {
  try {
    await connectDB();
    const events = await AnalyticsEventModel.find({}).sort({ timestamp: -1 }).limit(1000).lean();
    return events;
  } catch (error) {
    console.error('Get events error:', error);
    return [];
  }
}

export async function getEventsByType(type: string) {
  try {
    await connectDB();
    const events = await AnalyticsEventModel.find({ type }).sort({ timestamp: -1 }).lean();
    return events;
  } catch (error) {
    console.error('Get events by type error:', error);
    return [];
  }
}

export async function getEventsByDateRange(startDate: Date, endDate: Date) {
  try {
    await connectDB();
    const events = await AnalyticsEventModel.find({
      timestamp: { $gte: startDate, $lte: endDate },
    })
      .sort({ timestamp: -1 })
      .lean();
    return events;
  } catch (error) {
    console.error('Date range error:', error);
    return [];
  }
}

export async function getTopSources(limit = 10) {
  try {
    await connectDB();
    const sourceCounts = await AnalyticsEventModel.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      { $project: { source: '$_id', count: 1, _id: 0 } },
    ]);

    return sourceCounts;
  } catch (error) {
    console.error('Top sources error:', error);
    return [];
  }
}

export async function getTopCountries(limit = 10) {
  try {
    await connectDB();
    const countryCounts = await AnalyticsEventModel.aggregate([
      { $match: { country: { $exists: true, $ne: null } } },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      { $project: { country: '$_id', count: 1, _id: 0 } },
    ]);

    return countryCounts;
  } catch (error) {
    console.error('Countries error:', error);
    return [];
  }
}
