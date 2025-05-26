
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
  WifiOff
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
  const { isOnline, hapticFeedback, shareContent } = useNativeFeatures();
  const navigate = useNavigate();

  const handleMenuToggle = async () => {
    await hapticFeedback('light');
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle?.();
  };

  const handleShare = async () => {
    await hapticFeedback('medium');
    await shareContent(
      "Wasfah AI - Smart Recipe App",
      "Discover amazing recipes with AI-powered recommendations!",
      window.location.href
    );
  };

  const menuItems = [
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Camera, label: 'Dish Scanner', path: '/dish-scanner' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Status Bar Indicator */}
      <div className="h-1 bg-gradient-to-r from-wasfah-orange to-wasfah-green" />
      
      {/* Main Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 safe-area-pt">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleMenuToggle}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Menu size={20} />
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <h1 className="font-display font-bold text-lg text-gray-800 truncate max-w-32">
                {title}
              </h1>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Network Status */}
            <div className="flex items-center">
              {isOnline ? (
                <Wifi size={16} className="text-green-500" />
              ) : (
                <WifiOff size={16} className="text-red-500" />
              )}
            </div>

            {showSearch && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/explore')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Search size={18} />
              </Button>
            )}

            {showNotifications && session && (
              <Button 
                variant="ghost" 
                size="sm"
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <Bell size={18} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-wasfah-orange rounded-full" />
              </Button>
            )}

            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Share2 size={18} />
            </Button>

            {session ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <User size={18} />
              </Button>
            ) : (
              <Button 
                size="sm"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white px-4 py-2 rounded-full text-xs"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Slide-out Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      hapticFeedback('light');
                    }}
                  >
                    <item.icon size={20} className="text-gray-600" />
                    <span className="font-medium text-gray-800">{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
