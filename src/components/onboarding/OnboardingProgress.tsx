
'use client';

import React from 'react';
import { useOnboardingStore } from '@/store';
import { Check, Circle } from 'lucide-react';
import type { OnboardingStep } from '@/store/slices/onboarding/types';

export const OnboardingProgress: React.FC = () => {
  const { progress } = useOnboardingStore();
  
  const steps = [
    { key: 'welcome', label: 'Welcome', shortLabel: 'Start', icon: Circle },
    { key: 'wallet-setup', label: 'Wallet Setup', shortLabel: 'Wallet', icon: Circle },
    { key: 'user-type', label: 'User Type', shortLabel: 'Type', icon: Circle },
    { key: 'tour', label: 'Feature Tour', shortLabel: 'Tour', icon: Circle },
    { key: 'verification', label: 'Verification', shortLabel: 'Verify', icon: Circle },
    { key: 'complete', label: 'Complete', shortLabel: 'Done', icon: Circle },
  ];

  const getStepStatus = (stepKey: string) => {
    if (progress.completedSteps.includes(stepKey as OnboardingStep)) {
      return 'completed';
    }
    if (progress.currentStep === stepKey) {
      return 'current';
    }
    return 'pending';
  };

  const currentStepIndex = steps.findIndex(step => step.key === progress.currentStep);

  return (
    <div className="mt-4 lg:mt-6">
      {/* Mobile: Horizontal scroll progress */}
      <div className="sm:hidden">
        <div className="overflow-x-auto pb-2">
          <div className="flex items-center min-w-max px-2">
            {steps.map((step, index) => {
              const status = getStepStatus(step.key);
              const isCompleted = status === 'completed';
              const isCurrent = status === 'current';
              
              return (
                <div key={step.key} className="flex items-center flex-shrink-0">
                  {/* Step Circle */}
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-blue-500 text-white ring-2 ring-blue-100'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <span className="text-xs font-medium">
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mx-1 transition-colors duration-200 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Mobile: Current step indicator */}
        <div className="text-center mt-2">
          <div className="text-xs font-medium text-gray-700">
            {steps[currentStepIndex]?.shortLabel || 'Step'}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {currentStepIndex + 1} of {progress.totalSteps}
          </div>
        </div>
      </div>

      {/* Tablet: Compact horizontal layout */}
      <div className="hidden sm:block lg:hidden">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const status = getStepStatus(step.key);
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';
            
            return (
              <div key={step.key} className="flex items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-blue-500 text-white ring-3 ring-blue-100'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-xs font-medium">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  
                  {/* Step Short Label */}
                  <div className="mt-1">
                    <span
                      className={`text-xs font-medium transition-colors duration-200 ${
                        isCompleted
                          ? 'text-green-600'
                          : isCurrent
                          ? 'text-blue-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.shortLabel}
                    </span>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-2 transition-colors duration-200 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Tablet: Progress Text */}
        <div className="mt-3 text-center">
          <span className="text-sm text-gray-500">
            Step {currentStepIndex + 1} of {progress.totalSteps}
          </span>
        </div>
      </div>

      {/* Desktop: Full horizontal layout */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const status = getStepStatus(step.key);
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';
            
            return (
              <div key={step.key} className="flex items-center flex-1">
                <div className="flex items-center">
                  {/* Step Circle */}
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isCompleted
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                          : isCurrent
                          ? 'bg-blue-500 text-white ring-4 ring-blue-100 shadow-lg shadow-blue-500/25'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-sm font-medium">
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Step Label */}
                  <div className="ml-3">
                    <span
                      className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                        isCompleted
                          ? 'text-green-600'
                          : isCurrent
                          ? 'text-blue-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div
                      className={`h-0.5 w-full transition-colors duration-200 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Desktop: Progress Text */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-500">
            Step {currentStepIndex + 1} of {progress.totalSteps}
          </span>
          <div className="mt-1">
            <span className="text-xs text-gray-400">
              {progress.completedSteps.length} of {progress.totalSteps} steps completed
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-2 max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-1 rounded-full transition-all duration-300 ease-out"
                style={{ 
                  width: `${((progress.completedSteps.length + (currentStepIndex >= 0 ? 0.5 : 0)) / progress.totalSteps) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ultra-wide screens: Enhanced layout */}
      <div className="hidden 2xl:block mt-2">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              {steps[currentStepIndex]?.label} in progress
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};