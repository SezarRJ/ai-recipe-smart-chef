
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Settings } from "lucide-react";

const AppPreferencesPage = () => (
  <MobileLayout header={{ title: "App Preferences", showBackButton: true }}>
    <div className="max-w-lg mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Settings className="text-wasfah-bright-teal" size={26} />
        <span className="text-xl font-semibold">App Preferences</span>
      </div>
      <div className="bg-white rounded-lg shadow p-4 space-y-2">
        <div className="flex justify-between py-2 border-b">
          <span>Measurement Units</span>
          <select className="rounded px-2 py-1 border">
            <option>Metric (kg, ml)</option>
            <option>Imperial (lbs, oz)</option>
          </select>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>Default Home Page</span>
          <select className="rounded px-2 py-1 border">
            <option>Health Tracking</option>
            <option>Main Recipes</option>
            <option>Pantry</option>
          </select>
        </div>
        <div className="flex justify-between py-2">
          <span>Start Tips on Launch</span>
          <input type="checkbox" className="scale-125 ml-2" />
        </div>
      </div>
      <div className="text-xs text-gray-500">
        Customize how the app starts and works by default.
      </div>
    </div>
  </MobileLayout>
);

export default AppPreferencesPage;
