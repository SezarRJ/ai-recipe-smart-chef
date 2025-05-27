
import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Globe, Smartphone, BarChart3, ShoppingCart, Clock } from 'lucide-react';

interface FeaturesProps {
  language: string;
}

export const Features: React.FC<FeaturesProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Intelligent Culinary Features',
      subtitle: 'Discover the power of AI-driven cooking assistance',
      features: [
        {
          icon: Brain,
          title: 'Smart Meal Planning',
          description: 'AI-generated personalized meal plans based on your dietary preferences, restrictions, and health goals.'
        },
        {
          icon: Globe,
          title: 'Multi-language Support',
          description: 'Fully localized experience for global users with support for 50+ languages and regional cuisines.'
        },
        {
          icon: Smartphone,
          title: 'Cross-Platform Apps',
          description: 'Native mobile apps for iOS & Android with seamless sync across all your devices.'
        },
        {
          icon: BarChart3,
          title: 'Health Tracking',
          description: 'Monitor nutritional intake and track your health goals with detailed analytics and insights.'
        },
        {
          icon: ShoppingCart,
          title: 'Smart Shopping',
          description: 'Automated grocery lists from selected recipes with local store integration and price comparison.'
        },
        {
          icon: Clock,
          title: 'Meal Prep Tools',
          description: 'Time-saving cooking modes with step-by-step guides and preparation scheduling.'
        }
      ]
    },
    ar: {
      title: 'ميزات الطهي الذكية',
      subtitle: 'اكتشف قوة مساعدة الطبخ المدعومة بالذكاء الاصطناعي',
      features: [
        {
          icon: Brain,
          title: 'التخطيط الذكي للوجبات',
          description: 'خطط وجبات شخصية مولدة بالذكاء الاصطناعي بناءً على تفضيلاتك الغذائية وقيودك وأهدافك الصحية.'
        },
        {
          icon: Globe,
          title: 'دعم متعدد اللغات',
          description: 'تجربة محلية كاملة للمستخدمين العالميين مع دعم أكثر من 50 لغة ومأكولات إقليمية.'
        },
        {
          icon: Smartphone,
          title: 'تطبيقات متعددة المنصات',
          description: 'تطبيقات محمولة أصلية لأنظمة iOS و Android مع مزامنة سلسة عبر جميع أجهزتك.'
        },
        {
          icon: BarChart3,
          title: 'تتبع الصحة',
          description: 'راقب المدخول الغذائي وتتبع أهدافك الصحية مع التحليلات التفصيلية والرؤى.'
        },
        {
          icon: ShoppingCart,
          title: 'التسوق الذكي',
          description: 'قوائم بقالة تلقائية من الوصفات المختارة مع تكامل المتاجر المحلية ومقارنة الأسعار.'
        },
        {
          icon: Clock,
          title: 'أدوات تحضير الوجبات',
          description: 'أوضاع طبخ توفر الوقت مع أدلة خطوة بخطوة وجدولة التحضير.'
        }
      ]
    },
    fr: {
      title: 'Fonctionnalités Culinaires Intelligentes',
      subtitle: 'Découvrez la puissance de l\'assistance culinaire alimentée par l\'IA',
      features: [
        {
          icon: Brain,
          title: 'Planification Intelligente des Repas',
          description: 'Plans de repas personnalisés générés par IA basés sur vos préférences alimentaires, restrictions et objectifs de santé.'
        },
        {
          icon: Globe,
          title: 'Support Multi-langues',
          description: 'Expérience entièrement localisée pour les utilisateurs mondiaux avec support de 50+ langues et cuisines régionales.'
        },
        {
          icon: Smartphone,
          title: 'Applications Multi-plateformes',
          description: 'Applications mobiles natives pour iOS et Android avec synchronisation transparente sur tous vos appareils.'
        },
        {
          icon: BarChart3,
          title: 'Suivi de la Santé',
          description: 'Surveillez l\'apport nutritionnel et suivez vos objectifs de santé avec des analyses détaillées et des insights.'
        },
        {
          icon: ShoppingCart,
          title: 'Achats Intelligents',
          description: 'Listes d\'épicerie automatisées à partir des recettes sélectionnées avec intégration des magasins locaux et comparaison des prix.'
        },
        {
          icon: Clock,
          title: 'Outils de Préparation des Repas',
          description: 'Modes de cuisson économisant du temps avec des guides étape par étape et la planification de la préparation.'
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-orange-100 hover:border-orange-200"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
