import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  ChevronRight, 
  Globe, 
  Bell, 
  Volume2, 
  User, 
  Lock, 
  Shield, 
  Database, 
  CreditCard, 
  Trash2, 
  Info, 
  FileText, 
  LogOut,
  Moon, // Added for Dark Mode
  Fingerprint, // Added for Biometric Authentication
  Palette // Added for Theme Customization
} from "lucide-react";

const Settings = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    notifications: true,
    sounds: true,
    darkMode: false,
    autoSync: true,
    biometricAuth: false, // New setting for biometric authentication
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    // Future implementation for dark mode:
    if (key === 'darkMode') {
      document.documentElement.classList.toggle('dark', !settings.darkMode);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const settingSections = [
    {
      title: "App Preferences",
      items: [
        {
          icon: Globe,
          label: "Language",
          value: language.toUpperCase(),
          onClick: () => navigate("/language-settings"),
          hasArrow: true
        },
        {
          icon: Bell,
          label: "Push Notifications",
          hasSwitch: true,
          value: settings.notifications,
          onToggle: () => toggleSetting("notifications")
        },
        {
          icon: Volume2,
          label: "App Sounds",
          hasSwitch: true,
          value: settings.sounds,
          onToggle: () => toggleSetting("sounds")
        },
        {
          icon: Moon, // Dark Mode Toggle
          label: "Dark Mode",
          hasSwitch: true,
          value: settings.darkMode,
          onToggle: () => toggleSetting("darkMode")
        },
        {
          icon: Palette, // Theme Customization
          label: "Theme Customization",
          onClick: () => navigate("/theme-customization"),
          hasArrow: true
        }
      ]
    },
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile Settings",
          onClick: () => navigate("/profile"),
          hasArrow: true
        },
        {
          icon: Lock,
          label: "Change Password",
          onClick: () => navigate("/change-password"),
          hasArrow: true
        },
        {
          icon: Shield,
          label: "Privacy Settings",
          onClick: () => navigate("/privacy-settings"),
          hasArrow: true
        },
        {
          icon: Database,
          label: "Account Backup & Sync", // Updated label
          hasSwitch: true, // Added switch for sync
          value: settings.autoSync,
          onToggle: () => toggleSetting("autoSync"),
        },
        {
          icon: Fingerprint, // Biometric Authentication Toggle
          label: "Biometric Authentication",
          hasSwitch: true,
          value: settings.biometricAuth,
          onToggle: () => toggleSetting("biometricAuth")
        },
        {
          icon: CreditCard,
          label: "Payment Methods",
          onClick: () => navigate("/payment-methods"),
          hasArrow: true
        }
      ]
    },
    {
      title: "Support & Legal",
      items: [
        {
          icon: Info,
          label: "About Wasfah AI",
          onClick: () => navigate("/about"),
          hasArrow: true
        },
        {
          icon: FileText,
          label: "Terms of Service",
          onClick: () => navigate("/terms-of-service"),
          hasArrow: true
        },
        {
          icon: FileText,
          label: "Privacy Policy",
          onClick: () => navigate("/privacy-policy"),
          hasArrow: true
        }
      ]
    },
    {
      title: "Danger Zone",
      items: [
        {
          icon: Trash2,
          label: "Delete Account",
          onClick: () => navigate("/delete-account"),
          hasArrow: true,
          dangerous: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Settings
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Customize your app experience
          </p>
        </div>

        <div className="space-y-6">
          {settingSections.map((section, sectionIndex) => (
            <Card key={sectionIndex}>
              <CardHeader>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      item.onClick ? 'hover:bg-gray-50' : ''
                    }`}
                    onClick={item.onClick}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon 
                        size={20} 
                        className={item.dangerous ? 'text-red-500' : 'text-gray-600'} 
                      />
                      <span className={item.dangerous ? 'text-red-500' : 'text-gray-900'}>
                        {item.label}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {item.hasSwitch && (
                        <Switch
                          checked={item.value}
                          onCheckedChange={item.onToggle}
                        />
                      )}
                      {item.value && !item.hasSwitch && (
                        <span className="text-gray-500 text-sm">{item.value}</span>
                      )}
                      {item.hasArrow && (
                        <ChevronRight size={16} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sign Out Button */}
        <Card className="mt-6">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start p-4 h-auto text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut size={20} className="mr-3" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Wasfah AI</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default Settings;
