
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Clock, Users } from 'lucide-react';

interface GlobalCuisineProps {
  language: string;
}

export const GlobalCuisine: React.FC<GlobalCuisineProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Explore Global Cuisines',
      subtitle: 'Discover authentic recipes from every corner of the world',
      cuisines: [
        {
          name: 'Italian',
          flag: '🇮🇹',
          recipes: 1250,
          difficulty: 'Medium',
          time: '45 min',
          popular: 'Pasta Carbonara'
        },
        {
          name: 'Japanese',
          flag: '🇯🇵',
          recipes: 980,
          difficulty: 'Hard',
          time: '60 min',
          popular: 'Ramen Bowl'
        },
        {
          name: 'Mexican',
          flag: '🇲🇽',
          recipes: 820,
          difficulty: 'Easy',
          time: '30 min',
          popular: 'Tacos al Pastor'
        },
        {
          name: 'Indian',
          flag: '🇮🇳',
          recipes: 1100,
          difficulty: 'Medium',
          time: '50 min',
          popular: 'Butter Chicken'
        },
        {
          name: 'French',
          flag: '🇫🇷',
          recipes: 750,
          difficulty: 'Hard',
          time: '90 min',
          popular: 'Coq au Vin'
        },
        {
          name: 'Thai',
          flag: '🇹🇭',
          recipes: 650,
          difficulty: 'Medium',
          time: '35 min',
          popular: 'Pad Thai'
        }
      ]
    },
    ar: {
      title: 'استكشف المأكولات العالمية',
      subtitle: 'اكتشف وصفات أصيلة من كل زاوية في العالم',
      cuisines: [
        {
          name: 'إيطالي',
          flag: '🇮🇹',
          recipes: 1250,
          difficulty: 'متوسط',
          time: '45 دقيقة',
          popular: 'باستا كاربونارا'
        },
        {
          name: 'ياباني',
          flag: '🇯🇵',
          recipes: 980,
          difficulty: 'صعب',
          time: '60 دقيقة',
          popular: 'رامن'
        },
        {
          name: 'مكسيكي',
          flag: '🇲🇽',
          recipes: 820,
          difficulty: 'سهل',
          time: '30 دقيقة',
          popular: 'تاكوس الباستور'
        },
        {
          name: 'هندي',
          flag: '🇮🇳',
          recipes: 1100,
          difficulty: 'متوسط',
          time: '50 دقيقة',
          popular: 'دجاج بالزبدة'
        },
        {
          name: 'فرنسي',
          flag: '🇫🇷',
          recipes: 750,
          difficulty: 'صعب',
          time: '90 دقيقة',
          popular: 'كوك أو فان'
        },
        {
          name: 'تايلندي',
          flag: '🇹🇭',
          recipes: 650,
          difficulty: 'متوسط',
          time: '35 دقيقة',
          popular: 'باد تاي'
        }
      ]
    },
    fr: {
      title: 'Explorez les Cuisines Mondiales',
      subtitle: 'Découvrez des recettes authentiques des quatre coins du monde',
      cuisines: [
        {
          name: 'Italien',
          flag: '🇮🇹',
          recipes: 1250,
          difficulty: 'Moyen',
          time: '45 min',
          popular: 'Pasta Carbonara'
        },
        {
          name: 'Japonais',
          flag: '🇯🇵',
          recipes: 980,
          difficulty: 'Difficile',
          time: '60 min',
          popular: 'Bol de Ramen'
        },
        {
          name: 'Mexicain',
          flag: '🇲🇽',
          recipes: 820,
          difficulty: 'Facile',
          time: '30 min',
          popular: 'Tacos al Pastor'
        },
        {
          name: 'Indien',
          flag: '🇮🇳',
          recipes: 1100,
          difficulty: 'Moyen',
          time: '50 min',
          popular: 'Poulet au Beurre'
        },
        {
          name: 'Français',
          flag: '🇫🇷',
          recipes: 750,
          difficulty: 'Difficile',
          time: '90 min',
          popular: 'Coq au Vin'
        },
        {
          name: 'Thaï',
          flag: '🇹🇭',
          recipes: 650,
          difficulty: 'Moyen',
          time: '35 min',
          popular: 'Pad Thai'
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <section id="recipes" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.cuisines.map((cuisine, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-orange-200"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{cuisine.flag}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {cuisine.name}
                </h3>
                <p className="text-orange-600 font-semibold">
                  {cuisine.recipes} recipes
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Popular dish:</span>
                  <span className="font-medium text-gray-900">{cuisine.popular}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{cuisine.time}</span>
                  </div>
                  <Badge 
                    variant={cuisine.difficulty === 'Easy' || cuisine.difficulty === 'سهل' || cuisine.difficulty === 'Facile' ? 'default' : 
                           cuisine.difficulty === 'Medium' || cuisine.difficulty === 'متوسط' || cuisine.difficulty === 'Moyen' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {cuisine.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center justify-center pt-2">
                  <Heart className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-gray-600">4.8 rating</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
