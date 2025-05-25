
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Globe, Check } from "lucide-react";

const LanguageSettings = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleSave = () => {
    setLanguage(selectedLanguage);
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/settings")}
            className="p-2"
          >
            <ChevronLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
              Language Settings
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Choose your preferred language
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="text-wasfah-orange" size={20} />
              Select Language
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {availableLanguages.map((lang) => (
              <div
                key={lang.code}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedLanguage === lang.code 
                    ? 'bg-wasfah-orange/10 border border-wasfah-orange' 
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
                onClick={() => setSelectedLanguage(lang.code)}
              >
                <div>
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-sm text-gray-500">{lang.name}</div>
                </div>
                {selectedLanguage === lang.code && (
                  <Check size={20} className="text-wasfah-orange" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate("/settings")}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="flex-1 bg-wasfah-orange hover:bg-wasfah-orange/90"
            disabled={selectedLanguage === language}
          >
            Save Changes
          </Button>
        </div>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default LanguageSettings;
