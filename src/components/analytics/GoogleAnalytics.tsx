
import React, { useEffect } from 'react';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId = 'G-XXXXXXXXXX' }) => {
  useEffect(() => {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = window.gtag || function() {
      window.gtag.q = window.gtag.q || [];
      window.gtag.q.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    return () => {
      // Cleanup
      const existingScript = document.querySelector(`script[src*="${measurementId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [measurementId]);

  return null;
};

export default GoogleAnalytics;

// Analytics utility functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (page_title: string, page_location: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title,
      page_location,
    });
  }
};

export const trackRecipeView = (recipeId: string, recipeName: string) => {
  trackEvent('recipe_view', {
    recipe_id: recipeId,
    recipe_name: recipeName,
    content_type: 'recipe'
  });
};

export const trackRecipeSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
    content_type: 'recipe'
  });
};

export const trackAIChefInteraction = (query: string, responseType: string) => {
  trackEvent('ai_chef_interaction', {
    query_type: responseType,
    query_length: query.length
  });
};
