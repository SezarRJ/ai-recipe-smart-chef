
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Activity, Heart, Globe, Calendar, ShoppingCart, Users, Camera, ArrowRight, Sparkles, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const header = {
    showLogo: true,
    showSearch: true,
    actions: null,
  };

  const mainFeatures = [
    {
      icon: <Search className="h-6 w-6 text-white" />,
      label: "Find by Ingredients",
      path: "/find-by-ingredients",
      color: "bg-wasfah-bright-teal",
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      label: "Global Cuisine",
      path: "/global-cuisine",
      color: "bg-wasfah-deep-teal",
    },
    {
      icon: <Calendar className="h-6 w-6 text-white" />,
      label: "Meal Plan",
      path: "/meal-plan",
      color: "bg-green-500",
    },
    {
      icon: <Activity className="h-6 w-6 text-white" />,
      label: "Health Tracking",
      path: "/health-tracking-home",
      color: "bg-wasfah-coral-red",
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-white" />,
      label: "Pantry",
      path: "/pantry",
      color: "bg-purple-500",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      label: "Community",
      path: "/community",
      color: "bg-blue-500",
    },
    {
      icon: <Heart className="h-6 w-6 text-white" />,
      label: "Favorites",
      path: "/favorites",
      color: "bg-pink-500",
    },
    {
      icon: <Plus className="h-6 w-6 text-white" />,
      label: "Create Recipe",
      path: "/create-recipe",
      color: "bg-indigo-500",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Mock meal plan data
  const mockMealPlan = {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    meals: [
      {
        id: '1',
        type: 'breakfast' as const,
        recipe: {
          id: '1',
          title: 'Avocado Toast',
          description: 'Healthy breakfast with avocado',
          image: '/placeholder.svg',
          prepTime: 5,
          cookTime: 5,
          servings: 1,
          difficulty: 'Easy' as const,
          calories: 300,
          rating: 4.5,
          ratingCount: 120,
          ingredients: [],
          instructions: [],
          categories: ['Breakfast'],
          tags: ['healthy'],
          isFavorite: false
        }
      },
      {
        id: '2',
        type: 'lunch' as const,
        recipe: {
          id: '2',
          title: 'Mediterranean Salad',
          description: 'Fresh and healthy salad',
          image: '/placeholder.svg',
          prepTime: 10,
          cookTime: 0,
          servings: 2,
          difficulty: 'Easy' as const,
          calories: 250,
          rating: 4.3,
          ratingCount: 85,
          ingredients: [],
          instructions: [],
          categories: ['Lunch'],
          tags: ['healthy'],
          isFavorite: true
        }
      }
    ]
  };

  return (
    <PageContainer header={header} className="min-h-screen">
      <div className="space-y-6 pb-24">
        {/* AI Scan Card - Highlighted Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/scan-dish">
            <Card className="relative overflow-hidden border-2 border-wasfah-bright-teal/30 dark:border-wasfah-bright-teal/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`absolute top-0 left-0 w-full h-full ${isDark ? 'bg-gradient-to-br from-wasfah-bright-teal/10 to-wasfah-deep-teal/20' : 'bg-gradient-to-br from-wasfah-bright-teal/20 to-wasfah-deep-teal/30'} z-0`}></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <Sparkles className="h-5 w-5 text-wasfah-bright-teal mr-2" />
                      <span className="text-sm font-medium text-wasfah-bright-teal">NEW AI FEATURE</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Scan Any Dish</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Instantly get nutrition info and ingredients from any food photo.</p>
                    <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white flex items-center">
                      <Camera className="mr-2 h-4 w-4" />
                      Scan Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="hidden md:block ml-4 relative animate-pulse-glow">
                    <div className="w-20 h-20 bg-wasfah-bright-teal/20 border-2 border-wasfah-bright-teal/50 rounded-full flex items-center justify-center overflow-hidden">
                      <Camera className="h-10 w-10 text-wasfah-bright-teal" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Main Features Grid with Icons only */}
        <div>
          <h2 className="font-bold text-lg text-wasfah-deep-teal dark:text-wasfah-bright-teal mb-4">Quick Access</h2>
          <motion.div
            className="grid grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {mainFeatures.map((feature, index) => (
              <motion.div key={index} variants={item}>
                <Link to={feature.path} className="text-center">
                  <div className="flex flex-col items-center">
                    <div className={`${feature.color} rounded-full w-16 h-16 mb-2 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 dark:shadow-lg`}>
                      {feature.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{feature.label}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Recent Activity */}
        <h2 className="font-bold text-lg text-wasfah-deep-teal dark:text-wasfah-bright-teal mt-6">Recent Activity</h2>

        {/* Today's meal plan */}
        <TodayMealPlan mealPlan={mockMealPlan} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
