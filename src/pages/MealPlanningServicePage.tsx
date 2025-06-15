
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Calendar } from "lucide-react";
import { useRTL } from "@/contexts/RTLContext";

const MealPlanningServicePage = () => {
  const { t } = useRTL();
  return (
    <MobileLayout header={{ title: t("Meal Planning Service", "خدمة تخطيط الوجبات"), showBackButton: true }}>
      <div className="flex flex-col gap-6 items-center justify-center py-16">
        <Calendar className="h-16 w-16 text-wasfah-bright-teal" />
        <h2 className="text-2xl font-bold text-wasfah-deep-teal">{t("Coming Soon", "قريباً")}</h2>
        <p className="text-gray-600 text-center">
          {t("AI powered meal planning will be available here soon.", "تخطيط الوجبات بالذكاء الاصطناعي قريبا متوفر هنا.")}
        </p>
      </div>
    </MobileLayout>
  );
};

export default MealPlanningServicePage;
