
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MicronutrientTracker } from '@/components/ai/MicronutrientTracker';
import { Activity, Heart, TrendingUp, Target, Calendar, BarChart3 } from 'lucide-react';

const HealthTrackingPage = () => {
  const [activeTab, setActiveTab] = useState('micronutrients');

  return (
    <PageContainer header={{ title: 'Health Tracking', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="text-center">
          <Activity className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Health & Wellness</h1>
          <p className="text-gray-600">Track your nutrition and optimize your health</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="micronutrients" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Nutrients</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Goals</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="micronutrients" className="mt-6">
            <MicronutrientTracker />
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-wasfah-bright-teal" />
                  Nutrition Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Set and track your personal nutrition goals. This feature will be available soon!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-wasfah-bright-teal" />
                  Progress Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Monitor your health progress over time. This feature will be available soon!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-wasfah-bright-teal" />
                  Health Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Generate detailed health and nutrition reports. This feature will be available soon!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default HealthTrackingPage;
