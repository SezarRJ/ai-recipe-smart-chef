
import React, { ElementType } from 'react';
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
  // Step 1: Main Category selection
  if (currentStep === 1) {
    return (
      <Card className="bg-white rounded-xl shadow-md border border-gray-100">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Choose Category</h3>
          <div className="grid grid-cols-1 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory?.id === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect(category)}
                  className={`
                    flex flex-col items-center w-full bg-white rounded-xl
                    shadow-sm border border-gray-100
                    transition duration-200 hover:shadow-lg hover:scale-105 active:scale-98
                    p-3 outline-none
                    ${isSelected ? "ring-2 ring-wasfah-bright-teal" : ""}
                    focus-visible:ring-2 focus-visible:ring-wasfah-bright-teal
                  `}
                  type="button"
                >
                  <div className="mb-2 flex items-center justify-center" style={{ width: 120, height: 100 }}>
                    <div className="w-[120px] h-[100px] rounded-xl bg-gray-100 flex items-center justify-center">
                      <IconComponent className="h-12 w-12 text-wasfah-bright-teal" />
                    </div>
                  </div>
                  <span className="text-base font-medium text-gray-700 text-center leading-tight">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 2: Subcategory selection
  if (currentStep === 2 && selectedCategory) {
    return (
      <Card className="bg-white rounded-xl shadow-md border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <button
              type="button"
              onClick={onBack}
              className="mr-2 flex items-center px-2 py-1 rounded-lg hover:bg-gray-50 transition"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h3 className="text-xl font-bold text-gray-900">Choose {selectedCategory.name} Type</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {selectedCategory.subcategories.map((subcategory) => {
              const IconComponent = subcategory.icon;
              const isSelected = selectedSubcategory?.name === subcategory.name;
              return (
                <button
                  key={subcategory.name}
                  className={`
                    flex flex-col items-center w-full bg-white rounded-xl
                    shadow-sm border border-gray-100
                    transition duration-200 hover:shadow-lg hover:scale-105 active:scale-98
                    p-3 outline-none
                    ${isSelected ? "ring-2 ring-wasfah-bright-teal" : ""}
                    focus-visible:ring-2 focus-visible:ring-wasfah-bright-teal
                  `}
                  type="button"
                  onClick={() => onSubcategorySelect(subcategory)}
                >
                  <div className="mb-2 flex items-center justify-center" style={{ width: 120, height: 100 }}>
                    <div className="w-[120px] h-[100px] rounded-xl bg-gray-100 flex items-center justify-center">
                      <IconComponent className="h-12 w-12 text-wasfah-bright-teal" />
                    </div>
                  </div>
                  <span className="text-base font-medium text-gray-700 text-center leading-tight">
                    {subcategory.name}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
