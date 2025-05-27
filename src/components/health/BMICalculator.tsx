
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Award, Calculator, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useRTL } from '@/contexts/RTLContext';

interface BMICalculatorProps {
  userWeight: number;
  userHeight: number;
  userTargetWeight: number;
  initialWeight: number;
  initialHeight?: number;
  isHealthGoalsOpen: boolean;
  setIsHealthGoalsOpen: (isOpen: boolean) => void;
  onUpdateGoals?: ({ weight, height, targetWeight }: { weight: any; height: any; targetWeight: any; }) => void;
}

export const BMICalculator: React.FC<BMICalculatorProps> = ({
  userWeight,
  userHeight,
  userTargetWeight,
  initialWeight,
  isHealthGoalsOpen,
  setIsHealthGoalsOpen,
  onUpdateGoals,
  initialHeight
}) => {
  const { t, direction } = useRTL();
  
  // Calculate BMI
  const bmi = userWeight / ((userHeight / 100) * (userHeight / 100));
  const bmiCategory = 
    bmi < 18.5 ? t("Underweight", "نقص الوزن") :
    bmi < 25 ? t("Healthy", "صحي") :
    bmi < 30 ? t("Overweight", "زيادة الوزن") : t("Obese", "سمنة");
  
  // Calculate weight loss progress
  const weightLossGoal = initialWeight - userTargetWeight;
  const currentProgress = initialWeight - userWeight;
  const progressPercentage = (currentProgress / weightLossGoal) * 100;
  
  return (
    <Card className="border-2 border-wasfah-bright-teal/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-wasfah-light-gray to-wasfah-light-mint/10 dark:from-gray-800 dark:to-gray-800/80 pb-2">
        <CardTitle className="flex items-center text-wasfah-deep-teal dark:text-wasfah-bright-teal">
          <Brain className="h-5 w-5 mr-2" />
          {t('AI Health Analysis', 'تحليل الصحة بالذكاء الاصطناعي')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{t('Current BMI', 'مؤشر كتلة الجسم الحالي')}</p>
              <p className="text-xl font-bold">{bmi.toFixed(1)}</p>
              <p className={`text-sm ${
                bmiCategory === t("Healthy", "صحي") ? "text-green-500" : 
                bmiCategory === t("Underweight", "نقص الوزن") ? "text-blue-500" : "text-orange-500"
              }`}>{bmiCategory}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('Weight Goal Progress', 'تقدم هدف الوزن')}</p>
              <div className="flex items-center">
                <p className="text-xl font-bold">{progressPercentage.toFixed(0)}%</p>
                <Award className={`ml-2 h-5 w-5 ${
                  progressPercentage > 75 ? "text-green-500" :
                  progressPercentage > 50 ? "text-blue-500" :
                  progressPercentage > 25 ? "text-yellow-500" : "text-gray-400"
                }`} />
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{t('Starting', 'البداية')} ({initialWeight}kg)</span>
              <span>{t('Current', 'الحالي')} ({userWeight}kg)</span>
              <span>{t('Target', 'الهدف')} ({userTargetWeight}kg)</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <Collapsible open={isHealthGoalsOpen} onOpenChange={setIsHealthGoalsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="flex w-full justify-between">
                <span className="flex items-center">
                  <Calculator className="h-4 w-4 mr-1" /> {t('Health Metrics Details', 'تفاصيل مقاييس الصحة')}
                </span>
                {isHealthGoalsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-gray-500">{t('Height', 'الطول')}</p>
                  <p className="font-medium">{userHeight} cm</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">{t('Current Weight', 'الوزن الحالي')}</p>
                  <p className="font-medium">{userWeight} kg</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">{t('Target Weight', 'الوزن المستهدف')}</p>
                  <p className="font-medium">{userTargetWeight} kg</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">{t('Recommended Daily Calories', 'السعرات الحرارية اليومية الموصى بها')}</p>
                  <p className="font-medium">2,100 kcal</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};
