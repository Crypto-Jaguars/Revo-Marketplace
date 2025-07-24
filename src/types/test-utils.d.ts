// Type declarations for test utilities
import { StoreApi } from 'zustand';
import { UseBoundStore } from 'zustand/react';

// Extend Jest's global namespace for Zustand store mocking
declare global {
  namespace jest {
    // Add proper type casting for Zustand stores in tests
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface Mock<T = any, Y extends any[] = any[], R = T> {
      <TStore>(this: StoreApi<TStore> | UseBoundStore<StoreApi<TStore>>): jest.Mock<T, Y>;
    }
  }
}

export {};
