
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ShoppingCart } from "lucide-react";
import { useRTL } from "@/contexts/RTLContext";

const SmartShoppingListsPage = () => {
  const { t } = useRTL();
  return (
    <MobileLayout header={{ title: t("Smart Shopping Lists", "قوائم التسوق الذكية"), showBackButton: true }}>
      <div className="flex flex-col gap-6 items-center justify-center py-16">
        <ShoppingCart className="h-16 w-16 text-wasfah-bright-teal" />
        <h2 className="text-2xl font-bold text-wasfah-deep-teal">{t("Coming Soon", "قريباً")}</h2>
        <p className="text-gray-600 text-center">
          {t("Smart shopping lists powered by AI will be live soon.", "قوائم التسوق الذكية بالذكاء الاصطناعي ستتوفر قريباً.")}
        </p>
      </div>
    </MobileLayout>
  );
};

export default SmartShoppingListsPage;
