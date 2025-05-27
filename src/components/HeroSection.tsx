
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, Zap, Heart } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating elements */}
      <div className="absolute top-20 left-10 text-4xl animate-float opacity-20">🍕</div>
      <div className="absolute top-40 right-20 text-3xl animate-float opacity-20" style={{ animationDelay: '1s' }}>🥗</div>
      <div className="absolute bottom-40 left-20 text-2xl animate-float opacity-20" style={{ animationDelay: '2s' }}>🍰</div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-wasfah-orange/20 animate-fade-in">
            <Sparkles className="w-4 h-4 text-wasfah-orange" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Recipe Discovery</span>
            <div className="w-2 h-2 bg-wasfah-green rounded-full animate-pulse"></div>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 animate-fade-in leading-tight">
            Cook Smarter with{" "}
            <span className="relative">
              <span className="text-gradient">AI-Powered</span>
              <div className="absolute -inset-1 bg-gradient-to-r from-wasfah-orange/20 to-wasfah-green/20 rounded-lg blur-lg -z-10"></div>
            </span>{" "}
            Recipe Discovery
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Transform your ingredients into <span className="font-semibold text-wasfah-orange">delicious meals</span> with intelligent recipe suggestions, 
            personalized meal planning, and smart pantry management.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-wasfah-orange to-wasfah-green hover:from-wasfah-orange-dark hover:to-wasfah-green-dark text-white text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-wasfah-orange/25 transition-all duration-300 transform hover:scale-105"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Start Cooking with AI
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="group border-2 border-wasfah-orange text-wasfah-orange hover:bg-wasfah-orange hover:text-white text-lg px-10 py-6 rounded-2xl backdrop-blur-sm bg-white/50 hover:shadow-lg transition-all duration-300"
            >
              <Heart className="w-5 h-5 mr-2 group-hover:text-red-400 transition-colors" />
              Watch Demo
            </Button>
          </div>

          {/* Enhanced feature showcase */}
          <div className="relative mx-auto max-w-6xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group text-center animate-float cursor-pointer">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-wasfah-orange to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-white text-3xl">🤖</span>
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-gray-800">AI Recipe Discovery</h3>
                  <p className="text-gray-600 leading-relaxed">Find perfect recipes based on your ingredients and preferences with advanced AI algorithms</p>
                </div>
                
                <div className="group text-center animate-float cursor-pointer" style={{ animationDelay: '0.5s' }}>
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-wasfah-green to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-white text-3xl">📱</span>
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-gray-800">Smart Meal Planning</h3>
                  <p className="text-gray-600 leading-relaxed">Plan your meals with intelligent suggestions and comprehensive nutrition tracking</p>
                </div>
                
                <div className="group text-center animate-float cursor-pointer" style={{ animationDelay: '1s' }}>
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-wasfah-orange rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-white text-3xl">🥗</span>
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-gray-800">Pantry Management</h3>
                  <p className="text-gray-600 leading-relaxed">Track your ingredients and reduce food waste with smart inventory management</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-sm text-gray-500 mb-6">Trusted by home cooks worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-wasfah-gold text-lg">⭐</span>
                ))}
                <span className="ml-2 text-sm font-medium">4.9/5</span>
              </div>
              <div className="text-sm text-gray-600">10K+ Active Users</div>
              <div className="text-sm text-gray-600">50K+ Recipes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
