
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Square,
  Clock,
  Users,
  Timer
} from 'lucide-react';

interface EnhancedCookingModeProps {
  recipe: any;
  onClose: () => void;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  isAutoMode?: boolean;
  onToggleAutoMode?: () => void;
  onStopAutoMode?: () => void;
  timeRemaining?: number;
}

export const EnhancedCookingMode: React.FC<EnhancedCookingModeProps> = ({
  recipe,
  onClose,
  currentStep = 0,
  onStepChange = () => {},
  isAutoMode = false,
  onToggleAutoMode = () => {},
  onStopAutoMode = () => {},
  timeRemaining = 3
}) => {
  const totalSteps = recipe.instructions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      onStepChange(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold text-gray-900 truncate">{recipe.title}</h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mt-1">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{recipe.prepTime + recipe.cookTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>
          <div className="w-10" />
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Auto Mode Controls */}
      <div className="p-4">
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-wasfah-bright-teal" />
                  <span className="font-medium">Auto Mode</span>
                </div>
                {isAutoMode && (
                  <Badge variant="secondary" className="bg-wasfah-bright-teal text-white">
                    Next in {timeRemaining}s
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant={isAutoMode ? "default" : "outline"}
                  size="sm"
                  onClick={onToggleAutoMode}
                  className={isAutoMode ? "bg-wasfah-bright-teal hover:bg-wasfah-teal" : ""}
                >
                  {isAutoMode ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isAutoMode ? "Pause" : "Start"}
                </Button>
                {isAutoMode && (
                  <Button variant="outline" size="sm" onClick={onStopAutoMode}>
                    <Square className="h-4 w-4" />
                    Stop
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Step */}
      <div className="px-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <Badge variant="outline" className="mb-4">
                Step {currentStep + 1}
              </Badge>
              <p className="text-lg leading-relaxed text-gray-800">
                {recipe.instructions[currentStep]}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-white/20">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }, (_, index) => (
              <button
                key={index}
                onClick={() => onStepChange(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-wasfah-bright-teal'
                    : index < currentStep
                    ? 'bg-wasfah-bright-teal/50'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={goToNextStep}
            disabled={currentStep === totalSteps - 1}
            className="flex items-center gap-2 bg-wasfah-bright-teal hover:bg-wasfah-teal"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
