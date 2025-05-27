
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, Check, Lightbulb, MessageCircle, Brain } from 'lucide-react';

interface NutritionTipProps {
  tip: string;
  source?: string;
  onApply?: (tip: string) => void;
  type?: 'info' | 'success' | 'warning' | 'ai';
}

export const NutritionTip: React.FC<NutritionTipProps> = ({
  tip,
  source = "Nutrition Expert",
  onApply,
  type = 'info'
}) => {
  const getIconAndColors = () => {
    switch (type) {
      case 'success':
        return {
          icon: <Check className="h-5 w-5 mt-0.5 text-green-500 flex-shrink-0" />,
          bgClass: "from-green-50 to-green-50/10",
          borderClass: "border-green-300/30"
        };
      case 'warning':
        return {
          icon: <Lightbulb className="h-5 w-5 mt-0.5 text-amber-500 flex-shrink-0" />,
          bgClass: "from-amber-50 to-amber-50/10",
          borderClass: "border-amber-300/30"
        };
      case 'ai':
        return {
          icon: <Brain className="h-5 w-5 mt-0.5 text-purple-500 flex-shrink-0" />,
          bgClass: "from-purple-50 to-purple-50/10",
          borderClass: "border-purple-300/30"
        };
      case 'info':
      default:
        return {
          icon: <Info className="h-5 w-5 mt-0.5 text-wasfah-bright-teal flex-shrink-0" />,
          bgClass: "from-wasfah-light-gray to-wasfah-light-mint/10",
          borderClass: "border-wasfah-bright-teal/20"
        };
    }
  };

  const { icon, bgClass, borderClass } = getIconAndColors();

  return (
    <Card className={`border-2 ${borderClass} bg-gradient-to-r ${bgClass} dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-800/70 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300`}>
      <CardContent className="pt-6 pb-4 px-4">
        <div className="flex items-start">
          {icon}
          <div className="ml-3 flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-200">{tip}</p>
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">— {source}</p>
              {onApply && (
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-wasfah-bright-teal hover:bg-wasfah-bright-teal/10 dark:text-wasfah-bright-teal dark:hover:bg-wasfah-bright-teal/20"
                    onClick={() => onApply(tip)}
                  >
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Apply
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-purple-500 hover:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20"
                  >
                    <MessageCircle className="h-3.5 w-3.5 mr-1" />
                    Discuss
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
