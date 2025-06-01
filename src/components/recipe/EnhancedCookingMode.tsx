
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, ChevronRight, Play, Pause, RotateCcw, 
  Volume2, VolumeX, Lightbulb, Clock, X, 
  Info, Utensils, AlertCircle, CheckCircle
} from 'lucide-react';
import { useVoiceLanguage } from '@/hooks/useVoiceLanguage';
import { Recipe } from '@/types/index';

interface EnhancedCookingModeProps {
  recipe: Recipe;
  onClose: () => void;
}

export const EnhancedCookingMode: React.FC<EnhancedCookingModeProps> = ({ recipe, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showNutrition, setShowNutrition] = useState(false);
  const { speak, stop, isSupported: voiceSupported, currentVoice } = useVoiceLanguage();

  const totalSteps = recipe.instructions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      // Mark current step as completed
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
      setTimeRemaining(0);
      setIsTimerRunning(false);
      
      // Speak next instruction if voice is enabled
      if (voiceSupported) {
        setTimeout(() => {
          speak(recipe.instructions[currentStep + 1]);
        }, 500);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimeRemaining(0);
      setIsTimerRunning(false);
    }
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setTimeRemaining(0);
    setIsTimerRunning(false);
  };

  const speakCurrentInstruction = () => {
    if (voiceSupported) {
      stop(); // Stop any current speech
      speak(recipe.instructions[currentStep]);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsTimerRunning(false);
            // Play completion notification
            if (voiceSupported) {
              speak("Timer finished! Time to move to the next step.");
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, voiceSupported, speak]);

  // Auto-speak first instruction when component mounts
  useEffect(() => {
    if (voiceSupported && currentStep === 0) {
      setTimeout(() => {
        speak(`Starting cooking ${recipe.title}. ${recipe.instructions[0]}`);
      }, 1000);
    }
  }, [recipe.title, recipe.instructions, voiceSupported, speak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nutritionData = [
    { label: 'Calories', value: recipe.calories || 0, unit: 'kcal' },
    { label: 'Protein', value: recipe.protein || 0, unit: 'g' },
    { label: 'Carbs', value: recipe.carbs || 0, unit: 'g' },
    { label: 'Fat', value: recipe.fat || 0, unit: 'g' }
  ];

  const isLastStep = currentStep === totalSteps - 1;
  const isStepCompleted = completedSteps.includes(currentStep);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold truncate">{recipe.title}</h2>
              <div className="flex items-center gap-4 mt-1">
                <Badge variant="outline" className="text-xs">
                  <Utensils className="h-3 w-3 mr-1" />
                  {recipe.servings} servings
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {recipe.cook_time}min
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Difficulty: {recipe.difficulty}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {voiceSupported && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={speakCurrentInstruction}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNutrition(!showNutrition)}
              >
                <Info className="h-4 w-4" />
              </Button>
              <Button onClick={onClose} variant="outline" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep + 1} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </div>

        {/* Nutrition Panel */}
        {showNutrition && (
          <div className="p-4 bg-blue-50 border-b">
            <h3 className="font-medium mb-2">Nutrition per serving</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              {nutritionData.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-2">
                  <div className="text-lg font-bold text-blue-600">{item.value}</div>
                  <div className="text-xs text-gray-600">{item.unit}</div>
                  <div className="text-xs font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Step */}
        <div className="p-6">
          <Card className={`border-2 ${isStepCompleted ? 'border-green-500 bg-green-50' : 'border-blue-500'}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`${isStepCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-50 text-blue-700'}`}
                  >
                    {isStepCompleted ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    Step {currentStep + 1}
                  </Badge>
                  {isStepCompleted && (
                    <Badge className="bg-green-500 text-white text-xs">
                      Completed
                    </Badge>
                  )}
                </div>
                
                {voiceSupported && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={speakCurrentInstruction}
                    className="shrink-0"
                  >
                    <Volume2 className="h-4 w-4 mr-1" />
                    Read Aloud
                  </Button>
                )}
              </div>
              
              <p className="text-lg leading-relaxed mb-6">
                {recipe.instructions[currentStep]}
              </p>

              {/* Timer Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-mono font-bold">
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTimeRemaining(timeRemaining + 60)}
                      >
                        +1min
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTimeRemaining(timeRemaining + 300)}
                      >
                        +5min
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTimeRemaining(timeRemaining + 600)}
                      >
                        +10min
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleTimer}
                      disabled={timeRemaining === 0}
                    >
                      {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={resetTimer}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-2">Cooking Tips</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Keep all ingredients within reach</li>
                      <li>• Taste and adjust seasonings as needed</li>
                      <li>• Use the timer to avoid overcooking</li>
                      <li>• Clean as you go to stay organized</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Step {currentStep + 1} of {totalSteps}
              </p>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      completedSteps.includes(i)
                        ? 'bg-green-500'
                        : i === currentStep
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {isLastStep ? (
              <Button
                onClick={onClose}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4" />
                Finish Cooking
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="gap-2"
              >
                Next Step
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
