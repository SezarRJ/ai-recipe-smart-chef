
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';

interface DrinkCustomizationFormProps {
  onCustomize: (customizations: any) => void;
}

export const DrinkCustomizationForm: React.FC<DrinkCustomizationFormProps> = ({ onCustomize }) => {
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedMixers, setSelectedMixers] = useState<string[]>([]);
  const [selectedGarnishes, setSelectedGarnishes] = useState<string[]>([]);
  const [strength, setStrength] = useState(50);

  const drinkBases = [
    { name: 'Vodka', category: 'Spirit' },
    { name: 'Gin', category: 'Spirit' },
    { name: 'Rum', category: 'Spirit' },
    { name: 'Whiskey', category: 'Spirit' },
    { name: 'Tequila', category: 'Spirit' },
    { name: 'Beer', category: 'Low ABV' },
    { name: 'Wine', category: 'Low ABV' }
  ];

  const mixers = [
    { name: 'Tonic Water', items: ['Regular Tonic', 'Diet Tonic', 'Flavored Tonic'] },
    { name: 'Soda Water', items: ['Plain', 'Lime', 'Lemon'] },
    { name: 'Juices', items: ['Orange', 'Cranberry', 'Pineapple', 'Lime', 'Lemon'] },
    { name: 'Syrups', items: ['Simple', 'Grenadine', 'Blue Curacao', 'Elderflower'] }
  ];

  const garnishes = [
    'Lime Wedge', 'Lemon Twist', 'Orange Peel', 'Mint Sprig', 
    'Cherry', 'Olive', 'Salt Rim', 'Sugar Rim'
  ];

  const toggleMixer = (mixer: string) => {
    setSelectedMixers(prev => 
      prev.includes(mixer) 
        ? prev.filter(m => m !== mixer)
        : [...prev, mixer]
    );
  };

  const toggleGarnish = (garnish: string) => {
    setSelectedGarnishes(prev => 
      prev.includes(garnish) 
        ? prev.filter(g => g !== garnish)
        : [...prev, garnish]
    );
  };

  const handleCustomize = () => {
    const customizations = {
      base: selectedBase,
      mixers: selectedMixers,
      garnishes: selectedGarnishes,
      strength
    };
    onCustomize(customizations);
  };

  return (
    <div className="space-y-6">
      {/* Base Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Base Spirit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {drinkBases.map((base) => (
              <Button
                key={base.name}
                variant={selectedBase === base.name ? "default" : "outline"}
                onClick={() => setSelectedBase(base.name)}
                className="justify-start"
              >
                {base.name}
                <Badge variant="secondary" className="ml-2">
                  {base.category}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mixer Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Mixers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mixers.map((mixerCategory) => (
            <div key={mixerCategory.name}>
              <h4 className="font-medium mb-2">{mixerCategory.name}</h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(mixerCategory.items) && mixerCategory.items.map((item) => (
                  <Button
                    key={item}
                    variant={selectedMixers.includes(item) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleMixer(item)}
                  >
                    {selectedMixers.includes(item) && <Minus className="h-3 w-3 mr-1" />}
                    {!selectedMixers.includes(item) && <Plus className="h-3 w-3 mr-1" />}
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Garnish Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Add Garnishes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {garnishes.map((garnish) => (
              <Button
                key={garnish}
                variant={selectedGarnishes.includes(garnish) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleGarnish(garnish)}
              >
                {selectedGarnishes.includes(garnish) && <Minus className="h-3 w-3 mr-1" />}
                {!selectedGarnishes.includes(garnish) && <Plus className="h-3 w-3 mr-1" />}
                {garnish}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strength Control */}
      <Card>
        <CardHeader>
          <CardTitle>Adjust Strength</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Weak</span>
              <input
                type="range"
                min="0"
                max="100"
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
                className="flex-1 mx-4"
              />
              <span>Strong</span>
            </div>
            <p className="text-center text-sm text-gray-600">
              Strength: {strength}%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Customize Button */}
      <Button 
        onClick={handleCustomize}
        className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
        disabled={!selectedBase}
      >
        Create My Custom Drink
      </Button>
    </div>
  );
};
