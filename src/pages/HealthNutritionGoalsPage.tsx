
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Apple, Droplet, Zap, Heart, Scale, Plus, Check, TrendingUp, Calendar } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';

interface NutritionGoal {
  id: string;
  name: string;
  nameAr: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  category: 'macros' | 'vitamins' | 'minerals' | 'hydration' | 'calories';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

const defaultGoals: NutritionGoal[] = [
  {
    id: '1',
    name: 'Daily Protein Intake',
    nameAr: 'استهلاك البروتين اليومي',
    targetValue: 120,
    currentValue: 85,
    unit: 'g',
    category: 'macros',
    priority: 'high',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Daily Water Intake',
    nameAr: 'استهلاك الماء اليومي',
    targetValue: 8,
    currentValue: 6,
    unit: 'glasses',
    category: 'hydration',
    priority: 'medium',
    deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Daily Fiber Intake',
    nameAr: 'استهلاك الألياف اليومي',
    targetValue: 25,
    currentValue: 18,
    unit: 'g',
    category: 'macros',
    priority: 'medium',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

const HealthNutritionGoalsPage = () => {
  const { t } = useRTL();
  const { toast } = useToast();
  
  const [goals, setGoals] = useState<NutritionGoal[]>(() => {
    const savedGoals = localStorage.getItem('healthNutritionGoals');
    return savedGoals ? JSON.parse(savedGoals) : defaultGoals;
  });

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    nameAr: '',
    targetValue: '',
    unit: '',
    category: '',
    priority: 'medium',
    deadline: ''
  });

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('healthNutritionGoals', JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.nameAr || !newGoal.targetValue || !newGoal.category) {
      toast({
        title: t('Error', 'خطأ'),
        description: t('Please fill in all required fields', 'يرجى ملء جميع الحقول المطلوبة'),
        variant: 'destructive'
      });
      return;
    }

    const goal: NutritionGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      nameAr: newGoal.nameAr,
      targetValue: parseFloat(newGoal.targetValue),
      currentValue: 0,
      unit: newGoal.unit,
      category: newGoal.category as NutritionGoal['category'],
      priority: newGoal.priority as NutritionGoal['priority'],
      deadline: newGoal.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
      createdAt: new Date().toISOString()
    };

    setGoals([...goals, goal]);
    setNewGoal({
      name: '',
      nameAr: '',
      targetValue: '',
      unit: '',
      category: '',
      priority: 'medium',
      deadline: ''
    });
    setShowAddGoal(false);

