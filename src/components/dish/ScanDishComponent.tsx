
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload } from 'lucide-react';

export interface ScanDishResult {
  dishName: string;
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  instructions: string[];
}

interface ScanDishComponentProps {
  onScanComplete: (result: ScanDishResult) => void;
}

export const ScanDishComponent: React.FC<ScanDishComponentProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    
    // Mock scan result for demo
    setTimeout(() => {
      const mockResult: ScanDishResult = {
        dishName: 'Margherita Pizza',
        ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Fresh basil'],
        nutrition: {
          calories: 285,
          protein: 12,
          carbs: 36,
          fat: 10
        },
        instructions: [
          'Preheat oven to 475°F',
          'Roll out pizza dough',
          'Spread tomato sauce',
          'Add mozzarella cheese',
          'Bake for 10-12 minutes',
          'Add fresh basil before serving'
        ]
      };
      
      onScanComplete(mockResult);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <Camera className="h-16 w-16 mx-auto text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Scan Your Dish</h3>
        <p className="text-gray-600 mb-4">
          Take a photo of your dish to get ingredients and nutrition information
        </p>
        <Button 
          onClick={handleScan}
          disabled={isScanning}
          className="w-full"
        >
          {isScanning ? (
            'Scanning...'
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Scan Dish
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
