
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface Category {
  id: string;
  title: string;
  subtitle: string;
  subcategories: string[];
  gradient: string;
  emoji: string;
  delay: string;
}

interface SubcategoryViewProps {
  category: Category;
  onBack: () => void;
  onSubcategorySelect: (subcategory: string) => void;
}

const SubcategoryView = ({ category, onBack, onSubcategorySelect }: SubcategoryViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-4xl">{category.emoji}</span>
            {category.title}
          </h2>
          <p className="text-gray-600">{category.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.subcategories.map((subcategory, index) => (
          <Card
            key={subcategory}
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onSubcategorySelect(subcategory)}
          >
            <CardContent className="p-6">
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity rounded-lg`} />
              <div className="relative">
                <h3 className="text-lg font-semibold mb-2">{subcategory}</h3>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">View Recipes</Badge>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-wasfah-orange transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const CategoryExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categories: Category[] = [
    {
      id: "food",
      title: "Food",
      subtitle: "Main Dishes & More",
      subcategories: ["Main Dishes", "Appetizers", "Pickles", "Soups", "Sauces", "Others"],
      gradient: "from-wasfah-orange to-red-500",
      emoji: "🍽️",
      delay: "0s",
    },
    {
      id: "desserts",
      title: "Desserts",
      subtitle: "Sweet Delights",
      subcategories: ["Traditional", "Western", "Pastries", "Ice Cream", "Others"],
      gradient: "from-pink-500 to-wasfah-green",
      emoji: "🍰",
      delay: "0.2s",
    },
    {
      id: "drinks",
      title: "Drinks",
      subtitle: "Refreshing Beverages",
      subcategories: ["Detox", "Cocktails", "Alcoholic", "Hot Drinks", "Others"],
      gradient: "from-blue-500 to-wasfah-green",
      emoji: "🥤",
      delay: "0.4s",
    }
  ];

  const handleSubcategorySelect = (subcategory: string) => {
    console.log(`Selected subcategory: ${subcategory}`);
    // Here you would typically navigate to a recipe list page with the selected subcategory
  };

  if (selectedCategory) {
    return (
      <SubcategoryView
        category={selectedCategory}
        onBack={() => setSelectedCategory(null)}
        onSubcategorySelect={handleSubcategorySelect}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {categories.map((category, index) => (
        <div
          key={category.id}
          className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover-scale animate-fade-in cursor-pointer"
          style={{ animationDelay: category.delay }}
          onClick={() => setSelectedCategory(category)}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
          
          <div className="relative p-8">
            <div className="text-6xl mb-4 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
              {category.emoji}
            </div>
            
            <h3 className="text-2xl font-display font-bold mb-2">{category.title}</h3>
            <p className="text-gray-600 mb-6">{category.subtitle}</p>
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700 mb-3">Subcategories:</p>
              <div className="flex flex-wrap gap-2">
                {category.subcategories.slice(0, 3).map((sub) => (
                  <span
                    key={sub}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {sub}
                  </span>
                ))}
                {category.subcategories.length > 3 && (
                  <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-500">
                    +{category.subcategories.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="w-full bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                Explore {category.title}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
