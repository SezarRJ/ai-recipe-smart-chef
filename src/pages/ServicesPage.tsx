import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, ShoppingCart, Calendar, Users, 
  Clock, MapPin, Star, Crown 
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const ServicesPage = () => {
  const { t, direction } = useRTL();

  const services = [
    {
      icon: ShoppingCart,
      title: t("Smart Shopping Lists", "قوائم التسوق الذكية"),
      description: t("AI-generated shopping lists from your recipes", "قوائم تسوق مُولدة بالذكاء الاصطناعي من وصفاتك"),
      price: t("Free", "مجاني"),
      premium: false
    },
    {
      icon: Calendar,
      title: t("Meal Planning Service", "خدمة تخطيط الوجبات"),
      description: t("Get personalized weekly meal plans from AI", "احصل على خطط وجبات أسبوعية مخصصة من الذكاء الاصطناعي"),
      price: t("$9.99/month", "9.99$/شهر"),
      premium: true
    }
  ];

  return (
    <MobileLayout
      header={{
        title: t("Services", "الخدمات"),
        showBackButton: true
      }}
    >
      <div className={`space-y-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-teal rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t("Premium Services", "الخدمات المميزة")}
          </h2>
          <p className="text-gray-600 text-sm">
            {t("Enhance your cooking experience with our services", "عزز تجربة الطبخ مع خدماتنا")}
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-3">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-wasfah-bright-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-6 w-6 text-wasfah-bright-teal" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{service.title}</h3>
                      {service.premium && (
                        <Badge variant="outline" className="text-xs">
                          <Crown className="h-3 w-3 mr-1" />
                          {t("Premium", "مميز")}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-wasfah-bright-teal">
                        {service.price}
                      </span>
                      <Button 
                        size="sm" 
                        className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                      >
                        {service.premium 
                          ? t("Subscribe", "اشترك") 
                          : t("Get Started", "ابدأ")
                        }
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Service */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t("Local Partner Restaurants", "المطاعم الشريكة المحلية")}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {t("Order ingredients or ready meals from local restaurants", "اطلب المكونات أو الوجبات الجاهزة من المطاعم المحلية")}
            </p>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              {t("Find Restaurants", "اعثر على المطاعم")}
            </Button>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-wasfah-bright-teal/10 to-wasfah-mint/10 border-wasfah-bright-teal/20">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t("Need Help?", "تحتاج مساعدة؟")}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {t("Contact our support team for assistance", "اتصل بفريق الدعم للمساعدة")}
            </p>
            <Button variant="outline" className="border-wasfah-bright-teal text-wasfah-bright-teal">
              {t("Contact Support", "اتصل بالدعم")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default ServicesPage;
