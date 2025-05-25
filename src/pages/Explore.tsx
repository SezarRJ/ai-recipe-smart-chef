import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { MobileNavigation } from "@/components/MobileNavigation";

// Category data
const categories = [
  {
    id: "food",
    name: "Food",
    subcategories: ["Main Dishes", "Appetizers", "Pickles", "Soups", "Sauces", "Others"],
  },
  {
    id: "desserts",
    name: "Desserts",
    subcategories: ["Traditional", "Western", "Pastries", "Ice Cream", "Others"],
  },
  {
    id: "drinks",
    name: "Drinks",
    subcategories: ["Detox", "Cocktails", "Alcoholic", "Hot Drinks", "Others"],
  },
];

// Filter options
const filters = {
  dietary: ["Normal", "Healthy", "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Low-Carb"],
  cookingTime: ["Under 30 mins", "1 hour"],
  difficulty: ["Beginner", "Intermediate", "Expert"],
  cuisine: [
    "Levant",
    "Italian",
    "Mexican",
    "Chinese",
    "Indian",
    "Japanese",
    "Thai",
    "Turkish",
    "Syrian",
    "Iraqi",
    "Yemeni",
    "American",
    "Moroccan",
    "Lebanese",
    "German",
  ],
  allergens: ["Dairy", "Gluten", "Tree Nuts", "Shellfish", "Soy", "Eggs"],
  mealType: ["Any Meal", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack"],
  religion: ["Halal", "Kosher"],
  healthGoals: ["Low Calorie", "Low Carb", "High Protein", "Low Fat"],
};

// Ingredient options
const ingredientOptions = [
  "Chicken",
  "Beef",
  "Fish",
  "Rice",
  "Pasta",
  "Tomatoes",
  "Onions",
  "Garlic",
  "Cheese",
  "Eggs",
  "Milk",
  "Flour",
];

const Explore = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  // Handle subcategory selection
  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  // Toggle ingredient selection
  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.some((ing) => ing.name === ingredient)
        ? prev.filter((ing) => ing.name !== ingredient)
        : [...prev, { name: ingredient, quantity: 1, unit: "piece" }],
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pt-4 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">{t("nav.explore")}</h1>
            <p className="text-gray-600 text-sm sm:text-base">Filter recipes by category and ingredients</p>
          </div>
        </div>

        {/* Category Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Main Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category.id)}
                  className="w-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
            {selectedCategory && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {categories
                  .find((c) => c.id === selectedCategory)
                  ?.subcategories.map((sub) => (
                    <Button
                      key={sub}
                      variant={selectedSubcategory === sub ? "default" : "outline"}
                      onClick={() => handleSubcategoryChange(sub)}
                      className="w-full"
                    >
                      {sub}
                    </Button>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ingredient Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {ingredientOptions.map((ing) => (
                <Button
                  key={ing}
                  variant={selectedIngredients.some((i) => i.name === ing) ? "default" : "outline"}
                  onClick={() => toggleIngredient(ing)}
                  size="sm"
                >
                  {ing}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Ingredients */}
        {selectedIngredients.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Selected Ingredients</CardTitle>
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

        {/* Recipe Results */}
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
