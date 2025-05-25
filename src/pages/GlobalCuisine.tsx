
import { useState } from "react";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Users, Star, Search, Filter, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GlobalCuisine = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState<string>("");
  const [cookingTimeFilter, setCookingTimeFilter] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");

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
    { code: "sy", name: "Syrian", flag: "🇸🇾" },
    { code: "iq", name: "Iraqi", flag: "🇮🇶" },
    { code: "ye", name: "Yemeni", flag: "🇾🇪" },
    { code: "kr", name: "Korean", flag: "🇰🇷" },
    { code: "br", name: "Brazilian", flag: "🇧🇷" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "us", name: "American", flag: "🇺🇸" },
    { code: "de", name: "German", flag: "🇩🇪" }
  ];

  const foodCategories = [
    { 
      code: "all", 
      name: "All Categories", 
      icon: "🍽️", 
      subcategories: [] 
    },
    { 
      code: "food", 
      name: "Food", 
      icon: "🍖", 
      subcategories: ["Main Dishes", "Appetizers", "Pickles", "Soups", "Sauces", "Others"]
    },
    { 
      code: "desserts", 
      name: "Desserts", 
      icon: "🍰", 
      subcategories: ["Traditional", "Western", "Pastries", "Ice Cream", "Others"]
    },
    { 
      code: "drinks", 
      name: "Drinks", 
      icon: "🥤", 
      subcategories: ["Detox", "Cocktails", "Alcoholic", "Hot Drinks", "Others"]
    }
  ];

  const getSubcategories = () => {
    const category = foodCategories.find(cat => cat.code === selectedCategory);
    return category?.subcategories || [];
  };

  const handleSearch = () => {
    console.log('Searching with filters:', { 
      selectedCountry, 
      selectedCategory, 
      selectedSubcategory,
      dietaryFilter,
      cookingTimeFilter,
      difficultyFilter
    });
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

        {/* Countries Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Select Country</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {cuisineCountries.map((country) => (
              <Button
                key={country.code}
                variant={selectedCountry === country.code ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCountry(country.code)}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="text-xs text-center leading-tight">{country.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Categories and Subcategories */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Select Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {foodCategories.map((category) => (
              <Card
                key={category.code}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCategory === category.code 
                    ? 'ring-2 ring-wasfah-orange bg-orange-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  setSelectedCategory(category.code);
                  setSelectedSubcategory("all");
                }}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h4 className="font-semibold mb-1">{category.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subcategories */}
          {selectedCategory !== "all" && getSubcategories().length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Select Subcategory</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedSubcategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubcategory("all")}
                >
                  All
                </Button>
                {getSubcategories().map((sub) => (
                  <Button
                    key={sub}
                    variant={selectedSubcategory === sub ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSubcategory(sub)}
                  >
                    {sub}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Advanced Filters */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 mb-4"
          >
            <Filter size={16} />
            Advanced Filters
          </Button>

          {showFilters && (
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Dietary Preferences</label>
                    <Select value={dietaryFilter} onValueChange={setDietaryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select dietary type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                        <SelectItem value="keto">Keto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Cooking Time</label>
                    <Select value={cookingTimeFilter} onValueChange={setCookingTimeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cooking time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-30">Under 30 mins</SelectItem>
                        <SelectItem value="30-60">30-60 mins</SelectItem>
                        <SelectItem value="over-60">Over 1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty</label>
                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Search Button */}
        <div className="mb-6 text-center">
          <Button 
            onClick={handleSearch}
            className="bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto"
          >
            <Search size={20} />
            Search Recipes
          </Button>
        </div>

        {/* Placeholder Results */}
        <div className="text-center py-12">
          <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2">Search for recipes</h3>
          <p className="text-gray-600">Use the filters above and click search to find recipes</p>
        </div>
      </div>

      <MobileNavigation />
    </div>
  );
};

export default GlobalCuisine;
