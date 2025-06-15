
import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, Bell, Globe, Shield, HelpCircle, Star, 
  ChevronRight, Moon, Smartphone, Volume2 
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const { t, direction } = useRTL();

  // Add a `path` for all items that should navigate
  const settingsGroups = [
    {
      title: t("Account", "الحساب"),
      items: [
        {
          icon: User,
          label: t("Profile", "الملف الشخصي"),
          description: t("Manage your personal information", "إدارة معلوماتك الشخصية"),
          path: "/profile"
        },
        {
          icon: Bell,
          label: t("Notifications", "الإشعارات"),
          description: t("Configure notification preferences", "تكوين تفضيلات الإشعارات"),
          path: "/notifications"
        }
      ]
    },
    {
      title: t("Preferences", "التفضيلات"),
      items: [
        {
          icon: Globe,
          label: t("Language", "اللغة"),
          description: t("العربية / English", "العربية / English"),
          path: "/language"
        },
        {
          icon: Moon,
          label: t("Theme", "المظهر"),
          description: t("Light / Dark mode", "النمط الفاتح / الداكن"),
          path: "/appearance"
        },
        {
          icon: Volume2,
          label: t("Sound", "الصوت"),
          description: t("Audio and voice settings", "إعدادات الصوت والنطق"),
          path: "/sound-settings"
        }
      ]
    },
    {
      title: t("App", "التطبيق"),
      items: [
        {
          icon: Smartphone,
          label: t("App Preferences", "تفضيلات التطبيق"),
          description: t("Customize app behavior", "تخصيص سلوك التطبيق"),
          path: "/app-preferences"
        },
        {
          icon: Shield,
          label: t("Privacy & Security", "الخصوصية والأمان"),
          description: t("Manage your privacy settings", "إدارة إعدادات الخصوصية"),
          path: "/privacy"
        }
      ]
    },
    {
      title: t("Support", "الدعم"),
      items: [
        {
          icon: HelpCircle,
          label: t("Help & Support", "المساعدة والدعم"),
          description: t("Get help and contact support", "احصل على المساعدة واتصل بالدعم"),
          path: "/help"
        },
        {
          icon: Star,
          label: t("Rate App", "قيم التطبيق"),
          description: t("Share your feedback", "شارك ملاحظاتك"),
          path: "/rate-app"
        }
      ]
    }
  ];

  return (
    <MobileLayout
      header={{
        title: t("Settings", "الإعدادات"),
        showBackButton: true
      }}
    >
      <div className={`space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 px-1">
              {group.title}
            </h3>
            <Card>
              <CardContent className="p-0">
                {group.items.map((item, itemIndex) => {
                  const rowContent = (
                    <div
                      className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        itemIndex !== group.items.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-wasfah-bright-teal/10 rounded-lg flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-wasfah-bright-teal" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900">{item.label}</h4>
                          <p className="text-sm text-gray-600 truncate">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight className={`h-5 w-5 text-gray-400 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                    </div>
                  );

                  // Wrap with <Link> if a path is defined
                  return item.path ? (
                    <Link to={item.path} key={itemIndex} className="block">
                      {rowContent}
                    </Link>
                  ) : (
                    <div key={itemIndex}>{rowContent}</div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* App Info */}
        <Card className="bg-gradient-to-r from-wasfah-bright-teal/10 to-wasfah-mint/10 border-wasfah-bright-teal/20">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-teal rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">WasfahAI</h3>
            <p className="text-sm text-gray-600 mb-4">
              {t("Version 1.0.0", "الإصدار 1.0.0")}
            </p>
            <p className="text-xs text-gray-500">
              {t("Made with ❤️ for food lovers", "صُنع بـ ❤️ لعشاق الطعام")}
            </p>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default SettingsPage;
