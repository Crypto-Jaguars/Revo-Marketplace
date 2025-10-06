'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Droplets, Thermometer, Plus, FileText, CheckCircle } from 'lucide-react';

// Mock data for farming activities
const farmingActivities = [
  {
    id: 1,
    title: 'Tomato Harvest - Field A',
    type: 'harvest',
    status: 'completed',
    date: '2024-01-15',
    location: 'Field A - North Section',
    yield: '2,450 kg',
    quality: 'Grade A',
    weather: 'Sunny, 24°C',
    notes: 'Excellent harvest quality, minimal pest damage',
  },
  {
    id: 2,
    title: 'Irrigation System Check',
    type: 'maintenance',
    status: 'in_progress',
    date: '2024-01-14',
    location: 'All Fields',
    progress: 65,
    weather: 'Partly cloudy, 22°C',
    notes: 'Checking all irrigation lines and sensors',
  },
  {
    id: 3,
    title: 'Organic Fertilizer Application',
    type: 'treatment',
    status: 'scheduled',
    date: '2024-01-16',
    location: 'Field B - South Section',
    weather: 'Expected: Sunny, 26°C',
    notes: 'Apply organic compost to improve soil health',
  },
  {
    id: 4,
    title: 'Pest Control Inspection',
    type: 'inspection',
    status: 'completed',
    date: '2024-01-13',
    location: 'Field C - East Section',
    findings: 'Low pest activity, no treatment needed',
    weather: 'Overcast, 20°C',
  },
  {
    id: 5,
    title: 'Seed Planting - Winter Crops',
    type: 'planting',
    status: 'completed',
    date: '2024-01-12',
    location: 'Field D - West Section',
    quantity: '500 kg seeds',
    variety: 'Winter Wheat',
    weather: 'Light rain, 18°C',
  },
];

// Mock data for escrow contracts
const escrowContracts = [
  {
    id: 1,
    title: 'Organic Tomato Supply Contract',
    buyer: 'Fresh Market Co.',
    amount: '15,000 XLM',
    quantity: '5,000 kg',
    deliveryDate: '2024-02-15',
    status: 'active',
    progress: 75,
    terms: 'Grade A organic tomatoes, USDA certified',
  },
  {
    id: 2,
    title: 'Seasonal Vegetable Agreement',
    buyer: 'Green Grocers Ltd.',
    amount: '8,500 XLM',
    quantity: 'Mixed vegetables',
    deliveryDate: '2024-01-30',
    status: 'pending',
    progress: 25,
    terms: 'Seasonal mix of organic vegetables',
  },
  {
    id: 3,
    title: 'Premium Herb Contract',
    buyer: 'Gourmet Restaurants',
    amount: '3,200 XLM',
    quantity: '200 kg',
    deliveryDate: '2024-01-25',
    status: 'completed',
    progress: 100,
    terms: 'Fresh basil, oregano, and thyme',
  },
  {
    id: 4,
    title: 'Bulk Grain Supply',
    buyer: 'Regional Food Coop',
    amount: '22,000 XLM',
    quantity: '10,000 kg',
    deliveryDate: '2024-03-01',
    status: 'draft',
    progress: 10,
    terms: 'Organic wheat and barley mix',
  },
];

export function FarmingActivity() {
  const t = useTranslations('FarmingActivity');
  const [activeTab, setActiveTab] = useState('activities');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'harvest':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'maintenance':
        return <Droplets className="h-5 w-5 text-blue-600" />;
      case 'treatment':
        return <Thermometer className="h-5 w-5 text-orange-600" />;
      case 'inspection':
        return <FileText className="h-5 w-5 text-purple-600" />;
      case 'planting':
        return <Plus className="h-5 w-5 text-green-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">{t('status.completed')}</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">{t('status.inProgress')}</Badge>;
      case 'scheduled':
        return <Badge className="bg-yellow-100 text-yellow-800">{t('status.scheduled')}</Badge>;
      case 'active':
        return <Badge className="bg-green-100 text-green-800">{t('status.active')}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">{t('status.pending')}</Badge>;
      case 'draft':
        return <Badge variant="secondary">{t('status.draft')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="activities">{t('tabs.activities')}</TabsTrigger>
            <TabsTrigger value="contracts">{t('tabs.contracts')}</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t('activities.title')}</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {t('activities.addActivity')}
              </Button>
            </div>

            {/* Scrollable Activities List */}
            <div className="max-h-80 overflow-y-auto space-y-4">
              {farmingActivities.map((activity) => (
                <div key={activity.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <h4 className="font-medium">{activity.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(activity.date)}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {activity.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>

                  {activity.status === 'in_progress' && activity.progress && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('activities.labels.progress')}</span>
                        <span>{activity.progress}%</span>
                      </div>
                      <Progress value={activity.progress} className="h-2" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {activity.yield && (
                      <div>
                        <span className="font-medium">{t('activities.labels.yield')}: </span>
                        <span>{activity.yield}</span>
                      </div>
                    )}
                    {activity.quality && (
                      <div>
                        <span className="font-medium">{t('activities.labels.quality')}: </span>
                        <span>{activity.quality}</span>
                      </div>
                    )}
                    {activity.quantity && (
                      <div>
                        <span className="font-medium">{t('activities.labels.quantity')}: </span>
                        <span>{activity.quantity}</span>
                      </div>
                    )}
                    {activity.variety && (
                      <div>
                        <span className="font-medium">{t('activities.labels.variety')}: </span>
                        <span>{activity.variety}</span>
                      </div>
                    )}
                    {activity.findings && (
                      <div className="md:col-span-2">
                        <span className="font-medium">{t('activities.labels.findings')}: </span>
                        <span>{activity.findings}</span>
                      </div>
                    )}
                  </div>

                  {activity.weather && (
                    <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                      <span className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-blue-600" />
                        {activity.weather}
                      </span>
                    </div>
                  )}

                  {activity.notes && (
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium">{t('activities.labels.notes')}: </span>
                      {activity.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t('contracts.title')}</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {t('contracts.newContract')}
              </Button>
            </div>

            {/* Scrollable Contracts List */}
            <div className="max-h-80 overflow-y-auto space-y-4">
              {escrowContracts.map((contract) => (
                <div key={contract.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{contract.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{t('contracts.buyer')}: {contract.buyer}</p>
                    </div>
                    {getStatusBadge(contract.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="font-medium">{t('contracts.labels.amount')}: </span>
                      <span className="text-green-600">{contract.amount}</span>
                    </div>
                    <div>
                      <span className="font-medium">{t('contracts.labels.quantity')}: </span>
                      <span>{contract.quantity}</span>
                    </div>
                    <div>
                      <span className="font-medium">{t('contracts.labels.delivery')}: </span>
                      <span>{formatDate(contract.deliveryDate)}</span>
                    </div>
                    <div>
                      <span className="font-medium">{t('contracts.labels.progress')}: </span>
                      <span>{contract.progress}%</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <Progress value={contract.progress} className="h-2" />
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{t('contracts.labels.terms')}: </span>
                    {contract.terms}
                  </div>

                  <div className="flex justify-end space-x-2 mt-3">
                    <Button variant="outline" size="sm">
                      {t('contracts.actions.viewDetails')}
                    </Button>
                    {contract.status === 'draft' && <Button size="sm">{t('contracts.actions.activateContract')}</Button>}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
