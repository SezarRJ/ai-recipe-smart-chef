
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Clock, Users, ChefHat, Heart, Share2, BookOpen, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simulate fetching recipe data
    setTimeout(() => {
      setRecipe({
        id: id,
        title: "Mediterranean Chickpea Salad",
        description: "A healthy and delicious Mediterranean-inspired chickpea salad perfect for lunch or dinner.",
        image: "/placeholder.svg",
        cookingTime: 20,
        servings: 4,
        difficulty: "Easy",
        cuisine: "Mediterranean",
        ingredients: [
          { name: "Chickpeas", quantity: 2, unit: "cups" },
          { name: "Cucumber", quantity: 1, unit: "large" },
          { name: "Cherry tomatoes", quantity: 1, unit: "cup" },
          { name: "Red onion", quantity: 0.5, unit: "medium" },
          { name: "Olive oil", quantity: 3, unit: "tbsp" },
          { name: "Lemon juice", quantity: 2, unit: "tbsp" },
          { name: "Feta cheese", quantity: 0.5, unit: "cup" }
        ],
        instructions: [
          "Drain and rinse the chickpeas",
          "Dice the cucumber, tomatoes, and red onion",
          "Combine all vegetables in a large bowl",
          "Whisk together olive oil and lemon juice",
          "Pour dressing over salad and toss",
          "Crumble feta cheese on top",
          "Serve immediately or chill for 30 minutes"
        ],
        nutrition: {
          calories: 320,
          protein: 12,
          carbs: 28,
          fat: 18,
          fiber: 8
        },
        tags: ["Vegetarian", "Mediterranean", "Quick", "Healthy"]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe?.title,
        text: recipe?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Recipe link copied to clipboard",
      });
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Recipe removed from your favorites" : "Recipe added to your favorites",
    });
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
          <Button onClick={() => navigate("/explore")}>Back to Explore</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleFavorite}>
              <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Recipe Image */}
      <div className="relative h-64 bg-gray-200">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 right-4">
          <Button
            onClick={() => navigate(`/cooking/${recipe.id}`)}
            className="bg-wasfah-orange hover:bg-wasfah-orange/90 rounded-full w-12 h-12 flex items-center justify-center"
          >
            <Play size={20} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Recipe Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Clock className="mx-auto mb-1 text-wasfah-orange" size={20} />
              <p className="text-sm text-gray-600">{recipe.cookingTime} min</p>
            </div>
            <div className="text-center">
              <Users className="mx-auto mb-1 text-wasfah-orange" size={20} />
              <p className="text-sm text-gray-600">{recipe.servings} servings</p>
            </div>
            <div className="text-center">
              <ChefHat className="mx-auto mb-1 text-wasfah-orange" size={20} />
              <p className="text-sm text-gray-600">{recipe.difficulty}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-gray-600">{ingredient.quantity} {ingredient.unit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {recipe.instructions.map((instruction: string, index: number) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-wasfah-orange text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{instruction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-wasfah-orange">{recipe.nutrition.calories}</p>
                    <p className="text-sm text-gray-600">Calories</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-wasfah-orange">{recipe.nutrition.protein}g</p>
                    <p className="text-sm text-gray-600">Protein</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-wasfah-orange">{recipe.nutrition.carbs}g</p>
                    <p className="text-sm text-gray-600">Carbs</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-wasfah-orange">{recipe.nutrition.fat}g</p>
                    <p className="text-sm text-gray-600">Fat</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate(`/cooking/${recipe.id}`)}
            className="w-full bg-gradient-to-r from-wasfah-orange to-wasfah-green"
          >
            <BookOpen className="mr-2" size={16} />
            Start Cooking
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              Add to Meal Plan
            </Button>
            <Button variant="outline" className="w-full">
              Add to Shopping List
            </Button>
          </div>
        </div>
      </div>

      <MobileNavigation />
    </div>
  );
};

export default RecipeDetail;
