
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MainCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  subcategories: Array<{
    name: string;
    icon: React.ElementType;
    requiresCustomForm?: boolean;
  }>;
}

interface CategorySelectorProps {
  categories: MainCategory[];
  selectedCategory: MainCategory | null;
  selectedSubcategory: { name: string; icon: React.ElementType; requiresCustomForm?: boolean } | null;
  currentStep: number;
  onCategorySelect: (category: MainCategory) => void;
  onSubcategorySelect: (subcategory: { name: string; icon: React.ElementType; requiresCustomForm?: boolean }) => void;
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
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4">Choose Category</h2>
        <div className="grid gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-wasfah-bright-teal"
                onClick={() => onCategorySelect(category)}
              >
                <div className="relative">
                  <div className="h-32 bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (currentStep === 2 && selectedCategory) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-wasfah-deep-teal"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h2 className="text-xl font-bold text-wasfah-deep-teal">
            Choose {selectedCategory.name} Type
          </h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {selectedCategory.subcategories.map((subcategory, index) => {
            const IconComponent = subcategory.icon;
            return (
              <Card
                key={index}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-wasfah-bright-teal"
                onClick={() => onSubcategorySelect(subcategory)}
              >
                <div className="relative">
                  <div className="h-24 bg-gradient-to-r from-wasfah-mint to-wasfah-light-gray flex items-center justify-center">
                    <div className="text-center">
                      <IconComponent className="h-6 w-6 mx-auto mb-1 text-wasfah-deep-teal" />
                      <h3 className="text-sm font-semibold text-wasfah-deep-teal px-2">
                        {subcategory.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
