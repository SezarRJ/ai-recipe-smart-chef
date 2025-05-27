
import { HeroSection } from "@/components/HeroSection";
import { Navigation } from "@/components/Navigation";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CategoryCards } from "@/components/CategoryCards";
import { TechnologySection } from "@/components/TechnologySection";
import { DownloadSection } from "@/components/DownloadSection";
import { Footer } from "@/components/Footer";
import { MobileNavigation } from "@/components/MobileNavigation";
import { MobileHeader } from "@/components/MobileHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNativeFeatures } from "@/hooks/useNativeFeatures";
import { useEffect } from "react";

const Index = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const { scheduleNotification, hapticFeedback } = useNativeFeatures();
  
  useEffect(() => {
    // Welcome notification and haptic feedback
    const welcomeUser = async () => {
      await hapticFeedback('light');
      await scheduleNotification(
        "Welcome to Wasfah AI! 🍳",
        "Start discovering amazing recipes with AI-powered suggestions!",
        2000
      );
    };

    welcomeUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-wasfah-orange/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-wasfah-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-wasfah-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-300/20 to-purple-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-teal-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {isMobile ? <MobileHeader title="Home" /> : <Navigation />}
      <HeroSection />
      <CategoryCards />
      <FeaturesSection />
      <TechnologySection />
      <DownloadSection />
      <Footer language={language} />
      <MobileNavigation />
    </div>
  );
};

export default Index;
