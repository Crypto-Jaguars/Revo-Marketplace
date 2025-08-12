'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store';

export default function TestPage() {
  const [isClient, setIsClient] = useState(false);
  const store = useStore();
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4"> Store Test</h1>
      <div className="space-y-2">
        <p><strong>Current Step:</strong> {store.progress.currentStep}</p>
        <p><strong>Total Steps:</strong> {store.progress.totalSteps}</p>
        <p><strong>Is Completed:</strong> {store.progress.isCompleted ? 'Yes' : 'No'}</p>
        <p><strong>Is Skipped:</strong> {store.isSkipped ? 'Yes' : 'No'}</p>
        <p><strong>User Type:</strong> {store.preferences.userType || 'Not set'}</p>
        <p><strong>Has Wallet:</strong> {store.preferences.hasWallet ? 'Yes' : 'No'}</p>
      </div>
      
      <div className="mt-4 space-x-2">
        <button 
          onClick={() => store.nextStep()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Step
        </button>
        <button 
          onClick={() => store.previousStep()}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Previous Step
        </button>
        <button 
          onClick={() => store.resetProgress()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
} 