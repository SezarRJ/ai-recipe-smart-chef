
import { supabase } from '@/integrations/supabase/client';
import { Recipe as RecipeType, RecipeFilters } from '@/types/recipe';

// Export the Recipe type for use in other components
export type Recipe = RecipeType;

// Export interface for pantry items with ingredients
export interface PantryItemWithIngredient {
  id: string;
  quantity: number | null;
  unit: string | null;
  expiry_date: string | null;
  ingredient?: {
    id: string;
    name: string;
  } | null;
}

export const fetchRecipesFromDB = async (filters?: RecipeFilters) => {
  let query = supabase
    .from('recipes')
    .select(`
      *,
      recipe_ingredients (
        id,
        quantity,
        unit,
        ingredients (
          name
        )
      )
    `)
    .eq('is_public', true);

  if (filters?.category) {
    // Filter by category using the category_id field
    query = query.eq('category_id', filters.category);
  }

  if (filters?.difficulty && ['Easy', 'Medium', 'Hard'].includes(filters.difficulty)) {
    query = query.eq('difficulty', filters.difficulty);
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;

  const formattedRecipes: Recipe[] = data?.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    description: recipe.description || '',
    image_url: recipe.image_url || '',
    prep_time: 0, // Default since prep_time doesn't exist in schema
    cook_time: recipe.cooking_time || 0, // Map cooking_time to cook_time
    servings: recipe.servings || 1,
    difficulty: recipe.difficulty as 'Easy' | 'Medium' | 'Hard' || 'Easy',
    calories: 0, // Default since calories doesn't exist in schema
    cuisine_type: recipe.cuisine_type || '',
    instructions: Array.isArray(recipe.instructions) ? recipe.instructions as string[] : 
                 (recipe.instructions ? [recipe.instructions as string] : []),
    categories: [], // Default since categories doesn't exist in schema
    tags: [], // Default since tags doesn't exist in schema
    status: 'published' as const, // Default since status doesn't exist in schema
    author_id: recipe.user_id || '', // Map user_id to author_id
    is_verified: recipe.is_verified || false,
    created_at: recipe.created_at || '',
    updated_at: recipe.updated_at || '',
    ingredients: recipe.recipe_ingredients?.map((ri: any) => ({
      id: ri.id,
      name: ri.ingredients?.name || '',
      amount: ri.quantity || 0,
      unit: ri.unit || ''
    })) || []
  })) || [];

  return formattedRecipes;
};

export const createRecipeInDB = async (recipeData: Partial<Recipe>) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  if (!recipeData.title) {
    throw new Error('Recipe title is required');
  }

  const { data, error } = await supabase
    .from('recipes')
    .insert([{
      title: recipeData.title,
      description: recipeData.description,
      image_url: recipeData.image_url,
      cooking_time: recipeData.cook_time, // Map cook_time to cooking_time
      servings: recipeData.servings,
      difficulty: recipeData.difficulty,
      cuisine_type: recipeData.cuisine_type,
      instructions: recipeData.instructions,
      user_id: user.id, // Map to user_id instead of author_id
      is_public: true
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateRecipeInDB = async (id: string, updates: Partial<Recipe>) => {
  const { data, error } = await supabase
    .from('recipes')
    .update({
      title: updates.title,
      description: updates.description,
      image_url: updates.image_url,
      cooking_time: updates.cook_time, // Map cook_time to cooking_time
      servings: updates.servings,
      difficulty: updates.difficulty,
      cuisine_type: updates.cuisine_type,
      instructions: updates.instructions
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteRecipeFromDB = async (id: string) => {
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Create a simplified service object that exports the main functions
export const recipeService = {
  searchRecipes: async (query: string) => {
    return fetchRecipesFromDB({ search: query });
  },
  
  searchRecipesByIngredients: async (ingredients: string[]) => {
    // Simple implementation - in reality you'd want more sophisticated ingredient matching
    return fetchRecipesFromDB();
  },
  
  getUserPantryItems: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('pantry_items')
      .select(`
        *,
        ingredients (
          id,
          name
        )
      `)
      .eq('user_id', user.id);

    if (error) throw error;

    return data?.map(item => ({
      id: item.id,
      quantity: item.quantity,
      unit: item.unit,
      expiry_date: item.expiry_date,
      ingredient: item.ingredients
    })) || [];
  },
  
  getIngredientsForRecipe: async (recipeId: string) => {
    const { data, error } = await supabase
      .from('recipe_ingredients')
      .select(`
        *,
        ingredients (
          name
        )
      `)
      .eq('recipe_id', recipeId);

    if (error) throw error;

    return data?.map(ri => ({
      id: ri.id,
      name: ri.ingredients?.name || '',
      amount: ri.quantity || 0,
      unit: ri.unit || ''
    })) || [];
  }
};
