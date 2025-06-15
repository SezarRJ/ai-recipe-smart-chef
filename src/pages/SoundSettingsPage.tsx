
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Volume2, VolumeX } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const SoundSettingsPage = () => (
  <MobileLayout header={{ title: "Sound Settings", showBackButton: true }}>
    <div className="max-w-lg mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Volume2 className="text-wasfah-bright-teal" size={26} />
        <span className="text-xl font-semibold">Sound & Notifications</span>
      </div>
      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span>Enable Sound Effects</span>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span>Vibrate on Alerts</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>Mute All Sounds</span>
          <Switch />
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
        <VolumeX size={16} /> Control the sound and vibration settings for recipe steps and alerts.
      </div>
    </div>
  </MobileLayout>
);

export default SoundSettingsPage;
