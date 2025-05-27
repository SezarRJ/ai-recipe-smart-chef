import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Define available languages
type LanguageCode = 'en' | 'ar' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja';

// Define the context type
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isRTL: boolean;
  availableLanguages: { code: LanguageCode; name: string; nativeName: string }[];
}

// Available languages with their native names
const availableLanguages = [
  { code: 'en' as LanguageCode, name: 'English', nativeName: 'English' },
  { code: 'ar' as LanguageCode, name: 'Arabic', nativeName: 'العربية' },
  { code: 'fr' as LanguageCode, name: 'French', nativeName: 'Français' },
  { code: 'es' as LanguageCode, name: 'Spanish', nativeName: 'Español' },
  { code: 'de' as LanguageCode, name: 'German', nativeName: 'Deutsch' },
  { code: 'it' as LanguageCode, name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt' as LanguageCode, name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru' as LanguageCode, name: 'Russian', nativeName: 'Русский' },
  { code: 'zh' as LanguageCode, name: 'Chinese', nativeName: '中文' },
  { code: 'ja' as LanguageCode, name: 'Japanese', nativeName: '日本語' },
];

// Create the context
const DatabaseLanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const DatabaseLanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    // Try to get saved language from localStorage
    const savedLanguage = localStorage.getItem('wasfah-language');
    if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
      return savedLanguage as LanguageCode;
    }
    // Otherwise, try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (availableLanguages.some(lang => lang.code === browserLang)) {
      return browserLang as LanguageCode;
    }
    return 'en';
  });

  // Fetch translations from database
  const { data: translations } = useQuery({
    queryKey: ['translations', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('translations')
        .select('key, value')
        .eq('language_code', language);
      
      if (error) throw error;
      
      // Convert array to object for easy lookup
      return data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string>);
    }
  });

  // Save language preference
  useEffect(() => {
    localStorage.setItem('wasfah-language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Function to get translation
  const t = (key: string): string => {
    if (translations && translations[key]) {
      return translations[key];
    }
    return key; // Fallback to key if translation not found
  };

  // Check if language is RTL
  const isRTL = language === 'ar';

  return (
    <DatabaseLanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      isRTL, 
      availableLanguages 
    }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : ''}>
        {children}
      </div>
    </DatabaseLanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useDatabaseLanguage = () => {
  const context = useContext(DatabaseLanguageContext);
  if (context === undefined) {
    throw new Error('useDatabaseLanguage must be used within a DatabaseLanguageProvider');
  }
  return context;
};
