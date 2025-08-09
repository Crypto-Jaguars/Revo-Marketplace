export interface FarmerSubscriptionState {
  currentStep: 1 | 2 | 3;
  data: {
    fullName: string;
    email: string;
    phone: string;
    farmName: string;
    location: {
      city: string;
      state: string;
      country: string;
    };
    productTypes: string[];
    farmingMethod: 'organic' | 'conventional' | 'hydroponic' | 'other';
    password: string;
    agreeToTerms: boolean;
    website?: string; // honeypot
  };
  isSaving: boolean;
  lastSavedAt?: number;
}

export interface FarmerSubscriptionActions {
  setStep: (step: 1 | 2 | 3) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (patch: Partial<FarmerSubscriptionState['data']>) => void;
  setSaving: (saving: boolean) => void;
  markSaved: () => void;
  reset: () => void;
}


