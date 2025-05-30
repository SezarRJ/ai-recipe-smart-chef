
// src/components/drinks/DrinkCustomizationForm.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

// Define the type for the options the form will return
export interface DrinkOptions {
  base: string;
  sournessSweetness: number[]; // Slider returns an array [value]
  dryRefreshing: number[]; // Slider returns an array [value]
  glassType: string;
  themes: string[]; // Array of selected themes
}

interface DrinkCustomizationFormProps {
  onGenerateDrink: (options: DrinkOptions) => void;
  onBack: () => void;
}

const baseOptions = [
  'No Alcohol', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Brandy', 'Liqueur', 'Sake', 'Other', 'Any Alcohol'
];

const glassOptions = [
  'Martini glass', 'Highball glass', 'Collins glass', 'Old Fashioned glass', 'Coupe glass',
  'Margarita glass', 'Shot glass', 'Wine glass', 'Champagne flute', 'Mug', 'Any Glass'
];

const themeOptions = [
  'Tropical', 'Holiday', 'Spicy', 'Citrusy', 'Herbal', 'Classic', 'Fruity', 'Minty',
  'Chocolatey', 'Sweet', 'Sour', 'Bitter', 'Savory', 'Refreshing', 'Warm', 'Cold', 'Any Theme'
];

export const DrinkCustomizationForm: React.FC<DrinkCustomizationFormProps> = ({ onGenerateDrink, onBack }) => {
  const [base, setBase] = useState<string>('');
  const [sournessSweetness, setSournessSweetness] = useState<number[]>([50]); // Default to balanced
  const [dryRefreshing, setDryRefreshing] = useState<number[]>([50]); // Default to balanced
  const [glassType, setGlassType] = useState<string>('');
  const [themes, setThemes] = useState<string[]>([]);

  const handleThemeChange = (theme: string, isChecked: boolean) => {
    if (isChecked) {
      setThemes(prev => [...prev, theme]);
    } else {
      setThemes(prev => prev.filter(t => t !== theme));
    }
  };

  const handleSubmit = () => {
    if (!base || !glassType) {
        console.error("Please select a Base and Glass Type.");
        return;
    }
    const options: DrinkOptions = {
      base,
      sournessSweetness,
      dryRefreshing,
      glassType,
      themes,
    };
    onGenerateDrink(options);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Customize Your Drink</h2>

      {/* Base Selection */}
      <div>
        <Label htmlFor="base-select" className="text-lg font-medium">1. Select Base</Label>
        <Select onValueChange={setBase} value={base}>
          <SelectTrigger id="base-select" className="w-full mt-2">
            <SelectValue placeholder="Choose an alcohol base or 'No Alcohol'" />
          </SelectTrigger>
          <SelectContent>
            {baseOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sourness/Sweetness Slider */}
      <div>
        <Label htmlFor="sourness-sweetness-slider" className="text-lg font-medium">2. Sourness / Sweetness</Label>
        <div className="flex items-center space-x-4 mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Sour</span>
            <Slider
                id="sourness-sweetness-slider"
                value={sournessSweetness}
                onValueChange={setSournessSweetness}
                max={100}
                step={1}
                className="flex-1"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Sweet</span>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">Current: {sournessSweetness[0] < 40 ? 'More Sour' : sournessSweetness[0] > 60 ? 'More Sweet' : 'Balanced'}</p>
      </div>

      {/* Dry/Refreshing Slider */}
      <div>
        <Label htmlFor="dry-refreshing-slider" className="text-lg font-medium">3. Dry / Refreshing</Label>
         <div className="flex items-center space-x-4 mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Dry</span>
            <Slider
                id="dry-refreshing-slider"
                value={dryRefreshing}
                onValueChange={setDryRefreshing}
                max={100}
                step={1}
                className="flex-1"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Refreshing</span>
        </div>
         <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">Current: {dryRefreshing[0] < 40 ? 'More Dry' : dryRefreshing[0] > 60 ? 'More Refreshing' : 'Balanced'}</p>
      </div>

      {/* Glass Type Selection */}
      <div>
        <Label htmlFor="glass-select" className="text-lg font-medium">4. Choose Type of Glass</Label>
        <Select onValueChange={setGlassType} value={glassType}>
          <SelectTrigger id="glass-select" className="w-full mt-2">
            <SelectValue placeholder="Select a glass type" />
          </SelectTrigger>
          <SelectContent>
            {glassOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Theme Selection (Checkboxes) */}
      <div>
        <Label className="text-lg font-medium mb-4 block">5. Choose a Theme(s)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {themeOptions.map(theme => (
            <div key={theme} className="flex items-center space-x-2">
              <Checkbox
                id={`theme-${theme.toLowerCase().replace(/\s+/g, '-')}`}
                checked={themes.includes(theme)}
                onCheckedChange={(isChecked: boolean) => handleThemeChange(theme, isChecked)}
              />
              <Label
                htmlFor={`theme-${theme.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {theme}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between space-x-4 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleSubmit} className="flex-1 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white">Generate Drink</Button>
      </div>
    </div>
  );
};
