
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, ChevronRight, Star } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export const LoyaltyCard: React.FC = () => {
  const { t, direction } = useRTL();
  const [progress, setProgress] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(56.6);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link to="/loyalty">
      <Card className="border-2 border-wasfah-bright-teal/20 hover:border-wasfah-bright-teal/40 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-r from-wasfah-bright-teal/5 to-wasfah-teal/5 animate-fade-in">
        <CardContent className="p-6">
          <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className="w-14 h-14 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-teal rounded-2xl flex items-center justify-center mr-4 animate-pulse">
                <Award className="h-7 w-7 text-white" />
              </div>
              <div className={direction === 'rtl' ? 'text-right' : 'text-left'}>
                <div className="text-lg font-bold text-wasfah-deep-teal mb-1">
                  {t("Gold Level Member", "عضو المستوى الذهبي")}
                </div>
                <div className={`flex items-center gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-600">
                    {t("850 points", "850 نقطة")}
                  </span>
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className={direction === 'rtl' ? 'text-left' : 'text-right'}>
                <div className="text-xs font-medium text-gray-600 mb-1">
                  {t("Next level", "المستوى التالي")}
                </div>
                <Progress 
                  value={progress} 
                  className="w-24 h-2 transition-all duration-1000 ease-out" 
                />
                <div className="text-xs text-gray-500 mt-1">
                  {t("57%", "57%")}
                </div>
              </div>
              <ChevronRight className={`h-5 w-5 text-wasfah-bright-teal transition-transform duration-300 group-hover:translate-x-1 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
