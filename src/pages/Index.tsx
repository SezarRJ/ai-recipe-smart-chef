
import React from 'react';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

// FORCE UPDATE: 2025-06-04 - Resolving no changes error with distinct modification
const Index = () => {
  const { lang } = useParams();
  const location = useLocation();
  const { language } = useLanguage();
  
  console.log('Index component - FORCE UPDATE VERSION - location:', location.pathname, 'lang param:', lang, 'context language:', language);
  
  const currentLanguage = lang || language || 'en';
  const currentPath = location.pathname;
  
  // Handle root path - redirect to home with language prefix
  if (currentPath === '/') {
    const targetPath = `/${currentLanguage}/home`;
    console.log('Root path detected - Redirecting to:', targetPath);
    return <Navigate to={targetPath} replace />;
  }
  
  // Handle paths that start with language code but need proper routing
  const pathSegments = currentPath.split('/').filter(Boolean);
  
  if (pathSegments.length >= 1) {
    const firstSegment = pathSegments[0];
    
    // If first segment is a 2-letter language code
    if (firstSegment.length === 2 && /^[a-z]{2}$/.test(firstSegment)) {
      const restOfPath = pathSegments.slice(1);
      
      // If there's no page after language, go to home
      if (restOfPath.length === 0) {
        const targetPath = `/${firstSegment}/home`;
        console.log('Language without page - Adding home:', targetPath);
        return <Navigate to={targetPath} replace />;
      }
    } else {
      // Path doesn't start with language, add current language prefix
      const targetPath = `/${currentLanguage}${currentPath}`;
      console.log('No language prefix - Adding language:', targetPath);
      return <Navigate to={targetPath} replace />;
    }
  }
  
  // Default fallback - should rarely be reached
  const fallbackPath = `/${currentLanguage}/home`;
  console.log('Fallback redirect to:', fallbackPath);
  return <Navigate to={fallbackPath} replace />;
};

export default Index;
