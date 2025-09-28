'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Bounded from '@/components/Bounded';
import FarmDataSection from '@/components/farm/FarmDataSection';

interface FarmData {
  farmName: string;
  location: string;
  size: string;
  cultivationMethod: string;
}

export default function FarmDataDemoPage() {
  const [farmData, setFarmData] = useState<FarmData>({
    farmName: '',
    location: '',
    size: '',
    cultivationMethod: '',
  });

  const handleDataChange = (data: FarmData) => {
    setFarmData(data);
    console.log('Farm data updated:', data);
  };

  const handleSubmit = (data: FarmData) => {
    toast.success('Farm data saved successfully!');
    console.log('Submitted farm data:', data);
  };

  return (
    <Bounded>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Farm Data Section Demo</h1>
          <p className="text-gray-300 text-lg">
            This is a demonstration of the Farm Data Section component with all required features.
          </p>
        </div>

        <div className="mb-8">
          <FarmDataSection
            onSubmit={handleSubmit}
            onDataChange={handleDataChange}
            className="bg-white/10 backdrop-blur-sm border-white/20"
          />
        </div>

        {/* Current Data Display */}
        <div className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Current Farm Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
            <div>
              <strong>Farm Name:</strong> {farmData.farmName || 'Not set'}
            </div>
            <div>
              <strong>Location:</strong> {farmData.location || 'Not set'}
            </div>
            <div>
              <strong>Size:</strong> {farmData.size ? `${farmData.size} hectares` : 'Not set'}
            </div>
            <div>
              <strong>Method:</strong> {farmData.cultivationMethod || 'Not set'}
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-3">✅ Implemented Features</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• 4 farm-specific fields (Name, Location, Size, Method)</li>
              <li>• Dropdown for cultivation method (Organic, Conventional, Mixed)</li>
              <li>• Location field with autocomplete suggestions</li>
              <li>• Numeric field validation for size</li>
              <li>• Responsive grid layout</li>
              <li>• Consistent design with app theme</li>
              <li>• Field-specific validation</li>
              <li>• Contextual help for users</li>
              <li>• Accessible form controls</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-3">🎯 Technical Requirements</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• TypeScript with proper typing</li>
              <li>• Radix UI Select component</li>
              <li>• Command component for autocomplete</li>
              <li>• Numeric validation with min/max</li>
              <li>• Error handling and display</li>
              <li>• Responsive design patterns</li>
              <li>• Consistent styling with TailwindCSS</li>
              <li>• Accessibility features</li>
            </ul>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
