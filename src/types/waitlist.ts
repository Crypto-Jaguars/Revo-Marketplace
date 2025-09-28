export type UserRole = 'farmer' | 'investor' | 'consumer' | 'partner' | 'other';

export interface WaitlistFormData {
  name?: string;
  email: string;
  role?: UserRole;
  consent: boolean;
}

export interface WaitlistSubmission extends WaitlistFormData {
  id?: string;
  referralSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
  ip?: string;
  country?: string;
  sessionId?: string;
  emailSent?: boolean;
  emailSentAt?: Date;
  unsubscribed?: boolean;
  unsubscribedAt?: Date;
  unsubscribeReason?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
  data?: Partial<WaitlistSubmission>;
  error?: string;
}

export interface WaitlistStats {
  totalSignups: number;
  signupsByRole: Record<UserRole, number>;
  signupsBySource: Record<string, number>;
  dailySignups: Array<{ date: string; count: number }>;
  signupsByCountry: Record<string, number>;
  conversionRates: {
    homepage: number;
    directLink: number;
    socialMedia: number;
    email: number;
    other: number;
  };
  recentSignups: Array<{
    email: string;
    role?: string;
    country?: string;
    source?: string;
    createdAt: string;
  }>;
}

export interface AnalyticsEvent {
  type: 'page_view' | 'form_start' | 'form_submit' | 'form_success' | 'form_error';
  source: string;
  page: string;
  userAgent?: string;
  ip?: string;
  country?: string;
  timestamp: Date;
  sessionId?: string;
}

export interface ConversionFunnel {
  source: string;
  pageViews: number;
  formStarts: number;
  formSubmissions: number;
  successfulSignups: number;
  conversionRate: number;
}
