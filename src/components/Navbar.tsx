
import React from 'react';
import { Globe, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  language: string;
  setLanguage: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
  const translations = {
    en: {
      home: 'Home',
      features: 'Features',
      recipes: 'Recipes',
      about: 'About',
      contact: 'Contact',
      getStarted: 'Get Started'
    },
    ar: {
      home: 'الرئيسية',
      features: 'المميزات',
      recipes: 'الوصفات',
      about: 'حول',
      contact: 'اتصل',
      getStarted: 'ابدأ الآن'
    },
    fr: {
      home: 'Accueil',
      features: 'Fonctionnalités',
      recipes: 'Recettes',
      about: 'À propos',
      contact: 'Contact',
      getStarted: 'Commencer'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-orange-100 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Tabkha AI
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t.home}
            </a>
            <a href="#features" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t.features}
            </a>
            <a href="#recipes" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t.recipes}
            </a>
            <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t.about}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t.contact}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="en">EN</option>
                <option value="ar">AR</option>
                <option value="fr">FR</option>
              </select>
            </div>
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
              {t.getStarted}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
