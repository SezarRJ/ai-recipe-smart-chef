
import React, { ElementType } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

// --- Add cover images for each category and subcategory ---
const CATEGORY_IMAGES: Record<string, string> = {
  food: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=468&h=320&fit=crop&crop=center",
  desserts: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=468&h=320&fit=crop&crop=center",
  drinks: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=468&h=320&fit=crop&crop=center",
};

const SUBCATEGORY_IMAGES: Record<string, string> = {
  // Food
  "Main Dishes": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=468&h=320&fit=crop&crop=center",
  Appetizers: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=468&h=320&fit=crop&crop=center",
  Pickles: "https://images.unsplash.com/photo-1514995669114-d1c1b1b1b1b1?w=468&h=320&fit=crop&crop=center",
  Soups: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=468&h=320&fit=crop&crop=center",
  Sauces: "https://images.unsplash.com/photo-1523987355523-c7b5b0723cbb?w=468&h=320&fit=crop&crop=center",
  Others: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?w=468&h=320&fit=crop&crop=center",
  // Desserts
  Traditional: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=468&h=320&fit=crop&crop=center",
  Western: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=468&h=320&fit=crop&crop=center",
  Pastries: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=468&h=320&fit=crop&crop=center",
  "Ice Cream": "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=468&h=320&fit=crop&crop=center",
  Sparkles: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=468&h=320&fit=crop&crop=center",
  // Drinks
  Detox: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=468&h=320&fit=crop&crop=center",
  Cocktails: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=468&h=320&fit=crop&crop=center",
  "Hot Drinks": "https://images.unsplash.com/photo-1519121782002-400201a1c8af?w=468&h=320&fit=crop&crop=center",
};

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
        <CardContent className="p-4">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Choose Category</h3>
          <div className="grid grid-cols-1 gap-4">
            {categories.map((category) => {
              const isSelected = selectedCategory?.id === category.id;
              const photo = CATEGORY_IMAGES[category.id] || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=468&h=320&fit=crop&crop=center";
              return (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect(category)}
                  className={`flex flex-col items-center w-full bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-lg hover:scale-105 p-0 focus-visible:ring-2 focus-visible:ring-wasfah-bright-teal
                  ${isSelected ? "ring-2 ring-wasfah-bright-teal" : ""}
                  `}
                  type="button"
                  style={{ minHeight: 200 }}
                >
                  <div className="w-full">
                    <img
                      src={photo}
                      alt={category.name}
                      className="w-full h-40 object-cover rounded-t-xl"
                    />
                  </div>
                  <div className="flex flex-col flex-1 px-4 py-3 w-full items-center">
                    <span className="text-base font-semibold text-gray-800 text-center leading-tight">
                      {category.name}
                    </span>
                  </div>
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
        <CardContent className="p-4">
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
              const isSelected = selectedSubcategory?.name === subcategory.name;
              const photo =
                SUBCATEGORY_IMAGES[subcategory.name] ||
                CATEGORY_IMAGES[selectedCategory.id] ||
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=468&h=320&fit=crop&crop=center";
              return (
                <button
                  key={subcategory.name}
                  className={`flex flex-col items-center w-full bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-lg hover:scale-105 p-0 focus-visible:ring-2 focus-visible:ring-wasfah-bright-teal ${isSelected ? "ring-2 ring-wasfah-bright-teal" : ""}`}
                  type="button"
                  onClick={() => onSubcategorySelect(subcategory)}
                  style={{ minHeight: 200 }}
                >
                  <div className="w-full">
                    <img
                      src={photo}
                      alt={subcategory.name}
                      className="w-full h-40 object-cover rounded-t-xl"
                    />
                  </div>
                  <div className="flex flex-col flex-1 px-4 py-3 w-full items-center">
                    <span className="text-base font-semibold text-gray-800 text-center leading-tight">
                      {subcategory.name}
                    </span>
                  </div>
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
