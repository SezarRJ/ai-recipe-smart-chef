
import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calculator, 
  Timer, 
  Thermometer, 
  Scale, 
  Coffee, 
  Utensils,
  ChefHat,
  Zap
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const ToolsPage = () => {
  const { t, direction } = useRTL();

  const tools = [
    {
      icon: <Calculator className="h-8 w-8 text-wasfah-bright-teal" />,
      title: t("Nutrition Calculator", "حاسبة التغذية"),
      description: t("Calculate nutrition facts for recipes", "احسب الحقائق الغذائية للوصفات"),
      path: "/tools/nutrition-calculator",
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: <Timer className="h-8 w-8 text-orange-500" />,
      title: t("Cooking Timer", "مؤقت الطبخ"),
      description: t("Set multiple cooking timers", "اضبط عدة مؤقتات للطبخ"),
      path: "/tools/cooking-timer",
      color: "bg-orange-50 hover:bg-orange-100"
    },
    {
      icon: <Scale className="h-8 w-8 text-green-500" />,
      title: t("Unit Converter", "محول الوحدات"),
      description: t("Convert cooking measurements", "حول وحدات القياس للطبخ"),
      path: "/tools/unit-converter",
      color: "bg-green-50 hover:bg-green-100"
    },
    {
      icon: <Thermometer className="h-8 w-8 text-red-500" />,
      title: t("Temperature Guide", "دليل درجات الحرارة"),
      description: t("Cooking temperature reference", "مرجع درجات حرارة الطبخ"),
      path: "/tools/temperature-guide",
      color: "bg-red-50 hover:bg-red-100"
    },
    {
      icon: <Coffee className="h-8 w-8 text-amber-600" />,
      title: t("Recipe Scaler", "مقياس الوصفات"),
      description: t("Scale recipes up or down", "كبر أو صغر الوصفات"),
      path: "/tools/recipe-scaler",
      color: "bg-amber-50 hover:bg-amber-100"
    },
    {
      icon: <Utensils className="h-8 w-8 text-purple-500" />,
      title: t("Substitution Guide", "دليل البدائل"),
      description: t("Find ingredient substitutes", "ابحث عن بدائل للمكونات"),
      path: "/tools/substitution-guide",
      color: "bg-purple-50 hover:bg-purple-100"
    },
    {
      icon: <ChefHat className="h-8 w-8 text-indigo-500" />,
      title: t("Cooking Techniques", "تقنيات الطبخ"),
      description: t("Learn cooking methods", "تعلم طرق الطبخ"),
      path: "/tools/cooking-techniques",
      color: "bg-indigo-50 hover:bg-indigo-100"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: t("Quick Recipes", "وصفات سريعة"),
      description: t("Fast meal ideas", "أفكار وجبات سريعة"),
      path: "/tools/quick-recipes",
      color: "bg-yellow-50 hover:bg-yellow-100"
    }
  ];

  return (
    <PageContainer 
      header={{ 
        title: t("Cooking Tools", "أدوات الطبخ"), 
        showBackButton: true 
      }}
    >
      <div className="p-4 pb-24 space-y-6">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{t("Cooking Tools", "أدوات الطبخ")}</h1>
          <p className="opacity-90">{t("Essential tools for every home chef", "أدوات أساسية لكل طباخ منزلي")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, index) => (
            <Link to={tool.path} key={index}>
              <Card className={`${tool.color} border-none transition-all duration-300 hover:shadow-md hover:scale-105`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="rounded-full p-3 bg-white shadow-sm">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{tool.title}</h3>
                      <p className="text-gray-600 text-sm">{tool.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default ToolsPage;
