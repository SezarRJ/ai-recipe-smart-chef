
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { RecipeSearch } from "@/components/RecipeSearch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Grid3X3, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AdvancedFilters } from "@/components/AdvancedFilters";

const Explore = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'search' | 'categories'>('search');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    {
      title: t("category.food"),
      subtitle: "Main Dishes & More",
      subcategories: ["Main Dishes", "Appetizers", "Pickles", "Soups", "Sauces", "Others"],
      gradient: "from-wasfah-orange to-red-500",
      emoji: "🍽️",
      delay: "0s",
    },
    {
      title: t("category.desserts"),
      subtitle: "Sweet Delights",
      subcategories: ["Traditional", "Western", "Pastries", "Ice Cream", "Others"],
      gradient: "from-pink-500 to-wasfah-green",
      emoji: "🍰",
      delay: "0.2s",
    },
    {
      title: t("category.drinks"),
      subtitle: "Refreshing Beverages",
      subcategories: ["Detox", "Cocktails", "Alcoholic", "Hot Drinks", "Others"],
      gradient: "from-blue-500 to-wasfah-green",
      emoji: "🥤",
      delay: "0.4s",
    }
  ];

  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
  };

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

        {/* View Toggle with Filter Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={activeView === 'search' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('search')}
              className="flex items-center gap-2"
            >
              <Search size={16} />
              <span className="hidden sm:inline">Search</span>
            </Button>
            <Button
              variant={activeView === 'categories' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('categories')}
              className="flex items-center gap-2"
            >
              <Grid3X3 size={16} />
              <span className="hidden sm:inline">Categories</span>
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
          </Button>
        </div>

        {/* Content */}
        {activeView === 'search' ? (
          <RecipeSearch />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={category.title}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover-scale animate-fade-in cursor-pointer"
                style={{ animationDelay: category.delay }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative p-8">
                  <div className="text-6xl mb-4 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                    {category.emoji}
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.subtitle}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Subcategories:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <button className="w-full bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                      Explore {category.title}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFilters 
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onFiltersChange={handleFiltersChange}
      />
      
      <MobileNavigation />
    </div>
  );
};

export default Explore;
