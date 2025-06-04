
import { useEffect, useState } from 'react';

// Conditional imports with fallbacks for web environment
let Keyboard: any;
let Network: any;
let LocalNotifications: any;
let Share: any;
let Camera: any;
let StatusBar: any;
let Haptics: any;
let ImpactStyle: any;
let CameraResultType: any;
let CameraSource: any;
let Style: any;

// Initialize Capacitor modules with fallbacks
const initializeCapacitor = async () => {
  try {
    if (typeof window !== 'undefined') {
      // Try to import Capacitor modules
      const keyboardModule = await import('@capacitor/keyboard').catch(() => null);
      const networkModule = await import('@capacitor/network').catch(() => null);
      const notificationsModule = await import('@capacitor/local-notifications').catch(() => null);
      const shareModule = await import('@capacitor/share').catch(() => null);
      const cameraModule = await import('@capacitor/camera').catch(() => null);
      const statusBarModule = await import('@capacitor/status-bar').catch(() => null);
      const hapticsModule = await import('@capacitor/haptics').catch(() => null);

      if (keyboardModule) Keyboard = keyboardModule.Keyboard;
      if (networkModule) Network = networkModule.Network;
      if (notificationsModule) LocalNotifications = notificationsModule.LocalNotifications;
      if (shareModule) Share = shareModule.Share;
      if (cameraModule) {
        Camera = cameraModule.Camera;
        CameraResultType = cameraModule.CameraResultType;
        CameraSource = cameraModule.CameraSource;
      }
      if (statusBarModule) {
        StatusBar = statusBarModule.StatusBar;
        Style = statusBarModule.Style;
      }
      if (hapticsModule) {
        Haptics = hapticsModule.Haptics;
        ImpactStyle = hapticsModule.ImpactStyle;
      }
    }
  } catch (error) {
    console.log('Capacitor modules not available in this environment:', error);
  }
};

// Initialize on module load
initializeCapacitor();

// Fallback implementations
const fallbackKeyboard = {
  addListener: () => ({ remove: () => {} })
};

const fallbackNetwork = {
  getStatus: () => Promise.resolve({ connected: true }),
  addListener: () => ({ remove: () => {} })
};

const fallbackLocalNotifications = {
  requestPermissions: () => Promise.resolve({ display: 'granted' }),
  schedule: () => Promise.resolve(),
  getPending: () => Promise.resolve({ notifications: [] }),
  getDeliveredNotifications: () => Promise.resolve({ notifications: [] }),
  removeAllDeliveredNotifications: () => Promise.resolve()
};

const fallbackShare = {
  share: () => Promise.resolve()
};

const fallbackCamera = {
  getPhoto: () => Promise.resolve({ webPath: null })
};

const fallbackStatusBar = {
  setStyle: () => Promise.resolve(),
  setBackgroundColor: () => Promise.resolve()
};

const fallbackHaptics = {
  impact: () => Promise.resolve()
};

const fallbackImpactStyle = {
  Light: 'LIGHT',
  Medium: 'MEDIUM',
  Heavy: 'HEAVY'
};

const fallbackCameraResultType = {
  Uri: 'uri'
};

const fallbackCameraSource = {
  Camera: 'camera',
  Photos: 'photos'
};

const fallbackStyle = {
  Light: 'LIGHT'
};

