
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Scan, Sparkles, Clock, Users, ChefHat } from 'lucide-react';

interface RecipeScannerProps {
  language: string;
}

export const RecipeScanner: React.FC<RecipeScannerProps> = ({ language }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const translations = {
    en: {
      title: 'AI Recipe Scanner',
      subtitle: 'Scan any dish and get instant recipe recommendations',
      scanButton: 'Scan a Dish',
      scanning: 'Scanning...',
      result: {
        dish: 'Pasta Carbonara',
        confidence: '94%',
        cuisine: 'Italian',
        difficulty: 'Medium',
        time: '25 min',
        servings: 4,
        description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
        ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper'],
        nutrition: {
          calories: 520,
          protein: '22g',
          carbs: '45g',
          fat: '28g'
        }
      },
      viewRecipe: 'View Full Recipe',
      tryAnother: 'Scan Another Dish'
    },
    ar: {
      title: 'ماسح الوصفات بالذكاء الاصطناعي',
      subtitle: 'امسح أي طبق واحصل على توصيات وصفات فورية',
      scanButton: 'مسح طبق',
      scanning: 'يتم المسح...',
      result: {
        dish: 'باستا كاربونارا',
        confidence: '94%',
        cuisine: 'إيطالي',
        difficulty: 'متوسط',
        time: '25 دقيقة',
        servings: 4,
        description: 'طبق المعكرونة الإيطالي الكلاسيكي مع البيض والجبن والبانشيتا',
        ingredients: ['سباغيتي', 'بيض', 'جبن بارميزان', 'بانشيتا', 'فلفل أسود'],
        nutrition: {
          calories: 520,
          protein: '22 جرام',
          carbs: '45 جرام',
          fat: '28 جرام'
        }
      },
      viewRecipe: 'عرض الوصفة الكاملة',
      tryAnother: 'مسح طبق آخر'
    },
    fr: {
      title: 'Scanner de Recettes IA',
      subtitle: 'Scannez n\'importe quel plat et obtenez des recommandations de recettes instantanées',
      scanButton: 'Scanner un Plat',
      scanning: 'Numérisation...',
      result: {
        dish: 'Pasta Carbonara',
        confidence: '94%',
        cuisine: 'Italien',
        difficulty: 'Moyen',
        time: '25 min',
        servings: 4,
        description: 'Plat de pâtes italien classique avec œufs, fromage et pancetta',
        ingredients: ['Spaghetti', 'Œufs', 'Fromage Parmesan', 'Pancetta', 'Poivre noir'],
        nutrition: {
          calories: 520,
          protein: '22g',
          carbs: '45g',
          fat: '28g'
        }
      },
      viewRecipe: 'Voir la Recette Complète',
      tryAnother: 'Scanner un Autre Plat'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const simulateScan = () => {
    setIsScanning(true);
    setScanResult(null);
    
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(t.result);
    }, 3000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8 text-center border-2 border-dashed border-orange-300 hover:border-orange-400 transition-colors">
              <div className="space-y-6">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto">
                  {isScanning ? (
                    <Scan className="h-12 w-12 text-orange-600 animate-pulse" />
                  ) : (
                    <Camera className="h-12 w-12 text-orange-600" />
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isScanning ? t.scanning : t.scanButton}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Point your camera at any dish and let AI do the magic
                  </p>
                </div>

                <Button
                  onClick={simulateScan}
                  disabled={isScanning}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 text-lg"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  {isScanning ? t.scanning : t.scanButton}
                </Button>
              </div>
            </Card>

            <Card className="p-8">
              {scanResult ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">{scanResult.dish}</h3>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-green-500" />
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {scanResult.confidence} Match
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600">{scanResult.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{scanResult.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{scanResult.servings} servings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ChefHat className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{scanResult.difficulty}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{scanResult.cuisine}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Ingredients:</h4>
                    <div className="flex flex-wrap gap-2">
                      {scanResult.ingredients.map((ingredient: string, index: number) => (
                        <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Nutrition (per serving):</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Calories: <span className="font-medium">{scanResult.nutrition.calories}</span></div>
                      <div>Protein: <span className="font-medium">{scanResult.nutrition.protein}</span></div>
                      <div>Carbs: <span className="font-medium">{scanResult.nutrition.carbs}</span></div>
                      <div>Fat: <span className="font-medium">{scanResult.nutrition.fat}</span></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                      {t.viewRecipe}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                      onClick={() => {
                        setScanResult(null);
                        simulateScan();
                      }}
                    >
                      {t.tryAnother}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">
                    Scan a dish to see AI-powered recipe analysis
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
