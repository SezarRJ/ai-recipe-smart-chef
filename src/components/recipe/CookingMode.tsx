
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Volume2, VolumeX, Lightbulb } from 'lucide-react';
import { CookingModeProps } from '@/types/index';

export const CookingMode: React.FC<CookingModeProps> = ({ recipe, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);

  const totalSteps = recipe.instructions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setTimeRemaining(0);
      setIsTimerRunning(false);
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

  const speakInstruction = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(recipe.instructions[currentStep]);
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsTimerRunning(false);
            // Play completion sound or notification
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get cooking tips from recipe or provide default ones
  const cookingTips = recipe.tips || [
    'Keep all ingredients organized before starting',
    'Read through all steps before beginning',
    'Preheat your oven or pan as needed',
    'Taste and adjust seasonings as you cook'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{recipe.title}</h2>
              <p className="text-gray-600">Cooking Mode</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
              >
                {isSpeechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button onClick={onClose} variant="outline">
                Exit Cooking Mode
              </Button>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep + 1} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Current Step */}
        <div className="p-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Step {currentStep + 1}
                </Badge>
                {isSpeechEnabled && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={speakInstruction}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
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
                        +1 min
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTimeRemaining(timeRemaining + 300)}
                      >
                        +5 min
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
              {cookingTips && cookingTips.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-2">Cooking Tips</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {cookingTips.map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="p-6 border-t">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Step
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Step {currentStep + 1} of {totalSteps}
              </p>
            </div>

            <Button
              onClick={nextStep}
              disabled={currentStep === totalSteps - 1}
              className="gap-2"
            >
              Next Step
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
