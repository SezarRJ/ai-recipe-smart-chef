
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Share } from '@capacitor/share';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { Network } from '@capacitor/network';
import { LocalNotifications } from '@capacitor/local-notifications';
import { useEffect, useState } from 'react';

export const useNativeFeatures = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // Setup network monitoring
    const setupNetwork = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
      
      Network.addListener('networkStatusChange', status => {
        setIsOnline(status.connected);
      });
    };

    // Setup keyboard monitoring
    const setupKeyboard = () => {
      Keyboard.addListener('keyboardWillShow', () => {
        setKeyboardVisible(true);
      });
      
      Keyboard.addListener('keyboardWillHide', () => {
        setKeyboardVisible(false);
      });
    };

    // Setup status bar
    const setupStatusBar = async () => {
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#F97316' });
    };

    setupNetwork();
    setupKeyboard();
    setupStatusBar();
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
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const scheduleNotification = async (title: string, body: string, delay: number = 0) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: Date.now(),
            schedule: { at: new Date(Date.now() + delay) },
            sound: 'beep.wav',
            attachments: undefined,
            actionTypeId: "",
            extra: null
          }
        ]
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  return {
    isOnline,
    keyboardVisible,
    takePicture,
    selectFromGallery,
    hapticFeedback,
    shareContent,
    scheduleNotification
  };
};
