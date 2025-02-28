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
        <section 
          className="col-span-1 bg-white rounded-lg shadow-md p-6"
          aria-labelledby="weather-title"
        >
          <h2 id="weather-title" className="text-xl font-semibold mb-4">{t('weather.title')}</h2>
          <WeatherWidget location={mockLocation} />
        </section>

        {/* Farm Stats */}
        <section 
          className="col-span-1 bg-white rounded-lg shadow-md p-6"
          aria-labelledby="stats-title"
        >
          <h2 id="stats-title" className="text-xl font-semibold mb-4">{t('stats.title')}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center" role="group" aria-label={t('stats.totalCrops')}>
              <span className="text-gray-600">{t('stats.totalCrops')}</span>
              <span className="font-semibold" aria-label={`24 ${t('stats.totalCrops')}`}>24</span>
            </div>
            <div className="flex justify-between items-center" role="group" aria-label={t('stats.activeFields')}>
              <span className="text-gray-600">{t('stats.activeFields')}</span>
              <span className="font-semibold" aria-label={`8 ${t('stats.activeFields')}`}>8</span>
            </div>
            <div className="flex justify-between items-center" role="group" aria-label={t('stats.harvestReady')}>
              <span className="text-gray-600">{t('stats.harvestReady')}</span>
              <span className="font-semibold text-green-600" aria-label={`3 ${t('stats.harvestReady')}`}>3</span>
            </div>
          </div>
        </section>

        {/* Tasks Overview */}
        <section 
          className="col-span-1 bg-white rounded-lg shadow-md p-6"
          aria-labelledby="tasks-title"
        >
          <h2 id="tasks-title" className="text-xl font-semibold mb-4">{t('tasks.title')}</h2>
          <ul className="space-y-3" role="list">
            <li className="flex items-center" role="listitem">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2" aria-hidden="true"></div>
              <span className="text-gray-600">{t('tasks.checkIrrigation')}</span>
            </li>
            <li className="flex items-center" role="listitem">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2" aria-hidden="true"></div>
              <span className="text-gray-600">{t('tasks.harvestTomatoes')}</span>
            </li>
            <li className="flex items-center" role="listitem">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2" aria-hidden="true"></div>
              <span className="text-gray-600">{t('tasks.applyFertilizer')}</span>
            </li>
          </ul>
        </section>
      </div>

      {/* Recent Activity */}
      <section 
        className="mt-8 bg-white rounded-lg shadow-md p-6"
        aria-labelledby="activity-title"
      >
        <h2 id="activity-title" className="text-xl font-semibold mb-4">{t('activity.title')}</h2>
        <ul className="space-y-4" role="list">
          <li className="flex items-center justify-between border-b pb-4" role="listitem">
            <div>
              <p className="font-medium">{t('activity.irrigation.title')}</p>
              <p className="text-sm text-gray-500">{t('activity.irrigation.description')}</p>
            </div>
            <time className="text-sm text-gray-500">{t('activity.irrigation.time')}</time>
          </li>
          <li className="flex items-center justify-between border-b pb-4" role="listitem">
            <div>
              <p className="font-medium">{t('activity.fertilizer.title')}</p>
              <p className="text-sm text-gray-500">{t('activity.fertilizer.description')}</p>
            </div>
            <time className="text-sm text-gray-500">{t('activity.fertilizer.time')}</time>
          </li>
          <li className="flex items-center justify-between" role="listitem">
            <div>
              <p className="font-medium">{t('activity.harvest.title')}</p>
              <p className="text-sm text-gray-500">{t('activity.harvest.description')}</p>
            </div>
            <time className="text-sm text-gray-500">{t('activity.harvest.time')}</time>
          </li>
        </ul>
      </section>
    </div>
  );
} 