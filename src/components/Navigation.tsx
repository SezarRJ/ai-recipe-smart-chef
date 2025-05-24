
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Globe, Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl sm:text-2xl font-display font-bold text-gradient">
              {t("app.name")}
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-wasfah-orange transition-colors text-sm font-medium"
            >
              {t("nav.home")}
            </Link>
            <Link 
              to="/explore" 
              className="text-gray-600 hover:text-wasfah-orange transition-colors text-sm font-medium"
            >
              {t("nav.explore")}
            </Link>
            {session && (
              <>
                <Link 
                  to="/meal-planning" 
                  className="text-gray-600 hover:text-wasfah-orange transition-colors text-sm font-medium"
                >
                  {t("nav.mealPlan")}
                </Link>
                <Link 
                  to="/pantry" 
                  className="text-gray-600 hover:text-wasfah-orange transition-colors text-sm font-medium"
                >
                  {t("nav.pantry")}
                </Link>
              </>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <Globe size={16} />
                <span className="text-xs">{language.toUpperCase()}</span>
              </Button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 max-h-64 overflow-y-auto">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
                        language === lang.code ? "bg-gray-100 text-wasfah-orange" : "text-gray-700"
                      }`}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageOpen(false);
                      }}
                    >
                      <span className="font-medium">{lang.nativeName}</span>
                      <span className="text-gray-500 ml-2">({lang.name})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {session ? (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-1"
                >
                  <User size={16} />
                  <span>Profile</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-wasfah-orange text-wasfah-orange hover:bg-wasfah-orange hover:text-white"
                  onClick={() => navigate("/auth")}
                >
                  {t("action.login")}
                </Button>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-wasfah-orange to-wasfah-green hover:from-wasfah-orange-dark hover:to-wasfah-green-dark"
                  onClick={() => navigate("/auth")}
                >
                  {t("action.register")}
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-wasfah-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link 
                to="/explore" 
                className="text-gray-600 hover:text-wasfah-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.explore")}
              </Link>
              <Link 
                to="/meal-planning" 
                className="text-gray-600 hover:text-wasfah-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.mealPlan")}
              </Link>
              <Link 
                to="/pantry" 
                className="text-gray-600 hover:text-wasfah-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.pantry")}
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="border-t border-gray-200 pt-4 mt-2">
                <div className="flex items-center justify-between px-1 py-2">
                  <span className="text-gray-600 flex items-center font-medium">
                    <Globe size={16} className="mr-2" />
                    Language
                  </span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="bg-gray-50 rounded-lg px-3 py-1 text-sm border"
                  >
                    {availableLanguages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.nativeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Mobile Action Buttons */}
              <div className="flex flex-col space-y-2 pt-2">
                {session ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        navigate("/profile");
                        setIsMenuOpen(false);
                      }}
                    >
                      Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="border-wasfah-orange text-wasfah-orange hover:bg-wasfah-orange hover:text-white"
                      onClick={() => {
                        navigate("/auth");
                        setIsMenuOpen(false);
                      }}
                    >
                      {t("action.login")}
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-wasfah-orange to-wasfah-green hover:from-wasfah-orange-dark hover:to-wasfah-green-dark"
                      onClick={() => {
                        navigate("/auth");
                        setIsMenuOpen(false);
                      }}
                    >
                      {t("action.register")}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
