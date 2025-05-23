
import { useState } from 'react';
import { useRecipeSearch } from '@/hooks/useRecipeSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, X, Search, Plus, Filter } from 'lucide-react';
import { RecipeCard } from '@/components/RecipeCard';

export const RecipeSearch = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  
  const {
    searchQuery,
    selectedIngredients,
    results,
    isLoading,
    handleSearch,
    handleIngredientAdd,
    handleIngredientRemove,
    loadPantryItems,
    isPantryLoading
  } = useRecipeSearch();

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      handleIngredientAdd(newIngredient.trim());
      setNewIngredient('');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-2 relative">
          <Input
            placeholder="Search by recipe name..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1"
          />
          <Button 
            size="icon" 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
          </Button>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="font-medium mb-2">Search Filters</h3>
            <div className="text-sm text-gray-600">
              (Filters will be implemented here)
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="font-medium">Search by ingredients</h3>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add ingredient..."
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddIngredient();
                }
              }}
            />
            <Button size="icon" onClick={handleAddIngredient}>
              <Plus size={18} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ingredient) => (
              <Badge key={ingredient} variant="secondary" className="gap-1 py-1 px-2">
                {ingredient}
                <button onClick={() => handleIngredientRemove(ingredient)}>
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={loadPantryItems} 
              disabled={isPantryLoading}
              className="text-xs"
            >
              {isPantryLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Load from Pantry
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium mb-3">
          {results.length} Recipe{results.length !== 1 ? 's' : ''} Found
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            {(searchQuery || selectedIngredients.length > 0) ? (
              <p>No recipes match your search criteria</p>
            ) : (
              <p>Search for recipes by name or ingredients</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
