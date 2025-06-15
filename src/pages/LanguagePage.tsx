
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Globe } from "lucide-react";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' }
];

const LanguagePage = () => (
  <MobileLayout header={{ title: "Language", showBackButton: true }}>
    <div className="max-w-lg mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Globe className="text-wasfah-bright-teal" size={28} />
        <span className="text-xl font-semibold">App Language</span>
      </div>
      <div className="bg-white rounded-lg shadow p-4 space-y-2">
        {languages.map(lang => (
          <div className="flex items-center justify-between py-2 px-1" key={lang.code}>
            <span>{lang.name}</span>
            <input type="radio" name="language" value={lang.code} />
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500">
        Change your preferred language for the app interface. More languages coming soon!
      </div>
    </div>
  </MobileLayout>
);

export default LanguagePage;
