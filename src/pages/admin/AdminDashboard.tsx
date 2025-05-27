
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
  ArrowDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Wasfah AI admin panel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12%</span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,724</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">8.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Subscriptions</CardTitle>
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

        <Card>
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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Server Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cpu className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">CPU Usage</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">28%</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cpu className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Memory Usage</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">62%</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cpu className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Disk Space</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">43%</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '43%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-md">Database Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Connections</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">24 / 100</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Query Time</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">95ms avg</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Last Backup</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-green-500">Successful</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Today at 04:30 AM (2 hours ago)
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-md">API Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Requests/min</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">1,286</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Response Time</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">132ms avg</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Error Rate</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">0.2%</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Signups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">User</th>
                  <th className="text-left py-3 px-2">Email</th>
                  <th className="text-left py-3 px-2">Signup Date</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Plan</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">User {index + 1}</td>
                    <td className="py-3 px-2">user{index + 1}@example.com</td>
                    <td className="py-3 px-2">{new Date().toLocaleDateString()}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        index % 3 === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {index % 3 === 0 ? 'Active' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {index % 2 === 0 ? 'Free' : 'Premium'}
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
