// src/pages/NewHomePage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
// Removed unused imports: ModernHeroSection, ModernFeatureCards, ModernFeaturedRecipes
// Removed QuickActionsSection import as we are rendering actions directly
// import { QuickActionsSection } from '@/components/home/QuickActionsSection';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
// Removed ExpiringIngredients import
// import { ExpiringIngredients } from '@/components/home/ExpiringIngredients';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
// Removed unused imports: Card, CardContent, Button, Badge
// Import new icons needed for quick actions, including Share2, Bot, and CreditCard
import { ChefHat, Heart, Users, Award, Calendar, Box, PlusCircle, Camera, Share2, Bot, CreditCard } from 'lucide-react'; // Added Bot and CreditCard


// Assuming these components are still needed and exist:
// import { ModernFeatureCards } from '@/components/home/ModernFeatureCards';
// import { ModernFeaturedRecipes } from '@/components/home/ModernFeaturedRecipes';


const quickActions = [
  // Removed: Find Recipe
  {
    icon: <ChefHat className="h-6 w-6" />, // Using ChefHat for ingredients
    label: "By Ingredients",
    path: "/find-by-ingredients" // Placeholder path
  },
  {
    icon: <Users className="h-6 w-6" />, // Using Users for global cuisine
    label: "Global Cuisine",
    path: "/global-cuisine" // Placeholder path
  },
  {
    icon: <Calendar className="h-6 w-6" />, // Using Calendar for Meal Plan
    label: "Meal Plan",
    path: "/meal-plan" // Placeholder path
  },
  {
    icon: <Heart className="h-6 w-6" />, // Using Heart for Health Tracking
    label: "Health Tracking",
    path: "/health-tracking-home" // <-- Updated path here
  },
  {
    icon: <Box className="h-6 w-6" />, // Using Box for Pantry
    label: "Pantry",
    path: "/pantry" // Placeholder path
  },
  {
    icon: <PlusCircle className="h-6 w-6" />, // Using PlusCircle for Create Recipe
    label: "Create Recipe",
    path: "/create-recipe" // Placeholder path
  },
  {
    icon: <Camera className="h-6 w-6" />, // Using Camera for Scan Dish
    label: "Scan Dish",
    path: "/scan-dish" // Placeholder path
  },
  {
    icon: <Award className="h-6 w-6" />,
    label: "Rewards",
    path: "/loyalty-program"
  },
  // --- MODIFIED: Replaced Favorites with Shared Recipes ---
  {
    icon: <Share2 className="h-6 w-6" />, // Using Share2 for Shared Recipes
    label: "Shared Recipes", // Changed label
    path: "/shared-recipes" // Placeholder path for shared recipes
  },
  // --- END MODIFIED ---
  {
    icon: <Users className="h-6 w-6" />, // Re-using Users for Community
    label: "Community",
    path: "/community"
  },
  // --- NEW: AI Chef Assistant ---
  {
    icon: <Bot className="h-6 w-6" />, // Using Bot icon
    label: "AI Chef",
    path: "/ai-chef" // Path to the AI Chef page
  },
  // --- NEW: Subscription ---
  {
    icon: <CreditCard className="h-6 w-6" />, // Using CreditCard icon
    label: "Subscription",
    path: "/subscription" // Path to the Subscription page
  },
];

// Mock meal plan data (kept as it's used by TodayMealPlan)
const mockMealPlan = {
  id: 'today-plan',
  date: new Date().toISOString().split('T')[0],
  meals: [
    {
      id: 'breakfast-1',
      type: 'breakfast' as const,
      recipe: {
        id: 'recipe-1',
        title: 'Avocado Toast',
        description: 'Healthy and delicious avocado toast',
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=300&q=80',
        prepTime: 10,
        cookTime: 5,
        servings: 1,
        difficulty: 'Easy' as const,
        calories: 320,
        rating: 4.5,
        ratingCount: 120,
        ingredients: [],
        instructions: [],
        categories: ['Breakfast'],
        tags: ['healthy', 'quick'],
        isFavorite: false
      }
    },
    {
      id: 'lunch-1',
      type: 'lunch' as const,
      recipe: {
        id: 'recipe-2',
        title: 'Quinoa Salad',
        description: 'Fresh quinoa salad with vegetables',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80',
        prepTime: 15,
        cookTime: 20,
        servings: 2,
        difficulty: 'Easy' as const,
        calories: 450,
        rating: 4.3,
        ratingCount: 89,
        ingredients: [],
        instructions: [],
        categories: ['Lunch', 'Salad'],
        tags: ['healthy', 'vegetarian'],
        isFavorite: false
      }
    },
    {
      id: 'dinner-1',
      type: 'dinner' as const,
      recipe: {
        id: 'recipe-3',
        title: 'Grilled Salmon',
        description: 'Perfectly grilled salmon with herbs',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80',
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        difficulty: 'Medium' as const,
        calories: 520,
        rating: 4.7,
        ratingCount: 156,
        ingredients: [],
        instructions: [],
        categories: ['Dinner', 'Seafood'],
        tags: ['protein', 'healthy'],
        isFavorite: true
      }
    }
  ]
};

