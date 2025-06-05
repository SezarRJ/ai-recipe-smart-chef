
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Leaf, Wheat, Milk, Fish, Nut, ShieldX } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';

const DietaryPreferencesPage = () => {
  const { direction, language, t } = useRTL();
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    seafoodFree: false,
    halal: false,
    kosher: false,
    keto: false,
    paleo: false,
  });

  const handlePreferenceChange = (key: string, checked: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: checked }));
  };

  const handleSave = () => {
    toast({
      title: t("Preferences Saved", "تم حفظ التفضيلات", "Tercihler Kaydedildi"),
      description: t("Your dietary preferences have been updated", "تم تحديث تفضيلاتك الغذائية", "Beslenme tercihleriniz güncellendi"),
    });
  };

  const dietaryOptions = [
    {
      key: 'vegetarian',
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      title: t("Vegetarian", "نباتي", "Vejetaryen"),
      description: t("No meat or fish", "بدون لحوم أو أسماك", "Et veya balık yok")
    },
    {
      key: 'vegan',
      icon: <Leaf className="h-5 w-5 text-green-600" />,
      title: t("Vegan", "نباتي صرف", "Vegan"),
      description: t("No animal products", "بدون منتجات حيوانية", "Hayvansal ürün yok")
    },
    {
      key: 'glutenFree',
      icon: <Wheat className="h-5 w-5 text-amber-500" />,
      title: t("Gluten Free", "خالي من الغلوتين", "Glutensiz"),
      description: t("No gluten-containing grains", "بدون حبوب تحتوي على الغلوتين", "Gluten içeren tahıl yok")
    },
    {
      key: 'dairyFree',
      icon: <Milk className="h-5 w-5 text-blue-500" />,
      title: t("Dairy Free", "خالي من الألبان", "Sütsüz"),
      description: t("No milk or dairy products", "بدون حليب أو منتجات ألبان", "Süt veya süt ürünleri yok")
    },
    {
      key: 'nutFree',
      icon: <Nut className="h-5 w-5 text-orange-500" />,
      title: t("Nut Free", "خالي من المكسرات", "Fındıksız"),
      description: t("No nuts or tree nuts", "بدون مكسرات", "Fındık veya ağaç fındığı yok")
    },
    {
      key: 'seafoodFree',
      icon: <Fish className="h-5 w-5 text-cyan-500" />,
      title: t("Seafood Free", "خالي من المأكولات البحرية", "Deniz Ürünleri Yok"),
      description: t("No fish or shellfish", "بدون أسماك أو محار", "Balık veya kabuklu deniz ürünü yok")
    },
    {
      key: 'halal',
      icon: <ShieldX className="h-5 w-5 text-green-700" />,
      title: t("Halal", "حلال", "Helal"),
      description: t("Islamic dietary laws", "القوانين الغذائية الإسلامية", "İslami beslenme kuralları")
    },
    {
      key: 'kosher',
      icon: <ShieldX className="h-5 w-5 text-blue-700" />,
      title: t("Kosher", "كوشر", "Koşer"),
      description: t("Jewish dietary laws", "القوانين الغذائية اليهودية", "Yahudi beslenme kuralları")
    },
    {
      key: 'keto',
      icon: <Leaf className="h-5 w-5 text-purple-500" />,
      title: t("Ketogenic", "كيتوجيني", "Ketojenik"),
      description: t("Low carb, high fat", "قليل الكربوهيدرات، عالي الدهون", "Düşük karbonhidrat, yüksek yağ")
    },
    {
      key: 'paleo',
      icon: <Leaf className="h-5 w-5 text-brown-500" />,
      title: t("Paleo", "باليو", "Paleo"),
      description: t("Stone age diet", "نظام العصر الحجري", "Taş devri diyeti")
    }
  ];

  return (
    <PageContainer header={{ title: t("Dietary Preferences", "التفضيلات الغذائية", "Beslenme Tercihleri"), showBackButton: true }}>
      <div className="p-4 pb-24 space-y-6" dir={direction}>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-lg text-white text-center mb-6">
          <Leaf className="h-12 w-12 mx-auto mb-3" />
          <h1 className="text-2xl font-bold mb-2">{t("Dietary Preferences", "التفضيلات الغذائية", "Beslenme Tercihleri")}</h1>
          <p className="opacity-90">{t("Set your dietary restrictions and preferences", "ضع قيودك وتفضيلاتك الغذائية", "Beslenme kısıtlamalarınızı ve tercihlerinizi belirleyin")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("Select Your Preferences", "اختر تفضيلاتك", "Tercihlerinizi Seçin")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dietaryOptions.map((option) => (
                <div key={option.key} className="flex items-start space-x-3 rtl:space-x-reverse p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={option.key}
                    checked={preferences[option.key as keyof typeof preferences]}
                    onCheckedChange={(checked) => handlePreferenceChange(option.key, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={option.key} className="flex items-center gap-2 font-medium cursor-pointer">
                      {option.icon}
                      {option.title}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full bg-green-500 hover:bg-green-600">
          {t("Save Preferences", "حفظ التفضيلات", "Tercihleri Kaydet")}
        </Button>
      </div>
    </PageContainer>
  );
};

export default DietaryPreferencesPage;
