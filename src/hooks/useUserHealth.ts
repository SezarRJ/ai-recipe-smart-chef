
import { useState, useCallback } from 'react';

export interface HealthGoals {
  weight?: number;
  height?: number;
  targetWeight?: number;
}

export const useUserHealth = () => {
  const [isHealthGoalsOpen, setIsHealthGoalsOpen] = useState(false);
  const [userWeight, setUserWeight] = useState(75);
  const [userHeight, setUserHeight] = useState(170);
  const [userTargetWeight, setUserTargetWeight] = useState(65);

  const updateHealthGoals = useCallback(({ weight, height, targetWeight }: HealthGoals) => {
    if (weight !== undefined) setUserWeight(weight);
    if (height !== undefined) setUserHeight(height);
    if (targetWeight !== undefined) setUserTargetWeight(targetWeight);
  }, []);

  return {
    isHealthGoalsOpen,
    setIsHealthGoalsOpen,
    userWeight,
    setUserWeight,
    userHeight,
    setUserHeight,
    userTargetWeight,
    setUserTargetWeight,
    updateHealthGoals,
  };
};
