
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRTL } from "@/contexts/RTLContext";
import { Globe, Menu, X, User } from "lucide-react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { LanguageSelector } from "@/components/common/LanguageSelector";

export const Navigation = () => {
  const { language } = useLanguage();
  const { session, signOut } = useAuth();
  const { direction } = useRTL();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLanguage = lang || language || 'en';

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate(`/${currentLanguage}/auth`);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname.includes(path) ? 'text-wasfah-orange font-semibold' : 'text-gray-600 hover:text-wasfah-orange';
  };

  const isRTL = direction === 'rtl';

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} justify-between items-center h-16`}>
          {/* Logo */}
          <Link to={`/${currentLanguage}/home`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl sm:text-2xl font-display font-bold text-gradient">
              Wasfah
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to={`/${currentLanguage}/home`} 
              className={`transition-colors text-sm font-medium ${isActive('home')}`}
            >
              Home
            </Link>
            <Link 
              to={`/${currentLanguage}/recipes`} 
              className={`transition-colors text-sm font-medium ${isActive('recipes')}`}
            >
              Recipes
            </Link>
            <Link 
              to={`/${currentLanguage}/global-cuisine`} 
              className={`transition-colors text-sm font-medium ${isActive('global-cuisine')}`}
            >
              Cuisine
            </Link>
            {session && (
              <>
                <Link 
                  to={`/${currentLanguage}/ai-features`} 
                  className={`transition-colors text-sm font-medium ${isActive('ai-features')}`}
                >
                  AI Features
                </Link>
                <Link 
                  to={`/${currentLanguage}/health-tracking-home`} 
                  className={`transition-colors text-sm font-medium ${isActive('health-tracking')}`}
                >
                  Health
                </Link>
                {session?.user?.user_metadata?.isAdmin && (
                  <Link 
                    to={`/${currentLanguage}/admin`} 
                    className={`transition-colors text-sm font-medium ${isActive('admin')}`}
                  >
                    Admin
                  </Link>
                )}
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
                  onClick={() => navigate(`/${currentLanguage}/profile`)}
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
                  onClick={() => navigate(`/${currentLanguage}/auth`)}
                >
                  Login
                </Button>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-wasfah-orange to-wasfah-green hover:from-wasfah-orange-dark hover:to-wasfah-green-dark"
                  onClick={() => navigate(`/${currentLanguage}/auth`)}
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSelector />
            <button 
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className={`lg:hidden bg-white shadow-md py-4 px-6 ${isRTL ? 'text-right' : 'text-left'} animate-fade-in`}>
            <div className="flex flex-col space-y-4">
              <Link 
                to={`/${currentLanguage}/home`} 
                className={`py-2 transition-colors ${isActive('home')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to={`/${currentLanguage}/recipes`} 
                className={`py-2 transition-colors ${isActive('recipes')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Recipes
              </Link>
              <Link 
                to={`/${currentLanguage}/global-cuisine`} 
                className={`py-2 transition-colors ${isActive('global-cuisine')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Global Cuisine
              </Link>
              {session && (
                <>
                  <Link 
                    to={`/${currentLanguage}/ai-features`} 
                    className={`py-2 transition-colors ${isActive('ai-features')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    AI Features
                  </Link>
                  <Link 
                    to={`/${currentLanguage}/health-tracking-home`} 
                    className={`py-2 transition-colors ${isActive('health-tracking')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Health Tracking
                  </Link>
                  {session?.user?.user_metadata?.isAdmin && (
                    <Link 
                      to={`/${currentLanguage}/admin`} 
                      className={`py-2 transition-colors ${isActive('admin')}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              )}
              <div className="pt-4 border-t border-gray-100">
                {session ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full mb-2 flex items-center justify-center space-x-1"
                      onClick={() => {
                        navigate(`/${currentLanguage}/profile`);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full mb-2 border-wasfah-orange text-wasfah-orange hover:bg-wasfah-orange hover:text-white"
                      onClick={() => {
                        navigate(`/${currentLanguage}/auth`);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-wasfah-orange to-wasfah-green hover:from-wasfah-orange-dark hover:to-wasfah-green-dark"
                      onClick={() => {
                        navigate(`/${currentLanguage}/auth`);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Register
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
