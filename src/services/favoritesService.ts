
import { supabase } from '@/integrations/supabase/client';

export interface Favorite {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
}

export const favoritesService = {
  async getFavorites(userId: string): Promise<string[]> {
    // Use raw SQL query since favorites table isn't in types yet
    const { data, error } = await supabase.rpc('get_user_favorites', { user_id: userId });

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    return data || [];
  },

  async addToFavorites(userId: string, recipeId: string): Promise<boolean> {
    const { error } = await supabase.rpc('add_to_favorites', { 
      user_id: userId, 
      recipe_id: recipeId 
    });

    if (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }

    return true;
  },

  async removeFromFavorites(userId: string, recipeId: string): Promise<boolean> {
    const { error } = await supabase.rpc('remove_from_favorites', { 
      user_id: userId, 
      recipe_id: recipeId 
    });

    if (error) {
      console.error('Error removing from favorites:', error);
      return false;
    }

    return true;
  },

  async isFavorite(userId: string, recipeId: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('is_favorite', { 
      user_id: userId, 
      recipe_id: recipeId 
    });

    if (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }

    return data || false;
  }
};
