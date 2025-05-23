
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-2xl font-display font-bold">Wasfah AI</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transform your cooking experience with AI-powered recipe discovery, 
              intelligent meal planning, and smart pantry management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-wasfah-orange transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-wasfah-orange transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-wasfah-orange transition-colors">About</a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Features</h3>
            <div className="space-y-2 text-gray-300">
              <a href="#" className="block hover:text-wasfah-orange transition-colors">AI Recipe Discovery</a>
              <a href="#" className="block hover:text-wasfah-orange transition-colors">Meal Planning</a>
              <a href="#" className="block hover:text-wasfah-orange transition-colors">Smart Pantry</a>
              <a href="#" className="block hover:text-wasfah-orange transition-colors">Nutrition Tracking</a>
              <a href="#" className="block hover:text-wasfah-orange transition-colors">Dish Scanner</a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Support</h3>
            <div className="space-y-2 text-gray-300">
              <a href="#" className="block hover:text-wasfah-orange transition-colors">Help Center</a>
              <a href="#" className="block hover:text-wasfah-orange transition-colors">Contact Us</a>
              <a href="#" className="block hover:text-wasfah-orange transition-colors">Community</a>
              <a href="#" className="block hover:text-wasfah-orange transition-colors">Feedback</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Wasfah AI. All rights reserved. Made with ❤️ for food lovers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};
