
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ScanDishComponent } from "@/components/dish/ScanDishComponent";
import { useRTL } from "@/contexts/RTLContext";

const ScanDishPage = () => {
  const { t } = useRTL();
  return (
    <MobileLayout header={{ title: t("Visual Recipe Search", "البحث المرئي للوصفات"), showBackButton: true }}>
      <div className="p-4">
        <ScanDishComponent />
      </div>
    </MobileLayout>
  );
};

export default ScanDishPage;
