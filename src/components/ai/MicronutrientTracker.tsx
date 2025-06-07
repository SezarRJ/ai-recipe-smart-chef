import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Minus, Activity, TrendingUp, Award, Info, Plus, Leaf, Sun, Droplet, Zap } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Micronutrient {
  id: string;
  name: string;
  nameAr: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  icon: React.ReactNode;
  benefits: string[];
  foodSources: string[];
}

const getDefaultIcon = (id: string) => {
  switch (id) {
    case '1': return <Droplet className="h-5 w-5 text-orange-500" />;
    case '2': return <Sun className="h-5 w-5 text-yellow-500" />;
    case '3': return <Zap className="h-5 w-5 text-red-500" />;
    case '4': return <Leaf className="h-5 w-5 text-blue-500" />;
    default: return <Plus className="h-5 w-5 text-purple-500" />;
  }
};

const MicronutrientTracker = () => {
  const { t, direction } = useRTL();
  
  const [micronutrients, setMicronutrients] = useState<Micronutrient[]>(() => {
    const saved = localStorage.getItem('micronutrients');
    if (saved) {
      const parsedData = JSON.parse(saved);
      // Restore icons after loading from localStorage
      return parsedData.map((nutrient: any) => ({
        ...nutrient,
        icon: getDefaultIcon(nutrient.id)
      }));
    }
    
    return [
      { 
        id: '1',
        name: 'Vitamin C', 
        nameAr: 'فيتامين ج', 
        current: 45, 
        target: 90, 
        unit: 'mg', 
        color: 'bg-orange-500',
        icon: <Droplet className="h-5 w-5 text-orange-500" />,
        benefits: [
          'Supports immune function',
          'Promotes skin health',
          'Enhances iron absorption'
        ],
        foodSources: [
          'Citrus fruits',
          'Bell peppers',
          'Strawberries',
          'Broccoli'
        ]
      },
      { 
        id: '2',
        name: 'Vitamin D', 
        nameAr: 'فيتامين د', 
        current: 15, 
        target: 20, 
        unit: 'µg', 
        color: 'bg-yellow-500',
        icon: <Sun className="h-5 w-5 text-yellow-500" />,
        benefits: [
          'Bone health',
          'Immune support',
          'Mood regulation'
        ],
        foodSources: [
          'Fatty fish',
          'Egg yolks',
          'Fortified milk',
          'Sunlight exposure'
        ]
      },
      { 
        id: '3',
        name: 'Iron', 
        nameAr: 'الحديد', 
        current: 12, 
        target: 18, 
        unit: 'mg', 
        color: 'bg-red-500',
        icon: <Zap className="h-5 w-5 text-red-500" />,
        benefits: [
          'Oxygen transport',
          'Energy production',
          'Cognitive function'
        ],
        foodSources: [
          'Red meat',
          'Spinach',
          'Lentils',
          'Fortified cereals'
        ]
      },
      { 
        id: '4',
        name: 'Calcium', 
        nameAr: 'الكالسيوم', 
        current: 800, 
        target: 1000, 
        unit: 'mg', 
        color: 'bg-blue-500',
        icon: <Leaf className="h-5 w-5 text-blue-500" />,
        benefits: [
          'Bone strength',
          'Muscle function',
          'Nerve signaling'
        ],
        foodSources: [
          'Dairy products',
          'Leafy greens',
          'Almonds',
          'Fortified juices'
        ]
      }
    ];
  });

  const [newAmount, setNewAmount] = useState<number | "">("");
  const [selectedNutrient, setSelectedNutrient] = useState<string | null>(null);
  const [showAddNutrient, setShowAddNutrient] = useState(false);
  const [newNutrient, setNewNutrient] = useState({
    name: '',
    nameAr: '',
    target: '',
    unit: 'mg'
  });

  // Save to localStorage when data changes
  useEffect(() => {
    // Remove non-serializable properties before saving
    const serializableData = micronutrients.map(({ icon, ...rest }) => rest);
    localStorage.setItem('micronutrients', JSON.stringify(serializableData));
  }, [micronutrients]);

  const updateNutrient = (id: string, amount: number) => {
    setMicronutrients(prev => prev.map(nutrient => {
      if (nutrient.id === id) {
        const updated = { 
          ...nutrient, 
          current: Math.max(0, nutrient.current + amount)
        };
        
        // Check if target was reached
        if (updated.current >= nutrient.target && nutrient.current < nutrient.target) {
          toast({
            title: t("Target Reached!", "تم الوصول للهدف!"),
            description: t(`You've reached your daily ${nutrient.name} goal!`, `لقد حققت هدفك اليومي من ${nutrient.nameAr}!`),
          });
        }
        
        return updated;
      }
      return nutrient;
    }));
  };

  const addCustomAmount = () => {
    if (selectedNutrient && newAmount !== "" && newAmount > 0) {
      updateNutrient(selectedNutrient, Number(newAmount));
      setNewAmount("");
      setSelectedNutrient(null);
    }
  };

  const addNewNutrient = () => {
    if (!newNutrient.name || !newNutrient.nameAr || !newNutrient.target) {
      toast({
        title: t("Error", "خطأ"),
        description: t("Please fill all required fields", "يرجى ملء جميع الحقول المطلوبة"),
        variant: "destructive"
      });
      return;
    }

    const nutrient: Micronutrient = {
      id: Date.now().toString(),
      name: newNutrient.name,
      nameAr: newNutrient.nameAr,
      current: 0,
      target: Number(newNutrient.target),
      unit: newNutrient.unit,
      color: 'bg-purple-500',
      icon: <Plus className="h-5 w-5 text-purple-500" />,
      benefits: [],
      foodSources: []
    };

    setMicronutrients([...micronutrients, nutrient]);
    setNewNutrient({
      name: '',
      nameAr: '',
      target: '',
      unit: 'mg'
    });
    setShowAddNutrient(false);

    toast({
      title: t("Nutrient Added", "تمت إضافة المغذي"),
      description: t("Your custom nutrient has been added", "تمت إضافة المغذي المخصص الخاص بك"),
    });
  };

  const getOverallProgress = () => {
    if (micronutrients.length === 0) return 0;
    const totalProgress = micronutrients.reduce((sum, nutrient) => {
      return sum + Math.min((nutrient.current / nutrient.target) * 100, 100);
    }, 0);
    return Math.round(totalProgress / micronutrients.length);
  };

  const getCompletedCount = () => {
    return micronutrients.filter(n => n.current >= n.target).length;
  };

  const getMostDeficient = () => {
    if (micronutrients.length === 0) return null;
    return micronutrients.reduce((prev, current) => 
      (prev.current / prev.target) < (current.current / current.target) ? prev : current
    );
  };

  const mostDeficient = getMostDeficient();

  return (
    <PageContainer header={{ 
      title: t('Micronutrient Tracker', 'متتبع المغذيات الدقيقة'), 
      showBackButton: true 
    }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        
        {/* Header Stats */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{t('Micronutrient Tracker', 'متتبع المغذيات الدقيقة')}</h1>
              <p className="opacity-90">{t('Track your essential vitamins and minerals', 'تتبع الفيتامينات والمعادن الأساسية')}</p>
            </div>
            <Activity className="h-12 w-12 opacity-80" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">{t('Overall Progress', 'التقدم العام')}</span>
              </div>
              <div className="text-2xl font-bold">{getOverallProgress()}%</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium">{t('Completed', 'مكتمل')}</span>
              </div>
              <div className="text-2xl font-bold">{getCompletedCount()}/{micronutrients.length}</div>
            </div>
            {mostDeficient && (
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span className="text-sm font-medium">{t('Focus On', 'ركز على')}</span>
                </div>
                <div className="text-xl font-bold truncate">
                  {direction === 'rtl' ? mostDeficient.nameAr : mostDeficient.name}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Overall Progress Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{t('Daily Goal Progress', 'تقدم الهدف اليومي')}</span>
              <span className="text-sm text-gray-600">{getOverallProgress()}%</span>
            </div>
            <Progress value={getOverallProgress()} className="h-3" />
          </CardContent>
        </Card>

        {/* Add Nutrient Button */}
        <Button 
          onClick={() => setShowAddNutrient(true)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {t('Add Custom Nutrient', 'إضافة مغذي مخصص')}
        </Button>

        {/* Add Nutrient Form */}
        {showAddNutrient && (
          <Card>
            <CardHeader>
              <CardTitle>{t('Add New Nutrient', 'إضافة مغذي جديد')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nutrientName">{t('Name (English)', 'الاسم (إنجليزي)')} *</Label>
                  <Input
                    id="nutrientName"
                    value={newNutrient.name}
                    onChange={(e) => setNewNutrient({...newNutrient, name: e.target.value})}
                    placeholder="Vitamin B12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nutrientNameAr">{t('Name (Arabic)', 'الاسم (عربي)')} *</Label>
                  <Input
                    id="nutrientNameAr"
                    value={newNutrient.nameAr}
                    onChange={(e) => setNewNutrient({...newNutrient, nameAr: e.target.value})}
                    placeholder="فيتامين ب12"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nutrientTarget">{t('Daily Target', 'الهدف اليومي')} *</Label>
                  <Input
                    id="nutrientTarget"
                    type="number"
                    value={newNutrient.target}
                    onChange={(e) => setNewNutrient({...newNutrient, target: e.target.value})}
                    placeholder="2.4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nutrientUnit">{t('Unit', 'الوحدة')}</Label>
                  <Input
                    id="nutrientUnit"
                    value={newNutrient.unit}
                    onChange={(e) => setNewNutrient({...newNutrient, unit: e.target.value})}
                    placeholder="mg, µg, etc."
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={addNewNutrient} className="bg-emerald-600 hover:bg-emerald-700">
                  {t('Add Nutrient', 'إضافة المغذي')}
                </Button>
                <Button variant="outline" onClick={() => setShowAddNutrient(false)}>
                  {t('Cancel', 'إلغاء')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Micronutrients List */}
        <div className="space-y-4">
          {micronutrients.length > 0 ? (
            micronutrients
              .sort((a, b) => (a.current / a.target) - (b.current / b.target))
              .map((nutrient) => {
                const percentage = Math.min((nutrient.current / nutrient.target) * 100, 100);
                const isCompleted = nutrient.current >= nutrient.target;
                
                return (
                  <Card key={nutrient.id} className={`${isCompleted ? 'ring-2 ring-green-500' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${nutrient.color}`} />
                          <div>
                            <h3 className="font-medium">{direction === 'rtl' ? nutrient.nameAr : nutrient.name}</h3>
                            <p className="text-sm text-gray-600">
                              {nutrient.current.toFixed(1)} / {nutrient.target} {nutrient.unit}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {isCompleted && <Badge variant="default" className="bg-green-500">{t('Complete', 'مكتمل')}</Badge>}
                          <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                        </div>
                      </div>
                      
                      <Progress value={percentage} className="mb-3 h-2" />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateNutrient(nutrient.id, -5)}
                            disabled={nutrient.current <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-xs text-gray-500">-5 {nutrient.unit}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedNutrient(selectedNutrient === nutrient.id ? null : nutrient.id)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateNutrient(nutrient.id, 5)}
                          >
                            +5 {nutrient.unit}
                          </Button>
                        </div>
                      </div>
                      
                      {selectedNutrient === nutrient.id && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              placeholder={`${t('Amount', 'الكمية')} (${nutrient.unit})`}
                              value={newAmount}
                              onChange={(e) => setNewAmount(e.target.value === "" ? "" : Number(e.target.value))}
                              className="flex-1"
                              min="0"
                              step="0.1"
                            />
                            <Button onClick={addCustomAmount} size="sm">
                              {t('Add', 'إضافة')}
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Nutrient Details */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center">
                            {nutrient.icon}
                            <span className="ml-2">{t('Benefits', 'الفوائد')}</span>
                          </h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {nutrient.benefits.length > 0 ? (
                              nutrient.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>{t(benefit, benefit)}</span>
                                </li>
                              ))
                            ) : (
                              <p className="text-gray-500 italic">
                                {t('No benefits information available', 'لا توجد معلومات عن الفوائد')}
                              </p>
                            )}
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center">
                            {nutrient.icon}
                            <span className="ml-2">{t('Food Sources', 'مصادر غذائية')}</span>
                          </h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {nutrient.foodSources.length > 0 ? (
                              nutrient.foodSources.map((source, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>{t(source, source)}</span>
                                </li>
                              ))
                            ) : (
                              <p className="text-gray-500 italic">
                                {t('No food sources information available', 'لا توجد معلومات عن المصادر الغذائية')}
                              </p>
                            )}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {t('No Nutrients Tracked', 'لا توجد مغذيات متتبعة')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('Add nutrients to start tracking your daily intake', 'أضف مغذيات لبدء تتبع مدخولك اليومي')}
                </p>
                <Button 
                  onClick={() => setShowAddNutrient(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {t('Add First Nutrient', 'إضافة أول مغذي')}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Info className="h-5 w-5 mr-2" />
              {t('Micronutrient Tips', 'نصائح عن المغذيات الدقيقة')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="flex items-start cursor-help">
                      <span className="mr-2">•</span>
                      <span>
                        {t('Fat-soluble vitamins (A, D, E, K) are better absorbed with dietary fat', 
                           'الفيتامينات الذائبة في الدهون (أ، د، هـ، ك) تمتص بشكل أفضل مع الدهون الغذائية')}
                      </span>
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('Try eating these vitamins with healthy fats like avocado or olive oil', 
                          'حاول تناول هذه الفيتامينات مع دهون صحية مثل الأفوكادو أو زيت الزيتون')}</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="flex items-start cursor-help">
                      <span className="mr-2">•</span>
                      <span>
                        {t('Vitamin C enhances iron absorption from plant sources', 
                           'فيتامين ج يعزز امتصاص الحديد من المصادر النباتية')}
                      </span>
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('Pair iron-rich plant foods with citrus fruits or bell peppers', 
                          'اجمع بين الأطعمة النباتية الغنية بالحديد والفواكه الحمضية أو الفلفل الحلو')}</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="flex items-start cursor-help">
                      <span className="mr-2">•</span>
                      <span>
                        {t('Calcium and magnesium work together for bone health', 
                           'الكالسيوم والمغنيسيوم يعملان معًا لصحة العظام')}
                      </span>
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('Ensure adequate intake of both minerals for optimal benefits', 
                          'تأكد من تناول كلا المعدنين بكميات كافية للحصول على فوائد مثالية')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default MicronutrientTracker;
