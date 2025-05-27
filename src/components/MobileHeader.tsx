
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
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
  Sparkles
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
  const navigate = useNavigate();

  const handleMenuToggle = async () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle?.();
  };

  const handleShare = async () => {
    // Share functionality will work when using Capacitor native features
    console.log("Share functionality");
  };

  const menuItems = [
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Camera, label: 'Dish Scanner', path: '/dish-scanner' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Enhanced status bar indicator */}
      <div className="h-1 bg-gradient-to-r from-wasfah-orange via-wasfah-gold to-wasfah-green" />
      
      {/* Main Header with improved design */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-100 safe-area-pt shadow-lg">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleMenuToggle}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <Menu size={20} />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-wasfah-orange to-wasfah-green rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">W</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-wasfah-gold rounded-full border-2 border-white">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-gray-800 truncate max-w-32">
                  {title}
                </h1>
                <p className="text-xs text-gray-500">AI Recipe Chef</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Enhanced network status */}
            <div className="flex items-center">
              <Wifi size={16} className="text-green-500" />
            </div>

            {showSearch && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/explore')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <Search size={18} />
              </Button>
            )}

            {showNotifications && session && (
              <Button 
                variant="ghost" 
                size="sm"
                className="p-2 hover:bg-gray-100 rounded-xl relative transition-all duration-200"
              >
                <Bell size={18} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-wasfah-orange to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
              </Button>
            )}

            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <Share2 size={18} />
            </Button>

            {session ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <User size={18} />
              </Button>
            ) : (
              <Button 
                size="sm"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced slide-out menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden bg-gradient-to-br from-white to-gray-50 border-t border-gray-100"
            >
              <div className="px-4 py-6 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-wasfah-orange/10 to-wasfah-green/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon size={20} className="text-wasfah-orange" />
                      </div>
                      <span className="font-semibold text-gray-800 group-hover:text-wasfah-orange transition-colors">{item.label}</span>
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
