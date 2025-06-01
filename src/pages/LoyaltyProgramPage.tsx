import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Crown, 
  Gift, 
  Star, 
  Trophy, 
  Zap, 
  Lock,
  CheckCircle,
  Calendar,
  Share2,
  ChefHat,
  Users
} from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  isClaimed: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  pointsAwarded: number;
  isCompleted: boolean;
}

interface UserData {
  currentTier: string;
  totalPoints: number;
  pointsToNextTier: number;
}

const mockRewards: Reward[] = [
  {
    id: 'reward1',
    title: 'Free Recipe Download',
    description: 'Download any premium recipe for free.',
    pointsCost: 500,
    isClaimed: false,
  },
  {
    id: 'reward2',
    title: '20% Off Next Order',
    description: 'Get 20% off your next subscription payment.',
    pointsCost: 1000,
    isClaimed: false,
  },
  {
    id: 'reward3',
    title: 'Exclusive Chef Hat',
    description: 'Receive a limited edition Wasfah chef hat.',
    pointsCost: 2000,
    isClaimed: false,
  },
];

const mockChallenges: Challenge[] = [
  {
    id: 'challenge1',
    title: 'Daily Login',
    description: 'Log in to the app every day for a week.',
    pointsAwarded: 100,
    isCompleted: false,
  },
  {
    id: 'challenge2',
    title: 'Share a Recipe',
    description: 'Share a recipe with the community.',
    pointsAwarded: 200,
    isCompleted: false,
  },
  {
    id: 'challenge3',
    title: 'Create a Meal Plan',
    description: 'Create a meal plan for the week.',
    pointsAwarded: 300,
    isCompleted: false,
  },
];

const mockUserData: UserData = {
  currentTier: 'Bronze',
  totalPoints: 750,
  pointsToNextTier: 250,
};

const LoyaltyProgramPage = () => {
  const { toast } = useToast();
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const handleRewardRedeem = (reward: Reward) => {
    if (reward.pointsCost > mockUserData.totalPoints) {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.pointsCost - mockUserData.totalPoints} more points to redeem this reward.`,
        variant: "destructive",
      });
      return;
    }

    if (reward.isClaimed) {
      toast({
        title: "Already Claimed",
        description: "You have already claimed this reward.",
        variant: "default",
      });
      return;
    }

    // Simulate reward redemption
    setClaimedRewards(prev => [...prev, reward.id]);
    toast({
      title: "Reward Redeemed!",
      description: `Successfully redeemed: ${reward.title}`,
      variant: "default", // Changed from "success" to fix the error
    });
  };

  const handleChallengeComplete = (challenge: Challenge) => {
    if (challenge.isCompleted) {
      toast({
        title: "Already Completed",
        description: "You have already completed this challenge.",
        variant: "default",
      });
      return;
    }

    // Simulate challenge completion
    setCompletedChallenges(prev => [...prev, challenge.id]);
    toast({
      title: "Challenge Completed!",
      description: `Awarded ${challenge.pointsAwarded} points for completing: ${challenge.title}`,
      variant: "default",
    });
  };

  const calculateTierProgress = () => {
    const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];
    const tierPoints = [0, 1000, 3000, 5000]; // Points required for each tier
    const currentPoints = mockUserData.totalPoints;

    let currentTierIndex = 0;
    while (currentTierIndex < tiers.length - 1 && currentPoints >= tierPoints[currentTierIndex + 1]) {
      currentTierIndex++;
    }

    const currentTier = tiers[currentTierIndex];
    const nextTierIndex = Math.min(currentTierIndex + 1, tiers.length - 1);
    const nextTier = tiers[nextTierIndex];
    const pointsToNextTier = tierPoints[nextTierIndex] - currentPoints;

    let progress = 0;
    if (nextTierIndex > currentTierIndex) {
      progress = Math.min(1, (currentPoints - tierPoints[currentTierIndex]) / (tierPoints[nextTierIndex] - tierPoints[currentTierIndex]));
    } else {
      progress = 1; // Already at the highest tier
    }

    return { currentTier, nextTier, pointsToNextTier, progress };
  };

  const { currentTier, nextTier, pointsToNextTier, progress } = calculateTierProgress();

  return (
    <PageContainer header={{ title: 'Loyalty Program', showBackButton: true }}>
      <div className="space-y-6">
        {/* User Tier and Points Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span>{currentTier} Tier</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Total Points: {mockUserData.totalPoints}</p>
              <p className="text-sm text-gray-500">
                {currentTier === 'Platinum' ? 'Max Tier Reached!' : `${pointsToNextTier} points to ${nextTier} Tier`}
              </p>
              <Progress value={progress * 100} />
            </div>
            {currentTier !== 'Platinum' && (
              <Button variant="outline">
                Learn More About Tiers
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Rewards Section */}
        <Card>
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRewards.map(reward => (
              <div key={reward.id} className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{reward.title}</h3>
                  <p className="text-sm text-gray-500">{reward.description}</p>
                  <p className="text-sm text-gray-500">
                    <Star className="inline-block h-4 w-4 mr-1" />
                    {reward.pointsCost} Points
                  </p>
                </div>
                <Button
                  onClick={() => handleRewardRedeem(reward)}
                  disabled={reward.pointsCost > mockUserData.totalPoints || claimedRewards.includes(reward.id)}
                  variant="secondary"
                >
                  {claimedRewards.includes(reward.id) ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Claimed
                    </>
                  ) : (
                    'Redeem'
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Challenges Section */}
        <Card>
          <CardHeader>
            <CardTitle>Earn More Points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockChallenges.map(challenge => (
              <div key={challenge.id} className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{challenge.title}</h3>
                  <p className="text-sm text-gray-500">{challenge.description}</p>
                  <p className="text-sm text-gray-500">
                    <Zap className="inline-block h-4 w-4 mr-1" />
                    {challenge.pointsAwarded} Points
                  </p>
                </div>
                <Button
                  onClick={() => handleChallengeComplete(challenge)}
                  disabled={completedChallenges.includes(challenge.id)}
                  variant="outline"
                >
                  {completedChallenges.includes(challenge.id) ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    'Complete'
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default LoyaltyProgramPage;
