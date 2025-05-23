
import { useState } from "react";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, MapPin, Clock, Users, Star, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AdvancedFilters } from "@/components/AdvancedFilters";

const GlobalCuisine = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const cuisineCountries = [
    { code: "all", name: "All Countries", flag: "🌍" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "cn", name: "Chinese", flag: "🇨🇳" },
    { code: "mx", name: "Mexican", flag: "🇲🇽" },
    { code: "in", name: "Indian", flag: "🇮🇳" },
    { code: "jp", name: "Japanese", flag: "🇯🇵" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "th", name: "Thai", flag: "🇹🇭" },
    { code: "gr", name: "Greek", flag: "🇬🇷" },
    { code: "tr", name: "Turkish", flag: "🇹🇷" },
    { code: "ma", name: "Moroccan", flag: "🇲🇦" },
    { code: "lb", name: "Lebanese", flag: "🇱🇧" },
    { code: "kr", name: "Korean", flag: "🇰🇷" },
    { code: "br", name: "Brazilian", flag: "🇧🇷" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "us", name: "American", flag: "🇺🇸" }
  ];

  const foodCategories = [
    { code: "all", name: "All Categories", icon: "🍽️" },
    { code: "main", name: "Main Dishes", icon: "🍖" },
    { code: "appetizers", name: "Appetizers", icon: "🥗" },
    { code: "pickles", name: "Pickles", icon: "🥒" },
    { code: "soups", name: "Soups", icon: "🍲" },
    { code: "sauces", name: "Sauces", icon: "🥫" },
    { code: "desserts", name: "Desserts", icon: "🍰" },
    { code: "drinks", name: "Drinks", icon: "🥤" }
  ];

  // Sample recipes data
  const sampleRecipes = [
    {
      id: "1",
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta with eggs, cheese, and pancetta",
      image: "/placeholder.svg",
      cookingTime: 30,
      servings: 4,
      difficulty: "Medium",
      cuisine: "Italian",
      rating: 4.8,
      country: "it",
      category: "main"
    },
    {
      id: "2",
      title: "Kung Pao Chicken",
      description: "Spicy Chinese stir-fry with peanuts and vegetables",
      image: "/placeholder.svg",
      cookingTime: 25,
      servings: 3,
      difficulty: "Medium",
      cuisine: "Chinese",
      rating: 4.6,
      country: "cn",
      category: "main"
    },
    {
      id: "3",
      title: "Tacos al Pastor",
      description: "Traditional Mexican tacos with marinated pork",
      image: "/placeholder.svg",
      cookingTime: 45,
      servings: 6,
      difficulty: "Hard",
      cuisine: "Mexican",
      rating: 4.9,
      country: "mx",
      category: "main"
    }
  ];

  const filteredRecipes = sampleRecipes.filter(recipe => {
    const matchesCountry = selectedCountry === "all" || recipe.country === selectedCountry;
    const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesCategory && matchesSearch;
  });

  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2 flex items-center gap-2">
              <MapPin className="text-wasfah-orange" size={28} />
              Global Cuisine
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Discover authentic recipes from around the world
            </p>
          </div>
        </div>

        {/* Search Bar with Filter Button */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search recipes or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-wasfah-orange"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4"
          >
            <Filter size={18} />
            Filters
          </Button>
        </div>

        {/* Food Categories Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {foodCategories.map((category) => (
              <Button
                key={category.code}
                variant={selectedCategory === category.code ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.code)}
                className="flex items-center gap-2"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Country Filter Chips */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Filter by Country</h3>
          <div className="flex flex-wrap gap-2">
            {cuisineCountries.map((country) => (
              <Button
                key={country.code}
                variant={selectedCountry === country.code ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCountry(country.code)}
                className="flex items-center gap-2"
              >
                <span className="text-lg">{country.flag}</span>
                <span className="hidden sm:inline">{country.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
            {selectedCountry !== "all" && (
              <span className="ml-2">
                from {cuisineCountries.find(c => c.code === selectedCountry)?.name}
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="ml-2">
                in {foodCategories.find(c => c.code === selectedCategory)?.name}
              </span>
            )}
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-200">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white text-gray-800">
                    {cuisineCountries.find(c => c.code === recipe.country)?.flag}
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  {recipe.rating}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{recipe.title}</CardTitle>
                <p className="text-sm text-gray-600">{recipe.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {recipe.cookingTime} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    {recipe.servings} servings
                  </div>
                  <Badge variant="secondary">{recipe.difficulty}</Badge>
                </div>
                <Button className="w-full bg-gradient-to-r from-wasfah-orange to-wasfah-green">
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFilters 
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onFiltersChange={handleFiltersChange}
      />

      <MobileNavigation />
    </div>
  );
};

export default GlobalCuisine;
