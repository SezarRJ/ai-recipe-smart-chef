
import { ArrowRight, Sparkles } from "lucide-react";

export const CategoryCards = () => {
  const categories = [
    {
      title: "Food",
      subtitle: "Main Dishes & More",
      subcategories: ["Main Dishes", "Appetizers", "Pickles", "Soups", "Sauces", "Others"],
      gradient: "from-wasfah-orange via-red-500 to-pink-500",
      emoji: "🍽️",
      delay: "0s",
      link: "/global-cuisine",
      bgPattern: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]"
    },
    {
      title: "Desserts",
      subtitle: "Sweet Delights",
      subcategories: ["Traditional", "Western", "Pastries", "Ice Cream", "Others"],
      gradient: "from-pink-500 via-purple-500 to-wasfah-green",
      emoji: "🍰",
      delay: "0.2s",
      link: "/explore",
      bgPattern: "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]"
    },
    {
      title: "Drinks",
      subtitle: "Refreshing Beverages",
      subcategories: ["Detox", "Cocktails", "Alcoholic", "Hot Drinks", "Others"],
      gradient: "from-blue-500 via-cyan-500 to-wasfah-green",
      emoji: "🥤",
      delay: "0.4s",
      link: "/explore",
      bgPattern: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]"
    }
  ];

  return (
    <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-wasfah-orange/10 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-wasfah-orange" />
            <span className="text-sm font-medium text-wasfah-orange">Explore Categories</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gray-800">
            Discover <span className="text-gradient">Recipe Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of recipes organized by category, each powered by AI to match your unique preferences and dietary needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in cursor-pointer"
              style={{ animationDelay: category.delay }}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 ${category.bgPattern} ${category.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />
              
              {/* Card content */}
              <div className="relative p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-6xl animate-float group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${index * 0.5}s` }}>
                    {category.emoji}
                  </div>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-2 text-gray-800 group-hover:text-gray-900">{category.title}</h3>
                <p className="text-gray-600 mb-6 group-hover:text-gray-700">{category.subtitle}</p>
                
                <div className="flex-grow">
                  <p className="text-sm font-semibold text-gray-700 mb-4">Popular Subcategories:</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.subcategories.slice(0, 4).map((sub) => (
                      <span
                        key={sub}
                        className="text-xs px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors cursor-pointer border border-gray-200 hover:border-gray-300"
                      >
                        {sub}
                      </span>
                    ))}
                    {category.subcategories.length > 4 && (
                      <span className="text-xs px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full text-gray-500 border border-gray-200">
                        +{category.subcategories.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-auto">
                  <a href={category.link} className="block">
                    <button className={`group/btn w-full bg-gradient-to-r ${category.gradient} text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105`}>
                      Explore {category.title}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-1">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">📱</div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Dish Scanner</h3>
                <p className="text-gray-600">Scan any dish to get ingredients, nutrition info, and step-by-step cooking instructions</p>
              </div>
            </div>
            <a href="/dish-scanner">
              <button className="w-full bg-gradient-to-r from-wasfah-orange to-red-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                Try Scanner
                <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-1">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">🌍</div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Global Cuisine</h3>
                <p className="text-gray-600">Explore authentic recipes from different cultures and countries around the world</p>
              </div>
            </div>
            <a href="/global-cuisine">
              <button className="w-full bg-gradient-to-r from-wasfah-green to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                Explore World
                <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
