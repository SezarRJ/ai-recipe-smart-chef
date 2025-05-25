import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { RecipeSearch } from "@/components/RecipeSearch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CategoryExplorer } from "@/components/CategoryExplorer";
import { IngredientSelector } from "@/components/IngredientSelector";
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
            <CategoryExplorer
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              onCategorySelect={handleCategoryChange}
              onSubcategorySelect={handleSubcategoryChange}
            />
          </CardContent>
        </Card>

        {/* Ingredient Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <IngredientSelector
              onIngredientsChange={handleIngredientsChange}
              existingIngredients={selectedIngredients}
            />
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

        {/* Filtered Recipe Results */}
        <RecipeSearch
          filters={{
            category: selectedCategory,
            subcategory: selectedSubcategory,
            ingredients: selectedIngredients,
          }}
        />
      </div>

      <MobileNavigation />
    </div>
  );
};

export default Explore;
