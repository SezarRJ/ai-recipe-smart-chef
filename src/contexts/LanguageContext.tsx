
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<string, string>> = {
  en: {
    'app.name': 'Wasfah',
    'nav.home': 'Home',
    'nav.explore': 'Explore',
    'nav.mealPlan': 'Meal Plan',
    'nav.pantry': 'Pantry',
    'nav.profile': 'Profile',
    'action.login': 'Login',
    'action.register': 'Register',
    'scan.title': 'Scan Dish',
    'scan.subtitle': 'Identify Any Dish',
    'scan.description': 'Take a photo or upload an image to get dish information, ingredients, and recipe suggestions',
    'scan.takePhoto': 'Take Photo',
    'scan.uploadPhoto': 'Upload Photo'
  },
  ar: {
    'app.name': 'وصفة',
    'nav.home': 'الرئيسية',
    'nav.explore': 'استكشف',
    'nav.mealPlan': 'خطة الوجبات',
    'nav.pantry': 'المخزن',
    'nav.profile': 'الملف الشخصي',
    'action.login': 'تسجيل الدخول',
    'action.register': 'إنشاء حساب',
    'scan.title': 'مسح الطبق',
    'scan.subtitle': 'تحديد أي طبق',
    'scan.description': 'التقط صورة أو قم بتحميل صورة للحصول على معلومات الطبق والمكونات واقتراحات الوصفات',
    'scan.takePhoto': 'التقط صورة',
    'scan.uploadPhoto': 'تحميل صورة'
  },
  fr: {
    'app.name': 'Wasfah',
    'nav.home': 'Accueil',
    'nav.explore': 'Explorer',
    'nav.mealPlan': 'Plan de Repas',
    'nav.pantry': 'Garde-manger',
    'nav.profile': 'Profil',
    'action.login': 'Connexion',
    'action.register': 'S\'inscrire',
    'scan.title': 'Scanner le Plat',
    'scan.subtitle': 'Identifier Tout Plat',
    'scan.description': 'Prenez une photo ou téléchargez une image pour obtenir des informations sur le plat, les ingrédients et les suggestions de recettes',
    'scan.takePhoto': 'Prendre une Photo',
    'scan.uploadPhoto': 'Télécharger une Photo'
  }
};

const availableLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
  { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', direction: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr' }
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction for RTL languages
    const selectedLang = availableLanguages.find(l => l.code === lang);
    if (selectedLang) {
      document.documentElement.dir = selectedLang.direction;
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const isRTL = availableLanguages.find(l => l.code === language)?.direction === 'rtl';

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && availableLanguages.some(l => l.code === savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (availableLanguages.some(l => l.code === browserLang)) {
        setLanguage(browserLang);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      availableLanguages,
      isRTL
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
