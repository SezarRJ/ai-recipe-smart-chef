import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Activity, 
  Heart, 
  Scale, 
  Target, 
  TrendingUp,
  Plus,
  Calendar
} from 'lucide-react';

interface Goal {
  name: string;
  value: number;
  unit: string;
}

interface HealthStat {
  consumed: number;
  target: number;
}

interface DailyStats {
  calories: HealthStat;
  protein: HealthStat;
  carbs: HealthStat;
  fat: HealthStat;
  water: HealthStat;
  fiber: HealthStat;
}

interface WeeklyProgressEntry {
  day: string;
  calories: number;
  weight: number;
}

interface HealthTrackingProps {
  // Define any props here
}

const HealthTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [goals, setGoals] = useState<Goal[]>([
    { name: "Weight", value: 70, unit: "kg" },
    { name: "Steps", value: 10000, unit: "steps" },
    { name: "Sleep", value: 8, unit: "hours" },
  ]);

  const [dailyStats, setDailyStats] = useState({
    calories: { consumed: 1850, target: 2200 },
    protein: { consumed: 95, target: 150 },
    carbs: { consumed: 180, target: 200 },
    fat: { consumed: 58, target: 65 },
    water: { consumed: 6, target: 8 },
    fiber: { consumed: 18, target: 25 }
  });

  const [weeklyProgress, setWeeklyProgress] = useState([
    { day: 'Mon', calories: 2100, weight: 70.2 },
    { day: 'Tue', calories: 1950, weight: 70.0 },
    { day: 'Wed', calories: 2200, weight: 69.8 },
    { day: 'Thu', calories: 1800, weight: 69.9 },
    { day: 'Fri', calories: 2050, weight: 69.7 },
    { day: 'Sat', calories: 2300, weight: 69.8 },
    { day: 'Sun', calories: 1850, weight: 70.0 }
  ]);

  const addWaterIntake = () => {
    setDailyStats(prev => ({
      ...prev,
      water: { ...prev.water, consumed: Math.min(prev.water.consumed + 1, prev.water.target + 2) }
    }));
    toast({ title: "Water logged", description: "Great job staying hydrated!" });
  };

  const logWeight = (weight: number) => {
    toast({ title: "Weight logged", description: `Weight recorded: ${weight}kg` });
  };

  const calculateProgress = (consumed: number, target: number) => {
    return Math.min((consumed / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Health Tracking</h1>
            <p className="text-gray-600">Monitor your nutrition and health goals</p>
          </div>
        </div>

        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily Stats</TabsTrigger>
            <TabsTrigger value="progress">Weekly Progress</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            {/* Daily Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="text-wasfah-orange" size={20} />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(dailyStats).map(([key, stats]) => {
                    const progress = calculateProgress(stats.consumed, stats.target);
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium capitalize">{key}</span>
                          <span className="text-sm text-gray-600">
                            {stats.consumed}/{stats.target}
                            {key === 'water' ? ' glasses' : key === 'calories' ? ' kcal' : ' g'}
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{progress.toFixed(0)}% complete</span>
                          <span className={progress >= 100 ? 'text-green-600' : 'text-orange-600'}>
                            {progress >= 100 ? 'Goal reached!' : `${(stats.target - stats.consumed).toFixed(0)} to go`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="text-red-500" size={20} />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={addWaterIntake} 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Plus size={16} className="mr-2" />
                    Log Water Glass
                  </Button>
                  <Button 
                    onClick={() => toast({ title: "Feature coming soon", description: "Meal logging will be available soon!" })}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Plus size={16} className="mr-2" />
                    Log Meal
                  </Button>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Weight (kg)" 
                      type="number" 
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const weight = parseFloat((e.target as HTMLInputElement).value);
                          if (weight) logWeight(weight);
                        }
                      }}
                    />
                    <Button size="sm">Log</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="text-wasfah-orange" size={20} />
                    Today's Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Stay under calorie goal</span>
                      <Badge variant={dailyStats.calories.consumed <= dailyStats.calories.target ? "default" : "destructive"}>
                        {dailyStats.calories.consumed <= dailyStats.calories.target ? "On track" : "Over"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Meet protein target</span>
                      <Badge variant={dailyStats.protein.consumed >= dailyStats.protein.target * 0.8 ? "default" : "destructive"}>
                        {dailyStats.protein.consumed >= dailyStats.protein.target * 0.8 ? "Good" : "Low"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Drink enough water</span>
                      <Badge variant={dailyStats.water.consumed >= dailyStats.water.target ? "default" : "destructive"}>
                        {dailyStats.water.consumed >= dailyStats.water.target ? "Complete" : "Incomplete"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="text-wasfah-orange" size={20} />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="font-medium">{day.day}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span>{day.calories} kcal</span>
                        <span>{day.weight} kg</span>
                        <Badge variant="outline">
                          {day.calories <= 2200 ? "Good" : "High"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="text-wasfah-orange" size={20} />
                  Health Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-medium">Daily Calorie Target</label>
                      <Input 
                        type="number" 
                        defaultValue={dailyStats.calories.target}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value) {
                            setDailyStats(prev => ({
                              ...prev,
                              calories: { ...prev.calories, target: value }
                            }));
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-medium">Protein Target (g)</label>
                      <Input 
                        type="number" 
                        defaultValue={dailyStats.protein.target}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value) {
                            setDailyStats(prev => ({
                              ...prev,
                              protein: { ...prev.protein, target: value }
                            }));
                          }
                        }}
                      />
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">
                    Save Goals
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HealthTracking;
