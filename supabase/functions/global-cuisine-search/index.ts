
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== Global Cuisine Search Function Started ===');
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    const { cuisine, dietary_preferences, meal_type, difficulty } = await req.json();
    console.log('Search parameters:', { cuisine, dietary_preferences, meal_type, difficulty });

    if (!cuisine) {
      throw new Error('Cuisine type is required');
    }

    // Create detailed prompt for global cuisine search
    const prompt = `You are a world-renowned chef specializing in ${cuisine} cuisine. Create 5 authentic ${cuisine} recipes.

Requirements:
- All recipes must be traditional ${cuisine} dishes
- Include authentic ingredients and cooking methods
- Provide cultural context in descriptions
${dietary_preferences ? `- Must accommodate: ${dietary_preferences.join(', ')}` : ''}
${meal_type ? `- Focus on: ${meal_type} dishes` : ''}
${difficulty ? `- Difficulty level: ${difficulty}` : ''}

Return ONLY valid JSON in this exact format:
[
  {
    "title": "Authentic Recipe Name",
    "description": "Brief description with cultural context",
    "difficulty": "Easy|Medium|Hard",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "cuisine_type": "${cuisine}",
    "ingredients": [
      {"name": "ingredient", "amount": 1, "unit": "cup"}
    ],
    "instructions": [
      "Step 1: Detailed instruction",
      "Step 2: Detailed instruction"
    ],
    "calories": 350,
    "cultural_notes": "Brief note about the dish's origin or significance"
  }
]`;

    console.log('Making OpenAI API request for global cuisine...');
    
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
              content: `You are a culinary expert specializing in ${cuisine} cuisine. Respond only with valid JSON.`
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 3000,
        }),
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 20000)
      )
    ]);

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status}`);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    
    console.log('Processing AI response...');
    
    let recipes = [];
    
    try {
      // Parse JSON response
      if (content.startsWith('[') && content.endsWith(']')) {
        recipes = JSON.parse(content);
      } else {
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          recipes = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      }

      // Validate and enhance recipes
      recipes = recipes.map((recipe, index) => ({
        title: recipe.title || `${cuisine} Recipe ${index + 1}`,
        description: recipe.description || `An authentic ${cuisine} dish`,
        difficulty: recipe.difficulty || 'Medium',
        prep_time: recipe.prep_time || 20,
        cook_time: recipe.cook_time || 30,
        servings: recipe.servings || 4,
        cuisine_type: cuisine,
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        calories: recipe.calories || 350,
        cultural_notes: recipe.cultural_notes || `Traditional ${cuisine} cuisine`,
        image_url: '', // Will be populated by frontend
        tags: [cuisine.toLowerCase(), 'authentic', 'traditional']
      }));

      console.log(`Successfully generated ${recipes.length} ${cuisine} recipes`);

    } catch (parseError) {
      console.error('Failed to parse AI response, using fallback');
      
      // Fallback recipes for popular cuisines
      recipes = getFallbackRecipes(cuisine, dietary_preferences, meal_type);
    }

    return new Response(JSON.stringify({ 
      recipes,
      cuisine,
      total: recipes.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in global cuisine search:', error.message);
    
    // Fallback response
    const { cuisine = 'International' } = await req.json().catch(() => ({}));
    const fallbackRecipes = getFallbackRecipes(cuisine);
    
    return new Response(JSON.stringify({ 
      recipes: fallbackRecipes,
      cuisine,
      total: fallbackRecipes.length,
      fallback: true,
      error: error.message
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getFallbackRecipes(cuisine: string, dietary_preferences?: string[], meal_type?: string) {
  const cuisineFallbacks: Record<string, any[]> = {
    'italian': [
      {
        title: 'Classic Spaghetti Aglio e Olio',
        description: 'Simple Italian pasta with garlic and olive oil',
        difficulty: 'Easy',
        prep_time: 10,
        cook_time: 15,
        servings: 4,
        cuisine_type: 'Italian',
        ingredients: [
          { name: 'spaghetti', amount: 1, unit: 'pound' },
          { name: 'garlic', amount: 4, unit: 'cloves' },
          { name: 'olive oil', amount: 4, unit: 'tablespoons' },
          { name: 'red pepper flakes', amount: 1, unit: 'teaspoon' }
        ],
        instructions: [
          'Cook spaghetti according to package directions',
          'Heat olive oil and sauté sliced garlic until golden',
          'Add red pepper flakes and cooked pasta',
          'Toss well and serve immediately'
        ],
        calories: 420,
        cultural_notes: 'A traditional Roman dish, simple yet flavorful'
      }
    ],
    'chinese': [
      {
        title: 'Classic Fried Rice',
        description: 'Traditional Chinese fried rice with vegetables',
        difficulty: 'Easy',
        prep_time: 15,
        cook_time: 10,
        servings: 4,
        cuisine_type: 'Chinese',
        ingredients: [
          { name: 'cooked rice', amount: 3, unit: 'cups' },
          { name: 'eggs', amount: 2, unit: 'pieces' },
          { name: 'soy sauce', amount: 3, unit: 'tablespoons' },
          { name: 'vegetables', amount: 1, unit: 'cup' }
        ],
        instructions: [
          'Heat oil in wok or large pan',
          'Scramble eggs and set aside',
          'Stir-fry vegetables briefly',
          'Add rice and soy sauce, toss with eggs'
        ],
        calories: 380,
        cultural_notes: 'A staple dish that originated as a way to use leftover rice'
      }
    ]
  };

  const defaultFallback = [
    {
      title: `Traditional ${cuisine} Dish`,
      description: `An authentic recipe from ${cuisine} cuisine`,
      difficulty: 'Medium',
      prep_time: 20,
      cook_time: 30,
      servings: 4,
      cuisine_type: cuisine,
      ingredients: [
        { name: 'main ingredient', amount: 1, unit: 'pound' },
        { name: 'vegetables', amount: 2, unit: 'cups' },
        { name: 'seasonings', amount: 1, unit: 'tablespoon' }
      ],
      instructions: [
        'Prepare all ingredients according to traditional methods',
        'Cook using authentic techniques',
        'Season according to regional preferences',
        'Serve in traditional style'
      ],
      calories: 350,
      cultural_notes: `Traditional preparation methods from ${cuisine} culture`
    }
  ];

  const recipes = cuisineFallbacks[cuisine.toLowerCase()] || defaultFallback;
  
  // Apply filters if specified
  return recipes.filter(recipe => {
    if (dietary_preferences?.includes('vegetarian') && 
        recipe.ingredients.some((ing: any) => 
          ing.name.toLowerCase().includes('meat') || 
          ing.name.toLowerCase().includes('chicken') ||
          ing.name.toLowerCase().includes('beef')
        )) {
      return false;
    }
    return true;
  });
}
