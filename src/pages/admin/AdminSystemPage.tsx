
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  Database, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  RefreshCw
} from 'lucide-react';

const AdminSystemPage = () => {
  const [systemStats] = useState({
    uptime: '15 days, 4 hours',
    cpuUsage: 35,
    memoryUsage: 68,
    diskUsage: 42,
    networkIn: '125 MB/s',
    networkOut: '89 MB/s',
    activeUsers: 1247,
    totalRequests: 98542,
    errorRate: 0.02
  });

  const [services] = useState([
    { name: 'API Server', status: 'healthy', uptime: '99.9%', cpu: 25, memory: 45 },
    { name: 'Database', status: 'healthy', uptime: '99.8%', cpu: 15, memory: 75 },
    { name: 'Cache Server', status: 'warning', uptime: '98.5%', cpu: 45, memory: 82 },
    { name: 'File Storage', status: 'healthy', uptime: '99.9%', cpu: 10, memory: 35 },
    { name: 'AI Service', status: 'healthy', uptime: '99.2%', cpu: 65, memory: 58 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <AdminPageWrapper title="System Monitoring">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">System Status</h1>
            <p className="text-muted-foreground">Monitor system performance and health.</p>
          </div>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Server className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">System Uptime</p>
                  <p className="text-lg font-bold">{systemStats.uptime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Cpu className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">CPU Usage</p>
                  <p className="text-lg font-bold">{systemStats.cpuUsage}%</p>
                  <Progress value={systemStats.cpuUsage} className="h-1 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MemoryStick className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Memory Usage</p>
                  <p className="text-lg font-bold">{systemStats.memoryUsage}%</p>
                  <Progress value={systemStats.memoryUsage} className="h-1 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <HardDrive className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Disk Usage</p>
                  <p className="text-lg font-bold">{systemStats.diskUsage}%</p>
                  <Progress value={systemStats.diskUsage} className="h-1 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="services" className="w-full">
          <TabsList>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Service Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(service.status)}
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">CPU</p>
                          <p className="text-sm font-medium">{service.cpu}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Memory</p>
                          <p className="text-sm font-medium">{service.memory}%</p>
                        </div>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Network In</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{systemStats.networkIn}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Network Out</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{systemStats.networkOut}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Error Rate</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{systemStats.errorRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Recent System Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  <div className="p-3 bg-gray-50 rounded text-sm font-mono">
                    [2024-01-15 10:30:15] INFO: System health check completed successfully
                  </div>
                  <div className="p-3 bg-yellow-50 rounded text-sm font-mono">
                    [2024-01-15 10:25:32] WARN: Cache server memory usage above 80%
                  </div>
                  <div className="p-3 bg-gray-50 rounded text-sm font-mono">
                    [2024-01-15 10:20:18] INFO: Database backup completed
                  </div>
                  <div className="p-3 bg-green-50 rounded text-sm font-mono">
                    [2024-01-15 10:15:45] SUCCESS: AI service deployment completed
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminSystemPage;
