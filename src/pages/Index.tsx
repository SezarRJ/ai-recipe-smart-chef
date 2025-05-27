
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

const Index = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-wasfah-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-wasfah-green/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-wasfah-gold/5 rounded-full blur-3xl"></div>
      </div>
      
      {isMobile ? <MobileHeader title="Home" /> : <Navigation />}
      <HeroSection />
      <CategoryCards />
      <FeaturesSection />
      <TechnologySection />
      <DownloadSection />
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Index;
