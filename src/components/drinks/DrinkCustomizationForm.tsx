
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';

export interface DrinkOptions {
  type: string;
  subcategory: string;
  abv: string;
  servingStyle: string;
  occasion: string;
  characteristics: string[];
}

interface DrinkCustomizationFormProps {
  onGenerateDrink: (options: DrinkOptions) => void;
  onBack: () => void;
}

export const DrinkCustomizationForm: React.FC<DrinkCustomizationFormProps> = ({ onGenerateDrink, onBack }) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedABV, setSelectedABV] = useState('');
  const [selectedServingStyle, setSelectedServingStyle] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([]);

  const drinkTypes = [
    { name: 'Cocktails', subcategories: ['Classic', 'Modern', 'Tropical', 'Sour', 'Sweet'] },
    { name: 'Wine', subcategories: ['Red', 'White', 'Rosé', 'Sparkling', 'Dessert'] },
    { name: 'Beer', subcategories: ['Lager', 'Ale', 'Stout', 'IPA', 'Wheat'] },
    { name: 'Spirits', subcategories: ['Whiskey', 'Vodka', 'Gin', 'Rum', 'Tequila'] }
  ];

  const abvRanges = ['Low (0-10%)', 'Medium (10-20%)', 'High (20-40%)', 'Very High (40%+)'];
  const servingStyles = ['Neat', 'On the rocks', 'Chilled', 'Room temperature', 'Hot'];
  const occasions = ['Party', 'Romantic dinner', 'Casual evening', 'Celebration', 'Relaxation'];
  const characteristics = ['Sweet', 'Sour', 'Bitter', 'Smooth', 'Strong', 'Refreshing', 'Warming', 'Fruity'];

  const toggleCharacteristic = (characteristic: string) => {
    setSelectedCharacteristics(prev => 
      prev.includes(characteristic) 
        ? prev.filter(c => c !== characteristic)
        : [...prev, characteristic]
    );
  };

  const handleGenerate = () => {
    const options: DrinkOptions = {
      type: selectedType,
      subcategory: selectedSubcategory,
      abv: selectedABV,
      servingStyle: selectedServingStyle,
      occasion: selectedOccasion,
      characteristics: selectedCharacteristics
    };
    onGenerateDrink(options);
  };

  const currentType = drinkTypes.find(type => type.name === selectedType);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="outline" onClick={onBack}>
        ← Back
      </Button>

      {/* Drink Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Drink Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {drinkTypes.map((type) => (
              <Button
                key={type.name}
                variant={selectedType === type.name ? "default" : "outline"}
                onClick={() => {
                  setSelectedType(type.name);
                  setSelectedSubcategory('');
                }}
                className="justify-start"
              >
                {type.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subcategory Selection */}
      {currentType && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Subcategory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentType.subcategories.map((subcategory) => (
                <Button
                  key={subcategory}
                  variant={selectedSubcategory === subcategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubcategory(subcategory)}
                >
                  {subcategory}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ABV Range */}
      <Card>
        <CardHeader>
          <CardTitle>Alcohol Strength (ABV)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {abvRanges.map((abv) => (
              <Button
                key={abv}
                variant={selectedABV === abv ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedABV(abv)}
              >
                {abv}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Serving Style */}
      <Card>
        <CardHeader>
          <CardTitle>Serving Style</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {servingStyles.map((style) => (
              <Button
                key={style}
                variant={selectedServingStyle === style ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedServingStyle(style)}
              >
                {style}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Occasion */}
      <Card>
        <CardHeader>
          <CardTitle>Occasion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {occasions.map((occasion) => (
              <Button
                key={occasion}
                variant={selectedOccasion === occasion ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedOccasion(occasion)}
              >
                {occasion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Characteristics */}
      <Card>
        <CardHeader>
          <CardTitle>Taste Characteristics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {characteristics.map((characteristic) => (
              <Button
                key={characteristic}
                variant={selectedCharacteristics.includes(characteristic) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCharacteristic(characteristic)}
              >
                {selectedCharacteristics.includes(characteristic) && <Minus className="h-3 w-3 mr-1" />}
                {!selectedCharacteristics.includes(characteristic) && <Plus className="h-3 w-3 mr-1" />}
                {characteristic}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <Button 
        onClick={handleGenerate}
        className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
        disabled={!selectedType || !selectedSubcategory}
      >
        Generate Custom Drink Recipe
      </Button>
    </div>
  );
};
