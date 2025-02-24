'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { WiDaySunny, WiCloudy, WiRain, WiHumidity, WiStrongWind } from 'react-icons/wi';

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

interface Props {
  location: Location;
}

const WeatherWidget = ({ location }: Props) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('farm.weather');

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setWeather(mockWeatherData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40" role="status" aria-label={t('loading')}>
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

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <WeatherIcon className="w-16 h-16 text-yellow-500" />
          <div>
            <div className="text-4xl font-bold text-gray-800">{weather.temperature}°C</div>
            <div className="text-gray-600 text-lg">{weather.condition}</div>
          </div>
        </div>
        <div className="text-right space-y-2">
          <div className="flex items-center justify-end gap-2 text-gray-600">
            <WiHumidity className="w-6 h-6" />
            <span>{weather.humidity}% Humidity</span>
          </div>
          <div className="flex items-center justify-end gap-2 text-gray-600">
            <WiStrongWind className="w-6 h-6" />
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">3-Day Forecast</h3>
        <div className="grid gap-3">
          {weather.forecast.map((day) => {
            const DayIcon = getWeatherIcon(day.condition);
            return (
              <div 
                key={day.date} 
                className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <DayIcon className="w-8 h-8 text-blue-500" />
                  <span className="text-gray-700 font-medium">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{day.condition}</span>
                  <span className="font-medium text-gray-800">
                    {day.temperature.min}° - {day.temperature.max}°C
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

export default WeatherWidget; 