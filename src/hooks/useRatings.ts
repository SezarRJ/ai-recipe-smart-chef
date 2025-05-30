
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ratingsService, RatingStats, RecipeRating } from '@/services/ratingsService';
import { useToast } from '@/hooks/use-toast';

export const useRatings = (recipeId: string) => {
  const [stats, setStats] = useState<RatingStats>({ average_rating: 0, total_ratings: 0 });
  const [userRating, setUserRating] = useState<RecipeRating | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchRatingData = async () => {
    setLoading(true);
    try {
      const [ratingStats, userRatingData] = await Promise.all([
        ratingsService.getRatingStats(recipeId),
        user ? ratingsService.getUserRating(user.id, recipeId) : null
      ]);

      setStats(ratingStats);
      setUserRating(userRatingData);
    } catch (error) {
      console.error('Error fetching rating data:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (rating: number, review?: string) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to rate recipes',
        variant: 'destructive'
      });
      return;
    }

    try {
      let ratingData: RecipeRating | null;

      if (userRating) {
        ratingData = await ratingsService.updateRating(user.id, recipeId, rating, review);
        toast({
          title: 'Rating updated successfully'
        });
      } else {
        ratingData = await ratingsService.addRating(user.id, recipeId, rating, review);
        toast({
          title: 'Rating added successfully'
        });
      }

      setUserRating(ratingData);
      
      // Refresh stats
      const newStats = await ratingsService.getRatingStats(recipeId);
      setStats(newStats);
    } catch (error) {
      toast({
        title: 'Error submitting rating',
        description: 'Please try again',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    if (recipeId) {
      fetchRatingData();
    }
  }, [recipeId, user]);

  return {
    stats,
    userRating,
    loading,
    submitRating,
    refetch: fetchRatingData
  };
};
