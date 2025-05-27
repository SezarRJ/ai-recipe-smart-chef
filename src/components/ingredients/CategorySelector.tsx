
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType;
  image: string;
  subcategories: { name: string; image: string }[];
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: Category | null;
  selectedSubcategory: string | null;
  currentStep: number;
  onCategorySelect: (category: Category) => void;
  onSubcategorySelect: (subcategory: string) => void;
  onBack: () => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  currentStep,
  onCategorySelect,
  onSubcategorySelect,
  onBack
}) => {
  if (currentStep === 1) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center text-wasfah-deep-teal">Choose Category</h2>
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category)}
                className={`relative overflow-hidden rounded-xl border-2 transition-all hover:scale-102 ${
                  selectedCategory?.id === category.id
                    ? 'border-wasfah-bright-teal shadow-lg'
                    : 'border-gray-200 active:scale-98'
                }`}
              >
                <div className="relative h-32 w-full">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm inline-block mb-2">
                        <IconComponent />
                      </div>
                      <p className="font-bold text-xl">{category.name}</p>
                      <p className="text-sm opacity-90">
                        {category.subcategories.length} subcategories
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 text-wasfah-deep-teal hover:bg-wasfah-light-gray"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h2 className="text-lg font-semibold text-wasfah-deep-teal">{selectedCategory?.name}</h2>
          <div className="w-10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {selectedCategory?.subcategories?.map((sub) => (
            <button
              key={sub.name}
              onClick={() => onSubcategorySelect(sub.name)}
              className={`relative overflow-hidden rounded-lg border-2 transition-all hover:scale-102 ${
                selectedSubcategory === sub.name
                  ? 'border-wasfah-bright-teal shadow-lg'
                  : 'border-gray-200 active:scale-95'
              }`}
            >
              <div className="relative h-24 w-full">
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-semibold text-white text-center text-sm px-2">
                    {sub.name}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
