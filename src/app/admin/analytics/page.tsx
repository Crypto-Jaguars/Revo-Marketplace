'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Download,
  Eye,
  MousePointer,
  Send,
  CheckCircle,
  TrendingUp,
  Globe,
  Users,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsData {
  total: {
    events: number;
    pageViews: number;
    formStarts: number;
    formSubmissions: number;
    successfulSignups: number;
  };
  today: {
    events: number;
    pageViews: number;
    formStarts: number;
    formSubmissions: number;
    successfulSignups: number;
  };
  week: {
    events: number;
    pageViews: number;
    formStarts: number;
    formSubmissions: number;
    successfulSignups: number;
  };
  conversionFunnels: Array<{
    source: string;
    pageViews: number;
    formStarts: number;
    formSubmissions: number;
    successfulSignups: number;
    conversionRate: number;
  }>;
  topSources: Array<{ source: string; count: number }>;
  topCountries: Array<{ country: string; count: number }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics', {
        credentials: 'include', // Include cookies in request
      });

      if (response.status === 401) {
        setAuthenticated(false);
        setError('Session expired. Please login again.');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const result = await response.json();
      setData(result);
      setAuthenticated(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Login via secure endpoint
      const loginResponse = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ adminKey }),
      });

      if (!loginResponse.ok) {
        const result = await loginResponse.json();
        setError(result.error || 'Login failed');
        return;
      }

      // Clear the key from memory after successful login
      setAdminKey('');

      // Fetch analytics data
      await fetchAnalytics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setLoading(false);
    }
  };

  // Removed insecure client-side key storage functions

  const downloadCSV = async (type: string) => {
    try {
      const response = await fetch(`/api/analytics?type=${type}&format=csv`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to export data');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${type}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to export data');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', {
        method: 'DELETE',
        credentials: 'include',
      });
      setAuthenticated(false);
      setData(null);
    } catch (err) {
      console.error('Logout error:', err);
      // Force logout on error
      setAuthenticated(false);
      setData(null);
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Authentication form
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Analytics Dashboard
            </CardTitle>
            <CardDescription>Enter the admin API key to access analytics data</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700 mb-1">
                  Admin API Key
                </label>
                <input
                  id="adminKey"
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Enter admin key..."
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Authenticating...' : 'Access Dashboard'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchAnalytics}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  const conversionRate =
    data.total.pageViews > 0
      ? ((data.total.successfulSignups / data.total.pageViews) * 100).toFixed(2)
      : '0';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart className="w-8 h-8 text-brand-500" />
              Waitlist Analytics
            </h1>
            <p className="text-gray-600 mt-1">Real-time insights into your waitlist performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => downloadCSV('summary')}>
              <Download className="w-4 h-4 mr-2" />
              Export Summary
            </Button>
            <Button onClick={fetchAnalytics}>Refresh</Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Page Views"
            value={data.total.pageViews}
            change={data.today.pageViews}
            changeLabel="today"
            icon={<Eye className="w-5 h-5" />}
            color="blue"
          />
          <MetricCard
            title="Form Starts"
            value={data.total.formStarts}
            change={data.today.formStarts}
            changeLabel="today"
            icon={<MousePointer className="w-5 h-5" />}
            color="green"
          />
          <MetricCard
            title="Successful Signups"
            value={data.total.successfulSignups}
            change={data.today.successfulSignups}
            changeLabel="today"
            icon={<CheckCircle className="w-5 h-5" />}
            color="purple"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            color="orange"
          />
        </div>

        {/* Conversion Funnels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Conversion Funnels by Source
              </CardTitle>
              <CardDescription>Performance breakdown by traffic source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.conversionFunnels.map((funnel) => (
                  <div key={funnel.source} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold capitalize">{funnel.source}</h4>
                      <Badge variant="secondary">
                        {funnel.conversionRate.toFixed(1)}% conversion
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="text-center">
                        <div className="text-blue-600 font-medium">{funnel.pageViews}</div>
                        <div className="text-gray-500">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-600 font-medium">{funnel.formStarts}</div>
                        <div className="text-gray-500">Starts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-600 font-medium">{funnel.formSubmissions}</div>
                        <div className="text-gray-500">Submits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-600 font-medium">
                          {funnel.successfulSignups}
                        </div>
                        <div className="text-gray-500">Success</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => downloadCSV('funnels')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Funnel Data
              </Button>
            </CardContent>
          </Card>

          {/* Top Sources & Countries */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Top Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.topSources.map((source, index) => (
                    <div key={source.source} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="capitalize">{source.source}</span>
                      </div>
                      <Badge variant="outline">{source.count}</Badge>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => downloadCSV('sources')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Sources
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Top Countries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.topCountries.map((country, index) => (
                    <div key={country.country} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <span>{country.country}</span>
                      </div>
                      <Badge variant="outline">{country.count}</Badge>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => downloadCSV('countries')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Countries
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Time Period Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Performance Over Time
            </CardTitle>
            <CardDescription>Compare metrics across different time periods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Metric</th>
                    <th className="text-right py-2">Total</th>
                    <th className="text-right py-2">This Week</th>
                    <th className="text-right py-2">Today</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b">
                    <td className="py-2">Page Views</td>
                    <td className="text-right py-2 font-medium">{data.total.pageViews}</td>
                    <td className="text-right py-2">{data.week.pageViews}</td>
                    <td className="text-right py-2">{data.today.pageViews}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Form Starts</td>
                    <td className="text-right py-2 font-medium">{data.total.formStarts}</td>
                    <td className="text-right py-2">{data.week.formStarts}</td>
                    <td className="text-right py-2">{data.today.formStarts}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Form Submissions</td>
                    <td className="text-right py-2 font-medium">{data.total.formSubmissions}</td>
                    <td className="text-right py-2">{data.week.formSubmissions}</td>
                    <td className="text-right py-2">{data.today.formSubmissions}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Successful Signups</td>
                    <td className="text-right py-2 font-medium text-green-600">
                      {data.total.successfulSignups}
                    </td>
                    <td className="text-right py-2 text-green-600">
                      {data.week.successfulSignups}
                    </td>
                    <td className="text-right py-2 text-green-600">
                      {data.today.successfulSignups}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  color = 'blue',
}: {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color?: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change !== undefined && changeLabel && (
              <p className="text-sm text-gray-500 mt-1">
                +{change} {changeLabel}
              </p>
            )}
          </div>
          <div className={cn('p-3 rounded-full', colorClasses[color as keyof typeof colorClasses])}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
