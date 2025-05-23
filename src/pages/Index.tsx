
import { HeroSection } from "@/components/HeroSection";
import { Navigation } from "@/components/Navigation";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CategoryCards } from "@/components/CategoryCards";
import { TechnologySection } from "@/components/TechnologySection";
import { DownloadSection } from "@/components/DownloadSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50">
      <Navigation />
      <HeroSection />
      <CategoryCards />
      <FeaturesSection />
      <TechnologySection />
      <DownloadSection />
      <Footer />
    </div>
  );
};

export default Index;
