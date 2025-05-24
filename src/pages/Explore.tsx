
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { CategoryCards } from "@/components/CategoryCards";
import { RecipeSearch } from "@/components/RecipeSearch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Grid3X3 } from "lucide-react";

const Explore = () => {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<'search' | 'categories'>('search');

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            {t("nav.explore")}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Discover recipes for any occasion
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6 max-w-xs">
          <Button
            variant={activeView === 'search' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('search')}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
          </Button>
          <Button
            variant={activeView === 'categories' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('categories')}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Grid3X3 size={16} />
            <span className="hidden sm:inline">Categories</span>
          </Button>
        </div>

        {/* Content */}
        {activeView === 'search' ? (
          <RecipeSearch />
        ) : (
          <CategoryCards />
        )}
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default Explore;
