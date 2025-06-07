
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const CookMode = () => {
  const { t } = useRTL();
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const mockRecipe = {
    name: t('Classic Mojito', 'موهيتو كلاسيكي'),
    totalTime: 5,
    steps: [
      t('Muddle mint leaves in glass', 'اهرس أوراق النعناع في الكأس'),
      t('Add lime juice and sugar', 'أضف عصير الليمون والسكر'),
      t('Fill with ice and rum', 'املأ بالثلج والروم'),
      t('Top with soda water', 'أضف الصودا في الأعلى'),
      t('Garnish and serve', 'زين وقدم')
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{mockRecipe.name}</span>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {mockRecipe.totalTime}m
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">
              {t('Step', 'خطوة')} {currentStep + 1} {t('of', 'من')} {mockRecipe.steps.length}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              {mockRecipe.steps[currentStep]}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              {t('Previous', 'السابق')}
            </Button>
            
            <Button
              onClick={() => setIsActive(!isActive)}
              className="min-w-24"
            >
              {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isActive ? t('Pause', 'إيقاف') : t('Start', 'بدء')}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.min(mockRecipe.steps.length - 1, currentStep + 1))}
              disabled={currentStep === mockRecipe.steps.length - 1}
            >
              {t('Next', 'التالي')}
            </Button>
          </div>

          <div className="flex justify-center">
            <Button variant="ghost" onClick={() => setCurrentStep(0)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              {t('Restart', 'إعادة البدء')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookMode;