export const useNativeFeatures = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    let networkListener: any;
    let showListener: any;
    let hideListener: any;

    // Setup network monitoring
    const setupNetwork = async () => {
      try {
        const networkApi = Network || fallbackNetwork;
        const status = await networkApi.getStatus();
        setIsOnline(status.connected);

        networkListener = await networkApi.addListener('networkStatusChange', (status: any) => {
          setIsOnline(status.connected);
          console.log('Network status changed:', status);
        });
      } catch (error) {
        console.log('Network monitoring not available:', error);
        setIsOnline(true); // Assume online in web environment
      }
    };

    // Setup keyboard monitoring
    const setupKeyboard = async () => {
      try {
        const keyboardApi = Keyboard || fallbackKeyboard;
        showListener = await keyboardApi.addListener('keyboardWillShow', (info: any) => {
          setKeyboardVisible(true);
          console.log('Keyboard will show:', info);
        });

        hideListener = await keyboardApi.addListener('keyboardWillHide', () => {
          setKeyboardVisible(false);
          console.log('Keyboard will hide');
        });
      } catch (error) {
        console.log('Keyboard monitoring not available:', error);
      }
    };

    // Setup status bar
    const setupStatusBar = async () => {
      try {
        const statusBarApi = StatusBar || fallbackStatusBar;
        const styleApi = Style || fallbackStyle;
        await statusBarApi.setStyle({ style: styleApi.Light });
        await statusBarApi.setBackgroundColor({ color: '#F97316' });
        console.log('Status bar configured');
      } catch (error) {
        console.log('Status bar not available:', error);
      }
    };

    // Setup notifications
    const setupNotifications = async () => {
      try {
        const notificationsApi = LocalNotifications || fallbackLocalNotifications;
        const permission = await notificationsApi.requestPermissions();
        console.log('Notification permissions:', permission);
      } catch (error) {
        console.log('Notifications not available:', error);
      }
    };

    setupNetwork();
    setupKeyboard();
    setupStatusBar();
    setupNotifications();

    // Cleanup function
    return () => {
      if (networkListener && networkListener.remove) {
        networkListener.remove();
      }
      if (showListener && showListener.remove) {
        showListener.remove();
      }
      if (hideListener && hideListener.remove) {
        hideListener.remove();
      }
    };
  }, []);

  const takePicture = async () => {
    try {
      const cameraApi = Camera || fallbackCamera;
      const resultType = CameraResultType || fallbackCameraResultType;
      const source = CameraSource || fallbackCameraSource;
      
      const image = await cameraApi.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: resultType.Uri,
        source: source.Camera
      });

      await hapticFeedback('medium');
      console.log('Picture taken:', image.webPath);
      return image.webPath;
    } catch (error) {
      console.error('Error taking picture:', error);
      return null;
    }
  };

  const selectFromGallery = async () => {
    try {
      const cameraApi = Camera || fallbackCamera;
      const resultType = CameraResultType || fallbackCameraResultType;
      const source = CameraSource || fallbackCameraSource;
      
      const image = await cameraApi.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: resultType.Uri,
        source: source.Photos
      });

      await hapticFeedback('light');
      console.log('Image selected from gallery:', image.webPath);
      return image.webPath;
    } catch (error) {
      console.error('Error selecting from gallery:', error);
      return null;
    }
  };

  const hapticFeedback = async (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    try {
      const hapticsApi = Haptics || fallbackHaptics;
      const impactStyleApi = ImpactStyle || fallbackImpactStyle;
      
      if (hapticsApi && impactStyleApi) {
        const impactStyle = style === 'light' ? impactStyleApi.Light :
                           style === 'heavy' ? impactStyleApi.Heavy : impactStyleApi.Medium;
        await hapticsApi.impact({ style: impactStyle });
        console.log('Haptic feedback triggered:', style);
      }
    } catch (error) {
      console.error('Haptic feedback not supported:', error);
    }
  };

  const shareContent = async (title: string, text: string, url?: string) => {
    try {
      const shareApi = Share || fallbackShare;
      await shareApi.share({
        title,
        text,
        url,
      });
      await hapticFeedback('light');
      console.log('Content shared successfully');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const scheduleNotification = async (title: string, body: string, delay: number = 0) => {
    try {
      const notificationsApi = LocalNotifications || fallbackLocalNotifications;
      const notification = {
        title,
        body,
        id: Date.now(),
        schedule: { at: new Date(Date.now() + delay) },
        sound: 'beep.wav',
        attachments: undefined,
        actionTypeId: "",
        extra: null
      };

      await notificationsApi.schedule({
        notifications: [notification]
      });

      setNotifications(prev => [...prev, notification]);
      console.log('Notification scheduled:', notification);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  const getNotifications = async () => {
    try {
      const notificationsApi = LocalNotifications || fallbackLocalNotifications;
      const pending = await notificationsApi.getPending();
      const delivered = await notificationsApi.getDeliveredNotifications();
      return { pending: pending.notifications, delivered: delivered.notifications };
    } catch (error) {
      console.error('Error getting notifications:', error);
      return { pending: [], delivered: [] };
    }
  };

  const clearNotifications = async () => {
    try {
      const notificationsApi = LocalNotifications || fallbackLocalNotifications;
      await notificationsApi.removeAllDeliveredNotifications();
      setNotifications([]);
      console.log('Notifications cleared');
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  return {
    isOnline,
    keyboardVisible,
    notifications,
    takePicture,
    selectFromGallery,
    hapticFeedback,
    shareContent,
    scheduleNotification,
    getNotifications,
    clearNotifications
  };
};

export interface NativeFeatures {
  isOnline: boolean;
  hapticFeedback: () => Promise<void>;
  vibrate: (pattern?: number | number[]) => void;
  share: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
}
