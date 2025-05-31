
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { favoritesService } from '@/services/favoritesService';
import { useToast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchFavorites = async () => {
    if (!user) return;

    setLoading(true);
    try {
      console.log('Fetching favorites for user:', user.id);
      const favoriteIds = await favoritesService.getFavorites(user.id);
      console.log('Fetched favorites:', favoriteIds);
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (recipeId: string) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to save favorites',
        variant: 'destructive'
      });
      return;
    }

    const isFavorited = favorites.includes(recipeId);

    try {
      console.log('Toggling favorite:', { recipeId, isFavorited, userId: user.id });
      
      if (isFavorited) {
        await favoritesService.removeFromFavorites(user.id, recipeId);
        setFavorites(prev => prev.filter(id => id !== recipeId));
        toast({
          title: 'Removed from favorites'
        });
      } else {
        await favoritesService.addToFavorites(user.id, recipeId);
        setFavorites(prev => [...prev, recipeId]);
        toast({
          title: 'Added to favorites'
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: 'Error updating favorites',
        description: 'Please try again',
        variant: 'destructive'
      });
    }
  };

  const isFavorite = (recipeId: string) => favorites.includes(recipeId);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    fetchFavorites
  };
};
