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
        description: t("Say commands like 'next', 'previous', 'auto', 'mute'", "قل أوامر مثل 'التالي'، 'السابق'، 'تلقائي'، 'صامت'")
      });
    }
  };

  const speakCurrentStep = () => {
    if (!synthRef.current || isMuted) return;

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `Step ${currentStep + 1}: ${recipe.instructions[currentStep]}`
    );
    
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
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      if (!isMuted) {
        setTimeout(() => speakCurrentStep(), 500);
      }
    } else {
      setIsAutoMode(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      if (!isMuted) {
        setTimeout(() => speakCurrentStep(), 500);
      }
    }
  };

  const toggleAutoMode = () => {
    setIsAutoMode(!isAutoMode);
    if (!isAutoMode && !isMuted) {
      speakCurrentStep();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t("Exit", "خروج")}
        </Button>
        
        <div className="flex items-center gap-2">
          {isAutoMode && (
            <Badge className="bg-green-500 text-white animate-pulse">
              {t("Auto Mode", "الوضع التلقائي")}
            </Badge>
          )}
          {isMuted && (
            <Badge className="bg-red-500 text-white">
              {t("Muted", "صامت")}
            </Badge>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2">
        <div className="flex justify-between text-sm mb-2">
          <span>{t("Step", "خطوة")} {currentStep + 1} {t("of", "من")} {totalSteps}</span>
          <span>{progress}% {t("Complete", "مكتمل")}</span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-700" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Recipe Info */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <h1 className="text-xl font-bold mb-2">{recipe.title}</h1>
            <div className="flex gap-4 text-sm text-gray-300">
              <span>{t("Prep", "تحضير")}: {recipe.prep_time}m</span>
              <span>{t("Cook", "طبخ")}: {recipe.cook_time}m</span>
              <span>{t("Serves", "يخدم")}: {recipe.servings}</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Step */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-200">
              {t("Step", "خطوة")} {currentStep + 1}
            </h2>
            <p className="text-lg leading-relaxed">
              {recipe.instructions[currentStep]}
            </p>
          </CardContent>
        </Card>

        {/* Timer */}
        {timer > 0 && (
          <Card className="bg-orange-600/20 backdrop-blur-sm border-orange-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-mono text-orange-200">
                {formatTime(timer)}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Voice Status */}
        {(isListening || isSpeaking) && (
          <Card className="bg-green-600/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-3">
              <div className="flex items-center justify-center gap-2">
                {isListening && (
                  <>
                    <Mic className="h-4 w-4 animate-pulse" />
                    <span>{t("Listening for commands...", "الاستماع للأوامر...")}</span>
                  </>
                )}
                {isSpeaking && (
                  <>
                    <Volume2 className="h-4 w-4 animate-pulse" />
                    <span>{t("Speaking instructions...", "قراءة التعليمات...")}</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 space-y-4 bg-black/50 backdrop-blur-sm">
        {/* Navigation Controls */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={speakCurrentStep}
            disabled={isMuted || isSpeaking}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <Volume2 className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Voice & Auto Controls */}
        <div className="flex justify-center gap-2">
          <Button
            variant={isListening ? "destructive" : "secondary"}
            size="sm"
            onClick={toggleListening}
            className="flex items-center gap-2"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {t("Voice", "صوت")}
          </Button>
          
          <Button
            variant={isAutoMode ? "default" : "secondary"}
            size="sm"
            onClick={toggleAutoMode}
            className="flex items-center gap-2"
          >
            {isAutoMode ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {t("Auto", "تلقائي")}
          </Button>
          
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-2"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {t("Sound", "صوت")}
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={stopSpeaking}
            className="flex items-center gap-2"
          >
            <Square className="h-4 w-4" />
            {t("Stop", "توقف")}
          </Button>
        </div>

        {/* Voice Commands Help */}
        <div className="text-center text-xs text-gray-400">
          {t("Voice commands: 'next', 'previous', 'repeat', 'auto', 'mute', 'stop'", 
             "أوامر صوتية: 'التالي'، 'السابق'، 'إعادة'، 'تلقائي'، 'صامت'، 'توقف'")}
        </div>
      </div>
    </div>
  );
};
