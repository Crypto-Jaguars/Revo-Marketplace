# Store Architecture

## Overview

This directory contains the state management implementation for the Revolutionary Farmers Marketplace application. We use Zustand for state management with a modular slice-based architecture.

## Structure

```
store/
├── index.ts                # Central export point for all stores
├── slices/                 # Store slices organized by domain
│   ├── cart/               # Cart state management
│   │   ├── index.ts        # Store implementation
│   │   └── types.ts        # Type definitions
│   ├── language/           # Language/i18n state management
│   │   ├── index.ts
│   │   └── types.ts
│   ├── search/             # Search functionality state
│   │   ├── index.ts
│   │   └── types.ts
│   ├── wallet/             # Blockchain wallet state
│   │   ├── index.ts
│   │   └── types.ts
│   ├── farm/               # Farm data state management
│   │   ├── index.ts
│   │   └── types.ts
│   └── utils/              # Utility state (loaders, etc.)
│       ├── index.ts
│       └── types.ts
└── README.md               # This documentation file
```

## Usage

### Importing Stores

Always import stores from the central export point:

```typescript
// Good - use the central export
import { useCartStore, useLanguageStore } from '@/store';

// Bad - don't import directly from slices
import { useCartStore } from '@/store/slices/cart';
```

### Accessing Store State and Actions

```typescript
const { Items, addItem, removeItem } = useCartStore();
const { language, setLanguage } = useLanguageStore();
```

## Creating New Stores

1. Create a new directory under `slices/` for your store domain
2. Create `types.ts` to define your state and action interfaces
3. Create `index.ts` to implement your store
4. Export your store from the root `index.ts`

Example:

```typescript
// slices/myFeature/types.ts
export interface MyFeatureState {
  data: string[];
  isLoading: boolean;

  // Actions
  addData: (item: string) => void;
  clearData: () => void;
}

// slices/myFeature/index.ts
import { create } from 'zustand';
import type { MyFeatureState } from './types';

export const useMyFeatureStore = create<MyFeatureState>((set) => ({
  data: [],
  isLoading: false,

  addData: (item) => set((state) => ({ data: [...state.data, item] })),
  clearData: () => set({ data: [] }),
}));

// Add to store/index.ts
export { useMyFeatureStore } from './slices/myFeature';
export type { MyFeatureState } from './slices/myFeature/types';
```

## Best Practices

1. **Separation of Concerns**: Each store slice should focus on a specific domain
2. **Type Safety**: Always define and export proper TypeScript interfaces
3. **Persistence**: Use Zustand middleware like `persist` when state needs to survive page refreshes
4. **Immutability**: Always update state immutably using spread operators or immer
5. **Minimal State**: Only store what's necessary in global state
6. **Devtools**: Use the `devtools` middleware during development for debugging

## Testing

Store tests should be placed in the `__tests__` directory at the root of the store folder. Use mock implementations when testing components that use stores.

Example:

```typescript
// __tests__/cart.test.ts
import { useCartStore } from '@/store';

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.getState().resetCart();
  });

  it('should add items to cart', () => {
    const store = useCartStore.getState();
    store.addItem({
      id: 1,
      name: 'Test',
      price: { amount: 10, unit: 'USD' },
      quantity: 1,
      images: [],
    });
    expect(store.Items.length).toBe(1);
  });
});
```
