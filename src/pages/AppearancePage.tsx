
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Moon, Sun, Palette, Type, Eye } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useTheme } from '@/contexts/ThemeContext';

const AppearancePage = () => {
  const { direction, language, t } = useRTL();
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState('medium');
  const [colorScheme, setColorScheme] = useState('wasfah');
  const [animations, setAnimations] = useState(true);

  return (
    <PageContainer header={{ title: t("Appearance", "المظهر", "Görünüm"), showBackButton: true }}>
      <div className="p-4 pb-24 space-y-6" dir={direction}>
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-lg text-white text-center mb-6">
          <Palette className="h-12 w-12 mx-auto mb-3" />
          <h1 className="text-2xl font-bold mb-2">{t("Appearance", "المظهر", "Görünüm")}</h1>
          <p className="opacity-90">{t("Customize how WasfahAI looks", "خصص مظهر وصفة الذكية", "WasfahAI'nin görünümünü özelleştirin")}</p>
        </div>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              {t("Theme", "المظهر", "Tema")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("Dark Mode", "الوضع المظلم", "Karanlık Mod")}</Label>
                <p className="text-sm text-gray-600">{t("Switch between light and dark themes", "التبديل بين المظاهر الفاتحة والداكنة", "Açık ve koyu temalar arasında geçiş yapın")}</p>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              {t("Display", "العرض", "Görüntü")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("Font Size", "حجم الخط", "Yazı Boyutu")}</Label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">{t("Small", "صغير", "Küçük")}</SelectItem>
                  <SelectItem value="medium">{t("Medium", "متوسط", "Orta")}</SelectItem>
                  <SelectItem value="large">{t("Large", "كبير", "Büyük")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("Color Scheme", "نظام الألوان", "Renk Şeması")}</Label>
              <Select value={colorScheme} onValueChange={setColorScheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wasfah">{t("Wasfah Green", "أخضر وصفة", "Wasfah Yeşili")}</SelectItem>
                  <SelectItem value="blue">{t("Ocean Blue", "أزرق المحيط", "Okyanus Mavisi")}</SelectItem>
                  <SelectItem value="purple">{t("Royal Purple", "بنفسجي ملكي", "Kraliyet Moru")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("Animations", "الحركات", "Animasyonlar")}</Label>
                <p className="text-sm text-gray-600">{t("Enable smooth transitions", "تفعيل الانتقالات السلسة", "Düzgün geçişleri etkinleştir")}</p>
              </div>
              <Switch
                checked={animations}
                onCheckedChange={setAnimations}
              />
            </div>
          </CardContent>
        </Card>

        {/* Accessibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {t("Accessibility", "إمكانية الوصول", "Erişilebilirlik")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("High Contrast", "تباين عالي", "Yüksek Kontrast")}</Label>
                <p className="text-sm text-gray-600">{t("Improve visibility", "تحسين الرؤية", "Görünürlüğü artır")}</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("Reduce Motion", "تقليل الحركة", "Hareketi Azalt")}</Label>
                <p className="text-sm text-gray-600">{t("Minimize animations", "تقليل الحركات", "Animasyonları azalt")}</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AppearancePage;
