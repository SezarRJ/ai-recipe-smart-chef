
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Play, Download } from 'lucide-react';

interface HeroProps {
  language: string;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'AI-Powered Culinary Intelligence',
      subtitle: 'Discover, Plan, and Cook with Global Flavors',
      description: 'Transform your cooking journey with personalized meal planning, smart recipe recommendations, and multilingual culinary guidance.',
      watchDemo: 'Watch Demo',
      downloadApp: 'Download App',
      stats: {
        recipes: '50K+ Recipes',
        cuisines: '150+ Cuisines',
        users: '2M+ Users'
      }
    },
    ar: {
      title: 'ذكاء الطبخ المدعوم بالذكاء الاصطناعي',
      subtitle: 'اكتشف واخطط واطبخ بنكهات عالمية',
      description: 'حول رحلة الطبخ الخاصة بك مع التخطيط الشخصي للوجبات وتوصيات الوصفات الذكية والإرشاد الطهوي متعدد اللغات.',
      watchDemo: 'شاهد العرض',
      downloadApp: 'تحميل التطبيق',
      stats: {
        recipes: '50 ألف+ وصفة',
        cuisines: '150+ مطبخ',
        users: '2 مليون+ مستخدم'
      }
    },
    fr: {
      title: 'Intelligence Culinaire Alimentée par l\'IA',
      subtitle: 'Découvrez, Planifiez et Cuisinez avec des Saveurs Mondiales',
      description: 'Transformez votre parcours culinaire avec une planification personnalisée des repas, des recommandations de recettes intelligentes et des conseils culinaires multilingues.',
      watchDemo: 'Voir la Démo',
      downloadApp: 'Télécharger l\'App',
      stats: {
        recipes: '50K+ Recettes',
        cuisines: '150+ Cuisines',
        users: '2M+ Utilisateurs'
      }
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-5 w-5 text-orange-600" />
            <span className="text-orange-700 font-medium">New: AI Recipe Scanner</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl text-gray-600 mb-6 font-medium">
            {t.subtitle}
          </h2>

          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Download className="mr-2 h-5 w-5" />
              {t.downloadApp}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              <Play className="mr-2 h-5 w-5" />
              {t.watchDemo}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{t.stats.recipes}</div>
              <div className="text-gray-600">Global Recipes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{t.stats.cuisines}</div>
              <div className="text-gray-600">World Cuisines</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">{t.stats.users}</div>
              <div className="text-gray-600">Happy Cooks</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
