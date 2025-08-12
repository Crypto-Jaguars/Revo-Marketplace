
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useOnboardingStore } from '@/store';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { FeatureTour } from '@/components/onboarding/FeatureTour';
import { WelcomeStep } from '@/components/onboarding/WelcomeStep';
import { WalletSetupStep } from '@/components/onboarding/WalletSetupStep';
import { OnboardingComplete } from '@/components/onboarding/OnboardingComplete';
import { AccountVerification } from '@/components/onboarding/AccountVerification';
import { UserTypeSelection } from '@/components/onboarding/UserTypeSelection';
import type { OnboardingStep } from '@/store';


const validSteps = ['welcome', 'wallet-setup', 'user-type', 'tour', 'verification', 'complete'];

export default function OnboardingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { 
    progress, 
    isSkipped, 
    loadProgress, 
    completeOnboarding,
    setCurrentStep 
  } = useOnboardingStore();

  // Initialize client state
  useEffect(() => {
    setIsClient(true);
    loadProgress();
  }, [loadProgress]);

  // Handle initial step setup and URL synchronization
// Replace the problematic useEffect in your onboarding page with this:

useEffect(() => {
  if (!isClient || isInitialized) return;

  const stepFromUrl = searchParams.get('step');
  const currentStoreStep = progress.currentStep;

  if (stepFromUrl && validSteps.includes(stepFromUrl)) {
    // URL has valid step - sync store with URL
    if (stepFromUrl !== currentStoreStep) {
      setCurrentStep(stepFromUrl as OnboardingStep); // Add type assertion
    }
    setIsInitialized(true);
  } else if (currentStoreStep && validSteps.includes(currentStoreStep)) {
    // Store has valid step - sync URL with store
    const locale = pathname.split('/')[1] || 'en';
    router.replace(`/${locale}/onboarding?step=${currentStoreStep}`, { scroll: false });
    setIsInitialized(true);
  } else {
    // Neither URL nor store has valid step - default to welcome
    const locale = pathname.split('/')[1] || 'en';
    setCurrentStep('welcome' as OnboardingStep); // Add type assertion
    router.replace(`/${locale}/onboarding?step=welcome`, { scroll: false });
    setIsInitialized(true);
  }
}, [isClient, searchParams, progress.currentStep, pathname, router, setCurrentStep, isInitialized]);

  // Handle step changes from store (when user navigates via UI)
  useEffect(() => {
    if (!isClient || !isInitialized) return;
    
    const stepFromUrl = searchParams.get('step');
    const currentStep = progress.currentStep;
    
    if (currentStep && stepFromUrl !== currentStep && validSteps.includes(currentStep)) {
      const locale = pathname.split('/')[1] || 'en';
      router.replace(`/${locale}/onboarding?step=${currentStep}`, { scroll: false });
    }
  }, [progress.currentStep, isClient, isInitialized, router, searchParams, pathname]);

  // Handle completion/skip redirect
  useEffect(() => {
    if ((isSkipped || progress.isCompleted) && isInitialized) {
      const locale = pathname.split('/')[1] || 'en';
      router.push(`/${locale}/`);
    }
  }, [isSkipped, progress.isCompleted, router, pathname, isInitialized]);

  // Show loading until client-side hydration and initialization
  if (!isClient || !isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const renderCurrentStep = () => {
    const currentStep = progress.currentStep || 'welcome';
    
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep />;
      case 'wallet-setup':
        return <WalletSetupStep />;
      case 'user-type':
        return <UserTypeSelection />;
      case 'tour':
        return <FeatureTour />;
      case 'verification':
        return <AccountVerification />;
      case 'complete':
        return <OnboardingComplete onComplete={completeOnboarding} />;
      default:
        return <WelcomeStep />;
    }
  };

  // Don't render if redirecting
  if (isSkipped || progress.isCompleted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <OnboardingLayout>
      {renderCurrentStep()}
    </OnboardingLayout>
  );
}