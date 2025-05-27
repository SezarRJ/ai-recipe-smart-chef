
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Bell, BellOff } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface TimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  label?: string;
}

export const Timer: React.FC<TimerProps> = ({ 
  initialMinutes = 5, 
  initialSeconds = 0,
  label = 'Cooking Timer'
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60 + initialSeconds);
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60 + initialSeconds);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds(prev => {
          const newValue = prev - 1;
          setMinutes(Math.floor(newValue / 60));
          setSeconds(newValue % 60);
          return newValue;
        });
      }, 1000);
    } else if (remainingSeconds === 0 && isRunning) {
      setIsRunning(false);
      if (!isMuted) {
        // Play alarm sound
        const audio = new Audio('/timer-alarm.mp3');
        audio.play().catch(e => console.error('Failed to play alarm sound:', e));
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds, isMuted]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
    setMinutes(Math.floor(totalSeconds / 60));
    setSeconds(totalSeconds % 60);
  };

  const handleSliderChange = (value: number[]) => {
    const newTotalSeconds = value[0] * 60;
    setTotalSeconds(newTotalSeconds);
    setRemainingSeconds(newTotalSeconds);
    setMinutes(Math.floor(newTotalSeconds / 60));
    setSeconds(newTotalSeconds % 60);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-wasfah-deep-teal">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-wasfah-deep-teal">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Set timer (minutes)</p>
          <Slider 
            value={[Math.floor(totalSeconds / 60)]} 
            min={0} 
            max={60} 
            step={1}
            onValueChange={handleSliderChange} 
            disabled={isRunning}
          />
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleTimer}
            className="w-12 h-12 rounded-full border-2 border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={resetTimer}
            disabled={remainingSeconds === totalSeconds && !isRunning}
            className="w-12 h-12 rounded-full border-2 border-wasfah-deep-teal text-wasfah-deep-teal hover:bg-wasfah-deep-teal hover:text-white disabled:opacity-40"
          >
            <RotateCcw size={24} />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="w-12 h-12 rounded-full border-2 border-gray-400 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
          >
            {isMuted ? <BellOff size={24} /> : <Bell size={24} />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
