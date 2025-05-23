
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-2xl font-display font-bold text-gradient">{t("app.name")}</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-wasfah-orange transition-colors">{t("nav.home")}</Link>
            <Link to="/explore" className="text-gray-600 hover:text-wasfah-orange transition-colors">{t("nav.explore")}</Link>
            <Link to="/meal-planning" className="text-gray-600 hover:text-wasfah-orange transition-colors">{t("nav.mealPlan")}</Link>
            <Link to="/pantry" className="text-gray-600 hover:text-wasfah-orange transition-colors">{t("nav.pantry")}</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <Button variant="outline" className="flex items-center space-x-2">
                <Globe size={16} />
                <span>{language.toUpperCase()}</span>
              </Button>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                        language === lang.code ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setLanguage(lang.code as any)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-wasfah-orange text-wasfah-orange hover:bg-wasfah-orange hover:text-white">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-wasfah-orange to-wasfah-green hover:from-wasfah-orange-dark hover:to-wasfah-green-dark">
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <div className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-wasfah-orange transition-colors">{t("nav.home")}</Link>
              <Link to="/explore" className="text-gray-600 hover:text-wasfah-orange transition-colors">{t("nav.explore")}</Link>
              <Link to="/meal-planning" className="text-gray-600 hover:text-wasfah-orange transition-colors">{t("nav.mealPlan")}</Link>
              <Link to="/pantry" className="text-gray-600 hover:text-wasfah-orange transition-colors">{t("nav.pantry")}</Link>
              
              <div className="border-t border-gray-200 pt-4 mt-2">
                <div className="flex items-center justify-between px-1 py-2">
                  <span className="text-gray-600 flex items-center">
                    <Globe size={16} className="mr-2" />
                    Language
                  </span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="bg-gray-100 rounded-lg px-2 py-1 text-sm"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" className="border-wasfah-orange text-wasfah-orange hover:bg-wasfah-orange hover:text-white">
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-wasfah-orange to-wasfah-green hover:from-wasfah-orange-dark hover:to-wasfah-green-dark">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
