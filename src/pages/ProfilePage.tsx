import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Globe, Bell, Moon, CreditCard, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' }
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as any);
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
  };

  const handleNavigateToSection = (section: string) => {
    // Add navigation logic for different sections
    console.log(`Navigate to ${section}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20">
      <div className="pt-4 px-4 pb-2">
        <h1 className="text-3xl font-display font-bold">{t("nav.profile")}</h1>
      </div>
      
      <div className="p-4">
        {/* User Info */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-full flex items-center justify-center text-white text-2xl font-bold">
            U
          </div>
          <div className="ml-4">
            <h2 className="font-semibold text-lg">User Name</h2>
            <p className="text-gray-600 text-sm">user@example.com</p>
          </div>
          <Button 
            variant="outline" 
            className="ml-auto text-sm"
            onClick={handleEditProfile}
            type="button"
          >
            Edit Profile
          </Button>
        </div>
        
        {/* Language Selector */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex items-center p-4 border-b">
            <Globe className="text-gray-600 mr-3" size={20} />
            <div className="flex-1">
              <h3 className="font-medium">Language</h3>
            </div>
            <select 
              value={language} 
              onChange={handleLanguageChange}
              className="bg-gray-100 rounded-lg px-3 py-1 text-sm"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="flex items-center p-4 border-b w-full text-left hover:bg-gray-50"
            onClick={() => handleNavigateToSection('notifications')}
          >
            <Bell className="text-gray-600 mr-3" size={20} />
            <div className="flex-1">
              <h3 className="font-medium">Notifications</h3>
              <p className="text-xs text-gray-500">Manage notification preferences</p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          
          <button 
            className="flex items-center p-4 border-b w-full text-left hover:bg-gray-50"
            onClick={() => handleNavigateToSection('appearance')}
          >
            <Moon className="text-gray-600 mr-3" size={20} />
            <div className="flex-1">
              <h3 className="font-medium">Appearance</h3>
              <p className="text-xs text-gray-500">Light and dark mode</p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          
          <button 
            className="flex items-center p-4 w-full text-left hover:bg-gray-50"
            onClick={() => handleNavigateToSection('subscription')}
          >
            <CreditCard className="text-gray-600 mr-3" size={20} />
            <div className="flex-1">
              <h3 className="font-medium">Subscription</h3>
              <p className="text-xs text-gray-500">Manage your subscription plan</p>
            </div>
            <span className="bg-wasfah-orange/10 text-wasfah-orange text-xs px-2 py-1 rounded-full">
              Free
            </span>
          </button>
        </div>
        
        {/* Help and Support */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <button 
            className="flex items-center p-4 border-b w-full text-left hover:bg-gray-50"
            onClick={() => handleNavigateToSection('help')}
          >
            <HelpCircle className="text-gray-600 mr-3" size={20} />
            <div className="flex-1">
              <h3 className="font-medium">Help & Support</h3>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          
          <button 
            className="flex items-center p-4 border-b w-full text-left hover:bg-gray-50"
            onClick={() => handleNavigateToSection('terms')}
          >
            <div className="text-gray-600 mr-3
            <div className="flex-1">
              <h3 className="font-medium">Terms of Service</h3>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          
          <button 
            className="flex items-center p-4 w-full text-left hover:bg-gray-50"
            onClick={() => handleNavigateToSection('privacy')}
          >
            <div className="text-gray-</div>
            <div className="flex-1">
              <h3 className="font-medium">Privacy Policy</h3>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center space-x-2 text-red-500 border-red-200 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </Button>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default Profile;
