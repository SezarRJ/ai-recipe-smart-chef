
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus, X, Search, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { mockRecipes } from '@/data/mockData';

const AIFindByIngredientsPage = () => {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
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
      addIngredient();
    }
  };

  const searchRecipes = async () => {
    if (ingredients.length === 0) {
      toast({
        title: 'No ingredients',
        description: 'Please add some ingredients first',
        variant: 'destructive'
      });
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      // Simulate AI search - in reality this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Filter mock recipes based on ingredients
      const filteredRecipes = mockRecipes.filter(recipe =>
        ingredients.some(ingredient =>
          recipe.ingredients.some(recipeIngredient =>
            recipeIngredient.name.toLowerCase().includes(ingredient.toLowerCase())
          )
        )
      ).slice(0, 6);

      setRecipes(filteredRecipes);

      toast({
        title: 'AI Search Complete',
        description: `Found ${filteredRecipes.length} recipes matching your ingredients`
      });
    } catch (error) {
      toast({
        title: 'Search failed',
        description: 'Unable to search recipes. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <PageContainer
      header={{
        title: 'AI Recipe Finder',
        showBackButton: true,
      }}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-wasfah-bright-teal" />
              AI-Powered Recipe Discovery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add an ingredient..."
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={addIngredient} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary" className="flex items-center gap-1">
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <Button
              onClick={searchRecipes}
              disabled={ingredients.length === 0 || isSearching}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  AI is thinking...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Find Recipes with AI
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {hasSearched && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {recipes.length > 0 ? 'AI Recommendations' : 'No recipes found'}
            </h2>
            {recipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Try different ingredients or check your spelling.</p>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default AIFindByIngredientsPage;
