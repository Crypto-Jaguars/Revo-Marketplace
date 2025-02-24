export interface WeatherData {
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

// Add interface for API response
interface WeatherAPIForecastDay {
  date: string;
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    condition: {
      text: string;
    };
  };
}

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('Weather API key is not configured');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7&aqi=no`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    return {
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      precipitation: data.current.precip_mm,
      forecast: data.forecast.forecastday.map((day: WeatherAPIForecastDay) => ({
        date: day.date,
        temperature: {
          min: day.day.mintemp_c,
          max: day.day.maxtemp_c,
        },
        condition: day.day.condition.text,
      })),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
} 