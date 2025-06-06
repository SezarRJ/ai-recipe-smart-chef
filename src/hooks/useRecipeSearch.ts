import { useState } from 'react';
import { Recipe } from '@/types/index';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';
import { DrinkOptions } from '@/components/drinks/DrinkCustomizationForm';
import { Ingredient } from '@/components/ingredients/types';

export const useRecipeSearch = () => {
  const { toast } = useToast();
  const { t } = useRTL();
  
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const searchRecipes = async (addedIngredients: Ingredient[], customDrinkOptions: DrinkOptions | null, selectedCategory: any, selectedSubcategory: any) => {
    const isAlcoholicDrinkSearch = selectedCategory?.id === 'alcohol' && selectedSubcategory;
    
    if (!isAlcoholicDrinkSearch && addedIngredients.length === 0) {
      toast({
        title: t('Error', 'خطأ'),
        description: t('Please select at least one ingredient', 'يرجى اختيار مكون واحد على الأقل'),
        variant: "destructive",
      });
      return { results: [], showResults: false };
    }
    
    setIsSearching(true);
    try {
      let results: Recipe[] = [];
      
      if (isAlcoholicDrinkSearch && customDrinkOptions) {
        toast({
          title: t('Custom Drinks', 'المشروبات المخصصة'),
          description: t('Custom drink generation coming soon!', 'توليد المشروبات المخصصة قريباً!'),
        });
        results = [];
      } else {
        const ingredientNames = addedIngredients.map(ing => ing.name);
        const aiQuery = `Generate 3-4 quick and easy recipes using: ${ingredientNames.join(', ')}.

Return ONLY valid JSON array. Format:
[{
  "title": "Recipe Name",
  "description": "Brief description", 
  "difficulty": "Easy",
  "prep_time": 10,
  "cook_time": 20,
  "servings": 4,
  "cuisine_type": "International",
  "calories": 300,
  "ingredients": [{"name": "ingredient", "amount": 1, "unit": "cup"}],
  "instructions": ["Step 1", "Step 2"]
}]

Focus on practical recipes that can be made with the ingredients provided.`;

        const { data: aiResponse, error: aiError } = await supabase.functions.invoke('ai-chef', {
          body: {
            query: aiQuery,
            context: {
              selectedIngredients: ingredientNames,
              requestType: 'recipe_generation',
              responseFormat: 'json_array'
            }
          }
        });

        if (aiError) throw new Error(`AI service error: ${aiError.message || 'Unknown error'}`);
        if (!aiResponse || !aiResponse.response) throw new Error('Invalid or empty response from AI service');

        let aiRecipes = [];
        try {
          const responseText = aiResponse.response.trim();
          if (responseText.startsWith('[') && responseText.endsWith(']')) {
            aiRecipes = JSON.parse(responseText);
          } else {
            const jsonArrayMatch = responseText.match(/\[[\s\S]*\]/);
            if (jsonArrayMatch) {
              aiRecipes = JSON.parse(jsonArrayMatch[0]);
            } else {
              aiRecipes = [createFallbackRecipe(ingredientNames)];
            }
          }
          if (!Array.isArray(aiRecipes) || aiRecipes.length === 0) throw new Error('No valid recipes found');
        } catch {
          aiRecipes = [createFallbackRecipe(ingredientNames)];
        }

        results = aiRecipes.map((recipe: any, index: number): Recipe => ({
          id: `ai-recipe-${Date.now()}-${index}`,
          title: recipe.title || `Recipe with ${ingredientNames.join(', ')}`,
          description: recipe.description || `A recipe using ${ingredientNames.join(', ')}`,
          image: '',
          image_url: '',
          prepTime: recipe.prep_time || 15,
          prep_time: recipe.prep_time || 15,
          cookTime: recipe.cook_time || 30,
          cook_time: recipe.cook_time || 30,
          servings: recipe.servings || 4,
          difficulty: recipe.difficulty || 'Medium',
          calories: recipe.calories || 300,
          rating: 0,
          ratingCount: 0,
          instructions: Array.isArray(recipe.instructions) ? recipe.instructions :
            (recipe.instructions ? [recipe.instructions] : ['Follow recipe steps']),
          categories: [],
          tags: ['AI Generated'],
          isFavorite: false,
          cuisineType: recipe.cuisine_type || 'Fusion',
          cuisine_type: recipe.cuisine_type || 'Fusion',
          status: 'published' as const,
          author_id: 'ai-chef',
          is_verified: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ingredients: Array.isArray(recipe.ingredients) ?
            recipe.ingredients.map((ing: any) => ({
              id: `ing-${Math.random()}`,
              name: typeof ing === 'string' ? ing : (ing.name || ing.ingredient || 'Unknown'),
              amount: typeof ing === 'object' ? (ing.amount || ing.quantity || 1) : 1,
              unit: typeof ing === 'object' ? (ing.unit || 'cup') : 'cup',
              inPantry: false
            })) :
            ingredientNames.map(ing => ({
              id: `ing-${Math.random()}`,
              name: ing,
              amount: 1,
              unit: 'cup',
              inPantry: false
            }))
        }));
      }

      setSearchResults(results);
      setShowResults(true);

      if (results.length === 0) {
        toast({
          title: t('No Results Found', 'لم يتم العثور على نتائج'),
          description: t('No recipes found with your selected ingredients. Try different ingredients or remove some filters.', 'لم يتم العثور على وصفات بالمكونات المختارة. جرب مكونات أخرى أو احذف بعض المرشحات.'),
        });
      } else {
        toast({
          title: t('Search Complete', 'اكتمل البحث'),
          description: `${t('Found', 'تم العثور على')} ${results.length} ${t('recipes', 'وصفة')}!`,
        });
      }
      
      return { results, showResults: true };
    } catch (error: any) {
      toast({
        title: t('Error', 'خطأ'),
        description: error.message || t('Failed to search recipes. Please try again.', 'فشل في البحث عن الوصفات. يرجى المحاولة مرة أخرى.'),
        variant: "destructive",
      });
      return { results: [], showResults: false };
    } finally {
      setIsSearching(false);
    }
  };
  
  const createFallbackRecipe = (ingredientNames: string[]) => {
    return {
      title: `Creative Recipe with ${ingredientNames.slice(0, 2).join(' & ')}`,
      description: `A delicious combination using ${ingredientNames.join(', ')}.`,
      difficulty: 'Medium',
      prep_time: 15,
      cook_time: 25,
      servings: 4,
      cuisine_type: 'Fusion',
      calories: 320,
      instructions: [
        'Prepare and wash all ingredients',
        'Heat oil in a large pan',
        'Add ingredients in order of cook time needed',
        'Season with salt, pepper, and preferred spices',
        'Cook until ingredients are tender',
        'Adjust seasoning and serve hot'
      ],
      ingredients: ingredientNames.map(ing => ({
        name: ing,
        amount: 1,
        unit: 'cup'
      }))
    };
  };

  return {
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    showResults,
    setShowResults,
    searchRecipes
  };
};