    toast({
      title: t('Goal Added', 'تم إضافة الهدف'),
      description: t('Your nutrition goal has been created successfully', 'تم إنشاء هدفك الغذائي بنجاح'),
    });
  };

  const updateGoalProgress = (goalId: string, newValue: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updated = { 
          ...goal, 
          currentValue: Math.max(0, newValue)
        };
        
        if (newValue >= goal.targetValue && goal.currentValue < goal.targetValue) {
          updated.status = 'completed';
          toast({
            title: t('Goal Achieved!', 'تم تحقيق الهدف!'),
            description: t(`Congratulations! You've reached your ${goal.name} goal!`, `تهانينا! لقد حققت هدفك في ${goal.nameAr}!`),
          });
        }
        return updated;
      }
      return goal;
    }));
  };

  const getProgressPercentage = (goal: NutritionGoal) => {
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'macros': return <Apple className="h-5 w-5 text-green-500" />;
      case 'vitamins': return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'minerals': return <Scale className="h-5 w-5 text-blue-500" />;
      case 'hydration': return <Droplet className="h-5 w-5 text-cyan-500" />;
      case 'calories': return <Heart className="h-5 w-5 text-red-500" />;
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

  const getOverallProgress = () => {
    if (goals.length === 0) return 0;
    const totalProgress = goals.reduce((sum, goal) => sum + getProgressPercentage(goal), 0);
    return Math.round(totalProgress / goals.length);
  };

  const getCompletedGoals = () => {
    return goals.filter(goal => goal.status === 'completed').length;
  };

  return (
    <PageContainer
      header={{
        title: t('Nutrition Goals', 'أهداف التغذية'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-wasfah-deep-teal">
            {t('Nutritional Health Objectives', 'أهداف الصحة الغذائية')}
          </h2>
          <p className="text-gray-600">
            {t('Track your daily nutrition intake and achieve your health goals', 
               'تتبع مدخولك الغذائي اليومي وحقق أهدافك الصحية')}
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
              <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {getCompletedGoals()}
              </div>
              <p className="text-sm text-gray-600">{t('Completed', 'مكتملة')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {getOverallProgress()}%
              </div>
              <p className="text-sm text-gray-600">{t('Overall Progress', 'التقدم العام')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Goal Button */}
        <div className="flex justify-center mb-6">
          <Button 
            onClick={() => setShowAddGoal(true)}
            className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('Add Nutrition Goal', 'إضافة هدف غذائي')}
          </Button>
        </div>

        {/* Add Goal Form */}
        {showAddGoal && (
          <Card>
            <CardHeader>
              <CardTitle>{t('Create New Nutrition Goal', 'إنشاء هدف غذائي جديد')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goalName">{t('Goal Name (English)', 'اسم الهدف (إنجليزي)')} *</Label>
                  <Input
                    id="goalName"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                    placeholder={t('e.g., Daily Protein Intake', 'مثال: استهلاك البروتين اليومي')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goalNameAr">{t('Goal Name (Arabic)', 'اسم الهدف (عربي)')} *</Label>
                  <Input
                    id="goalNameAr"
                    value={newGoal.nameAr}
                    onChange={(e) => setNewGoal({...newGoal, nameAr: e.target.value})}
                    placeholder={t('e.g., استهلاك البروتين اليومي', 'مثال: استهلاك البروتين اليومي')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetValue">{t('Target Value', 'القيمة المستهدفة')} *</Label>
                  <Input
                    id="targetValue"
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({...newGoal, targetValue: e.target.value})}
                    placeholder="120"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">{t('Unit', 'الوحدة')}</Label>
                  <Input
                    id="unit"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                    placeholder={t('g, mg, glasses, etc.', 'جم، مجم، أكواب، إلخ.')}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('Category', 'الفئة')} *</Label>
                  <Select value={newGoal.category} onValueChange={(value) => setNewGoal({...newGoal, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Select category', 'اختر الفئة')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="macros">{t('Macronutrients', 'المغذيات الكبرى')}</SelectItem>
                      <SelectItem value="vitamins">{t('Vitamins', 'الفيتامينات')}</SelectItem>
                      <SelectItem value="minerals">{t('Minerals', 'المعادن')}</SelectItem>
                      <SelectItem value="hydration">{t('Hydration', 'الترطيب')}</SelectItem>
                      <SelectItem value="calories">{t('Calories', 'السعرات الحرارية')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <h3 className="text-lg font-semibold">{goal.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(goal.priority)}>
                                {t(goal.priority, goal.priority)}
                              </Badge>
                              {goal.status === 'completed' && (
                                <Badge className="bg-green-100 text-green-800">
                                  {t('Completed', 'مكتمل')}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{t('Progress', 'التقدم')}</span>
                              <span className="font-medium">
                                {goal.currentValue} / {goal.targetValue} {goal.unit}
                              </span>
                            </div>
                            
                            <Progress 
                              value={getProgressPercentage(goal)} 
                              className="h-3"
                            />
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>{Math.round(getProgressPercentage(goal))}% {t('complete', 'مكتمل')}</span>
                              {goal.deadline && (
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date(goal.deadline).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {goal.status === 'active' && (
                            <div className="mt-3 flex items-center space-x-2">
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
                <h3 className="text-lg font-medium mb-2">{t('No Nutrition Goals Yet', 'لا توجد أهداف غذائية بعد')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('Create your first nutrition goal to start tracking your intake', 'أنشئ هدفك الغذائي الأول لبدء تتبع مدخولك')}
                </p>
                <Button 
                  onClick={() => setShowAddGoal(true)}
                  className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
                >
                  {t('Add Nutrition Goal', 'إضافة هدف غذائي')}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default HealthNutritionGoalsPage;
