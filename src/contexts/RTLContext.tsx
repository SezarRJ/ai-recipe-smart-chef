
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  return (
    <RTLContext.Provider value={{ direction, language, toggleDirection, setLanguage, t }}>
      <div dir={direction}>
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
