/**
 * Test helper utilities for working with Zustand stores in tests
 */
import { StoreApi } from 'zustand';
import { UseBoundStore } from 'zustand/react';

/**
 * Helper function to safely mock Zustand stores in tests
 * This properly handles the type casting to avoid TypeScript errors
 */
export function mockZustandStore<T>(store: UseBoundStore<StoreApi<T>>, mockValue: Partial<T>) {
  return (store as unknown as jest.Mock).mockReturnValue(mockValue);
}
