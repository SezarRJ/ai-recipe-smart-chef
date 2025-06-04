
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Heart,
  Award,
  Share2,
  Camera,
  PlusCircle,
  ShoppingCart,
  Calendar,
  Users,
  Info,
  ChefHat,
  Book
} from 'lucide-react';

import { PageContainer } from '@/components/layout/PageContainer';
import { useRTL } from '@/contexts/RTLContext';

const tools = [
  {
    icon: <Box className="h-6 w-6" />,
    label: "Pantry",
    path: "/pantry",
    color: "bg-indigo-500/10 text-indigo-600"
  },
  {
    icon: <Heart className="h-6 w-6" />,
    label: "Favorites",
    path: "/favorites",
    color: "bg-red-500/10 text-red-600"
  },
  {
    icon: <Book className="h-6 w-6" />,
    label: "My Recipes",
    path: "/recipes",
    color: "bg-wasfah-deep-teal/10 text-wasfah-deep-teal"
  },
  {
    icon: <Heart className="h-6 w-6" />,
    label: "Health Tracking",
    path: "/health-tracking-home",
    color: "bg-red-500/10 text-red-600"
  },
  {
    icon: <Award className="h-6 w-6" />,
    label: "Rewards",
    path: "/loyalty-program",
    color: "bg-yellow-500/10 text-yellow-600"
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    label: "Community",
    path: "/community",
    color: "bg-teal-500/10 text-teal-600"
  },
  {
    icon: <Camera className="h-6 w-6" />,
    label: "Scan Dish",
    path: "/scan-dish",
    color: "bg-purple-500/10 text-purple-600"
  },
  {
    icon: <Users className="h-6 w-6" />,
    label: "Share Recipe",
    path: "/shared-recipes",
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    icon: <PlusCircle className="h-6 w-6" />,
    label: "Create Recipe",
    path: "/create-recipe",
    color: "bg-green-500/10 text-green-600"
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    label: "Smart Shopping List",
    path: "/shopping-list",
    color: "bg-orange-500/10 text-orange-600"
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    label: "Meal Planning",
    path: "/meal-plan",
    color: "bg-pink-500/10 text-pink-600"
  },
  {
    icon: <Info className="h-6 w-6" />,
    label: "Body Information",
    path: "/body-information",
    color: "bg-cyan-500/10 text-cyan-600"
  },
];

const ToolsPage = () => {
  const { t, direction } = useRTL();

  return (
    <PageContainer
      header={{
        title: t("Tools", "الأدوات"),
        showBackButton: true
      }}
    >
      <div className={`space-y-6 pb-24 pt-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`} dir={direction}>
        <div className="px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <Link
                key={index}
                to={tool.path}
                className="group flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700 min-h-[120px] justify-center"
              >
                <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                  {t(tool.label, tool.label)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ToolsPage;
