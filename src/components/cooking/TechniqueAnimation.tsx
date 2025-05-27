
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TechniqueAnimationProps {
  title: string;
  description: string;
  animationUrl: string; // This could be a GIF or video URL
  tips?: string[];
}

export const TechniqueAnimation: React.FC<TechniqueAnimationProps> = ({
  title,
  description,
  animationUrl,
  tips = [],
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // If this was a real video element, we would control it here
    const videoElement = document.getElementById('technique-video') as HTMLVideoElement;
    if (videoElement) {
      isPlaying ? videoElement.pause() : videoElement.play();
    }
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    // If this was a real video element, we would reset it here
    const videoElement = document.getElementById('technique-video') as HTMLVideoElement;
    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.pause();
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-wasfah-deep-teal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-md overflow-hidden bg-gray-100 aspect-video mb-4">
          {/* This could be a video or animated GIF */}
          <video 
            id="technique-video"
            src={animationUrl} 
            className="w-full h-full object-cover"
            loop
          />
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Button 
              variant="default" 
              size="icon" 
              className="mx-1 bg-white/80 text-black hover:bg-white"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              className="mx-1 bg-white/80 text-black hover:bg-white"
              onClick={resetAnimation}
            >
              <RotateCcw size={20} />
            </Button>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{description}</p>
        
        {tips.length > 0 && (
          <div>
            <h4 className="font-semibold text-wasfah-deep-teal mb-2">Chef Tips:</h4>
            <ul className="list-disc list-inside space-y-1">
              {tips.map((tip, index) => (
                <li key={index} className="text-sm text-gray-600">{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
