import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
import { mockMealPlan } from '@/data/mockData';
import { ChefHat, Heart, Users, Award, Calendar, Box, PlusCircle, Camera, Share2, Bot, CreditCard } from 'lucide-react';

// Grouped Quick Actions
const quickActionsCookingPlanning = [
  { icon: <ChefHat className="h-6 w-6" />, label: "By Ingredients", path: "/find-by-ingredients" },
  { icon: <Users className="h-6 w-6" />, label: "Global Cuisine", path: "/global-cuisine" },
  { icon: <Calendar className="h-6 w-6" />, label: "Meal Plan", path: "/meal-plan" },
  { icon: <Camera className="h-6 w-6" />, label: "Scan Dish", path: "/scan-dish" },
  { icon: <PlusCircle className="h-6 w-6" />, label: "Create Recipe", path: "/create-recipe" },
  { icon: <Box className="h-6 w-6" />, label: "Pantry", path: "/pantry" },
];

const quickActionsCommunityRewards = [
  { icon: <Heart className="h-6 w-6" />, label: "Health Tracking", path: "/health-tracking-home" },
  { icon: <Award className="h-6 w-6" />, label: "Rewards", path: "/loyalty-program" },
  { icon: <Share2 className="h-6 w-6" />, label: "Shared Recipes", path: "/shared-recipes" },
  { icon: <Users className="h-6 w-6" />, label: "Community", path: "/community" },
  { icon: <Bot className="h-6 w-6" />, label: "AI Chef", path: "/ai-chef" },
  { icon: <CreditCard className="h-6 w-6" />, label: "Subscription", path: "/subscription" },
];

const NewHomePage = () => (
  <PageContainer
    header={{
      title: "WasfahAI",
      showBackButton: false
    }}
    className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
  >
    <div className="space-y-6 pb-24 pt-4">
      <div className="px-4">
        <SubscriptionBanner />
      </div>
      <div className="px-4">
        <LoyaltyCard />
      </div>

      {/* Quick Actions Grouped */}
      <div className="px-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quick Actions</h2>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Cooking & Planning</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
          {quickActionsCookingPlanning.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-center"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-wasfah-bright-teal/10 rounded-full flex items-center justify-center mb-2 text-wasfah-bright-teal">
                {action.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Community & Rewards</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {quickActionsCommunityRewards.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-center"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mb-2 text-purple-600 dark:text-purple-300">
                {action.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4">
        <TodayMealPlan mealPlan={mockMealPlan} />
      </div>
      {/* ...rest of your page unchanged... */}
    </div>
  </PageContainer>
);

export default NewHomePage;
