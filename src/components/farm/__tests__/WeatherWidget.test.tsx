import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, MockedFunction } from 'vitest';
import WeatherWidget from '../WeatherWidget';
import { WeatherData, getWeatherData } from '../../../services/weather';
import { act } from '@testing-library/react';

// Mock the weather service
vi.mock('@/services/weather', () => ({
  getWeatherData: vi.fn(),
}));

const mockLocation = {
  latitude: 51.5074,
  longitude: -0.1278,
  address: '123 Farm Road',
  city: 'London',
  state: 'England',
  country: 'UK',
};

const mockWeatherData = {
  temperature: 20,
  condition: 'Sunny',
  humidity: 65,
  windSpeed: 10,
  precipitation: 0,
  forecast: [
    {
      date: '2024-02-24',
      temperature: {
        min: 15,
        max: 25,
      },
      condition: 'Sunny',
    },
    {
      date: '2024-02-25',
      temperature: {
        min: 14,
        max: 23,
      },
      condition: 'Cloudy',
    },
  ],
};

const mockedGetWeatherData = getWeatherData as MockedFunction<typeof getWeatherData>;

describe('WeatherWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', async () => {
    const promise = new Promise<WeatherData>(() => {});
    mockedGetWeatherData.mockImplementation(() => promise);
    
    await act(async () => {
      render(<WeatherWidget location={mockLocation} />);
    });
    
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveAttribute('aria-label', 'Loading weather data');
  });

  it('displays weather data when loaded successfully', async () => {
    mockedGetWeatherData.mockResolvedValue(mockWeatherData);
    
    await act(async () => {
      render(<WeatherWidget location={mockLocation} />);
    });

    await waitFor(() => {
      expect(screen.getByText('20°C')).toBeInTheDocument();
      expect(screen.getByText('Sunny')).toBeInTheDocument();
      expect(screen.getByText('65%')).toBeInTheDocument();
      expect(screen.getByText('10 km/h')).toBeInTheDocument();
    });
  });

  it('shows error message when weather data fails to load', async () => {
    mockedGetWeatherData.mockRejectedValue(new Error('Failed to fetch'));
    
    await act(async () => {
      render(<WeatherWidget location={mockLocation} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to load weather data')).toBeInTheDocument();
    });
  });

  it('displays forecast information', async () => {
    mockedGetWeatherData.mockResolvedValue(mockWeatherData);
    
    await act(async () => {
      render(<WeatherWidget location={mockLocation} />);
    });

    await waitFor(() => {
      expect(screen.getByText('7-Day Forecast')).toBeInTheDocument();
      expect(screen.getByText('15°C - 25°C')).toBeInTheDocument();
      expect(screen.getByText('14°C - 23°C')).toBeInTheDocument();
    });
  });

  it('calls weather service with correct coordinates', async () => {
    await act(async () => {
      render(<WeatherWidget location={mockLocation} />);
    });
    
    expect(getWeatherData).toHaveBeenCalledWith(
      mockLocation.latitude,
      mockLocation.longitude
    );
  });
}); 