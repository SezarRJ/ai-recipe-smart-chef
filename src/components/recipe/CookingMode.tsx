
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RefreshCw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Timer as TimerIcon,
  Video,
  VideoOff,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Recipe } from '@/types/index';
import { Progress } from '@/components/ui/progress';
import { Timer } from '@/components/cooking/Timer';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';
import { VoiceRecipeAssistant } from '@/components/ai/VoiceRecipeAssistant';

interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
}

export const CookingMode: React.FC<CookingModeProps> = ({ recipe, onClose }) => {
  const { t, language, direction } = useRTL();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isAutoMode, setIsAutoMode] = useState(false);
  const { toast } = useToast();
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);
  const autoStepTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const totalSteps = recipe.instructions.length;
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      
      // Set language based on app language
      switch (language) {
        case 'ar':
          recognitionRef.current.lang = 'ar-SA';
          break;
        case 'tr':
          recognitionRef.current.lang = 'tr-TR';
          break;
        default:
          recognitionRef.current.lang = 'en-US';
      }

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
      if (autoStepTimeoutRef.current) {
        clearTimeout(autoStepTimeoutRef.current);
      }
    };
  }, [language]);

  // Auto-advance effect for step-by-step reading
  useEffect(() => {
    if (isAutoMode && isVoiceEnabled) {
      // Wait 3 seconds then speak current step
      autoStepTimeoutRef.current = setTimeout(() => {
        speakCurrentStep();
      }, 3000);
    }

    return () => {
      if (autoStepTimeoutRef.current) {
        clearTimeout(autoStepTimeoutRef.current);
      }
    };
  }, [currentStep, isAutoMode, isVoiceEnabled]);

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    
    // Commands in different languages
    const nextCommands = ['next', 'forward', 'التالي', 'sonraki'];
    const prevCommands = ['previous', 'back', 'السابق', 'önceki'];
    const repeatCommands = ['repeat', 'again', 'إعادة', 'tekrar'];
    const timerCommands = ['timer', 'set timer', 'مؤقت', 'zamanlayıcı'];
    const completeCommands = ['done', 'complete', 'finished', 'تم', 'انتهيت', 'tamamlandı'];
    const autoCommands = ['auto mode', 'start auto', 'وضع تلقائي', 'otomatik mod'];
    
    if (nextCommands.some(cmd => command.includes(cmd))) {
      nextStep();
    } else if (prevCommands.some(cmd => command.includes(cmd))) {
      prevStep();
    } else if (repeatCommands.some(cmd => command.includes(cmd))) {
      speakCurrentStep();
    } else if (timerCommands.some(cmd => command.includes(cmd))) {
      setShowTimer(true);
    } else if (completeCommands.some(cmd => command.includes(cmd))) {
      toggleStepComplete(currentStep);
    } else if (autoCommands.some(cmd => command.includes(cmd))) {
      setIsAutoMode(!isAutoMode);
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
        description: language === 'ar' 
          ? "قل 'التالي'، 'السابق'، 'إعادة'، 'مؤقت'، 'تم'، أو 'وضع تلقائي'"
          : language === 'tr'
          ? "Söyle 'sonraki', 'önceki', 'tekrar', 'zamanlayıcı', 'tamamlandı', veya 'otomatik mod'"
          : "Say 'next', 'previous', 'repeat', 'timer', 'done', or 'auto mode'"
      });
    }
  };

  const speakCurrentStep = () => {
    if (!synthRef.current || !isVoiceEnabled) return;

    synthRef.current.cancel();
    
    const stepText = language === 'ar' 
      ? `الخطوة ${currentStep + 1}: ${recipe.instructions[currentStep]}`
      : language === 'tr'
      ? `Adım ${currentStep + 1}: ${recipe.instructions[currentStep]}`
      : `Step ${currentStep + 1}: ${recipe.instructions[currentStep]}`;
    
    const utterance = new SpeechSynthesisUtterance(stepText);
    
    // Set voice properties for aromatic speaking
    utterance.rate = 0.7; // Slower, more deliberate
    utterance.pitch = 1.1; // Slightly higher pitch for clarity
    utterance.volume = 1;
    
    // Set voice language
    const voices = synthRef.current.getVoices();
    let voice = null;
    
    switch (language) {
      case 'ar':
        voice = voices.find(v => v.lang.includes('ar')) || null;
        utterance.lang = 'ar-SA';
        break;
      case 'tr':
        voice = voices.find(v => v.lang.includes('tr')) || null;
        utterance.lang = 'tr-TR';
        break;
      default:
        voice = voices.find(v => v.lang.includes('en')) || null;
        utterance.lang = 'en-US';
    }
    
    if (voice) {
      utterance.voice = voice;
    }
    
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
  
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: t("Cooking Complete!", "اكتمل الطبخ!"),
        description: t("You've completed all the steps. Enjoy your meal!", "لقد أكملت جميع الخطوات. استمتع بوجبتك!"),
      });
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleStepComplete = (stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  // Auto-speak current step when voice is enabled or step changes
  useEffect(() => {
    if (isVoiceEnabled && !isAutoMode) {
      setTimeout(() => speakCurrentStep(), 1000);
    }
  }, [currentStep, isVoiceEnabled]);
  
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className={`sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft size={24} className={direction === 'rtl' ? 'rotate-180' : ''} />
          </Button>
          <h2 className="text-xl font-bold text-wasfah-deep-teal">
            {t("Cooking Mode", "وضع الطبخ")}
          </h2>
          <div className={`flex items-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Button
              variant={showVoiceAssistant ? "default" : "outline"}
              size="sm"
              onClick={() => setShowVoiceAssistant(!showVoiceAssistant)}
              className="text-xs"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              variant={showVideo ? "default" : "outline"}
              size="sm"
              onClick={() => setShowVideo(!showVideo)}
              className="text-xs"
            >
              {showVideo ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            </Button>
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
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-4">
        <div className="mb-4">
          <div className={`flex justify-between items-center mb-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm font-medium">
              {t(`Step ${currentStep + 1} of ${totalSteps}`, `الخطوة ${currentStep + 1} من ${totalSteps}`)}
            </span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Auto Mode Indicator */}
        {isAutoMode && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-medium text-blue-600">
                {t('Auto Mode Active - Steps will be read automatically', 'الوضع التلقائي نشط - سيتم قراءة الخطوات تلقائياً')}
              </span>
              <Button variant="outline" size="sm" onClick={() => setIsAutoMode(false)}>
                {t('Stop', 'إيقاف')}
              </Button>
            </div>
          </div>
        )}

        {/* Voice Recipe Assistant */}
        {showVoiceAssistant && (
          <div className="mb-6">
            <VoiceRecipeAssistant 
              recipe={recipe} 
              onStepChange={setCurrentStep}
            />
          </div>
        )}
        
        {/* Video Section (Premium Feature) */}
        {showVideo && (
          <div className="w-full h-48 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Video className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">{t('Video instructions (Premium)', 'تعليمات فيديو (مميز)')}</p>
            </div>
          </div>
        )}
        
        {recipe.image && !showVideo && (
          <div 
            className="w-full h-48 mb-4 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${recipe.image})` }}
          />
        )}
        
        <div className={`mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-start justify-between mb-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <p className="text-lg leading-relaxed flex-1">{recipe.instructions[currentStep]}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleStepComplete(currentStep)}
              className={`ml-4 ${direction === 'rtl' ? 'mr-4 ml-0' : ''} ${
                completedSteps.has(currentStep) ? 'bg-green-100 text-green-700 border-green-300' : ''
              }`}
            >
              {completedSteps.has(currentStep) ? t('Completed', 'مكتمل') : t('Mark Done', 'تم')}
            </Button>
          </div>
          
          {/* Voice Instructions Controls */}
          <div className={`flex items-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Button
              variant="outline"
              size="sm"
              onClick={speakCurrentStep}
              disabled={!isVoiceEnabled || isSpeaking}
            >
              {isSpeaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="ml-1">{t('Read Step', 'اقرأ الخطوة')}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTimer(!showTimer)}
            >
              <TimerIcon className="h-4 w-4" />
              <span className="ml-1">{t('Timer', 'مؤقت')}</span>
            </Button>
            <Button
              variant={isAutoMode ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsAutoMode(!isAutoMode)}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="ml-1">{isAutoMode ? t('Stop Auto', 'إيقاف التلقائي') : t('Auto Mode', 'وضع تلقائي')}</span>
            </Button>
          </div>
        </div>

        {/* Timer Section (Premium Feature) */}
        {showTimer && (
          <Timer 
            initialMinutes={5}
            label={t(`Timer for Step ${currentStep + 1}`, `مؤقت للخطوة ${currentStep + 1}`)}
          />
        )}

        {/* Voice status indicator */}
        {(isListening || isSpeaking) && (
          <div className={`mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse text-right' : 'text-left'}`}>
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
        
        {recipe.tips && recipe.tips[currentStep] && (
          <div className={`mb-6 p-4 bg-wasfah-light-gray dark:bg-gray-800 rounded-lg border-l-4 border-wasfah-bright-teal ${direction === 'rtl' ? 'border-r-4 border-l-0 text-right' : 'text-left'}`}>
            <p className="chef-notes text-wasfah-deep-teal">
              <span className="font-bold">{t("Chef Tip:", "نصيحة الشيف:")}</span> {recipe.tips[currentStep]}
            </p>
          </div>
        )}
      </div>
      
      <div className={`sticky bottom-0 z-10 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className={`flex justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`w-32 flex items-center gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft size={16} className={direction === 'rtl' ? 'rotate-180' : ''} />
            {t("Previous", "السابق")}
          </Button>
          
          <div className={`flex items-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Button
              variant="outline"
              size="sm"
              onClick={speakCurrentStep}
              disabled={!isVoiceEnabled || isSpeaking}
            >
              {isSpeaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          
          <Button
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className={`w-32 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white flex items-center gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
          >
            {t("Next", "التالي")}
            <ArrowRight size={16} className={direction === 'rtl' ? 'rotate-180' : ''} />
          </Button>
        </div>
      </div>
    </div>
  );
};
