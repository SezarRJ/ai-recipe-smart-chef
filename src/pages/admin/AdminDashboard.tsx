
import React from 'react';
import { 
  BarChart3,
  Users,
  CreditCard,
  ScrollText,
  Cpu,
  Database,
  Server,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Activity,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Wasfah AI admin panel.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,451</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12%</span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,482</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">4.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recipe Count</CardTitle>
            <ScrollText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,649</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">24</span> new today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-md flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-500" />
              Server Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">CPU Usage</span>
                <span className="text-sm">28%</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Memory</span>
                <span className="text-sm">62%</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-sm">43%</span>
              </div>
              <Progress value={43} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-md flex items-center">
              <Database className="h-5 w-5 mr-2 text-blue-500" />
              Database Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Connections</span>
              <Badge variant="secondary">24/100</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Query Time</span>
              <Badge variant="secondary">95ms</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Last Backup</span>
              <Badge className="bg-green-100 text-green-800">Success</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Today at 04:30 AM (2 hours ago)
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-md flex items-center">
              <Server className="h-5 w-5 mr-2 text-purple-500" />
              API Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Requests/min</span>
              <Badge variant="secondary">1,286</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Response Time</span>
              <Badge variant="secondary">132ms</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Error Rate</span>
              <Badge className="bg-green-100 text-green-800">0.2%</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Uptime</span>
                <span className="text-sm">99.9%</span>
              </div>
              <Progress value={99.9} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Recent User Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">User</th>
                  <th className="text-left py-3 px-2 font-medium">Email</th>
                  <th className="text-left py-3 px-2 font-medium">Action</th>
                  <th className="text-left py-3 px-2 font-medium">Time</th>
                  <th className="text-left py-3 px-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { user: 'Ahmed Hassan', email: 'ahmed@example.com', action: 'Recipe Created', time: '2 min ago', status: 'success' },
                  { user: 'Fatima Ali', email: 'fatima@example.com', action: 'Subscription Upgraded', time: '5 min ago', status: 'success' },
                  { user: 'Omar Khaled', email: 'omar@example.com', action: 'Profile Updated', time: '12 min ago', status: 'success' },
                  { user: 'Layla Mohamed', email: 'layla@example.com', action: 'Recipe Shared', time: '18 min ago', status: 'success' },
                  { user: 'Youssef Ibrahim', email: 'youssef@example.com', action: 'Login Attempt', time: '25 min ago', status: 'warning' }
                ].map((activity, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2 font-medium">{activity.user}</td>
                    <td className="py-3 px-2 text-muted-foreground">{activity.email}</td>
                    <td className="py-3 px-2">{activity.action}</td>
                    <td className="py-3 px-2 text-muted-foreground">{activity.time}</td>
                    <td className="py-3 px-2">
                      <Badge 
                        variant={activity.status === 'success' ? 'default' : 'secondary'}
                        className={activity.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {activity.status === 'success' ? 'Success' : 'Warning'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
