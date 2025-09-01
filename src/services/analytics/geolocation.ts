export interface GeolocationData {
  country: string;
  countryCode: string;
  city?: string;
  region?: string;
  timezone?: string;
}

// API response interfaces
interface IPApiCoResponse {
  error?: boolean;
  reason?: string;
  country_name?: string;
  country_code?: string;
  city?: string;
  region?: string;
  timezone?: string;
}

interface IPApiComResponse {
  status?: string;
  country?: string;
  countryCode?: string;
  city?: string;
  regionName?: string;
  timezone?: string;
}

// Union type for all supported API responses
type GeolocationApiResponse = IPApiCoResponse | IPApiComResponse | Record<string, unknown>;

// Typed cache with TTL support
interface CacheEntry {
  data: GeolocationData;
  expiresAt: number;
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const GEOLOCATION_TIMEOUT_MS = parseInt(process.env.GEOLOCATION_TIMEOUT_MS || '5000', 10);
const GEOLOCATION_API_BASE = process.env.GEOLOCATION_API_BASE || 'https://ipapi.co';

const ipToCountryMap = new Map<string, CacheEntry>();

// GDPR-friendly IP redaction helper
function redactIp(ip: string): string {
  if (!ip || ip === 'unknown' || ip === 'localhost') {
    return ip;
  }
  
  // IPv6 detection and redaction
  if (ip.includes(':')) {
    // For IPv6, keep first 4 segments and replace rest with ::
    const segments = ip.split(':');
    if (segments.length >= 4) {
      // Keep first 4 segments (64-bit prefix) and add /64 suffix
      return segments.slice(0, 4).join(':') + '::/64';
    }
    // Malformed IPv6, return as-is but masked
    return ip.substring(0, Math.min(ip.length, 10)) + '::';
  }
  
  // IPv4 redaction
  const octets = ip.split('.');
  if (octets.length === 4) {
    // Replace last octet with 0
    octets[3] = '0';
    return octets.join('.');
  }
  
  // Malformed IP, partially redact
  return ip.substring(0, Math.min(ip.length, 8)) + '***';
}

// Helper functions for TTL cache management
function getCacheEntry(ip: string): GeolocationData | null {
  const entry = ipToCountryMap.get(ip);
  if (!entry) return null;
  
  // Check if expired
  if (entry.expiresAt <= Date.now()) {
    ipToCountryMap.delete(ip);
    return null;
  }
  
  return entry.data;
}

function setCacheEntry(ip: string, data: GeolocationData): void {
  const entry: CacheEntry = {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS
  };
  ipToCountryMap.set(ip, entry);
}

// Build API URL based on provider
function buildGeolocationUrl(ip: string, baseUrl: string): string {
  if (baseUrl.includes('ipapi.co')) {
    return `${baseUrl}/${ip}/json/`;
  } else if (baseUrl.includes('ip-api.com')) {
    return `${baseUrl}/json/${ip}?fields=status,country,countryCode,city,regionName,timezone`;
  } else {
    // Generic fallback
    return `${baseUrl}/${ip}`;
  }
}

// Map API response to our GeolocationData format
function mapApiResponse(data: GeolocationApiResponse, provider: string): GeolocationData | null {
  if (provider.includes('ipapi.co')) {
    const apiData = data as IPApiCoResponse;
    if (apiData.error) {
      // Log explicit error with provider and reason for debugging
      const errorMessage = apiData.reason 
        ? `Geolocation API error from ${provider}: ${apiData.reason}`
        : `Geolocation API error from ${provider}: Unknown error (no reason provided)`;
      console.error(errorMessage);
      return null;
    }
    return {
      country: apiData.country_name || 'Unknown',
      countryCode: apiData.country_code || 'XX',
      city: apiData.city,
      region: apiData.region,
      timezone: apiData.timezone,
    };
  } else if (provider.includes('ip-api.com')) {
    const apiData = data as IPApiComResponse;
    if (apiData.status !== 'success') {
      // Log explicit error for debugging
      console.error(`Geolocation API error from ${provider}: Status = ${apiData.status || 'unknown'}`);
      return null;
    }
    return {
      country: apiData.country || 'Unknown',
      countryCode: apiData.countryCode || 'XX',
      city: apiData.city,
      region: apiData.regionName,
      timezone: apiData.timezone,
    };
  } else {
    // Generic mapping with type assertion
    const genericData = data as Record<string, unknown>;
    return {
      country: (genericData.country || genericData.country_name || 'Unknown') as string,
      countryCode: (genericData.countryCode || genericData.country_code || 'XX') as string,
      city: genericData.city as string | undefined,
      region: (genericData.region || genericData.regionName) as string | undefined,
      timezone: genericData.timezone as string | undefined,
    };
  }
}

// Mock data for development
const mockGeolocationData: Record<string, GeolocationData> = {
  'localhost': { country: 'Costa Rica', countryCode: 'CR', city: 'San Jose' },
  '127.0.0.1': { country: 'Costa Rica', countryCode: 'CR', city: 'San Jose' },
  '::1': { country: 'Costa Rica', countryCode: 'CR', city: 'San Jose' },
  'unknown': { country: 'Unknown', countryCode: 'XX' },
};

export async function getGeolocationFromIP(ip: string): Promise<GeolocationData> {
  // Check cache first (with TTL expiration)
  const cachedData = getCacheEntry(ip);
  if (cachedData) {
    return cachedData;
  }

  // Handle local/development IPs
  if (ip === 'unknown' || ip === 'localhost' || ip === '127.0.0.1' || ip === '::1') {
    const data = mockGeolocationData[ip] || mockGeolocationData['unknown'];
    setCacheEntry(ip, data);
    return data;
  }

  // Create AbortController for timeout
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    abortController.abort();
  }, GEOLOCATION_TIMEOUT_MS);

  try {
    // Build URL for configured provider
    const apiUrl = buildGeolocationUrl(ip, GEOLOCATION_API_BASE);
    
    // Fetch with timeout and abort signal
    const response = await fetch(apiUrl, {
      signal: abortController.signal,
      headers: {
        'User-Agent': 'GeolocationService/1.0',
        'Accept': 'application/json',
      },
    });

    // Clear timeout on successful response
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Geolocation API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    const geoData = mapApiResponse(data, GEOLOCATION_API_BASE);
    
    if (geoData) {
      // Cache the result with TTL
      setCacheEntry(ip, geoData);
      return geoData;
    } else {
      throw new Error('Invalid response format from geolocation API');
    }
  } catch (error) {
    // Clear timeout in case of error
    clearTimeout(timeoutId);
    
    // Handle different error types with PII-safe logging
    const redactedIp = redactIp(ip);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error(`Geolocation API timeout for redacted IP ${redactedIp}: Timeout after ${GEOLOCATION_TIMEOUT_MS}ms`);
      } else if (error.message.includes('fetch')) {
        console.error(`Geolocation API network error for redacted IP ${redactedIp}: ${error.message}`);
      } else {
        console.error(`Geolocation API error for redacted IP ${redactedIp}: ${error.message}`);
      }
    } else {
      console.error(`Geolocation API unknown error for redacted IP ${redactedIp}`);
    }
  }

  // Fallback to unknown
  const fallbackData = mockGeolocationData['unknown'];
  setCacheEntry(ip, fallbackData);
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