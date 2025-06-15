
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Bell, BellOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const NotificationsPage = () => (
  <MobileLayout header={{ title: "Notifications", showBackButton: true }}>
    <div className="max-w-lg mx-auto py-6 space-y-5">
      <div className="flex items-center gap-4 mb-3">
        <Bell className="text-wasfah-bright-teal" size={28} />
        <span className="text-xl font-semibold">Notifications Settings</span>
      </div>
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span>Push Notifications</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>Email Updates</span>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span>Recipe Alerts</span>
          <Switch />
        </div>
      </div>
      <div className="flex gap-2 text-sm text-gray-600 items-center">
        <BellOff size={18} /> You can control which notifications to receive about recipes, promotions, and reminders.
      </div>
    </div>
  </MobileLayout>
);

export default NotificationsPage;
