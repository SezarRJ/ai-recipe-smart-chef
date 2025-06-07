
import { supabase } from '@/integrations/supabase/client';

export interface Favorite {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
}

export const favoritesService = {
  async getFavorites(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select('recipe_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    return data?.map(fav => fav.recipe_id) || [];
  },

  async addToFavorites(userId: string, recipeId: string): Promise<boolean> {
    const { error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, recipe_id: recipeId });

    if (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }

    return true;
  },

  async removeFromFavorites(userId: string, recipeId: string): Promise<boolean> {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('recipe_id', recipeId);

    if (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }

    return true;
  },

  async isFavorite(userId: string, recipeId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('recipe_id', recipeId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking favorite status:', error);
      return false;
    }

    return !!data;
  }
};
