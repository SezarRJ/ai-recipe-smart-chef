
import { supabase } from '@/integrations/supabase/client';
import { Recipe, RecipeFilters } from '@/types/recipe';

export const fetchRecipesFromDB = async (filters?: RecipeFilters) => {
  let query = supabase
    .from('recipes')
    .select(`
      *,
      recipe_ingredients (
        id,
        amount,
        unit,
        ingredients (
          name
        )
      )
    `)
    .eq('status', 'published');

  if (filters?.category) {
    query = query.contains('categories', [filters.category]);
  }

  if (filters?.difficulty && ['Easy', 'Medium', 'Hard'].includes(filters.difficulty)) {
    query = query.eq('difficulty', filters.difficulty as 'Easy' | 'Medium' | 'Hard');
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
    cook_time: recipe.cook_time || 0,
    servings: recipe.servings || 1,
    difficulty: recipe.difficulty as 'Easy' | 'Medium' | 'Hard',
    calories: recipe.calories || 0,
    cuisine_type: recipe.cuisine_type || '',
    instructions: Array.isArray(recipe.instructions) ? recipe.instructions as string[] : 
                 (recipe.instructions ? [recipe.instructions as string] : []),
    categories: recipe.categories || [],
    tags: recipe.tags || [],
    status: recipe.status as 'draft' | 'published' | 'pending_review',
    author_id: recipe.author_id || '',
    is_verified: recipe.is_verified || false,
    created_at: recipe.created_at || '',
    updated_at: recipe.updated_at || '',
    ingredients: recipe.recipe_ingredients?.map((ri: any) => ({
      id: ri.id,
      name: ri.ingredients.name,
      amount: ri.amount,
      unit: ri.unit
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
      cook_time: recipeData.cook_time,
      servings: recipeData.servings,
      difficulty: recipeData.difficulty,
      calories: recipeData.calories,
      cuisine_type: recipeData.cuisine_type,
      instructions: recipeData.instructions,
      categories: recipeData.categories,
      tags: recipeData.tags,
      author_id: user.id,
      status: 'draft'
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
      cook_time: updates.cook_time,
      servings: updates.servings,
      difficulty: updates.difficulty,
      calories: updates.calories,
      cuisine_type: updates.cuisine_type,
      instructions: updates.instructions,
      categories: updates.categories,
      tags: updates.tags,
      status: updates.status
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
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('recipe_id', recipeId)
    .single();

  if (existing) {
    // Remove from favorites
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('recipe_id', recipeId);

    if (error) throw error;
    return false; // Not favorited anymore
  } else {
    // Add to favorites
    const { error } = await supabase
      .from('favorites')
      .insert([{
        user_id: user.id,
        recipe_id: recipeId
      }]);

    if (error) throw error;
    return true; // Now favorited
  }
};
