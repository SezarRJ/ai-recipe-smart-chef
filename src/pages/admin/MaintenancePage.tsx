
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Trash2, 
  RefreshCw, 
  HardDrive, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Server,
  Loader2,
  Monitor,
  Cpu,
  MemoryStick,
  Wifi,
  Shield,
  Clock,
  Users,
  FileText,
  Settings,
  Power,
  Download
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function MaintenancePage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTask, setActiveTask] = useState('');

  const systemMetrics = [
    { label: 'CPU Usage', value: '45%', status: 'good', icon: Cpu, color: 'text-green-600' },
    { label: 'Memory Usage', value: '62%', status: 'warning', icon: MemoryStick, color: 'text-yellow-600' },
    { label: 'Disk Space', value: '78%', status: 'warning', icon: HardDrive, color: 'text-yellow-600' },
    { label: 'Network', value: '98%', status: 'good', icon: Wifi, color: 'text-green-600' },
    { label: 'Active Users', value: '1,234', status: 'good', icon: Users, color: 'text-blue-600' },
    { label: 'Database Connections', value: '23/100', status: 'good', icon: Database, color: 'text-green-600' }
  ];

  const maintenanceTasks = [
    {
      id: 'cleanup-logs',
      title: 'Clean Up System Logs',
      description: 'Remove old system logs and error reports to free up space',
      icon: Trash2,
      status: 'ready',
      lastRun: '2 days ago',
      category: 'cleanup',
      estimatedTime: '5 minutes',
      priority: 'medium'
    },
    {
      id: 'optimize-db',
      title: 'Optimize Database',
      description: 'Analyze and optimize database performance and indexes',
      icon: Database,
      status: 'ready',
      lastRun: '1 week ago',
      category: 'performance',
      estimatedTime: '15 minutes',
      priority: 'high'
    },
    {
      id: 'refresh-cache',
      title: 'Refresh Application Cache',
      description: 'Clear and rebuild application cache for better performance',
      icon: RefreshCw,
      status: 'ready',
      lastRun: '1 day ago',
      category: 'performance',
      estimatedTime: '3 minutes',
      priority: 'low'
    },
    {
      id: 'check-storage',
      title: 'Storage Analysis',
      description: 'Analyze storage usage and clean up unused files',
      icon: HardDrive,
      status: 'ready',
      lastRun: '3 days ago',
      category: 'cleanup',
      estimatedTime: '10 minutes',
      priority: 'medium'
    },
    {
      id: 'security-scan',
      title: 'Security Scan',
      description: 'Run security scan and vulnerability assessment',
      icon: Shield,
      status: 'ready',
      lastRun: '1 week ago',
      category: 'security',
      estimatedTime: '20 minutes',
      priority: 'high'
    },
    {
      id: 'backup-verification',
      title: 'Backup Verification',
      description: 'Verify integrity of recent backups',
      icon: FileText,
      status: 'ready',
      lastRun: '6 hours ago',
      category: 'backup',
      estimatedTime: '8 minutes',
      priority: 'high'
    }
  ];

  const scheduledTasks = [
    { name: 'Daily Log Cleanup', nextRun: '2024-01-16 02:00', status: 'scheduled', frequency: 'Daily' },
    { name: 'Weekly Database Optimization', nextRun: '2024-01-21 03:00', status: 'scheduled', frequency: 'Weekly' },
    { name: 'Monthly Security Scan', nextRun: '2024-02-01 01:00', status: 'scheduled', frequency: 'Monthly' },
    { name: 'Backup Verification', nextRun: '2024-01-16 04:00', status: 'scheduled', frequency: 'Every 6 hours' }
  ];

  const runMaintenance = async (task: any) => {
    setIsRunning(true);
    setActiveTask(task.title);
    setProgress(0);

    const steps = [
      { progress: 10, message: 'Initializing task...' },
      { progress: 30, message: 'Processing data...' },
      { progress: 60, message: 'Applying changes...' },
      { progress: 85, message: 'Finalizing...' },
      { progress: 100, message: 'Complete!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(step.progress);
      
      if (step.progress === 100) {
        toast({
          title: "Maintenance Complete",
          description: `${task.title} has been completed successfully`,
        });
      }
    }

    setIsRunning(false);
    setProgress(0);
    setActiveTask('');
  };

  const runAllMaintenance = async () => {
    setIsRunning(true);
    setActiveTask('Running all maintenance tasks');
    
    for (let i = 0; i <= 100; i += 2) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setIsRunning(false);
    setProgress(0);
    setActiveTask('');
    
    toast({
      title: "All Maintenance Complete",
      description: "All maintenance tasks have been completed successfully"
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
        return 'bg-green-50 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cleanup':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'performance':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'security':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'backup':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Maintenance</h1>
          <p className="text-gray-600 mt-1">Monitor and maintain system health and performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2 px-3 py-1 bg-green-50 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            System Online
          </Badge>
          <Button 
            onClick={runAllMaintenance} 
            disabled={isRunning}
            className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Running...
              </>
            ) : (
              <>
                <Settings className="h-4 w-4 mr-2" />
                Run All Tasks
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      {isRunning && (
        <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
          <Monitor className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-medium text-blue-800">{activeTask}</p>
                <span className="text-sm text-blue-600 font-semibold">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full h-3 bg-blue-200" />
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="border-l-4 border-l-wasfah-bright-teal hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-wasfah-bright-teal/10 rounded-lg">
                      <Icon className="h-4 w-4 text-wasfah-bright-teal" />
                    </div>
                    {getStatusIcon(metric.status)}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
          <TabsTrigger value="tasks" className="data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white">
            Maintenance Tasks
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white">
            Scheduled Tasks
          </TabsTrigger>
          <TabsTrigger value="emergency" className="data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white">
            Emergency Actions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-wasfah-deep-teal">
                <Activity className="h-5 w-5" />
                Available Maintenance Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {maintenanceTasks.map((task) => {
                  const Icon = task.icon;
                  return (
                    <div key={task.id} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-wasfah-bright-teal/30 transition-all duration-200">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-3 bg-wasfah-bright-teal/10 rounded-xl">
                          <Icon className="h-6 w-6 text-wasfah-bright-teal" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
                            <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{task.description}</p>
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Est. {task.estimatedTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <RefreshCw className="h-4 w-4" />
                              Last run: {task.lastRun}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(task.status)} variant="outline">
                          {task.status}
                        </Badge>
                        <Button
                          onClick={() => runMaintenance(task)}
                          disabled={isRunning}
                          variant="outline"
                          size="sm"
                          className="border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
                        >
                          {isRunning ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Run Task'
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-wasfah-deep-teal">
                <Clock className="h-5 w-5" />
                Scheduled Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-wasfah-bright-teal rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">{task.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>Next run: {task.nextRun}</span>
                          <span>•</span>
                          <span>{task.frequency}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="mt-6">
          <Card className="border-red-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  These actions should only be used in emergency situations and may cause temporary service interruption.
                  Use with extreme caution.
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="destructive" size="sm" className="w-full h-12 flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Force Cache Clear
                </Button>
                <Button variant="destructive" size="sm" className="w-full h-12 flex items-center gap-2">
                  <Power className="h-4 w-4" />
                  Restart Services
                </Button>
                <Button variant="destructive" size="sm" className="w-full h-12 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Emergency Backup
                </Button>
                <Button variant="destructive" size="sm" className="w-full h-12 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Lock System
                </Button>
                <Button variant="destructive" size="sm" className="w-full h-12 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Safe Mode
                </Button>
                <Button variant="destructive" size="sm" className="w-full h-12 flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  System Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
