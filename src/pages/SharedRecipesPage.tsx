
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Share2, Search, Filter, Heart, Star, Clock, Users } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const SharedRecipesPage = () => {
  const { t } = useRTL();
  const [searchTerm, setSearchTerm] = useState('');

  const mockRecipes = [
    {
      id: 1,
      title: t('Homemade Pizza Margherita', 'بيتزا مارغريتا منزلية'),
      author: t('Chef Maria', 'الشيف ماريا'),
      rating: 4.8,
      reviews: 124,
      prepTime: 30,
      cookTime: 15,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
      tags: ['Italian', 'Vegetarian', 'Quick'],
      likes: 89
    },
    {
      id: 2,
      title: t('Spicy Chicken Curry', 'كاري الدجاج الحار'),
      author: t('Chef Ahmed', 'الشيف أحمد'),
      rating: 4.6,
      reviews: 87,
      prepTime: 20,
      cookTime: 45,
      servings: 6,
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&h=200&fit=crop',
      tags: ['Indian', 'Spicy', 'Main Course'],
      likes: 67
    },
    {
      id: 3,
      title: t('Chocolate Lava Cake', 'كعكة الشوكولاتة بالحمم'),
      author: t('Baker Sarah', 'الخبازة سارة'),
      rating: 4.9,
      reviews: 156,
      prepTime: 15,
      cookTime: 12,
      servings: 2,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop',
      tags: ['Dessert', 'Chocolate', 'Romantic'],
      likes: 203
    }
  ];

  return (
    <PageContainer
      header={{
        title: t('Shared Recipes', 'الوصفات المشتركة'),
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-6">
        <div className="text-center space-y-4">
          <Share2 className="h-12 w-12 mx-auto text-wasfah-bright-teal" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Community Recipes', 'وصفات المجتمع')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Discover amazing recipes shared by our community', 'اكتشف وصفات رائعة يشاركها مجتمعنا')}
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('Search recipes...', 'ابحث عن الوصفات...')}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                {t('Filters', 'فلاتر')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('by', 'بواسطة')} {recipe.author}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{recipe.rating}</span>
                    <span>({recipe.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{recipe.likes}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.prepTime + recipe.cookTime}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {recipe.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full">
                  {t('View Recipe', 'عرض الوصفة')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline">
            {t('Load More Recipes', 'تحميل المزيد من الوصفات')}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default SharedRecipesPage;
