
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Heart, Utensils, Clock, MapPin } from 'lucide-react';

export const HungerButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickOptions = [
    { 
      id: 'fast', 
      label: 'Fast Food', 
      icon: Clock, 
      color: 'bg-red-500', 
      description: 'Ready in 5 mins',
      items: ['Sandwiches', 'Wraps', 'Quick Snacks']
    },
    { 
      id: 'healthy', 
      label: 'Healthy', 
      icon: Heart, 
      color: 'bg-green-500', 
      description: 'Nutritious options',
      items: ['Salads', 'Smoothies', 'Fruit Bowls']
    },
    { 
      id: 'comfort', 
      label: 'Comfort Food', 
      icon: Utensils, 
      color: 'bg-orange-500', 
      description: 'Satisfying meals',
      items: ['Pasta', 'Soup', 'Rice Dishes']
    },
    { 
      id: 'nearby', 
      label: 'Near Me', 
      icon: MapPin, 
      color: 'bg-blue-500', 
      description: 'Local restaurants',
      items: ['Delivery', 'Pickup', 'Dine-in']
    }
  ];

  const handleOptionClick = (option: typeof quickOptions[0]) => {
    console.log('Hunger option selected:', option);
    // TODO: Implement actual hunger solution logic
    alert(`Looking for ${option.label} options...`);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-wasfah-coral-red to-red-500 hover:from-red-600 hover:to-red-700 text-white shadow-lg animate-pulse-glow"
        >
          <Heart className="h-4 w-4 mr-1" />
          Hungry?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-wasfah-deep-teal flex items-center">
            <Heart className="h-5 w-5 mr-2 text-wasfah-coral-red" />
            What are you craving?
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {quickOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-wasfah-light-gray border-wasfah-mint/30"
                onClick={() => handleOptionClick(option)}
              >
                <div className={`p-2 rounded-full ${option.color} text-white`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{option.label}</p>
                  <p className="text-xs text-gray-600">{option.description}</p>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {option.items.slice(0, 2).map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Button>
            );
          })}
        </div>
        <div className="mt-4 p-3 bg-wasfah-light-gray rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            Quick solutions when you're hungry and need ideas fast!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
