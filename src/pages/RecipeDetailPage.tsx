import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { mockRecipes } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Heart, Share, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CookingMode } from '@/components/recipe/CookingMode';
import { RecipeDetail } from '@/components/recipe/RecipeDetail';
import { globalCuisineService } from '@/services/globalCuisineService';

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCookingMode, setIsCookingMode] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // First try to find in mock recipes, then try API
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      // First check mock recipes
      const mockRecipe = mockRecipes.find(r => r.id === id);
      if (mockRecipe) {
        setRecipe(mockRecipe);
        setLoading(false);
        return;
      }

      // If not found in mock recipes, try API
      try {
        const apiRecipe = await globalCuisineService.getRecipeById(parseInt(id));
        if (apiRecipe) {
          // Convert API recipe to mock recipe format
          const convertedRecipe = {
            id: apiRecipe.id.toString(),
            title: apiRecipe.title,
            description: apiRecipe.summary?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || '',
            image: apiRecipe.image,
            prepTime: Math.floor(apiRecipe.readyInMinutes / 2),
            cookTime: Math.ceil(apiRecipe.readyInMinutes / 2),
            servings: apiRecipe.servings,
            difficulty: 'Medium' as const,
            calories: apiRecipe.nutrition?.calories || 300,
            rating: 4.5,
            ratingCount: 89,
            ingredients: apiRecipe.ingredients?.map(ing => ({
              name: ing.name,
              amount: ing.amount,
              unit: ing.unit
            })) || [],
            instructions: apiRecipe.instructions?.replace(/<[^>]*>/g, '').split('.').filter(s => s.trim()).map(s => s.trim()) || [],
            categories: apiRecipe.cuisines || [],
            tags: apiRecipe.dishTypes || [],
            isFavorite: false,
            nutrition: apiRecipe.nutrition ? {
              calories: apiRecipe.nutrition.calories,
              protein: parseInt(apiRecipe.nutrition.protein) || 0,
              carbs: parseInt(apiRecipe.nutrition.carbohydrates) || 0,
              fat: parseInt(apiRecipe.nutrition.fat) || 0,
              fiber: 0
            } : undefined
          };
          setRecipe(convertedRecipe);
        }
      } catch (error) {
        console.error('Error fetching recipe from API:', error);
      }
      
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);
  
  if (loading) {
    return (
      <PageContainer
        header={{
          title: 'Loading Recipe...',
          showBackButton: true,
        }}
      >
        <div className="container px-4 py-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-wasfah-bright-teal" />
          <p>Loading recipe details...</p>
        </div>
      </PageContainer>
    );
  }

  if (!recipe) {
    return (
      <PageContainer
        header={{
          title: 'Recipe Not Found',
          showBackButton: true,
        }}
      >
        <div className="container px-4 py-8 text-center">
          <p>The recipe you're looking for doesn't exist.</p>
          <Button 
            className="mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal"
            onClick={() => navigate('/global-cuisine')}
          >
            Browse Global Cuisine
          </Button>
        </div>
      </PageContainer>
    );
  }

  const handleAddToShoppingList = () => {
    toast({
      title: "Added to Shopping List",
      description: "Missing ingredients have been added to your shopping list.",
    });
  };

  const handleStartCookingMode = () => {
    setIsCookingMode(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isCookingMode) {
    return <CookingMode recipe={recipe} onClose={() => setIsCookingMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header with Back Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="text-wasfah-deep-teal">
              <Heart 
                size={20} 
                className={recipe.isFavorite ? 'fill-wasfah-coral-red text-wasfah-coral-red' : ''}
              />
            </Button>
            <Button variant="ghost" size="icon" className="text-wasfah-deep-teal">
              <Share size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="pt-16">
        <RecipeDetail 
          recipe={recipe}
          onAddToShoppingList={handleAddToShoppingList}
          onStartCookingMode={handleStartCookingMode}
        />
      </div>
    </div>
  );
}
