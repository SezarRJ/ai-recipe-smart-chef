
import { Button } from "@/components/ui/button";

export const DownloadSection = () => {
  return (
    <section id="download" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-wasfah-orange/10 to-wasfah-green/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Start Your <span className="text-gradient">Culinary Journey</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Download Wasfah AI now and transform the way you cook with intelligent recipe discovery, 
            meal planning, and pantry management.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-xl text-lg flex items-center space-x-3">
              <span>📱</span>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
            </Button>
            
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-xl text-lg flex items-center space-x-3">
              <span>🤖</span>
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center animate-fade-in">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-display font-semibold text-lg mb-2">Personalized</h3>
              <p className="text-gray-600">AI learns your taste preferences</p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-display font-semibold text-lg mb-2">Global Cuisine</h3>
              <p className="text-gray-600">Recipes from around the world</p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-3xl mb-2">💡</div>
              <h3 className="font-display font-semibold text-lg mb-2">Smart Features</h3>
              <p className="text-gray-600">Advanced AI-powered tools</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-2xl font-display font-bold mb-4">Premium Features Available</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              <div className="flex items-center space-x-3">
                <span className="text-wasfah-green">✓</span>
                <span>Advanced nutrition tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-wasfah-green">✓</span>
                <span>Unlimited meal planning</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-wasfah-green">✓</span>
                <span>Premium recipe collection</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-wasfah-green">✓</span>
                <span>Priority AI support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
