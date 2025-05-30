
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface NotificationContextType {
  requestPermission: () => Promise<boolean>;
  sendNotification: (title: string, options?: NotificationOptions) => void;
  isSupported: boolean;
  permission: NotificationPermission;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported] = useState('Notification' in window);
  const { toast } = useToast();

  useEffect(() => {
    if (isSupported) {
      setPermission(Notification.permission);
    }
  }, [isSupported]);

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) {
      toast({
        title: 'Notifications not supported',
        description: 'Your browser does not support notifications.',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        toast({
          title: 'Notifications enabled',
          description: 'You will now receive cooking reminders and updates.',
        });
        return true;
      } else {
        toast({
          title: 'Notifications denied',
          description: 'You can enable them later in your browser settings.',
        });
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (!isSupported || permission !== 'granted') {
      // Fallback to toast notification
      toast({
        title,
        description: options?.body,
      });
      return;
    }

    try {
      new Notification(title, {
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        ...options,
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      // Fallback to toast
      toast({
        title,
        description: options?.body,
      });
    }
  };

  const value: NotificationContextType = {
    requestPermission,
    sendNotification,
    isSupported,
    permission,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Utility functions for specific notifications
export const sendCookingReminder = (recipeName: string, step: string) => {
  const { sendNotification } = useNotifications();
  sendNotification(`Cooking ${recipeName}`, {
    body: `Time for: ${step}`,
    tag: 'cooking-reminder',
  });
};

export const sendMealPlanReminder = (mealType: string, recipeName: string) => {
  const { sendNotification } = useNotifications();
  sendNotification(`${mealType} Reminder`, {
    body: `It's time to prepare ${recipeName}`,
    tag: 'meal-reminder',
  });
};
