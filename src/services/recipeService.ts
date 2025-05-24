
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Recipe = Database['public']['Tables']['recipes']['Row'];
export type Ingredient = Database['public']['Tables']['ingredients']['Row'];
export type RecipeCategory = Database['public']['Tables']['recipe_categories']['Row'];
export type RecipeIngredient = Database['public']['Tables']['recipe_ingredients']['Row'];
export type PantryItem = Database['public']['Tables']['pantry_items']['Row'];

// Type for pantry items with ingredient information
export type PantryItemWithIngredient = PantryItem & {
  ingredient: Ingredient;
};

export const recipeService = {
  async getCategories(): Promise<RecipeCategory[]> {
    const { data, error } = await supabase
      .from('recipe_categories')
      .select('*');
    
    if (error) throw error;
    return data || [];
  },

  async getSubcategories(parentId: string): Promise<RecipeCategory[]> {
    const { data, error } = await supabase
      .from('recipe_categories')
      .select('*')
      .eq('parent_id', parentId);
    
    if (error) throw error;
    return data || [];
  },

  async getMainCategories(): Promise<RecipeCategory[]> {
    const { data, error } = await supabase
      .from('recipe_categories')
      .select('*')
      .is('parent_id', null);
    
    if (error) throw error;
    return data || [];
  },

  async searchRecipes(query: string): Promise<Recipe[]> {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .textSearch('title', query);
    
    if (error) throw error;
    return data || [];
  },

  async getIngredientsForRecipe(recipeId: string): Promise<{ name: string; quantity: number | null; unit: string | null }[]> {
    const { data, error } = await supabase
      .from('recipe_ingredients')
      .select(`
        quantity, 
        unit,
        ingredient:ingredients(name)
      `)
      .eq('recipe_id', recipeId);
    
    if (error) throw error;
    
    return data?.map(item => ({
      name: (item.ingredient as any)?.name || '',
      quantity: item.quantity,
      unit: item.unit
    })) || [];
  },

  async getUserPantryItems(): Promise<PantryItemWithIngredient[]> {
    const { data, error } = await supabase
      .from('pantry_items')
      .select(`
        *,
        ingredient:ingredients(*)
      `);
    
    if (error) throw error;
    return data as PantryItemWithIngredient[] || [];
  },

  async searchRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
    // This is a simplified version - in a real app, we could use more sophisticated logic
    // to find recipes that match available ingredients
    const { data: matchedIngredientIds, error: ingredientsError } = await supabase
      .from('ingredients')
      .select('id')
      .in('name', ingredients);
    
    if (ingredientsError) throw ingredientsError;
    
    if (!matchedIngredientIds?.length) return [];
    
    const ids = matchedIngredientIds.map(item => item.id);
    
    const { data: recipeIds, error: recipesError } = await supabase
      .from('recipe_ingredients')
      .select('recipe_id')
      .in('ingredient_id', ids)
      .order('recipe_id');
    
    if (recipesError) throw recipesError;
    
    if (!recipeIds?.length) return [];
    
    const uniqueRecipeIds = [...new Set(recipeIds.map(item => item.recipe_id))];
    
    const { data: recipes, error: finalError } = await supabase
      .from('recipes')
      .select('*')
      .in('id', uniqueRecipeIds as string[]);
    
    if (finalError) throw finalError;
    
    return recipes || [];
  }
};
