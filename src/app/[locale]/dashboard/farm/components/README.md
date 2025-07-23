# Farm Components Documentation

## Overview

The farm components provide a comprehensive UI for displaying and managing farm information in the Revolutionary Farmers platform. Built with Next.js 14, TypeScript, and Zustand for state management.

## Components

### FarmProfile

Displays basic farm information including:

- Farm name and establishment date
- Location details
- Contact information
- Total area
- Featured image

```tsx
import FarmProfile from '@/components/farm/FarmProfile';

<FarmProfile
  id="farm-1"
  name="Green Valley Farm"
  establishedDate="2024-01-01"
  location={locationData}
  totalArea={{ value: 100, unit: 'hectares' }}
  contactInfo={contactData}
  images={imageData}
/>;
```

### FarmDetails

Shows detailed information about:

- Farming methods with sustainability scores
- Equipment inventory
- Storage facilities
- Processing capabilities

### FarmGallery

Image gallery component with:

- Grid layout display
- Modal view for larger images
- Navigation controls
- Lazy loading support

### FarmMetrics

Displays farm performance metrics:

- Active crops tracking
- Sustainability metrics
- Resource usage statistics
- Environmental impact data

### FarmCertifications

Manages farm certifications:

- Certification status display
- Document verification
- Expiry tracking

### WeatherWidget

Real-time weather information:

- Current conditions
- 7-day forecast
- Location-based updates

### MapView

Interactive map component:

- Farm location display
- Navigation controls
- Location marker with popup info

## State Management

The farm state is managed using Zustand. Key features:

```typescript
const farmStore = useFarmStore();

// Update farm data
farmStore.setFarmData({ name: 'New Farm Name' });

// Update location
farmStore.updateLocation(newLocation);

// Manage certifications
farmStore.addCertification(newCert);
farmStore.removeCertification(certId);

// Update crop information
farmStore.updateCrop(cropId, updates);
```

## API Integration

### Weather API

- Uses WeatherAPI.com
- Requires `NEXT_PUBLIC_WEATHER_API_KEY`
- Fetches current conditions and forecast

### Mapbox Integration

- Uses Mapbox GL JS
- Requires `NEXT_PUBLIC_MAPBOX_TOKEN`
- Interactive map display

## Testing

Components are tested using Vitest and React Testing Library:

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Performance Considerations

- Images are optimized using Next.js Image component
- Lazy loading for gallery images
- Data persistence with Zustand
- Error boundaries for API failures

## Accessibility

- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## Internationalization

Supports multiple languages through next-intl:

- Date formatting
- Number formatting
- RTL layout support
- Translations management

## Environment Variables

Required environment variables:

```env
# API Keys (store securely and never commit to repository)
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key  # Restrict to specific domains
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token       # Set usage limits

# Security best practices:
# 1. Use environment-specific keys
# 2. Rotate keys periodically
# 3. Monitor API usage
# 4. Implement rate limiting
```
