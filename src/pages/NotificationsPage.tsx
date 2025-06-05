
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Mail, Smartphone, Clock, Heart } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const NotificationsPage = () => {
  const { direction, language, t } = useRTL();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [recipeReminders, setRecipeReminders] = useState(true);
  const [mealPlanAlerts, setMealPlanAlerts] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(false);

  return (
    <PageContainer header={{ title: t("Notifications", "الإشعارات", "Bildirimler"), showBackButton: true }}>
      <div className="p-4 pb-24 space-y-6" dir={direction}>
        <div className="bg-gradient-to-br from-blue-500 to-teal-600 p-6 rounded-lg text-white text-center mb-6">
          <Bell className="h-12 w-12 mx-auto mb-3" />
          <h1 className="text-2xl font-bold mb-2">{t("Notifications", "الإشعارات", "Bildirimler")}</h1>
          <p className="opacity-90">{t("Manage your notification preferences", "إدارة تفضيلات الإشعارات", "Bildirim tercihlerinizi yönetin")}</p>
        </div>

        {/* Push Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              {t("Push Notifications", "الإشعارات المباشرة", "Anlık Bildirimler")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("Enable Push Notifications", "تفعيل الإشعارات المباشرة", "Anlık Bildirimleri Etkinleştir")}</Label>
                <p className="text-sm text-gray-600">{t("Receive instant updates", "تلقي التحديثات الفورية", "Anında güncellemeler alın")}</p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              {t("Email Notifications", "إشعارات البريد الإلكتروني", "E-posta Bildirimleri")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("Email Updates", "تحديثات البريد الإلكتروني", "E-posta Güncellemeleri")}</Label>
                <p className="text-sm text-gray-600">{t("Get notified via email", "تلقي الإشعارات عبر البريد الإلكتروني", "E-posta ile bildirim alın")}</p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("Promotional Emails", "رسائل إعلانية", "Promosyon E-postaları")}</Label>
                <p className="text-sm text-gray-600">{t("Special offers and updates", "عروض خاصة وتحديثات", "Özel teklifler ve güncellemeler")}</p>
              </div>
              <Switch
                checked={promotionalEmails}
                onCheckedChange={setPromotionalEmails}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Specific */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              {t("Recipe & Meal Notifications", "إشعارات الوصفات والوجبات", "Tarif ve Yemek Bildirimleri")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("Recipe Reminders", "تذكيرات الوصفات", "Tarif Hatırlatıcıları")}</Label>
                <p className="text-sm text-gray-600">{t("Cooking time reminders", "تذكيرات وقت الطبخ", "Pişirme zamanı hatırlatıcıları")}</p>
              </div>
              <Switch
                checked={recipeReminders}
                onCheckedChange={setRecipeReminders}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("Meal Plan Alerts", "تنبيهات خطة الوجبات", "Yemek Planı Uyarıları")}</Label>
                <p className="text-sm text-gray-600">{t("Daily meal planning notifications", "إشعارات تخطيط الوجبات اليومية", "Günlük yemek planlama bildirimleri")}</p>
              </div>
              <Switch
                checked={mealPlanAlerts}
                onCheckedChange={setMealPlanAlerts}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default NotificationsPage;
