
// src/components/drinks/DrinkCustomizationForm.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

// Updated interface for DrinkOptions that will be consistent with AIFindByIngredientsPage
export interface DrinkOptions {
  type: string;
  strength: number; // This is correctly defined as a number
  flavor: string;
  temperature: string;
  themes?: string[]; 
  alcoholType: string; // Required for compatibility
  occasion?: string; // Optional for compatibility
}

interface DrinkCustomizationFormProps {
  onGenerateDrink: (options: DrinkOptions) => void;
  onBack: () => void;
}

const typeOptions = [
  'No Alcohol', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Brandy', 'Liqueur', 'Sake', 'Other', 'Any Alcohol'
];

const flavorOptions = [
  'Sweet', 'Sour', 'Bitter', 'Fruity', 'Spicy', 'Herbal', 'Citrus', 'Mint', 'Chocolate', 'Vanilla'
];

const temperatureOptions = [
  'Cold', 'Room Temperature', 'Warm', 'Hot'
];

const themeOptions = [
  'Tropical', 'Holiday', 'Spicy', 'Citrusy', 'Herbal', 'Classic', 'Fruity', 'Minty',
  'Chocolatey', 'Sweet', 'Sour', 'Bitter', 'Savory', 'Refreshing', 'Warm', 'Cold', 'Any Theme'
];

export const DrinkCustomizationForm: React.FC<DrinkCustomizationFormProps> = ({ onGenerateDrink, onBack }) => {
  const [type, setType] = useState<string>('');
  const [strength, setStrength] = useState<number[]>([50]); // Slider returns array
  const [flavor, setFlavor] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [themes, setThemes] = useState<string[]>([]);

  const handleThemeChange = (theme: string, isChecked: boolean) => {
    if (isChecked) {
      setThemes(prev => [...prev, theme]);
    } else {
      setThemes(prev => prev.filter(t => t !== theme));
    }
  };

  const handleSubmit = () => {
    if (!type || !flavor || !temperature) {
        console.error("Please select Type, Flavor, and Temperature.");
        return;
    }
    const options: DrinkOptions = {
      type,
      strength: strength[0], // Convert from array to number
      flavor,
      temperature,
      themes,
      alcoholType: type, // Set alcoholType same as type for compatibility
      occasion: themes?.length ? themes[0] : undefined // Set first theme as occasion for compatibility
    };
    onGenerateDrink(options);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Customize Your Drink</h2>

      {/* Type Selection */}
      <div>
        <Label htmlFor="type-select" className="text-lg font-medium">1. Select Type</Label>
        <Select onValueChange={setType} value={type}>
          <SelectTrigger id="type-select" className="w-full mt-2">
            <SelectValue placeholder="Choose an alcohol type or 'No Alcohol'" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Strength Slider */}
      <div>
        <Label htmlFor="strength-slider" className="text-lg font-medium">2. Strength Level</Label>
        <div className="flex items-center space-x-4 mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Mild</span>
            <Slider
                id="strength-slider"
                value={strength}
                onValueChange={setStrength}
                max={100}
                step={1}
                className="flex-1"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Strong</span>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Current: {strength[0] < 33 ? 'Mild' : strength[0] > 66 ? 'Strong' : 'Medium'}
        </p>
      </div>

      {/* Flavor Selection */}
      <div>
        <Label htmlFor="flavor-select" className="text-lg font-medium">3. Choose Flavor Profile</Label>
        <Select onValueChange={setFlavor} value={flavor}>
          <SelectTrigger id="flavor-select" className="w-full mt-2">
            <SelectValue placeholder="Select a flavor profile" />
          </SelectTrigger>
          <SelectContent>
            {flavorOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Temperature Selection */}
      <div>
        <Label htmlFor="temperature-select" className="text-lg font-medium">4. Choose Temperature</Label>
        <Select onValueChange={setTemperature} value={temperature}>
          <SelectTrigger id="temperature-select" className="w-full mt-2">
            <SelectValue placeholder="Select temperature preference" />
          </SelectTrigger>
          <SelectContent>
            {temperatureOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Theme Selection (Checkboxes) */}
      <div>
        <Label className="text-lg font-medium mb-4 block">5. Choose Theme(s) (Optional)</Label>
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
