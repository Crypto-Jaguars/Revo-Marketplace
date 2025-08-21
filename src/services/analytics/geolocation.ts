interface GeolocationData {
  country: string;
  countryCode: string;
  city?: string;
  region?: string;
  timezone?: string;
}

// Basic IP cache
const ipToCountryMap = new Map();

// Mock data for development
const mockGeolocationData: Record<string, GeolocationData> = {
  'localhost': { country: 'Costa Rica', countryCode: 'CR', city: 'San Jose' },
  '127.0.0.1': { country: 'Costa Rica', countryCode: 'CR', city: 'San Jose' },
  '::1': { country: 'Costa Rica', countryCode: 'CR', city: 'San Jose' },
  'unknown': { country: 'Unknown', countryCode: 'XX' },
};

export async function getGeolocationFromIP(ip: string) {
  // Check cache first
  if (ipToCountryMap.has(ip)) {
    return ipToCountryMap.get(ip)!;
  }

  // Handle local/development IPs
  if (ip === 'unknown' || ip === 'localhost' || ip === '127.0.0.1' || ip === '::1') {
    const data = mockGeolocationData[ip] || mockGeolocationData['unknown'];
    ipToCountryMap.set(ip, data);
    return data;
  }

  try {
    // Using free IP API
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city,regionName,timezone`);
    
    if (!response.ok) {
      throw new Error('Geolocation service unavailable');
    }
    
    const data = await response.json();
    
    if (data.status === 'success') {
      const geoData: GeolocationData = {
        country: data.country || 'Unknown',
        countryCode: data.countryCode || 'XX',
        city: data.city,
        region: data.regionName,
        timezone: data.timezone,
      };
      
      // Cache the result
      ipToCountryMap.set(ip, geoData);
      return geoData;
    }
  } catch (error) {
    console.error('Geolocation lookup failed:', error);
  }

  // Fallback to unknown
  const fallbackData = mockGeolocationData['unknown'];
  ipToCountryMap.set(ip, fallbackData);
  return fallbackData;
}

export function getCountryFromUserAgent(userAgent?: string) {
  // Fallback method
  if (!userAgent) return 'Unknown';
  
  // Look for language hints in user agent
  const languagePatterns = {
    'es': 'Spain',
    'en-US': 'United States',
    'en-GB': 'United Kingdom',
    'fr': 'France',
    'de': 'Germany',
    'pt': 'Portugal',
    'it': 'Italy',
  };
  
  for (const [lang, country] of Object.entries(languagePatterns)) {
    if (userAgent.toLowerCase().includes(lang.toLowerCase())) {
      return country;
    }
  }
  
  return 'Unknown';
}