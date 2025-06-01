
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Globe, Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LanguageSelector } from "@/components/common/LanguageSelector";

export const Navigation = () => {
  const { t } = useLanguage();
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
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
            <LanguageSelector />
            
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

          {/* Mobile Language Selector */}
          <div className="lg:hidden">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};
