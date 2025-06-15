
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const AppearancePage = () => (
  <MobileLayout header={{ title: "Appearance", showBackButton: true }}>
    <div className="max-w-lg mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Sun className="text-wasfah-bright-teal" size={26} />
        <Moon className="text-wasfah-orange" size={24} />
        <span className="text-xl font-semibold">Theme</span>
      </div>
      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span>Light Mode</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>Auto (System)</span>
          <Switch defaultChecked />
        </div>
      </div>
      <div className="text-xs text-gray-500">
        Adjust how the app looks. Choose Light, Dark, or use the device default.
      </div>
    </div>
  </MobileLayout>
);

export default AppearancePage;
