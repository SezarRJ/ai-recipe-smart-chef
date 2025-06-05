
import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
import { mockMealPlan } from '@/data/mockData';
import { useRTL } from '@/contexts/RTLContext';

const NewHomePage = () => {
  const { t, direction } = useRTL();

  const mainFeatures = [
    {
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=center",
      label: t("By Ingredients", "حسب المكونات"),
      path: "/ai-find-by-ingredients",
      color: "bg-emerald-500/10"
    },
    {
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=150&h=150&fit=crop&crop=center",
      label: t("Global Cuisine", "المطبخ العالمي"),
      path: "/global-cuisine",
      color: "bg-blue-500/10"
    },
    {
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop&crop=center",
      label: t("AI Features", "ميزات الذكاء الاصطناعي"),
      path: "/ai-features",
      color: "bg-cyan-500/10"
      },
    {
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=150&fit=crop&crop=center",
      label: t("Services", "الخدمات"),
      path: "/services",
      color: "bg-purple-500/10"
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

        {/* --- Unlock Premium Features Button --- */}
        <div className="px-4">
          <Link
            to="/subscription"
            className="block group rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <SubscriptionBanner />
          </Link>
        </div>

        {/* --- Gold Level Member Button --- */}
        <div className="px-4">
          <Link
            to="/loyalty-program"
            className="block group rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <LoyaltyCard />
          </Link>
        </div>

        {/* Main Features */}
        <div className="px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("Main Features", "الميزات الرئيسية")}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {mainFeatures.map((feature, index) => (
              <Link
                key={index}
                to={feature.path}
                className="group flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700 min-h-[140px] justify-center"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
                  <img 
                    src={feature.image} 
                    alt={feature.label}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                  {feature.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Your meal plan today */}
        <div className="px-4">
          <TodayMealPlan mealPlan={mockMealPlan} />
        </div>
      </div>
    </PageContainer>
  );
};

export default NewHomePage;
