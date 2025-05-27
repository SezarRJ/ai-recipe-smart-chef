// useUserHealth.js
import { useState } from 'react';

export const useUserHealth = () => {
  const [isHealthGoalsOpen, setIsHealthGoalsOpen] = useState(false);
  const [userWeight, setUserWeight] = useState(70);
  const [userHeight, setUserHeight] = useState(170);
  const [userTargetWeight, setUserTargetWeight] = useState(65);

  return {
    isHealthGoalsOpen,
    setIsHealthGoalsOpen,
    userWeight,
    setUserWeight,
    userHeight,
    setUserHeight,
    userTargetWeight,
    setUserTargetWeight,
  };
};
