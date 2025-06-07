
export interface IngredientImage {
  id: string;
  name: string;
  image_url: string;
  category: string;
  created_at: string;
  updated_at: string;
  // Also support database field names for compatibility
  ingredient_name?: string;
  alt_text?: string;
}
