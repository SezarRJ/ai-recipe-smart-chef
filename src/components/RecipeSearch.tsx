
import { useState } from 'react';
import { useRecipeSearch } from '@/hooks/useRecipeSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, X, Search, Plus, Filter } from 'lucide-react';
import { RecipeCard } from '@/components/RecipeCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { AdvancedFilters } from '@/components/AdvancedFilters';
import { IngredientSelector } from '@/components/IngredientSelector';
import { Recipe } from '@/types/index';
import { Ingredient } from '@/components/ingredients/types';

export const RecipeSearch = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showIngredientSelector, setShowIngredientSelector] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [localIngredients, setLocalIngredients] = useState<string[]>([]);
  const { t } = useLanguage();
  
  const {
    searchResults,
    isSearching,
    searchRecipes
  } = useRecipeSearch();

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setLocalIngredients(prev => [...prev, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setLocalIngredients(prev => prev.filter(item => item !== ingredient));
  };

  const handleIngredientsChange = (ingredients: any[]) => {
    const ingredientNames = ingredients.map(ing => ing.name);
    setLocalIngredients(ingredientNames);
  };

  const handleSearch = () => {
    const ingredientsForSearch: Ingredient[] = localIngredients.map((name, index) => ({
      id: `local-${index}`,
      name,
      quantity: '1',
      unit: 'item',
      source: 'manual'
    }));
    searchRecipes(ingredientsForSearch, null, null, null);
  };

  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // Implement filter logic here
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4">
      <div className="space-y-4">
        {/* Main Search */}
        <div className="flex items-center gap-2 relative">
          <div className="relative flex-1">
            <Input
              placeholder={t("search.placeholder")}
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              className="pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="shrink-0"
          >
            <Filter size={18} />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowIngredientSelector(!showIngredientSelector)}
          >
            <Plus size={16} className="mr-1" />
            Add Ingredients
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAddIngredient}
          >
            <Plus size={16} className="mr-1" />
            Add Current
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleSearch}
            disabled={isSearching || localIngredients.length === 0}
          >
            {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search size={16} className="mr-1" />}
            Search Recipes
          </Button>
        </div>

        {/* Ingredient Selector */}
        {showIngredientSelector && (
          <div className="animate-fade-in">
            <IngredientSelector 
              onIngredientsChange={handleIngredientsChange}
            />
          </div>
        )}

        {/* Selected Ingredients */}
        {localIngredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {localIngredients.map((ingredient) => (
              <Badge key={ingredient} variant="secondary" className="gap-1 py-1 px-3">
                {ingredient}
                <button onClick={() => handleRemoveIngredient(ingredient)}>
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFilters 
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onFiltersChange={handleFiltersChange}
      />

      {/* Search Results */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {searchResults.length} Recipe{searchResults.length !== 1 ? 's' : ''} Found
        </h2>
        
        {isSearching ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-wasfah-orange" />
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {(localIngredients.length > 0) ? (
              <div>
                <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-lg font-medium">No recipes found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div>
                <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-lg font-medium">Start your culinary journey</p>
                <p className="text-sm">Search for recipes by name or ingredients</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {searchResults.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
