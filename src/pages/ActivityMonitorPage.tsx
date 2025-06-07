
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Footprints, Heart, Zap, Clock, Target } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';

interface ActivityData {
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  heartRate: number;
  sleepHours: number;
}

interface FitnessDevice {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
  batteryLevel?: number;
}

const ActivityMonitorPage = () => {
  const { t } = useRTL();
  const { toast } = useToast();
  
  const [todayActivity] = useState<ActivityData>({
    steps: 8547,
    calories: 342,
    distance: 6.2,
    activeMinutes: 45,
    heartRate: 72,
    sleepHours: 7.5
  });

  const [goals] = useState({
    steps: 10000,
    calories: 400,
    activeMinutes: 60,
    sleepHours: 8
  });

  const [devices, setDevices] = useState<FitnessDevice[]>([
    {
      id: '1',
      name: 'Apple Watch Series 9',
      type: 'smartwatch',
      status: 'connected',
      batteryLevel: 78
    },
    {
      id: '2',
      name: 'Fitbit Charge 5',
      type: 'fitness_tracker',
      status: 'disconnected',
      batteryLevel: 45
    }
  ]);

  const [scanning, setScanning] = useState(false);

  const handleScanDevices = () => {
    setScanning(true);
    toast({
      title: t("Scanning for devices", "البحث عن الأجهزة"),
      description: t("Looking for nearby fitness trackers...", "البحث عن أجهزة تتبع اللياقة القريبة..."),
    });
    
    setTimeout(() => {
      setScanning(false);
      toast({
        title: t("Scan complete", "اكتمل البحث"),
        description: t("No new devices found", "لم يتم العثور على أجهزة جديدة"),
      });
    }, 3000);
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smartwatch':
        return '⌚';
      case 'fitness_tracker':
        return '📱';
      default:
        return '📱';
    }
  };

  return (
    <PageContainer
      header={{
        title: t('Activity Monitor', 'مراقب النشاط'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-wasfah-deep-teal">
            {t('Track Your Activity', 'تتبع نشاطك')}
          </h2>
          <p className="text-gray-600">
            {t('Monitor your daily activity and fitness progress', 'راقب نشاطك اليومي وتقدم لياقتك')}
          </p>
        </div>

        {/* Today's Activity Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Footprints className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {todayActivity.steps.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">{t('Steps', 'خطوات')}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${getProgressPercentage(todayActivity.steps, goals.steps)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t('Goal:', 'الهدف:')} {goals.steps.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">
                {todayActivity.calories}
              </div>
              <p className="text-sm text-gray-600">{t('Calories', 'سعرات')}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${getProgressPercentage(todayActivity.calories, goals.calories)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t('Goal:', 'الهدف:')} {goals.calories}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {todayActivity.distance} km
              </div>
              <p className="text-sm text-gray-600">{t('Distance', 'المسافة')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {todayActivity.activeMinutes}
              </div>
              <p className="text-sm text-gray-600">{t('Active Min', 'دقائق نشطة')}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${getProgressPercentage(todayActivity.activeMinutes, goals.activeMinutes)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t('Goal:', 'الهدف:')} {goals.activeMinutes}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">
                {todayActivity.heartRate}
              </div>
              <p className="text-sm text-gray-600">{t('Heart Rate', 'معدل القلب')}</p>
              <p className="text-xs text-gray-500">BPM</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-indigo-600">
                {todayActivity.sleepHours}h
              </div>
              <p className="text-sm text-gray-600">{t('Sleep', 'النوم')}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full" 
                  style={{ width: `${getProgressPercentage(todayActivity.sleepHours, goals.sleepHours)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t('Goal:', 'الهدف:')} {goals.sleepHours}h
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Connected Devices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-wasfah-bright-teal" />
                <span>{t('Connected Devices', 'الأجهزة المتصلة')}</span>
              </span>
              <Button 
                onClick={handleScanDevices} 
                disabled={scanning}
                size="sm"
                variant="outline"
              >
                {scanning ? t('Scanning...', 'جاري البحث...') : t('Scan', 'بحث')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getDeviceIcon(device.type)}</div>
                    <div>
                      <div className="font-medium">{device.name}</div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={device.status === 'connected' ? 'default' : 'secondary'}>
                          {device.status === 'connected' ? t('Connected', 'متصل') : t('Disconnected', 'غير متصل')}
                        </Badge>
                        {device.batteryLevel && (
                          <span className="text-sm text-gray-600">
                            {t('Battery:', 'البطارية:')} {device.batteryLevel}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={device.status === 'connected' ? 'outline' : 'default'}
                    size="sm"
                  >
                    {device.status === 'connected' ? t('Disconnect', 'قطع الاتصال') : t('Connect', 'اتصال')}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-wasfah-bright-teal" />
              <span>{t('Activity Tips', 'نصائح النشاط')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-wasfah-bright-teal mt-2 flex-shrink-0"></div>
                <p>{t('Aim for at least 10,000 steps per day for optimal health', 'اهدف إلى 10,000 خطوة على الأقل يومياً للصحة المثلى')}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-wasfah-bright-teal mt-2 flex-shrink-0"></div>
                <p>{t('Include 150 minutes of moderate exercise per week', 'اشمل 150 دقيقة من التمارين المعتدلة أسبوعياً')}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-wasfah-bright-teal mt-2 flex-shrink-0"></div>
                <p>{t('Take breaks from sitting every hour', 'خذ فترات راحة من الجلوس كل ساعة')}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-wasfah-bright-teal mt-2 flex-shrink-0"></div>
                <p>{t('Maintain a consistent sleep schedule for better recovery', 'حافظ على جدول نوم ثابت للتعافي بشكل أفضل')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ActivityMonitorPage;