const NewHomePage = () => {
  // Removed state and effect for timeOfDay and userName as the greeting card is removed
  // const [timeOfDay, setTimeOfDay] = useState('');
  // const [userName] = useState('Chef');

  // useEffect(() => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) {
  //     setTimeOfDay('Good Morning');
  //   } else if (hour < 17) {
  //     setTimeOfDay('Good Afternoon');
  //   } else {
  //     setTimeOfDay('Good Evening');
  //   }
  // }, []);

  return (
    <PageContainer
      header={{
        title: "WasfahAI",
        showBackButton: false
      }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Removed: Personalized Greeting Card */}
      {/* Removed: Cook with what you have / Discover Recipes Section */}
      {/* Removed: Community Highlights Section */}
      {/* Removed: Expiring Ingredients Alert */}

      <div className="space-y-6 pb-24 pt-4"> {/* Added pt-4 to compensate for removed greeting card padding */}

        {/* Subscription Banner */}
        <div className="px-4">
          <SubscriptionBanner />
        </div>

        {/* Premium Features / Loyalty Card Section (New Location) */}
        <div className="px-4">
            {/* --- REMOVED: Premium Features Heading and Text --- */}
            {/* <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unlock Premium Features</h2> */}
            {/* <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get personalized AI recommendations and more!</p> */}
            {/* --- END REMOVED --- */}
            {/* Loyalty Card (Kept Here) */}
            <LoyaltyCard />
        </div>


        {/* Quick Actions */}
        <div className="px-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          {/* Adjusted grid columns for potentially more actions */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-center" // Added text-center
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-wasfah-bright-teal/10 rounded-full flex items-center justify-center mb-2 text-wasfah-bright-teal"> {/* Adjusted size */}
                  {action.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight"> {/* Adjusted text size/leading */}
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>


        {/* Today's Meal Plan */}
        <div className="px-4">
          <TodayMealPlan mealPlan={mockMealPlan} />
        </div>

        {/* Featured Recipes */}
        <div className="px-4">
          {/* Assuming ModernFeaturedRecipes component exists and handles its own heading */}
          {/* <ModernFeaturedRecipes /> */}
           {/* Placeholder if ModernFeaturedRecipes is not a component */}
           <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Featured Recipes</h2>
           {/* Add your recipe grid/list here */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {/* Example Recipe Card Placeholder */}
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1504674900247-0877ce96b852?auto=format&fit=crop&w=300&q=80" alt="Recipe" className="w-full h-40 object-cover"/>
                   <div className="p-4">
                       <h3 className="font-semibold text-gray-900 dark:text-white">Recipe Title</h3>
                       <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">Short description of the recipe...</p>
                   </div>
               </div>
                {/* Repeat for more recipes */}
           </div>
        </div>

        {/* Feature Cards */}
        <div className="px-4">
           {/* Assuming ModernFeatureCards component exists and handles its own heading */}
           {/* <ModernFeatureCards /> */}
           {/* Placeholder if ModernFeatureCards is not a component */}
           <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Explore Features</h2>
           {/* Add your feature cards grid/list here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Example Feature Card Placeholder */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Feature Title</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Brief description of the feature.</p>
                </div>
                 {/* Repeat for more features */}
            </div>
        </div>

      </div>
    </PageContainer>
  );
};

export default NewHomePage;
