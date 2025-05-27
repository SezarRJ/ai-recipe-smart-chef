
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Award, Trophy, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

interface Challenge {
  id: string;
  name: string;
  description: string;
  category: string;
  is_active: boolean;
}

interface UserProgress {
  id: string;
  challenge_id: string;
  completed: boolean;
  completed_at: string | null;
  date: string;
}

// Mock challenges data for demo purposes
const MOCK_CHALLENGES: Challenge[] = [
  {
    id: '1',
    name: 'Cook without recipe suggestions',
    description: 'Try cooking a meal using only your intuition and basic ingredients',
    category: 'independence',
    is_active: true
  },
  {
    id: '2',
    name: 'Substitute ingredients creatively',
    description: 'Replace at least 2 ingredients in a recipe with your own choices',
    category: 'independence',
    is_active: true
  },
  {
    id: '3',
    name: 'Plan meals for the week',
    description: 'Create a meal plan without AI assistance',
    category: 'independence',
    is_active: true
  },
  {
    id: '4',
    name: 'Shop without a generated list',
    description: 'Go grocery shopping using your own handwritten list',
    category: 'independence',
    is_active: true
  },
  {
    id: '5',
    name: 'Cook with seasonal ingredients',
    description: 'Prepare a dish using only seasonal, local ingredients',
    category: 'independence',
    is_active: true
  }
];

export const DailyChallengesManager: React.FC = () => {
  const { toast } = useToast();
  const { t } = useRTL();
  const [challenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load progress from localStorage
    const today = new Date().toISOString().split('T')[0];
    const savedProgress = localStorage.getItem(`challenges_${today}`);
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    setLoading(false);
  }, []);

  const toggleChallengeCompletion = (challengeId: string, completed: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    const existingProgress = userProgress.find(p => p.challenge_id === challengeId);

    let newProgress: UserProgress[];

    if (existingProgress) {
      newProgress = userProgress.map(p => 
        p.id === existingProgress.id 
          ? { ...p, completed, completed_at: completed ? new Date().toISOString() : null }
          : p
      );
    } else {
      const newEntry: UserProgress = {
        id: Date.now().toString(),
        challenge_id: challengeId,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
        date: today
      };
      newProgress = [...userProgress, newEntry];
    }

    setUserProgress(newProgress);
    
    // Save to localStorage
    localStorage.setItem(`challenges_${today}`, JSON.stringify(newProgress));

    toast({
      title: completed ? t('Challenge Completed!', 'تم إكمال التحدي!') : t('Challenge Unchecked', 'تم إلغاء التحدي'),
      description: completed ? t('Great job on completing this challenge!', 'عمل رائع في إكمال هذا التحدي!') : '',
    });
  };

  const isChallengeCompleted = (challengeId: string) => {
    return userProgress.find(p => p.challenge_id === challengeId)?.completed || false;
  };

  const completedCount = userProgress.filter(p => p.completed).length;

  if (loading) {
    return (
      <Card className="border-2 border-purple-300/30">
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading challenges...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-purple-300/30 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-50/10 dark:from-gray-800 dark:to-gray-800/80 pb-2">
        <CardTitle className="flex items-center text-purple-700 dark:text-purple-400">
          <Award className="h-5 w-5 mr-2" />
          {t('Daily Independence Challenges', 'تحديات الاستقلالية اليومية')}
        </CardTitle>
        <div className="flex items-center space-x-2 text-sm">
          <Trophy className="h-4 w-4" />
          <span>{completedCount}/{challenges.length} {t('completed', 'مكتمل')}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {t('Complete these challenges to become less dependent on AI guidance', 'أكمل هذه التحديات لتصبح أقل اعتمادًا على توجيهات الذكاء الاصطناعي')}
        </p>
        
        <div className="space-y-3">
          {challenges.map((challenge) => {
            const isCompleted = isChallengeCompleted(challenge.id);
            return (
              <div key={challenge.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={(checked) => toggleChallengeCompletion(challenge.id, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-purple-500" />
                    <p className={`font-medium text-sm ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                      {t(challenge.name, '')}
                    </p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${isCompleted ? 'line-through' : ''}`}>
                    {t(challenge.description, '')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {completedCount === challenges.length && challenges.length > 0 && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <Trophy className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-green-700 dark:text-green-400 font-medium">
              {t('All challenges completed! Great job!', 'تم إكمال جميع التحديات! عمل رائع!')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
