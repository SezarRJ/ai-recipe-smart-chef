
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EnhancedCookingMode } from "@/components/recipe/EnhancedCookingMode";

const CookingMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching recipe data
    setTimeout(() => {
      setRecipe({
        id: id,
        title: "Mediterranean Chickpea Salad",
        image: "/placeholder.svg",
        prepTime: 10,
        cookTime: 10,
        servings: 4,
        difficulty: "Easy",
        rating: 4.5,
        ratingCount: 128,
        calories: 320,
        ingredients: [
          { id: "1", name: "Chickpeas", amount: 2, unit: "cups" },
          { id: "2", name: "Cucumber", amount: 1, unit: "large" },
          { id: "3", name: "Cherry tomatoes", amount: 1, unit: "cup" },
          { id: "4", name: "Red onion", amount: 0.5, unit: "medium" },
          { id: "5", name: "Olive oil", amount: 3, unit: "tbsp" },
          { id: "6", name: "Lemon juice", amount: 2, unit: "tbsp" },
          { id: "7", name: "Feta cheese", amount: 0.5, unit: "cup" }
        ],
        instructions: [
          "Drain and rinse the chickpeas thoroughly under cold water",
          "Dice the cucumber, cherry tomatoes, and red onion into small, uniform pieces",
          "Combine all chopped vegetables with the chickpeas in a large mixing bowl",
          "In a separate small bowl, whisk together olive oil and fresh lemon juice",
          "Pour the dressing over the salad and toss gently to coat all ingredients",
          "Crumble feta cheese on top and give it one final gentle mix",
          "Serve immediately or chill in refrigerator for 30 minutes for best flavor"
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleClose = () => {
    navigate(`/recipe/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wasfah-orange"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h1>
          <button onClick={() => navigate("/explore")} className="px-4 py-2 bg-wasfah-bright-teal text-white rounded-lg">
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <EnhancedCookingMode
      recipe={recipe}
      onClose={handleClose}
    />
  );
};

export default CookingMode;
