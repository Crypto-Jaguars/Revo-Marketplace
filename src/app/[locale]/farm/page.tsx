'use client';

import { useTranslations } from 'next-intl';
import WeatherWidget from '@/components/farm/WeatherWidget';
import Breadcrumb from '@/components/shared/Breadcrumb';

const mockLocation = {
  latitude: 51.5074,
  longitude: -0.1278,
  address: '123 Farm Road',
  city: 'London',
  state: 'England',
  country: 'UK',
};

export default function FarmPage() {
  const t = useTranslations('Farm');

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('breadcrumb.dashboard'), href: '', isCurrent: true }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Weather Widget */}
        <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t('weather.title')}</h2>
          <WeatherWidget location={mockLocation} />
        </div>

        {/* Farm Stats */}
        <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t('stats.title')}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('stats.totalCrops')}</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('stats.activeFields')}</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('stats.harvestReady')}</span>
              <span className="font-semibold text-green-600">3</span>
            </div>
          </div>
        </div>

        {/* Tasks Overview */}
        <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t('tasks.title')}</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-gray-600">{t('tasks.checkIrrigation')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-gray-600">{t('tasks.harvestTomatoes')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
              <span className="text-gray-600">{t('tasks.applyFertilizer')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">{t('activity.title')}</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium">{t('activity.irrigation.title')}</p>
              <p className="text-sm text-gray-500">{t('activity.irrigation.description')}</p>
            </div>
            <span className="text-sm text-gray-500">{t('activity.irrigation.time')}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium">{t('activity.fertilizer.title')}</p>
              <p className="text-sm text-gray-500">{t('activity.fertilizer.description')}</p>
            </div>
            <span className="text-sm text-gray-500">{t('activity.fertilizer.time')}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('activity.harvest.title')}</p>
              <p className="text-sm text-gray-500">{t('activity.harvest.description')}</p>
            </div>
            <span className="text-sm text-gray-500">{t('activity.harvest.time')}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 