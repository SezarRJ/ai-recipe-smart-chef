
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Bell, Mail, MessageSquare, Clock, ChefHat, ShoppingCart, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function NotificationsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    mealReminders: true,
    recipeUpdates: true,
    shoppingListReminders: true,
    favoriteChefUpdates: true,
    weeklyMealPlan: true,
    ingredients: true,
    socialActivity: false,
    marketingEmails: false,
    quietHours: '22:00-08:00',
    frequency: 'instant'
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: `Notification preference has been updated.`,
    });
  };

  const testNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Test Notification', {
            body: 'This is a test notification from WasfahAI',
            icon: '/favicon.ico'
          });
          toast({
            title: "Test Notification Sent",
            description: "Check your browser notifications.",
          });
        }
      });
    }
  };

  const notificationCategories = [
    {
      icon: <ChefHat size={20} />,
      title: 'Cooking & Recipes',
      items: [
        { key: 'mealReminders', label: 'Meal preparation reminders', description: 'Get notified when it\'s time to start cooking' },
        { key: 'recipeUpdates', label: 'New recipe suggestions', description: 'Discover new recipes based on your preferences' },
        { key: 'favoriteChefUpdates', label: 'Favorite chef updates', description: 'Get notified when your favorite chefs post new recipes' }
      ]
    },
    {
      icon: <ShoppingCart size={20} />,
      title: 'Shopping & Planning',
      items: [
        { key: 'shoppingListReminders', label: 'Shopping list reminders', description: 'Remind me about my shopping list' },
        { key: 'weeklyMealPlan', label: 'Weekly meal plan ready', description: 'Get notified when your meal plan is generated' },
        { key: 'ingredients', label: 'Ingredient expiration alerts', description: 'Alerts when ingredients are about to expire' }
      ]
    },
    {
      icon: <Heart size={20} />,
      title: 'Social & Community',
      items: [
        { key: 'socialActivity', label: 'Social activity', description: 'Comments, likes, and shares on your recipes' },
        { key: 'marketingEmails', label: 'Marketing emails', description: 'Special offers, tips, and newsletter' }
      ]
    }
  ];

  return (
    <PageContainer header={{ title: 'Notifications', showBackButton: true }}>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Notification Settings</h1>
          <p className="text-gray-600">Manage how and when you receive notifications</p>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={16} />
                <div>
                  <label className="font-medium">Push Notifications</label>
                  <p className="text-sm text-gray-600">Receive notifications in your browser</p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(value) => handleSettingChange('pushNotifications', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail size={16} />
                <div>
                  <label className="font-medium">Email Notifications</label>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(value) => handleSettingChange('emailNotifications', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare size={16} />
                <div>
                  <label className="font-medium">SMS Notifications</label>
                  <p className="text-sm text-gray-600">Receive notifications via text message</p>
                </div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(value) => handleSettingChange('smsNotifications', value)}
              />
            </div>

            <div className="pt-4">
              <Button onClick={testNotification} variant="outline">
                Send Test Notification
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Categories */}
        {notificationCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.icon}
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">{item.label}</label>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <Switch
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onCheckedChange={(value) => handleSettingChange(item.key, value)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Timing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Timing & Frequency
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="font-medium mb-2 block">Notification Frequency</label>
              <Select value={settings.frequency} onValueChange={(value) => handleSettingChange('frequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-medium mb-2 block">Quiet Hours</label>
              <Select value={settings.quietHours} onValueChange={(value) => handleSettingChange('quietHours', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No quiet hours</SelectItem>
                  <SelectItem value="22:00-08:00">10 PM - 8 AM</SelectItem>
                  <SelectItem value="23:00-07:00">11 PM - 7 AM</SelectItem>
                  <SelectItem value="00:00-09:00">12 AM - 9 AM</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600 mt-1">No notifications during these hours</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
