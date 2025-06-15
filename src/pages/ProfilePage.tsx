
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { UserRound, Mail, CalendarDays } from "lucide-react";

const ProfilePage = () => (
  <MobileLayout header={{ title: "Profile", showBackButton: true }}>
    <div className="flex flex-col items-center space-y-6 py-8">
      <div className="w-24 h-24 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-orange rounded-full flex items-center justify-center shadow">
        <UserRound size={52} className="text-white" />
      </div>
      <div className="text-center space-y-2">
        <div className="text-2xl font-bold text-wasfah-deep-teal">User Name</div>
        <div className="flex items-center justify-center text-gray-600 gap-2">
          <Mail size={18} /> user@example.com
        </div>
        <div className="flex items-center justify-center text-gray-400 gap-2 text-sm">
          <CalendarDays size={15} /> Member since 2024
        </div>
      </div>
      <div className="w-full bg-white rounded-lg shadow-sm p-4 space-y-2">
        <div className="font-normal text-gray-700">
          Welcome to your profile! Here you can track your recipes, favorites, and update account details.
        </div>
      </div>
    </div>
  </MobileLayout>
);

export default ProfilePage;
