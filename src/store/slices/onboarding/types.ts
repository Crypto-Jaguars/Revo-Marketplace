export type OnboardingStep = 
  | 'welcome'
  | 'wallet-setup'
  | 'user-type'
  | 'tour'
  | 'verification'
  | 'complete';

export interface OnboardingProgress {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  totalSteps: number;
  isCompleted: boolean;
}

export interface UserPreferences {
  userType: 'farmer' | 'buyer' | null;
  hasWallet: boolean;
  walletType: 'freighter' | 'albedo' | 'other' | null;
  skipTour: boolean;
  language: string;
}

export interface OnboardingState {
  progress: OnboardingProgress;
  preferences: UserPreferences;
  isLoading: boolean;
  error: string | null;
  isSkipped: boolean;
  lastActiveStep: OnboardingStep;
}

export interface OnboardingActions {
  // Step Navigation
  setCurrentStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  
  // Progress Management
  markStepComplete: (step: OnboardingStep) => void;
  markStepIncomplete: (step: OnboardingStep) => void;
  resetProgress: () => void;
  
  // User Preferences
  setUserType: (userType: 'farmer' | 'buyer') => void;
  setWalletInfo: (hasWallet: boolean, walletType?: string) => void;
  setSkipTour: (skip: boolean) => void;
  setLanguage: (language: string) => void;
  
  // State Management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  skipOnboarding: () => void;
  completeOnboarding: () => void;
  
  // Persistence
  saveProgress: () => void;
  loadProgress: () => void;
} 