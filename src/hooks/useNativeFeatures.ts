
import { useEffect, useState } from 'react';

export const useNativeFeatures = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Simple online/offline detection for web
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const takePicture = async () => {
    console.log('Camera feature not available in web environment');
    return null;
  };

  const selectFromGallery = async () => {
    console.log('Gallery feature not available in web environment');
    return null;
  };

  const hapticFeedback = async (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    console.log('Haptic feedback not available in web environment');
  };

  const shareContent = async (title: string, text: string, url?: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        console.log('Sharing failed:', error);
      }
    } else {
      console.log('Web Share API not supported');
    }
  };

  const scheduleNotification = async (title: string, body: string, delay: number = 0) => {
    console.log('Notifications not available in web environment');
  };

  const getNotifications = async () => {
    return { pending: [], delivered: [] };
  };

  const clearNotifications = async () => {
    setNotifications([]);
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
