
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Utensils, Target, Zap } from 'lucide-react';

interface MealPlanningProps {
  language: string;
}

export const MealPlanning: React.FC<MealPlanningProps> = ({ language }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const translations = {
    en: {
      title: 'AI-Powered Meal Planning',
      subtitle: 'Let artificial intelligence create personalized weekly meal plans',
      generatePlan: 'Generate New Plan',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      meals: {
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        dinner: 'Dinner',
        snack: 'Snack'
      },
      samplePlan: [
        {
          breakfast: { name: 'Avocado Toast', calories: 320, time: '10 min' },
          lunch: { name: 'Quinoa Salad', calories: 450, time: '15 min' },
          dinner: { name: 'Grilled Salmon', calories: 520, time: '25 min' },
          snack: { name: 'Greek Yogurt', calories: 150, time: '2 min' }
        },
        {
          breakfast: { name: 'Overnight Oats', calories: 280, time: '5 min' },
          lunch: { name: 'Chicken Wrap', calories: 480, time: '12 min' },
          dinner: { name: 'Vegetable Stir Fry', calories: 420, time: '20 min' },
          snack: { name: 'Mixed Nuts', calories: 200, time: '1 min' }
        }
      ]
    },
    ar: {
      title: 'تخطيط الوجبات بالذكاء الاصطناعي',
      subtitle: 'دع الذكاء الاصطناعي ينشئ خطط وجبات أسبوعية شخصية',
      generatePlan: 'إنشاء خطة جديدة',
      days: ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
      meals: {
        breakfast: 'الإفطار',
        lunch: 'الغداء',
        dinner: 'العشاء',
        snack: 'وجبة خفيفة'
      },
      samplePlan: [
        {
          breakfast: { name: 'توست الأفوكادو', calories: 320, time: '10 دقائق' },
          lunch: { name: 'سلطة الكينوا', calories: 450, time: '15 دقيقة' },
          dinner: { name: 'سلمون مشوي', calories: 520, time: '25 دقيقة' },
          snack: { name: 'لبن يوناني', calories: 150, time: '2 دقائق' }
        },
        {
          breakfast: { name: 'شوفان ليلي', calories: 280, time: '5 دقائق' },
          lunch: { name: 'لفافة دجاج', calories: 480, time: '12 دقيقة' },
          dinner: { name: 'خضار مقلية', calories: 420, time: '20 دقيقة' },
          snack: { name: 'مكسرات مشكلة', calories: 200, time: '1 دقيقة' }
        }
      ]
    },
    fr: {
      title: 'Planification de Repas par IA',
      subtitle: 'Laissez l\'intelligence artificielle créer des plans de repas hebdomadaires personnalisés',
      generatePlan: 'Générer un Nouveau Plan',
      days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      meals: {
        breakfast: 'Petit-déjeuner',
        lunch: 'Déjeuner',
        dinner: 'Dîner',
        snack: 'Collation'
      },
      samplePlan: [
        {
          breakfast: { name: 'Toast à l\'Avocat', calories: 320, time: '10 min' },
          lunch: { name: 'Salade de Quinoa', calories: 450, time: '15 min' },
          dinner: { name: 'Saumon Grillé', calories: 520, time: '25 min' },
          snack: { name: 'Yaourt Grec', calories: 150, time: '2 min' }
        },
        {
          breakfast: { name: 'Avoine de Nuit', calories: 280, time: '5 min' },
          lunch: { name: 'Wrap au Poulet', calories: 480, time: '12 min' },
          dinner: { name: 'Sauté de Légumes', calories: 420, time: '20 min' },
          snack: { name: 'Noix Mélangées', calories: 200, time: '1 min' }
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t.subtitle}
          </p>
          <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3">
            <Zap className="mr-2 h-5 w-5" />
            {t.generatePlan}
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {t.days.map((day, index) => (
              <Button
                key={index}
                variant={selectedDay === index ? "default" : "outline"}
                onClick={() => setSelectedDay(index)}
                className={`px-4 py-2 ${selectedDay === index ? 'bg-orange-600 hover:bg-orange-700' : 'border-orange-300 text-orange-700 hover:bg-orange-50'}`}
              >
                {day}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(t.meals).map(([mealType, mealName], index) => {
              const planIndex = selectedDay < 2 ? selectedDay : selectedDay % 2;
              const meal = t.samplePlan[planIndex][mealType as keyof typeof t.samplePlan[0]];
              
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-orange-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{mealName}</h3>
                    <Utensils className="h-5 w-5 text-orange-600" />
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-lg text-gray-800">{meal.name}</h4>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        {meal.calories} cal
                      </Badge>
                      <span className="text-sm text-gray-600">{meal.time}</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" 
                        style={{ width: `${Math.min((meal.calories / 600) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">1,720</div>
                <div className="text-gray-600">Daily Calories</div>
              </div>
              <div className="text-center">
                <Calendar className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">7</div>
                <div className="text-gray-600">Days Planned</div>
              </div>
              <div className="text-center">
                <Zap className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-pink-600">85%</div>
                <div className="text-gray-600">Health Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
