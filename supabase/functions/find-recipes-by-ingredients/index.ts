
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FALLBACK_RECIPES = [
  {
    title: "Quick Mixed Ingredient Stir-Fry",
    description: "A versatile stir-fry recipe that works with most available ingredients.",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    servings: 4,
    cuisine_type: "Fusion",
    calories: 280,
    ingredients: [],
    instructions: [
      "Heat oil in a large pan or wok over medium-high heat",
      "Add harder vegetables first and cook for 2-3 minutes",
      "Add softer ingredients and continue cooking for 3-5 minutes",
      "Season with salt, pepper, and your choice of spices",
      "Serve immediately over rice or noodles"
    ]
  },
  {
    title: "Mediterranean Bowl",
    description: "A healthy bowl combining fresh ingredients with Mediterranean flavors.",
    difficulty: "Easy",
    prep_time: 15,
    cook_time: 0,
    servings: 2,
    cuisine_type: "Mediterranean",
    calories: 320,
    ingredients: [],
    instructions: [
      "Wash and prepare all fresh ingredients",
      "Arrange ingredients in a large bowl",
      "Drizzle with olive oil and lemon juice",
      "Add Mediterranean herbs and spices",
      "Toss gently and serve immediately"
    ]
  },
  {
    title: "Simple Ingredient Soup",
    description: "A warming soup that can be made with most available ingredients.",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 25,
    servings: 4,
    cuisine_type: "International",
    calories: 180,
    ingredients: [],
    instructions: [
      "Heat oil in a large pot over medium heat",
      "Add aromatics like onions or garlic if available",
      "Add harder vegetables and cook for 5 minutes",
      "Add broth or water and bring to a boil",
      "Simmer for 15-20 minutes until vegetables are tender",
      "Season to taste and serve hot"
    ]
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== AI Recipe Generation Function Started ===');
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured in environment variables');
    }

    const { ingredients, dietary_preferences, cuisine_type } = await req.json();
    console.log('Request payload:', { ingredients, dietary_preferences, cuisine_type });

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      console.error('Invalid ingredients array:', ingredients);
      throw new Error('Valid ingredients array is required');
    }

    // Create optimized prompt for better AI response
    const prompt = `You are a professional chef AI. Create exactly 3 practical recipes using ONLY these available ingredients: ${ingredients.join(', ')}.

CRITICAL REQUIREMENTS:
1. Use ONLY the provided ingredients (you may add basic seasonings like salt, pepper, oil)
2. Return ONLY valid JSON - no markdown, no explanations, no extra text
3. Each recipe must be realistic and achievable

${dietary_preferences ? `Dietary requirements: ${dietary_preferences.join(', ')}` : ''}
${cuisine_type ? `Preferred cuisine: ${cuisine_type}` : ''}

Return this exact JSON structure:
[
  {
    "title": "Recipe Name",
    "description": "Brief 1-2 sentence description",
    "difficulty": "Easy",
    "prep_time": 15,
    "cook_time": 25,
    "servings": 4,
    "ingredients": [
      {"name": "ingredient_name", "amount": 1, "unit": "cup"}
    ],
    "instructions": [
      "Step 1: Clear instruction",
      "Step 2: Clear instruction"
    ],
    "calories": 300,
    "cuisine_type": "International"
  }
]`;

    console.log('Making OpenAI API request...');
    const startTime = Date.now();

    const response = await Promise.race([
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { 
              role: 'system', 
              content: 'You are a professional chef AI. Always respond with valid JSON only. No markdown formatting or extra text.'
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 2000,
        }),
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 15000)
      )
    ]);

    const requestTime = Date.now() - startTime;
    console.log(`OpenAI API request completed in ${requestTime}ms`);

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status} ${response.statusText}`);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received, processing...');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      throw new Error('Invalid response structure from OpenAI');
    }

    const content = data.choices[0].message.content.trim();
    console.log('AI response length:', content.length);
    console.log('AI response preview:', content.substring(0, 200) + '...');

    // Enhanced JSON parsing with multiple strategies
    let recipes = [];
    
    try {
      // Strategy 1: Direct parsing
      if (content.startsWith('[') && content.endsWith(']')) {
        recipes = JSON.parse(content);
        console.log('Direct JSON parsing successful');
      }
      // Strategy 2: Extract JSON from markdown or mixed content
      else {
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          recipes = JSON.parse(jsonMatch[0]);
          console.log('JSON extraction successful');
        } else {
          throw new Error('No JSON array found in response');
        }
      }

      // Validate recipes
      if (!Array.isArray(recipes) || recipes.length === 0) {
        throw new Error('No valid recipes in response');
      }

      // Enhance recipes with ingredients from the input
      recipes = recipes.map((recipe, index) => {
        // Fill in missing ingredients if needed
        if (!recipe.ingredients || recipe.ingredients.length === 0) {
          recipe.ingredients = ingredients.map(ing => ({
            name: ing,
            amount: 1,
            unit: 'cup'
          }));
        }

        // Ensure all required fields exist
        return {
          title: recipe.title || `Recipe ${index + 1} with ${ingredients.slice(0, 2).join(' & ')}`,
          description: recipe.description || `A delicious recipe using ${ingredients.join(', ')}`,
          difficulty: recipe.difficulty || 'Easy',
          prep_time: recipe.prep_time || 15,
          cook_time: recipe.cook_time || 25,
          servings: recipe.servings || 4,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions || [
            'Prepare all ingredients',
            'Follow cooking steps carefully',
            'Season to taste and serve'
          ],
          calories: recipe.calories || 300,
          cuisine_type: recipe.cuisine_type || cuisine_type || 'International'
        };
      });

      console.log(`Successfully processed ${recipes.length} recipes`);

    } catch (parseError) {
      console.error('JSON parsing failed:', parseError.message);
      console.log('Falling back to intelligent recipe generation...');
      
      // Intelligent fallback: Create recipes based on ingredients
      recipes = FALLBACK_RECIPES.map((template, index) => ({
        ...template,
        title: `${template.title} with ${ingredients.slice(0, 2).join(' & ')}`,
        description: `${template.description} Using: ${ingredients.join(', ')}.`,
        ingredients: ingredients.map(ing => ({
          name: ing,
          amount: 1,
          unit: getIntelligentUnit(ing)
        })),
        cuisine_type: cuisine_type || template.cuisine_type
      }));

      console.log(`Generated ${recipes.length} fallback recipes`);
    }

    console.log('=== AI Recipe Generation Function Completed Successfully ===');

    return new Response(JSON.stringify({ recipes }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('=== ERROR in AI Recipe Generation ===');
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);

    // Enhanced fallback with ingredients
    const { ingredients = [] } = await req.json().catch(() => ({ ingredients: [] }));
    
    const fallbackRecipes = FALLBACK_RECIPES.map(template => ({
      ...template,
      title: ingredients.length > 0 ? 
        `${template.title} with ${ingredients.slice(0, 2).join(' & ')}` : 
        template.title,
      ingredients: ingredients.length > 0 ? 
        ingredients.map(ing => ({
          name: ing,
          amount: 1,
          unit: getIntelligentUnit(ing)
        })) : 
        template.ingredients
    }));

    console.log('Returning enhanced fallback recipes');

    return new Response(
      JSON.stringify({ 
        recipes: fallbackRecipes,
        fallback: true,
        error: `AI service temporarily unavailable: ${error.message}`
      }), 
      {
        status: 200, // Return 200 with fallback data instead of error
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function getIntelligentUnit(ingredient: string): string {
  const ing = ingredient.toLowerCase();
  
  if (ing.includes('oil') || ing.includes('vinegar') || ing.includes('sauce')) {
    return 'tablespoon';
  }
  if (ing.includes('salt') || ing.includes('pepper') || ing.includes('spice')) {
    return 'teaspoon';
  }
  if (ing.includes('meat') || ing.includes('chicken') || ing.includes('beef') || ing.includes('fish')) {
    return 'pound';
  }
  if (ing.includes('water') || ing.includes('milk') || ing.includes('broth') || ing.includes('juice')) {
    return 'cup';
  }
  if (ing.includes('egg')) {
    return 'piece';
  }
  
  return 'cup'; // Default unit
}
