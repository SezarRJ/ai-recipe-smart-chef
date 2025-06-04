
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, context } = await req.json();

    const systemPrompt = `You are an expert AI Chef Assistant for WasfahAI, a multilingual cooking app. You specialize in:
    - Recipe recommendations and modifications
    - Cooking techniques and tips
    - Ingredient substitutions
    - Nutritional advice
    - Global cuisine knowledge
    - Meal planning suggestions
    
    Always provide helpful, accurate cooking advice. Be concise but informative. If asked about recipes, suggest specific steps and ingredients when possible.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Determine response type based on content
    let responseType = 'cooking_advice';
    if (aiResponse.toLowerCase().includes('recipe') || aiResponse.toLowerCase().includes('ingredient')) {
      responseType = 'recipe_suggestion';
    } else if (aiResponse.toLowerCase().includes('nutrition') || aiResponse.toLowerCase().includes('calorie')) {
      responseType = 'nutrition_info';
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      type: responseType
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-chef function:', error);
    return new Response(JSON.stringify({ 
      response: 'Sorry, I\'m having trouble right now. Please try again later.',
      type: 'error',
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
