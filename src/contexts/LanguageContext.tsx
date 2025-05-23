
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages
type LanguageCode = 'en' | 'ar' | 'fr' | 'es';

// Translations interface
interface Translations {
  [key: string]: {
    [key in LanguageCode]?: string;
  };
}

// Define the context type
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  translations: Translations;
  isRTL: boolean;
}

// Sample translations - this would be expanded with many more keys
const translations: Translations = {
  "app.name": {
    en: "Wasfah AI",
    ar: "وصفة الذكاء الاصطناعي",
    fr: "Wasfah AI",
    es: "Wasfah AI",
  },
  "nav.home": {
    en: "Home",
    ar: "الرئيسية",
    fr: "Accueil",
    es: "Inicio",
  },
  "nav.explore": {
    en: "Explore",
    ar: "استكشاف",
    fr: "Explorer",
    es: "Explorar",
  },
  "nav.mealPlan": {
    en: "Meal Plan",
    ar: "خطة الوجبات",
    fr: "Plan de repas",
    es: "Plan de comidas",
  },
  "nav.pantry": {
    en: "Pantry",
    ar: "المخزن",
    fr: "Garde-manger",
    es: "Despensa",
  },
  "nav.profile": {
    en: "Profile",
    ar: "الملف الشخصي",
    fr: "Profil",
    es: "Perfil",
  },
  // Add more translations as needed
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Function to get translation
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language] || key;
    }
    return key; // Fallback to key if translation not found
  };

  // Check if language is RTL
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
