
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { CategoryCards } from "@/components/CategoryCards";

const Explore = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20">
      <div className="pt-4 px-4 pb-2">
        <h1 className="text-3xl font-display font-bold">{t("nav.explore")}</h1>
        <p className="text-gray-600">Discover recipes for any occasion</p>
      </div>
      
      <CategoryCards />
      
      <MobileNavigation />
    </div>
  );
};

export default Explore;
