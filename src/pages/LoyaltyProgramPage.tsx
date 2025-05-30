import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Trophy, Crown, Zap, Check, ChefHat, Share2, Calendar, Users, Award, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { PageContainer } from '@/components/layout/PageContainer';
import { EnhancedCard, IconContainer, Typography, ProgressIndicator, AnimatedBadge, LayoutContainer } from '@/components/ui/design-system';
import { EnhancedButton } from '@/components/ui/enhanced-button';

// --- Mock Data (In a real app, this would come from your backend/database) ---
// Simulate fetching user data
const fetchUserData = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    points: 1250, // Example points
    tier: 'Gold', // Example tier
    claimedRewards: [1], // Example claimed reward IDs
    // In a real app, you might also fetch daily earning status here
    // earnedToday: ['Daily Login']
  };
};

// Simulate redeeming a reward
const redeemRewardApi = async (userId: string, rewardId: number, pointsCost: number) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real API, you'd check if the user has enough points,
    // deduct points, mark the reward as claimed for the user,
    // and return success/failure.
    console.log(`Simulating redemption for user ${userId}, reward ${rewardId}, cost ${pointsCost}`);
    // Simulate success
    return { success: true, newPoints: 1250 - pointsCost }; // Return updated points
};
// --------------------------------------------------------------------------


