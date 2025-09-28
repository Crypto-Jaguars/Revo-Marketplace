import { NextRequest, NextResponse } from 'next/server';
import {
  trackEvent,
  getConversionFunnels,
  getAnalyticsEvents,
  getTopSources,
  getTopCountries,
} from '@/services/analytics/tracking';
import { validateAdminSession } from '@/lib/auth';
import { z } from 'zod';

const analyticsEventSchema = z.object({
  type: z.union([
    z.literal('page_view'),
    z.literal('form_start'),
    z.literal('form_submit'),
    z.literal('form_success'),
    z.literal('form_error'),
  ]),
  page: z.string().min(1),
  sessionId: z.string().min(1),
  source: z.string().optional(),
});

function parseLimit(value: string | null, defaultValue = 10, maxValue = 500): number {
  if (!value) return defaultValue;

  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed)) return defaultValue;

  // Clamp between 1 and maxValue
  return Math.max(1, Math.min(parsed, maxValue));
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    // Validate request body
    const parseResult = analyticsEventSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parseResult.error.errors },
        { status: 400 }
      );
    }

    const { type, source, page, sessionId } = parseResult.data;

    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || source;

    await trackEvent(type, ip, userAgent, referer, page, sessionId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ success: false, error: 'Failed to track event' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Validate admin session from secure cookie
  const isAuthenticated = await validateAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const format = url.searchParams.get('format');

    let data;

    switch (type) {
      case 'funnels': {
        data = await getConversionFunnels();
        break;
      }
      case 'events': {
        data = await getAnalyticsEvents();
        break;
      }
      case 'sources': {
        const limit = parseLimit(url.searchParams.get('limit'));
        data = await getTopSources(limit);
        break;
      }
      case 'countries': {
        const countryLimit = parseLimit(url.searchParams.get('limit'));
        data = await getTopCountries(countryLimit);
        break;
      }
      case 'summary':
      default: {
        const events = await getAnalyticsEvents();
        const today = new Date();
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        const todayEvents = events.filter((e) => new Date(e.timestamp) >= yesterday);
        const weekEvents = events.filter((e) => new Date(e.timestamp) >= lastWeek);

        data = {
          total: {
            events: events.length,
            pageViews: events.filter((e) => e.type === 'page_view').length,
            formStarts: events.filter((e) => e.type === 'form_start').length,
            formSubmissions: events.filter((e) => e.type === 'form_submit').length,
            successfulSignups: events.filter((e) => e.type === 'form_success').length,
          },
          today: {
            events: todayEvents.length,
            pageViews: todayEvents.filter((e) => e.type === 'page_view').length,
            formStarts: todayEvents.filter((e) => e.type === 'form_start').length,
            formSubmissions: todayEvents.filter((e) => e.type === 'form_submit').length,
            successfulSignups: todayEvents.filter((e) => e.type === 'form_success').length,
          },
          week: {
            events: weekEvents.length,
            pageViews: weekEvents.filter((e) => e.type === 'page_view').length,
            formStarts: weekEvents.filter((e) => e.type === 'form_start').length,
            formSubmissions: weekEvents.filter((e) => e.type === 'form_submit').length,
            successfulSignups: weekEvents.filter((e) => e.type === 'form_success').length,
          },
          conversionFunnels: await getConversionFunnels(),
          topSources: await getTopSources(5),
          topCountries: await getTopCountries(5),
        };
        break;
      }
    }

    // Handle CSV export
    if (format === 'csv') {
      const csv = convertToCSV(data, type || 'summary');
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="analytics-${type || 'summary'}-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
  }
}

function convertToCSV(data: unknown, type: string): string {
  switch (type) {
    case 'events':
      return convertEventsToCSV(data);
    case 'funnels':
      return convertFunnelsToCSV(data);
    case 'sources':
      return convertArrayToCSV(data, ['source', 'count']);
    case 'countries':
      return convertArrayToCSV(data, ['country', 'count']);
    default:
      return convertSummaryToCSV(data);
  }
}

function convertEventsToCSV(events: unknown): string {
  if (!Array.isArray(events)) return '';

  const headers = ['timestamp', 'type', 'source', 'page', 'country', 'ip'];
  const rows = events.map((event: Record<string, unknown>) => [
    event.timestamp,
    event.type,
    event.source,
    event.page,
    event.country || '',
    event.ip || '',
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

function convertFunnelsToCSV(funnels: unknown): string {
  if (!Array.isArray(funnels)) return '';

  const headers = [
    'source',
    'pageViews',
    'formStarts',
    'formSubmissions',
    'successfulSignups',
    'conversionRate',
  ];
  const rows = funnels.map((funnel: Record<string, unknown>) => [
    funnel.source,
    funnel.pageViews,
    funnel.formStarts,
    funnel.formSubmissions,
    funnel.successfulSignups,
    typeof funnel.conversionRate === 'number' ? funnel.conversionRate.toFixed(2) : '0',
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

function convertArrayToCSV(data: unknown, headers: string[]): string {
  if (!Array.isArray(data)) return '';

  const rows = data.map((item: Record<string, unknown>) =>
    headers.map((header) => item[header] || '')
  );
  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

function convertSummaryToCSV(data: unknown): string {
  if (!data || typeof data !== 'object') return '';

  const summary = data as Record<string, Record<string, number>>;
  if (!summary.total || !summary.today || !summary.week) return '';
  const rows = [
    ['Metric', 'Total', 'Today', 'This Week'],
    ['Events', summary.total.events, summary.today.events, summary.week.events],
    ['Page Views', summary.total.pageViews, summary.today.pageViews, summary.week.pageViews],
    ['Form Starts', summary.total.formStarts, summary.today.formStarts, summary.week.formStarts],
    [
      'Form Submissions',
      summary.total.formSubmissions,
      summary.today.formSubmissions,
      summary.week.formSubmissions,
    ],
    [
      'Successful Signups',
      summary.total.successfulSignups,
      summary.today.successfulSignups,
      summary.week.successfulSignups,
    ],
  ];

  return rows.map((row) => row.join(',')).join('\n');
}
