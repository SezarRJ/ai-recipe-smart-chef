
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, X } from 'lucide-react';
import { MobileHeader } from '@/components/MobileHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

interface IngredientImage {
  id: string;
  ingredient_name: string;
  image_url: string;
  alt_text: string;
}

export default function FindByIngredients() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const { data: ingredientImages, isLoading } = useQuery({
    queryKey: ['ingredient-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ingredient_images')
        .select('*')
        .order('ingredient_name');
      
      if (error) throw error;
      return data as IngredientImage[];
    }
  });

  const filteredIngredients = ingredientImages?.filter(ingredient =>
    ingredient.ingredient_name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => prev.filter(i => i !== ingredient));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {isMobile && <MobileHeader title="Find by Ingredients" />}
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Find Recipes by Ingredients
          </h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Input
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Selected Ingredients */}
          {selectedIngredients.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Selected Ingredients ({selectedIngredients.length})</h3>
              <div className="flex flex-wrap gap-2">
                {selectedIngredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="secondary"
                    className="gap-1 py-2 px-3 text-sm"
                  >
                    {ingredient}
                    <button onClick={() => handleRemoveIngredient(ingredient)}>
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
              <Button className="mt-3 bg-wasfah-orange hover:bg-wasfah-orange-dark">
                Find Recipes ({selectedIngredients.length} ingredients)
              </Button>
            </div>
          )}

          {/* Ingredients Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {isLoading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              filteredIngredients.map((ingredient) => (
                <Card
                  key={ingredient.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedIngredients.includes(ingredient.ingredient_name)
                      ? 'ring-2 ring-wasfah-orange bg-orange-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleIngredientToggle(ingredient.ingredient_name)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="relative mb-2">
                      <img
                        src={ingredient.image_url}
                        alt={ingredient.alt_text || ingredient.ingredient_name}
                        className="w-16 h-16 object-cover rounded-full mx-auto"
                      />
                      {selectedIngredients.includes(ingredient.ingredient_name) && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-wasfah-orange rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium capitalize">
                      {ingredient.ingredient_name}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
