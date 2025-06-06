
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps = 4
}) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex space-x-2">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              index + 1 <= currentStep
                ? 'bg-wasfah-bright-teal text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
