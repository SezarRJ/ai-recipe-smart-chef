
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-2xl font-display font-bold text-gradient">Wasfah AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-wasfah-orange transition-colors">Features</a>
            <a href="#categories" className="text-gray-600 hover:text-wasfah-orange transition-colors">Categories</a>
            <a href="#technology" className="text-gray-600 hover:text-wasfah-orange transition-colors">AI Technology</a>
            <a href="#download" className="text-gray-600 hover:text-wasfah-orange transition-colors">Download</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-wasfah-orange text-wasfah-orange hover:bg-wasfah-orange hover:text-white">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-wasfah-orange to-wasfah-green hover:from-wasfah-orange-dark hover:to-wasfah-green-dark">
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <div className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-wasfah-orange transition-colors">Features</a>
              <a href="#categories" className="text-gray-600 hover:text-wasfah-orange transition-colors">Categories</a>
              <a href="#technology" className="text-gray-600 hover:text-wasfah-orange transition-colors">AI Technology</a>
              <a href="#download" className="text-gray-600 hover:text-wasfah-orange transition-colors">Download</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-wasfah-orange text-wasfah-orange hover:bg-wasfah-orange hover:text-white">
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-wasfah-orange to-wasfah-green hover:from-wasfah-orange-dark hover:to-wasfah-green-dark">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
