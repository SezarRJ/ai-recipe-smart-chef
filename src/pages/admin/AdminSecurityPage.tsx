
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, AlertTriangle, Users, Clock, Ban, 
  CheckCircle, XCircle, Eye, Trash2, Plus,
  Activity, Globe, Lock, Key, Zap
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login_failed' | 'suspicious_activity' | 'blocked_ip' | 'session_expired';
  description: string;
  ip: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  user?: string;
}

interface ActiveSession {
  id: string;
  userId: string;
  userEmail: string;
  ip: string;
  device: string;
  location: string;
  loginTime: string;
  lastActivity: string;
  isAdmin: boolean;
}

interface BlockedIP {
  ip: string;
  reason: string;
  blockedAt: string;
  expiresAt?: string;
  isAutomatic: boolean;
}

export default function AdminSecurityPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [newBlockedIP, setNewBlockedIP] = useState('');
  const [blockReason, setBlockReason] = useState('');

  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'login_failed',
      description: 'Multiple failed login attempts',
      ip: '192.168.1.100',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      severity: 'medium',
      user: 'user@example.com'
    },
    {
      id: '2',
      type: 'suspicious_activity',
      description: 'Unusual API access pattern detected',
      ip: '10.0.0.50',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      severity: 'high'
    },
    {
      id: '3',
      type: 'blocked_ip',
      description: 'IP automatically blocked for suspicious activity',
      ip: '203.0.113.15',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      severity: 'high'
    }
  ]);

  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([
    {
      id: '1',
      userId: 'user1',
      userEmail: 'admin@wasfahai.com',
      ip: '192.168.1.10',
      device: 'Chrome on Windows',
      location: 'New York, US',
      loginTime: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      lastActivity: new Date(Date.now() - 5 * 60000).toISOString(),
      isAdmin: true
    },
    {
      id: '2',
      userId: 'user2',
      userEmail: 'user@example.com',
      ip: '192.168.1.15',
      device: 'Safari on macOS',
      location: 'London, UK',
      loginTime: new Date(Date.now() - 30 * 60000).toISOString(),
      lastActivity: new Date(Date.now() - 2 * 60000).toISOString(),
      isAdmin: false
    }
  ]);

  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([
    {
      ip: '203.0.113.15',
      reason: 'Automated suspicious activity',
      blockedAt: new Date(Date.now() - 30 * 60000).toISOString(),
      isAutomatic: true
    },
    {
      ip: '198.51.100.50',
      reason: 'Manual block - spam attempts',
      blockedAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      expiresAt: new Date(Date.now() + 22 * 60 * 60000).toISOString(),
      isAutomatic: false
    }
  ]);

  const [securityConfig, setSecurityConfig] = useState({
    autoBlockEnabled: true,
    failedLoginThreshold: 5,
    blockDuration: 24,
    monitoringEnabled: true,
    alertsEnabled: true,
    ipWhitelistEnabled: false
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login_failed': return <XCircle className="h-4 w-4" />;
      case 'suspicious_activity': return <AlertTriangle className="h-4 w-4" />;
      case 'blocked_ip': return <Ban className="h-4 w-4" />;
      case 'session_expired': return <Clock className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const handleBlockIP = async () => {
    if (!newBlockedIP.trim()) return;

    const newBlock: BlockedIP = {
      ip: newBlockedIP,
      reason: blockReason || 'Manual block',
      blockedAt: new Date().toISOString(),
      isAutomatic: false
    };

    setBlockedIPs(prev => [newBlock, ...prev]);
    setNewBlockedIP('');
    setBlockReason('');
    
    toast({
      title: "IP Blocked",
      description: `IP address ${newBlockedIP} has been blocked.`,
    });
  };

  const handleUnblockIP = (ip: string) => {
    setBlockedIPs(prev => prev.filter(blocked => blocked.ip !== ip));
    toast({
      title: "IP Unblocked",
      description: `IP address ${ip} has been unblocked.`,
    });
  };

  const handleTerminateSession = (sessionId: string, userEmail: string) => {
    setActiveSessions(prev => prev.filter(session => session.id !== sessionId));
    toast({
      title: "Session Terminated",
      description: `Session for ${userEmail} has been terminated.`,
    });
  };

  const updateSecurityConfig = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Security Configuration Updated",
        description: "Security settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update security configuration.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Security Center</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Real-time Monitoring
          </Badge>
          <Badge variant={securityConfig.monitoringEnabled ? "default" : "secondary"}>
            {securityConfig.monitoringEnabled ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Security Events</p>
                <p className="text-2xl font-bold">{securityEvents.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold">{activeSessions.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Blocked IPs</p>
                <p className="text-2xl font-bold">{blockedIPs.length}</p>
              </div>
              <Ban className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold">
                  {securityEvents.filter(e => e.severity === 'high').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Security Events
          </CardTitle>
          <CardDescription>Real-time monitoring of security-related activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getEventIcon(event.type)}
                  <div>
                    <p className="font-medium">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Globe className="h-3 w-3" />
                      <span>{event.ip}</span>
                      {event.user && (
                        <>
                          <span>•</span>
                          <span>{event.user}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{new Date(event.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={getSeverityColor(event.severity) as any}>
                  {event.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>Monitor and manage user sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Login Time</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{session.userEmail}</span>
                      {session.isAdmin && (
                        <Badge variant="secondary" className="text-xs">Admin</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{session.device}</p>
                      <p className="text-xs text-gray-500">{session.ip}</p>
                    </div>
                  </TableCell>
                  <TableCell>{session.location}</TableCell>
                  <TableCell className="text-sm">
                    {new Date(session.loginTime).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(session.lastActivity).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTerminateSession(session.id, session.userEmail)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Terminate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* IP Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5" />
              Block IP Address
            </CardTitle>
            <CardDescription>Manually block suspicious IP addresses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newIP">IP Address</Label>
              <Input
                id="newIP"
                value={newBlockedIP}
                onChange={(e) => setNewBlockedIP(e.target.value)}
                placeholder="192.168.1.100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason (optional)</Label>
              <Input
                id="reason"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Suspicious activity, spam, etc."
              />
            </div>
            <Button onClick={handleBlockIP} disabled={!newBlockedIP.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Block IP
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security Configuration
            </CardTitle>
            <CardDescription>Configure automatic security policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Block Suspicious IPs</Label>
                <p className="text-sm text-gray-500">Automatically block threatening IPs</p>
              </div>
              <Switch
                checked={securityConfig.autoBlockEnabled}
                onCheckedChange={(checked) => 
                  setSecurityConfig({...securityConfig, autoBlockEnabled: checked})
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="threshold">Failed Login Threshold</Label>
              <Input
                id="threshold"
                type="number"
                value={securityConfig.failedLoginThreshold}
                onChange={(e) => 
                  setSecurityConfig({
                    ...securityConfig, 
                    failedLoginThreshold: parseInt(e.target.value)
                  })
                }
                className="w-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Block Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                value={securityConfig.blockDuration}
                onChange={(e) => 
                  setSecurityConfig({
                    ...securityConfig, 
                    blockDuration: parseInt(e.target.value)
                  })
                }
                className="w-24"
              />
            </div>

            <Button onClick={updateSecurityConfig} disabled={loading}>
              Save Configuration
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Blocked IPs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ban className="h-5 w-5" />
            Blocked IP Addresses
          </CardTitle>
          <CardDescription>Manage blocked IP addresses and access restrictions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP Address</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Blocked At</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blockedIPs.map((blocked) => (
                <TableRow key={blocked.ip}>
                  <TableCell className="font-mono">{blocked.ip}</TableCell>
                  <TableCell>{blocked.reason}</TableCell>
                  <TableCell className="text-sm">
                    {new Date(blocked.blockedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={blocked.isAutomatic ? "secondary" : "outline"}>
                      {blocked.isAutomatic ? 'Automatic' : 'Manual'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {blocked.expiresAt ? (
                      <Badge variant="outline" className="text-xs">
                        Expires {new Date(blocked.expiresAt).toLocaleDateString()}
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">Permanent</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnblockIP(blocked.ip)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Unblock
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
