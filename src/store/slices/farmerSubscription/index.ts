"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FarmerSubscriptionActions, FarmerSubscriptionState } from './types';

const initialState: FarmerSubscriptionState = {
  currentStep: 1,
  data: {
    fullName: '',
    email: '',
    phone: '',
    farmName: '',
    location: { city: '', state: '', country: '' },
    productTypes: [],
    farmingMethod: 'organic',
    password: '',
    agreeToTerms: false,
    website: '',
  },
  isSaving: false,
  lastSavedAt: undefined,
};

export const useFarmerSubscriptionStore = create<
  FarmerSubscriptionState & FarmerSubscriptionActions
>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: (Math.min(3, s.currentStep + 1) as 1 | 2 | 3) })),
      prevStep: () => set((s) => ({ currentStep: (Math.max(1, s.currentStep - 1) as 1 | 2 | 3) })),
      updateData: (patch) => set((s) => ({ data: { ...s.data, ...patch } })),
      setSaving: (saving) => set({ isSaving: saving }),
      markSaved: () => set({ lastSavedAt: Date.now() }),
      reset: () => set({ ...initialState }),
    }),
    {
      name: 'farmer-subscription',
      partialize: (state) => ({ currentStep: state.currentStep, data: state.data, lastSavedAt: state.lastSavedAt }),
    }
  )
);


