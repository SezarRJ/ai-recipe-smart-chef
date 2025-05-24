
import { useState } from 'react';
import { useRecipeSearch } from '@/hooks/useRecipeSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, X, Search, Plus, Filter, Mic, Camera } from 'lucide-react';
import { RecipeCard } from '@/components/RecipeCard';
import { useLanguage } from '@/contexts/LanguageContext';

export const RecipeSearch = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const { t } = useLanguage();
  
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

  const handleVoiceInput = () => {
    // TODO: Implement voice recognition
    console.log('Voice input feature coming soon');
  };

  const handleImageInput = () => {
    // TODO: Implement image recognition
    console.log('Image recognition feature coming soon');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4">
      <div className="space-y-4">
        {/* Main Search */}
        <div className="flex items-center gap-2 relative">
          <div className="relative flex-1">
            <Input
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
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

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md border animate-fade-in">
            <h3 className="font-semibold mb-3">{t("search.filters")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Dietary Preferences */}
              <div>
                <label className="block text-sm font-medium mb-1">Dietary</label>
                <select className="w-full p-2 border rounded-md text-sm">
                  <option value="">Any</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten-free</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                </select>
              </div>

              {/* Cooking Time */}
              <div>
                <label className="block text-sm font-medium mb-1">{t("recipe.cookingTime")}</label>
                <select className="w-full p-2 border rounded-md text-sm">
                  <option value="">Any time</option>
                  <option value="15">Under 15 min</option>
                  <option value="30">Under 30 min</option>
                  <option value="60">Under 1 hour</option>
                  <option value="120">Under 2 hours</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium mb-1">{t("recipe.difficulty")}</label>
                <select className="w-full p-2 border rounded-md text-sm">
                  <option value="">Any level</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Cuisine Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Cuisine</label>
                <select className="w-full p-2 border rounded-md text-sm">
                  <option value="">Any cuisine</option>
                  <option value="italian">Italian</option>
                  <option value="chinese">Chinese</option>
                  <option value="mexican">Mexican</option>
                  <option value="indian">Indian</option>
                  <option value="japanese">Japanese</option>
                  <option value="french">French</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="middle-eastern">Middle Eastern</option>
                </select>
              </div>

              {/* Meal Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Meal Type</label>
                <select className="w-full p-2 border rounded-md text-sm">
                  <option value="">Any meal</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                  <option value="dessert">Dessert</option>
                </select>
              </div>

              {/* Health Goal */}
              <div>
                <label className="block text-sm font-medium mb-1">Health Goal</label>
                <select className="w-full p-2 border rounded-md text-sm">
                  <option value="">Any goal</option>
                  <option value="weight-loss">Weight Loss</option>
                  <option value="muscle-gain">Muscle Gain</option>
                  <option value="heart-healthy">Heart Healthy</option>
                  <option value="low-sodium">Low Sodium</option>
                  <option value="high-protein">High Protein</option>
                  <option value="low-carb">Low Carb</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Ingredient Search */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">{t("search.ingredients")}</h3>
          
          {/* Ingredient Input with Multiple Options */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                placeholder={t("action.add") + " ingredient..."}
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddIngredient();
                  }
                }}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <button
                  onClick={handleVoiceInput}
                  className="p-1 text-gray-400 hover:text-wasfah-orange transition-colors"
                  title="Voice input"
                >
                  <Mic size={16} />
                </button>
                <button
                  onClick={handleImageInput}
                  className="p-1 text-gray-400 hover:text-wasfah-orange transition-colors"
                  title="Image recognition"
                >
                  <Camera size={16} />
                </button>
              </div>
            </div>
            <Button size="icon" onClick={handleAddIngredient}>
              <Plus size={18} />
            </Button>
          </div>

          {/* Selected Ingredients */}
          {selectedIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary" className="gap-1 py-1 px-3">
                  {ingredient}
                  <button onClick={() => handleIngredientRemove(ingredient)}>
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              onClick={loadPantryItems} 
              disabled={isPantryLoading}
            >
              {isPantryLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Load from {t("nav.pantry")}
            </Button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {results.length} Recipe{results.length !== 1 ? 's' : ''} Found
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-wasfah-orange" />
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {(searchQuery || selectedIngredients.length > 0) ? (
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
            {results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
