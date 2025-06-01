
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pantryService } from '@/services/pantryService';
import { PantryItem } from '@/types/index';
import { useAuth } from '@/hooks/useAuth';

export const usePantry = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: pantryItems = [],
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['pantryItems', user?.id],
    queryFn: () => user ? pantryService.getPantryItems(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  const addPantryItemMutation = useMutation({
    mutationFn: (item: Omit<PantryItem, 'id'>) => {
      if (!user) throw new Error('User not authenticated');
      return pantryService.addPantryItem(user.id, item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pantryItems', user?.id] });
    },
    onError: (error) => {
      console.error('Error adding pantry item:', error);
    }
  });

  const deletePantryItemMutation = useMutation({
    mutationFn: (itemId: string) => pantryService.deletePantryItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pantryItems', user?.id] });
    },
    onError: (error) => {
      console.error('Error deleting pantry item:', error);
    }
  });

  const updatePantryItemMutation = useMutation({
    mutationFn: ({ itemId, updates }: { itemId: string; updates: Partial<PantryItem> }) => 
      pantryService.updatePantryItem(itemId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pantryItems', user?.id] });
    },
    onError: (error) => {
      console.error('Error updating pantry item:', error);
    }
  });

  const addPantryItem = async (item: Omit<PantryItem, 'id'>) => {
    return addPantryItemMutation.mutateAsync(item);
  };

  const deletePantryItem = async (itemId: string) => {
    return deletePantryItemMutation.mutateAsync(itemId);
  };

  const updatePantryItem = async (itemId: string, updates: Partial<PantryItem>) => {
    return updatePantryItemMutation.mutateAsync({ itemId, updates });
  };

  return {
    pantryItems,
    loading,
    error,
    addPantryItem,
    deletePantryItem,
    updatePantryItem,
    isAdding: addPantryItemMutation.isPending,
    isDeleting: deletePantryItemMutation.isPending,
    isUpdating: updatePantryItemMutation.isPending,
  };
};
