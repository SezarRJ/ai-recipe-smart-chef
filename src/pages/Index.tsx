
import React from 'react';
import { Link } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
import { mockMealPlan } from '@/data/mockData';
import { useRTL } from '@/contexts/RTLContext';

const HomePage = () => {
  const { t, direction } = useRTL();

  const mainFeatures = [
    {
      image: "/images/ingredients-table.png",
      label: t("By Ingredients", "حسب المكونات"),
      path: "/ai-find-by-ingredients",
      color: "bg-emerald-500/10"
    },
    {
      image: "/images/Globalcuisine.png",
      label: t("Global Cuisine", "المطبخ العالمي"),
      path: "/global-cuisine",
      color: "bg-blue-500/10"
    },
    {
      image: "/images/Aifeatures.png",
      label: t("AI Features", "ميزات الذكاء الاصطناعي"),
      path: "/ai-features",
      color: "bg-cyan-500/10"
    },
    {
      image: "/images/Alcoho-Drinks.jpg",
      label: t("Alcohol Drinks", "المشروبات الكحولية"),
      path: "/alcohol-drinks",
      color: "bg-amber-500/10"
    },
    {
      image: "/images/services.png",
      label: t("Services", "الخدمات"),
      path: "/services",
      color: "bg-purple-500/10"
    }
  ];

  return (
    <MobileLayout
      header={{
        title: "WasfahAI",
        showBackButton: false
      }}
    >
      <div className={`space-y-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        {/* Premium Features Banner */}
        <Link to="/subscription" className="block">
          <SubscriptionBanner />
        </Link>

        {/* Loyalty Card */}
        <Link to="/loyalty-program" className="block">
          <LoyaltyCard />
        </Link>

        {/* Main Features */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {t("Main Features", "الميزات الرئيسية")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {mainFeatures.map((feature, index) => (
              <Link
                key={index}
                to={feature.path}
                className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.label}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {feature.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Today's Meal Plan */}
        <TodayMealPlan mealPlan={mockMealPlan} />
      </div>
    </MobileLayout>
  );
};

export default HomePage;
