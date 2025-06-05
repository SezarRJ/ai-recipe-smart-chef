import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, X, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { IngredientImage } from '@/types/recipe';
import { useRTL } from '@/contexts/RTLContext';

interface Filters {
  dietary: string[];
  cookTime: string[];
  difficulty: string[];
  cuisine: string[];
}

interface FilterOptions {
  dietary: string[];
  cookTime: string[];
  difficulty: string[];
  cuisine: string[];
}

const FindByIngredientsPage = () => {
  const { t } = useRTL();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState<IngredientImage[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  const [filters, setFilters] = useState<Filters>({
    dietary: [],
    cookTime: [],
    difficulty: [],
    cuisine: []
  });

  const filterOptions: FilterOptions = {
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
    cookTime: ['Under 15 min', '15-30 min', '30-60 min', 'Over 1 hour'],
    difficulty: ['Easy', 'Medium', 'Hard'],
    cuisine: ['Italian', 'Asian', 'Mexican', 'Indian', 'Mediterranean']
  };

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  useEffect(() => {
    const mockIngredientImages: IngredientImage[] = [
      {
        id: '1',
        ingredient_name: 'Tomato',
        name: 'Tomato',
        image_url: 'https://images.unsplash.com/photo-1546470427-e-576x300?crop=1',
        alt_text: 'Fresh tomato',
        category: 'vegetables',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    setAvailableIngredients(mockIngredientImages);
  }, []);

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const findRecipes = () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: t("No ingredients selected", "لم يتم اختيار مكونات"),
        description: t("Please select at least one ingredient", "يرجى اختيار مكون واحد على الأقل"),
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: t("Finding recipes...", "جاري البحث عن الوصفات..."),
      description: `${t("Searching for recipes with", "البحث عن وصفات تحتوي على")} ${selectedIngredients.join(', ')}`
    });
  };

  const filteredIngredients = availableIngredients.filter(ingredient =>
    ingredient.ingredient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer
      header={{
        title: t("Find by Ingredients", "البحث بالمكونات"),
        showBackButton: true
      }}
    >
      <div className="space-y-6 pb-24">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                {t("Search Ingredients", "البحث في المكونات")}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {t("Filters", "المرشحات")}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("Search ingredients...", "البحث في المكونات...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {showFilters && (
              <Card className="p-4">
                <div className="space-y-4">
                  {Object.entries(filterOptions).map(([filterType, options]) => (
                    <div key={filterType}>
                      <h4 className="font-medium mb-2 capitalize">{filterType}</h4>
                      <div className="flex flex-wrap gap-2">
                        {options.map((option) => (
                          <Badge
                            key={option}
                            variant={filters[filterType as keyof Filters].includes(option) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleFilterChange(filterType as keyof Filters, option)}
                          >
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredIngredients.map((ingredient) => (
                <Card 
                  key={ingredient.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => addIngredient(ingredient.ingredient_name)}
                >
                  <CardContent className="p-4 text-center">
                    <img
                      src={ingredient.image_url}
                      alt={ingredient.alt_text}
                      className="w-full h-20 object-cover rounded-md mb-2"
                    />
                    <p className="text-sm font-medium">{ingredient.ingredient_name}</p>
                    <Button size="sm" className="mt-2 w-full">
                      <Plus className="h-4 w-4 mr-1" />
                      {t("Add", "إضافة")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedIngredients.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">{t("Selected Ingredients:", "المكونات المختارة:")}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map((ingredient) => (
                    <Badge key={ingredient} variant="secondary" className="flex items-center gap-1">
                      {ingredient}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeIngredient(ingredient)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={findRecipes} className="w-full" size="lg">
              {t("Find Recipes", "البحث عن الوصفات")} ({selectedIngredients.length} {t("ingredients", "مكونات")})
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default FindByIngredientsPage;
