
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
    const { data, error } = await supabase
      .from('recipe_ratings')
      .select('rating')
      .eq('recipe_id', recipeId);

    if (error) {
      console.error('Error fetching rating stats:', error);
      return { average_rating: 0, total_ratings: 0 };
    }

    if (!data || data.length === 0) {
      return { average_rating: 0, total_ratings: 0 };
    }

    const total = data.length;
    const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
    const average = sum / total;

    return {
      average_rating: Math.round(average * 10) / 10,
      total_ratings: total
    };
  },

  async getUserRating(userId: string, recipeId: string): Promise<RecipeRating | null> {
    const { data, error } = await supabase
      .from('recipe_ratings')
      .select('*')
      .eq('user_id', userId)
      .eq('recipe_id', recipeId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user rating:', error);
      return null;
    }

    return data;
  },

  async addRating(userId: string, recipeId: string, rating: number, review?: string): Promise<RecipeRating | null> {
    const { data, error } = await supabase
      .from('recipe_ratings')
      .insert([{
        user_id: userId,
        recipe_id: recipeId,
        rating,
        review: review || null
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding rating:', error);
      throw error;
    }

    return data;
  },

  async updateRating(userId: string, recipeId: string, rating: number, review?: string): Promise<RecipeRating | null> {
    const { data, error } = await supabase
      .from('recipe_ratings')
      .update({
        rating,
        review: review || null
      })
      .eq('user_id', userId)
      .eq('recipe_id', recipeId)
      .select()
      .single();

    if (error) {
      console.error('Error updating rating:', error);
      throw error;
    }

    return data;
  }
};
