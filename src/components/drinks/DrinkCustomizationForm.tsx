
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Wine, Beer, Martini, Flame } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { alcoholSubcategories } from '@/components/ingredients/constants';

export interface DrinkOptions {
  category: string;
  subcategory?: string;
  type?: string;
  characteristics?: string[];
  customIngredients?: string[];
  abv?: string;
  servingStyle?: string;
  occasion?: string;
}

interface DrinkCustomizationFormProps {
  onGenerateDrink: (options: DrinkOptions) => void;
  onBack: () => void;
}

export const DrinkCustomizationForm: React.FC<DrinkCustomizationFormProps> = ({
  onGenerateDrink,
  onBack,
}) => {
  const { t } = useRTL();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([]);
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const categories = Object.keys(alcoholSubcategories);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
    setSelectedType('');
    setSelectedCharacteristics([]);
    setStep(2);
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setSelectedType('');
    setSelectedCharacteristics([]);
    setStep(3);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setStep(4);
  };

  const handleCharacteristicToggle = (characteristic: string) => {
    setSelectedCharacteristics(prev =>
      prev.includes(characteristic)
        ? prev.filter(c => c !== characteristic)
        : [...prev, characteristic]
    );
  };

  const handleGenerateDrink = () => {
    const drinkOptions: DrinkOptions = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      type: selectedType,
      characteristics: selectedCharacteristics,
      customIngredients,
    };
    onGenerateDrink(drinkOptions);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Fermented Beverages':
        return Beer;
      case 'Distilled Spirits':
        return Flame;
      case 'Mixed Drinks & Cocktails':
        return Martini;
      default:
        return Wine;
    }
  };

  const getCurrentSubcategories = () => {
    if (!selectedCategory) return [];
    return alcoholSubcategories[selectedCategory as keyof typeof alcoholSubcategories] || [];
  };

  const getCurrentSubcategory = () => {
    const subcategories = getCurrentSubcategories();
    return subcategories.find(sub => sub.name === selectedSubcategory);
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wine className="h-5 w-5" />
          {t('Choose Alcohol Category', 'اختر فئة المشروبات الكحولية')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {categories.map((category) => {
          const IconComponent = getCategoryIcon(category);
          return (
            <Button
              key={category}
              variant="outline"
              className="w-full h-16 justify-start text-left"
              onClick={() => handleCategorySelect(category)}
            >
              <IconComponent className="h-6 w-6 mr-3" />
              <div>
                <div className="font-medium">{category}</div>
                <div className="text-sm text-gray-500">
                  {category === 'Fermented Beverages' && 'Beer, Wine, Mead, Sake'}
                  {category === 'Distilled Spirits' && 'Whiskey, Vodka, Rum, Gin, Tequila'}
                  {category === 'Mixed Drinks & Cocktails' && 'Cocktails, Shots, Punches'}
                </div>
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          {selectedCategory}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {getCurrentSubcategories().map((subcategory) => {
          const IconComponent = subcategory.icon;
          return (
            <Button
              key={subcategory.name}
              variant="outline"
              className="w-full h-12 justify-start text-left"
              onClick={() => handleSubcategorySelect(subcategory.name)}
            >
              <IconComponent className="h-5 w-5 mr-3" />
              {subcategory.name}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );

  const renderStep3 = () => {
    const subcategory = getCurrentSubcategory();
    if (!subcategory) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setStep(2)} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            {subcategory.name} Types
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {subcategory.types.map((type, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full text-left justify-start"
              onClick={() => handleTypeSelect(type)}
            >
              {type}
            </Button>
          ))}
        </CardContent>
      </Card>
    );
  };

  const renderStep4 = () => {
    const subcategory = getCurrentSubcategory();
    if (!subcategory) return null;

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setStep(3)} className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              Characteristics & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Selected Type:</h4>
              <Badge variant="secondary">{selectedType}</Badge>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Characteristics:</h4>
              <div className="flex flex-wrap gap-2">
                {subcategory.characteristics.map((characteristic) => (
                  <Badge
                    key={characteristic}
                    variant={selectedCharacteristics.includes(characteristic) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCharacteristicToggle(characteristic)}
                  >
                    {characteristic}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={handleGenerateDrink}
          className="w-full"
          size="lg"
        >
          {t('Generate Drink Recipe', 'إنشاء وصفة المشروب')}
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
};
