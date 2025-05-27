
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Wifi, WifiOff, Plus, Trash2, Bluetooth } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConnectedDevice {
  id: string;
  name: string;
  type: 'scale' | 'thermometer' | 'phone' | 'tablet';
  status: 'connected' | 'disconnected';
  lastSeen: string;
  batteryLevel?: number;
}

export default function ConnectedDevicesPage() {
  const { toast } = useToast();
  const [devices, setDevices] = useState<ConnectedDevice[]>([
    {
      id: '1',
      name: 'Kitchen Smart Scale',
      type: 'scale',
      status: 'connected',
      lastSeen: '2 minutes ago',
      batteryLevel: 85
    },
    {
      id: '2',
      name: 'Smart Thermometer',
      type: 'thermometer',
      status: 'disconnected',
      lastSeen: '1 hour ago',
      batteryLevel: 42
    }
  ]);
  const [scanning, setScanning] = useState(false);

  const handleScanDevices = () => {
    setScanning(true);
    toast({
      title: "Scanning for devices",
      description: "Looking for nearby smart kitchen devices...",
    });
    
    setTimeout(() => {
      setScanning(false);
      toast({
        title: "Scan complete",
        description: "No new devices found. Make sure your device is in pairing mode.",
      });
    }, 3000);
  };

  const handleDisconnect = (deviceId: string) => {
    setDevices(devices => 
      devices.map(device => 
        device.id === deviceId 
          ? { ...device, status: 'disconnected' as const, lastSeen: 'Just now' }
          : device
      )
    );
    toast({
      title: "Device disconnected",
      description: "The device has been disconnected successfully.",
    });
  };

  const handleConnect = (deviceId: string) => {
    setDevices(devices => 
      devices.map(device => 
        device.id === deviceId 
          ? { ...device, status: 'connected' as const, lastSeen: 'Just now' }
          : device
      )
    );
    toast({
      title: "Device connected",
      description: "The device has been connected successfully.",
    });
  };

  const handleRemove = (deviceId: string) => {
    setDevices(devices => devices.filter(device => device.id !== deviceId));
    toast({
      title: "Device removed",
      description: "The device has been removed from your account.",
    });
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'scale':
        return '⚖️';
      case 'thermometer':
        return '🌡️';
      case 'phone':
        return '📱';
      case 'tablet':
        return '📱';
      default:
        return '📱';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <PageContainer header={{ title: 'Connected Devices', showBackButton: true }}>
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Connected Devices</h1>
            <p className="text-gray-600">Manage your smart kitchen devices</p>
          </div>
          <Button 
            onClick={handleScanDevices} 
            disabled={scanning}
            className="flex items-center gap-2"
          >
            <Bluetooth size={16} />
            {scanning ? 'Scanning...' : 'Scan for Devices'}
          </Button>
        </div>

        <div className="space-y-4">
          {devices.map((device) => (
            <Card key={device.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getDeviceIcon(device.type)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{device.name}</span>
                        <Badge variant={device.status === 'connected' ? 'default' : 'secondary'}>
                          {device.status === 'connected' ? (
                            <>
                              <Wifi size={12} className="mr-1" />
                              Connected
                            </>
                          ) : (
                            <>
                              <WifiOff size={12} className="mr-1" />
                              Disconnected
                            </>
                          )}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Last seen: {device.lastSeen}</span>
                        {device.batteryLevel && (
                          <span className={getBatteryColor(device.batteryLevel)}>
                            Battery: {device.batteryLevel}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {device.status === 'connected' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(device.id)}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConnect(device.id)}
                      >
                        Connect
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(device.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {devices.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bluetooth className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Connected Devices</h3>
              <p className="text-gray-600 mb-4">Connect smart kitchen devices to enhance your cooking experience</p>
              <Button onClick={handleScanDevices}>
                Scan for Devices
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
