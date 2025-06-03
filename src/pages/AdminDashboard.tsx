
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  ChefHat, 
  TrendingUp, 
  Star,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12,534',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Recipes',
      value: '1,847',
      change: '+8%',
      icon: ChefHat,
      color: 'text-green-600'
    },
    {
      title: 'Active Sessions',
      value: '234',
      change: '+23%',
      icon: Activity,
      color: 'text-orange-600'
    },
    {
      title: 'Avg Rating',
      value: '4.8',
      change: '+0.2',
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  const recentActivity = [
    { action: 'New recipe published', user: 'Chef Maria', time: '2 min ago', status: 'success' },
    { action: 'User reported issue', user: 'John Doe', time: '5 min ago', status: 'warning' },
    { action: 'Recipe approved', user: 'Admin', time: '10 min ago', status: 'success' },
    { action: 'System backup completed', user: 'System', time: '1 hour ago', status: 'info' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="mt-4">
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {stat.change} from last month
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {activity.status === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                    {activity.status === 'info' && <Activity className="h-4 w-4 text-blue-500" />}
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ChefHat className="h-4 w-4 mr-2" />
                Review Recipes
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                System Health
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
