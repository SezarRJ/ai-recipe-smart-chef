
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Star, Gift, Medal, Trophy, Target, Clock, Sparkles, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample rewards data
const rewards = [
  {
    id: '1',
    title: 'Premium Recipe Collection',
    description: 'Unlock 25 premium recipes from world-class chefs.',
    pointsCost: 500,
    image: '/placeholder.svg',
    isAvailable: true,
  },
  {
    id: '2',
    title: 'Ad-Free Experience',
    description: 'Enjoy WasfahAI without any advertisements for 30 days.',
    pointsCost: 750,
    image: '/placeholder.svg',
    isAvailable: true,
  },
  {
    id: '3',
    title: 'Chef consultation',
    description: '15-minute video call with a professional chef.',
    pointsCost: 2000,
    image: '/placeholder.svg',
    isAvailable: false,
  },
];

// Sample achievements data
const achievements = [
  {
    id: '1',
    title: 'Recipe Creator',
    description: 'Create your first recipe',
    icon: 'chef',
    pointsAwarded: 50,
    dateEarned: '2023-04-15',
    progress: 100,
    total: 1,
  },
  {
    id: '2',
    title: 'Recipe Master',
    description: 'Create 5 recipes',
    icon: 'star',
    pointsAwarded: 150,
    dateEarned: null,
    progress: 60,
    total: 5,
  },
  {
    id: '3',
    title: 'Healthy Eater',
    description: 'Follow a meal plan for 7 consecutive days',
    icon: 'calendar',
    pointsAwarded: 200,
    dateEarned: null,
    progress: 30,
    total: 7,
  },
  {
    id: '4',
    title: 'Ingredient Expert',
    description: 'Use the ingredient swap feature 10 times',
    icon: 'swap',
    pointsAwarded: 100,
    dateEarned: null,
    progress: 40,
    total: 10,
  },
];

export default function LoyaltyProgramPage() {
  const { toast } = useToast();
  const [userPoints, setUserPoints] = useState(850);
  const [userLevel, setUserLevel] = useState('Gold Level');
  const pointsToNextLevel = 1500 - userPoints;
  const progressToNextLevel = (userPoints / 1500) * 100;

  const handleRedeemReward = (reward: typeof rewards[0]) => {
    if (userPoints >= reward.pointsCost) {
      setUserPoints(prevPoints => prevPoints - reward.pointsCost);
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed "${reward.title}" for ${reward.pointsCost} points.`,
      });
    } else {
      toast({
        title: "Not enough points",
        description: `You need ${reward.pointsCost - userPoints} more points to redeem "${reward.title}".`,
        variant: "destructive",
      });
    }
  };

  return (
    <PageContainer header={{ title: 'Loyalty Program', showBackButton: true }}>
      <div className="space-y-6 pb-6">
        <section>
          <Card className="border-secondary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-wasfah-orange to-wasfah-green p-3 rounded-full mr-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-wasfah-orange">{userLevel}</h2>
                    <p className="text-sm text-gray-600">Member since April 2023</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-wasfah-green">{userPoints}</div>
                  <p className="text-sm text-gray-600">points</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">{userLevel}</span>
                  <span className="text-gray-700">Platinum Level (1,500 pts)</span>
                </div>
                <Progress value={progressToNextLevel} className="h-2" />
                <p className="text-xs text-center mt-1 text-gray-600">
                  {pointsToNextLevel > 0 ? `${pointsToNextLevel} more points to reach Platinum` : "You've reached Platinum Level!"}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Tabs defaultValue="rewards">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rewards">
                <Gift className="h-4 w-4 mr-2" />
                Rewards
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Trophy className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rewards" className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-wasfah-orange">Available Rewards</h3>
                <span className="text-sm font-medium text-wasfah-green">{userPoints} points available</span>
              </div>

              <div className="grid gap-4">
                {rewards.map((reward) => (
                  <Card key={reward.id} className={!reward.isAvailable || userPoints < reward.pointsCost ? 'opacity-60' : ''}>
                    <div className="flex">
                      <div className="w-24 h-full">
                        <img
                          src={reward.image}
                          alt={reward.title}
                          className="w-full h-full object-cover rounded-l-lg"
                        />
                      </div>
                      <div className="flex-1 flex flex-col p-4">
                        <CardHeader className="p-0 pb-2">
                          <CardTitle className="text-base text-gray-900">{reward.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 pb-2 flex-1">
                          <p className="text-sm text-gray-600">{reward.description}</p>
                        </CardContent>
                        <CardFooter className="p-0 flex justify-between items-center">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium text-gray-900">{reward.pointsCost} points</span>
                          </div>
                          <Button
                            className="bg-wasfah-green hover:bg-wasfah-orange"
                            disabled={!reward.isAvailable || userPoints < reward.pointsCost}
                            onClick={() => handleRedeemReward(reward)}
                          >
                            Redeem
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-wasfah-orange">Your Achievements</h3>
                <span className="text-sm font-medium text-gray-600">Earn points with achievements</span>
              </div>

              <div className="grid gap-3">
                {achievements.map((achievement) => {
                  const isCompleted = achievement.progress === 100;

                  let AchievementIcon;
                  switch (achievement.icon) {
                    case 'chef': AchievementIcon = Medal; break;
                    case 'star': AchievementIcon = Star; break;
                    case 'calendar': AchievementIcon = Clock; break;
                    case 'swap': AchievementIcon = Sparkles; break;
                    default: AchievementIcon = Target;
                  }

                  return (
                    <Card key={achievement.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <div className={`p-3 rounded-full mr-4 ${
                            isCompleted
                              ? 'bg-gradient-to-br from-wasfah-orange to-wasfah-green'
                              : 'bg-gray-200'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-white" />
                            ) : (
                              <AchievementIcon className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                              <div className="text-sm font-medium text-wasfah-green">
                                {achievement.pointsAwarded} pts
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>

                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-gray-600">
                                <span>{Math.floor(achievement.progress / 100 * achievement.total)} of {achievement.total}</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <Progress value={achievement.progress} className="h-1.5" />
                            </div>

                            {achievement.dateEarned && (
                              <div className="mt-1 text-xs text-gray-600">
                                Completed on {new Date(achievement.dateEarned).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </PageContainer>
  );
}
