
import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Star, Star as StarEmpty } from "lucide-react";
import { Button } from "@/components/ui/button";

const RateAppPage = () => {
  const [rating, setRating] = useState(0);
  const [given, setGiven] = useState(false);

  return (
    <MobileLayout header={{ title: "Rate App", showBackButton: true }}>
      <div className="flex flex-col items-center py-10 px-4 space-y-8">
        <div className="flex items-center gap-2 text-center">
          <Star size={32} className="text-wasfah-orange" />
          <span className="text-2xl font-bold text-wasfah-deep-teal">Share Your Feedback</span>
        </div>
        <div className="text-gray-600 mb-2 text-center">
          How would you rate your experience with our app? We value your feedback!
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => setRating(n)}
              className={`rounded-full transition p-2 ${rating >= n ? "bg-wasfah-orange/90 text-white" : "bg-gray-200 text-gray-400"}`}
              aria-label={`Rate ${n} star`}
            >
              <Star />
            </button>
          ))}
        </div>
        <Button
          className="mt-4 w-48"
          disabled={rating === 0 || given}
          onClick={() => setGiven(true)}
        >
          {given ? "Thanks for your rating!" : "Submit"}
        </Button>
      </div>
    </MobileLayout>
  );
};

export default RateAppPage;
