
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Target, Trophy, Calendar, Plus, CheckCircle2, AlertCircle, Flame, Droplet, Moon, HeartPulse, Scale } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface HealthGoal {
  id: string;
  title: string;
  description: string;
  category: 'weight' | 'nutrition' | 'exercise' | 'sleep' | 'wellness' | 'custom';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: 'active' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high';
  streak?: number;
  createdAt: string;
}

const goalTemplates = [
  {
    title: 'Lower Cholesterol',
    description: 'Reduce LDL cholesterol levels through diet and exercise',
    category: 'nutrition',
    targetValue: 1,
    unit: 'mmol/L reduction',
    priority: 'high'
  },
  {
    title: 'Build Muscle',
    description: 'Increase lean muscle mass through strength training',
    category: 'exercise',
    targetValue: 5,
    unit: 'kg gain',
    priority: 'medium'
  },
  {
    title: 'Manage Diabetes',
    description: 'Maintain healthy blood sugar levels',
    category: 'nutrition',
    targetValue: 1,
    unit: 'mmol/L fasting glucose',
    priority: 'high'
  },
  {
    title: 'Improve Sleep',
    description: 'Get consistent quality sleep each night',
    category: 'sleep',
    targetValue: 7,
    unit: 'hours/night',
    priority: 'medium'
  },
  {
    title: 'Daily Hydration',
    description: 'Drink enough water each day',
    category: 'wellness',
    targetValue: 8,
    unit: 'glasses/day',
    priority: 'medium'
  }
];

