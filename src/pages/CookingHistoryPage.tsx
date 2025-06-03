
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Clock, Calendar, Heart, Share2, Eye, Star, Bookmark } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { mockRecipes } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface CookedRecipe {
  id: string;
  recipe: any;
  cookedAt: string;
  rating?: number;
  notes?: string;
}

interface SavedRecipe {
  id: string;
  recipe: any;
  savedAt: string;
  folder?: string;
}

export default function CookingHistoryPage() {
  const { t, direction, language } = useRTL();
  const { toast } = useToast();

  // Mock data for cooked recipes - ensure we have valid recipes
  const [cookedRecipes] = useState<CookedRecipe[]>([
    {
      id: '1',
      recipe: mockRecipes[0] || null,
      cookedAt: '2024-01-15T18:30:00Z',
      rating: 5,
      notes: 'Delicious! Kids loved it.'
    },
    {
      id: '2', 
      recipe: mockRecipes[1] || null,
      cookedAt: '2024-01-10T12:00:00Z',
      rating: 4,
    },
    {
      id: '3',
      recipe: mockRecipes[2] || null, 
      cookedAt: '2024-01-05T19:15:00Z',
      rating: 5,
      notes: 'Perfect for dinner party'
    }
  ].filter(item => item.recipe !== null)); // Filter out items with null recipes

  // Mock data for saved recipes - ensure we have valid recipes
  const [savedRecipes] = useState<SavedRecipe[]>([
    {
      id: '1',
      recipe: mockRecipes[3] || null,
      savedAt: '2024-01-12T10:00:00Z',
      folder: 'Breakfast'
    },
    {
      id: '2',
      recipe: mockRecipes[4] || null,
      savedAt: '2024-01-08T15:30:00Z',
      folder: 'Dinner'
    },
    {
      id: '3',
      recipe: mockRecipes[0] || null,
      savedAt: '2024-01-03T09:45:00Z',
      folder: 'Favorites'
    }
  ].filter(item => item.recipe !== null)); // Filter out items with null recipes

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCookAgain = (recipeId: string) => {
    toast({
      title: t("Added to Meal Plan", "تمت الإضافة لخطة الوجبات"),
      description: t("Recipe added to today's meal plan", "تمت إضافة الوصفة لخطة وجبات اليوم"),
    });
  };

  const handleRemoveFromSaved = (recipeId: string) => {
    toast({
      title: t("Removed from Saved", "تمت الإزالة من المحفوظات"),
      description: t("Recipe removed from your saved collection", "تمت إزالة الوصفة من مجموعتك المحفوظة"),
    });
  };

  return (
    <PageContainer
      header={{
        title: t('Cooking History', 'سجل الطبخ'),
        showBackButton: true
      }}
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <ChefHat className="h-8 w-8 mx-auto mb-2 text-wasfah-bright-teal" />
              <div className="text-2xl font-bold text-wasfah-deep-teal">{cookedRecipes.length}</div>
              <div className="text-sm text-gray-600">{t('Recipes Cooked', 'وصفات مطبوخة')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Bookmark className="h-8 w-8 mx-auto mb-2 text-wasfah-bright-teal" />
              <div className="text-2xl font-bold text-wasfah-deep-teal">{savedRecipes.length}</div>
              <div className="text-sm text-gray-600">{t('Saved Recipes', 'وصفات محفوظة')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-wasfah-bright-teal" />
              <div className="text-2xl font-bold text-wasfah-deep-teal">
                {cookedRecipes.length > 0 ? (cookedRecipes.reduce((sum, r) => sum + (r.rating || 0), 0) / cookedRecipes.length).toFixed(1) : '0.0'}
              </div>
              <div className="text-sm text-gray-600">{t('Average Rating', 'متوسط التقييم')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different history types */}
        <Tabs defaultValue="cooked" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cooked">{t('Cooked Recipes', 'وصفات مطبوخة')}</TabsTrigger>
            <TabsTrigger value="saved">{t('Saved Recipes', 'وصفات محفوظة')}</TabsTrigger>
          </TabsList>

          {/* Cooked Recipes Tab */}
          <TabsContent value="cooked" className="mt-6">
            <div className="space-y-4">
              {cookedRecipes.length === 0 ? (
                <Card className="p-6 text-center">
                  <div className="text-gray-500">
                    {t('No cooked recipes yet', 'لا توجد وصفات مطبوخة بعد')}
                  </div>
                </Card>
              ) : (
                cookedRecipes.map((cookedRecipe) => (
                  <Card key={cookedRecipe.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className={`flex gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <img
                          src={cookedRecipe.recipe?.image || '/placeholder.svg'}
                          alt={cookedRecipe.recipe?.title || 'Recipe'}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className={`flex items-start justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                            <div>
                              <h3 className="text-lg font-semibold text-wasfah-deep-teal mb-2">
                                {cookedRecipe.recipe?.title || 'Unknown Recipe'}
                              </h3>
                              <div className={`flex items-center space-x-4 mb-3 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                                <div className={`flex items-center space-x-1 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-600">
                                    {formatDate(cookedRecipe.cookedAt)}
                                  </span>
                                </div>
                                {cookedRecipe.rating && (
                                  <div className={`flex items-center space-x-1 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-medium">{cookedRecipe.rating}</span>
                                  </div>
                                )}
                              </div>
                              {cookedRecipe.notes && (
                                <p className="text-sm text-gray-600 italic">"{cookedRecipe.notes}"</p>
                              )}
                            </div>
                            <div className={`flex space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                              {cookedRecipe.recipe?.id && (
                                <Link to={`/recipes/${cookedRecipe.recipe.id}`}>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    {t('View', 'عرض')}
                                  </Button>
                                </Link>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleCookAgain(cookedRecipe.recipe?.id || '')}
                              >
                                <ChefHat className="h-4 w-4 mr-1" />
                                {t('Cook Again', 'اطبخ مرة أخرى')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Saved Recipes Tab */}
          <TabsContent value="saved" className="mt-6">
            <div className="space-y-4">
              {savedRecipes.length === 0 ? (
                <Card className="p-6 text-center">
                  <div className="text-gray-500">
                    {t('No saved recipes yet', 'لا توجد وصفات محفوظة بعد')}
                  </div>
                </Card>
              ) : (
                savedRecipes.map((savedRecipe) => (
                  <Card key={savedRecipe.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className={`flex gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <img
                          src={savedRecipe.recipe?.image || '/placeholder.svg'}
                          alt={savedRecipe.recipe?.title || 'Recipe'}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className={`flex items-start justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                            <div>
                              <h3 className="text-lg font-semibold text-wasfah-deep-teal mb-2">
                                {savedRecipe.recipe?.title || 'Unknown Recipe'}
                              </h3>
                              <div className={`flex items-center space-x-4 mb-3 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                                <div className={`flex items-center space-x-1 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-600">
                                    {t('Saved on', 'محفوظ في')} {formatDate(savedRecipe.savedAt)}
                                  </span>
                                </div>
                                {savedRecipe.folder && (
                                  <Badge variant="secondary" className="text-xs">
                                    {savedRecipe.folder}
                                  </Badge>
                                )}
                              </div>
                              <div className={`flex items-center space-x-4 text-sm text-gray-600 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                                <div className={`flex items-center space-x-1 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                                  <Clock className="h-4 w-4" />
                                  <span>{(savedRecipe.recipe?.prepTime || 0) + (savedRecipe.recipe?.cookTime || 0)} min</span>
                                </div>
                                <div className={`flex items-center space-x-1 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  <span>{savedRecipe.recipe?.rating || 0}</span>
                                </div>
                              </div>
                            </div>
                            <div className={`flex space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                              {savedRecipe.recipe?.id && (
                                <Link to={`/recipes/${savedRecipe.recipe.id}`}>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    {t('View', 'عرض')}
                                  </Button>
                                </Link>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleRemoveFromSaved(savedRecipe.recipe?.id || '')}
                              >
                                <Bookmark className="h-4 w-4 mr-1" />
                                {t('Remove', 'إزالة')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
