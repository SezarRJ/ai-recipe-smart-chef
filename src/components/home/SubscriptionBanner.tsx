
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Crown, Sparkles } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export const SubscriptionBanner: React.FC = () => {
  const { t, direction } = useRTL();

  return (
    <Link to="/subscription">
      <Card className="relative overflow-hidden border-2 border-gradient-to-r from-yellow-400 to-orange-500 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-orange-400/20 rounded-full blur-lg"></div>
        
        <div className={`p-6 relative ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-1 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center mb-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Crown className="h-6 w-6 text-yellow-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">
                  {t("Unlock Premium Features", "اكتشف الميزات المميزة")}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {t("Get access to exclusive recipes, AI nutrition advice, and personalized meal plans", "احصل على وصفات حصرية ونصائح غذائية بالذكاء الاصطناعي وخطط وجبات شخصية")}
              </p>
              <div className={`flex items-center space-x-4 text-xs text-gray-500 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                <div className={`flex items-center ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
                  <span>{t("AI Features", "ميزات الذكاء الاصطناعي")}</span>
                </div>
                <div className={`flex items-center ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Sparkles className="h-3 w-3 mr-1 text-orange-500" />
                  <span>{t("Premium Recipes", "وصفات مميزة")}</span>
                </div>
              </div>
            </div>
            
            <div className={`flex items-center ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold shadow-md"
              >
                {t("Upgrade Now", "ترقية الآن")}
              </Button>
              <ChevronRight className={`h-5 w-5 text-orange-500 ml-2 transition-transform duration-300 group-hover:translate-x-1 ${direction === 'rtl' ? 'rotate-180 mr-2 ml-0' : ''}`} />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
