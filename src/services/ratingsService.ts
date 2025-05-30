
import { supabase } from '@/integrations/supabase/client';

export interface RecipeRating {
  id: string;
  user_id: string;
  recipe_id: string;
  rating: number;
  review: string | null;
  created_at: string;
  updated_at: string;
}

export interface RatingStats {
  average_rating: number;
  total_ratings: number;
}

export const ratingsService = {
  async getRatingStats(recipeId: string): Promise<RatingStats> {
    const { data, error } = await supabase.rpc('get_recipe_rating_stats', { 
      recipe_id: recipeId 
    });

    if (error) {
      console.error('Error fetching rating stats:', error);
      return { average_rating: 0, total_ratings: 0 };
    }

    return data || { average_rating: 0, total_ratings: 0 };
  },

  async getUserRating(userId: string, recipeId: string): Promise<RecipeRating | null> {
    const { data, error } = await supabase.rpc('get_user_rating', { 
      user_id: userId, 
      recipe_id: recipeId 
    });

    if (error) {
      console.error('Error fetching user rating:', error);
      return null;
    }

    return data;
  },

  async addRating(userId: string, recipeId: string, rating: number, review?: string): Promise<RecipeRating | null> {
    const { data, error } = await supabase.rpc('add_recipe_rating', {
      user_id: userId,
      recipe_id: recipeId,
      rating_value: rating,
      review_text: review || null
    });

    if (error) {
      console.error('Error adding rating:', error);
      throw error;
    }

    return data;
  },

  async updateRating(userId: string, recipeId: string, rating: number, review?: string): Promise<RecipeRating | null> {
    const { data, error } = await supabase.rpc('update_recipe_rating', {
      user_id: userId,
      recipe_id: recipeId,
      rating_value: rating,
      review_text: review || null
    });

    if (error) {
      console.error('Error updating rating:', error);
      throw error;
    }

    return data;
  }
};
