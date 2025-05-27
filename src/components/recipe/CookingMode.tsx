
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RefreshCw,
  ChefHat 
} from 'lucide-react';
import { Recipe } from '@/types';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
}

export const CookingMode: React.FC<CookingModeProps> = ({ recipe, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { toast } = useToast();
  
  const totalSteps = recipe.instructions.length;
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);
  
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Cooking Complete!",
        description: "You've completed all the steps. Enjoy your meal!",
      });
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
    setTimer(300);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      toast({
        title: "Timer Complete",
        description: "Your timer has finished!",
      });
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, toast]);
  
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft size={24} />
          </Button>
          <h2 className="text-xl font-bold text-wasfah-deep-teal">Cooking Mode</h2>
          <div className="w-9"></div> {/* Spacer for alignment */}
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Step {currentStep + 1} of {totalSteps}</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {recipe.image && (
          <div 
            className="w-full h-48 mb-4 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${recipe.image})` }}
          />
        )}
        
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-lg">{recipe.instructions[currentStep]}</p>
        </div>
        
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" size="icon" onClick={resetTimer}>
              <RefreshCw size={18} />
            </Button>
            <div className="text-2xl font-bold">{formatTime(timer)}</div>
            <Button variant="outline" size="icon" onClick={toggleTimer}>
              {isTimerRunning ? <Pause size={18} /> : <Play size={18} />}
            </Button>
          </div>
        </div>
        
        {recipe.tips && recipe.tips[currentStep] && (
          <div className="mb-6 p-4 bg-wasfah-light-gray dark:bg-gray-800 rounded-lg border-l-4 border-wasfah-bright-teal">
            <p className="chef-notes text-wasfah-deep-teal">
              <span className="font-bold">Chef Tip:</span> {recipe.tips[currentStep]}
            </p>
          </div>
        )}
      </div>
      
      <div className="sticky bottom-0 z-10 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="w-28"
          >
            <ChevronLeft size={16} className="mr-1" />
            Previous
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className="w-28 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
          >
            Next
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
