import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RTLContextType {
  language: string;
  setLanguage: (lang: string) => void;
  direction: 'ltr' | 'rtl';
  t: (englishText: string, arabicText: string, turkishText?: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    fetchTranslations();
  }, [direction, language]);

  const fetchTranslations = async () => {
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('*');

      if (error) throw error;

      const translationMap: Record<string, Record<string, string>> = {};
      data?.forEach((translation) => {
        if (!translationMap[translation.key]) {
          translationMap[translation.key] = {};
        }
        translationMap[translation.key][translation.language_code] = translation.value;
      });

      setTranslations(translationMap);
    } catch (error) {
      console.error('Error fetching translations:', error);
    }
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (englishText: string, arabicText: string = '', turkishText: string = '') => {
    // First check database translations
    if (translations[englishText] && translations[englishText][language]) {
      return translations[englishText][language];
    }

    // Fallback to hardcoded translations
    switch (language) {
      case 'ar':
        return arabicText || englishText;
      case 'tr':
        return turkishText || englishText;
      default:
        return englishText;
    }
  };

  return (
    <RTLContext.Provider value={{ language, setLanguage, direction, t }}>
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = () => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};

