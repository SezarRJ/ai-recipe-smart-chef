
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { ingredients, preferences, restrictions } = await req.json()
    
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      throw new Error('No ingredients provided')
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Create a detailed prompt for recipe generation
    const prompt = `Generate a detailed recipe using these ingredients: ${ingredients.join(', ')}

${preferences ? `Cuisine preferences: ${preferences}` : ''}
${restrictions ? `Dietary restrictions: ${restrictions}` : ''}

Please provide a response in the following JSON format:
{
  "title": "Recipe Name",
  "description": "Brief description",
  "prep_time": 15,
  "cook_time": 30,
  "servings": 4,
  "difficulty": "Easy|Medium|Hard",
  "cuisine_type": "cuisine type",
  "ingredients": [
    {
      "name": "ingredient name",
      "amount": "quantity",
      "unit": "unit of measurement"
    }
  ],
  "instructions": [
    "Step 1",
    "Step 2"
  ],
  "tips": [
    "Optional cooking tip"
  ],
  "calories": 350
}

Make sure the recipe is practical, delicious, and uses most of the provided ingredients.`

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a professional chef who creates amazing recipes. Always respond with valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1500
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`OpenAI API error: ${errorData}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No response from AI')
    }

    // Try to parse the JSON response
    let recipe
    try {
      recipe = JSON.parse(aiResponse)
    } catch (parseError) {
      // If JSON parsing fails, try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        recipe = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Invalid JSON response from AI')
      }
    }

    console.log('Recipe generated successfully')

    return new Response(
      JSON.stringify({ 
        recipe,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Recipe generation error:', error.message)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    )
  }
})
