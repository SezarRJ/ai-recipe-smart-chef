
export const CategoryCards = () => {
  const categories = [
    {
      title: "Food",
      subtitle: "Main Dishes & More",
      subcategories: ["Main Dishes", "Appetizers", "Pickles", "Soups", "Sauces", "Others"],
      gradient: "from-wasfah-orange to-red-500",
      emoji: "🍽️",
      delay: "0s"
    },
    {
      title: "Desserts",
      subtitle: "Sweet Delights",
      subcategories: ["Traditional", "Western", "Pastries", "Ice Cream", "Others"],
      gradient: "from-pink-500 to-wasfah-green",
      emoji: "🍰",
      delay: "0.2s"
    },
    {
      title: "Drinks",
      subtitle: "Refreshing Beverages",
      subcategories: ["Detox", "Cocktails", "Alcoholic", "Hot Drinks", "Others"],
      gradient: "from-blue-500 to-wasfah-green",
      emoji: "🥤",
      delay: "0.4s"
    }
  ];

  return (
    <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Explore <span className="text-gradient">Recipe Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover thousands of recipes organized by category, each powered by AI to match your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover-scale animate-fade-in"
              style={{ animationDelay: category.delay }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative p-8">
                <div className="text-6xl mb-4 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {category.emoji}
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.subtitle}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Subcategories:</p>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((sub) => (
                      <span
                        key={sub}
                        className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="w-full bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Explore {category.title}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
