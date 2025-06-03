import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Heart, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Apple, 
  Zap,
  Shield,
  Brain,
  Bone,
  Eye,
  Sun
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Nutrient {
  id: string;
  name: string;
  current: number;
  daily_target: number;
  unit: string;
  category: 'vitamin' | 'mineral' | 'other';
  importance: 'critical' | 'important' | 'beneficial';
  food_sources: string[];
  deficiency_symptoms: string[];
  health_benefits: string[];
  icon: any;
}

interface DeficiencyAlert {
  nutrient: string;
  severity: 'low' | 'critical';
  percentage: number;
  recommendation: string;
  food_sources: string[];
}

export const MicronutrientTracker: React.FC = () => {
  const [nutrients, setNutrients] = useState<Nutrient[]>([]);
  const [deficiencyAlerts, setDeficiencyAlerts] = useState<DeficiencyAlert[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const { toast } = useToast();

  // Initialize nutrient data
  useEffect(() => {
    const mockNutrients: Nutrient[] = [
      {
        id: 'vitamin-d',
        name: 'Vitamin D',
        current: 15,
        daily_target: 25,
        unit: 'μg',
        category: 'vitamin',
        importance: 'critical',
        food_sources: ['Fatty fish', 'Egg yolks', 'Fortified milk', 'Mushrooms'],
        deficiency_symptoms: ['Fatigue', 'Bone pain', 'Muscle weakness', 'Mood changes'],
        health_benefits: ['Bone health', 'Immune support', 'Mood regulation'],
        icon: Sun
      },
      {
        id: 'vitamin-b12',
        name: 'Vitamin B12',
        current: 2.1,
        daily_target: 2.4,
        unit: 'μg',
        category: 'vitamin',
        importance: 'critical',
        food_sources: ['Meat', 'Fish', 'Dairy', 'Fortified cereals'],
        deficiency_symptoms: ['Fatigue', 'Memory problems', 'Numbness in hands/feet'],
        health_benefits: ['Energy metabolism', 'Nerve function', 'Red blood cell formation'],
        icon: Zap
      },
      {
        id: 'iron',
        name: 'Iron',
        current: 12,
        daily_target: 18,
        unit: 'mg',
        category: 'mineral',
        importance: 'critical',
        food_sources: ['Red meat', 'Spinach', 'Lentils', 'Dark chocolate'],
        deficiency_symptoms: ['Fatigue', 'Shortness of breath', 'Cold hands/feet', 'Brittle nails'],
        health_benefits: ['Oxygen transport', 'Energy production', 'Immune function'],
        icon: Heart
      },
      {
        id: 'calcium',
        name: 'Calcium',
        current: 800,
        daily_target: 1000,
        unit: 'mg',
        category: 'mineral',
        importance: 'important',
        food_sources: ['Dairy products', 'Leafy greens', 'Almonds', 'Sardines'],
        deficiency_symptoms: ['Muscle cramps', 'Numbness', 'Brittle bones'],
        health_benefits: ['Bone health', 'Muscle function', 'Nerve transmission'],
        icon: Bone
      },
      {
        id: 'omega-3',
        name: 'Omega-3 Fatty Acids',
        current: 1.2,
        daily_target: 1.6,
        unit: 'g',
        category: 'other',
        importance: 'important',
        food_sources: ['Fatty fish', 'Walnuts', 'Flax seeds', 'Chia seeds'],
        deficiency_symptoms: ['Dry skin', 'Poor concentration', 'Joint pain'],
        health_benefits: ['Heart health', 'Brain function', 'Anti-inflammatory'],
        icon: Brain
      },
      {
        id: 'vitamin-a',
        name: 'Vitamin A',
        current: 600,
        daily_target: 900,
        unit: 'μg',
        category: 'vitamin',
        importance: 'important',
        food_sources: ['Carrots', 'Sweet potatoes', 'Spinach', 'Liver'],
        deficiency_symptoms: ['Night blindness', 'Dry eyes', 'Poor immune function'],
        health_benefits: ['Vision', 'Immune function', 'Cell growth'],
        icon: Eye
      }
    ];

    setNutrients(mockNutrients);
    
    // Calculate deficiency alerts
    const alerts: DeficiencyAlert[] = mockNutrients
      .filter(n => n.current / n.daily_target < 0.8)
      .map(n => ({
        nutrient: n.name,
        severity: n.current / n.daily_target < 0.5 ? 'critical' : 'low',
        percentage: Math.round((n.current / n.daily_target) * 100),
        recommendation: `Increase ${n.name} intake by including more ${n.food_sources.slice(0, 2).join(' and ')} in your diet.`,
        food_sources: n.food_sources
      }));

    setDeficiencyAlerts(alerts);
  }, []);

  const getNutrientStatus = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return { status: 'excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (percentage >= 80) return { status: 'good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (percentage >= 50) return { status: 'low', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { status: 'critical', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const getOverallNutritionScore = () => {
    const averagePercentage = nutrients.reduce((sum, n) => sum + (n.current / n.daily_target), 0) / nutrients.length;
    return Math.round(averagePercentage * 100);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vitamin': return Shield;
      case 'mineral': return Bone;
      case 'other': return Apple;
      default: return Apple;
    }
  };

  const generateRecommendations = () => {
    setShowRecommendations(true);
    toast({
      title: "AI Recommendations Generated",
      description: "Personalized nutrition insights based on your data."
    });
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-wasfah-bright-teal" />
              Micronutrient Tracker
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-wasfah-bright-teal">
                {getOverallNutritionScore()}%
              </div>
              <div className="text-sm text-gray-500">Overall Score</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-green-800 dark:text-green-200">
                {nutrients.filter(n => (n.current / n.daily_target) >= 1).length}
              </div>
              <div className="text-sm text-green-600">Optimal</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-semibold text-yellow-800 dark:text-yellow-200">
                {nutrients.filter(n => {
                  const ratio = n.current / n.daily_target;
                  return ratio >= 0.5 && ratio < 1;
                }).length}
              </div>
              <div className="text-sm text-yellow-600">Below Target</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="font-semibold text-red-800 dark:text-red-200">
                {nutrients.filter(n => (n.current / n.daily_target) < 0.5).length}
              </div>
              <div className="text-sm text-red-600">Deficient</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deficiency Alerts */}
      {deficiencyAlerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Deficiency Alerts
          </h3>
          {deficiencyAlerts.map((alert, index) => (
            <Alert key={index} className={alert.severity === 'critical' ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'}>
              <AlertTriangle className={`h-4 w-4 ${alert.severity === 'critical' ? 'text-red-500' : 'text-orange-500'}`} />
              <AlertDescription>
                <div className="font-medium">
                  {alert.nutrient} - {alert.percentage}% of daily target
                </div>
                <div className="text-sm mt-1">{alert.recommendation}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {alert.food_sources.map((source) => (
                    <Badge key={source} variant="secondary" className="text-xs">
                      {source}
                    </Badge>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Detailed Nutrient Tracking */}
      <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedPeriod} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nutrients.map((nutrient) => {
              const status = getNutrientStatus(nutrient.current, nutrient.daily_target);
              const percentage = Math.min((nutrient.current / nutrient.daily_target) * 100, 100);
              const IconComponent = nutrient.icon;
              const CategoryIcon = getCategoryIcon(nutrient.category);

              return (
                <Card key={nutrient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${status.bgColor}`}>
                          <IconComponent className={`h-4 w-4 ${status.color}`} />
                        </div>
                        <div>
                          <h4 className="font-medium">{nutrient.name}</h4>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <CategoryIcon className="h-3 w-3" />
                            {nutrient.category}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={nutrient.importance === 'critical' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {nutrient.importance}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{nutrient.current} {nutrient.unit}</span>
                        <span className="text-gray-500">
                          / {nutrient.daily_target} {nutrient.unit}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="text-xs text-center">
                        <span className={status.color}>
                          {Math.round(percentage)}% of daily target
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      <details className="cursor-pointer">
                        <summary className="text-xs font-medium text-gray-600 hover:text-gray-800">
                          Food Sources
                        </summary>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {nutrient.food_sources.slice(0, 3).map((source) => (
                            <Badge key={source} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </details>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-wasfah-bright-teal" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showRecommendations ? (
            <div className="text-center py-8">
              <Button 
                onClick={generateRecommendations}
                className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
              >
                <Brain className="mr-2 h-4 w-4" />
                Generate Personalized Recommendations
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  💡 Key Insight
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Your Vitamin D and Iron levels suggest you may benefit from more outdoor time and iron-rich foods. 
                  Consider adding spinach salads with citrus (Vitamin C enhances iron absorption) to your weekly meal plan.
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                  🎯 Action Plan
                </h4>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  <li>• Add 2 servings of fatty fish per week (Vitamin D, Omega-3)</li>
                  <li>• Include dark leafy greens in daily meals (Iron, Folate)</li>
                  <li>• Snack on almonds or fortified foods (Calcium, Vitamin E)</li>
                  <li>• Consider 15 minutes of morning sunlight (Natural Vitamin D)</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                  📊 7-Day Progress Goal
                </h4>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Aim to increase your overall nutrition score from {getOverallNutritionScore()}% to 85% by focusing on your top 3 deficient nutrients.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
