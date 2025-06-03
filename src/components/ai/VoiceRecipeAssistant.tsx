import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// TypeScript declarations for Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceRecipeAssistantProps {
  recipe: {
    title: string;
    instructions: string[];
  };
  onStepChange?: (step: number) => void;
}

export const VoiceRecipeAssistant: React.FC<VoiceRecipeAssistantProps> = ({
  recipe,
  onStepChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const { toast } = useToast();

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech recognition
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
          title: "Voice recognition error",
          description: "Please try again",
          variant: "destructive"
        });
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    
    if (command.includes('next') || command.includes('forward')) {
      nextStep();
    } else if (command.includes('previous') || command.includes('back')) {
      previousStep();
    } else if (command.includes('repeat') || command.includes('again')) {
      speakCurrentStep();
    } else if (command.includes('start') || command.includes('begin')) {
      setCurrentStep(0);
      speakCurrentStep();
    } else if (command.includes('stop') || command.includes('pause')) {
      stopSpeaking();
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice recognition not supported",
        description: "Your browser doesn't support voice recognition",
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
        title: "Voice assistant activated",
        description: "Say 'next', 'previous', 'repeat', or 'start'"
      });
    }
  };

  const speakCurrentStep = () => {
    if (!synthRef.current || !isVoiceEnabled) return;

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
    if (currentStep < recipe.instructions.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
      if (isVoiceEnabled) {
        setTimeout(() => speakCurrentStep(), 500);
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
      if (isVoiceEnabled) {
        setTimeout(() => speakCurrentStep(), 500);
      }
    }
  };

  const progress = ((currentStep + 1) / recipe.instructions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Voice Recipe Assistant</span>
          <div className="flex gap-2">
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
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Step {currentStep + 1} of {recipe.instructions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current Step */}
        <div className="p-4 bg-gradient-to-r from-wasfah-bright-teal/10 to-wasfah-teal/10 rounded-lg border border-wasfah-bright-teal/20">
          <h3 className="font-semibold text-wasfah-deep-teal mb-2">
            Step {currentStep + 1}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {recipe.instructions[currentStep]}
          </p>
        </div>

        {/* Voice Status */}
        {(isListening || isSpeaking) && (
          <div className="flex items-center justify-center space-x-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            {isListening && (
              <>
                <Mic className="h-4 w-4 text-blue-600 animate-pulse" />
                <span className="text-sm text-blue-600">Listening for commands...</span>
              </>
            )}
            {isSpeaking && (
              <>
                <Volume2 className="h-4 w-4 text-green-600 animate-pulse" />
                <span className="text-sm text-green-600">Speaking instructions...</span>
              </>
            )}
          </div>
        )}

        {/* Voice Commands */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Voice Commands:</h4>
          <div className="flex flex-wrap gap-1">
            {['Next', 'Previous', 'Repeat', 'Start'].map((command) => (
              <Badge key={command} variant="secondary" className="text-xs">
                "{command}"
              </Badge>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={previousStep}
            disabled={currentStep === 0}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={speakCurrentStep}
            disabled={!isVoiceEnabled || isSpeaking}
          >
            {isSpeaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCurrentStep(0);
              if (isVoiceEnabled) speakCurrentStep();
            }}
          >
            <RotateCcw className="h-4 w-4" />
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
      </CardContent>
    </Card>
  );
};
