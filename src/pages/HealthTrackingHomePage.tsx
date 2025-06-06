
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Calendar,
  Apple,
  Droplets,
  Zap,
  Heart,
  Award,
  Plus,
  ArrowRight,
  Scale,
  Clock,
  Utensils,
  Pill
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HealthTrackingHomePage = () => {
  const [dailyGoals] = useState({
    calories: { current: 1650, target: 2000, unit: 'kcal' },
    protein: { current: 45, target: 60, unit: 'g' },
    water: { current: 6, target: 8, unit: 'glasses' },
    exercise: { current: 25, target: 30, unit: 'min' }
  });

  const healthFeatures = [
    {
      icon: <Apple className="h-6 w-6" />,
      title: "Nutrition Tracking",
      description: "Track macros, calories, and nutrients from your meals",
      path: "/nutrition-goals",
      color: "from-green-500 to-emerald-500",
      stats: "1,650 kcal today"
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Weight Management", 
      description: "Track weight changes and body composition",
      path: "/body-information",
      color: "from-blue-500 to-cyan-500",
      stats: "Goal: -2kg"
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Activity Monitor",
      description: "Connect fitness trackers and monitor activity",
      path: "/connected-devices",
      color: "from-orange-500 to-red-500",
      stats: "25 min today"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Health Goals",
      description: "Set and track personalized health objectives",
      path: "/nutrition-goals",
      color: "from-indigo-500 to-purple-500",
      stats: "3/5 active"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Meal Timing",
      description: "Optimize meal timing for better health",
      path: "/meal-timing",
      color: "from-teal-500 to-green-500",
      stats: "On track"
    },
    {
      icon: <Pill className="h-6 w-6" />,
      title: "Micronutrient Tracker",
      description: "Monitor vitamins and minerals for optimal health",
      path: "/micronutrient-tracker",
      color: "from-purple-500 to-violet-500",
      stats: "3 nutrients low",
      isNew: true
    }
  ];

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <PageContainer header={{ title: 'Health Tracking', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Health Dashboard</h1>
          <p className="text-gray-600">
            Monitor your nutrition, activity, and wellness goals
          </p>
        </div>

        {/* Today's Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-wasfah-bright-teal" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(dailyGoals).map(([key, goal]) => (
                <div key={key} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-wasfah-bright-teal to-wasfah-teal">
                    {key === 'calories' && <Utensils className="h-6 w-6 text-white" />}
                    {key === 'protein' && <Apple className="h-6 w-6 text-white" />}
                    {key === 'water' && <Droplets className="h-6 w-6 text-white" />}
                    {key === 'exercise' && <Activity className="h-6 w-6 text-white" />}
                  </div>
                  <h4 className="font-medium capitalize">{key}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {goal.current} / {goal.target} {goal.unit}
                  </p>
                  <Progress 
                    value={calculateProgress(goal.current, goal.target)} 
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round(calculateProgress(goal.current, goal.target))}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">+2%</p>
              <p className="text-sm text-gray-600">Weekly Progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">7</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">72</p>
              <p className="text-sm text-gray-600">Avg Heart Rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">85%</p>
              <p className="text-sm text-gray-600">Health Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Health Features */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Health & Wellness Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthFeatures.map((feature, index) => (
              <Link key={index} to={feature.path}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        {React.cloneElement(feature.icon, { className: "h-6 w-6 text-white" })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                          {feature.isNew && (
                            <Badge className="bg-purple-100 text-purple-800 text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                        <p className="text-xs text-wasfah-bright-teal font-medium">{feature.stats}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-wasfah-bright-teal group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Apple className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Logged breakfast - Oatmeal with berries</p>
                  <p className="text-sm text-gray-600">320 calories, 8g protein</p>
                </div>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Completed 25 min workout</p>
                  <p className="text-sm text-gray-600">Cardio session</p>
                </div>
                <span className="text-xs text-gray-500">4h ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Pill className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Micronutrient alert - Low Vitamin D</p>
                  <p className="text-sm text-gray-600">Consider sunlight exposure</p>
                </div>
                <span className="text-xs text-gray-500">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/nutrition-goals">
            <Button className="w-full h-16 bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-bright-teal">
              <Plus className="h-5 w-5 mr-2" />
              Log Food
            </Button>
          </Link>
          <Link to="/micronutrient-tracker">
            <Button variant="outline" className="w-full h-16 border-purple-200 text-purple-700 hover:bg-purple-50">
              <Pill className="h-5 w-5 mr-2" />
              Check Nutrients
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default HealthTrackingHomePage;
