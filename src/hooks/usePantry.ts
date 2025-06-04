
import { useState, useEffect } from 'react';
import { PantryItem } from '@/types/index';
import { pantryService } from '@/services/pantryService';
import { useAuth } from './useAuth';

export const usePantry = () => {
  const { user } = useAuth();
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPantryItems = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await pantryService.getPantryItems(user.id);
      setPantryItems(data);
    } catch (err) {
      setError('Failed to fetch pantry items');
      console.error('Error fetching pantry items:', err);
    } finally {
      setLoading(false);
    }
  };

  const addPantryItem = async (item: Omit<PantryItem, 'id'>) => {
    if (!user?.id) return null;
    
    const newItem = await pantryService.addPantryItem(user.id, item);
    if (newItem) {
      await fetchPantryItems();
    }
    return newItem;
  };

  const updatePantryItem = async (itemId: string, updates: Partial<PantryItem>) => {
    const updatedItem = await pantryService.updatePantryItem(itemId, updates);
    if (updatedItem) {
      await fetchPantryItems();
    }
    return updatedItem;
  };

  const deletePantryItem = async (itemId: string) => {
    const success = await pantryService.deletePantryItem(itemId);
    if (success) {
      await fetchPantryItems();
    }
    return success;
  };

  useEffect(() => {
    fetchPantryItems();
  }, [user?.id]);

  return {
    pantryItems,
    loading,
    error,
    refetch: fetchPantryItems,
    addPantryItem,
    updatePantryItem,
    deletePantryItem
  };
};
