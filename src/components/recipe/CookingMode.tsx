import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RefreshCw,
  ChefHat,
  Volume2 // <-- Add this import
} from 'lucide-react';
// ...other imports

// ...rest of your component

export const CookingMode: React.FC<CookingModeProps> = ({ recipe, onClose }) => {
  // ...existing state and logic

  // --- Add this function for speech synthesis ---
  const speakInstruction = () => {
    const instruction = recipe.instructions[currentStep];
    if ('speechSynthesis' in window && instruction) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new window.SpeechSynthesisUtterance(instruction);
      utterance.lang = 'en-US'; // You can make this dynamic if needed
      window.speechSynthesis.speak(utterance);
    }
  };

  // ...rest of your component

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* ...header and progress... */}
      <div className="flex-grow overflow-auto p-4">
        {/* ...image and step... */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center">
          <p className="text-lg flex-1">{recipe.instructions[currentStep]}</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={speakInstruction}
            aria-label="Speak instruction"
            className="ml-2"
          >
            <Volume2 size={22} />
          </Button>
        </div>
        {/* ...rest of your component... */}
      </div>
      {/* ...footer... */}
    </div>
  );
};
