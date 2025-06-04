import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flag, Utensils, Martini, Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { globalCuisineService, Recipe, SearchParams } from '@/services/globalCuisineService';
import { toast } from '@/hooks/use-toast';

const GlobalCuisinePage = () => {
  const navigate = useNavigate();
  const { language, t, isRTL } = useLanguage();
  const [selectedMainCategory, setSelectedMainCategory] = useState('main');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Categories with translations
  const categories = {
    main: {
      en: 'Main Dishes',
      ar: 'الأطباق الرئيسية',
      fr: 'Plats principaux'
    },
    appetizer: {
      en: 'Appetizers',
      ar: 'المقبلات',
      fr: 'Entrées'
    },
    dessert: {
      en: 'Desserts',
      ar: 'الحلويات',
      fr: 'Desserts'
    },
    beverage: {
      en: 'Beverages',
      ar: 'المشروبات',
      fr: 'Boissons'
    },
    soup: {
      en: 'Soups',
      ar: 'الشوربات',
      fr: 'Soupes'
    },
    salad: {
      en: 'Salads',
      ar: 'السلطات',
      fr: 'Salades'
    }
  };

  // Cuisine countries with flags
  const cuisines = [
    { name: 'italian', flag: '🇮🇹', label: { en: 'Italian', ar: 'إيطالي', fr: 'Italien' } },
    { name: 'chinese', flag: '🇨🇳', label: { en: 'Chinese', ar: 'صيني', fr: 'Chinois' } },
    { name: 'mexican', flag: '🇲🇽', label: { en: 'Mexican', ar: 'مكسيكي', fr: 'Mexicain' } },
    { name: 'indian', flag: '🇮🇳', label: { en: 'Indian', ar: 'هندي', fr: 'Indien' } },
    { name: 'japanese', flag: '🇯🇵', label: { en: 'Japanese', ar: 'ياباني', fr: 'Japonais' } },
    { name: 'thai', flag: '🇹🇭', label: { en: 'Thai', ar: 'تايلندي', fr: 'Thaï' } },
    { name: 'french', flag: '🇫🇷', label: { en: 'French', ar: 'فرنسي', fr: 'Français' } },
    { name: 'greek', flag: '🇬🇷', label: { en: 'Greek', ar: 'يوناني', fr: 'Grec' } },
    { name: 'spanish', flag: '🇪🇸', label: { en: 'Spanish', ar: 'إسباني', fr: 'Espagnol' } },
    { name: 'korean', flag: '🇰🇷', label: { en: 'Korean', ar: 'كوري', fr: 'Coréen' } },
    { name: 'turkish', flag: '🇹🇷', label: { en: 'Turkish', ar: 'تركي', fr: 'Turc' } },
    { name: 'lebanese', flag: '🇱🇧', label: { en: 'Lebanese', ar: 'لبناني', fr: 'Libanais' } },
    { name: 'moroccan', flag: '🇲🇦', label: { en: 'Moroccan', ar: 'مغربي', fr: 'Marocain' } },
    { name: 'american', flag: '🇺🇸', label: { en: 'American', ar: 'أمريكي', fr: 'Américain' } }
  ];

  // Dietary options
  const dietaryOptions = [
    { value: 'vegetarian', label: { en: 'Vegetarian', ar: 'نباتي', fr: 'Végétarien' } },
    { value: 'vegan', label: { en: 'Vegan', ar: 'نباتي صرف', fr: 'Végétalien' } },
    { value: 'gluten-free', label: { en: 'Gluten Free', ar: 'خالي من الغلوتين', fr: 'Sans gluten' } },
    { value: 'ketogenic', label: { en: 'Keto', ar: 'كيتو', fr: 'Kéto' } },
    { value: 'paleo', label: { en: 'Paleo', ar: 'باليو', fr: 'Paléo' } },
    { value: 'dairy-free', label: { en: 'Dairy Free', ar: 'خالي من الألبان', fr: 'Sans lactose' } }
  ];

  const getText = (textObj: any, fallback = '') => {
    return textObj?.[language as keyof typeof textObj] || textObj?.en || fallback;
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const searchParams: SearchParams = {
        number: 20,
        offset: 0
      };

      if (selectedCuisine) {
        searchParams.cuisine = selectedCuisine;
      }

      if (selectedDiet) {
        searchParams.diet = selectedDiet;
      }

      if (selectedMainCategory && selectedMainCategory !== 'main') {
        searchParams.type = selectedMainCategory;
      }

      const result = await globalCuisineService.searchRecipes(searchParams);
      setRecipes(result.results || []);

      if (result.results.length === 0) {
        toast({
          title: language === 'ar' ? 'لا توجد نتائج' : 'No Results',
          description: language === 'ar' ? 'لم يتم العثور على وصفات تطابق البحث' : 'No recipes found matching your search criteria',
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'حدث خطأ أثناء البحث' : 'An error occurred while searching',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadRandomRecipes = async () => {
    setIsLoading(true);
    try {
      const result = await globalCuisineService.getRandomRecipes(undefined, 12);
      setRecipes(result.recipes || []);
    } catch (error) {
      console.error('Error loading random recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRandomRecipes();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'main':
        return <Utensils size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />;
      case 'dessert':
        return <span className={`text-lg ${isRTL ? 'ml-2' : 'mr-2'}`}>🍰</span>;
      case 'beverage':
        return <Martini size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />;
      default:
        return <Utensils size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />;
    }
  };

  // Convert API recipes to the format expected by RecipeGrid
  const convertedRecipes = recipes.map(recipe => ({
    id: recipe.id.toString(),
    title: recipe.title,
    description: recipe.summary?.replace(/<[^>]*>/g, '').substring(0, 100) + '...' || '',
    image_url: recipe.image,
    image: recipe.image,
    prep_time: Math.floor(recipe.readyInMinutes / 2),
    prepTime: Math.floor(recipe.readyInMinutes / 2),
    cook_time: Math.ceil(recipe.readyInMinutes / 2),
    cookTime: Math.ceil(recipe.readyInMinutes / 2),
    servings: recipe.servings,
    difficulty: 'Medium' as const,
    calories: recipe.nutrition?.calories || 300,
    cuisine_type: recipe.cuisines?.[0] || '',
    cuisineType: recipe.cuisines?.[0] || '',
    instructions: recipe.instructions?.replace(/<[^>]*>/g, '').split('.').filter(s => s.trim()).map(s => s.trim()) || [],
    categories: recipe.cuisines || [],
    tags: recipe.dishTypes || [],
    status: 'published' as const,
    author_id: 'api',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    rating: 4.5,
    ratingCount: 89,
    isFavorite: false,
    ingredients: recipe.ingredients?.map(ing => ({
      id: `ing-${Math.random()}`,
      name: ing.name,
      amount: ing.amount,
      unit: ing.unit
    })) || [],
    nutritionalInfo: recipe.nutrition ? {
      calories: Number(recipe.nutrition.calories) || 0,
      protein: Number(recipe.nutrition.protein) || 0,
      carbs: Number(recipe.nutrition.carbohydrates) || 0,
      fat: Number(recipe.nutrition.fat) || 0,
      fiber: 0
    } : undefined
  }));

  return (
    <PageContainer
      header={{
        title: language === 'ar' ? 'المأكولات العالمية' : language === 'fr' ? 'Cuisine Mondiale' : 'Global Cuisine',
        showBackButton: true,
        showSearch: true
      }}
    >
      <div className={`space-y-6 pb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Cuisine Selection */}
        <Card className="p-4">
          <div className="flex items-center mb-3">
            <Flag className={`h-5 w-5 text-wasfah-deep-teal ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <h3 className="font-semibold text-wasfah-deep-teal">
              {language === 'ar' ? 'اختر المطبخ' : language === 'fr' ? 'Sélectionner la cuisine' : 'Select Cuisine'}
            </h3>
          </div>
          <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder={language === 'ar' ? 'اختر نوع المطبخ' : language === 'fr' ? 'Sélectionner le type de cuisine' : 'Select cuisine type'} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine.name} value={cuisine.name}>
                  <span className={`${isRTL ? 'ml-2' : 'mr-2'}`}>{cuisine.flag}</span> 
                  {getText(cuisine.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Dietary Preferences */}
        <Card className="p-4">
          <div className="flex items-center mb-3">
            <span className={`text-lg ${isRTL ? 'ml-2' : 'mr-2'}`}>🥗</span>
            <h3 className="font-semibold text-wasfah-deep-teal">
              {language === 'ar' ? 'التفضيلات الغذائية' : language === 'fr' ? 'Préférences alimentaires' : 'Dietary Preferences'}
            </h3>
          </div>
          <Select value={selectedDiet} onValueChange={setSelectedDiet}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder={language === 'ar' ? 'اختر النظام الغذائي' : language === 'fr' ? 'Sélectionner le régime' : 'Select dietary preference'} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {dietaryOptions.map((diet) => (
                <SelectItem key={diet.value} value={diet.value}>
                  {getText(diet.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Main Categories */}
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {Object.entries(categories).map(([key, categoryObj]) => (
              <Button 
                key={key}
                variant={selectedMainCategory === key ? "default" : "outline"}
                className={selectedMainCategory === key ? 
                  "bg-wasfah-bright-teal hover:bg-wasfah-teal" : 
                  "border-wasfah-bright-teal text-wasfah-bright-teal"}
                onClick={() => setSelectedMainCategory(key)}
              >
                {getCategoryIcon(key)}
                {getText(categoryObj)}
              </Button>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <Button 
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4 animate-spin`} />
              {language === 'ar' ? 'جاري البحث...' : language === 'fr' ? 'Recherche...' : 'Searching...'}
            </>
          ) : (
            <>
              <Search className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {language === 'ar' ? 'البحث عن الوصفات' : language === 'fr' ? 'Rechercher des recettes' : 'Search Recipes'}
            </>
          )}
        </Button>

        {/* Recipe Results */}
        <div>
          <h2 className="text-lg font-bold text-wasfah-deep-teal mb-4">
            {hasSearched ? (
              selectedCuisine ? (
                <div className="flex items-center">
                  <span className={`${isRTL ? 'ml-2' : 'mr-2'}`}>
                    {cuisines.find(c => c.name === selectedCuisine)?.flag}
                  </span>
                  {getText(cuisines.find(c => c.name === selectedCuisine)?.label)} {language === 'ar' ? 'وصفات' : language === 'fr' ? 'Recettes' : 'Recipes'}
                </div>
              ) : (
                language === 'ar' ? 'نتائج البحث' : language === 'fr' ? 'Résultats de recherche' : 'Search Results'
              )
            ) : (
              language === 'ar' ? 'وصفات مقترحة لك' : language === 'fr' ? 'Recommandé pour vous' : 'Recommended for you'
            )}
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-wasfah-bright-teal" />
            </div>
          ) : (
            <RecipeGrid recipes={convertedRecipes} columns={2} cardSize="medium" />
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default GlobalCuisinePage;
