
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  Camera, Scale, Smartphone, Award, Gift, CreditCard, ShoppingCart,
  Activity, Heart, Book, Bot, Utensils, Users, MapPin,
  PlusCircle, Share2, Archive, History // Added History icon
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export default function ServicesPage() {
  const { t } = useRTL();

  // Define the list of IDs to remove
  const idsToRemove = [
    'loyalty-program',
    'subscription',
  ];

  // Define the new services to add
  const newServices = [
      {
          id: 'create-recipe',
          icon: <PlusCircle className="h-6 w-6 text-green-600" />, // Using PlusCircle icon
          title: t('Create Recipe', 'إنشاء وصفة', 'Tarif Oluştur'),
          description: t('Add your own recipes to the app', 'أضف وصفاتك الخاصة إلى التطبيق', 'Kendi tariflerinizi uygulamaya ekleyin'),
          link: '/create-recipe', // Placeholder link
      },
      {
          id: 'share-recipe',
          icon: <Share2 className="h-6 w-6 text-blue-500" />, // Using Share2 icon
          title: t('Share Recipe', 'مشاركة وصفة', 'Tarif Paylaş'),
          description: t('Share your favorite recipes with others', 'شارك وصفاتك المفضلة مع الآخرين', 'Favori tariflerinizi başkalarıyla paylaşın'),
          link: '/shared-recipes', // Updated to point to shared recipes page
      },
      {
          id: 'smart-pantry',
          icon: <Archive className="h-6 w-6 text-amber-600" />, // Using Archive icon
          title: t('Smart Pantry', 'مخزن ذكي', 'Akıllı Kiler'),
          description: t('Manage your ingredients and find recipes', 'إدارة مكوناتك والعثور على الوصفات', 'Malzemelerinizi yönetin ve tarif bulun'),
          link: '/smart-pantry',
      },
      {
          id: 'cooking-history',
          icon: <History className="h-6 w-6 text-purple-600" />, // Using History icon
          title: t('Cooking History', 'سجل الطبخ', 'Pişirme Geçmişi'),
          description: t('View your cooked and saved recipes', 'عرض وصفاتك المطبوخة والمحفوظة', 'Pişirdiğiniz ve kaydettiğiniz tarifleri görün'),
          link: '/cooking-history',
      },
  ];


  const services = [
    {
      id: 'scan-dish',
      icon: <Camera className="h-6 w-6 text-green-500" />,
      title: t('Scan Dish', 'مسح طبق', 'Yemek Tara'),
      description: t('Identify dishes and get recipes', 'تحديد الأطباق والحصول على الوصفات', 'Yemekleri tanımlayın ve tarif alın'),
      link: '/scan-dish',
    },
    {
      id: 'scan-ingredients',
      icon: <Camera className="h-6 w-6 text-amber-500" />,
      title: t('Scan Ingredients', 'مسح المكونات', 'Malzeme Tara'),
      description: t('Scan ingredients to find recipes', 'مسح المكونات للعثور على الوصفات', 'Tarif bulmak için malzemeleri tarayın'),
      link: '/scan-ingredients',
    },
    {
      id: 'body-information',
      icon: <Scale className="h-6 w-6 text-blue-500" />,
      title: t('Body Information', 'معلومات الجسم', 'Vücut Bilgisi'),
      description: t('Track your body metrics', 'تتبع مقاييس جسمك', 'Vücut ölçümlerinizi takip edin'),
      link: '/body-information',
    },
    {
      id: 'health-tracking',
      icon: <Activity className="h-6 w-6 text-red-500" />,
      title: t('Health Tracking', 'تتبع الصحة', 'Sağlık Takibi'),
      description: t('Monitor your health and nutrition', 'مراقبة صحتك وتغذيتك', 'Sağlığınızı ve beslenmenizi izleyin'),
      link: '/health-tracking-home',
    },
    {
      id: 'ai-chef',
      icon: <Bot className="h-6 w-6 text-purple-500" />,
      title: t('AI Chef Assistant', 'مساعد الطاهي الذكي', 'AI Şef Asistanı'),
      description: t('Get personalized cooking advice', 'احصل على نصائح طبخ شخصية', 'Kişiselleştirilmiş yemek tavsiyeleri alın'),
      link: '/ai-chef',
    },
    {
      id: 'meal-planning',
      icon: <Utensils className="h-6 w-6 text-wasfah-deep-teal" />,
      title: t('Meal Planning', 'تخطيط الوجبات', 'Öğün Planlama'),
      description: t('Plan your weekly meals', 'خطط وجباتك الأسبوعية', 'Haftalık öğünlerinizi planlayın'),
      link: '/meal-plan',
    },
    {
      id: 'shopping-list',
      icon: <ShoppingCart className="h-6 w-6 text-wasfah-bright-teal" />,
      title: t('Smart Shopping List', 'قائمة التسوق الذكية', 'Akıllı Alışveriş Listesi'),
      description: t('Generate shopping lists from recipes', 'إنشاء قوائم التسوق من الوصفات', 'Tariflerden alışveriş listeleri oluşturun'),
      link: '/shopping-list',
    },
    {
      id: 'loyalty-program', // This will be filtered out
      icon: <Award className="h-6 w-6 text-amber-500" />,
      title: t('Loyalty Program', 'برنامج الولاء', 'Sadakat Programı'),
      description: t('Earn rewards for cooking', 'اكسب مكافآت للطبخ', 'Yemek yaparak ödül kazanın'),
      link: '/loyalty-program',
    },
    {
      id: 'subscription', // This will be filtered out
      icon: <CreditCard className="h-6 w-6 text-purple-500" />,
      title: t('Premium Subscription', 'الاشتراك المميز', 'Premium Abonelik'),
      description: t('Unlock premium features', 'فتح الميزات المميزة', 'Premium özelliklerin kilidini açın'),
      link: '/subscription',
    },
    {
      id: 'connected-devices',
      icon: <Smartphone className="h-6 w-6 text-green-600" />,
      title: t('Connected Devices', 'الأجهزة المتصلة', 'Bağlı Cihazlar'),
      description: t('Sync with your smart devices', 'مزامنة مع أجهزتك الذكية', 'Akıllı cihazlarınızla senkronize edin'),
      link: '/connected-devices',
    },
    {
      id: 'community',
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: t('Community', 'المجتمع', 'Topluluk'),
      description: t('Connect with other food lovers', 'تواصل مع عشاق الطعام الآخرين', 'Diğer yemek severleriyle bağlantı kurun'),
      link: '/community',
    },
    {
      id: 'global-cuisine',
      icon: <MapPin className="h-6 w-6 text-orange-500" />,
      title: t('Global Cuisine', 'المأكولات العالمية', 'Küresel Mutfak'),
      description: t('Explore cuisines from around the world', 'استكشف المأكولات من جميع أنحاء العالم', 'Dünyanın her yerinden mutfakları keşfedin'),
      link: '/global-cuisine',
    },
  ]
  .filter(service => !idsToRemove.includes(service.id)) // Remove specified items
  .concat(newServices); // Add the new items


  return (
    <PageContainer header={{ title: t('Services', 'الخدمات', 'Hizmetler'), showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{t('Our Services', 'خدماتنا', 'Hizmetlerimiz')}</h1>
          <p className="opacity-90">{t('Discover all the amazing features WasfahAI has to offer', 'اكتشف جميع الميزات المذهلة التي تقدمها وصفة الذكية', 'WasfahAI\'nin sunduğu tüm harika özellikleri keşfedin')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link to={service.link} key={service.id}>
              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.03] h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
