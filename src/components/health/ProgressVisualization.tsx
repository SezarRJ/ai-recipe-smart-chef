
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';

export const ProgressVisualization = () => {
  const [timeframe, setTimeframe] = useState('week');

  // Mock data - replace with real data from your backend
  const weeklyProgress = [
    { day: 'Mon', calories: 1850, protein: 95, carbs: 180, fat: 58, water: 6 },
    { day: 'Tue', calories: 1950, protein: 105, carbs: 170, fat: 62, water: 8 },
    { day: 'Wed', calories: 2200, protein: 120, carbs: 200, fat: 70, water: 7 },
    { day: 'Thu', calories: 1800, protein: 90, carbs: 165, fat: 55, water: 9 },
    { day: 'Fri', calories: 2050, protein: 110, carbs: 185, fat: 65, water: 8 },
    { day: 'Sat', calories: 2300, protein: 125, carbs: 220, fat: 75, water: 6 },
    { day: 'Sun', calories: 1850, protein: 95, carbs: 175, fat: 60, water: 7 }
  ];

  const monthlyTrends = [
    { week: 'Week 1', avgCalories: 1950, weight: 70.2, bmi: 24.2 },
    { week: 'Week 2', avgCalories: 2000, weight: 70.0, bmi: 24.1 },
    { week: 'Week 3', avgCalories: 1890, weight: 69.8, bmi: 24.0 },
    { week: 'Week 4', avgCalories: 1920, weight: 69.5, bmi: 23.9 }
  ];

  const macroDistribution = [
    { name: 'Protein', value: 25, color: '#10B981' },
    { name: 'Carbs', value: 45, color: '#3B82F6' },
    { name: 'Fat', value: 30, color: '#F59E0B' }
  ];

  const achievements = [
    { title: 'Water Goal Achieved', description: '7 days in a row', icon: '💧', achieved: true },
    { title: 'Protein Target', description: 'Hit protein goals 5/7 days', icon: '💪', achieved: true },
    { title: 'Calorie Balance', description: 'Stayed within range', icon: '⚖️', achieved: false },
    { title: 'Consistency', description: 'Logged meals daily', icon: '📝', achieved: true }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">85%</div>
            <div className="text-sm text-gray-600">Goal Achievement</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1,950</div>
            <div className="text-sm text-gray-600">Avg Daily Calories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">-0.7kg</div>
            <div className="text-sm text-gray-600">Weight Change</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">23.9</div>
            <div className="text-sm text-gray-600">Current BMI</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">Daily Progress</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="macros">Macro Split</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill="#3B82F6" name="Calories" />
                  <Bar dataKey="protein" fill="#10B981" name="Protein (g)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    name="Weight (kg)"
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="avgCalories" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Avg Calories"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="macros" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Macro Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={macroDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {macroDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {macroDistribution.map((macro, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: macro.color }}
                        />
                        <span className="font-medium">{macro.name}</span>
                      </div>
                      <Badge variant="outline">{macro.value}%</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                This Week's Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border-2 ${
                      achievement.achieved 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      {achievement.achieved && (
                        <Badge className="bg-green-500 text-white ml-auto">✓</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
