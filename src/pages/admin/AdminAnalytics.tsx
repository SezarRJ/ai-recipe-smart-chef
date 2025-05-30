
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  Users, TrendingUp, DollarSign, Activity, 
  Download, Calendar, Eye, Heart, 
  ChefHat, MessageCircle, Star, Clock
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(false);

  // Sample data - in real app, this would come from API
  const userGrowthData = [
    { month: 'Jan', users: 1200, premium: 240 },
    { month: 'Feb', users: 1350, premium: 285 },
    { month: 'Mar', users: 1580, premium: 340 },
    { month: 'Apr', users: 1720, premium: 390 },
    { month: 'May', users: 1950, premium: 445 },
    { month: 'Jun', users: 2180, premium: 520 },
  ];

  const engagementData = [
    { day: 'Mon', views: 1240, interactions: 89, shares: 12 },
    { day: 'Tue', views: 1580, interactions: 112, shares: 18 },
    { day: 'Wed', views: 1350, interactions: 95, shares: 15 },
    { day: 'Thu', views: 1680, interactions: 128, shares: 22 },
    { day: 'Fri', views: 1920, interactions: 145, shares: 28 },
    { day: 'Sat', views: 2150, interactions: 165, shares: 35 },
    { day: 'Sun', views: 1890, interactions: 138, shares: 25 },
  ];

  const revenueData = [
    { month: 'Jan', subscription: 12000, premium: 3200, total: 15200 },
    { month: 'Feb', subscription: 13500, premium: 3800, total: 17300 },
    { month: 'Mar', subscription: 15200, premium: 4100, total: 19300 },
    { month: 'Apr', subscription: 16800, premium: 4600, total: 21400 },
    { month: 'May', subscription: 18500, premium: 5200, total: 23700 },
    { month: 'Jun', subscription: 20200, premium: 5800, total: 26000 },
  ];

  const contentData = [
    { category: 'Vegetarian', recipes: 450, favorites: 1200 },
    { category: 'Mediterranean', recipes: 320, favorites: 890 },
    { category: 'Asian', recipes: 380, favorites: 1050 },
    { category: 'Desserts', recipes: 280, favorites: 980 },
    { category: 'Quick Meals', recipes: 420, favorites: 1350 },
    { category: 'Healthy', recipes: 520, favorites: 1480 },
  ];

  const userTypeData = [
    { name: 'Free Users', value: 65, color: '#8884d8' },
    { name: 'Premium Users', value: 25, color: '#82ca9d' },
    { name: 'Trial Users', value: 10, color: '#ffc658' },
  ];

  const performanceData = [
    { metric: 'Page Load Time', value: 2.3, unit: 'seconds', trend: 'down' },
    { metric: 'API Response Time', value: 145, unit: 'ms', trend: 'up' },
    { metric: 'Error Rate', value: 0.12, unit: '%', trend: 'down' },
    { metric: 'Uptime', value: 99.8, unit: '%', trend: 'up' },
  ];

  const topRecipes = [
    { name: 'Mediterranean Quinoa Bowl', views: 12450, likes: 890, shares: 145 },
    { name: 'Spicy Thai Curry', views: 11280, likes: 765, shares: 120 },
    { name: 'Classic Chocolate Chip Cookies', views: 10950, likes: 1240, shares: 280 },
    { name: 'Healthy Green Smoothie', views: 9850, likes: 670, shares: 95 },
    { name: 'Italian Pasta Primavera', views: 9320, likes: 590, shares: 88 },
  ];

  const handleExport = async (type: string) => {
    setLoading(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      // In real app, this would trigger file download
      console.log(`Exporting ${type} data...`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={() => handleExport('all')}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">24,385</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold">$26,000</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +21.3% from last month
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Recipes</p>
                <p className="text-2xl font-bold">2,370</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.7% from last month
                </p>
              </div>
              <ChefHat className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold">73.2%</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.1% from last month
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <ChefHat className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Engagement
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        {/* Users Analytics */}
        <TabsContent value="users">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Total and premium user growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="premium" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of user types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Analytics */}
        <TabsContent value="content">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance by Category</CardTitle>
                <CardDescription>Recipe count and favorite metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={contentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="recipes" fill="#8884d8" />
                    <Bar dataKey="favorites" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Recipes</CardTitle>
                <CardDescription>Most viewed and liked recipes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRecipes.map((recipe, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{index + 1}</Badge>
                        <div>
                          <p className="font-medium">{recipe.name}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {recipe.views.toLocaleString()} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {recipe.likes} likes
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {recipe.shares} shares
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Engagement Analytics */}
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Engagement Trends</CardTitle>
              <CardDescription>User interactions, views, and shares</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="interactions" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="shares" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Analytics */}
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>Monthly revenue breakdown by source</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Legend />
                  <Bar dataKey="subscription" fill="#8884d8" />
                  <Bar dataKey="premium" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Analytics */}
        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{metric.metric}</p>
                        <p className="text-2xl font-bold flex items-center gap-2">
                          {metric.value} {metric.unit}
                          {metric.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system health overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Database Health</span>
                    <Badge variant="default">Excellent</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API Performance</span>
                    <Badge variant="default">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Server Load</span>
                    <Badge variant="secondary">Normal</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cache Hit Rate</span>
                    <Badge variant="default">95.2%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CDN Status</span>
                    <Badge variant="default">Optimal</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
