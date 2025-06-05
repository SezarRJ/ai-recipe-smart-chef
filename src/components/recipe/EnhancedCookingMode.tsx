
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Timer as TimerIcon,
  RotateCcw,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';
import { VoiceRecipeAssistant } from '@/components/ai/VoiceRecipeAssistant';

interface Recipe {
  id: string;
  title: string;
  image?: string;
  instructions: string[];
  ingredients?: Array<{ id: string; name: string; amount: number; unit: string }>;
  tips?: string[];
}

interface EnhancedCookingModeProps {
  recipe: Recipe;
  onClose: () => void;
  currentStep: number;
  onStepChange: (step: number) => void;
  isAutoMode: boolean;
  onToggleAutoMode: () => void;
  onStopAutoMode: () => void;
  timeRemaining: number;
}

export const EnhancedCookingMode: React.FC<EnhancedCookingModeProps> = ({
  recipe,
  onClose,
  currentStep,
  onStepChange,
  isAutoMode,
  onToggleAutoMode,
  onStopAutoMode,
  timeRemaining
}) => {
  const { t, direction } = useRTL();
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const { toast } = useToast();
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);
  const autoReadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const totalSteps = recipe.instructions.length;
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        handleVoiceCommand(command);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: t("Voice recognition error", "خطأ في التعرف على الصوت"),
          description: t("Please try again", "يرجى المحاولة مرة أخرى"),
          variant: "destructive"
        });
      };
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (autoReadTimeoutRef.current) {
        clearTimeout(autoReadTimeoutRef.current);
      }
    };
  }, []);

  // Auto-read current step with 3 second delay
  useEffect(() => {
    if (isAutoMode && isVoiceEnabled && !isSpeaking) {
      autoReadTimeoutRef.current = setTimeout(() => {
        speakCurrentStep();
      }, 3000);
    }

    return () => {
      if (autoReadTimeoutRef.current) {
        clearTimeout(autoReadTimeoutRef.current);
      }
    };
  }, [currentStep, isAutoMode, isVoiceEnabled]);

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    
    const nextCommands = ['next', 'forward', 'التالي'];
    const prevCommands = ['previous', 'back', 'السابق'];
    const repeatCommands = ['repeat', 'again', 'إعادة'];
    const pauseCommands = ['pause', 'stop', 'توقف'];
    
    if (nextCommands.some(cmd => command.includes(cmd))) {
      nextStep();
    } else if (prevCommands.some(cmd => command.includes(cmd))) {
      prevStep();
    } else if (repeatCommands.some(cmd => command.includes(cmd))) {
      speakCurrentStep();
    } else if (pauseCommands.some(cmd => command.includes(cmd))) {
      stopSpeaking();
    }
  };

  const speakCurrentStep = () => {
    if (!synthRef.current || !isVoiceEnabled) return;

    synthRef.current.cancel();
    
    const stepText = `Step ${currentStep + 1}: ${recipe.instructions[currentStep]}`;
    const utterance = new SpeechSynthesisUtterance(stepText);
    utterance.rate = 0.7; // Slower, more aromatic speaking
    utterance.pitch = 1.1; // Slightly higher pitch for clarity
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: t("Voice recognition not supported", "التعرف على الصوت غير مدعوم"),
        description: t("Your browser doesn't support voice recognition", "متصفحك لا يدعم التعرف على الصوت"),
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: t("Voice assistant activated", "تم تفعيل المساعد الصوتي"),
        description: t("Say 'next', 'previous', 'repeat', or 'pause'", "قل 'التالي'، 'السابق'، 'إعادة'، أو 'توقف'")
      });
    }
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      onStepChange(currentStep + 1);
    } else {
      toast({
        title: t("Cooking Complete!", "اكتمل الطبخ!"),
        description: t("You've completed all the steps. Enjoy your meal!", "لقد أكملت جميع الخطوات. استمتع بوجبتك!"),
      });
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className={`sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft size={24} className={direction === 'rtl' ? 'rotate-180' : ''} />
          </Button>
          <h2 className="text-xl font-bold text-wasfah-deep-teal">
            {recipe.title}
          </h2>
          <div className={`flex items-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Button
              variant={isVoiceEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button
              variant={isListening ? "destructive" : "default"}
              size="sm"
              onClick={toggleListening}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              variant={showVoiceAssistant ? "default" : "outline"}
              size="sm"
              onClick={() => setShowVoiceAssistant(!showVoiceAssistant)}
            >
              <TimerIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-4">
        {/* Progress */}
        <div className="mb-6">
          <div className={`flex justify-between items-center mb-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm font-medium">
              {t(`Step ${currentStep + 1} of ${totalSteps}`, `الخطوة ${currentStep + 1} من ${totalSteps}`)}
            </span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Auto Mode Controls */}
        {isAutoMode && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className="flex items-center space-x-2">
                <Badge variant="default" className="bg-blue-500">
                  {t('Auto Mode', 'الوضع التلقائي')}
                </Badge>
                <span className="text-sm">
                  {t(`Next step in ${timeRemaining}s`, `الخطوة التالية في ${timeRemaining}ث`)}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={onStopAutoMode}>
                {t('Stop Auto', 'إيقاف التلقائي')}
              </Button>
            </div>
          </div>
        )}
        
        {/* Recipe Image */}
        {recipe.image && (
          <div 
            className="w-full h-48 mb-6 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${recipe.image})` }}
          />
        )}
        
        {/* Current Step */}
        <div className={`mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-start justify-between mb-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-2xl font-bold text-wasfah-deep-teal mb-4">
              {t(`Step ${currentStep + 1}`, `الخطوة ${currentStep + 1}`)}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={speakCurrentStep}
              disabled={!isVoiceEnabled || isSpeaking}
              className="flex items-center space-x-2"
            >
              {isSpeaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{t('Read Step', 'اقرأ الخطوة')}</span>
            </Button>
          </div>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {recipe.instructions[currentStep]}
          </p>
        </div>

        {/* Voice Assistant */}
        {showVoiceAssistant && (
          <div className="mb-6">
            <VoiceRecipeAssistant 
              recipe={recipe} 
              onStepChange={onStepChange}
            />
          </div>
        )}

        {/* Voice Status Indicator */}
        {(isListening || isSpeaking) && (
          <div className={`mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            {isListening && (
              <>
                <Mic className="h-4 w-4 text-blue-600 animate-pulse" />
                <span className="text-sm text-blue-600">
                  {t("Listening for commands...", "أستمع للأوامر...")}
                </span>
              </>
            )}
            {isSpeaking && (
              <>
                <Volume2 className="h-4 w-4 text-green-600 animate-pulse" />
                <span className="text-sm text-green-600">
                  {t("Speaking instructions...", "أتحدث بالتعليمات...")}
                </span>
              </>
            )}
          </div>
        )}
        
        {/* Chef Tips */}
        {recipe.tips && recipe.tips[currentStep] && (
          <div className={`mb-6 p-4 bg-wasfah-light-gray dark:bg-gray-800 rounded-lg border-l-4 border-wasfah-bright-teal ${direction === 'rtl' ? 'border-r-4 border-l-0 text-right' : 'text-left'}`}>
            <p className="text-wasfah-deep-teal">
              <span className="font-bold">{t("Chef Tip:", "نصيحة الشيف:")}</span> {recipe.tips[currentStep]}
            </p>
          </div>
        )}
      </div>
      
      {/* Navigation Footer */}
      <div className={`sticky bottom-0 z-10 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className={`flex justify-between items-center ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 w-32 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}
          >
            <ArrowLeft size={16} className={direction === 'rtl' ? 'rotate-180' : ''} />
            <span>{t("Previous", "السابق")}</span>
          </Button>
          
          <div className={`flex items-center space-x-4 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStepChange(0)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant={isAutoMode ? "destructive" : "default"}
              size="sm"
              onClick={onToggleAutoMode}
            >
              {isAutoMode ? t('Stop Auto', 'إيقاف التلقائي') : t('Auto Mode', 'الوضع التلقائي')}
            </Button>
          </div>
          
          <Button
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className={`flex items-center space-x-2 w-32 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white ${direction === 'rtl' ? 'space-x-reverse' : ''}`}
          >
            <span>{t("Next", "التالي")}</span>
            <ArrowRight size={16} className={direction === 'rtl' ? 'rotate-180' : ''} />
          </Button>
        </div>
      </div>
    </div>
  );
};
