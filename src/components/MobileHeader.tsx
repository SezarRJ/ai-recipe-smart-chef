
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNativeFeatures } from '@/hooks/useNativeFeatures';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  Settings,
  Heart,
  Share2,
  Camera,
  Wifi,
  WifiOff,
  Sparkles,
  Calendar,
  ShoppingBag,
  ChefHat,
  BookOpen,
  Utensils,
  Home
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileHeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  onMenuToggle?: () => void;
}

export const MobileHeader = ({ 
  title = "Wasfah AI", 
  showSearch = true, 
  showNotifications = true,
  onMenuToggle 
}: MobileHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { session } = useAuth();
  const { isOnline, shareContent, hapticFeedback } = useNativeFeatures();
  const navigate = useNavigate();

  const handleMenuToggle = async () => {
    await hapticFeedback('light');
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle?.();
  };

  const handleShare = async () => {
    await hapticFeedback('medium');
    await shareContent(
      "Wasfah AI - Smart Recipe Chef",
      "Discover amazing recipes with AI-powered cooking assistant!",
      window.location.href
    );
  };

  const handleNavigation = async (path: string) => {
    await hapticFeedback('light');
    navigate(path);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { icon: Home, label: 'Home', path: '/', color: 'text-blue-600' },
    { icon: Search, label: 'Explore Recipes', path: '/explore', color: 'text-green-600' },
    { icon: Camera, label: 'Dish Scanner', path: '/dish-scanner', color: 'text-purple-600' },
    { icon: Calendar, label: 'Meal Planning', path: '/meal-planning', color: 'text-orange-600' },
    { icon: ShoppingBag, label: 'Smart Pantry', path: '/pantry', color: 'text-red-600' },
    { icon: Utensils, label: 'Global Cuisine', path: '/global-cuisine', color: 'text-indigo-600' },
    { icon: Heart, label: 'Favorites', path: '/favorites', color: 'text-pink-600' },
    { icon: ChefHat, label: 'Cooking History', path: '/cooking-history', color: 'text-yellow-600' },
    { icon: BookOpen, label: 'Create Recipe', path: '/create-recipe', color: 'text-teal-600' },
    { icon: Settings, label: 'Settings', path: '/settings', color: 'text-gray-600' },
  ];

  return (
    <>
      {/* Enhanced status bar indicator with network status */}
      <div className={`h-1 transition-all duration-300 ${
        isOnline 
          ? 'bg-gradient-to-r from-wasfah-orange via-wasfah-gold to-wasfah-green' 
          : 'bg-gradient-to-r from-red-500 to-red-600'
      }`} />
      
      {/* Main Header with enhanced design */}
      <header className="bg-white/98 backdrop-blur-xl border-b border-gray-100 safe-area-pt shadow-xl">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Left Side - Enhanced */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleMenuToggle}
              className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
            >
              <Menu size={22} className="text-gray-700" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-gradient-to-br from-wasfah-orange via-red-500 to-wasfah-green rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-xl">W</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-wasfah-gold rounded-full border-2 border-white flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-gray-800 truncate max-w-36">
                  {title}
                </h1>
                <p className="text-xs text-gray-500 font-medium">AI Recipe Chef</p>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced */}
          <div className="flex items-center gap-2">
            {/* Enhanced network status */}
            <div className="flex items-center">
              {isOnline ? (
                <Wifi size={18} className="text-green-500" />
              ) : (
                <WifiOff size={18} className="text-red-500" />
              )}
            </div>

            {showSearch && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleNavigation('/explore')}
                className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
              >
                <Search size={20} className="text-gray-700" />
              </Button>
            )}

            {showNotifications && session && (
              <Button 
                variant="ghost" 
                size="sm"
                className="p-3 hover:bg-gray-100 rounded-xl relative transition-all duration-200 active:scale-95"
              >
                <Bell size={20} className="text-gray-700" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-wasfah-orange to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
              </Button>
            )}

            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleShare}
              className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
            >
              <Share2 size={20} className="text-gray-700" />
            </Button>

            {session ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleNavigation('/profile')}
                className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
              >
                <User size={20} className="text-gray-700" />
              </Button>
            ) : (
              <Button 
                size="sm"
                onClick={() => handleNavigation('/auth')}
                className="bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced slide-out menu with better organization */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden bg-gradient-to-br from-white via-gray-50 to-orange-50 border-t border-gray-100"
            >
              <div className="px-4 py-8 space-y-3">
                <h3 className="text-lg font-bold text-gray-800 mb-4 px-4">Navigation Menu</h3>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-200 group active:scale-98"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                        <item.icon size={24} className={`${item.color} group-hover:scale-110 transition-transform`} />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-gray-800 group-hover:text-wasfah-orange transition-colors text-lg">{item.label}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
