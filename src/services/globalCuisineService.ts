
const API_KEY = '437914c63f4748c49a8236e93c3758eb';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  cuisines: string[];
  dishTypes: string[];
  summary: string;
  instructions: string;
  ingredients: Ingredient[];
  nutrition?: NutritionInfo;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  image: string;
}

export interface NutritionInfo {
  calories: number;
  protein: string;
  fat: string;
  carbohydrates: string;
}

export interface SearchParams {
  cuisine?: string;
  diet?: string;
  type?: string;
  maxReadyTime?: number;
  query?: string;
  number?: number;
  offset?: number;
}

class GlobalCuisineService {
  private apiKey = API_KEY;

  async searchRecipes(params: SearchParams): Promise<{ results: Recipe[]; totalResults: number }> {
    try {
      const searchParams = new URLSearchParams({
        apiKey: this.apiKey,
        number: (params.number || 12).toString(),
        offset: (params.offset || 0).toString(),
        addRecipeInformation: 'true',
        fillIngredients: 'true',
      });

      if (params.cuisine) searchParams.append('cuisine', params.cuisine);
      if (params.diet) searchParams.append('diet', params.diet);
      if (params.type) searchParams.append('type', params.type);
      if (params.maxReadyTime) searchParams.append('maxReadyTime', params.maxReadyTime.toString());
      if (params.query) searchParams.append('query', params.query);

      const response = await fetch(`${BASE_URL}/complexSearch?${searchParams}`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw error;
    }
  }

  async getRecipeById(id: number): Promise<Recipe> {
    try {
      const response = await fetch(
        `${BASE_URL}/${id}/information?apiKey=${this.apiKey}&includeNutrition=true`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Recipe not found');
        }
        throw new Error(`API request failed: ${response.status}`);
      }

      const recipe = await response.json();
      
      // Ensure ingredients array exists
      if (!recipe.extendedIngredients) {
        recipe.ingredients = [];
      } else {
        recipe.ingredients = recipe.extendedIngredients.map((ing: any) => ({
          id: ing.id,
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          image: ing.image
        }));
      }

      return recipe;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  }

  async getRandomRecipes(tags?: string, number = 10): Promise<{ recipes: Recipe[] }> {
    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        number: number.toString(),
      });

      if (tags) params.append('tags', tags);

      const response = await fetch(`${BASE_URL}/random?${params}`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      throw error;
    }
  }

  async getRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        ingredients: ingredients.join(','),
        number: '20',
        ranking: '1',
        ignorePantry: 'true',
      });

      const response = await fetch(`${BASE_URL}/findByIngredients?${params}`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error finding recipes by ingredients:', error);
      throw error;
    }
  }

  // Get cuisine-specific recipes
  async getCuisineRecipes(cuisine: string, limit = 12): Promise<Recipe[]> {
    const result = await this.searchRecipes({
      cuisine,
      number: limit,
    });
    return result.results;
  }

  // Get recipes by dietary restrictions
  async getDietaryRecipes(diet: string, limit = 12): Promise<Recipe[]> {
    const result = await this.searchRecipes({
      diet,
      number: limit,
    });
    return result.results;
  }
}

export const globalCuisineService = new GlobalCuisineService();
