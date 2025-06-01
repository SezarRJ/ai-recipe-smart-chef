import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Gift, Award, Star, Clock, ChevronRight, Sparkles, Trophy, Zap, Share2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  expiryDate?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  pointsReward: number;
  progress: number;
  total: number;
  isCompleted: boolean;
  expiryDate?: string;
}

const LoyaltyProgramPage = () => {
  const { toast } = useToast();
  const [currentPoints, setCurrentPoints] = useState(750);
  const [totalPointsEarned, setTotalPointsEarned] = useState(1250);
  const [currentTier, setCurrentTier] = useState('Silver');
  const [nextTier, setNextTier] = useState('Gold');
  const [tierProgress, setTierProgress] = useState(75);

  const rewards: Reward[] = [
    {
      id: '1',
      title: '10% Off Next Order',
      description: 'Get 10% off your next order with this reward.',
      pointsCost: 500,
      image: '/images/rewards/discount.png',
      isPopular: true
    },
    {
      id: '2',
      title: 'Free Delivery',
      description: 'Enjoy free delivery on your next order.',
      pointsCost: 300,
      image: '/images/rewards/delivery.png',
      isNew: true
    },
    {
      id: '3',
      title: 'Premium Recipe Access',
      description: 'Get access to premium recipes for 30 days.',
      pointsCost: 800,
      image: '/images/rewards/recipe.png'
    },
    {
      id: '4',
      title: 'Cooking Class Discount',
      description: '15% off on our partner cooking classes.',
      pointsCost: 1000,
      image: '/images/rewards/class.png'
    }
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Recipe Master',
      description: 'Cook 5 recipes from our app',
      pointsReward: 200,
      progress: 3,
      total: 5,
      isCompleted: false
    },
    {
      id: '2',
      title: 'Review Expert',
      description: 'Leave 3 reviews on recipes you\'ve tried',
      pointsReward: 150,
      progress: 3,
      total: 3,
      isCompleted: true
    },
    {
      id: '3',
      title: 'Social Sharer',
      description: 'Share 2 recipes on social media',
      pointsReward: 100,
      progress: 1,
      total: 2,
      isCompleted: false
    },
    {
      id: '4',
      title: 'Weekly Login',
      description: 'Login to the app 5 days in a row',
      pointsReward: 75,
      progress: 4,
      total: 5,
      isCompleted: false,
      expiryDate: '2023-12-31'
    }
  ];

  const handleClaimReward = (reward: Reward) => {
    if (currentPoints >= reward.pointsCost) {
      setCurrentPoints(currentPoints - reward.pointsCost);
      toast({
        title: "Reward Claimed!",
        description: `You've successfully claimed: ${reward.title}`,
      });
    } else {
      toast({
        title: "Not Enough Points",
        description: `You need ${reward.pointsCost - currentPoints} more points to claim this reward.`,
        variant: "destructive",
      });
    }
  };

  const handleClaimChallengeReward = (challenge: Challenge) => {
    if (challenge.isCompleted) {
      toast({
        title: "Points Added!",
        description: `You've received ${challenge.pointsReward} points for completing: ${challenge.title}`,
      });
      setCurrentPoints(currentPoints + challenge.pointsReward);
      setTotalPointsEarned(totalPointsEarned + challenge.pointsReward);
    } else {
      toast({
        title: "Challenge Not Completed",
        description: `Complete the challenge first to claim your reward.`,
        variant: "destructive",
      });
    }
  };

  return (
    <PageContainer
      header={{
        title: "Loyalty Program",
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Tier Status Card */}
        <Card className="bg-gradient-to-r from-amber-100 to-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-amber-500 mr-3" />
                <div>
                  <h3 className="font-bold text-lg">{currentTier} Member</h3>
                  <p className="text-sm text-gray-600">
                    {tierProgress}% to {nextTier}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-amber-300 bg-white">
                View Benefits
              </Button>
            </div>
            
            <Progress value={tierProgress} className="h-2 bg-amber-100" />
            
            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Current Points</p>
                <p className="font-bold text-2xl flex items-center">
                  {currentPoints} <Star className="h-4 w-4 text-amber-500 ml-1" />
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Earned</p>
                <p className="font-bold text-lg">{totalPointsEarned} points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Rewards and Challenges */}
        <Tabs defaultValue="rewards" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rewards" className="mt-4 space-y-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                    {/* Placeholder for reward image */}
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <Gift className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                  <CardContent className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{reward.title}</h3>
                          {reward.isNew && (
                            <Badge className="bg-blue-500">New</Badge>
                          )}
                          {reward.isPopular && (
                            <Badge className="bg-orange-500">Popular</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-amber-500 font-bold">
                          {reward.pointsCost} <Star className="h-3 w-3 ml-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      {reward.expiryDate && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          Expires: {reward.expiryDate}
                        </div>
                      )}
                      <Button 
                        variant="default"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleClaimReward(reward)}
                      >
                        Claim
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="challenges" className="mt-4 space-y-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className={challenge.isCompleted ? "border-green-200 bg-green-50" : ""}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        {challenge.isCompleted && (
                          <Badge className="bg-green-500">Completed</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-amber-500 font-bold">
                        +{challenge.pointsReward} <Star className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}/{challenge.total}</span>
                    </div>
                    <Progress 
                      value={(challenge.progress / challenge.total) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    {challenge.expiryDate && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        Expires: {challenge.expiryDate}
                      </div>
                    )}
                    <Button 
                      variant={challenge.isCompleted ? "default" : "outline"}
                      className={challenge.isCompleted ? "bg-green-500 hover:bg-green-600 text-white" : ""}
                      onClick={() => handleClaimChallengeReward(challenge)}
                      disabled={!challenge.isCompleted}
                    >
                      {challenge.isCompleted ? "Claim Reward" : "In Progress"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* How to Earn Points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-amber-500" />
              How to Earn Points
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Award className="h-4 w-4 text-blue-500" />
                </div>
                <span>Complete a recipe</span>
              </div>
              <div className="flex items-center text-amber-500 font-semibold">
                +50 <Star className="h-3 w-3 ml-1" />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Star className="h-4 w-4 text-purple-500" />
                </div>
                <span>Rate a recipe</span>
              </div>
              <div className="flex items-center text-amber-500 font-semibold">
                +10 <Star className="h-3 w-3 ml-1" />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Share2 className="h-4 w-4 text-green-500" />
                </div>
                <span>Share a recipe</span>
              </div>
              <div className="flex items-center text-amber-500 font-semibold">
                +25 <Star className="h-3 w-3 ml-1" />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-red-500" />
                </div>
                <span>Invite a friend</span>
              </div>
              <div className="flex items-center text-amber-500 font-semibold">
                +100 <Star className="h-3 w-3 ml-1" />
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-2 flex items-center justify-center">
              View All Ways to Earn
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default LoyaltyProgramPage;
