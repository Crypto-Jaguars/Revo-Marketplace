'use client';

import { create } from 'zustand';
import type { OnboardingState, OnboardingActions, OnboardingStep } from './types';

const ONBOARDING_STEPS: OnboardingStep[] = [
  'welcome',
  'wallet-setup',
  'user-type',
  'tour',
  'verification',
  'complete'
];

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
  (set, get) => ({
    // Initial State
    progress: {
      currentStep: 'welcome',
      completedSteps: [],
      totalSteps: ONBOARDING_STEPS.length,
      isCompleted: false,
    },
    preferences: {
      userType: null,
      hasWallet: false,
      walletType: null,
      skipTour: false,
      language: 'en',
    },
    isLoading: false,
    error: null,
    isSkipped: false,
    lastActiveStep: 'welcome',

    // Step Navigation
    setCurrentStep: (step: OnboardingStep) => {
      set((state) => ({
        progress: {
          ...state.progress,
          currentStep: step,
        },
        lastActiveStep: step,
      }));
    },

    nextStep: () => {
      const { progress } = get();
      const currentIndex = ONBOARDING_STEPS.indexOf(progress.currentStep);
      const nextIndex = currentIndex + 1;
      
      if (nextIndex < ONBOARDING_STEPS.length) {
        const nextStep = ONBOARDING_STEPS[nextIndex];
        get().setCurrentStep(nextStep);
      }
    },

    previousStep: () => {
      const { progress } = get();
      const currentIndex = ONBOARDING_STEPS.indexOf(progress.currentStep);
      const prevIndex = currentIndex - 1;
      
      if (prevIndex >= 0) {
        const prevStep = ONBOARDING_STEPS[prevIndex];
        get().setCurrentStep(prevStep);
      }
    },

    goToStep: (step: OnboardingStep) => {
      get().setCurrentStep(step);
    },

    // Progress Management
    markStepComplete: (step: OnboardingStep) => {
      set((state) => {
        const completedSteps = state.progress.completedSteps.includes(step)
          ? state.progress.completedSteps
          : [...state.progress.completedSteps, step];

        const isCompleted = completedSteps.length === ONBOARDING_STEPS.length;

        return {
          progress: {
            ...state.progress,
            completedSteps,
            isCompleted,
          },
        };
      });
    },

    markStepIncomplete: (step: OnboardingStep) => {
      set((state) => ({
        progress: {
          ...state.progress,
          completedSteps: state.progress.completedSteps.filter((s) => s !== step),
          isCompleted: false,
        },
      }));
    },

    // User Preferences
    setUserType: (userType: 'farmer' | 'buyer') => {
      set((state) => ({
        preferences: {
          ...state.preferences,
          userType,
        },
      }));
    },

    setWalletInfo: (hasWallet: boolean, walletType?: string) => {
      set((state) => ({
        preferences: {
          ...state.preferences,
          hasWallet,
          walletType: walletType as 'freighter' | 'albedo' | 'other' | null,
        },
      }));
    },

    setSkipTour: (skip: boolean) => {
      set((state) => ({
        preferences: {
          ...state.preferences,
          skipTour: skip,
        },
      }));
    },

    setLanguage: (language: string) => {
      set((state) => ({
        preferences: {
          ...state.preferences,
          language,
        },
      }));
    },

    // State Management
    setLoading: (loading: boolean) => {
      set({ isLoading: loading });
    },

    setError: (error: string | null) => {
      set({ error });
    },

    resetProgress: () => {
      set({
        progress: {
          currentStep: 'welcome',
          completedSteps: [],
          totalSteps: ONBOARDING_STEPS.length,
          isCompleted: false,
        },
        preferences: {
          userType: null,
          hasWallet: false,
          walletType: null,
          skipTour: false,
          language: 'en',
        },
        isLoading: false,
        error: null,
        isSkipped: false,
        lastActiveStep: 'welcome',
      });
    },

    // Onboarding Flow
    skipOnboarding: () => {
      set({ isSkipped: true });
    },

    completeOnboarding: () => {
      set((state) => ({
        progress: {
          ...state.progress,
          isCompleted: true,
        },
      }));
    },

    // Persistence
    saveProgress: () => {
      // Zustand persist  handles this automatically
      if (typeof window !== 'undefined') {
        const state = get();
        localStorage.setItem('onboarding-progress', JSON.stringify(state));
      }
    },

    loadProgress: () => {
      try {
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('onboarding-progress');
          if (saved) {
            const parsed = JSON.parse(saved);
            set(parsed);
          }
        }
      } catch (error) {
        console.error('Failed to load onboarding progress:', error);
      }
    },
  })
);

export type { OnboardingState, OnboardingActions } from './types'; 