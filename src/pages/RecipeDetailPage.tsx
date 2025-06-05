import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  Star, 
  Heart, 
  Share2, 
  ChefHat,
  Flame,
  PlayCircle,
  ShoppingCart,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Recipe } from '@/types/index';
import { CookingMode } from '@/components/recipe/CookingMode';

// Mock recipe data
const mockRecipe: Recipe = {
  id: '1',
  title: 'Mediterranean Quinoa Bowl',
  description: 'A healthy and delicious quinoa bowl with fresh Mediterranean flavors',
  image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
  image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
  prepTime: 15,
  prep_time: 15,
  cookTime: 20,
  cook_time: 20,
  servings: 4,
  difficulty: 'Easy',
  calories: 450,
  rating: 4.5,
  ratingCount: 128,
  cuisineType: 'Mediterranean',
  cuisine_type: 'Mediterranean',
  categories: ['Healthy', 'Vegetarian'],
  tags: ['Quick', 'Easy', 'Nutritious'],
  status: 'published',
  author_id: 'user-1',
  is_verified: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  isFavorite: false,
  ingredients: [
    { id: '1', name: 'Quinoa', amount: 1, unit: 'cup', inPantry: false },
    { id: '2', name: 'Cherry tomatoes', amount: 200, unit: 'g', inPantry: false },
    { id: '3', name: 'Cucumber', amount: 1, unit: 'medium', inPantry: false },
    { id: '4', name: 'Red onion', amount: 0.5, unit: 'medium', inPantry: false },
    { id: '5', name: 'Feta cheese', amount: 100, unit: 'g', inPantry: false }
  ],
  instructions: [
    'Rinse quinoa under cold water until water runs clear',
    'Cook quinoa according to package instructions',
    'While quinoa cooks, dice vegetables',
    'Mix cooked quinoa with vegetables',
    'Add feta cheese and serve'
  ]
};

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCookingMode, setShowCookingMode] = useState(false);

  useEffect(() => {
    // In a real app, fetch recipe by id
    setRecipe(mockRecipe);
    setIsFavorite(mockRecipe.isFavorite);
  }, [id]);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Recipe removed from your favorites" : "Recipe saved to your favorites",
    });
  };

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
        description: "Recipe link has been copied to clipboard",
      });
    }
  };

  const handleStartCooking = () => {
    setShowCookingMode(true);
  };

  const handleCloseCookingMode = () => {
    setShowCookingMode(false);
  };

  const handleAddToMealPlan = async () => {
    try {
      // Here you would typically make an API call to save to meal plan
      // For now, we'll just show a success message
      console.log('Adding to meal plan:', { recipeId: recipe?.id });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Added to meal plan",
        description: "Recipe has been added to your meal plan",
      });
    } catch (error) {
      console.error('Error adding to meal plan:', error);
      toast({
        title: "Error",
        description: "Failed to add recipe to meal plan",
        variant: "destructive",
      });
    }
  };

  if (showCookingMode && recipe) {
    return <CookingMode recipe={recipe} onClose={handleCloseCookingMode} />;
  }

  if (!recipe) {
    return (
      <PageContainer header={{ title: 'Recipe', showBackButton: true }}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Recipe not found</h3>
            <p className="text-gray-500">The recipe you're looking for doesn't exist.</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer header={{ title: recipe.title, showBackButton: true }}>
      <div className="space-y-6 pb-20">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{recipe.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{recipe.rating}</span>
                <span className="text-white/80">({recipe.ratingCount})</span>
              </div>
              <Badge variant="secondary">{recipe.cuisineType}</Badge>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-wasfah-bright-teal mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold">{recipe.prepTime + recipe.cookTime}m</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-wasfah-bright-teal mx-auto mb-2" />
              <p className="text-sm text-gray-600">Serves</p>
              <p className="font-semibold">{recipe.servings}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <ChefHat className="h-6 w-6 text-wasfah-bright-teal mx-auto mb-2" />
              <p className="text-sm text-gray-600">Level</p>
              <p className="font-semibold">{recipe.difficulty}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Flame className="h-6 w-6 text-wasfah-bright-teal mx-auto mb-2" />
              <p className="text-sm text-gray-600">Calories</p>
              <p className="font-semibold">{recipe.calories}</p>
            </CardContent>
          </Card>
        </div>

        {/* Cook Now Button - Prominent placement */}
        <Button
          onClick={handleStartCooking}
          className="w-full bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-deep-teal text-white font-semibold py-6 text-lg"
          size="lg"
        >
          <PlayCircle className="h-6 w-6 mr-2" />
          Start Cooking Mode
        </Button>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            onClick={handleToggleFavorite}
            className={isFavorite ? "text-red-600 border-red-200" : ""}
          >
            <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-red-600" : ""}`} />
            {isFavorite ? "Saved" : "Save"}
          </Button>
          
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <Button variant="outline" onClick={handleAddToMealPlan}>
            <Plus className="h-4 w-4 mr-2" />
            Meal Plan
          </Button>
        </div>

        {/* Description */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">About this recipe</h3>
            <p className="text-gray-600 leading-relaxed">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {recipe.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Ingredients</h3>
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center justify-between">
                  <span>{ingredient.name}</span>
                  <span className="text-gray-600">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Instructions</h3>
            <div className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 bg-wasfah-bright-teal text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default RecipeDetailPage;
