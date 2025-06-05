
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Wifi, WifiOff, Bluetooth, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

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
  const { t } = useRTL();
  
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
      title: t("Scanning for devices", "البحث عن الأجهزة"),
      description: t("Looking for nearby smart kitchen devices...", "البحث عن أجهزة المطبخ الذكية القريبة..."),
    });
    
    setTimeout(() => {
      setScanning(false);
      toast({
        title: t("Scan complete", "اكتمل البحث"),
        description: t("No new devices found. Make sure your device is in pairing mode.", "لم يتم العثور على أجهزة جديدة. تأكد من أن جهازك في وضع الاقتران."),
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
      title: t("Device disconnected", "تم فصل الجهاز"),
      description: t("The device has been disconnected successfully.", "تم فصل الجهاز بنجاح."),
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
      title: t("Device connected", "تم توصيل الجهاز"),
      description: t("The device has been connected successfully.", "تم توصيل الجهاز بنجاح."),
    });
  };

  const handleRemove = (deviceId: string) => {
    setDevices(devices => devices.filter(device => device.id !== deviceId));
    toast({
      title: t("Device removed", "تم حذف الجهاز"),
      description: t("The device has been removed from your account.", "تم حذف الجهاز من حسابك."),
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
    <PageContainer header={{ title: t('Connected Devices', 'الأجهزة المتصلة'), showBackButton: true }}>
      <div className="p-4 space-y-6 pb-24">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t('Connected Devices', 'الأجهزة المتصلة')}</h1>
            <p className="text-gray-600">{t('Manage your smart kitchen devices', 'إدارة أجهزة المطبخ الذكية')}</p>
          </div>
          <Button 
            onClick={handleScanDevices} 
            disabled={scanning}
            className="flex items-center gap-2"
          >
            <Bluetooth size={16} />
            {scanning ? t('Scanning...', 'جاري البحث...') : t('Scan for Devices', 'البحث عن الأجهزة')}
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
                              {t('Connected', 'متصل')}
                            </>
                          ) : (
                            <>
                              <WifiOff size={12} className="mr-1" />
                              {t('Disconnected', 'غير متصل')}
                            </>
                          )}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{t('Last seen:', 'آخر ظهور:')} {device.lastSeen}</span>
                        {device.batteryLevel && (
                          <span className={getBatteryColor(device.batteryLevel)}>
                            {t('Battery:', 'البطارية:')} {device.batteryLevel}%
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
                        {t('Disconnect', 'قطع الاتصال')}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConnect(device.id)}
                      >
                        {t('Connect', 'اتصال')}
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
              <h3 className="text-lg font-medium mb-2">{t('No Connected Devices', 'لا توجد أجهزة متصلة')}</h3>
              <p className="text-gray-600 mb-4">{t('Connect smart kitchen devices to enhance your cooking experience', 'قم بتوصيل أجهزة المطبخ الذكية لتحسين تجربة الطبخ')}</p>
              <Button onClick={handleScanDevices}>
                {t('Scan for Devices', 'البحث عن الأجهزة')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
