
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useLanguage();

  const pages = [
    {
      title: "Welcome to Wasfah AI",
      subtitle: "Your AI-Powered Cooking Companion",
      description: "Discover thousands of recipes, plan your meals, and cook like a chef with our intelligent assistance.",
      image: "🍽️",
      gradient: "from-wasfah-orange to-red-500"
    },
    {
      title: "Smart Recipe Search",
      subtitle: "Find Perfect Recipes",
      description: "Search by ingredients you have, dietary preferences, or cooking time. Our AI finds the perfect match for you.",
      image: "🔍",
      gradient: "from-blue-500 to-wasfah-green"
    },
    {
      title: "Meal Planning Made Easy",
      subtitle: "Plan Your Week",
      description: "Organize your meals for the week, generate smart shopping lists, and never worry about what to cook again.",
      image: "📅",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Global Cuisine Explorer",
      subtitle: "Taste the World",
      description: "Explore authentic recipes from around the globe. From Italian pasta to Thai curry, discover new flavors.",
      image: "🌍",
      gradient: "from-green-500 to-wasfah-orange"
    }
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const skipToEnd = () => {
    onComplete();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${pages[currentPage].gradient} p-8 text-white shadow-2xl`}>
          <div className="text-center space-y-6">
            <div className="text-8xl mb-6 animate-float">
              {pages[currentPage].image}
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-display font-bold">
                {pages[currentPage].title}
              </h1>
              <h2 className="text-xl font-semibold opacity-90">
                {pages[currentPage].subtitle}
              </h2>
              <p className="text-white/80 leading-relaxed">
                {pages[currentPage].description}
              </p>
            </div>

            {/* Page Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentPage ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="ghost"
                onClick={previousPage}
                disabled={currentPage === 0}
                className="text-white hover:bg-white/20 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
                Back
              </Button>

              <Button
                variant="ghost"
                onClick={skipToEnd}
                className="text-white hover:bg-white/20"
              >
                Skip
              </Button>

              <Button
                variant="ghost"
                onClick={nextPage}
                className="text-white hover:bg-white/20"
              >
                {currentPage === pages.length - 1 ? 'Get Started' : 'Next'}
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
