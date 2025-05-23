
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
            Cook Smarter with{" "}
            <span className="text-gradient">AI-Powered</span> Recipe Discovery
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Transform your ingredients into delicious meals with intelligent recipe suggestions, 
            personalized meal planning, and smart pantry management.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-wasfah-orange to-wasfah-green hover:from-wasfah-orange-dark hover:to-wasfah-green-dark text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all animate-pulse-glow"
            >
              Start Cooking with AI
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-wasfah-orange text-wasfah-orange hover:bg-wasfah-orange hover:text-white text-lg px-8 py-4 rounded-xl"
            >
              Watch Demo
            </Button>
          </div>

          <div className="relative mx-auto max-w-4xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-r from-wasfah-orange/20 to-wasfah-green/20 rounded-3xl p-8 glass-effect">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center animate-float">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">🤖</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">AI Recipe Discovery</h3>
                  <p className="text-gray-600">Find perfect recipes based on your ingredients and preferences</p>
                </div>
                
                <div className="text-center animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-wasfah-green to-wasfah-orange rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">📱</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">Smart Meal Planning</h3>
                  <p className="text-gray-600">Plan your meals with intelligent suggestions and nutrition tracking</p>
                </div>
                
                <div className="text-center animate-float" style={{ animationDelay: '1s' }}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">🥗</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">Pantry Management</h3>
                  <p className="text-gray-600">Track your ingredients and reduce food waste with smart inventory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
