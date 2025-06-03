
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MicronutrientTracker } from '@/components/ai/MicronutrientTracker';
import { BMICalculator } from '@/components/health/BMICalculator';
import { NutritionGoalSetting } from '@/components/health/NutritionGoalSetting';
import { ProgressVisualization } from '@/components/health/ProgressVisualization';
import { Activity, Heart, TrendingUp, Target, Calculator, Zap, BarChart3 } from 'lucide-react';

const HealthTrackingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <PageContainer header={{ title: 'Health & Wellness', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="text-center">
          <Activity className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Health & Wellness Hub</h1>
          <p className="text-gray-600">Comprehensive nutrition tracking and health insights</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="micronutrients" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
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
            <TabsTrigger value="bmi" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">BMI</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Today's Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Calories</span>
                      <span className="font-bold">1,850 / 2,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein</span>
                      <span className="font-bold">95g / 150g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Water</span>
                      <span className="font-bold">6 / 8 glasses</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Steps</span>
                      <span className="font-bold">8,420 / 10,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Goal Achievement</span>
                      <span className="font-bold text-green-600">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight Change</span>
                      <span className="font-bold text-blue-600">-0.7kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Streak</span>
                      <span className="font-bold text-orange-600">12 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <button className="w-full p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      Log a meal
                    </button>
                    <button className="w-full p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      Add water intake
                    </button>
                    <button className="w-full p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      Record weight
                    </button>
                    <button className="w-full p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      Check deficiencies
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="micronutrients" className="mt-6">
            <MicronutrientTracker />
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <NutritionGoalSetting />
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <ProgressVisualization />
          </TabsContent>

          <TabsContent value="bmi" className="mt-6">
            <BMICalculator />
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-wasfah-bright-teal" />
                  AI Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800">Vitamin D Alert</h3>
                    <p className="text-blue-700 mt-1">Your vitamin D intake is below recommended levels. Consider adding salmon, fortified milk, or supplements.</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-800">Great Progress!</h3>
                    <p className="text-green-700 mt-1">You've maintained consistent protein intake this week. This supports your fitness goals.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-semibold text-yellow-800">Hydration Reminder</h3>
                    <p className="text-yellow-700 mt-1">You've been slightly under your water goal. Try setting hourly reminders to improve hydration.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default HealthTrackingPage;
