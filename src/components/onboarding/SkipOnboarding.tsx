'use client';

import React, { useState } from 'react';
import { useOnboardingStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';

export const SkipOnboarding: React.FC = () => {
  const { skipOnboarding } = useOnboardingStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSkip = () => {
    skipOnboarding();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm px-2 sm:px-3"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="truncate">Skip Onboarding</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Skip Onboarding?</DialogTitle>
          <DialogDescription className="text-sm">
            Are you sure you want to skip the onboarding process? You can always access it later from your account settings.
          </DialogDescription>
        </DialogHeader>
        <div className="py-3 sm:py-4">
          <p className="text-sm text-gray-600">
            The onboarding will help you:
          </p>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• Set up your Stellar wallet</li>
            <li>• Choose your user type (farmer or buyer)</li>
            <li>• Learn about key platform features</li>
            <li>• Complete account verification</li>
          </ul>
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:space-x-2 sm:space-y-0">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto"
          >
            Continue Onboarding
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleSkip}
            className="w-full sm:w-auto"
          >
            Skip Anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};