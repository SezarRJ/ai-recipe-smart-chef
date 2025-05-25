
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { RecipeSearch } from "@/components/RecipeSearch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Explore = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const handleIngredientsChange = (ingredients: any[]) => {
    setSelectedIngredients(ingredients);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); // reset subcategory when category changes
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };

  // Simple category explorer component
  const SimpleCategoryExplorer = () => {
    const categories = [
      { id: 'breakfast', name: 'Breakfast', subcategories: ['Pancakes', 'Eggs', 'Cereal'] },
      { id: 'lunch', name: 'Lunch', subcategories: ['Sandwiches', 'Salads', 'Soups'] },
      { id: 'dinner', name: 'Dinner', subcategories: ['Pasta', 'Grilled', 'Stir-fry'] },
      { id: 'dessert', name: 'Dessert', subcategories: ['Cakes', 'Ice Cream', 'Cookies'] }
    ];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.id)}
              className="h-auto p-3"
            >
              {category.name}
            </Button>
          ))}
        </div>
        {selectedCategory && (
          <div className="grid grid-cols-3 gap-2">
            {categories.find(c => c.id === selectedCategory)?.subcategories.map((sub) => (
              <Button
                key={sub}
                variant={selectedSubcategory === sub ? "default" : "outline"}
                size="sm"
                onClick={() => handleSubcategoryChange(sub)}
              >
                {sub}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Simple ingredient selector component
  const SimpleIngredientSelector = () => {
    const commonIngredients = [
      'Chicken', 'Beef', 'Fish', 'Rice', 'Pasta', 'Tomatoes', 
      'Onions', 'Garlic', 'Cheese', 'Eggs', 'Milk', 'Flour'
    ];

    const toggleIngredient = (ingredient: string) => {
      const exists = selectedIngredients.find(ing => ing.name === ingredient);
      if (exists) {
        setSelectedIngredients(prev => prev.filter(ing => ing.name !== ingredient));
      } else {
        setSelectedIngredients(prev => [...prev, { name: ingredient, quantity: 1, unit: 'piece' }]);
      }
    };

    return (
      <div className="flex flex-wrap gap-2">
        {commonIngredients.map((ingredient) => {
          const isSelected = selectedIngredients.some(ing => ing.name === ingredient);
          return (
            <Button
              key={ingredient}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => toggleIngredient(ingredient)}
            >
              {ingredient}
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
              {t("nav.explore")}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Filter recipes by category and ingredients
            </p>
          </div>
        </div>

        {/* Category and Subcategory Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Choose Category & Subcategory</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleCategoryExplorer />
          </CardContent>
        </Card>

        {/* Ingredient Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleIngredientSelector />
          </CardContent>
        </Card>

        {/* Selected Ingredients Display */}
        {selectedIngredients.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Selected Ingredients ({selectedIngredients.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedIngredients.map((ingredient, index) => (
                  <Badge key={index} variant="secondary">
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Simple Recipe Results */}
        <Card>
          <CardHeader>
            <CardTitle>Recipe Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600">
                {selectedCategory || selectedIngredients.length > 0 
                  ? "Recipes matching your filters will appear here" 
                  : "Select categories or ingredients to see recipes"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileNavigation />
    </div>
  );
};

export default Explore;
