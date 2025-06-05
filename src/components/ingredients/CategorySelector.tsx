
import React, { ElementType } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface MainCategory {
  id: string;
  name: string;
  icon: ElementType;
  subcategories: { name: string; icon: ElementType; requiresCustomForm?: boolean }[];
}

interface CategorySelectorProps {
  categories: MainCategory[];
  selectedCategory: MainCategory | null;
  selectedSubcategory: { name: string; icon: ElementType; requiresCustomForm?: boolean } | null;
  currentStep: number;
  onCategorySelect: (category: MainCategory) => void;
  onSubcategorySelect: (subcategory: { name: string; icon: ElementType; requiresCustomForm?: boolean }) => void;
  onBack: () => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  currentStep,
  onCategorySelect,
  onSubcategorySelect,
  onBack,
}) => {
  if (currentStep === 1) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Choose Category</h3>
          <div className="grid grid-cols-1 gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant="outline"
                  className="h-16 justify-start text-left"
                  onClick={() => onCategorySelect(category)}
                >
                  <IconComponent className="h-6 w-6 mr-3" />
                  <span className="text-lg">{category.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 2 && selectedCategory) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold">Choose {selectedCategory.name} Type</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {selectedCategory.subcategories.map((subcategory) => {
              const IconComponent = subcategory.icon;
              return (
                <Button
                  key={subcategory.name}
                  variant="outline"
                  className="h-12 justify-start text-left"
                  onClick={() => onSubcategorySelect(subcategory)}
                >
                  <IconComponent className="h-5 w-5 mr-3" />
                  <span>{subcategory.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
