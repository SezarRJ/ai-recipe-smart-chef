
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

interface ServingsAdjusterProps {
  servings: number;
  onServingsChange: (newServings: number) => void;
}

export const ServingsAdjuster: React.FC<ServingsAdjusterProps> = ({
  servings,
  onServingsChange,
}) => {
  const { t, direction } = useRTL();

  const decreaseServings = () => {
    if (servings > 1) {
      onServingsChange(servings - 1);
    }
  };

  const increaseServings = () => {
    onServingsChange(servings + 1);
  };

  return (
    <div className={`flex items-center space-x-3 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
      <span className="text-sm font-medium text-gray-600">
        {t('Servings', 'الوجبات')}:
      </span>
      <div className={`flex items-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={decreaseServings}
          disabled={servings <= 1}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="font-semibold text-lg min-w-[2rem] text-center">
          {servings}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={increaseServings}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
