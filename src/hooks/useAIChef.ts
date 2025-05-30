
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AIChefResponse {
  response: string;
  type: 'recipe_suggestion' | 'cooking_advice' | 'nutrition_info' | 'error';
}

export const useAIChef = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askAIChef = async (query: string, context?: any): Promise<AIChefResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chef', {
        body: { query, context }
      });

      if (error) throw error;

      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Unknown error occurred';
      setError(errorMessage);
      
      return {
        response: 'Sorry, I\'m having trouble right now. Please try again later.',
        type: 'error'
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    askAIChef,
    isLoading,
    error,
  };
};
