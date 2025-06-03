
import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
import { mockMealPlan } from '@/data/mockData';
import { ChefHat, Heart, Users, Award, Calendar, Box, PlusCircle, Camera, Share2, Bot, CreditCard } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const NewHomePage = () => {
  const { t, direction } = useRTL();

  // Enhanced Quick Actions with better organization
  const quickActionsCookingPlanning = [
    { 
      icon: <ChefHat className="h-6 w-6" />, 
      label: t("By Ingredients", "حسب المكونات"), 
      path: "/ai-find-by-ingredients",
      color: "bg-emerald-500/10 text-emerald-600"
    },
    { 
      icon: <Users className="h-6 w-6" />, 
      label: t("Global Cuisine", "المطبخ العالمي"), 
      path: "/global-cuisine",
      color: "bg-blue-500/10 text-blue-600"
    },
    { 
      icon: <Calendar className="h-6 w-6" />, 
      label: t("Meal Plan", "خطة الوجبات"), 
      path: "/meal-plan",
      color: "bg-orange-500/10 text-orange-600"
    },
    { 
      icon: <Camera className="h-6 w-6" />, 
      label: t("Scan Dish", "مسح الطبق"), 
      path: "/scan-dish",
      color: "bg-purple-500/10 text-purple-600"
    },
    { 
      icon: <PlusCircle className="h-6 w-6" />, 
      label: t("Create Recipe", "إنشاء وصفة"), 
      path: "/create-recipe",
      color: "bg-pink-500/10 text-pink-600"
    },
    { 
      icon: <Box className="h-6 w-6" />, 
      label: t("Pantry", "المخزن"), 
      path: "/pantry",
      color: "bg-indigo-500/10 text-indigo-600"
    },
  ];

  const quickActionsCommunityRewards = [
    { 
      icon: <Heart className="h-6 w-6" />, 
      label: t("Health Tracking", "تتبع الصحة"), 
      path: "/health-tracking-home",
      color: "bg-red-500/10 text-red-600"
    },
    { 
      icon: <Award className="h-6 w-6" />, 
      label: t("Rewards", "المكافآت"), 
      path: "/loyalty-program",
      color: "bg-yellow-500/10 text-yellow-600"
    },
    { 
      icon: <Share2 className="h-6 w-6" />, 
      label: t("Community", "المجتمع"), 
      path: "/community",
      color: "bg-teal-500/10 text-teal-600"
    },
    { 
      icon: <Bot className="h-6 w-6" />, 
      label: t("AI Features", "ميزات الذكاء الاصطناعي"), 
      path: "/ai-features",
      color: "bg-cyan-500/10 text-cyan-600"
    },
    { 
      icon: <CreditCard className="h-6 w-6" />, 
      label: t("Subscription", "الاشتراك"), 
      path: "/subscription",
      color: "bg-violet-500/10 text-violet-600"
    },
    { 
      icon: <Users className="h-6 w-6" />, 
      label: t("Shared Recipes", "الوصفات المشتركة"), 
      path: "/shared-recipes",
      color: "bg-green-500/10 text-green-600"
    },
  ];

  return (
    <PageContainer
      header={{
        title: "WasfahAI",
        showBackButton: false
      }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className={`space-y-6 pb-24 pt-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`} dir={direction}>
        
        {/* Subscription Banner */}
        <div className="px-4">
          <SubscriptionBanner />
        </div>
        
        {/* Loyalty Card */}
        <div className="px-4">
          <LoyaltyCard />
        </div>

        {/* Quick Actions Section */}
        <div className="px-4">
          <div className={`mb-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("Quick Actions", "الإجراءات السريعة")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t("Choose what you'd like to do today", "اختر ما تريد فعله اليوم")}
            </p>
          </div>
          
          {/* Cooking & Planning Section */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center ${direction === 'rtl' ? 'text-right flex-row-reverse' : 'text-left'}`}>
              <ChefHat className={`h-5 w-5 text-wasfah-bright-teal ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
              {t("Cooking & Planning", "الطبخ والتخطيط")}
            </h3>
            <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 ${direction === 'rtl' ? 'direction-rtl' : ''}`}>
              {quickActionsCookingPlanning.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className="group flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700 min-h-[120px] justify-center"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <span className={`text-sm font-medium text-gray-700 dark:text-gray-300 text-center leading-tight ${direction === 'rtl' ? 'font-arabic' : ''}`}>
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Community & Rewards Section */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center ${direction === 'rtl' ? 'text-right flex-row-reverse' : 'text-left'}`}>
              <Users className={`h-5 w-5 text-purple-600 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
              {t("Community & Rewards", "المجتمع والمكافآت")}
            </h3>
            <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 ${direction === 'rtl' ? 'direction-rtl' : ''}`}>
              {quickActionsCommunityRewards.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className="group flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700 min-h-[120px] justify-center"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <span className={`text-sm font-medium text-gray-700 dark:text-gray-300 text-center leading-tight ${direction === 'rtl' ? 'font-arabic' : ''}`}>
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Meal Plan */}
        <div className="px-4">
          <TodayMealPlan mealPlan={mockMealPlan} />
        </div>
      </div>
    </PageContainer>
  );
};

export default NewHomePage;
