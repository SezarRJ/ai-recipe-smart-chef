import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Trophy, Crown, Zap, Check, ChefHat, Share2, Calendar, Users, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { PageContainer } from '@/components/layout/PageContainer';

const fetchUserData = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    points: 1250,
    tier: 'Gold',
    claimedRewards: [1],
  };
};

const redeemRewardApi = async (userId: string, rewardId: number, pointsCost: number) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, newPoints: 1250 - pointsCost };
};

const LoyaltyProgramPage = () => {
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [userTier, setUserTier] = useState<string | null>(null);
  const [claimedRewards, setClaimedRewards] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<number | null>(null);

  const currentUserId = 'user-123';

  const rewards = [
    { id: 1, name: 'Free Premium Recipe', points: 500, icon: Star, available: true, description: 'Unlock one premium recipe of your choice', rarity: 'common' },
    { id: 2, name: '10% Off Subscription', points: 1000, icon: Gift, available: true, description: 'Get 10% discount on your next subscription', rarity: 'rare' },
    { id: 3, name: 'Exclusive Recipe Collection', points: 1500, icon: Trophy, available: false, description: 'Access to chef-curated recipe collections', rarity: 'epic' },
    { id: 4, name: 'Personal Chef Consultation', points: 2500, icon: Crown, available: false, description: '30-minute one-on-one session with a professional chef', rarity: 'legendary' }
  ];

  const activities = [
    { action: 'Daily Login', points: 10, description: 'Login to the app daily', icon: Calendar, color: 'bg-blue-500' },
    { action: 'Share Recipe', points: 50, description: 'Share a recipe with friends', icon: Share2, color: 'bg-green-500' },
    { action: 'Create Recipe', points: 100, description: 'Create and publish a new recipe', icon: ChefHat, color: 'bg-purple-500' },
    { action: 'Join Community', points: 75, description: 'Participate in community discussions', icon: Users, color: 'bg-orange-500' }
  ];

  const tierRequirements = { Bronze: 0, Silver: 1000, Gold: 2500, Platinum: 5000 };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchUserData();
        setUserPoints(data.points);
        setUserTier(data.tier);
        setClaimedRewards(data.claimedRewards);
      } catch {
        toast.error("Failed to load loyalty data.");
        setUserPoints(0);
        setUserTier('Bronze');
        setClaimedRewards([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getNextTier = () => {
    if (userPoints === null) return null;
    if (userPoints < tierRequirements.Silver) return { name: 'Silver', points: tierRequirements.Silver };
    if (userPoints < tierRequirements.Gold) return { name: 'Gold', points: tierRequirements.Gold };
    if (userPoints < tierRequirements.Platinum) return { name: 'Platinum', points: tierRequirements.Platinum };
    return null;
  };
  const nextTier = getNextTier();

  const handleRedeemReward = async (rewardId: number, pointsCost: number) => {
    if (userPoints === null || redeeming !== null) return;
    if (userPoints < pointsCost) {
      toast.error('Not enough points to redeem this reward.');
      return;
    }
    if (claimedRewards.includes(rewardId)) {
      toast.info('You have already claimed this reward.');
      return;
    }
    setRedeeming(rewardId);
    try {
      const result = await redeemRewardApi(currentUserId, rewardId, pointsCost);
      if (result.success) {
        setUserPoints(result.newPoints);
        setClaimedRewards(prev => [...prev, rewardId]);
        toast.success('Reward redeemed successfully! 🎉');
      } else {
        toast.error('Failed to redeem reward. Please try again.');
      }
    } catch {
      toast.error('An error occurred during redemption.');
    } finally {
      setRedeeming(null);
    }
  };

  const getTierGradient = (tier: string | null) => {
    switch (tier) {
      case 'Bronze': return 'from-amber-400 via-amber-500 to-amber-600';
      case 'Silver': return 'from-gray-300 via-gray-400 to-gray-500';
      case 'Gold': return 'from-yellow-300 via-yellow-400 to-yellow-500';
      case 'Platinum': return 'from-purple-400 via-purple-500 to-purple-600';
      default: return 'from-wasfah-bright-teal via-wasfah-teal to-wasfah-deep-teal';
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

  if (loading || userPoints === null || userTier === null) {
    return (
      <PageContainer header={{ title: 'Loyalty Program', showBackButton: true }}>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-wasfah-bright-teal" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer header={{ title: 'Loyalty Program', showBackButton: true }}>
      <div className="max-w-md mx-auto w-full px-2 py-4 space-y-6">
        {/* Status Card */}
        <div className={`rounded-2xl p-5 text-white bg-gradient-to-br ${getTierGradient(userTier)} relative`}>
          <div className="absolute top-2 right-2 opacity-20"><Sparkles className="h-12 w-12" /></div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-1">
                <Crown className="h-6 w-6 mr-2" />
                <span className="font-bold text-lg">{userTier} Member</span>
              </div>
              <div className="text-xs">
                {nextTier ? `${nextTier.points - userPoints} pts to ${nextTier.name}` : 'Max tier reached! 🏆'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userPoints}</div>
              <div className="text-xs">Points</div>
            </div>
          </div>
          {nextTier && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress to {nextTier.name}</span>
                <span>{userPoints}/{nextTier.points}</span>
              </div>
              <Progress value={userPoints} max={nextTier.points} className="h-2 bg-white/30" />
            </div>
          )}
        </div>

        {/* Rewards */}
        <div>
          <div className="flex items-center mb-2">
            <Gift className="h-5 w-5 mr-2 text-wasfah-bright-teal" />
            <span className="font-semibold text-base">Available Rewards</span>
          </div>
          <div className="space-y-4">
            {rewards.map((reward) => {
              const isAffordable = userPoints >= reward.points;
              const isClaimed = claimedRewards.includes(reward.id);
              const isRedeemingThis = redeeming === reward.id;
              return (
                <Card key={reward.id} className={`rounded-xl p-3 flex items-center ${getRarityColor(reward.rarity)} ${isClaimed ? 'border-green-200 bg-green-50' : ''} ${!isAffordable && !isClaimed ? 'opacity-60' : ''}`}>
                  <div className="mr-3">
                    <reward.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{reward.name}</span>
                      <Badge variant={isClaimed ? "default" : "outline"}>{isClaimed ? <Check className="h-4 w-4" /> : `${reward.points} pts`}</Badge>
                    </div>
                    <div className="text-xs text-gray-500">{reward.description}</div>
                  </div>
                  <div className="ml-2 w-24">
                    {isClaimed ? (
                      <Button size="sm" variant="success" disabled className="w-full"><Check className="h-4 w-4 mr-1" />Claimed</Button>
                    ) : isAffordable && reward.available ? (
                      <Button size="sm" variant="default" className="w-full" onClick={() => handleRedeemReward(reward.id, reward.points)} disabled={redeeming !== null}>
                        {isRedeemingThis ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Redeem'}
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="w-full" disabled>
                        {userPoints < reward.points ? 'Not Enough' : 'Soon'}
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Activities */}
        <div>
          <div className="flex items-center mb-2">
            <Zap className="h-5 w-5 mr-2 text-wasfah-bright-teal" />
            <span className="font-semibold text-base">How to Earn Points</span>
          </div>
          <div className="space-y-3">
            {activities.map((activity, idx) => (
              <Card key={idx} className="rounded-xl p-3 flex items-center">
                <div className={`mr-3 rounded-full p-2 ${activity.color}`}>
                  <activity.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-xs text-gray-500">{activity.description}</div>
                </div>
                <div className="ml-2 text-wasfah-bright-teal font-bold text-lg">+{activity.points}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default LoyaltyProgramPage;
