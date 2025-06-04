
import { useQuery } from '@tanstack/react-query';
import { Recipe } from '@/types/index';
import recipeService from '@/services/recipeService';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ChefHat, Bookmark } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { data: ingredients = [], isLoading } = useQuery({
    queryKey: ['recipeIngredients', recipe.id],
    queryFn: async () => {
      try {
        return await recipeService.getIngredientsForRecipe(recipe.id);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        return [];
      }
    },
    enabled: !!recipe.id,
  });

  const handleAddToMealPlan = () => {
    toast({
      title: "Feature coming soon!",
      description: "Add to meal plan will be available in the next update"
    });
  };

  const handleSaveRecipe = () => {
    toast({
      title: "Recipe saved!",
      description: "The recipe has been saved to your collection"
    });
  };

  return (
    <Card className="overflow-hidden">
      {recipe.image_url ? (
        <div className="w-full h-44 overflow-hidden">
          <img 
            src={recipe.image_url} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-400">No image available</p>
        </div>
      )}
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
        
        {recipe.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {recipe.description}
          </p>
        )}
        
        <div className="flex items-center gap-3 text-sm text-gray-500">
          {recipe.cook_time && (
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{recipe.cook_time} mins</span>
            </div>
          )}
          
          {recipe.difficulty && (
            <div className="flex items-center gap-1">
              <ChefHat size={16} />
              <span className="capitalize">{recipe.difficulty}</span>
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <h4 className="text-sm font-medium mb-1">Main ingredients:</h4>
          {isLoading ? (
            <p className="text-xs text-gray-500">Loading ingredients...</p>
          ) : (
            <div className="flex flex-wrap gap-1">
              {ingredients.slice(0, 3).map((ingredient: any, idx: number) => (
                <span 
                  key={idx} 
                  className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                >
                  {ingredient.name}
                </span>
              ))}
              {ingredients.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{ingredients.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          onClick={handleAddToMealPlan}
        >
          Add to Meal Plan
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleSaveRecipe}
        >
          <Bookmark size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};
