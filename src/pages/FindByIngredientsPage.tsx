
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Loader2, Plus, X } from 'lucide-react';
import { recipeService } from '@/services/recipeService';
import { Recipe } from '@/types/index';
import { toast } from '@/hooks/use-toast';

const FindByIngredientsPage = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const searchRecipes = async () => {
    if (ingredients.length === 0) {
      toast({
        title: "No ingredients",
        description: "Please add at least one ingredient to search.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const foundRecipes = await recipeService.searchRecipesByIngredientsAI(ingredients);
      console.log('AI search results:', foundRecipes);
      
      if (foundRecipes && Array.isArray(foundRecipes)) {
        // Transform the API results to match our Recipe interface
        const transformedRecipes: Recipe[] = foundRecipes.map((recipe: any) => ({
          id: recipe.id?.toString() || Math.random().toString(),
          title: recipe.title || recipe.name || 'Untitled Recipe',
          description: recipe.description || recipe.summary || '',
          image_url: recipe.image || recipe.image_url || '/placeholder.svg',
          image: recipe.image || recipe.image_url || '/placeholder.svg',
          prep_time: recipe.prep_time || recipe.prepTime || 15,
          cooking_time: recipe.cooking_time || recipe.cookTime || recipe.cook_time || 30,
          cook_time: recipe.cook_time || recipe.cookTime || recipe.cooking_time || 30,
          servings: recipe.servings || 4,
          difficulty: recipe.difficulty || 'Medium',
          calories: recipe.calories || 300,
          protein: Number(recipe.protein) || 20,
          carbs: Number(recipe.carbs) || Number(recipe.carbohydrates) || 30,
          fat: Number(recipe.fat) || 10,
          cuisine_type: recipe.cuisine_type || recipe.cuisine || '',
          instructions: Array.isArray(recipe.instructions) ? recipe.instructions : 
                       typeof recipe.instructions === 'string' ? [recipe.instructions] : 
                       recipe.analyzedInstructions?.[0]?.steps?.map((step: any) => step.step) || [],
          categories: recipe.categories || recipe.cuisines || [],
          tags: recipe.tags || recipe.dishTypes || [],
          author_id: recipe.author_id || 'api',
          is_verified: recipe.is_verified || true,
          created_at: recipe.created_at || new Date().toISOString(),
          updated_at: recipe.updated_at || new Date().toISOString(),
          rating: recipe.rating || 4.5,
          rating_count: recipe.rating_count || recipe.aggregateLikes || 89,
          isFavorite: false,
          ingredients: recipe.ingredients?.map((ing: any) => ({
            id: ing.id?.toString() || Math.random().toString(),
            name: ing.name || ing.original || '',
            quantity: ing.quantity || ing.amount || 1,
            unit: ing.unit || 'unit'
          })) || []
        }));

        setRecipes(transformedRecipes);
        
        if (transformedRecipes.length === 0) {
          toast({
            title: "No recipes found",
            description: "Try different ingredients or fewer ingredients.",
          });
        }
      } else {
        setRecipes([]);
        toast({
          title: "No recipes found",
          description: "Try different ingredients or fewer ingredients.",
        });
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
      setRecipes([]);
      toast({
        title: "Search failed",
        description: "There was an error searching for recipes. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Find by Ingredients',
        showBackButton: true,
        showSearch: false
      }}
    >
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Ingredient Input Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">What ingredients do you have?</h2>
          
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Enter an ingredient..."
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={addIngredient} disabled={!currentIngredient.trim()}>
              <Plus size={16} className="mr-2" />
              Add
            </Button>
          </div>

          {/* Ingredients List */}
          {ingredients.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Your ingredients:</h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="ml-2 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button 
            onClick={searchRecipes} 
            disabled={ingredients.length === 0 || isLoading}
            className="w-full mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              `Find Recipes (${ingredients.length} ingredients)`
            )}
          </Button>
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {recipes.length > 0 
                ? `Found ${recipes.length} recipe${recipes.length === 1 ? '' : 's'}`
                : 'No recipes found'
              }
            </h2>
            
            {recipes.length > 0 && (
              <RecipeGrid recipes={recipes} />
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default FindByIngredientsPage;
