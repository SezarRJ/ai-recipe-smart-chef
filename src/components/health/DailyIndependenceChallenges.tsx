
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Trophy, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Challenge {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  category: string;
}

interface DailyIndependenceChallengesProps {
  challenges?: Challenge[];
  onViewAllChallenges?: () => void;
}

export const DailyIndependenceChallenges: React.FC<DailyIndependenceChallengesProps> = ({
  challenges,
  onViewAllChallenges
}) => {
  const [localChallenges, setLocalChallenges] = useState<Challenge[]>(
    challenges || [
      {
        id: '1',
        name: 'Cook a New Recipe',
        description: 'Try cooking something you\'ve never made before',
        completed: false,
        category: 'independence'
      },
      {
        id: '2',
        name: 'Plan Tomorrow\'s Meals',
        description: 'Plan what you\'ll eat for breakfast, lunch, and dinner',
        completed: true,
        category: 'independence'
      },
      {
        id: '3',
        name: 'Learn a Cooking Technique',
        description: 'Watch a video or read about a new cooking method',
        completed: false,
        category: 'independence'
      }
    ]
  );

  const toggleChallenge = (challengeId: string) => {
    setLocalChallenges(prev =>
      prev.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, completed: !challenge.completed }
          : challenge
      )
    );
  };

  const completedCount = localChallenges.filter(c => c.completed).length;
  const completionPercentage = Math.round((completedCount / localChallenges.length) * 100);

  return (
    <Card className="border-wasfah-mint/20 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-wasfah-deep-teal flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-wasfah-coral-red" />
            Daily Independence Challenges
          </CardTitle>
          <Badge variant="secondary" className="bg-wasfah-mint/20 text-wasfah-deep-teal">
            {completedCount}/{localChallenges.length}
          </Badge>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-wasfah-bright-teal h-2 rounded-full transition-all duration-300" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {localChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <button
              onClick={() => toggleChallenge(challenge.id)}
              className="flex-shrink-0 mt-0.5"
            >
              {challenge.completed ? (
                <CheckCircle className="h-5 w-5 text-wasfah-bright-teal" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 hover:text-wasfah-bright-teal transition-colors" />
              )}
            </button>
            <div className="flex-1">
              <h4 className={`font-medium ${challenge.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {challenge.name}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
            </div>
          </div>
        ))}
        
        {onViewAllChallenges && (
          <Button
            variant="outline"
            className="w-full mt-4 border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
            onClick={onViewAllChallenges}
          >
            <Target className="h-4 w-4 mr-2" />
            View All Challenges
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
