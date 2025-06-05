
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Coffee, 
  Sun, 
  Sunset, 
  Moon,
  Bell,
  TrendingUp,
  Calendar,
  Target
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const MealTimingPage = () => {
  const { t } = useRTL();
  const [selectedPlan, setSelectedPlan] = useState('16:8');

  const intermittentFastingPlans = [
    {
      id: '16:8',
      name: '16:8 Method',
      description: 'Fast for 16 hours, eat within 8 hours',
      fastingHours: 16,
      eatingWindow: 8,
      recommended: true
    },
    {
      id: '14:10',
      name: '14:10 Method',
      description: 'Fast for 14 hours, eat within 10 hours',
      fastingHours: 14,
      eatingWindow: 10,
      recommended: false
    },
    {
      id: '18:6',
      name: '18:6 Method',
      description: 'Fast for 18 hours, eat within 6 hours',
      fastingHours: 18,
      eatingWindow: 6,
      recommended: false
    },
    {
      id: '20:4',
      name: '20:4 Method',
      description: 'Fast for 20 hours, eat within 4 hours',
      fastingHours: 20,
      eatingWindow: 4,
      recommended: false
    }
  ];

  const mealSchedule = {
    '16:8': [
      { name: 'First Meal', time: '12:00 PM', icon: <Sun className="h-4 w-4" />, type: 'lunch' },
      { name: 'Snack', time: '3:00 PM', icon: <Coffee className="h-4 w-4" />, type: 'snack' },
      { name: 'Last Meal', time: '7:00 PM', icon: <Sunset className="h-4 w-4" />, type: 'dinner' }
    ],
    '14:10': [
      { name: 'First Meal', time: '10:00 AM', icon: <Coffee className="h-4 w-4" />, type: 'breakfast' },
      { name: 'Lunch', time: '1:00 PM', icon: <Sun className="h-4 w-4" />, type: 'lunch' },
      { name: 'Snack', time: '4:00 PM', icon: <Coffee className="h-4 w-4" />, type: 'snack' },
      { name: 'Last Meal', time: '7:00 PM', icon: <Sunset className="h-4 w-4" />, type: 'dinner' }
    ],
    '18:6': [
      { name: 'First Meal', time: '2:00 PM', icon: <Sun className="h-4 w-4" />, type: 'lunch' },
      { name: 'Last Meal', time: '7:00 PM', icon: <Sunset className="h-4 w-4" />, type: 'dinner' }
    ],
    '20:4': [
      { name: 'Main Meal', time: '6:00 PM', icon: <Sunset className="h-4 w-4" />, type: 'dinner' }
    ]
  };

  const currentStatus = {
    currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    fastingStatus: 'Eating Window',
    timeLeft: '4h 23m',
    nextMeal: 'Dinner at 7:00 PM'
  };

  const weeklyProgress = [
    { day: 'Mon', completed: true, hours: 16 },
    { day: 'Tue', completed: true, hours: 16 },
    { day: 'Wed', completed: false, hours: 12 },
    { day: 'Thu', completed: true, hours: 16 },
    { day: 'Fri', completed: true, hours: 16 },
    { day: 'Sat', completed: false, hours: 0 },
    { day: 'Sun', completed: true, hours: 16 }
  ];

  return (
    <PageContainer header={{ title: t('Meal Timing', 'توقيت الوجبات'), showBackButton: true }}>
      <div className="space-y-6 pb-20">
        {/* Current Status */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{currentStatus.fastingStatus}</h2>
              <p className="text-blue-100 mb-4">{currentStatus.timeLeft} remaining</p>
              <div className="flex items-center justify-center space-x-4">
                <Clock className="h-5 w-5" />
                <span>{currentStatus.currentTime}</span>
              </div>
              <p className="text-sm text-blue-100 mt-2">{currentStatus.nextMeal}</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">{t('Schedule', 'الجدول')}</TabsTrigger>
            <TabsTrigger value="plans">{t('Plans', 'الخطط')}</TabsTrigger>
            <TabsTrigger value="progress">{t('Progress', 'التقدم')}</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t('Today\'s Meal Schedule', 'جدول وجبات اليوم')} ({selectedPlan})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mealSchedule[selectedPlan as keyof typeof mealSchedule].map((meal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {meal.icon}
                        <div>
                          <p className="font-medium">{meal.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{meal.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{meal.time}</p>
                        <Badge variant="outline" className="text-xs">
                          <Bell className="h-3 w-3 mr-1" />
                          Reminder
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('Fasting Timer', 'مؤقت الصيام')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={340}
                        strokeDashoffset={100}
                        className="text-blue-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold">4:23</p>
                        <p className="text-xs text-gray-600">remaining</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    {t('End Fast Early', 'إنهاء الصيام مبكرًا')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-4">
            <div className="grid gap-4">
              {intermittentFastingPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`cursor-pointer transition-all ${
                    selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{plan.name}</h3>
                          {plan.recommended && (
                            <Badge className="bg-green-500">
                              {t('Recommended', 'موصى به')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {plan.description}
                        </p>
                        <div className="flex space-x-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-red-500">{plan.fastingHours}h</p>
                            <p className="text-xs text-gray-600">{t('Fasting', 'صيام')}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-500">{plan.eatingWindow}h</p>
                            <p className="text-xs text-gray-600">{t('Eating', 'تناول الطعام')}</p>
                          </div>
                        </div>
                      </div>
                      {selectedPlan === plan.id && (
                        <div className="ml-4">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {t('Weekly Progress', 'التقدم الأسبوعي')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xs text-gray-600 mb-2">{day.day}</p>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                        day.completed 
                          ? 'bg-green-500 text-white' 
                          : day.hours > 0 
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600'
                      }`}>
                        {day.hours}h
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t('Success Rate', 'معدل النجاح')}</span>
                    <span className="font-semibold">71%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t('Average Fasting Hours', 'متوسط ساعات الصيام')}</span>
                    <span className="font-semibold">14.2h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t('Longest Streak', 'أطول سلسلة')}</span>
                    <span className="font-semibold">5 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('This Month\'s Goals', 'أهداف هذا الشهر')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{t('Complete 20 fasts', 'إكمال 20 صيام')}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">15/20</p>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{t('Average 16+ hours', 'متوسط 16+ ساعة')}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">14.2h</p>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
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

export default MealTimingPage;
