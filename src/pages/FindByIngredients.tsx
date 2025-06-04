
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, X, Loader2, ChefHat } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { PageContainer } from '@/components/layout/PageContainer';

interface IngredientImage {
  id: string;
  ingredient_name: string;
  image_url: string;
  alt_text: string;
}

export default function FindByIngredients() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useRTL();
  const navigate = useNavigate();

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

  const searchRecipesByIngredients = async () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: t('Error', 'خطأ'),
        description: t('Please select at least one ingredient', 'يرجى اختيار مكون واحد على الأقل'),
        variant: 'destructive'
      });
      return;
    }

    // Navigate to AI Find by Ingredients page with selected ingredients
    navigate('/ai-find-by-ingredients', { 
      state: { 
        selectedIngredients,
        fromIngredientSelection: true 
      } 
    });
  };

  return (
    <PageContainer
      header={{
        title: t('Find by Ingredients', 'البحث بالمكونات'),
        showBackButton: true
      }}
    >
      <div className="space-y-6 pb-20">
        <div className="text-center space-y-4">
          <ChefHat className="h-12 w-12 mx-auto text-wasfah-bright-teal" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Find Recipes by Ingredients', 'ابحث عن الوصفات بالمكونات')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Select ingredients to find matching recipes', 'اختر المكونات للعثور على الوصفات المناسبة')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            placeholder={t('Search ingredients...', 'ابحث عن المكونات...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* Selected Ingredients */}
        {selectedIngredients.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              {t('Selected Ingredients', 'المكونات المختارة')} ({selectedIngredients.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <Badge
                  key={ingredient}
                  variant="secondary"
                  className="gap-1 py-2 px-3 text-sm bg-wasfah-bright-teal text-white"
                >
                  {ingredient}
                  <button onClick={() => handleRemoveIngredient(ingredient)}>
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
            <Button 
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-deep-teal text-white"
              onClick={searchRecipesByIngredients}
              size="lg"
            >
              <ChefHat className="mr-2 h-5 w-5" />
              {t('Find Recipes with AI', 'ابحث عن الوصفات بالذكاء الاصطناعي')}
            </Button>
          </div>
        )}

        {/* Available Ingredients */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {t('Available Ingredients', 'المكونات المتاحة')}
          </h3>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-wasfah-bright-teal" />
            </div>
          ) : filteredIngredients.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">
                  {searchQuery ? 
                    t('No ingredients found', 'لم يتم العثور على مكونات') : 
                    t('Loading ingredients...', 'جاري تحميل المكونات...')
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredIngredients.map((ingredient) => (
                <Card
                  key={ingredient.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedIngredients.includes(ingredient.ingredient_name)
                      ? 'ring-2 ring-wasfah-bright-teal bg-wasfah-bright-teal/10'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleIngredientToggle(ingredient.ingredient_name)}
                >
                  <CardContent className="p-3 text-center">
                    {ingredient.image_url && (
                      <img
                        src={ingredient.image_url}
                        alt={ingredient.alt_text || ingredient.ingredient_name}
                        className="w-12 h-12 object-cover rounded-full mx-auto mb-2"
                        loading="lazy"
                      />
                    )}
                    <h4 className="font-medium text-xs mb-1">{ingredient.ingredient_name}</h4>
                    {selectedIngredients.includes(ingredient.ingredient_name) && (
                      <div className="mt-1">
                        <Plus className="h-3 w-3 text-wasfah-bright-teal mx-auto" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
