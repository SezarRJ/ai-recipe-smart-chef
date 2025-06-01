import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, Server, Database, Cpu, MemoryStick, 
  HardDrive, Network, AlertTriangle, CheckCircle2,
  RefreshCw, Monitor, Zap, Clock, TrendingUp
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  responseTime: number;
  lastCheck: string;
}

export default function AdminSystemMonitoring() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock system metrics
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 34, unit: '%', status: 'good', trend: 'stable' },
    { name: 'Memory Usage', value: 67, unit: '%', status: 'warning', trend: 'up' },
    { name: 'Disk Usage', value: 45, unit: '%', status: 'good', trend: 'stable' },
    { name: 'Network I/O', value: 12.5, unit: 'MB/s', status: 'good', trend: 'down' },
    { name: 'Database Connections', value: 23, unit: '', status: 'good', trend: 'stable' },
    { name: 'API Response Time', value: 145, unit: 'ms', status: 'good', trend: 'stable' }
  ]);

  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Web Server', status: 'healthy', uptime: '99.9%', responseTime: 120, lastCheck: '30 seconds ago' },
    { name: 'Database', status: 'healthy', uptime: '99.8%', responseTime: 45, lastCheck: '1 minute ago' },
    { name: 'API Gateway', status: 'healthy', uptime: '99.9%', responseTime: 89, lastCheck: '45 seconds ago' },
    { name: 'File Storage', status: 'healthy', uptime: '99.7%', responseTime: 67, lastCheck: '2 minutes ago' },
    { name: 'Cache Layer', status: 'healthy', uptime: '99.9%', responseTime: 12, lastCheck: '1 minute ago' },
    { name: 'Background Jobs', status: 'degraded', uptime: '98.5%', responseTime: 234, lastCheck: '3 minutes ago' }
  ]);

  // Mock performance data
  const performanceData = [
    { time: '00:00', cpu: 30, memory: 65, requests: 120 },
    { time: '01:00', cpu: 25, memory: 62, requests: 95 },
    { time: '02:00', cpu: 22, memory: 58, requests: 80 },
    { time: '03:00', cpu: 28, memory: 61, requests: 110 },
    { time: '04:00', cpu: 35, memory: 68, requests: 140 },
    { time: '05:00', cpu: 42, memory: 72, requests: 180 },
    { time: '06:00', cpu: 38, memory: 70, requests: 160 },
    { time: '07:00', cpu: 45, memory: 75, requests: 200 },
    { time: '08:00', cpu: 52, memory: 78, requests: 250 },
    { time: '09:00', cpu: 48, memory: 76, requests: 220 },
    { time: '10:00', cpu: 55, memory: 80, requests: 280 },
    { time: '11:00', cpu: 50, memory: 77, requests: 240 }
  ];

  const responseTimeData = [
    { endpoint: '/api/recipes', avgTime: 145, requests: 1250 },
    { endpoint: '/api/users', avgTime: 89, requests: 890 },
    { endpoint: '/api/pantry', avgTime: 67, requests: 670 },
    { endpoint: '/api/auth', avgTime: 234, requests: 345 },
    { endpoint: '/api/search', avgTime: 178, requests: 567 },
    { endpoint: '/api/analytics', avgTime: 98, requests: 234 }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'good':
        return 'text-green-600 bg-green-100';
      case 'warning':
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'good':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'warning':
      case 'degraded':
        return <AlertTriangle className="h-4 w-4" />;
      case 'critical':
      case 'down':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <Monitor className="mr-2 h-6 w-6" /> System Monitoring
          </h1>
          <p className="text-muted-foreground">Monitor system health, performance, and service status</p>
        </div>

        <Button onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* System Health Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {systemMetrics.map((metric) => (
                <Card key={metric.name}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(metric.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metric.value}{metric.unit}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" className={getStatusColor(metric.status)}>
                        {metric.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} 
                        {metric.trend}
                      </span>
                    </div>
                    {metric.name.includes('Usage') && (
                      <Progress value={metric.value} className="mt-2 h-2" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  System Status Overview
                </CardTitle>
                <CardDescription>Real-time status of critical system components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-medium">Infrastructure</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center">
                          <Server className="mr-2 h-4 w-4" />
                          Web Servers (3)
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center">
                          <Database className="mr-2 h-4 w-4" />
                          Database Cluster
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center">
                          <Zap className="mr-2 h-4 w-4" />
                          Load Balancer
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Healthy
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">External Services</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center">
                          <Network className="mr-2 h-4 w-4" />
                          CDN Status
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Operational
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center">
                          <Cpu className="mr-2 h-4 w-4" />
                          OpenAI API
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Connected
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center">
                          <HardDrive className="mr-2 h-4 w-4" />
                          File Storage
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Slow
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            {/* Performance Charts */}
            <Card>
              <CardHeader>
                <CardTitle>System Performance (Last 12 Hours)</CardTitle>
                <CardDescription>CPU, Memory usage, and request volume over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU %" />
                      <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory %" />
                      <Line type="monotone" dataKey="requests" stroke="#ffc658" name="Requests/min" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* API Response Times */}
            <Card>
              <CardHeader>
                <CardTitle>API Endpoint Performance</CardTitle>
                <CardDescription>Average response times and request volumes by endpoint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="endpoint" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgTime" fill="#8884d8" name="Avg Response Time (ms)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Health Status</CardTitle>
                <CardDescription>Status and performance metrics for all system services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.name} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${getStatusColor(service.status)}`}>
                            {getStatusIcon(service.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Last checked: {service.lastCheck}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <Badge className={getStatusColor(service.status)}>
                            {service.status.toUpperCase()}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            Uptime: {service.uptime}
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3 mt-4 pt-4 border-t">
                        <div>
                          <div className="text-sm font-medium">Response Time</div>
                          <div className="text-lg font-bold">{service.responseTime}ms</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Uptime</div>
                          <div className="text-lg font-bold">{service.uptime}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Status</div>
                          <div className="text-lg font-bold capitalize">{service.status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                System Logs
              </CardTitle>
              <CardDescription>Recent system events and error logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {[
                  { time: '2025-01-30 14:32:15', level: 'info', message: 'User authentication successful for user ID: 12345' },
                  { time: '2025-01-30 14:31:45', level: 'warning', message: 'High memory usage detected: 78%' },
                  { time: '2025-01-30 14:30:22', level: 'info', message: 'Database backup completed successfully' },
                  { time: '2025-01-30 14:29:18', level: 'error', message: 'API rate limit exceeded for endpoint /api/search' },
                  { time: '2025-01-30 14:28:55', level: 'info', message: 'New recipe created by user ID: 67890' },
                  { time: '2025-01-30 14:27:33', level: 'warning', message: 'Slow query detected: SELECT * FROM recipes (2.3s)' },
                  { time: '2025-01-30 14:26:41', level: 'info', message: 'Cache cleared for user preferences' },
                  { time: '2025-01-30 14:25:12', level: 'info', message: 'Email notification sent successfully' }
                ].map((log, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 text-sm border-b">
                    <span className="text-muted-foreground font-mono">{log.time}</span>
                    <Badge 
                      variant="secondary" 
                      className={
                        log.level === 'error' ? 'bg-red-100 text-red-800' :
                        log.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }
                    >
                      {log.level.toUpperCase()}
                    </Badge>
                    <span className="flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}