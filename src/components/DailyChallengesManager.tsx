
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Clock, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  challenge_type: string;
  is_active: boolean;
  date: string;
}

interface UserChallenge {
  id: string;
  challenge_id: string;
  is_completed: boolean;
  progress: number;
  completed_at: string | null;
  daily_challenges: Challenge;
}

export const DailyChallengesManager = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: userChallenges, isLoading } = useQuery({
    queryKey: ['user-challenges', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_challenges')
        .select(`
          *,
          daily_challenges (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as UserChallenge[];
    },
    enabled: !!user?.id
  });

  const { data: availableChallenges } = useQuery({
    queryKey: ['available-challenges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('daily_challenges')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Challenge[];
    }
  });

  const joinChallengeMutation = useMutation({
    mutationFn: async (challengeId: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('user_challenges')
        .insert({
          user_id: user.id,
          challenge_id: challengeId
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-challenges'] });
      toast({
        title: "Challenge Joined!",
        description: "You've successfully joined the challenge."
      });
    }
  });

  const completeChallengeMutation = useMutation({
    mutationFn: async (challengeId: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('user_challenges')
        .update({
          is_completed: true,
          progress: 100,
          completed_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-challenges'] });
      toast({
        title: "Challenge Completed!",
        description: "Congratulations! You've earned points."
      });
    }
  });

  const joinedChallengeIds = userChallenges?.map(uc => uc.challenge_id) || [];
  const unJoinedChallenges = availableChallenges?.filter(
    challenge => !joinedChallengeIds.includes(challenge.id)
  ) || [];

  const totalPoints = userChallenges?.reduce((sum, uc) => 
    uc.is_completed ? sum + uc.daily_challenges.points : sum, 0
  ) || 0;

  const completedCount = userChallenges?.filter(uc => uc.is_completed).length || 0;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-wasfah-gold mx-auto mb-2" />
            <h3 className="font-semibold text-lg">{totalPoints}</h3>
            <p className="text-sm text-gray-600">Total Points</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold text-lg">{completedCount}</h3>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-wasfah-orange mx-auto mb-2" />
            <h3 className="font-semibold text-lg">{userChallenges?.length || 0}</h3>
            <p className="text-sm text-gray-600">Active Challenges</p>
          </CardContent>
        </Card>
      </div>

      {/* My Challenges */}
      <div>
        <h2 className="text-xl font-bold mb-4">My Challenges</h2>
        <div className="grid gap-4">
          {userChallenges?.map((userChallenge) => (
            <Card key={userChallenge.id} className={userChallenge.is_completed ? 'bg-green-50 border-green-200' : ''}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{userChallenge.daily_challenges.title}</CardTitle>
                  <Badge variant={userChallenge.is_completed ? 'default' : 'secondary'}>
                    {userChallenge.daily_challenges.points} pts
                  </Badge>
                </div>
                <p className="text-gray-600">{userChallenge.daily_challenges.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Progress value={userChallenge.progress} className="flex-1" />
                    <span className="text-sm text-gray-600">{userChallenge.progress}%</span>
                  </div>
                  
                  {!userChallenge.is_completed ? (
                    <Button 
                      onClick={() => completeChallengeMutation.mutate(userChallenge.challenge_id)}
                      disabled={completeChallengeMutation.isPending}
                      className="w-full"
                    >
                      Complete Challenge
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={16} />
                      <span className="text-sm font-medium">Completed!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Challenges */}
      {unJoinedChallenges.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Available Challenges</h2>
          <div className="grid gap-4">
            {unJoinedChallenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge variant="outline">{challenge.points} pts</Badge>
                  </div>
                  <p className="text-gray-600">{challenge.description}</p>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => joinChallengeMutation.mutate(challenge.id)}
                    disabled={joinChallengeMutation.isPending}
                    className="w-full"
                  >
                    Join Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
