
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Mic, Sparkles } from "lucide-react";
import { useRTL } from "@/contexts/RTLContext";

const VoiceAssistantPage = () => {
  const { t } = useRTL();
  return (
    <MobileLayout header={{ title: t("Voice Assistant", "المساعد الصوتي"), showBackButton: true }}>
      <div className="flex flex-col gap-6 items-center justify-center py-16">
        <Mic className="h-16 w-16 text-wasfah-bright-teal" />
        <h2 className="text-2xl font-bold text-wasfah-deep-teal">{t("Coming Soon", "قريباً")}</h2>
        <p className="text-gray-600 text-center">
          {t("Voice search and command features will be available here soon.", "ميزات البحث الصوتي والتحكم ستتوفر هنا قريباً.")}
        </p>
      </div>
    </MobileLayout>
  );
};

export default VoiceAssistantPage;
