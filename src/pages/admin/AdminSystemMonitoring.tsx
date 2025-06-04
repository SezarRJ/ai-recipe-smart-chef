
import React from 'react';
import { Server, Database, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminSystemMonitoring = () => {
  const lastUpdated = new Date().toLocaleTimeString();
  
  const servers = [
    {
      name: 'Web Server 1',
      status: 'Healthy',
      uptime: '42d 18h 13m',
      cpu: 28,
      memory: 45,
      disk: 36,
    },
    {
      name: 'Web Server 2',
      status: 'Healthy',
      uptime: '12d 9h 54m',
      cpu: 32,
      memory: 57,
      disk: 41,
    },
    {
      name: 'API Server',
      status: 'Warning',
      uptime: '5d 12h 20m',
      cpu: 68,
      memory: 77,
      disk: 32,
      alert: 'High CPU Usage',
    },
    {
      name: 'Database Server',
      status: 'Healthy',
      uptime: '21d 6h 42m',
      cpu: 24,
      memory: 62,
      disk: 56,
    },
  ];
  
  const databases = [
    {
      name: 'Main PostgreSQL',
      connections: '24/100',
      queryTime: '95ms',
      replication: 'Healthy',
      lastBackup: '2h ago',
    },
    {
      name: 'Redis Cache',
      connections: '86/500',
      queryTime: '2ms',
      replication: 'N/A',
      lastBackup: 'N/A',
    },
    {
      name: 'Analytics Database',
      connections: '5/25',
      queryTime: '152ms',
      replication: 'Healthy',
      lastBackup: '12h ago',
    },
  ];
  
  const serviceStatuses = [
    { name: 'OpenAI API', status: 'Operational', latency: '320ms' },
    { name: 'Stripe', status: 'Operational', latency: '186ms' },
    { name: 'Email Delivery', status: 'Operational', latency: '243ms' },
    { name: 'Firebase', status: 'Operational', latency: '110ms' },
    { name: 'Push Notifications', status: 'Degraded', latency: '2.1s', issue: 'Experiencing delays' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">System Monitoring</h1>
          <p className="text-muted-foreground">Monitor server health and infrastructure status.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            View Logs
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Server className="h-5 w-5 mr-2" /> 
              Servers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Server</th>
                    <th className="text-left py-2 px-2">Status</th>
                    <th className="text-left py-2 px-2">Uptime</th>
                    <th className="text-left py-2 px-2">CPU</th>
                    <th className="text-left py-2 px-2">Memory</th>
                    <th className="text-left py-2 px-2">Disk</th>
                    <th className="text-left py-2 px-2">Issues</th>
                  </tr>
                </thead>
                <tbody>
                  {servers.map((server, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{server.name}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          server.status === 'Healthy' 
                            ? 'bg-green-100 text-green-800' 
                            : server.status === 'Warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {server.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">{server.uptime}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                            <div className={`h-2 rounded-full ${
                              server.cpu < 50 
                                ? 'bg-green-500' 
                                : server.cpu < 80 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`} style={{ width: `${server.cpu}%` }}></div>
                          </div>
                          <span className="text-xs">{server.cpu}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                            <div className={`h-2 rounded-full ${
                              server.memory < 50 
                                ? 'bg-green-500' 
                                : server.memory < 80 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`} style={{ width: `${server.memory}%` }}></div>
                          </div>
                          <span className="text-xs">{server.memory}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                            <div className={`h-2 rounded-full ${
                              server.disk < 50 
                                ? 'bg-green-500' 
                                : server.disk < 80 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`} style={{ width: `${server.disk}%` }}></div>
                          </div>
                          <span className="text-xs">{server.disk}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        {server.alert ? (
                          <div className="flex items-center text-yellow-600 text-sm">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {server.alert}
                          </div>
                        ) : (
                          <span className="text-green-600 text-sm">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Database className="h-5 w-5 mr-2" /> 
              Databases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Database</th>
                    <th className="text-left py-2 px-2">Connections</th>
                    <th className="text-left py-2 px-2">Avg. Query Time</th>
                    <th className="text-left py-2 px-2">Replication</th>
                    <th className="text-left py-2 px-2">Last Backup</th>
                  </tr>
                </thead>
                <tbody>
                  {databases.map((db, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{db.name}</td>
                      <td className="py-3 px-2">{db.connections}</td>
                      <td className="py-3 px-2">{db.queryTime}</td>
                      <td className="py-3 px-2">
                        {db.replication === 'Healthy' ? (
                          <span className="text-green-600">{db.replication}</span>
                        ) : (
                          <span>{db.replication}</span>
                        )}
                      </td>
                      <td className="py-3 px-2">{db.lastBackup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">External Services Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceStatuses.map((service, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{service.name}</h3>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      service.status === 'Operational' 
                        ? 'bg-green-100 text-green-800' 
                        : service.status === 'Degraded'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Response time: {service.latency}</p>
                  {service.issue && (
                    <p className="text-sm text-yellow-600 mt-2 flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" /> {service.issue}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSystemMonitoring;
