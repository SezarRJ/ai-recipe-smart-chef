// src/pages/AIFeaturesPage.tsx
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import {
  Bot,
  Camera,
  Sparkles,
  Brain,
  MessageSquare, // For AI Cooking Assistant
  BookOpen,      // For Recipe Personalizer
  Lightbulb,     // For Smart Meal Planner
  Leaf,          // For Dietary AI Advisor
  Dumbbell,      // For Fitness & Nutrition Coach
  Smile,         // For Mood-Based Recipes
  Mic            // For Voice Recipe Assistant
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { Link } from 'react-router-dom';

export default function AIFeaturesPage() {
  const { t } = useRTL();

  const features = [
    {
      icon: <Camera className="h-8 w-8 text-green-500" />,
      title: t('Dish Scanner', 'ماسح الأطباق'),
      description: t('Identify dishes from photos and get nutrition facts', 'تحديد الأطباق من الصور والحصول على الحقائق الغذائية'),
      path: '/ai/scan-dish',
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: t('AI Recipe Finder', 'باحث الوصفات الذكي'),
      description: t('Find recipes based on ingredients you have, dietary needs, or preferences', 'البحث عن الوصفات بناءً على المكونات المتوفرة لديك، أو الاحتياجات الغذائية، أو التفضيلات'),
      path: '/ai/recipe-finder',
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
      title: t('AI Cooking Assistant', 'مساعد الطبخ بالذكاء الاصطناعي'),
      description: t('Ask questions, get cooking tips, and troubleshoot recipes with an AI chatbot', 'اطرح الأسئلة، احصل على نصائح الطبخ، واستكشف أخطاء الوصفات مع روبوت الدردشة'),
      path: '/ai/cooking-assistant',
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-500" />,
      title: t('Recipe Personalizer', 'مخصص الوصفات'),
      description: t('Adjust recipes to your taste, skill level, or available ingredients', 'تعديل الوصفات لتناسب ذوقك، مستوى مهارتك، أو المكونات المتوفرة'),
      path: '/ai/recipe-personalizer',
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      title: t('Smart Meal Planner', 'مخطط الوجبات الذكي'),
      description: t('Generate personalized meal plans based on your goals and preferences', 'أنشئ خطط وجبات مخصصة بناءً على أهدافك وتفضيلاتك'),
      path: '/ai/meal-planner',
    },
    {
      icon: <Leaf className="h-8 w-8 text-emerald-500" />,
      title: t('Dietary AI Advisor', 'مستشار الحمية بالذكاء الاصطناعي'),
      description: t('Get AI-driven advice for specific diets (Keto, Vegan, Gluten-Free, etc.)', 'احصل على نصائح مدعومة بالذكاء الاصطناعي لأنظمة غذائية محددة (كيتو، نباتي، خالي من الغلوتين، إلخ.)'),
      path: '/ai/dietary-advisor',
    },
    {
      icon: <Dumbbell className="h-8 w-8 text-red-500" />,
      title: t('Fitness & Nutrition Coach', 'مدرب اللياقة والتغذية'),
      description: t('AI guidance for fitness goals, calorie tracking, and macros', 'توجيهات الذكاء الاصطناعي لأهداف اللياقة البدنية، تتبع السعرات الحرارية، والمغذيات الكبرى'),
      path: '/ai/fitness-coach',
    },
    // --- NEW AI Features ---
    {
      icon: <Smile className="h-8 w-8 text-pink-500" />,
      title: t('Mood-Based Recipes', 'وصفات حسب الحالة المزاجية'),
      description: t('Get recipe suggestions tailored to your current mood.', 'احصل على اقتراحات وصفات مصممة خصيصًا لحالتك المزاجية الحالية.'),
      path: '/ai/mood-recipes',
    },
    {
      icon: <Brain className="h-8 w-8 text-indigo-500" />, // Reusing Brain, or find another relevant icon
      title: t('Smart Recipe Adaptation', 'التكيف الذكي للوصفات'),
      description: t('Adapt recipes for allergies, equipment, or ingredient substitutions.', 'تكييف الوصفات للحساسية، المعدات، أو بدائل المكونات.'),
      path: '/ai/smart-adaptation',
    },
    {
      icon: <Mic className="h-8 w-8 text-cyan-500" />,
      title: t('Voice Recipe Assistant', 'مساعد الوصفات الصوتي'),
      description: t('Hands-free cooking with voice-controlled instructions and tips.', 'الطبخ بدون استخدام اليدين مع تعليمات ونصائح يتم التحكم فيها بالصوت.'),
      path: '/ai/voice-assistant',
    },
  ];

  return (
    <PageContainer header={{ title: t('AI Features', 'ميزات الذكاء الاصطناعي'), showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-6 rounded-lg text-white text-center mb-6">
          <Sparkles className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('AI-Powered Features', 'الميزات المدعومة بالذكاء الاصطناعي')}</h1>
          <p className="opacity-90">{t('Discover intelligent cooking assistance designed to make your life easier and healthier.', 'اكتشف المساعدة الذكية في الطبخ المصممة لجعل حياتك أسهل وأكثر صحة.')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Link to={feature.path} key={index}>
              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.03] h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
