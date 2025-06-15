
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { HelpCircle, Mail, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const HelpPage = () => (
  <MobileLayout header={{ title: "Help & Support", showBackButton: true }}>
    <div className="py-8 px-4 flex flex-col items-center space-y-7">
      <div className="flex items-center gap-2 text-center">
        <HelpCircle className="text-wasfah-bright-teal" size={32} />
        <span className="text-2xl font-semibold">Help & Support</span>
      </div>
      <div className="bg-white rounded-lg p-4 shadow w-full max-w-lg">
        <div className="mb-2 font-medium text-wasfah-deep-teal">Frequently Asked Questions</div>
        <ul className="list-disc ml-4 text-sm text-gray-700">
          <li>How to recover my account?</li>
          <li>How to contact support?</li>
          <li>Where to see saved recipes?</li>
        </ul>
      </div>
      <div className="bg-white rounded-lg p-4 shadow w-full max-w-lg flex flex-col gap-3">
        <div className="flex items-center text-gray-700 gap-2">
          <Mail size={18} /> Email: <a className="underline text-wasfah-bright-teal" href="mailto:support@wasfah.app">support@wasfah.app</a>
        </div>
        <div className="flex items-center text-gray-700 gap-2">
          <Info size={18} /> Our team will get back to you within 24 hours.
        </div>
        <Button variant="default" className="mt-2 w-full">Contact Support</Button>
      </div>
    </div>
  </MobileLayout>
);

export default HelpPage;
