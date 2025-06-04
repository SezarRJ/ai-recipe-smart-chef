
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Wrench, AlertTriangle, CheckCircle, Clock, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const AdminMaintenancePage = () => {
  const { toast } = useToast();
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleToggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
    toast({
      title: maintenanceMode ? "Maintenance Mode Disabled" : "Maintenance Mode Enabled",
      description: `Application is now ${maintenanceMode ? 'available to users' : 'in maintenance mode'}.`,
    });
  };

  const maintenanceTasks = [
    { id: 1, name: 'Database Cleanup', status: 'completed', lastRun: '2 hours ago' },
    { id: 2, name: 'Cache Clear', status: 'scheduled', lastRun: '1 day ago' },
    { id: 3, name: 'Log Rotation', status: 'running', lastRun: '30 minutes ago' },
    { id: 4, name: 'Backup Verification', status: 'pending', lastRun: '1 week ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminPageWrapper title="System Maintenance">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">System Maintenance</h1>
            <p className="text-muted-foreground">Manage system maintenance tasks and schedules.</p>
          </div>
          <Button 
            onClick={handleToggleMaintenance}
            variant={maintenanceMode ? "destructive" : "default"}
          >
            {maintenanceMode ? <Square className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {maintenanceMode ? 'Disable' : 'Enable'} Maintenance Mode
          </Button>
        </div>

        {maintenanceMode && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Maintenance mode is currently active. Users will see a maintenance page.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-sm text-gray-600">Completed Tasks</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-gray-600">Running Tasks</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-gray-600">Scheduled Tasks</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Maintenance Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{task.name}</div>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Last run: {task.lastRun}</span>
                    <Button variant="outline" size="sm">
                      Run Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminMaintenancePage;
