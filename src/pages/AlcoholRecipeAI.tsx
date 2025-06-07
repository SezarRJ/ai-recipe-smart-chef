
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRTL } from '@/contexts/RTLContext';
import { 
  GlassWater, 
  Brain, 
  Search, 
  Play, 
  Users, 
  Heart, 
  UtensilsCrossed, 
  Wine, 
  Camera, 
  Mic, 
  Plus,
  Filter,
  Star,
  Clock,
  ChefHat,
  Sparkles
} from 'lucide-react';

const AlcoholRecipeAI = () => {
  const { t } = useRTL();
  const [activeTab, setActiveTab] = useState('ai-creation');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    abv: '',
    occasion: '',
    difficulty: ''
  });

  // Mock data for drinks
  const mockDrinks = [
    {
      id: '1',
      name: 'Classic Mojito',
      type: 'Cocktail',
      abv: '8%',
      difficulty: 'Easy',
      time: '5 min',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87',
      ingredients: ['White Rum', 'Mint', 'Lime', 'Sugar', 'Soda Water'],
      instructions: ['Muddle mint with sugar', 'Add lime juice', 'Add rum', 'Top with soda'],
      pairing: ['Light seafood', 'Cuban cuisine', 'Summer appetizers'],
      servingSuggestion: 'Serve in a highball glass with ice and fresh mint garnish'
    },
    {
      id: '2',
      name: 'Old Fashioned',
      type: 'Whiskey',
      abv: '35%',
      difficulty: 'Medium',
      time: '3 min',
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187',
      ingredients: ['Bourbon', 'Sugar', 'Angostura Bitters', 'Orange Peel'],
      instructions: ['Muddle sugar with bitters', 'Add bourbon', 'Stir with ice', 'Garnish with orange'],
      pairing: ['Grilled meats', 'Dark chocolate', 'Cigars'],
      servingSuggestion: 'Serve in a rocks glass over a large ice cube'
    }
  ];

  const toggleFavorite = (drinkId: string) => {
    setFavorites(prev => 
      prev.includes(drinkId) 
        ? prev.filter(id => id !== drinkId)
        : [...prev, drinkId]
    );
  };

  // AI Creation Component
  const AICreationTab = () => (
    <div className="space-y-6">
      <Card className="border-wasfah-bright-teal/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-wasfah-bright-teal">
            <Brain className="h-5 w-5" />
            {t('AI-Powered Drink Creation', 'إنشاء المشروبات بالذكاء الاصطناعي')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="h-6 w-6 text-wasfah-bright-teal" />
              <span>{t('Use Pantry Ingredients', 'استخدم مكونات المخزن')}</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
            >
              <Camera className="h-6 w-6 text-wasfah-bright-teal" />
              <span>{t('Scan & Upload Image', 'مسح ورفع صورة')}</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
            >
              <Mic className="h-6 w-6 text-wasfah-bright-teal" />
              <span>{t('Voice Description', 'وصف صوتي')}</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
            >
              <Sparkles className="h-6 w-6 text-wasfah-bright-teal" />
              <span>{t('AI Suggestion', 'اقتراح الذكاء الاصطناعي')}</span>
            </Button>
          </div>
          
          {isCreating && (
            <Card className="bg-wasfah-bright-teal/5">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">{t('Tell me what you want', 'أخبرني ماذا تريد')}</h4>
                <Input 
                  placeholder={t('I want a refreshing cocktail for summer...', 'أريد كوكتيل منعش للصيف...')}
                  className="mb-3"
                />
                <div className="flex gap-2">
                  <Button size="sm" className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                    {t('Generate Recipe', 'إنشاء الوصفة')}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsCreating(false)}>
                    {t('Cancel', 'إلغاء')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Recipe Browsing Component
  const BrowsingTab = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {t('Search & Filter', 'البحث والتصفية')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            placeholder={t('Search drinks...', 'البحث عن المشروبات...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-2">
            <select 
              className="p-2 border rounded-lg text-sm"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="">{t('All Types', 'جميع الأنواع')}</option>
              <option value="cocktail">{t('Cocktails', 'كوكتيلات')}</option>
              <option value="wine">{t('Wine', 'نبيذ')}</option>
              <option value="beer">{t('Beer', 'بيرة')}</option>
            </select>
            
            <select 
              className="p-2 border rounded-lg text-sm"
              value={filters.abv}
              onChange={(e) => setFilters({...filters, abv: e.target.value})}
            >
              <option value="">{t('Any ABV', 'أي نسبة كحول')}</option>
              <option value="low">{t('Low (0-15%)', 'منخفض (0-15%)')}</option>
              <option value="medium">{t('Medium (15-30%)', 'متوسط (15-30%)')}</option>
              <option value="high">{t('High (30%+)', 'عالي (30%+)')}</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {mockDrinks.map((drink) => (
          <Card key={drink.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img 
                  src={drink.image} 
                  alt={drink.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{drink.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(drink.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${favorites.includes(drink.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                      />
                    </Button>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{drink.type}</Badge>
                    <Badge variant="outline" className="text-xs">{drink.abv}</Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {drink.time}
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                    onClick={() => setSelectedRecipe(drink)}
                  >
                    {t('View Recipe', 'عرض الوصفة')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Cook Mode Component
  const CookModeTab = () => (
    <div className="space-y-4">
      {selectedRecipe ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-wasfah-bright-teal" />
              {t('Cook Mode', 'وضع الطبخ')} - {selectedRecipe.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <img 
              src={selectedRecipe.image} 
              alt={selectedRecipe.name}
              className="w-full h-48 rounded-lg object-cover"
            />
            
            <div>
              <h4 className="font-semibold mb-2">{t('Ingredients', 'المكونات')}</h4>
              <ul className="space-y-1">
                {selectedRecipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">{t('Instructions', 'التعليمات')}</h4>
              <ol className="space-y-2">
                {selectedRecipe.instructions.map((step: string, index: number) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-wasfah-bright-teal text-white rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <ChefHat className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">{t('Select a recipe to start cooking', 'اختر وصفة لبدء الطبخ')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Community Component
  const CommunityTab = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-wasfah-bright-teal" />
            {t('Community Drinks', 'مشروبات المجتمع')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal mb-4">
            <Plus className="h-4 w-4 mr-2" />
            {t('Share Your Recipe', 'شارك وصفتك')}
          </Button>
          
          <div className="space-y-4">
            {mockDrinks.map((drink) => (
              <div key={drink.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-wasfah-bright-teal rounded-full flex items-center justify-center text-white text-sm">
                    U
                  </div>
                  <div>
                    <p className="font-medium text-sm">@mixmaster</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="text-sm mb-2">Just made this amazing {drink.name}! Perfect for weekend vibes 🍹</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    24
                  </button>
                  <button>{t('Comment', 'تعليق')}</button>
                  <button>{t('Share', 'مشاركة')}</button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Additional tabs for other features
  const FavoritesTab = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            {t('My Favorites', 'مفضلاتي')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {favorites.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">{t('No favorites yet', 'لا توجد مفضلات بعد')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {mockDrinks.filter(drink => favorites.includes(drink.id)).map((drink) => (
                <div key={drink.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{drink.name}</h3>
                  <p className="text-sm text-gray-600">{drink.type}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const PairingTab = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-wasfah-bright-teal" />
            {t('Food Pairing', 'تناسق الطعام')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedRecipe ? (
            <div className="space-y-4">
              <h3 className="font-semibold">{selectedRecipe.name}</h3>
              <div>
                <h4 className="font-medium mb-2">{t('Recommended Pairings', 'التناسقات الموصى بها')}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.pairing.map((item: string, index: number) => (
                    <Badge key={index} variant="outline">{item}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">{t('Serving Suggestion', 'اقتراح التقديم')}</h4>
                <p className="text-sm text-gray-600">{selectedRecipe.servingSuggestion}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <UtensilsCrossed className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">{t('Select a recipe to see pairings', 'اختر وصفة لرؤية التناسقات')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const ABVInfoTab = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wine className="h-5 w-5 text-wasfah-bright-teal" />
            {t('ABV Information', 'معلومات نسبة الكحول')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-green-600">{t('Low ABV (0-15%)', 'نسبة منخفضة (0-15%)')}</h4>
              <p className="text-sm text-gray-600">{t('Beer, Wine, Light cocktails', 'بيرة، نبيذ، كوكتيلات خفيفة')}</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-yellow-600">{t('Medium ABV (15-30%)', 'نسبة متوسطة (15-30%)')}</h4>
              <p className="text-sm text-gray-600">{t('Fortified wines, Liqueurs', 'نبيذ مقوى، مشروبات كحولية')}</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-red-600">{t('High ABV (30%+)', 'نسبة عالية (30%+)')}</h4>
              <p className="text-sm text-gray-600">{t('Spirits, Strong cocktails', 'مشروبات روحية، كوكتيلات قوية')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <PageContainer
      header={{
        title: t('Alcohol Recipes & AI', 'وصفات المشروبات والذكاء الاصطناعي'),
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full h-auto">
            <TabsTrigger value="ai-creation" className="text-xs p-2">
              <Brain className="h-4 w-4 mb-1" />
              <span className="hidden sm:inline">{t('AI Create', 'إنشاء ذكي')}</span>
            </TabsTrigger>
            <TabsTrigger value="browse" className="text-xs p-2">
              <Search className="h-4 w-4 mb-1" />
              <span className="hidden sm:inline">{t('Browse', 'تصفح')}</span>
            </TabsTrigger>
            <TabsTrigger value="cook" className="text-xs p-2">
              <Play className="h-4 w-4 mb-1" />
              <span className="hidden sm:inline">{t('Cook', 'طبخ')}</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="text-xs p-2">
              <Users className="h-4 w-4 mb-1" />
              <span className="hidden sm:inline">{t('Community', 'مجتمع')}</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-xs p-2">
              <Heart className="h-4 w-4 mb-1" />
              <span className="hidden sm:inline">{t('Favorites', 'مفضلات')}</span>
            </TabsTrigger>
            <TabsTrigger value="pairing" className="text-xs p-2">
              <UtensilsCrossed className="h-4 w-4 mb-1" />
              <span className="hidden sm:inline">{t('Pairing', 'تناسق')}</span>
            </TabsTrigger>
            <TabsTrigger value="serving" className="text-xs p-2">
              <GlassWater className="h-4 w-4 mb-1" />
              <span className="hidden sm:inline">{t('Serving', 'تقديم')}</span>
            </TabsTrigger>
            <TabsTrigger value="abv" className="text-xs p-2">
              <Wine className="h-4 w-4 mb-1" />
              <span className="hidden sm:inline">{t('ABV', 'نسبة كحول')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-creation" className="mt-6">
            <AICreationTab />
          </TabsContent>

          <TabsContent value="browse" className="mt-6">
            <BrowsingTab />
          </TabsContent>

          <TabsContent value="cook" className="mt-6">
            <CookModeTab />
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <CommunityTab />
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <FavoritesTab />
          </TabsContent>

          <TabsContent value="pairing" className="mt-6">
            <PairingTab />
          </TabsContent>

          <TabsContent value="serving" className="mt-6">
            <PairingTab />
          </TabsContent>

          <TabsContent value="abv" className="mt-6">
            <ABVInfoTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default AlcoholRecipeAI;
