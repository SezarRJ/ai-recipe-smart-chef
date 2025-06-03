
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Play, Pause, RotateCcw } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';

interface TimerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialMinutes?: number;
  stepDescription?: string;
}

export const TimerOverlay: React.FC<TimerOverlayProps> = ({
  isOpen,
  onClose,
  initialMinutes = 5,
  stepDescription,
}) => {
  const { t } = useRTL();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            toast({
              title: t("Timer Complete!", "انتهى المؤقت!"),
              description: t("Your cooking timer has finished", "انتهى مؤقت الطبخ"),
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, toast, t]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(initialMinutes * 60);
    setIsRunning(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {t('Cooking Timer', 'مؤقت الطبخ')}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          {stepDescription && (
            <p className="text-sm text-gray-600">{stepDescription}</p>
          )}
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl font-bold text-wasfah-bright-teal">
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button
              onClick={toggleTimer}
              className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
            >
              {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="outline" onClick={resetTimer}>
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
