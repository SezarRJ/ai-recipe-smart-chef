
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Shield } from "lucide-react";

const PrivacyPage = () => (
  <MobileLayout header={{ title: "Privacy & Security", showBackButton: true }}>
    <div className="py-6 max-w-lg mx-auto flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Shield className="text-wasfah-bright-teal" size={28} />
        <span className="text-xl font-semibold">Privacy & Security</span>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-gray-700 space-y-2">
        <p>
          We respect your privacy. Your data is stored securely and can be deleted anytime from your profile settings.
        </p>
        <p>
          For more details, see our <a href="/privacy-policy" className="text-wasfah-bright-teal underline">Privacy Policy</a>.
        </p>
      </div>
      <div className="text-xs text-gray-400">
        You control your cookies, personalized content and data sharing from your application settings.
      </div>
    </div>
  </MobileLayout>
);

export default PrivacyPage;
