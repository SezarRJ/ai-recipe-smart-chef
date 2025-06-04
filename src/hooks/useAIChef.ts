
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAIChef = () => {
  const [isLoading, setIsLoading] = useState(false);

  const askAIChef = async (query: string, context?: any) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-chef', {
        body: { 
          query,
          context 
        }
      });

      if (error) throw error;
      
      return { response: data?.response || data || 'No response received' };
    } catch (error) {
      console.error('AI Chef error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    askAIChef,
    isLoading
  };
};
