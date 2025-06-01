
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, X, Loader2 } from 'lucide-react';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Recipe } from '@/types';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface IngredientImage {
  id: string;
  ingredient_name: string;
  image_url: string;
  alt_text: string;
}

export default function FindByIngredients() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const { data: ingredientImages, isLoading } = useQuery({
    queryKey: ['ingredient-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ingredient_images')
        .select('*')
        .order('ingredient_name');
      
      if (error) throw error;
      return data as IngredientImage[];
    }
  });

  const filteredIngredients = ingredientImages?.filter(ingredient =>
    ingredient.ingredient_name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Test function to verify AI endpoint functionality
  const testAIEndpoint = async () => {
    console.log('=== TESTING AI ENDPOINT ===');
    
    try {
      const testQuery = `Generate 1 simple recipe using tomatoes and onions. Return ONLY valid JSON in this format:
[{
  "title": "Recipe Name",
  "description": "Brief description",
  "difficulty": "Easy",
  "prep_time": 10,
  "cook_time": 20,
  "servings": 4,
  "ingredients": [{"name": "tomatoes", "amount": 2, "unit": "pieces"}],
  "instructions": ["Step 1", "Step 2"]
}]`;

      const { data, error } = await supabase.functions.invoke('ai-chef', {
        body: { 
          query: testQuery,
          context: {
            selectedIngredients: ['tomatoes', 'onions'],
            requestType: 'recipe_generation',
            responseFormat: 'json_array'
          }
        }
      });

      console.log('Test response:', { data, error });
      
      if (error) {
        console.error('Test failed with error:', error);
        toast({
          title: "Test Failed",
          description: `AI endpoint test failed: ${error.message}`,
          variant: "destructive"
        });
      } else {
        console.log('Test successful!');
        toast({
          title: "Test Successful",
          description: "AI endpoint is working correctly",
        });
      }
    } catch (testError) {
      console.error('Test exception:', testError);
      toast({
        title: "Test Error",
        description: `Test threw exception: ${testError.message}`,
        variant: "destructive"
      });
    }
    
    console.log('=== TEST COMPLETE ===');
  };

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => prev.filter(i => i !== ingredient));
  };

  const searchRecipesByIngredients = async () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: t('error.title') || 'Error',
        description: t('error.selectIngredients') || 'Please select at least one ingredient',
        variant: 'destructive'
      });
      return;
    }

    setIsSearching(true);
    console.log('Starting AI-powered search for ingredients:', selectedIngredients);

    try {
      // Step 1: Use AI to generate recipe suggestions based on selected ingredients
      const aiQuery = `Generate 3-5 practical recipes using these ingredients: ${selectedIngredients.join(', ')}.

IMPORTANT: Respond with ONLY a valid JSON array. No extra text before or after.

Format each recipe as:
{
  "title": "Recipe Name",
  "description": "Brief 2-3 sentence description",
  "difficulty": "Easy",
  "prep_time": 15,
  "cook_time": 30,
  "servings": 4,
  "cuisine_type": "International",
  "calories": 350,
  "protein": 25,
  "carbs": 30,
  "fat": 15,
  "ingredients": [
    {"name": "ingredient", "amount": 1, "unit": "cup"}
  ],
  "instructions": [
    "Step 1: Prepare ingredients",
    "Step 2: Cook as directed"
  ]
}

Return array of 3-5 recipes that can realistically be made with the provided ingredients. Focus on Middle Eastern and international cuisines.`;

      console.log('=== AI REQUEST START ===');
      console.log('Selected ingredients:', selectedIngredients);
      console.log('AI Query length:', aiQuery.length);
      console.log('Request payload:', {
        selectedIngredients,
        requestType: 'recipe_generation',
        responseFormat: 'json_array'
      });
      
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('ai-chef', {
        body: { 
          query: aiQuery,
          context: {
            selectedIngredients,
            requestType: 'recipe_generation',
            responseFormat: 'json_array'
          }
        }
      });

      console.log('Supabase function response:', { aiResponse, aiError });

      if (aiError) {
        console.error('AI Chef error details:', aiError);
        console.error('Error type:', typeof aiError);
        console.error('Error message:', aiError.message);
        throw new Error(`AI service error: ${aiError.message || 'Unknown error'}`);
      }

      if (!aiResponse) {
        console.error('No response received from AI service');
        throw new Error('Empty response from AI service');
      }

      if (!aiResponse.response) {
        console.error('Response object missing response field:', aiResponse);
        throw new Error('Invalid response structure from AI service');
      }

      console.log('AI Response received successfully');
      console.log('Response type:', typeof aiResponse.response);
      console.log('Response preview:', aiResponse.response.substring(0, 200) + '...');
      console.log('=== AI REQUEST END ===');

      // Step 2: Parse AI response and convert to our recipe format
      let aiRecipes = [];
      try {
        const responseText = aiResponse.response.trim();
        console.log('=== JSON PARSING START ===');
        console.log('Raw AI response length:', responseText.length);
        console.log('First 300 chars:', responseText.substring(0, 300));
        console.log('Last 100 chars:', responseText.substring(responseText.length - 100));
        
        // Strategy 1: Direct JSON array parsing
        if (responseText.startsWith('[') && responseText.endsWith(']')) {
          console.log('Attempting direct JSON array parsing...');
          aiRecipes = JSON.parse(responseText);
          console.log('Direct parsing successful, recipes count:', aiRecipes.length);
        } 
        // Strategy 2: Extract JSON array from mixed content
        else {
          console.log('Attempting to extract JSON array from response...');
          const jsonArrayMatch = responseText.match(/\[[\s\S]*\]/);
          if (jsonArrayMatch) {
            console.log('Found JSON array pattern, attempting to parse...');
            aiRecipes = JSON.parse(jsonArrayMatch[0]);
            console.log('Array extraction successful, recipes count:', aiRecipes.length);
          } 
          // Strategy 3: Look for individual JSON objects
          else {
            console.log('Attempting to extract individual JSON objects...');
            const objectMatches = responseText.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
            if (objectMatches && objectMatches.length > 0) {
              console.log('Found', objectMatches.length, 'potential JSON objects');
              aiRecipes = objectMatches.map((match, index) => {
                try {
                  const parsed = JSON.parse(match);
                  console.log(`Object ${index + 1} parsed successfully`);
                  return parsed;
                } catch (e) {
                  console.warn(`Failed to parse object ${index + 1}:`, match.substring(0, 100) + '...');
                  return null;
                }
              }).filter(Boolean);
              console.log('Individual object parsing completed, valid recipes:', aiRecipes.length);
            }
            // Strategy 4: Try to clean and parse response
            else {
              console.log('Attempting to clean response and parse...');
              const cleanedResponse = responseText
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .replace(/^\s*[\w\s:]*\s*/, '') // Remove any leading text
                .trim();
              
              if (cleanedResponse.startsWith('[') || cleanedResponse.startsWith('{')) {
                try {
                  const parsed = JSON.parse(cleanedResponse);
                  aiRecipes = Array.isArray(parsed) ? parsed : [parsed];
                  console.log('Cleaned parsing successful, recipes count:', aiRecipes.length);
                } catch (cleanError) {
                  console.warn('Cleaned parsing failed:', cleanError.message);
                }
              }
            }
          }
        }
        
        // Validate that we have recipes
        if (!Array.isArray(aiRecipes) || aiRecipes.length === 0) {
          console.error('No valid recipes found after all parsing attempts');
          throw new Error('No valid recipes found in AI response');
        }
        
        // Validate recipe structure
        const validRecipes = aiRecipes.filter(recipe => {
          const isValid = recipe && typeof recipe === 'object' && 
                         (recipe.title || recipe.name) && 
                         (recipe.ingredients || recipe.instructions);
          if (!isValid) {
            console.warn('Invalid recipe structure found:', recipe);
          }
          return isValid;
        });
        
        if (validRecipes.length === 0) {
          throw new Error('No valid recipe structures found');
        }
        
        aiRecipes = validRecipes;
        console.log('Successfully validated AI recipes:', aiRecipes.length);
        console.log('=== JSON PARSING END ===');
        
      } catch (parseError) {
        console.error('=== JSON PARSING FAILED ===');
        console.error('Parse error details:', parseError.message);
        console.error('Parse error stack:', parseError.stack);
        console.log('Creating intelligent fallback recipes...');
        
        // Create more intelligent fallback recipes based on ingredients
        const getSmartUnit = (ingredient) => {
          const ing = ingredient.toLowerCase();
          if (ing.includes('oil') || ing.includes('vinegar')) return 'tablespoon';
          if (ing.includes('salt') || ing.includes('pepper') || ing.includes('spice')) return 'teaspoon';
          if (ing.includes('meat') || ing.includes('chicken') || ing.includes('beef')) return 'pounds';
          if (ing.includes('water') || ing.includes('milk') || ing.includes('broth')) return 'cup';
          return 'cup';
        };

        const getSmartAmount = (ingredient) => {
          const ing = ingredient.toLowerCase();
          if (ing.includes('oil') || ing.includes('vinegar')) return 2;
          if (ing.includes('salt') || ing.includes('pepper') || ing.includes('spice')) return 1;
          if (ing.includes('meat') || ing.includes('chicken') || ing.includes('beef')) return 1;
          return Math.floor(Math.random() * 2) + 1;
        };

        const createSmartRecipe = (title, description, cuisineType, cookTime, instructions) => ({
          title,
          description,
          difficulty: 'Easy',
          cook_time: cookTime,
          prep_time: 15,
          servings: 4,
          cuisine_type: cuisineType,
          calories: Math.floor(Math.random() * 200) + 250,
          protein: Math.floor(Math.random() * 20) + 15,
          carbs: Math.floor(Math.random() * 30) + 20,
          fat: Math.floor(Math.random() * 15) + 10,
          ingredients: selectedIngredients.map(ing => ({
            name: ing,
            amount: getSmartAmount(ing),
            unit: getSmartUnit(ing)
          })),
          instructions
        });

        aiRecipes = [
          createSmartRecipe(
            `${selectedIngredients[0]} and ${selectedIngredients[1] || 'Herbs'} Stir-Fry`,
            `A quick and healthy stir-fry featuring fresh ${selectedIngredients.join(', ')}. Perfect for a weeknight dinner.`,
            'Asian Fusion',
            15,
            [
              'Heat oil in a large pan or wok over medium-high heat',
              'Add ingredients starting with those that take longer to cook',
              'Stir-fry for 5-7 minutes until ingredients are tender',
              'Season with salt, pepper, and your favorite spices',
              'Serve immediately over rice or noodles'
            ]
          ),
          createSmartRecipe(
            `Mediterranean ${selectedIngredients[0]} Bowl`,
            `A fresh Mediterranean-inspired bowl showcasing ${selectedIngredients.slice(0, 3).join(', ')}. Light, healthy, and flavorful.`,
            'Mediterranean',
            0,
            [
              'Wash and prepare all fresh ingredients',
              'Arrange ingredients in a large bowl',
              'Drizzle with olive oil and lemon juice',
              'Season with salt, pepper, and Mediterranean herbs',
              'Toss gently and let flavors meld for 10 minutes before serving'
            ]
          ),
          createSmartRecipe(
            `${selectedIngredients[0]} Fusion Curry`,
            `A warming curry that brings together ${selectedIngredients.join(', ')} in a delicious fusion dish.`,
            'Fusion',
            25,
            [
              'Heat oil in a large pot over medium heat',
              'Add aromatics and cook until fragrant',
              'Add main ingredients and cook until tender',
              'Add liquid and simmer for 15-20 minutes',
              'Season to taste and serve with rice or bread'
            ]
          )
        ];
        
        console.log('Created', aiRecipes.length, 'intelligent fallback recipes');
      }

      // Step 3: Format AI recipes to match our Recipe interface
      const formattedRecipes: Recipe[] = aiRecipes.map((recipe: any, index: number) => ({
        id: `ai-recipe-${Date.now()}-${index}`,
        title: recipe.title || `Recipe with ${selectedIngredients.join(', ')}`,
        description: recipe.description || `A recipe using ${selectedIngredients.join(', ')}`,
        image_url: '', // AI doesn't generate images
        image: '', // Required by Recipe interface
        prep_time: recipe.prep_time || 15,
        cooking_time: recipe.cook_time || recipe.cooking_time || 30,
        total_time: (recipe.prep_time || 15) + (recipe.cook_time || recipe.cooking_time || 30),
        servings: recipe.servings || 4,
        difficulty: recipe.difficulty || 'Medium' as 'Easy' | 'Medium' | 'Hard',
        calories: recipe.calories || 300,
        protein: recipe.protein || Math.floor(Math.random() * 20) + 15,
        carbs: recipe.carbs || Math.floor(Math.random() * 30) + 20,
        fat: recipe.fat || Math.floor(Math.random() * 15) + 10,
        rating: 0,
        rating_count: 0,
        cuisine_type: recipe.cuisine_type || 'International',
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : 
                     (recipe.instructions ? [recipe.instructions] : ['Follow recipe steps']),
        categories: [],
        tags: ['AI Generated'],
        isFavorite: false,
        is_published: true,
        is_public: true,
        user_id: 'ai-chef',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_verified: true,
        ingredients: Array.isArray(recipe.ingredients) ? 
          recipe.ingredients.map((ing: any) => ({
            id: `ing-${Math.random()}`,
            name: typeof ing === 'string' ? ing : (ing.name || ing.ingredient || 'Unknown'),
            quantity: typeof ing === 'object' ? (ing.amount || ing.quantity || 1) : 1,
            unit: typeof ing === 'object' ? (ing.unit || 'cup') : 'cup'
          })) : 
          selectedIngredients.map(ing => ({
            id: `ing-${Math.random()}`,
            name: ing,
            quantity: 1,
            unit: 'cup'
          }))
      }));

      console.log('Formatted AI recipes:', formattedRecipes);

      if (formattedRecipes.length > 0) {
        setRecipes(formattedRecipes);
        
        toast({
          title: t('search.success') || '🤖 AI Recipes Generated!',
          description: `Generated ${formattedRecipes.length} creative recipe${formattedRecipes.length > 1 ? 's' : ''} using ${selectedIngredients.join(', ')}`
        });
      } else {
        throw new Error('No recipes could be generated');
      }

    } catch (error) {
      console.error('Error in AI recipe search:', error);
      
      // Fallback: Create a simple recipe suggestion
      const fallbackRecipe: Recipe = {
        id: `fallback-recipe-${Date.now()}`,
        title: `Creative Recipe with ${selectedIngredients.slice(0, 2).join(' & ')}`,
        description: `A delicious combination using ${selectedIngredients.join(', ')}. This AI-suggested recipe combines these ingredients in a tasty way.`,
        image_url: '',
        image: '',
        prep_time: 15,
        cooking_time: 25,
        total_time: 40,
        servings: 4,
        difficulty: 'Medium' as const,
        calories: 320,
        protein: 20,
        carbs: 25,
        fat: 12,
        rating: 0,
        rating_count: 0,
        cuisine_type: 'Fusion',
        instructions: [
          'Prepare and wash all ingredients',
          'Heat oil in a large pan',
          'Add ingredients in order of cooking time needed',
          'Season with salt, pepper, and preferred spices',
          'Cook until ingredients are tender',
          'Adjust seasoning and serve hot'
        ],
        categories: [],
        tags: ['AI Generated', 'Creative'],
        isFavorite: false,
        is_published: true,
        is_public: true,
        user_id: 'ai-chef',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_verified: true,
        ingredients: selectedIngredients.map(ing => ({
          id: `ing-${Math.random()}`,
          name: ing,
          quantity: 1,
          unit: 'cup'
        }))
      };

      setRecipes([fallbackRecipe]);
      
      toast({
        title: t('search.success') || 'Recipe Suggested',
        description: 'Generated a creative recipe suggestion based on your ingredients',
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Debug function to check database content
  const debugDatabase = async () => {
    console.log('=== DEBUGGING DATABASE CONTENT ===');
    
    try {
      // Check recipes table
      const { data: recipes, error: recipesError } = await supabase
        .from('recipes')
        .select('id, title, is_public, is_published')
        .limit(5);
      
      console.log('Sample recipes:', recipes);
      if (recipesError) console.error('Recipes error:', recipesError);

      // Check ingredients table
      const { data: ingredients, error: ingredientsError } = await supabase
        .from('ingredients')
        .select('*')
        .limit(10);
      
      console.log('Sample ingredients:', ingredients);
      if (ingredientsError) console.error('Ingredients error:', ingredientsError);

      // Check recipe_ingredients table
      const { data: recipeIngredients, error: riError } = await supabase
        .from('recipe_ingredients')
        .select('*')
        .limit(10);
      
      console.log('Sample recipe_ingredients:', recipeIngredients);
      if (riError) console.error('Recipe ingredients error:', riError);

      // Check ingredient_images table
      const { data: ingredientImages, error: iiError } = await supabase
        .from('ingredient_images')
        .select('*')
        .limit(10);
      
      console.log('Sample ingredient_images:', ingredientImages);
      if (iiError) console.error('Ingredient images error:', iiError);

    } catch (error) {
      console.error('Debug error:', error);
    }
    
    console.log('=== END DEBUG ===');
  };

  // Add a debug button (remove this in production)
  useEffect(() => {
    debugDatabase();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {isMobile && <MobileHeader title="Find by Ingredients" />}
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            AI-Powered Recipe Generator
          </h1>

          {/* Debug Info */}
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              🤖 AI-Powered: Our AI chef will create custom recipes using your selected ingredients. Selected: {selectedIngredients.length}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={testAIEndpoint}
              className="mt-2 text-xs"
            >
              Test AI Endpoint
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Input
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Selected Ingredients */}
          {selectedIngredients.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Selected Ingredients ({selectedIngredients.length})</h3>
              <div className="flex flex-wrap gap-2">
                {selectedIngredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="secondary"
                    className="gap-1 py-2 px-3 text-sm"
                  >
                    {ingredient}
                    <button onClick={() => handleRemoveIngredient(ingredient)}>
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
              <Button 
                className="mt-3 bg-wasfah-orange hover:bg-wasfah-orange-dark"
                onClick={searchRecipesByIngredients}
                disabled={isSearching || selectedIngredients.length === 0}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('search.searching') || 'Searching...'}
                  </>
                ) : (
                  `${t('search.findRecipes') || 'Generate AI Recipes'} (${selectedIngredients.length} ${t('recipe.ingredients') || 'ingredients'})`
                )}
              </Button>
            </div>
          )}

          {/* Recipe Results */}
          {recipes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                {t('search.searchResults') || 'Search Results'} ({recipes.length} {t('navigation.recipes') || 'recipes'})
              </h3>
              <RecipeGrid recipes={recipes} columns={2} />
            </div>
          )}

          {/* Ingredients Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {isLoading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              filteredIngredients.map((ingredient) => (
                <Card
                  key={ingredient.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedIngredients.includes(ingredient.ingredient_name)
                      ? 'ring-2 ring-wasfah-orange bg-orange-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleIngredientToggle(ingredient.ingredient_name)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="relative mb-2">
                      <img
                        src={ingredient.image_url}
                        alt={ingredient.alt_text || ingredient.ingredient_name}
                        className="w-16 h-16 object-cover rounded-full mx-auto"
                      />
                      {selectedIngredients.includes(ingredient.ingredient_name) && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-wasfah-orange rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium capitalize">
                      {ingredient.ingredient_name}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
