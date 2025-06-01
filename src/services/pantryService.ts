
import { supabase } from '@/integrations/supabase/client';
import { PantryItem } from '@/types/index';

export const pantryService = {
  async getPantryItems(userId: string): Promise<PantryItem[]> {
    const { data, error } = await supabase
      .from('pantry_items')
      .select(`
        *,
        ingredients(name)
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching pantry items:', error);
      return [];
    }

    return data?.map(transformPantryItem) || [];
  },

  async addPantryItem(userId: string, item: Omit<PantryItem, 'id'>): Promise<PantryItem | null> {
    // First, get or create the ingredient
    const { data: ingredient, error: ingredientError } = await supabase
      .from('ingredients')
      .select('id')
      .eq('name', item.name)
      .single();

    let ingredientId = ingredient?.id;

    if (ingredientError && ingredientError.code === 'PGRST116') {
      // Ingredient doesn't exist, create it
      const { data: newIngredient, error: createError } = await supabase
        .from('ingredients')
        .insert({ name: item.name })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating ingredient:', createError);
        return null;
      }
      ingredientId = newIngredient.id;
    }

    const { data, error } = await supabase
      .from('pantry_items')
      .insert({
        user_id: userId,
        ingredient_id: ingredientId,
        quantity: item.quantity,
        unit: item.unit,
        expiry_date: item.expiryDate
      })
      .select(`
        *,
        ingredients(name)
      `)
      .single();

    if (error) {
      console.error('Error adding pantry item:', error);
      return null;
    }

    return transformPantryItem(data);
  },

  async updatePantryItem(itemId: string, updates: Partial<PantryItem>): Promise<PantryItem | null> {
    const { data, error } = await supabase
      .from('pantry_items')
      .update({
        quantity: updates.quantity,
        unit: updates.unit,
        expiry_date: updates.expiryDate
      })
      .eq('id', itemId)
      .select(`
        *,
        ingredients(name)
      `)
      .single();

    if (error) {
      console.error('Error updating pantry item:', error);
      return null;
    }

    return transformPantryItem(data);
  },

  async deletePantryItem(itemId: string): Promise<boolean> {
    const { error } = await supabase
      .from('pantry_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error deleting pantry item:', error);
      return false;
    }

    return true;
  }
};

function transformPantryItem(dbItem: any): PantryItem {
  return {
    id: dbItem.id,
    name: dbItem.ingredients?.name || '',
    quantity: dbItem.quantity || 0,
    unit: dbItem.unit || '',
    category: 'General', // Default category since it's not in the schema
    location: 'Pantry', // Default location since it's not in the schema
    expiryDate: dbItem.expiry_date || new Date().toISOString()
  };
}
