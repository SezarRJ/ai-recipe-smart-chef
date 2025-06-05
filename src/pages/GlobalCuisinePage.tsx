
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Clock, Users } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const GlobalCuisinePage = () => {
  const { t, direction } = useRTL();
  const [searchTerm, setSearchTerm] = useState('');

  const cuisines = [
    {
      id: '1',
      name: 'Italian',
      nameAr: 'إيطالي',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      description: 'Rich flavors with pasta, pizza, and Mediterranean ingredients',
      descriptionAr: 'نكهات غنية مع المعكرونة والبيتزا والمكونات المتوسطية',
      recipes: 245,
      region: 'Europe',
      difficulty: 'Medium'
    },
    {
      id: '2',
      name: 'Japanese',
      nameAr: 'ياباني',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
      description: 'Fresh ingredients, umami flavors, and artistic presentation',
      descriptionAr: 'مكونات طازجة ونكهات أومامي وعرض فني',
      recipes: 189,
      region: 'Asia',
      difficulty: 'Hard'
    },
    {
      id: '3',
      name: 'Mexican',
      nameAr: 'مكسيكي',
      image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop',
      description: 'Spicy and vibrant with corn, beans, and chilies',
      descriptionAr: 'حار ونابض بالحياة مع الذرة والفاصوليا والفلفل الحار',
      recipes: 167,
      region: 'Americas',
      difficulty: 'Easy'
    },
    {
      id: '4',
      name: 'Indian',
      nameAr: 'هندي',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
      description: 'Complex spice blends and aromatic curries',
      descriptionAr: 'خلطات توابل معقدة وكاري عطري',
      recipes: 298,
      region: 'Asia',
      difficulty: 'Hard'
    },
    {
      id: '5',
      name: 'French',
      nameAr: 'فرنسي',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
      description: 'Sophisticated techniques and refined flavors',
      descriptionAr: 'تقنيات متطورة ونكهات مكررة',
      recipes: 134,
      region: 'Europe',
      difficulty: 'Hard'
    },
    {
      id: '6',
      name: 'Thai',
      nameAr: 'تايلاندي',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      description: 'Balance of sweet, sour, salty, and spicy',
      descriptionAr: 'توازن بين الحلو والحامض والمالح والحار',
      recipes: 156,
      region: 'Asia',
      difficulty: 'Medium'
    }
  ];

  const filteredCuisines = cuisines.filter(cuisine =>
    cuisine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cuisine.nameAr.includes(searchTerm)
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageContainer
      header={{
        title: t("Global Cuisine", "المطبخ العالمي"),
        showBackButton: true
      }}
    >
      <div className={`space-y-6 pb-24 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t("Search cuisines...", "البحث في المطابخ...")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Cuisine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCuisines.map((cuisine) => (
            <Card key={cuisine.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cuisine.image}
                  alt={direction === 'rtl' ? cuisine.nameAr : cuisine.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getDifficultyColor(cuisine.difficulty)}>
                    {cuisine.difficulty}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className={`text-xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {direction === 'rtl' ? cuisine.nameAr : cuisine.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-gray-600 dark:text-gray-400 mb-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {direction === 'rtl' ? cuisine.descriptionAr : cuisine.description}
                </p>
                <div className={`flex items-center justify-between mb-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-1 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{cuisine.region}</span>
                    </div>
                    <div className={`flex items-center gap-1 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{cuisine.recipes} {t("recipes", "وصفات")}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white">
                  {t("Explore Recipes", "استكشاف الوصفات")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCuisines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {t("No cuisines found matching your search.", "لا توجد مطابخ تطابق بحثك.")}
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default GlobalCuisinePage;
