
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
    // For now, return default stats since recipe_ratings table doesn't exist
    console.log('Ratings service - getting rating stats for recipe:', recipeId);
    return { average_rating: 0, total_ratings: 0 };
  },

  async getUserRating(userId: string, recipeId: string): Promise<RecipeRating | null> {
    // For now, return null since recipe_ratings table doesn't exist
    console.log('Ratings service - getting user rating:', { userId, recipeId });
    return null;
  },

  async addRating(userId: string, recipeId: string, rating: number, review?: string): Promise<RecipeRating | null> {
    // For now, just log the action
    console.log('Ratings service - adding rating:', { userId, recipeId, rating, review });
    return null;
  },

  async updateRating(userId: string, recipeId: string, rating: number, review?: string): Promise<RecipeRating | null> {
    // For now, just log the action
    console.log('Ratings service - updating rating:', { userId, recipeId, rating, review });
    return null;
  }
};
