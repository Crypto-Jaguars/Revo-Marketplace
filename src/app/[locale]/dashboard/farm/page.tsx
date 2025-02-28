'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { WiDaySunny, WiCloudy, WiRain, WiHumidity, WiStrongWind } from 'react-icons/wi';
import Breadcrumb from '@/components/shared/Breadcrumb';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  forecast: Array<{
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    condition: string;
  }>;
}

const mockLocation = {
  latitude: 51.5074,
  longitude: -0.1278,
  address: '123 Farm Road',
  city: 'London',
  state: 'England',
  country: 'UK',
};

// Mock weather data
const mockWeatherData: WeatherData = {
  temperature: 22,
  condition: 'Sunny',
  humidity: 65,
  windSpeed: 12,
  precipitation: 0,
  forecast: [
    {
      date: new Date(Date.now()).toISOString().split('T')[0],
      temperature: { min: 18, max: 24 },
      condition: 'Sunny'
    },
    {
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      temperature: { min: 17, max: 23 },
      condition: 'Partly cloudy'
    },
    {
      date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      temperature: { min: 16, max: 22 },
      condition: 'Light rain'
    }
  ]
};

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('rain')) return WiRain;
  if (conditionLower.includes('cloud')) return WiCloudy;
  return WiDaySunny;
};

interface WeatherWidgetProps {
  location: Location;
}

const WeatherWidget = ({ location }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations('farm.weather');

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        setWeather(mockWeatherData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center h-40" 
        role="status" 
        tabIndex={0}
        aria-live="polite"
        aria-label={t('loading')}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4" role="alert">
        {t('error')}
      </div>
    );
  }

  if (!weather) return null;

  const WeatherIcon = getWeatherIcon(weather.condition);

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString(locale, { weekday: 'short' });
    } catch (e) {
      console.error('Date formatting error:', e);
      return date;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <WeatherIcon className="w-16 h-16 text-yellow-500" />
          <div>
            <div className="text-4xl font-bold text-gray-800">{weather.temperature}°C</div>
            <div className="text-gray-600 text-lg">{t('condition.' + weather.condition.toLowerCase())}</div>
          </div>
        </div>
        <div className="text-right space-y-2">
          <div className="flex items-center justify-end gap-2 text-gray-600">
            <WiHumidity className="w-6 h-6" />
            <span>{t('humidity', { value: weather.humidity })}</span>
          </div>
          <div className="flex items-center justify-end gap-2 text-gray-600">
            <WiStrongWind className="w-6 h-6" />
            <span>{t('windSpeed', { value: weather.windSpeed })}</span>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('forecast.title')}</h3>
        <div className="grid gap-3">
          {weather.forecast.map((day) => {
            const DayIcon = getWeatherIcon(day.condition);
            return (
              <div 
                key={day.date}
                role="article"
                tabIndex={0}
                aria-label={t('forecast.dayDetails', {
                  day: formatDate(day.date),
                  condition: t('condition.' + day.condition.toLowerCase()),
                  min: day.temperature.min,
                  max: day.temperature.max
                })}
                className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <div className="flex items-center gap-3">
                  <DayIcon className="w-8 h-8 text-blue-500" aria-hidden="true" />
                  <span className="text-gray-700 font-medium">
                    {formatDate(day.date)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{t('condition.' + day.condition.toLowerCase())}</span>
                  <span className="font-medium text-gray-800">
                    {t('forecast.temperature', { min: day.temperature.min, max: day.temperature.max })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function FarmDashboardPage() {
  const t = useTranslations('farm');

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: t('breadcrumb.dashboard'), href: '', isCurrent: true }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Weather Widget */}
        <section 
          className="col-span-1 bg-white rounded-lg shadow-md p-6"
          aria-labelledby="weather-title"
        >
          <h2 id="weather-title" className="text-xl font-semibold mb-4">{t('weather.title')}</h2>
          <WeatherWidget location={mockLocation} />
        </section>

        {/* Farm Stats */}
        <section 
          className="col-span-1 bg-white rounded-lg shadow-md p-6"
          aria-labelledby="stats-title"
        >
          <h2 id="stats-title" className="text-xl font-semibold mb-4">{t('stats.title')}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center" role="group" aria-label={t('stats.totalCrops')}>
              <span className="text-gray-600">{t('stats.totalCrops')}</span>
              <span className="font-semibold" aria-label={`24 ${t('stats.totalCrops')}`}>24</span>
            </div>
            <div className="flex justify-between items-center" role="group" aria-label={t('stats.activeFields')}>
              <span className="text-gray-600">{t('stats.activeFields')}</span>
              <span className="font-semibold" aria-label={`8 ${t('stats.activeFields')}`}>8</span>
            </div>
            <div className="flex justify-between items-center" role="group" aria-label={t('stats.harvestReady')}>
              <span className="text-gray-600">{t('stats.harvestReady')}</span>
              <span className="font-semibold text-green-600" aria-label={`3 ${t('stats.harvestReady')}`}>3</span>
            </div>
          </div>
        </section>

        {/* Tasks Overview */}
        <section 
          className="col-span-1 bg-white rounded-lg shadow-md p-6"
          aria-labelledby="tasks-title"
        >
          <h2 id="tasks-title" className="text-xl font-semibold mb-4">{t('tasks.title')}</h2>
          <ul className="space-y-3" role="list">
            <li className="flex items-center" role="listitem">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2" aria-hidden="true"></div>
              <span className="text-gray-600">{t('tasks.checkIrrigation')}</span>
            </li>
            <li className="flex items-center" role="listitem">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2" aria-hidden="true"></div>
              <span className="text-gray-600">{t('tasks.harvestTomatoes')}</span>
            </li>
            <li className="flex items-center" role="listitem">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2" aria-hidden="true"></div>
              <span className="text-gray-600">{t('tasks.applyFertilizer')}</span>
            </li>
          </ul>
        </section>
      </div>

      {/* Recent Activity */}
      <section 
        className="mt-8 bg-white rounded-lg shadow-md p-6"
        aria-labelledby="activity-title"
      >
        <h2 id="activity-title" className="text-xl font-semibold mb-4">{t('activity.title')}</h2>
        <ul className="space-y-4" role="list">
          <li className="flex items-center justify-between border-b pb-4" role="listitem">
            <div>
              <p className="font-medium">{t('activity.irrigation.title')}</p>
              <p className="text-sm text-gray-500">{t('activity.irrigation.description')}</p>
            </div>
            <time className="text-sm text-gray-500">{t('activity.irrigation.time')}</time>
          </li>
          <li className="flex items-center justify-between border-b pb-4" role="listitem">
            <div>
              <p className="font-medium">{t('activity.fertilizer.title')}</p>
              <p className="text-sm text-gray-500">{t('activity.fertilizer.description')}</p>
            </div>
            <time className="text-sm text-gray-500">{t('activity.fertilizer.time')}</time>
          </li>
          <li className="flex items-center justify-between" role="listitem">
            <div>
              <p className="font-medium">{t('activity.harvest.title')}</p>
              <p className="text-sm text-gray-500">{t('activity.harvest.description')}</p>
            </div>
            <time className="text-sm text-gray-500">{t('activity.harvest.time')}</time>
          </li>
        </ul>
      </section>
    </div>
  );
} 