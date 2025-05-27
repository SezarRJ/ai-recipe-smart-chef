
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Share } from '@capacitor/share';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { Network } from '@capacitor/network';
import { LocalNotifications } from '@capacitor/local-notifications';
import { useEffect, useState } from 'react';

// Conditional import for haptics with fallback
let Haptics: any;
let ImpactStyle: any;

try {
  const haptics = require('@capacitor/haptics');
  Haptics = haptics.Haptics;
  ImpactStyle = haptics.ImpactStyle;
} catch (error) {
  console.log('Haptics not available:', error);
  Haptics = {
    impact: async () => console.log('Haptic feedback not available')
  };
  ImpactStyle = {
    Light: 'LIGHT',
    Medium: 'MEDIUM', 
    Heavy: 'HEAVY'
  };
}

export const useNativeFeatures = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Setup network monitoring
    const setupNetwork = async () => {
      try {
        const status = await Network.getStatus();
        setIsOnline(status.connected);
        
        const listener = Network.addListener('networkStatusChange', status => {
          setIsOnline(status.connected);
          console.log('Network status changed:', status);
        });

        return () => listener.remove();
      } catch (error) {
        console.log('Network monitoring not available:', error);
      }
    };

    // Setup keyboard monitoring
    const setupKeyboard = () => {
      try {
        const showListener = Keyboard.addListener('keyboardWillShow', (info) => {
          setKeyboardVisible(true);
          console.log('Keyboard will show:', info);
        });
        
        const hideListener = Keyboard.addListener('keyboardWillHide', () => {
          setKeyboardVisible(false);
          console.log('Keyboard will hide');
        });

        return () => {
          showListener.remove();
          hideListener.remove();
        };
      } catch (error) {
        console.log('Keyboard monitoring not available:', error);
      }
    };

    // Setup status bar
    const setupStatusBar = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#F97316' });
        console.log('Status bar configured');
      } catch (error) {
        console.log('Status bar not available:', error);
      }
    };

    // Setup notifications
    const setupNotifications = async () => {
      try {
        const permission = await LocalNotifications.requestPermissions();
        console.log('Notification permissions:', permission);
      } catch (error) {
        console.log('Notifications not available:', error);
      }
    };

    setupNetwork();
    setupKeyboard();
    setupStatusBar();
    setupNotifications();
  }, []);

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
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
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
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
      const impactStyle = style === 'light' ? ImpactStyle.Light : 
                         style === 'heavy' ? ImpactStyle.Heavy : ImpactStyle.Medium;
      await Haptics.impact({ style: impactStyle });
      console.log('Haptic feedback triggered:', style);
    } catch (error) {
      console.error('Haptic feedback not supported:', error);
    }
  };

  const shareContent = async (title: string, text: string, url?: string) => {
    try {
      await Share.share({
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

      await LocalNotifications.schedule({
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
      const pending = await LocalNotifications.getPending();
      const delivered = await LocalNotifications.getDeliveredNotifications();
      return { pending: pending.notifications, delivered: delivered.notifications };
    } catch (error) {
      console.error('Error getting notifications:', error);
      return { pending: [], delivered: [] };
    }
  };

  const clearNotifications = async () => {
    try {
      await LocalNotifications.removeAllDeliveredNotifications();
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
