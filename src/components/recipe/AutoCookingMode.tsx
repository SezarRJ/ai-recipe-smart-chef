
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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
  ArrowLeft,
  Timer as TimerIcon,
  Video,
  Crown,
  Square,
  SkipForward
} from 'lucide-react';
import { Recipe } from '@/types/index';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

interface AutoCookingModeProps {
  recipe: Recipe;
  onClose: () => void;
}

export const AutoCookingMode: React.FC<AutoCookingModeProps> = ({ 
  recipe, 
  onClose 
}) => {
  const { t, direction } = useRTL();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [autoStepDelay, setAutoStepDelay] = useState(10); // seconds
  const [isMuted, setIsMuted] = useState(false);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);
  const autoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const totalSteps = recipe.instructions.length;
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);

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
      if (autoTimeoutRef.current) {
        clearTimeout(autoTimeoutRef.current);
      }
    };
  }, []);

  // Auto-step progression
  useEffect(() => {
    if (isAutoMode && currentStep < totalSteps - 1) {
      autoTimeoutRef.current = setTimeout(() => {
        nextStep();
      }, autoStepDelay * 1000);
    }

    return () => {
      if (autoTimeoutRef.current) {
        clearTimeout(autoTimeoutRef.current);
      }
    };
  }, [currentStep, isAutoMode, autoStepDelay]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      toast({
        title: t("Timer Complete", "انتهى المؤقت"),
        description: t("Your timer has finished!", "انتهى مؤقتك!"),
      });
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, toast, t]);

  const handleVoiceCommand = (command: string) => {
    const nextCommands = ['next', 'forward', 'التالي'];
    const prevCommands = ['previous', 'back', 'السابق'];
    const repeatCommands = ['repeat', 'again', 'إعادة'];
    const startCommands = ['start', 'begin', 'ابدأ'];
    const pauseCommands = ['stop', 'pause', 'توقف'];
    const autoCommands = ['auto', 'automatic', 'تلقائي'];
    const muteCommands = ['mute', 'silent', 'صامت'];
    
    if (nextCommands.some(cmd => command.includes(cmd))) {
      nextStep();
    } else if (prevCommands.some(cmd => command.includes(cmd))) {
      prevStep();
    } else if (repeatCommands.some(cmd => command.includes(cmd))) {
      speakCurrentStep();
    } else if (startCommands.some(cmd => command.includes(cmd))) {
      setCurrentStep(0);
      speakCurrentStep();
    } else if (pauseCommands.some(cmd => command.includes(cmd))) {
      stopSpeaking();
      setIsAutoMode(false);
    } else if (autoCommands.some(cmd => command.includes(cmd))) {
      setIsAutoMode(!isAutoMode);
    } else if (muteCommands.some(cmd => command.includes(cmd))) {
      setIsMuted(!isMuted);
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
        description: t("Say 'next', 'previous', 'repeat', 'auto', 'mute', or 'stop'", "قل 'التالي'، 'السابق'، 'إعادة'، 'تلقائي'، 'صامت'، أو 'توقف'")
      });
    }
  };

  const speakCurrentStep = () => {
    if (!synthRef.current || !isVoiceEnabled || isMuted) return;

    synthRef.current.cancel();
    
    const stepText = `Step ${currentStep + 1}: ${recipe.instructions[currentStep]}`;
    const utterance = new SpeechSynthesisUtterance(stepText);
    
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
      if (isVoiceEnabled && !isMuted) {
        setTimeout(() => speakCurrentStep(), 500);
      }
    } else {
      setIsAutoMode(false);
      toast({
        title: t("Cooking Complete!", "اكتمل الطبخ!"),
        description: t("You've completed all the steps. Enjoy your meal!", "لقد أكملت جميع الخطوات. استمتع بوجبتك!"),
      });
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (isVoiceEnabled && !isMuted) {
        setTimeout(() => speakCurrentStep(), 500);
      }
    }
  };

  const toggleAutoMode = () => {
    setIsAutoMode(!isAutoMode);
    if (!isAutoMode) {
      toast({
        title: t("Auto Mode Started", "تم تشغيل الوضع التلقائي"),
        description: t(`Steps will advance every ${autoStepDelay} seconds`, `ستتقدم الخطوات كل ${autoStepDelay} ثانية`),
      });
    }
  };

  const stopAutoMode = () => {
    setIsAutoMode(false);
    if (autoTimeoutRef.current) {
      clearTimeout(autoTimeoutRef.current);
    }
    toast({
      title: t("Auto Mode Stopped", "تم إيقاف الوضع التلقائي"),
      description: t("Manual control restored", "تم استعادة التحكم اليدوي"),
    });
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      stopSpeaking();
    }
    toast({
      title: isMuted ? t("Sound On", "تم تشغيل الصوت") : t("Sound Muted", "تم كتم الصوت"),
      description: isMuted ? t("Voice guidance enabled", "تم تمكين الإرشاد الصوتي") : t("Voice guidance muted", "تم كتم الإرشاد الصوتي"),
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className={`sticky top-0 z-10 bg-white border-b border-gray-200 p-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft size={24} className={direction === 'rtl' ? 'rotate-180' : ''} />
          </Button>
          <h2 className="text-xl font-bold text-wasfah-deep-teal">
            {t("Auto Cooking Mode", "وضع الطبخ التلقائي")}
          </h2>
          <div className={`flex items-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Button
              variant={isMuted ? "destructive" : "default"}
              size="sm"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              variant={isAutoMode ? "destructive" : "default"}
              size="sm"
              onClick={isAutoMode ? stopAutoMode : toggleAutoMode}
            >
              {isAutoMode ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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
      
      {/* Content */}
      <div className="flex-grow overflow-auto p-4 space-y-6">
        {/* Progress */}
        <div className="mb-4">
          <div className={`flex justify-between items-center mb-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm font-medium">
              {t(`Step ${currentStep + 1} of ${totalSteps}`, `الخطوة ${currentStep + 1} من ${totalSteps}`)}
            </span>
            <div className="flex items-center gap-2">
              {isAutoMode && (
                <Badge className="bg-green-100 text-green-800">
                  {t("Auto Mode", "وضع تلقائي")}
                </Badge>
              )}
              {isMuted && (
                <Badge className="bg-red-100 text-red-800">
                  {t("Muted", "صامت")}
                </Badge>
              )}
              <span className="text-sm font-medium">{progress}%</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {/* Recipe Image */}
        {recipe.image && (
          <div 
            className="w-full h-48 mb-4 bg-cover bg-center rounded-lg shadow-md"
            style={{ backgroundImage: `url(${recipe.image})` }}
          />
        )}
        
        {/* Current Step */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className={`mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center mb-3">
                <div className="flex-shrink-0 w-10 h-10 bg-wasfah-bright-teal text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {currentStep + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {t(`Step ${currentStep + 1}`, `الخطوة ${currentStep + 1}`)}
                  </h3>
                  {isAutoMode && (
                    <div className="text-sm text-gray-500">
                      {t(`Auto-advancing in ${autoStepDelay}s`, `التقدم التلقائي خلال ${autoStepDelay} ثانية`)}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-lg leading-relaxed mb-4">{recipe.instructions[currentStep]}</p>
              
              {/* Step Actions */}
              <div className="flex flex-wrap gap-2">
                {isVoiceEnabled && !isMuted && (
                  <Button
                    onClick={speakCurrentStep}
                    variant="outline"
                    size="sm"
                    disabled={isSpeaking}
                  >
                    <Volume2 className="mr-2 h-4 w-4" />
                    {isSpeaking ? t('Speaking...', 'يتحدث...') : t('Read Step', 'اقرأ الخطوة')}
                  </Button>
                )}
                <Button
                  onClick={toggleAutoMode}
                  variant={isAutoMode ? "destructive" : "default"}
                  size="sm"
                >
                  {isAutoMode ? <Square className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {isAutoMode ? t('Stop Auto', 'إيقاف التلقائي') : t('Start Auto', 'بدء التلقائي')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voice Status */}
        {(isListening || isSpeaking) && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className={`flex items-center justify-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse text-right' : 'text-left'}`}>
                {isListening && (
                  <>
                    <Mic className="h-4 w-4 text-blue-600 animate-pulse" />
                    <span className="text-sm text-blue-600">
                      {t("Listening for voice commands...", "الاستماع للأوامر الصوتية...")}
                    </span>
                  </>
                )}
                {isSpeaking && (
                  <>
                    <Volume2 className="h-4 w-4 text-blue-600 animate-pulse" />
                    <span className="text-sm text-blue-600">
                      {t("Reading step instructions...", "قراءة تعليمات الخطوة...")}
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className="flex-1"
          >
            <ChevronLeft className={`mr-2 h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
            {t('Previous', 'السابق')}
          </Button>
          
          {currentStep === totalSteps - 1 ? (
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              {t('Finish Cooking', 'إنهاء الطبخ')}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="flex-1 bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal"
            >
              {t('Next', 'التالي')}
              <ChevronRight className={`ml-2 h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
