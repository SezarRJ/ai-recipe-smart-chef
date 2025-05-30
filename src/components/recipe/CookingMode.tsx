import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RefreshCw,
  Volume2,
  VolumeX,
  Share2,
  MessageCircle,
  Lock
} from 'lucide-react';
import { Recipe } from '@/types/index';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
  isPremiumUser?: boolean;
}

export const CookingMode: React.FC<CookingModeProps> = ({ recipe, onClose, isPremiumUser = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoContinue, setAutoContinue] = useState(true); // NEW: auto-continue state
  const { toast } = useToast();
  const synthRef = useRef(window.speechSynthesis);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  const totalSteps = recipe.instructions.length;
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);

  // --- Load voices and select a female voice ---
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = synthRef.current.getVoices();
    };
    loadVoices();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const getFemaleVoice = () => {
    // Try to find a female English voice
    const voices = voicesRef.current;
    // Try by name
    let female = voices.find(v => v.name.toLowerCase().includes('female'));
    // Try by gender (not always available)
    if (!female) female = voices.find(v => (v as any).gender === 'female');
    // Try by name containing "woman" or "girl"
    if (!female) female = voices.find(v => v.name.toLowerCase().includes('woman') || v.name.toLowerCase().includes('girl'));
    // Fallback to any English voice
    if (!female) female = voices.find(v => v.lang.startsWith('en'));
    // Fallback to first
    return female || voices[0];
  };

  // --- Voice Synthesis Functions ---
  const speakInstruction = React.useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    synthRef.current.cancel();
    const instruction = recipe.instructions[currentStep];
    if (instruction) {
      const utterance = new window.SpeechSynthesisUtterance(instruction);
      utterance.lang = 'en-US';
      utterance.rate = speechRate;
      const femaleVoice = getFemaleVoice();
      if (femaleVoice) utterance.voice = femaleVoice;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        // --- Auto-continue logic ---
        if (autoContinue && currentStep < totalSteps - 1) {
          setTimeout(() => setCurrentStep(s => s + 1), 500);
        }
      };
      synthRef.current.speak(utterance);
    }
  }, [currentStep, recipe.instructions, speechRate, autoContinue, totalSteps]);

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Speak automatically on step change
  useEffect(() => {
    speakInstruction();
    // Stop speech on unmount
    return () => stopSpeaking();
    // eslint-disable-next-line
  }, [currentStep, speechRate, autoContinue]);

  // --- Timer Logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      toast({
        title: "Timer Complete",
        description: "Your timer has finished!",
      });
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, toast]);

  const nextStep = () => {
    stopSpeaking();
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
    stopSpeaking();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => setTimer(300);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- Nutrition Info (Premium) ---
  const renderNutrition = () => {
    if (!recipe.nutritionalInfo) return null;
    if (!isPremiumUser) {
      return (
        <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
          <Lock className="mr-2 text-wasfah-bright-teal" />
          <span className="text-gray-700 dark:text-gray-300">Full nutrition info is <span className="font-semibold text-wasfah-bright-teal">Premium</span> only.</span>
        </div>
      );
    }
    const { calories, protein, fat, carbs, fiber, sugar } = recipe.nutritionalInfo;
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
        <h3 className="font-bold text-wasfah-deep-teal mb-2">Nutrition Facts</h3>
        <ul className="text-gray-700 dark:text-gray-300 text-sm grid grid-cols-2 gap-x-4 gap-y-1">
          <li><b>Calories:</b> {calories} kcal</li>
          <li><b>Protein:</b> {protein} g</li>
          <li><b>Fat:</b> {fat} g</li>
          <li><b>Carbs:</b> {carbs} g</li>
          <li><b>Fiber:</b> {fiber} g</li>
          {sugar && <li><b>Sugar:</b> {sugar} g</li>}
        </ul>
      </div>
    );
  };

  // --- Share and Comments ---
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: 'Check out this recipe!',
        url: window.location.href,
      });
    } else {
      toast({ title: "Share not supported", description: "Copy the link to share manually." });
    }
  };

  const handleComments = () => {
    toast({ title: "Comments", description: "Open comments section (implement as needed)." });
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft size={24} />
          </Button>
          <h2 className="text-xl font-bold text-wasfah-deep-teal">Cooking Mode</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleShare} aria-label="Share recipe">
              <Share2 size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleComments} aria-label="Comments">
              <MessageCircle size={20} />
            </Button>
          </div>
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

        {/* Nutrition Info */}
        {renderNutrition()}

        {/* Step + Voice Controls */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center">
          <p className="text-lg flex-1">{recipe.instructions[currentStep]}</p>
          <div className="flex flex-col items-center space-y-1 ml-2">
            <Button variant="ghost" size="icon" onClick={speakInstruction} aria-label="Repeat step">
              <Volume2 size={22} />
            </Button>
            <Button variant="ghost" size="icon" onClick={stopSpeaking} aria-label="Stop voice">
              <VolumeX size={22} />
            </Button>
          </div>
        </div>

        {/* Speech Speed & Auto-Continue Control */}
        <div className="flex items-center mb-6">
          <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">Voice Speed:</span>
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={speechRate}
            onChange={e => setSpeechRate(Number(e.target.value))}
            className="w-32 accent-wasfah-bright-teal"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{speechRate.toFixed(1)}x</span>
          <label className="ml-6 flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoContinue}
              onChange={e => setAutoContinue(e.target.checked)}
              className="accent-wasfah-bright-teal"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Auto-continue</span>
          </label>
        </div>
        
        {/* Timer */}
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
        
        {/* Chef Tips */}
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