const LoyaltyProgramPage = () => {
  // State to hold fetched data
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [userTier, setUserTier] = useState<string | null>(null);
  const [claimedRewards, setClaimedRewards] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<number | null>(null); // Track which reward is being redeemed

  // In a real app, you'd get the current user ID from your auth context
  const currentUserId = 'user-123'; // Mock user ID

  const rewards = [
    {
      id: 1,
      name: 'Free Premium Recipe',
      points: 500,
      icon: Star,
      available: true,
      description: 'Unlock one premium recipe of your choice',
      rarity: 'common'
    },
    {
      id: 2,
      name: '10% Off Subscription',
      points: 1000,
      icon: Gift,
      available: true,
      description: 'Get 10% discount on your next subscription',
      rarity: 'rare'
    },
    {
      id: 3,
      name: 'Exclusive Recipe Collection',
      points: 1500,
      icon: Trophy,
      available: false, // Still marked as unavailable in mock
      description: 'Access to chef-curated recipe collections',
      rarity: 'epic'
    },
    {
      id: 4,
      name: 'Personal Chef Consultation',
      points: 2500,
      icon: Crown,
      available: false, // Still marked as unavailable in mock
      description: '30-minute one-on-one session with a professional chef',
      rarity: 'legendary'
    }
  ];

  // Activities are now just for display, explaining how to earn
  const activities = [
    { action: 'Daily Login', points: 10, description: 'Login to the app daily', icon: Calendar, color: 'bg-blue-500' },
    { action: 'Share Recipe', points: 50, description: 'Share a recipe with friends', icon: Share2, color: 'bg-green-500' },
    { action: 'Create Recipe', points: 100, description: 'Create and publish a new recipe', icon: ChefHat, color: 'bg-purple-500' },
    { action: 'Join Community', points: 75, description: 'Participate in community discussions', icon: Users, color: 'bg-orange-500' }
  ];

  const tierRequirements = {
    Bronze: 0,
    Silver: 1000,
    Gold: 2500,
    Platinum: 5000
  };

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchUserData(); // Simulate fetching from backend
        setUserPoints(data.points);
        setUserTier(data.tier);
        setClaimedRewards(data.claimedRewards);
      } catch (error) {
        console.error("Failed to fetch loyalty data:", error);
        toast.error("Failed to load loyalty data.");
        // Set default/fallback state on error
        setUserPoints(0);
        setUserTier('Bronze');
        setClaimedRewards([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // Empty dependency array means this runs once on mount

  const getNextTier = () => {
    if (userPoints === null) return null; // Handle loading state
    if (userPoints < tierRequirements.Silver) return { name: 'Silver', points: tierRequirements.Silver };
    if (userPoints < tierRequirements.Gold) return { name: 'Gold', points: tierRequirements.Gold };
    if (userPoints < tierRequirements.Platinum) return { name: 'Platinum', points: tierRequirements.Platinum };
    return null; // Max tier reached
  };

  const nextTier = getNextTier();

  const handleRedeemReward = async (rewardId: number, pointsCost: number) => {
    if (userPoints === null || redeeming !== null) return; // Prevent multiple redemptions or if data not loaded

    if (userPoints < pointsCost) {
      toast.error('Not enough points to redeem this reward.');
      return;
    }
    if (claimedRewards.includes(rewardId)) {
        toast.info('You have already claimed this reward.');
        return;
    }

    setRedeeming(rewardId); // Indicate which reward is being redeemed

    try {
      // Simulate API call to redeem reward
      const result = await redeemRewardApi(currentUserId, rewardId, pointsCost);

      if (result.success) {
        setUserPoints(result.newPoints); // Update points based on API response
        setClaimedRewards(prev => [...prev, rewardId]); // Add to claimed list
        toast.success('Reward redeemed successfully! 🎉');
      } else {
        // Handle specific API errors (e.g., not enough points, reward unavailable)
        toast.error('Failed to redeem reward. Please try again.');
      }
    } catch (error) {
      console.error("Redemption failed:", error);
      toast.error('An error occurred during redemption.');
    } finally {
      setRedeeming(null); // Reset redeeming state
    }
  };

  // Removed handleEarnPoints function

  const getTierGradient = (tier: string | null) => {
    switch (tier) {
      case 'Bronze': return 'from-amber-400 via-amber-500 to-amber-600';
      case 'Silver': return 'from-gray-300 via-gray-400 to-gray-500';
      case 'Gold': return 'from-yellow-300 via-yellow-400 to-yellow-500';
      case 'Platinum': return 'from-purple-400 via-purple-500 to-purple-600';
      default: return 'from-wasfah-bright-teal via-wasfah-teal to-wasfah-deep-teal'; // Default/Loading
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  // Show loading state
  if (loading || userPoints === null || userTier === null) {
      return (
          <PageContainer header={{ title: 'Loyalty Program', showBackButton: true }}>
              <LayoutContainer className="flex justify-center items-center h-64">
                  <Loader2 className="h-12 w-12 animate-spin text-wasfah-bright-teal" />
              </LayoutContainer>
          </PageContainer>
      );
  }


  return (
    <PageContainer
      header={{
        title: 'Loyalty Program',
        showBackButton: true,
      }}
    >
      <LayoutContainer className="space-y-8 pb-24">
        {/* Enhanced Status Card */}
        <EnhancedCard variant="glass" className={`bg-gradient-to-br ${getTierGradient(userTier)} text-white overflow-hidden relative`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 opacity-20">
            <Sparkles className="h-32 w-32" />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <IconContainer size="lg" className="bg-white/20 text-white">
                  <Crown className="h-8 w-8" />
                </IconContainer>
                <div>
                  <Typography.H2 className="text-white mb-1">{userTier} Member</Typography.H2>
                  <Typography.Body className="text-white/90 text-base">
                    {nextTier ? `${nextTier.points - userPoints} points to ${nextTier.name}` : 'Maximum tier reached! 🏆'}
                  </Typography.Body>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold mb-1">{userPoints.toLocaleString()}</div>
                <Typography.Caption className="text-white/90">Total Points</Typography.Caption>
              </div>
            </div>

            {nextTier && (
              <div className="space-y-3">
                <div className="flex justify-between text-white/90">
                  <span>Progress to {nextTier.name}</span>
                  <span>{userPoints}/{nextTier.points} pts</span>
                </div>
                <ProgressIndicator
                  value={userPoints}
                  max={nextTier.points}
                  variant="primary"
                  className="bg-white/20"
                />
              </div>
            )}
          </CardContent>
        </EnhancedCard>

        {/* Enhanced Rewards Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <IconContainer variant="primary">
              <Gift className="h-6 w-6" />
            </IconContainer>
            <Typography.H2>Available Rewards</Typography.H2>
          </div>

          <div className="grid gap-6">
            {rewards.map((reward) => {
              const isAffordable = userPoints >= reward.points;
              const isClaimed = claimedRewards.includes(reward.id);
              const isRedeemingThis = redeeming === reward.id;

              return (
                <EnhancedCard
                  key={reward.id}
                  variant="elevated"
                  className={`transition-all ${
                    isClaimed
                      ? 'border-green-200 bg-green-50'
                      : isAffordable && reward.available
                      ? `${getRarityColor(reward.rarity)} border-2`
                      : 'opacity-60'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <IconContainer
                        variant={isClaimed ? 'accent' : 'primary'}
                        size="lg"
                      >
                        <reward.icon className="h-8 w-8" />
                      </IconContainer>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <Typography.H3 className="text-lg">{reward.name}</Typography.H3>
                          <div className="flex items-center space-x-2">
                            <AnimatedBadge variant={reward.rarity === 'legendary' ? 'warning' : 'default'}>
                              {reward.rarity}
                            </AnimatedBadge>
                            <Badge variant={isClaimed ? "default" : "outline"}>
                              {isClaimed ? <Check className="h-4 w-4" /> : `${reward.points} pts`}
                            </Badge>
                          </div>
                        </div>

                        <Typography.Body className="text-gray-600">
                          {reward.description}
                        </Typography.Body>

                        {isClaimed ? (
                          <EnhancedButton variant="success" fullWidth disabled>
                            <Check className="h-4 w-4 mr-1" />
                            Claimed
                          </EnhancedButton>
                        ) : isAffordable && reward.available ? (
                          <EnhancedButton
                            variant="primary"
                            fullWidth
                            gradient
                            onClick={() => handleRedeemReward(reward.id, reward.points)}
                            disabled={redeeming !== null}
                          >
                            {isRedeemingThis ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                'Redeem Now'
                            )}
                          </EnhancedButton>
                        ) : (
                          <EnhancedButton variant="outline" fullWidth disabled>
                            {userPoints < reward.points ? 'Not Enough Points' : 'Coming Soon'}
                          </EnhancedButton>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </EnhancedCard>
              );
            })}
          </div>
        </div>

        {/* Enhanced Activities Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <IconContainer variant="accent">
              <Zap className="h-6 w-6" />
            </IconContainer>
            <Typography.H2>How to Earn Points</Typography.H2>
          </div>

          <div className="grid gap-4">
            {activities.map((activity, index) => (
                <EnhancedCard key={index} variant="default">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <IconContainer className={`${activity.color} text-white`} size="lg">
                        <activity.icon className="h-6 w-6" />
                      </IconContainer>

                      <div className="flex-1">
                        <Typography.H3 className="text-lg mb-1">{activity.action}</Typography.H3>
                        <Typography.Body className="text-sm">{activity.description}</Typography.Body>
                      </div>

                      <div className="text-center space-y-1">
                        <div className="text-2xl font-bold text-wasfah-bright-teal">+{activity.points}</div>
                        <Typography.Caption>points</Typography.Caption>
                      </div>
                    </div>
                  </CardContent>
                </EnhancedCard>
              ))}
          </div>
        </div>
      </LayoutContainer>
    </PageContainer>
  );
};

export default LoyaltyProgramPage;
