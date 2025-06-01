
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fallback recipes for when AI is unavailable
const fallbackRecipes = [
  {
    title: "Simple Scrambled Eggs",
    ingredients: ["2 eggs", "1 tbsp butter", "Salt and pepper"],
    instructions: "Beat eggs, melt butter in pan, add eggs and scramble gently",
    cookTime: "5 minutes",
    difficulty: "Easy"
  },
  {
    title: "Basic Pasta",
    ingredients: ["200g pasta", "2 tbsp olive oil", "2 cloves garlic", "Salt"],
    instructions: "Cook pasta, heat oil, add garlic, toss with pasta",
    cookTime: "15 minutes", 
    difficulty: "Easy"
  },
  {
    title: "Simple Salad",
    ingredients: ["Mixed greens", "Tomato", "Cucumber", "Olive oil", "Lemon"],
    instructions: "Chop vegetables, mix with greens, dress with oil and lemon",
    cookTime: "5 minutes",
    difficulty: "Easy"
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== AI Chef Function Started ===');
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const { query, context } = await req.json();
    
    console.log('AI Chef request:', { 
      query: query?.substring(0, 100), 
      context,
      hasApiKey: !!openAIApiKey 
    });

    if (!query) {
      throw new Error('Query is required');
    }

    // If no API key, return fallback response
    if (!openAIApiKey) {
      console.log('No OpenAI API key found, using fallback recipe');
      const randomRecipe = fallbackRecipes[Math.floor(Math.random() * fallbackRecipes.length)];
      
      return new Response(JSON.stringify({ 
        response: `I'm currently offline, but here's a simple recipe for you:\n\n**${randomRecipe.title}**\n\nIngredients: ${randomRecipe.ingredients.join(', ')}\n\nInstructions: ${randomRecipe.instructions}\n\nCook Time: ${randomRecipe.cookTime}\nDifficulty: ${randomRecipe.difficulty}`,
        type: 'fallback_recipe'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Try OpenAI API with timeout and retry logic
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        attempts++;
        console.log(`OpenAI API attempt ${attempts}/${maxAttempts}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
                content: 'You are a professional chef AI assistant. Provide helpful, practical cooking advice and recipes. Keep responses concise and actionable.'
              },
              { role: 'user', content: query }
            ],
            temperature: 0.7,
            max_tokens: 2000,
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.error(`OpenAI API error: ${response.status} - ${response.statusText}`);
          const errorText = await response.text();
          console.error('Error details:', errorText);
          
          if (attempts === maxAttempts) {
            throw new Error(`OpenAI API error: ${response.status}`);
          }
          continue; // Try again
        }

        const data = await response.json();
        const responseContent = data.choices[0].message.content.trim();
        
        console.log('AI Chef response received successfully');

        return new Response(JSON.stringify({ 
          response: responseContent,
          type: context?.requestType || 'general'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } catch (apiError) {
        console.error(`OpenAI API attempt ${attempts} failed:`, apiError.message);
        
        if (attempts === maxAttempts) {
          // Use fallback after all attempts failed
          console.log('All OpenAI attempts failed, using fallback recipe');
          const randomRecipe = fallbackRecipes[Math.floor(Math.random() * fallbackRecipes.length)];
          
          return new Response(JSON.stringify({ 
            response: `I'm having trouble connecting to my recipe database, but here's a reliable recipe I can share:\n\n**${randomRecipe.title}**\n\nIngredients: ${randomRecipe.ingredients.join(', ')}\n\nInstructions: ${randomRecipe.instructions}\n\nCook Time: ${randomRecipe.cookTime}\nDifficulty: ${randomRecipe.difficulty}\n\nPlease try again later for more personalized suggestions!`,
            type: 'fallback_recipe'
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }

  } catch (error) {
    console.error('AI Chef general error:', error.message);
    
    // Always provide fallback response
    const randomRecipe = fallbackRecipes[Math.floor(Math.random() * fallbackRecipes.length)];
    
    return new Response(JSON.stringify({ 
      response: `I'm experiencing some technical difficulties, but I can still help! Here's a simple recipe:\n\n**${randomRecipe.title}**\n\nIngredients: ${randomRecipe.ingredients.join(', ')}\n\nInstructions: ${randomRecipe.instructions}\n\nCook Time: ${randomRecipe.cookTime}\nDifficulty: ${randomRecipe.difficulty}`,
      type: 'error_fallback'
    }), {
      status: 200, // Return 200 with fallback instead of error
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
