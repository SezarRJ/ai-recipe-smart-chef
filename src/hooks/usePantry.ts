
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  location: string;
  expiryDate?: string;
  lowStockThreshold?: number;
  isLowStock?: boolean;
  isExpiringSoon?: boolean;
}

export const usePantry = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    {
      id: '1',
      name: 'Flour',
      quantity: 2,
      unit: 'kg',
      category: 'Grains',
      location: 'Pantry',
      expiryDate: '2024-12-31',
      lowStockThreshold: 1,
      isLowStock: false,
      isExpiringSoon: false
    },
    {
      id: '2',
      name: 'Milk',
      quantity: 1,
      unit: 'liter',
      category: 'Dairy',
      location: 'Refrigerator',
      expiryDate: '2024-06-10',
      lowStockThreshold: 2,
      isLowStock: true,
      isExpiringSoon: true
    },
    {
      id: '3',
      name: 'Eggs',
      quantity: 6,
      unit: 'pieces',
      category: 'Dairy',
      location: 'Refrigerator',
      expiryDate: '2024-06-15',
      lowStockThreshold: 12,
      isLowStock: true,
      isExpiringSoon: false
    }
  ]);
  
  const [loading, setLoading] = useState(false);

  const addPantryItem = async (item: Omit<PantryItem, 'id'>) => {
    setLoading(true);
    try {
      const newItem: PantryItem = {
        ...item,
        id: Date.now().toString(),
        isLowStock: item.quantity <= (item.lowStockThreshold || 1),
        isExpiringSoon: false
      };
      
      setPantryItems(prev => [...prev, newItem]);
      return newItem;
    } finally {
      setLoading(false);
    }
  };

  const updatePantryItem = async (id: string, updates: Partial<PantryItem>) => {
    setLoading(true);
    try {
      setPantryItems(prev =>
        prev.map(item => {
          if (item.id === id) {
            const updatedItem = { ...item, ...updates };
            return {
              ...updatedItem,
              isLowStock: updatedItem.quantity <= (updatedItem.lowStockThreshold || 1)
            };
          }
          return item;
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const deletePantryItem = async (id: string) => {
    setLoading(true);
    try {
      setPantryItems(prev => prev.filter(item => item.id !== id));
    } finally {
      setLoading(false);
    }
  };

  return {
    pantryItems,
    loading,
    addPantryItem,
    updatePantryItem,
    deletePantryItem
  };
};
