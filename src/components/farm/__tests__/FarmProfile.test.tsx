import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FarmProfile from '../FarmProfile';

const mockFarmData = {
  id: '1',
  name: 'Green Valley Farm',
  establishedDate: '2020-01-01',
  location: {
    latitude: 51.5074,
    longitude: -0.1278,
    address: '123 Farm Road',
    city: 'London',
    state: 'England',
    country: 'UK',
  },
  totalArea: {
    value: 100,
    unit: 'hectares',
  },
  contactInfo: {
    phone: '+44 123 456 7890',
    email: 'contact@greenvalleyfarm.com',
    website: 'https://greenvalleyfarm.com',
  },
  images: [
    {
      id: '1',
      url: '/mock-farm-image.jpg',
      alt: 'Farm entrance',
    },
  ],
  certifications: [],
  farmingMethods: [],
  activeCrops: [],
  infrastructure: {
    equipment: [],
    storage: [],
    processing: [],
  },
  sustainabilityMetrics: {
    waterUsage: {
      amount: 0,
      unit: 'liters',
      period: 'day',
    },
    carbonFootprint: {
      amount: 0,
      unit: 'kg',
      period: 'year',
    },
    renewableEnergy: {
      percentage: 0,
      sources: [],
    },
    wasteManagement: {
      recyclingRate: 0,
      compostingRate: 0,
      methods: [],
    },
  },
};

describe('FarmProfile', () => {
  it('renders farm name and basic information', () => {
    render(<FarmProfile {...mockFarmData} />);

    expect(screen.getByText('Green Valley Farm')).toBeInTheDocument();
    expect(screen.getByText(/123 Farm Road/)).toBeInTheDocument();
    expect(screen.getByText(/London, England, UK/)).toBeInTheDocument();
  });

  it('displays contact information correctly', () => {
    render(<FarmProfile {...mockFarmData} />);

    expect(screen.getByText('+44 123 456 7890')).toBeInTheDocument();
    expect(screen.getByText('contact@greenvalleyfarm.com')).toBeInTheDocument();
    expect(screen.getByText('Visit Website')).toBeInTheDocument();
  });

  it('shows total area with correct unit', () => {
    render(<FarmProfile {...mockFarmData} />);

    expect(screen.getByText('100 hectares')).toBeInTheDocument();
  });

  it('renders establishment date in correct format', () => {
    render(<FarmProfile {...mockFarmData} />);

    expect(screen.getByText(/Established January 1, 2020/)).toBeInTheDocument();
  });

  it('renders without images when none provided', () => {
    const dataWithoutImages = {
      ...mockFarmData,
      images: [],
    };

    render(<FarmProfile {...dataWithoutImages} />);
    expect(screen.getByText('Green Valley Farm')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<FarmProfile {...mockFarmData} />);

    expect(screen.getByRole('heading', { name: 'Green Valley Farm' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Visit Website' })).toHaveAttribute(
      'aria-label',
      'Visit Green Valley Farm website'
    );
  });

  it('renders with RTL support', () => {
    render(
      <div dir="rtl">
        <FarmProfile {...mockFarmData} />
      </div>
    );

    const container = screen.getByRole('article');
    expect(container).toHaveStyle({ direction: 'rtl' });
  });
});
