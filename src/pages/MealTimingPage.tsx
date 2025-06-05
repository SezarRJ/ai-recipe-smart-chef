
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Clock, Sunrise, Sun, Sunset, Moon, Bell } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';

const MealTimingPage = () => {
  const { t } = useRTL();
  const { toast } = useToast();
  
  const [mealTimes, setMealTimes] = useState({
    breakfast: [7, 30], // 7:30 AM
    lunch: [12, 30],    // 12:30 PM
    dinner: [19, 0],    // 7:00 PM
    snack: [15, 30]     // 3:30 PM
  });

  const [notifications, setNotifications] = useState({
    breakfast: true,
    lunch: true,
    dinner: true,
    snack: false
  });

  const formatTime = (hours: number, minutes: number) => {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleTimeChange = (meal: string, value: number[]) => {
    const totalMinutes = value[0];
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setMealTimes(prev => ({
      ...prev,
      [meal]: [hours, minutes]
    }));
  };

  const getSliderValue = (hours: number, minutes: number) => {
    return hours * 60 + minutes;
  };

  const toggleNotification = (meal: string) => {
    setNotifications(prev => ({
      ...prev,
      [meal]: !prev[meal as keyof typeof prev]
    }));
  };

  const saveMealTiming = () => {
    toast({
      title: t('Meal Timing Saved', 'تم حفظ مواعيد الوجبات'),
      description: t('Your meal timing preferences have been updated', 'تم تحديث تفضيلات مواعيد وجباتك'),
    });
  };

  const meals = [
    {
      id: 'breakfast',
      name: t('Breakfast', 'الإفطار'),
      icon: Sunrise,
      color: 'text-orange-500',
      description: t('Start your day with energy', 'ابدأ يومك بالطاقة')
    },
    {
      id: 'lunch',
      name: t('Lunch', 'الغداء'),
      icon: Sun,
      color: 'text-yellow-500',
      description: t('Midday fuel for productivity', 'وقود منتصف النهار للإنتاجية')
    },
    {
      id: 'snack',
      name: t('Snack', 'وجبة خفيفة'),
      icon: Clock,
      color: 'text-green-500',
      description: t('Healthy energy boost', 'دفعة طاقة صحية')
    },
    {
      id: 'dinner',
      name: t('Dinner', 'العشاء'),
      icon: Sunset,
      color: 'text-purple-500',
      description: t('Evening nourishment', 'تغذية المساء')
    }
  ];

  return (
    <PageContainer
      header={{
        title: t('Meal Timing', 'توقيت الوجبات'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-wasfah-deep-teal">
            {t('Optimize Your Meal Schedule', 'حسّن جدول وجباتك')}
          </h2>
          <p className="text-gray-600">
            {t('Set ideal meal times for better health and energy', 'حدد أوقات مثالية للوجبات لصحة وطاقة أفضل')}
          </p>
        </div>

        <div className="grid gap-6">
          {meals.map((meal) => (
            <Card key={meal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <meal.icon className={`h-6 w-6 ${meal.color}`} />
                    <div>
                      <div className="text-lg font-semibold">{meal.name}</div>
                      <div className="text-sm text-gray-600 font-normal">{meal.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-wasfah-bright-teal">
                      {formatTime(mealTimes[meal.id as keyof typeof mealTimes][0], mealTimes[meal.id as keyof typeof mealTimes][1])}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      {t('Time', 'الوقت')}
                    </label>
                    <Slider
                      value={[getSliderValue(mealTimes[meal.id as keyof typeof mealTimes][0], mealTimes[meal.id as keyof typeof mealTimes][1])]}
                      onValueChange={(value) => handleTimeChange(meal.id, value)}
                      max={1439} // 23:59 in minutes
                      min={0}    // 00:00 in minutes
                      step={15}  // 15-minute intervals
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>12:00 AM</span>
                      <span>11:59 PM</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      {t('Notification Reminder', 'تذكير الإشعار')}
                    </label>
                    <Button
                      variant={notifications[meal.id as keyof typeof notifications] ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleNotification(meal.id)}
                      className="flex items-center space-x-2"
                    >
                      <Bell className="h-4 w-4" />
                      <span>{notifications[meal.id as keyof typeof notifications] ? t('On', 'مفعل') : t('Off', 'مغلق')}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Meal Timing Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Moon className="h-5 w-5 text-blue-500" />
              <span>{t('Meal Timing Tips', 'نصائح توقيت الوجبات')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-wasfah-bright-teal mt-2 flex-shrink-0"></div>
                <p>{t('Eat breakfast within 1-2 hours of waking up to jumpstart your metabolism', 'تناول الإفطار خلال 1-2 ساعة من الاستيقاظ لتنشيط الأيض')}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-wasfah-bright-teal mt-2 flex-shrink-0"></div>
                <p>{t('Space meals 3-4 hours apart for optimal digestion', 'اترك 3-4 ساعات بين الوجبات للهضم الأمثل')}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-wasfah-bright-teal mt-2 flex-shrink-0"></div>
                <p>{t('Finish dinner 2-3 hours before bedtime for better sleep', 'انهِ العشاء قبل 2-3 ساعات من النوم لنوم أفضل')}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-wasfah-bright-teal mt-2 flex-shrink-0"></div>
                <p>{t('Consider intermittent fasting windows based on your lifestyle', 'فكر في نوافذ الصيام المتقطع حسب نمط حياتك')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={saveMealTiming}
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
        >
          {t('Save Meal Timing', 'حفظ مواعيد الوجبات')}
        </Button>
      </div>
    </PageContainer>
  );
};

export default MealTimingPage;
