
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { RecipeSearch } from "@/components/RecipeSearch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Grid3X3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CategoryExplorer } from "@/components/CategoryExplorer";

const Explore = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'search' | 'categories'>('categories');

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
              {t("nav.explore")}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Discover recipes for any occasion
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={activeView === 'categories' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('categories')}
              className="flex items-center gap-2"
            >
              <Grid3X3 size={16} />
              <span className="hidden sm:inline">Categories</span>
            </Button>
            <Button
              variant={activeView === 'search' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('search')}
              className="flex items-center gap-2"
            >
              <Search size={16} />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeView === 'categories' ? (
          <CategoryExplorer />
        ) : (
          <RecipeSearch />
        )}
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default Explore;
