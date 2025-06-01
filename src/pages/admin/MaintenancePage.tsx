
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  Trash2, 
  RefreshCw, 
  HardDrive, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Server,
  Loader2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function MaintenancePage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const maintenanceTasks = [
    {
      id: 'cleanup-logs',
      title: 'Clean Up Logs',
      description: 'Remove old system logs and error reports',
      icon: Trash2,
      status: 'ready',
      lastRun: '2 days ago'
    },
    {
      id: 'optimize-db',
      title: 'Optimize Database',
      description: 'Analyze and optimize database performance',
      icon: Database,
      status: 'ready',
      lastRun: '1 week ago'
    },
    {
      id: 'refresh-cache',
      title: 'Refresh Cache',
      description: 'Clear and rebuild application cache',
      icon: RefreshCw,
      status: 'ready',
      lastRun: '1 day ago'
    },
    {
      id: 'check-storage',
      title: 'Storage Analysis',
      description: 'Analyze storage usage and clean up unused files',
      icon: HardDrive,
      status: 'ready',
      lastRun: '3 days ago'
    }
  ];

  const systemStats = [
    { label: 'Database Size', value: '2.3 GB', status: 'good' },
    { label: 'Cache Size', value: '156 MB', status: 'good' },
    { label: 'Storage Used', value: '75%', status: 'warning' },
    { label: 'System Load', value: '45%', status: 'good' }
  ];

  const runMaintenance = async (taskId: string) => {
    setIsRunning(true);
    setProgress(0);

    // Simulate maintenance task
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setIsRunning(false);
    setProgress(0);
    
    toast({
      title: "Maintenance Complete",
      description: `${taskId} has been completed successfully`
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
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">System Maintenance</h1>
        <Badge variant="outline" className="flex items-center gap-2">
          <Server className="h-4 w-4" />
          System Status: Online
        </Badge>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                {getStatusIcon(stat.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p>Maintenance task in progress...</p>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600">{progress}% complete</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Maintenance Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceTasks.map((task) => {
              const Icon = task.icon;
              return (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <p className="text-xs text-gray-500">Last run: {task.lastRun}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    <Button
                      onClick={() => runMaintenance(task.id)}
                      disabled={isRunning}
                      variant="outline"
                      size="sm"
                    >
                      {isRunning ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Run'
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Actions */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Emergency Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                These actions should only be used in emergency situations and may cause temporary service interruption.
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button variant="destructive" size="sm">
                Force Cache Clear
              </Button>
              <Button variant="destructive" size="sm">
                Restart Services
              </Button>
              <Button variant="destructive" size="sm">
                Emergency Backup
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
