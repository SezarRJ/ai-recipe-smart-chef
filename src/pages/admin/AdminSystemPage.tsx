
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Server, Database, HardDrive, Activity, AlertTriangle, CheckCircle, RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const AdminSystemPage = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const systemMetrics = [
    {
      name: 'CPU Usage',
      value: 45,
      status: 'good',
      icon: Activity,
      unit: '%'
    },
    {
      name: 'Memory Usage',
      value: 68,
      status: 'warning',
      icon: Database,
      unit: '%'
    },
    {
      name: 'Storage Usage',
      value: 82,
      status: 'warning',
      icon: HardDrive,
      unit: '%'
    },
    {
      name: 'Server Uptime',
      value: 99.9,
      status: 'good',
      icon: Server,
      unit: '%'
    }
  ];

  const systemServices = [
    { name: 'Web Server', status: 'running', uptime: '15 days' },
    { name: 'Database', status: 'running', uptime: '15 days' },
    { name: 'Redis Cache', status: 'running', uptime: '15 days' },
    { name: 'File Storage', status: 'running', uptime: '15 days' },
    { name: 'Email Service', status: 'running', uptime: '15 days' },
    { name: 'Background Jobs', status: 'warning', uptime: '2 hours' }
  ];

  const systemLogs = [
    { timestamp: '2024-01-15 14:30:00', level: 'INFO', message: 'System backup completed successfully' },
    { timestamp: '2024-01-15 14:25:00', level: 'WARNING', message: 'Memory usage exceeded 70% threshold' },
    { timestamp: '2024-01-15 14:20:00', level: 'INFO', message: 'Database optimization completed' },
    { timestamp: '2024-01-15 14:15:00', level: 'ERROR', message: 'Failed to send email notification' },
    { timestamp: '2024-01-15 14:10:00', level: 'INFO', message: 'Cache cleared and rebuilt' }
  ];

  const handleRefreshMetrics = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
    toast({
      title: "Metrics Refreshed",
      description: "System metrics have been updated successfully.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'stopped':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'INFO':
        return 'bg-blue-100 text-blue-800';
      case 'WARNING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ERROR':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminPageWrapper title="System Overview">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">System Overview</h1>
            <p className="text-muted-foreground">Monitor system health, performance, and services.</p>
          </div>
          <Button onClick={handleRefreshMetrics} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Metrics
          </Button>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    {getStatusIcon(metric.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{metric.value}{metric.unit}</div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* System Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{service.name}</div>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Uptime: {service.uptime}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">System Alerts</h3>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Memory usage is approaching critical levels (68%). Consider optimizing or upgrading server resources.
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Storage usage is high (82%). Schedule cleanup or add additional storage capacity.
            </AlertDescription>
          </Alert>
        </div>

        {/* Recent System Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {systemLogs.map((log, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg text-sm">
                  <div className="text-gray-500 min-w-0 flex-shrink-0">
                    {log.timestamp}
                  </div>
                  <Badge className={getLogLevelColor(log.level)} variant="outline">
                    {log.level}
                  </Badge>
                  <div className="truncate">{log.message}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminSystemPage;
