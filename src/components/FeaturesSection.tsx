
export const FeaturesSection = () => {
  const features = [
    {
      icon: "🔍",
      title: "Ingredient-Based Search",
      description: "Input ingredients you have and get AI-powered recipe suggestions that minimize waste"
    },
    {
      icon: "🥗",
      title: "Dietary Preferences",
      description: "Respect your dietary restrictions, allergies, and cuisine preferences automatically"
    },
    {
      icon: "🎯",
      title: "Health Goal Alignment",
      description: "Get recipes aligned with your health goals like low-carb, high-protein, or weight loss"
    },
    {
      icon: "🕒",
      title: "Meal Type Suggestions",
      description: "Find perfect recipes for breakfast, lunch, dinner, or special occasions"
    },
    {
      icon: "🧠",
      title: "Learning AI",
      description: "AI learns from your interactions to provide better recommendations over time"
    },
    {
      icon: "💬",
      title: "Natural Language",
      description: "Search using natural language: 'Show me quick vegetarian recipes with chicken and broccoli'"
    },
    {
      icon: "📱",
      title: "Smart Pantry",
      description: "Digital inventory management to track ingredients and reduce food waste"
    },
    {
      icon: "📅",
      title: "Meal Planning",
      description: "Plan meals in advance for days or weeks with intelligent nutrition balancing"
    },
    {
      icon: "📸",
      title: "Dish Scanner",
      description: "Scan any dish to get ingredients, nutrition info, and cooking instructions"
    }
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Powerful <span className="text-gradient">AI Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of cooking with advanced AI capabilities designed to make meal preparation effortless and enjoyable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4 group-hover:animate-float">{feature.icon}</div>
              <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
