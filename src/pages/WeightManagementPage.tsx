import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scale, TrendingUp, TrendingDown, Target, Calendar, LineChart, Info } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  waistCircumference?: number;
  notes?: string;
}

const WeightManagementPage = () => {
  const { t } = useRTL();
  const { toast } = useToast();
  
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState(localStorage.getItem('targetWeight') || '');
  const [bodyFat, setBodyFat] = useState('');
  const [muscleMass, setMuscleMass] = useState('');
  const [waistCircumference, setWaistCircumference] = useState('');
  const [notes, setNotes] = useState('');
  
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>(() => {
    const savedHistory = localStorage.getItem('weightHistory');
    return savedHistory ? JSON.parse(savedHistory) : [
      {
        id: '1',
        date: new Date(Date.now() - 12096e5).toISOString().split('T')[0], // 2 weeks ago
        weight: 75.5,
        bodyFat: 18.2,
        muscleMass: 32.1,
        waistCircumference: 85,
        notes: 'Starting measurements'
      },
      {
        id: '2',
        date: new Date(Date.now() - 6048e5).toISOString().split('T')[0], // 1 week ago
        weight: 74.8,
        bodyFat: 17.9,
        muscleMass: 32.3,
        waistCircumference: 84,
        notes: 'Reduced carb intake'
      }
    ];
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('weightHistory', JSON.stringify(weightHistory));
    if (targetWeight) {
      localStorage.setItem('targetWeight', targetWeight);
    }
  }, [weightHistory, targetWeight]);

  const handleAddEntry = () => {
    if (!currentWeight) {
      toast({
        title: t('Error', 'خطأ'),
        description: t('Please enter your current weight', 'يرجى إدخال وزنك الحالي'),
        variant: 'destructive'
      });
      return;
    }

    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(currentWeight),
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
      muscleMass: muscleMass ? parseFloat(muscleMass) : undefined,
      waistCircumference: waistCircumference ? parseFloat(waistCircumference) : undefined,
      notes: notes || undefined
    };

    setWeightHistory([...weightHistory, newEntry]);

    toast({
      title: t('Weight Entry Added', 'تم إضافة إدخال الوزن'),
      description: t('Your measurements have been recorded successfully', 'تم تسجيل قياساتك بنجاح'),
    });

    // Reset form
    setCurrentWeight('');
    setBodyFat('');
    setMuscleMass('');
    setWaistCircumference('');
    setNotes('');
  };

  const getWeightTrend = () => {
    if (weightHistory.length < 2) return null;
    const latest = weightHistory[weightHistory.length - 1].weight;
    const previous = weightHistory[weightHistory.length - 2].weight;
    const change = latest - previous;
    
    return {
      change: Math.abs(change),
      isIncrease: change > 0,
      isDecrease: change < 0
    };
  };

  const calculateProgress = () => {
    if (!targetWeight || weightHistory.length === 0) return null;
    const current = weightHistory[weightHistory.length - 1].weight;
    const target = parseFloat(targetWeight);
    const difference = current - target;
    const percentage = Math.abs(((current - weightHistory[0].weight) / (target - weightHistory[0].weight)) * 100);
    
    return {
      difference: Math.abs(difference),
      isAbove: difference > 0,
      isBelow: difference < 0,
      percentage: Math.min(100, Math.max(0, percentage)),
      kgToGoal: Math.abs(difference)
    };
  };

  const trend = getWeightTrend();
  const progress = calculateProgress();

  // Prepare data for the chart
  const chartData = weightHistory.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: entry.weight,
    bodyFat: entry.bodyFat,
    muscleMass: entry.muscleMass,
    waist: entry.waistCircumference
  }));

  const getAIInsight = () => {
    if (weightHistory.length < 3) return t('Keep logging data to receive personalized insights', 'استمر في تسجيل البيانات للحصول على رؤى مخصصة');

    const recentChange = weightHistory[weightHistory.length - 1].weight - weightHistory[weightHistory.length - 2].weight;
    
    if (recentChange < -0.5) {
      return t('Your weight loss is on track! Consider adding strength training to preserve muscle mass.', 
               'فقدان الوزن الخاص بك على المسار الصحيح! فكر في إضافة تمارين القوة للحفاظ على كتلة العضلات.');
    } else if (recentChange > 0.5) {
      return t('Weight gain detected. Review recent meals and activity levels for adjustments.',
               'تم اكتشاف زيادة في الوزن. راجع الوجبات الحديثة ومستويات النشاط لإجراء التعديلات.');
    } else {
      return t('Weight is stable. Make sure you\'re meeting your nutritional needs for long-term health.',
               'الوزن مستقر. تأكد من أنك تلبية احتياجاتك الغذائية لصحة طويلة الأجل.');
    }
  };

  return (
    <PageContainer
      header={{
        title: t('Weight Management', 'إدارة الوزن'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-wasfah-deep-teal">
            {t('Track Your Progress', 'تتبع تقدمك')}
          </h2>
          <p className="text-gray-600">
            {t('Monitor your weight and body composition changes', 'راقب تغيرات وزنك وتركيب جسمك')}
          </p>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Scale className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-2" />
              <div className="text-2xl font-bold text-wasfah-deep-teal">
                {weightHistory[weightHistory.length - 1]?.weight || '--'} kg
              </div>
              <p className="text-sm text-gray-600">{t('Current Weight', 'الوزن الحالي')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {targetWeight || '--'} kg
              </div>
              <p className="text-sm text-gray-600">{t('Target Weight', 'الوزن المستهدف')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              {trend ? (
                <>
                  {trend.isIncrease ? (
                    <TrendingUp className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  ) : trend.isDecrease ? (
                    <TrendingDown className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  ) : (
                    <Scale className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                  )}
                  <div className={`text-2xl font-bold ${trend.isIncrease ? 'text-red-600' : 'text-green-600'}`}>
                    {trend.isIncrease ? '+' : '-'}{trend.change.toFixed(1)} kg
                  </div>
                  <p className="text-sm text-gray-600">{t('Recent Change', 'التغيير الأخير')}</p>
                </>
              ) : (
                <>
                  <Info className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-400">--</div>
                  <p className="text-sm text-gray-600">{t('Not enough data', 'بيانات غير كافية')}</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              {progress ? (
                <>
                  <div className="text-2xl font-bold text-wasfah-deep-teal">
                    {progress.kgToGoal.toFixed(1)} kg
                  </div>
                  <p className="text-sm text-gray-600">
                    {progress.isAbove 
                      ? t('to lose', 'للخسارة') 
                      : progress.isBelow 
                        ? t('to gain', 'للزيادة') 
                        : t('Goal reached!', 'تم تحقيق الهدف!')}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-wasfah-bright-teal h-2 rounded-full" 
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                </>
              ) : (
                <>
                  <Info className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-400">--</div>
                  <p className="text-sm text-gray-600">{t('Set target first', 'حدد الهدف أولاً')}</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChart className="h-5 w-5 text-wasfah-bright-teal" />
              <span>{t('Progress Over Time', 'التقدم مع مرور الوقت')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#0d9488" />
                <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="weight"
                  stroke="#0d9488"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name={t('Weight (kg)', 'الوزن (كجم)')}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="bodyFat"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name={t('Body Fat %', 'نسبة الدهون %')}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-wasfah-bright-teal" />
              <span>{t('AI Insights', 'رؤى الذكاء الاصطناعي')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-wasfah-light-teal/20 p-4 rounded-lg border border-wasfah-light-teal">
              <p className="text-wasfah-deep-teal">{getAIInsight()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Add New Entry */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-wasfah-bright-teal" />
              <span>{t('Add New Measurements', 'إضافة قياسات جديدة')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentWeight">
                  {t('Current Weight (kg)', 'الوزن الحالي (كجم)')}
                </Label>
                <Input
                  id="currentWeight"
                  type="number"
                  step="0.1"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  placeholder="75.5"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetWeight">
                  {t('Target Weight (kg)', 'الوزن المستهدف (كجم)')}
                </Label>
                <Input
                  id="targetWeight"
                  type="number"
                  step="0.1"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  placeholder="70.0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bodyFat">
                  {t('Body Fat % (optional)', 'نسبة الدهون % (اختياري)')}
                </Label>
                <Input
                  id="bodyFat"
                  type="number"
                  step="0.1"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  placeholder="18.5"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="muscleMass">
                  {t('Muscle Mass (kg) (optional)', 'كتلة العضلات (كجم) (اختياري)')}
                </Label>
                <Input
                  id="muscleMass"
                  type="number"
                  step="0.1"
                  value={muscleMass}
                  onChange={(e) => setMuscleMass(e.target.value)}
                  placeholder="32.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="waistCircumference">
                  {t('Waist (cm) (optional)', 'الخصر (سم) (اختياري)')}
                </Label>
                <Input
                  id="waistCircumference"
                  type="number"
                  step="0.1"
                  value={waistCircumference}
                  onChange={(e) => setWaistCircumference(e.target.value)}
                  placeholder="85.0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">
                {t('Notes (optional)', 'ملاحظات (اختياري)')}
              </Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('How are you feeling today? Any changes in diet or activity?', 
                              'كيف تشعر اليوم؟ أي تغييرات في النظام الغذائي أو النشاط؟')}
              />
            </div>

            <Button 
              onClick={handleAddEntry}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
            >
              {t('Add Measurements', 'إضافة القياسات')}
            </Button>
          </CardContent>
        </Card>

        {/* Measurement History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-wasfah-bright-teal" />
              <span>{t('Measurement History', 'سجل القياسات')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weightHistory.slice().reverse().map((entry) => (
                <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <div className="font-semibold">{entry.weight} kg</div>
                    <div className="text-sm text-gray-600">
                      {new Date(entry.date).toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    {entry.notes && (
                      <div className="text-sm text-gray-500 italic mt-1">{entry.notes}</div>
                    )}
                  </div>
                  <div className="text-right text-sm space-y-1">
                    {entry.bodyFat && <div><span className="font-medium">{t('Fat:', 'الدهون:')}</span> {entry.bodyFat}%</div>}
                    {entry.muscleMass && <div><span className="font-medium">{t('Muscle:', 'العضلات:')}</span> {entry.muscleMass} kg</div>}
                    {entry.waistCircumference && <div><span className="font-medium">{t('Waist:', 'الخصر:')}</span> {entry.waistCircumference} cm</div>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default WeightManagementPage;
