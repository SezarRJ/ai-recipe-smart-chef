
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, Zap, Heart, Camera, BookOpen, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNativeFeatures } from "@/hooks/useNativeFeatures";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { hapticFeedback, shareContent } = useNativeFeatures();

  const handleGetStarted = async () => {
    await hapticFeedback('medium');
    navigate('/explore');
  };

  const handleWatchDemo = async () => {
    await hapticFeedback('light');
    await shareContent(
      "Wasfah AI - Smart Recipe Discovery",
      "Transform your cooking with AI-powered recipe suggestions and smart meal planning!",
      window.location.origin
    );
  };

  return (
    <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-wasfah-orange/20 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-wasfah-green/20 to-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-wasfah-gold/10 to-yellow-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating food elements with better positioning */}
      <div className="absolute top-24 left-16 text-5xl animate-bounce opacity-30" style={{ animationDelay: '0s', animationDuration: '3s' }}>🍳</div>
      <div className="absolute top-32 right-20 text-4xl animate-bounce opacity-30" style={{ animationDelay: '1s', animationDuration: '4s' }}>🥘</div>
      <div className="absolute bottom-32 left-24 text-3xl animate-bounce opacity-30" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>🧄</div>
      <div className="absolute bottom-48 right-16 text-4xl animate-bounce opacity-30" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>🥗</div>
      <div className="absolute top-48 left-1/2 text-2xl animate-bounce opacity-30" style={{ animationDelay: '1.5s', animationDuration: '3s' }}>🍅</div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced badge with animation */}
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full px-8 py-3 mb-10 border border-wasfah-orange/30 animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300">
            <Sparkles className="w-5 h-5 text-wasfah-orange animate-pulse" />
            <span className="text-sm font-semibold text-gray-800">AI-Powered Recipe Discovery Platform</span>
            <div className="w-3 h-3 bg-gradient-to-r from-wasfah-green to-emerald-500 rounded-full animate-pulse"></div>
          </div>

          {/* Enhanced main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 animate-fade-in leading-tight">
            Cook Smarter with{" "}
            <span className="relative inline-block">
              <span className="text-gradient bg-gradient-to-r from-wasfah-orange via-red-500 to-wasfah-green bg-clip-text text-transparent">
                AI-Powered
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-wasfah-orange/20 via-red-500/20 to-wasfah-green/20 rounded-2xl blur-xl -z-10 animate-pulse"></div>
            </span>{" "}
            Recipe Discovery
          </h1>
          
          {/* Enhanced description */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-12 max-w-5xl mx-auto animate-fade-in leading-relaxed font-medium" style={{ animationDelay: '0.2s' }}>
            Transform your ingredients into <span className="font-bold text-wasfah-orange">delicious meals</span> with intelligent recipe suggestions, 
            personalized meal planning, and smart pantry management.
          </p>

          {/* Enhanced action buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="group bg-gradient-to-r from-wasfah-orange via-red-500 to-wasfah-green hover:from-wasfah-orange-dark hover:to-wasfah-green-dark text-white text-xl font-bold px-12 py-8 rounded-2xl shadow-2xl hover:shadow-wasfah-orange/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Zap className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Start Cooking with AI
              <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleWatchDemo}
              className="group border-3 border-wasfah-orange text-wasfah-orange hover:bg-wasfah-orange hover:text-white text-xl font-bold px-12 py-8 rounded-2xl backdrop-blur-sm bg-white/60 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Heart className="w-6 h-6 mr-3 group-hover:text-red-400 transition-colors" />
              Share & Demo
            </Button>
          </div>

          {/* Enhanced feature showcase with better images */}
          <div className="relative mx-auto max-w-7xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-16 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="group text-center animate-float cursor-pointer transform hover:scale-105 transition-all duration-300">
                  <div className="relative w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-wasfah-orange via-red-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-white text-4xl">🤖</span>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-wasfah-gold to-yellow-400 rounded-full border-3 border-white animate-pulse">
                      <Sparkles className="w-3 h-3 text-white m-1" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4 text-gray-800 group-hover:text-wasfah-orange transition-colors">AI Recipe Discovery</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">Find perfect recipes based on your ingredients and preferences with advanced AI algorithms and machine learning</p>
                </div>
                
                <div className="group text-center animate-float cursor-pointer transform hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.5s' }}>
                  <div className="relative w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-wasfah-green via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                    <Calendar className="text-white text-3xl" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-wasfah-gold to-yellow-400 rounded-full border-3 border-white animate-pulse">
                      <BookOpen className="w-3 h-3 text-white m-1" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4 text-gray-800 group-hover:text-wasfah-green transition-colors">Smart Meal Planning</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">Plan your meals with intelligent suggestions and comprehensive nutrition tracking for healthier living</p>
                </div>
                
                <div className="group text-center animate-float cursor-pointer transform hover:scale-105 transition-all duration-300" style={{ animationDelay: '1s' }}>
                  <div className="relative w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-500 via-indigo-500 to-wasfah-orange rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                    <Camera className="text-white text-3xl" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-wasfah-gold to-yellow-400 rounded-full border-3 border-white animate-pulse">
                      <Users className="w-3 h-3 text-white m-1" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4 text-gray-800 group-hover:text-purple-600 transition-colors">Smart Pantry & Scanner</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">Track your ingredients, scan dishes for recipes, and reduce food waste with intelligent inventory management</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced trust indicators */}
          <div className="mt-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-lg text-gray-600 mb-8 font-semibold">Trusted by home cooks worldwide</p>
            <div className="flex flex-wrap justify-center items-center space-x-12 opacity-80">
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-wasfah-gold text-xl">⭐</span>
                ))}
                <span className="ml-3 text-lg font-bold text-gray-800">4.9/5</span>
              </div>
              <div className="text-lg font-semibold text-gray-700 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">10K+ Active Users</div>
              <div className="text-lg font-semibold text-gray-700 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">50K+ Recipes</div>
              <div className="text-lg font-semibold text-gray-700 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">AI-Powered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
