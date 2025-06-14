
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
        <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-400/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 bg-orange-400/20 rounded-full blur-md"></div>
        
        <div className={`p-3 relative ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-1 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center mb-1 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Crown className="h-4 w-4 text-yellow-600 mr-2" />
                <h3 className="text-sm font-bold text-gray-900">
                  {t("Unlock Premium Features", "اكتشف الميزات المميزة")}
                </h3>
              </div>
              <div className={`flex items-center space-x-2 text-xs text-gray-500 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                <div className={`flex items-center ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Sparkles className="h-2.5 w-2.5 mr-1 text-yellow-500" />
                  <span>{t("AI Features", "ميزات الذكاء الاصطناعي")}</span>
                </div>
                <div className={`flex items-center ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Sparkles className="h-2.5 w-2.5 mr-1 text-orange-500" />
                  <span>{t("Premium Recipes", "وصفات مميزة")}</span>
                </div>
              </div>
            </div>
            
            <div className={`flex items-center ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold shadow-md text-xs px-2 py-1 h-6"
              >
                {t("Upgrade Now", "ترقية الآن")}
              </Button>
              <ChevronRight className={`h-3 w-3 text-orange-500 ml-1 transition-transform duration-300 group-hover:translate-x-1 ${direction === 'rtl' ? 'rotate-180 mr-1 ml-0' : ''}`} />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
