import { UserRole } from '@/types/waitlist';

/**
 * Get the appropriate redirect URL based on user role
 * @param role - The user's role
 * @param locale - The current locale
 * @returns The redirect URL for the user's dashboard
 */
export function getRoleBasedRedirect(role: UserRole, locale: string = 'en'): string {
  const basePath = `/${locale}`;

  switch (role) {
    case 'farmer':
      return `${basePath}/dashboard/farm`;
    case 'consumer':
      return `${basePath}/orders`;
    case 'investor':
      return `${basePath}/invest`;
    case 'partner':
      return `${basePath}/dashboard`;
    case 'other':
    default:
      return `${basePath}/marketplace`;
  }
}

/**
 * Get the appropriate redirect URL for buyers (consumers)
 * @param locale - The current locale
 * @returns The redirect URL for buyers
 */
export function getBuyerRedirect(locale: string = 'en'): string {
  return `/${locale}/orders`;
}

/**
 * Get the appropriate redirect URL for farmers/merchants
 * @param locale - The current locale
 * @returns The redirect URL for farmers
 */
export function getFarmerRedirect(locale: string = 'en'): string {
  return `/${locale}/dashboard/farm`;
}

/**
 * Get the appropriate redirect URL for investors
 * @param locale - The current locale
 * @returns The redirect URL for investors
 */
export function getInvestorRedirect(locale: string = 'en'): string {
  return `/${locale}/invest`;
}

/**
 * Get the default redirect URL when role is unknown
 * @param locale - The current locale
 * @returns The default redirect URL
 */
export function getDefaultRedirect(locale: string = 'en'): string {
  return `/${locale}/marketplace`;
}
