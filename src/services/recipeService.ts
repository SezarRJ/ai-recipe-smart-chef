
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
  location: string | null;
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
          id,
          name
        )
      )
    `)
    .eq('is_public', true)
    .eq('is_published', true);

  if (filters?.category) {
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
    prep_time: recipe.prep_time || 0,
    cook_time: recipe.cooking_time || 0,
    servings: recipe.servings || 1,
    difficulty: recipe.difficulty as 'Easy' | 'Medium' | 'Hard' || 'Easy',
    calories: recipe.calories || 0,
    cuisine_type: recipe.cuisine_type || '',
    instructions: Array.isArray(recipe.instructions) ? recipe.instructions as string[] : 
                 (recipe.instructions ? [recipe.instructions as string] : []),
    categories: [], // Will be populated from category_id if needed
    tags: [], // Can be added later
    status: recipe.is_published ? 'published' : 'draft' as const,
    author_id: recipe.user_id || '',
    is_verified: recipe.is_verified || false,
    created_at: recipe.created_at || '',
    updated_at: recipe.updated_at || '',
    rating: recipe.rating || 0,
    ratingCount: recipe.rating_count || 0,
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
      prep_time: recipeData.prep_time,
      cooking_time: recipeData.cook_time,
      servings: recipeData.servings,
      difficulty: recipeData.difficulty,
      cuisine_type: recipeData.cuisine_type,
      instructions: recipeData.instructions,
      calories: recipeData.calories,
      protein: recipeData.protein,
      carbs: recipeData.carbs,
      fat: recipeData.fat,
      user_id: user.id,
      is_public: true,
      is_published: false // Start as draft
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
      prep_time: updates.prep_time,
      cooking_time: updates.cook_time,
      servings: updates.servings,
      difficulty: updates.difficulty,
      cuisine_type: updates.cuisine_type,
      instructions: updates.instructions,
      calories: updates.calories,
      protein: updates.protein,
      carbs: updates.carbs,
      fat: updates.fat,
      is_published: updates.status === 'published'
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

export const toggleFavoriteInDB = async (recipeId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // Check if already favorited
  const { data: existing } = await supabase
    .from('user_favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('recipe_id', recipeId)
    .single();

  if (existing) {
    // Remove from favorites
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('recipe_id', recipeId);
    
    if (error) throw error;
    return false;
  } else {
    // Add to favorites
    const { error } = await supabase
      .from('user_favorites')
      .insert({ user_id: user.id, recipe_id: recipeId });
    
    if (error) throw error;
    return true;
  }
};

// Create a simplified service object that exports the main functions
export const recipeService = {
  searchRecipes: async (query: string) => {
    return fetchRecipesFromDB({ search: query });
  },
  
  searchRecipesByIngredients: async (ingredients: string[]) => {
    const { data, error } = await supabase
      .from('recipes')
      .select(`
        *,
        recipe_ingredients (
          ingredients (
            name
          )
        )
      `)
      .eq('is_public', true)
      .eq('is_published', true);

    if (error) throw error;

    // Filter recipes that contain at least one of the specified ingredients
    const filteredData = data?.filter(recipe => {
      const recipeIngredients = recipe.recipe_ingredients?.map((ri: any) => 
        ri.ingredients?.name?.toLowerCase()
      ) || [];
      
      return ingredients.some(ingredient => 
        recipeIngredients.some((recipeIngredient: string) => 
          recipeIngredient?.includes(ingredient.toLowerCase())
        )
      );
    }) || [];

    // Format the filtered recipes
    const formattedRecipes: Recipe[] = filteredData.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description || '',
      image_url: recipe.image_url || '',
      prep_time: recipe.prep_time || 0,
      cook_time: recipe.cooking_time || 0,
      servings: recipe.servings || 1,
      difficulty: recipe.difficulty as 'Easy' | 'Medium' | 'Hard' || 'Easy',
      calories: recipe.calories || 0,
      cuisine_type: recipe.cuisine_type || '',
      instructions: Array.isArray(recipe.instructions) ? recipe.instructions as string[] : 
                   (recipe.instructions ? [recipe.instructions as string] : []),
      categories: [],
      tags: [],
      status: 'published' as const,
      author_id: recipe.user_id || '',
      is_verified: recipe.is_verified || false,
      created_at: recipe.created_at || '',
      updated_at: recipe.updated_at || '',
      rating: recipe.rating || 0,
      ratingCount: recipe.rating_count || 0,
      ingredients: recipe.recipe_ingredients?.map((ri: any) => ({
        id: ri.id,
        name: ri.ingredients?.name || '',
        amount: ri.quantity || 0,
        unit: ri.unit || ''
      })) || []
    }));

    return formattedRecipes;
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
      location: null,
      ingredient: item.ingredients
    })) || [];
  },
  
  getIngredientsForRecipe: async (recipeId: string) => {
    const { data, error } = await supabase
      .from('recipe_ingredients')
      .select(`
        *,
        ingredients (
          id,
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
