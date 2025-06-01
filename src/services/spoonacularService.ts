
const SPOONACULAR_API_KEY = '437914c63f4748c49a8236e93c3758eb';
const BASE_URL = 'https://api.spoonacular.com';

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: any[];
  extendedIngredients: any[];
  nutrition?: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
}

export interface SpoonacularSearchResult {
  results: SpoonacularRecipe[];
  offset: number;
  number: number;
  totalResults: number;
}

class SpoonacularService {
  private apiKey: string;

  constructor(apiKey: string = SPOONACULAR_API_KEY) {
    this.apiKey = apiKey;
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append('apiKey', this.apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Search recipes by query
  async searchRecipes(query: string, options: {
    cuisine?: string;
    diet?: string;
    type?: string;
    maxReadyTime?: number;
    offset?: number;
    number?: number;
  } = {}): Promise<SpoonacularSearchResult> {
    return this.makeRequest('/recipes/complexSearch', {
      query,
      addRecipeInformation: true,
      addRecipeNutrition: true,
      fillIngredients: true,
      ...options
    });
  }

  // Search recipes by ingredients
  async searchByIngredients(ingredients: string[], options: {
    number?: number;
    ranking?: number;
    ignorePantry?: boolean;
  } = {}): Promise<SpoonacularRecipe[]> {
    return this.makeRequest('/recipes/findByIngredients', {
      ingredients: ingredients.join(','),
      number: options.number || 10,
      ranking: options.ranking || 1,
      ignorePantry: options.ignorePantry || true
    });
  }

  // Get recipe information by ID
  async getRecipeInformation(id: number, includeNutrition: boolean = true): Promise<SpoonacularRecipe> {
    return this.makeRequest(`/recipes/${id}/information`, {
      includeNutrition
    });
  }

  // Get random recipes
  async getRandomRecipes(options: {
    limitLicense?: boolean;
    tags?: string;
    number?: number;
  } = {}): Promise<{ recipes: SpoonacularRecipe[] }> {
    return this.makeRequest('/recipes/random', {
      limitLicense: options.limitLicense || true,
      number: options.number || 10,
      tags: options.tags
    });
  }

  // Get recipe nutrition
  async getRecipeNutrition(id: number): Promise<any> {
    return this.makeRequest(`/recipes/${id}/nutritionWidget.json`);
  }

  // Analyze recipe ingredients
  async analyzeRecipeIngredients(ingredients: string[]): Promise<any> {
    return this.makeRequest('/recipes/parseIngredients', {
      ingredientList: ingredients.join('\n'),
      servings: 1,
      includeNutrition: true
    });
  }

  // Get ingredient information
  async getIngredientInformation(id: number): Promise<any> {
    return this.makeRequest(`/food/ingredients/${id}/information`);
  }

  // Search ingredients
  async searchIngredients(query: string, options: {
    number?: number;
    metaInformation?: boolean;
  } = {}): Promise<any> {
    return this.makeRequest('/food/ingredients/search', {
      query,
      number: options.number || 10,
      metaInformation: options.metaInformation || true
    });
  }

  // Get meal plan
  async generateMealPlan(options: {
    timeFrame?: 'day' | 'week';
    targetCalories?: number;
    diet?: string;
    exclude?: string;
  } = {}): Promise<any> {
    return this.makeRequest('/mealplanner/generate', {
      timeFrame: options.timeFrame || 'day',
      targetCalories: options.targetCalories,
      diet: options.diet,
      exclude: options.exclude
    });
  }

  // Convert recipe to our format
  convertToWasfahRecipe(spoonacularRecipe: SpoonacularRecipe): any {
    return {
      title: spoonacularRecipe.title,
      description: spoonacularRecipe.summary?.replace(/<[^>]*>/g, '') || '',
      image_url: spoonacularRecipe.image,
      prep_time: 0,
      cook_time: spoonacularRecipe.readyInMinutes,
      servings: spoonacularRecipe.servings,
      difficulty: 'Medium' as const,
      cuisine_type: spoonacularRecipe.cuisines?.[0] || '',
      instructions: spoonacularRecipe.analyzedInstructions?.[0]?.steps?.map((step: any) => step.step) || [],
      ingredients: spoonacularRecipe.extendedIngredients?.map((ing: any) => ({
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit
      })) || [],
      calories: spoonacularRecipe.nutrition?.nutrients?.find((n: any) => n.name === 'Calories')?.amount || 0,
      protein: spoonacularRecipe.nutrition?.nutrients?.find((n: any) => n.name === 'Protein')?.amount || 0,
      carbs: spoonacularRecipe.nutrition?.nutrients?.find((n: any) => n.name === 'Carbohydrates')?.amount || 0,
      fat: spoonacularRecipe.nutrition?.nutrients?.find((n: any) => n.name === 'Fat')?.amount || 0,
      source_url: spoonacularRecipe.sourceUrl,
      external_id: spoonacularRecipe.id.toString(),
      external_source: 'spoonacular'
    };
  }
}

export const spoonacularService = new SpoonacularService();
export default spoonacularService;
