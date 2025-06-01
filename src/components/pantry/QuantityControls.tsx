
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface QuantityControlsProps {
  quantity: number;
  unit: string;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const QuantityControls: React.FC<QuantityControlsProps> = ({
  quantity,
  unit,
  onQuantityChange,
  min = 0,
  max = 9999,
  step = 1
}) => {
  const handleIncrement = () => {
    const newQuantity = Math.min(quantity + step, max);
    onQuantityChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(quantity - step, min);
    onQuantityChange(newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    const clampedValue = Math.max(min, Math.min(max, value));
    onQuantityChange(clampedValue);
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="h-8 w-8 rounded-full"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center space-x-1 min-w-0">
        <Input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          className="w-16 text-center text-sm border-0 bg-transparent p-1"
          min={min}
          max={max}
          step={step}
        />
        <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
          {unit}
        </span>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="h-8 w-8 rounded-full"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