const HealthGoalsPage = () => {
  const { t } = useRTL();
  const { toast } = useToast();
  
  const [goals, setGoals] = useState<HealthGoal[]>(() => {
    const savedGoals = localStorage.getItem('healthGoals');
    return savedGoals ? JSON.parse(savedGoals) : [
      {
        id: '1',
        title: 'Lose Weight',
        description: 'Reach my target weight for better health',
        category: 'weight',
        targetValue: 70,
        currentValue: 75,
        unit: 'kg',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'active',
        priority: 'high',
        streak: 0,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Daily Water Intake',
        description: 'Drink enough water daily for hydration',
        category: 'wellness',
        targetValue: 8,
        currentValue: 6,
        unit: 'glasses',
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'active',
        priority: 'medium',
        streak: 3,
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    targetValue: '',
    unit: '',
    deadline: '',
    priority: 'medium'
  });

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('healthGoals', JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.category || !newGoal.targetValue) {
      toast({
        title: t('Error', 'خطأ'),
        description: t('Please fill in all required fields', 'يرجى ملء جميع الحقول المطلوبة'),
        variant: 'destructive'
      });
      return;
    }

    const goal: HealthGoal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category as HealthGoal['category'],
      targetValue: parseFloat(newGoal.targetValue),
      currentValue: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
      priority: newGoal.priority as HealthGoal['priority'],
      streak: 0,
      createdAt: new Date().toISOString()
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      category: '',
      targetValue: '',
      unit: '',
      deadline: '',
      priority: 'medium'
    });
    setShowAddGoal(false);
    setShowTemplateSelector(false);

    toast({
      title: t('Goal Added', 'تم إضافة الهدف'),
      description: t('Your health goal has been created successfully', 'تم إنشاء هدفك الصحي بنجاح'),
    });
  };

  const applyTemplate = (template: typeof goalTemplates[0]) => {
    setNewGoal({
      title: template.title,
      description: template.description,
      category: template.category,
      targetValue: template.targetValue.toString(),
      unit: template.unit,
      deadline: '',
      priority: template.priority
    });
    setShowTemplateSelector(false);
  };

  const updateGoalProgress = (goalId: string, newValue: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        // Check if this is consecutive progress (for streaks)
        const isConsecutive = newValue > goal.currentValue || 
          (new Date().getDate() - new Date(goal.createdAt).getDate() === 1);
        
        const updated = { 
          ...goal, 
          currentValue: newValue,
          streak: isConsecutive ? (goal.streak || 0) + 1 : goal.streak || 0
        };
        
        if (newValue >= goal.targetValue) {
          updated.status = 'completed';
        }
        return updated;
      }
      return goal;
    }));

    toast({
      title: t('Progress Updated', 'تم تحديث التقدم'),
      description: t('Your goal progress has been updated', 'تم تحديث تقدم هدفك'),
    });
  };

  const getProgressPercentage = (goal: HealthGoal) => {
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weight': return <Scale className="h-5 w-5 text-purple-500" />;
      case 'nutrition': return <HeartPulse className="h-5 w-5 text-green-500" />;
      case 'exercise': return <Flame className="h-5 w-5 text-orange-500" />;
      case 'sleep': return <Moon className="h-5 w-5 text-blue-500" />;
      case 'wellness': return <Droplet className="h-5 w-5 text-teal-500" />;
      default: return <Target className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAIRecommendation = (goal: HealthGoal) => {
    if (goal.status === 'completed') {
      return t('Goal achieved! Consider setting a new challenge.', 'تم تحقيق الهدف! فكر في تحديد تحدٍ جديد.');
    }

    const progress = getProgressPercentage(goal);
    
    if (progress < 30) {
      switch (goal.category) {
        case 'weight':
          return t('Try reducing processed foods and increasing protein intake to boost weight loss.', 
                   'حاول تقليل الأطعمة المصنعة وزيادة تناول البروتين لتعزيز فقدان الوزن.');
        case 'nutrition':
          return t('Add more leafy greens and whole grains to your meals for better nutrition.',
                   'أضف المزيد من الخضار الورقية والحبوب الكاملة إلى وجباتك لتغذية أفضل.');
        case 'exercise':
          return t('Start with 3 short workouts per week and gradually increase frequency.',
                   'ابدأ بثلاثة تمارين قصيرة في الأسبوع وزد التكرار تدريجياً.');
        case 'sleep':
          return t('Establish a consistent bedtime routine and limit screen time before sleep.',
                   'ضع روتينًا ثابتًا لوقت النوم وقلل وقت الشاشة قبل النوم.');
        default:
          return t('Small consistent steps lead to big changes. Focus on daily progress.',
                   'الخطوات الصغيرة المتسقة تؤدي إلى تغييرات كبيرة. ركز على التقدم اليومي.');
      }
    } else if (progress < 70) {
      return t('Good progress! Review what\'s working and double down on those habits.',
               'تقدم جيد! راجع ما ينجح وكرر تلك العادات.');
    } else {
      return t('Almost there! Stay consistent to reach your goal soon.',
               'كدت تصل! حافظ على استمراريتك لتحقيق هدفك قريبًا.');
    }
  };

  return (
    <PageContainer
      header={{
        title: t('Health Goals', 'الأهداف الصحية'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-wasfah-deep-teal">
            {t('Personalized Health Objectives', 'أهداف صحية شخصية')}
          </h2>
          <p className="text-gray-600">
            {t('Set and track goals tailored to your nutrition and lifestyle needs', 
               'حدد وتتبع أهدافًا مصممة خصيصًا لاحتياجاتك الغذائية ونمط حياتك')}
          </p>
        </div>

        {/* Goals Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-2" />
              <div className="text-2xl font-bold text-wasfah-deep-teal">
                {goals.filter(g => g.status === 'active').length}
              </div>
              <p className="text-sm text-gray-600">{t('Active Goals', 'الأهداف النشطة')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {goals.filter(g => g.status === 'completed').length}
              </div>
              <p className="text-sm text-gray-600">{t('Completed', 'مكتملة')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {goals.length > 0 
                  ? Math.round(goals.reduce((sum, goal) => sum + getProgressPercentage(goal), 0) / goals.length)
                  : 0}%
              </div>
              <p className="text-sm text-gray-600">{t('Avg Progress', 'متوسط التقدم')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">
                {goals.reduce((max, goal) => Math.max(max, goal.streak || 0), 0)}
              </div>
              <p className="text-sm text-gray-600">{t('Longest Streak', 'أطول استمرارية')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Goal Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Button 
            onClick={() => {
              setShowAddGoal(true);
              setShowTemplateSelector(false);
            }}
            className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('Create Custom Goal', 'إنشاء هدف مخصص')}
          </Button>
          
          <Button 
            onClick={() => {
              setShowTemplateSelector(true);
              setShowAddGoal(false);
            }}
            variant="outline"
            className="border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-light-teal/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('Choose from Templates', 'اختر من القوالب')}
          </Button>
        </div>

        {/* Template Selector */}
        {showTemplateSelector && (
          <Card>
            <CardHeader>
              <CardTitle>{t('Goal Templates', 'قوالب الأهداف')}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goalTemplates.map((template, index) => (
                <Card 
                  key={index} 
                  className="hover:border-wasfah-bright-teal cursor-pointer transition-colors"
                  onClick={() => applyTemplate(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      {getCategoryIcon(template.category)}
                      <h3 className="font-semibold">{template.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex justify-between text-sm">
                      <span>{t('Target', 'الهدف')}: {template.targetValue} {template.unit}</span>
                      <Badge variant="outline" className={getPriorityColor(template.priority)}>
                        {t(template.priority, template.priority)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Add Goal Form */}
        {showAddGoal && (
          <Card>
            <CardHeader>
              <CardTitle>{t('Create New Health Goal', 'إنشاء هدف صحي جديد')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goalTitle">{t('Goal Title', 'عنوان الهدف')} *</Label>
                  <Input
                    id="goalTitle"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    placeholder={t('e.g., Drink 2L water daily', 'مثال: اشرب 2 لتر ماء يوميًا')}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('Category', 'الفئة')} *</Label>
                  <Select value={newGoal.category} onValueChange={(value) => setNewGoal({...newGoal, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Select category', 'اختر الفئة')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight">{t('Weight Management', 'إدارة الوزن')}</SelectItem>
                      <SelectItem value="nutrition">{t('Nutrition', 'التغذية')}</SelectItem>
                      <SelectItem value="exercise">{t('Exercise', 'التمارين')}</SelectItem>
                      <SelectItem value="sleep">{t('Sleep', 'النوم')}</SelectItem>
                      <SelectItem value="wellness">{t('General Wellness', 'الصحة العامة')}</SelectItem>
                      <SelectItem value="custom">{t('Custom', 'مخصص')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goalDescription">{t('Description', 'الوصف')}</Label>
                <Textarea
                  id="goalDescription"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  placeholder={t('Describe your goal and why it matters to you...', 'صف هدفك ولماذا هو مهم بالنسبة لك...')}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetValue">{t('Target Value', 'القيمة المستهدفة')} *</Label>
                  <Input
                    id="targetValue"
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({...newGoal, targetValue: e.target.value})}
                    placeholder="8"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">{t('Unit', 'الوحدة')}</Label>
                  <Input
                    id="unit"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                    placeholder={t('kg, days, glasses, etc.', 'كجم، أيام، أكواب، إلخ.')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">{t('Deadline', 'الموعد النهائي')}</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t('Priority', 'الأولوية')}</Label>
                <Select value={newGoal.priority} onValueChange={(value) => setNewGoal({...newGoal, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">{t('High', 'عالية')}</SelectItem>
                    <SelectItem value="medium">{t('Medium', 'متوسطة')}</SelectItem>
                    <SelectItem value="low">{t('Low', 'منخفضة')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button onClick={handleAddGoal} className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                  {t('Create Goal', 'إنشاء الهدف')}
                </Button>
                <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                  {t('Cancel', 'إلغاء')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Goals List */}
        <div className="space-y-4">
          {goals.length > 0 ? (
            goals
              .sort((a, b) => {
                // Sort by priority (high first), then by progress (lower first)
                if (a.priority === b.priority) {
                  return getProgressPercentage(a) - getProgressPercentage(b);
                }
                return a.priority === 'high' ? -1 : b.priority === 'high' ? 1 : 
                       a.priority === 'medium' ? -1 : 1;
              })
              .map((goal) => (
                <Card key={goal.id} className={goal.status === 'completed' ? 'border-green-200 bg-green-50' : ''}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="mt-1">
                          {getCategoryIcon(goal.category)}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="text-lg font-semibold">{goal.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(goal.priority)}>
                                {t(goal.priority, goal.priority)}
                              </Badge>
                              {goal.status === 'completed' && (
                                <Badge className="bg-green-100 text-green-800">
                                  {t('Completed', 'مكتمل')}
                                </Badge>
                              )}
                              {goal.streak && goal.streak > 2 && (
                                <Badge className="bg-orange-100 text-orange-800">
                                  🔥 {goal.streak} {t('days', 'أيام')}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {goal.description && (
                            <p className="text-gray-600 text-sm">{goal.description}</p>
                          )}
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{t('Progress', 'التقدم')}</span>
                              <span className="font-medium">
                                {goal.currentValue} / {goal.targetValue} {goal.unit}
                              </span>
                            </div>
                            
                            <Progress 
                              value={getProgressPercentage(goal)} 
                              className={`h-3 ${goal.status === 'completed' ? 'bg-green-500' : 'bg-wasfah-bright-teal'}`}
                            />
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>{Math.round(getProgressPercentage(goal))}% {t('complete', 'مكتمل')}</span>
                              {goal.deadline && (
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date(goal.deadline).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* AI Recommendation */}
                          <div className="mt-3 p-3 bg-wasfah-light-teal/20 rounded-lg">
                            <p className="text-sm text-wasfah-deep-teal">
                              {getAIRecommendation(goal)}
                            </p>
                          </div>
                          
                          {goal.status === 'active' && (
                            <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                              <div className="flex-1 flex items-center space-x-2">
                                <Input
                                  type="number"
                                  placeholder={t('Update progress', 'تحديث التقدم')}
                                  className="w-32"
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      const value = parseFloat((e.target as HTMLInputElement).value);
                                      if (!isNaN(value)) {
                                        updateGoalProgress(goal.id, value);
                                        (e.target as HTMLInputElement).value = '';
                                      }
                                    }
                                  }}
                                />
                                <span className="text-sm text-gray-500">{goal.unit}</span>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  const newValue = Math.min(goal.currentValue + (goal.targetValue * 0.1), goal.targetValue);
                                  updateGoalProgress(goal.id, parseFloat(newValue.toFixed(1)));
                                }}
                              >
                                +10%
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('No Health Goals Yet', 'لا توجد أهداف صحية بعد')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('Create your first health goal to start tracking your progress', 'أنشئ هدفك الصحي الأول لبدء تتبع تقدمك')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-2">
                  <Button 
                    onClick={() => setShowAddGoal(true)}
                    className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
                  >
                    {t('Create Custom Goal', 'إنشاء هدف مخصص')}
                  </Button>
                  <Button 
                    onClick={() => setShowTemplateSelector(true)}
                    variant="outline"
                  >
                    {t('Choose from Templates', 'اختر من القوالب')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default HealthGoalsPage;
