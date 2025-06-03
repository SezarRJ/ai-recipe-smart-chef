
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Search, Clock, Users, Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GlobalCuisinePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = [
    { id: 'all', name: 'All Regions', flag: '🌍' },
    { id: 'asian', name: 'Asian', flag: '🥢' },
    { id: 'european', name: 'European', flag: '🍝' },
    { id: 'middle-eastern', name: 'Middle Eastern', flag: '🫓' },
    { id: 'african', name: 'African', flag: '🍲' },
    { id: 'american', name: 'American', flag: '🍔' },
    { id: 'latin', name: 'Latin American', flag: '🌮' }
  ];

  const cuisines = [
    {
      id: 'italian',
      name: 'Italian',
      region: 'european',
      flag: '🇮🇹',
      description: 'Authentic Italian recipes with fresh ingredients',
      popularDishes: ['Pizza Margherita', 'Pasta Carbonara', 'Risotto'],
      recipesCount: 248,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'japanese',
      name: 'Japanese',
      region: 'asian',
      flag: '🇯🇵',
      description: 'Traditional and modern Japanese cuisine',
      popularDishes: ['Sushi', 'Ramen', 'Tempura'],
      recipesCount: 186,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'indian',
      name: 'Indian',
      region: 'asian',
      flag: '🇮🇳',
      description: 'Rich and aromatic Indian dishes',
      popularDishes: ['Biryani', 'Curry', 'Tandoori'],
      recipesCount: 312,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'mexican',
      name: 'Mexican',
      region: 'latin',
      flag: '🇲🇽',
      description: 'Vibrant Mexican flavors and traditions',
      popularDishes: ['Tacos', 'Enchiladas', 'Guacamole'],
      recipesCount: 194,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1565299585323-38174c619b85?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'french',
      name: 'French',
      region: 'european',
      flag: '🇫🇷',
      description: 'Classic French culinary techniques',
      popularDishes: ['Coq au Vin', 'Bouillabaisse', 'Croissants'],
      recipesCount: 156,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'thai',
      name: 'Thai',
      region: 'asian',
      flag: '🇹🇭',
      description: 'Bold and fresh Thai flavors',
      popularDishes: ['Pad Thai', 'Tom Yum', 'Green Curry'],
      recipesCount: 142,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1559314809-0f31657b036e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'lebanese',
      name: 'Lebanese',
      region: 'middle-eastern',
      flag: '🇱🇧',
      description: 'Mediterranean Middle Eastern cuisine',
      popularDishes: ['Hummus', 'Tabbouleh', 'Shawarma'],
      recipesCount: 98,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'moroccan',
      name: 'Moroccan',
      region: 'african',
      flag: '🇲🇦',
      description: 'Exotic North African spices and flavors',
      popularDishes: ['Tagine', 'Couscous', 'Pastilla'],
      recipesCount: 76,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1539906462608-5a146c3e4bf8?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const filteredCuisines = cuisines.filter(cuisine => {
    const matchesSearch = cuisine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cuisine.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || cuisine.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const handleCuisineClick = (cuisineId: string) => {
    navigate(`/recipes?cuisine=${cuisineId}`);
  };

  return (
    <PageContainer header={{ title: 'Global Cuisine', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="text-center">
          <Globe className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Explore World Cuisines</h1>
          <p className="text-gray-600">Discover authentic recipes from around the globe</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Region Tabs */}
        <Tabs value={selectedRegion} onValueChange={setSelectedRegion}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-1">
            {regions.map((region) => (
              <TabsTrigger key={region.id} value={region.id} className="text-xs px-2">
                <span className="mr-1">{region.flag}</span>
                <span className="hidden sm:inline">{region.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedRegion} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCuisines.map((cuisine) => (
                <Card 
                  key={cuisine.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow group"
                  onClick={() => handleCuisineClick(cuisine.id)}
                >
                  <div className="relative">
                    <img
                      src={cuisine.image}
                      alt={cuisine.name}
                      className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90">
                        <span className="mr-1">{cuisine.flag}</span>
                        {cuisine.name}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {cuisine.rating}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span>{cuisine.name} Cuisine</span>
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </CardTitle>
                    <p className="text-sm text-gray-600">{cuisine.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {cuisine.recipesCount} recipes
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Popular Dishes:</p>
                      <div className="flex flex-wrap gap-1">
                        {cuisine.popularDishes.slice(0, 3).map((dish) => (
                          <Badge key={dish} variant="outline" className="text-xs">
                            {dish}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCuisineClick(cuisine.id);
                      }}
                    >
                      Explore Recipes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredCuisines.length === 0 && (
          <div className="text-center py-12">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cuisines found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default GlobalCuisinePage;
