/**
 * Root store exports
 *
 * This file centralizes all store exports to provide a single import point
 * for state management throughout the application.
 */

// Cart store
export { useCartStore } from './slices/cart/index';
export type { CartItem, CartState, Farmer, Price } from './slices/cart/types';

// Language store
export { useLanguageStore } from './slices/language/index';
export type { LanguageState } from './slices/language/types';

// Search store
export { useSearchStore } from './slices/search/index';
export type { SearchState } from './slices/search/types';

// Wallet store
export { useWalletStore } from './slices/wallet/index';
export type { WalletState } from './slices/wallet/types';

// Farm store
export { useFarmStore } from './slices/farm/index';
export type { FarmState, FarmActions } from './slices/farm/types';

// Utils store
export { useLoaderStore } from './slices/utils/index';
export type { LoaderState } from './slices/utils/types';
