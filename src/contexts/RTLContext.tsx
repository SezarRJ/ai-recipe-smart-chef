
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface RTLContextType {
  direction: 'ltr' | 'rtl';
  language: string;
  toggleDirection: () => void;
  setLanguage: (lang: string) => void;
  t: (english: string, arabic?: string, turkish?: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const RTLProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [language, setLanguageState] = useState<string>('en');

  const toggleDirection = () => {
    setDirection(prev => prev === 'ltr' ? 'rtl' : 'ltr');
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    // Update direction based on language
    if (lang === 'ar') {
      setDirection('rtl');
    } else {
      setDirection('ltr');
    }
  };

  const t = (english: string, arabic?: string, turkish?: string) => {
    switch (language) {
      case 'ar':
        return arabic || english;
      case 'tr':
        return turkish || english;
      default:
        return english;
    }
  };

  // Update document direction and font when direction or language changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    
    // Apply language-specific classes
    const body = document.body;
    const html = document.documentElement;
    
    // Remove existing language classes
    body.classList.remove('font-arabic', 'font-turkish', 'font-english');
    html.classList.remove('font-arabic', 'font-turkish', 'font-english');
    
    // Add appropriate language class
    if (language === 'ar') {
      body.classList.add('font-arabic');
      html.classList.add('font-arabic');
    } else if (language === 'tr') {
      body.classList.add('font-turkish');
      html.classList.add('font-turkish');
    } else {
      body.classList.add('font-english');
      html.classList.add('font-english');
    }
    
    // Update CSS custom properties for font size adjustments
    if (language === 'ar') {
      document.documentElement.style.setProperty('--text-scale', '1.05');
      document.documentElement.style.setProperty('--line-height-scale', '1.7');
    } else {
      document.documentElement.style.setProperty('--text-scale', '1');
      document.documentElement.style.setProperty('--line-height-scale', '1.5');
    }
  }, [direction, language]);

  return (
    <RTLContext.Provider value={{ direction, language, toggleDirection, setLanguage, t }}>
      <div dir={direction} className={`min-h-screen text-rendering-optimized ${direction === 'rtl' ? 'font-arabic' : ''}`}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};

export const useRTL = (): RTLContextType => {
  const context = useContext(RTLContext);
  if (!context) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
