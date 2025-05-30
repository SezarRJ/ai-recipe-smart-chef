
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RefreshCw,
  ChefHat,
  Volume2
} from 'lucide-react';

interface CookingModeProps {
  recipe: {
    id: string;
    title: string;
    instructions: string[];
    image?: string;
  };
  onClose: () => void;
}

export const CookingMode: React.FC<CookingModeProps> = ({ recipe, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  const speakInstruction = () => {
    const instruction = recipe.instructions[currentStep];
    if ('speechSynthesis' in window && instruction) {
      window.speechSynthesis.cancel();
      const utterance = new window.SpeechSynthesisUtterance(instruction);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const nextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" onClick={onClose}>
          <ChevronLeft size={20} />
          Back
        </Button>
        <h1 className="font-semibold">{recipe.title}</h1>
        <div className="w-16"></div>
      </div>

      {/* Progress */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Step {currentStep + 1} of {recipe.instructions.length}</span>
          <span>{Math.round(((currentStep + 1) / recipe.instructions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-wasfah-orange to-wasfah-green h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / recipe.instructions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-auto p-4">
        {/* Recipe Image */}
        {recipe.image && (
          <div className="mb-6">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Current Step */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">{currentStep + 1}</span>
            </div>
            <h2 className="text-lg font-semibold">Step {currentStep + 1}</h2>
          </div>
        </div>

        {/* Instruction with Voice Button */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center">
          <p className="text-lg flex-1">{recipe.instructions[currentStep]}</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={speakInstruction}
            aria-label="Speak instruction"
            className="ml-2"
          >
            <Volume2 size={22} />
          </Button>
        </div>

        {/* Timer Section */}
        {timer > 0 && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </div>
              <div className="flex gap-2 justify-center">
                <Button size="sm" onClick={toggleTimer}>
                  {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                <Button size="sm" onClick={resetTimer}>
                  <RefreshCw size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t bg-white dark:bg-gray-800">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex-1"
          >
            <ChevronLeft size={16} className="mr-2" />
            Previous
          </Button>
          
          {currentStep === recipe.instructions.length - 1 ? (
            <Button
              onClick={onClose}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <ChefHat size={16} className="mr-2" />
              Finish
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="flex-1 bg-gradient-to-r from-wasfah-orange to-wasfah-green"
            >
              Next
              <ChevronRight size={16} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
