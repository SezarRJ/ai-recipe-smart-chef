
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

interface Recipe {
  id?: string;
  title: string;
  instructions: string[];
  ingredients?: Array<{ id?: string; name: string; amount: number; unit: string }>;
  tips?: string[];
}

interface VoiceRecipeAssistantProps {
  recipe: Recipe;
  onStepChange?: (step: number) => void;
}

export const VoiceRecipeAssistant: React.FC<VoiceRecipeAssistantProps> = ({ 
  recipe, 
  onStepChange 
}) => {
  const { t, direction } = useRTL();
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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
    };
  }, []);

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    
    const nextCommands = ['next', 'forward', 'التالي'];
    const prevCommands = ['previous', 'back', 'السابق'];
    const repeatCommands = ['repeat', 'again', 'إعادة'];
    const playCommands = ['play', 'start', 'تشغيل'];
    const pauseCommands = ['pause', 'stop', 'توقف'];
    
    if (nextCommands.some(cmd => command.includes(cmd))) {
      nextStep();
    } else if (prevCommands.some(cmd => command.includes(cmd))) {
      prevStep();
    } else if (repeatCommands.some(cmd => command.includes(cmd))) {
      speakCurrentStep();
    } else if (playCommands.some(cmd => command.includes(cmd))) {
      startReading();
    } else if (pauseCommands.some(cmd => command.includes(cmd))) {
      stopReading();
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
        description: t("Say 'next', 'previous', 'repeat', 'play', or 'pause'", "قل 'التالي'، 'السابق'، 'إعادة'، 'تشغيل'، أو 'توقف'")
      });
    }
  };

  const speakCurrentStep = () => {
    if (!synthRef.current || !isVoiceEnabled) return;

    synthRef.current.cancel();
    
    const stepText = `Step ${currentStep + 1}: ${recipe.instructions[currentStep]}`;
    const utterance = new SpeechSynthesisUtterance(stepText);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const startReading = () => {
    setIsPlaying(true);
    speakCurrentStep();
  };

  const stopReading = () => {
    setIsPlaying(false);
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const nextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      if (onStepChange) {
        onStepChange(newStep);
      }
      if (isPlaying) {
        setTimeout(() => speakCurrentStep(), 500);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      if (onStepChange) {
        onStepChange(newStep);
      }
      if (isPlaying) {
        setTimeout(() => speakCurrentStep(), 500);
      }
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
      <CardHeader>
        <CardTitle className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <span className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            {t("Voice Recipe Assistant", "مساعد الوصفات الصوتي")}
          </span>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            {t("Premium", "مميز")}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Current Step Display */}
        <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              {t(`Step ${currentStep + 1} of ${recipe.instructions.length}`, `الخطوة ${currentStep + 1} من ${recipe.instructions.length}`)}
            </span>
          </div>
          <p className="text-gray-800 dark:text-gray-200">
            {recipe.instructions[currentStep]}
          </p>
        </div>

        {/* Voice Controls */}
        <div className={`flex items-center justify-center space-x-4 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            variant={isPlaying ? "destructive" : "default"}
            onClick={isPlaying ? stopReading : startReading}
            disabled={!isVoiceEnabled}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span className="ml-2">
              {isPlaying ? t('Pause', 'إيقاف مؤقت') : t('Play', 'تشغيل')}
            </span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={nextStep}
            disabled={currentStep === recipe.instructions.length - 1}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Voice Settings */}
        <div className={`flex items-center justify-center space-x-4 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
          <Button
            variant={isVoiceEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
          >
            {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="ml-2">{t('Voice', 'صوت')}</span>
          </Button>

          <Button
            variant={isListening ? "destructive" : "default"}
            size="sm"
            onClick={toggleListening}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span className="ml-2">
              {isListening ? t('Stop Listening', 'إيقاف الاستماع') : t('Voice Commands', 'الأوامر الصوتية')}
            </span>
          </Button>
        </div>

        {/* Voice Status */}
        {(isListening || isSpeaking) && (
          <div className={`p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            {isListening && (
              <>
                <Mic className="h-4 w-4 text-blue-600 animate-pulse" />
                <span className="text-sm text-blue-600">
                  {t("Listening for voice commands...", "أستمع للأوامر الصوتية...")}
                </span>
              </>
            )}
            {isSpeaking && (
              <>
                <Volume2 className="h-4 w-4 text-green-600 animate-pulse" />
                <span className="text-sm text-green-600">
                  {t("Reading recipe step...", "أقرأ خطوة الوصفة...")}
                </span>
              </>
            )}
          </div>
        )}

        {/* Voice Commands Help */}
        <div className="text-xs text-gray-500 text-center">
          {t("Voice commands: 'next', 'previous', 'repeat', 'play', 'pause'", "الأوامر الصوتية: 'التالي'، 'السابق'، 'إعادة'، 'تشغيل'، 'توقف'")}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceRecipeAssistant;
