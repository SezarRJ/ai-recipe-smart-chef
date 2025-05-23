
export const TechnologySection = () => {
  return (
    <section id="technology" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Advanced <span className="text-gradient">AI Technology</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge artificial intelligence to understand your cooking needs and provide personalized culinary experiences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg animate-fade-in">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">Machine Learning</h3>
                    <p className="text-gray-600">Advanced algorithms learn your preferences and improve recommendations with every interaction</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-wasfah-green to-wasfah-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">👁️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">Computer Vision</h3>
                    <p className="text-gray-600">Recognize ingredients and dishes through image scanning with high accuracy</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">Natural Language Processing</h3>
                    <p className="text-gray-600">Understand complex cooking queries and provide intelligent responses in multiple languages</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="bg-gradient-to-br from-wasfah-orange/20 to-wasfah-green/20 rounded-3xl p-8 glass-effect">
                <div className="text-center space-y-6">
                  <div className="text-6xl animate-float">🧠</div>
                  <h3 className="text-2xl font-display font-bold">Smart Recipe Engine</h3>
                  <p className="text-gray-600 mb-6">
                    Our AI processes thousands of recipes, nutritional data, and user preferences to deliver 
                    the perfect cooking experience tailored just for you.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-wasfah-orange">50K+</div>
                      <div className="text-sm text-gray-600">Recipes Analyzed</div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-wasfah-green">99%</div>
                      <div className="text-sm text-gray-600">Accuracy Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
