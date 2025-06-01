
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EnhancedCookingMode } from "@/components/recipe/EnhancedCookingMode";
import { Recipe } from "@/types/index";

const CookingMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching recipe data
    setTimeout(() => {
      setRecipe({
        id: id || '1',
        title: "Mediterranean Chickpea Salad",
        description: "A fresh and healthy Mediterranean-style chickpea salad",
        image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        prep_time: 15,
        cook_time: 0,
        cooking_time: 15,
        servings: 4,
        difficulty: "Easy",
        cuisine_type: "Mediterranean",
        calories: 320,
        protein: 12,
        carbs: 45,
        fat: 8,
        rating: 4.5,
        rating_count: 128,
        instructions: [
          "Drain and rinse the chickpeas thoroughly in cold water",
          "Dice the cucumber, tomatoes, and red onion into small pieces",
          "Combine all vegetables in a large mixing bowl",
          "Whisk together olive oil, lemon juice, salt, and pepper",
          "Pour dressing over salad and toss gently to combine",
          "Crumble feta cheese on top and add fresh herbs",
          "Let salad rest for 10 minutes to allow flavors to meld",
          "Serve immediately or chill for up to 2 hours before serving"
        ],
        ingredients: [
          { name: "Chickpeas", amount: 2, unit: "cans" },
          { name: "Cucumber", amount: 1, unit: "large" },
          { name: "Tomatoes", amount: 2, unit: "medium" },
          { name: "Red onion", amount: 0.5, unit: "small" },
          { name: "Olive oil", amount: 3, unit: "tablespoons" },
          { name: "Lemon juice", amount: 2, unit: "tablespoons" },
          { name: "Feta cheese", amount: 100, unit: "grams" },
          { name: "Fresh parsley", amount: 0.25, unit: "cup" }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: "user-1",
        is_public: true
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleCloseCooking = () => {
    navigate(`/recipe/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wasfah-orange mx-auto"></div>
          <p className="text-gray-600">Loading cooking mode...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Recipe Not Found</h1>
          <p className="text-gray-600">The recipe you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/recipes")}>
            Back to Recipes
          </Button>
        </div>
      </div>
    );
  }

  return <EnhancedCookingMode recipe={recipe} onClose={handleCloseCooking} />;
};

export default CookingMode;
