import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useOnboardingStore } from '../index';

describe('Onboarding Store', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    const { result } = renderHook(() => useOnboardingStore());
    act(() => {
      result.current.resetProgress();
    });
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useOnboardingStore());
    
    expect(result.current.progress.currentStep).toBe('welcome');
    expect(result.current.progress.completedSteps).toEqual([]);
    expect(result.current.progress.totalSteps).toBe(6);
    expect(result.current.progress.isCompleted).toBe(false);
    expect(result.current.preferences.userType).toBe(null);
    expect(result.current.preferences.hasWallet).toBe(false);
    expect(result.current.isSkipped).toBe(false);
  });

  it('should navigate to next step correctly', () => {
    const { result } = renderHook(() => useOnboardingStore());
    
    act(() => {
      result.current.nextStep();
    });
    
    expect(result.current.progress.currentStep).toBe('wallet-setup');
  });

  it('should navigate to previous step correctly', () => {
    const { result } = renderHook(() => useOnboardingStore());
    
    // First go to next step
    act(() => {
      result.current.nextStep();
    });
    
    // Then go back
    act(() => {
      result.current.previousStep();
    });
    
    expect(result.current.progress.currentStep).toBe('welcome');
  });

  it('should mark steps as complete', () => {
    const { result } = renderHook(() => useOnboardingStore());
    
    act(() => {
      result.current.markStepComplete('welcome');
    });
    
    expect(result.current.progress.completedSteps).toContain('welcome');
  });

  it('should set user type correctly', () => {
    const { result } = renderHook(() => useOnboardingStore());
    
    act(() => {
      result.current.setUserType('farmer');
    });
    
    expect(result.current.preferences.userType).toBe('farmer');
    expect(result.current.progress.completedSteps).toContain('user-type');
  });

  it('should set wallet info correctly', () => {
    const { result } = renderHook(() => useOnboardingStore());
    
    act(() => {
      result.current.setWalletInfo(true, 'freighter');
    });
    
    expect(result.current.preferences.hasWallet).toBe(true);
    expect(result.current.preferences.walletType).toBe('freighter');
    expect(result.current.progress.completedSteps).toContain('wallet-setup');
  });

  it('should skip onboarding correctly', () => {
    const { result } = renderHook(() => useOnboardingStore());
    
    act(() => {
      result.current.skipOnboarding();
    });
    
    expect(result.current.isSkipped).toBe(true);
    expect(result.current.progress.isCompleted).toBe(true);
    expect(result.current.progress.currentStep).toBe('complete');
  });

  it('should complete onboarding correctly', () => {
    const { result } = renderHook(() => useOnboardingStore());
    
    act(() => {
      result.current.completeOnboarding();
    });
    
    expect(result.current.progress.isCompleted).toBe(true);
  });

  it('should go to specific step', () => {
    const { result } = renderHook(() => useOnboardingStore());
    
    act(() => {
      result.current.goToStep('verification');
    });
    
    expect(result.current.progress.currentStep).toBe('verification');
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => useOnboardingStore());
    
    act(() => {
      result.current.setLoading(true);
    });
    
    expect(result.current.isLoading).toBe(true);
  });

  it('should handle error state', () => {
    const { result } = renderHook(() => useOnboardingStore());
    
    act(() => {
      result.current.setError('Test error');
    });
    
    expect(result.current.error).toBe('Test error');
  });
}); 