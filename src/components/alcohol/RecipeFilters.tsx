
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Star, Clock } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const RecipeFilters = () => {
  const { t } = useRTL();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filterOptions = [
    { category: t('Type', 'النوع'), options: ['Cocktail', 'Shot', 'Mocktail'] },
    { category: t('Alcohol', 'الكحول'), options: ['Vodka', 'Gin', 'Rum', 'Whiskey'] },
    { category: t('Difficulty', 'الصعوبة'), options: ['Easy', 'Medium', 'Hard'] }
  ];

  const mockRecipes = [
    {
      id: 1,
      name: t('Blue Lagoon', 'البحيرة الزرقاء'),
      type: 'Cocktail',
      alcohol: 'Vodka',
      difficulty: 'Easy',
      rating: 4.5,
      prepTime: 5,
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: t('Whiskey Smash', 'ويسكي سماش'),
      type: 'Cocktail',
      alcohol: 'Whiskey',
      difficulty: 'Medium',
      rating: 4.7,
      prepTime: 8,
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=300&h=200&fit=crop'
    }
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('Browse & Filter Recipes', 'تصفح وفلتر الوصفات')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('Search recipes...', 'ابحث عن الوصفات...')}
              className="pl-10"
            />
          </div>

          {filterOptions.map((group) => (
            <div key={group.category}>
              <h4 className="font-medium mb-2">{group.category}</h4>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => (
                  <Badge
                    key={option}
                    variant={selectedFilters.includes(option) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(option)}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>
          ))}

          {selectedFilters.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t('Active Filters', 'الفلاتر النشطة')}</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedFilters([])}>
                  {t('Clear All', 'مسح الكل')}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map((filter) => (
                  <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                    {filter}
                    <button onClick={() => toggleFilter(filter)} className="ml-1">×</button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRecipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-32 object-cover"
              />
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{recipe.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.prepTime}m</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">{recipe.type}</Badge>
                  <Badge variant="outline" className="text-xs">{recipe.alcohol}</Badge>
                </div>
                <Button size="sm">
                  {t('View Recipe', 'عرض الوصفة')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecipeFilters;
