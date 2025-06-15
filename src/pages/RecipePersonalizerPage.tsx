
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Sparkles, Utensils } from "lucide-react";
import { useRTL } from "@/contexts/RTLContext";

const RecipePersonalizerPage = () => {
  const { t } = useRTL();
  return (
    <MobileLayout header={{ title: t("Recipe Personalization", "تخصيص الوصفات"), showBackButton: true }}>
      <div className="flex flex-col gap-6 items-center justify-center py-16">
        <Utensils className="h-16 w-16 text-wasfah-bright-teal" />
        <h2 className="text-2xl font-bold text-wasfah-deep-teal">{t("Coming Soon", "قريباً")}</h2>
        <p className="text-gray-600 text-center">
          {t("Recipe personalization features will launch here soon.", "ميزات تخصيص الوصفات ستتوفر هنا قريباً.")}
        </p>
      </div>
    </MobileLayout>
  );
};

export default RecipePersonalizerPage;
