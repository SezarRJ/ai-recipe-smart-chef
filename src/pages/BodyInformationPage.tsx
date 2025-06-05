
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Scale, Ruler, Calendar, Activity } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';

const BodyInformationPage = () => {
  const { direction, language, t } = useRTL();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');

  const handleSave = () => {
    toast({
      title: t("Saved Successfully", "تم الحفظ بنجاح", "Başarıyla Kaydedildi"),
      description: t("Your body information has been updated", "تم تحديث معلومات جسمك", "Vücut bilgileriniz güncellendi"),
    });
  };

  const calculateBMI = () => {
    if (height && weight) {
      const heightInM = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const bmi = weightInKg / (heightInM * heightInM);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: t("Underweight", "نقص الوزن", "Zayıf"), color: "text-blue-500" };
    if (bmi < 25) return { text: t("Normal", "طبيعي", "Normal"), color: "text-green-500" };
    if (bmi < 30) return { text: t("Overweight", "زيادة الوزن", "Fazla Kilolu"), color: "text-yellow-500" };
    return { text: t("Obese", "سمنة", "Obez"), color: "text-red-500" };
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <PageContainer header={{ title: t("Body Information", "معلومات الجسم", "Vücut Bilgileri"), showBackButton: true }}>
      <div className="p-4 pb-24 space-y-6" dir={direction}>
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-lg text-white text-center mb-6">
          <User className="h-12 w-12 mx-auto mb-3" />
          <h1 className="text-2xl font-bold mb-2">{t("Body Information", "معلومات الجسم", "Vücut Bilgileri")}</h1>
          <p className="opacity-90">{t("Track your body metrics for better health", "تتبع مقاييس جسمك لصحة أفضل", "Daha iyi sağlık için vücut ölçümlerinizi takip edin")}</p>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t("Basic Information", "المعلومات الأساسية", "Temel Bilgiler")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  {t("Height (cm)", "الطول (سم)", "Boy (cm)")}
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="170"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  {t("Weight (kg)", "الوزن (كجم)", "Ağırlık (kg)")}
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t("Age", "العمر", "Yaş")}
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("Gender", "الجنس", "Cinsiyet")}</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select gender", "اختر الجنس", "Cinsiyet seçin")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t("Male", "ذكر", "Erkek")}</SelectItem>
                    <SelectItem value="female">{t("Female", "أنثى", "Kadın")}</SelectItem>
                    <SelectItem value="other">{t("Other", "آخر", "Diğer")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BMI Calculator */}
        {bmi && (
          <Card>
            <CardHeader>
              <CardTitle>{t("BMI Calculator", "حاسبة مؤشر كتلة الجسم", "BMI Hesaplayıcı")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-wasfah-bright-teal mb-2">{bmi}</div>
                <div className={`text-lg font-medium ${bmiCategory?.color}`}>
                  {bmiCategory?.text}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {t("Body Mass Index", "مؤشر كتلة الجسم", "Vücut Kitle İndeksi")}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Activity Level */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {t("Activity & Goals", "النشاط والأهداف", "Aktivite ve Hedefler")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("Activity Level", "مستوى النشاط", "Aktivite Seviyesi")}</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue placeholder={t("Select activity level", "اختر مستوى النشاط", "Aktivite seviyesi seçin")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">{t("Sedentary", "قليل الحركة", "Hareketsiz")}</SelectItem>
                  <SelectItem value="light">{t("Light Activity", "نشاط خفيف", "Hafif Aktivite")}</SelectItem>
                  <SelectItem value="moderate">{t("Moderate Activity", "نشاط متوسط", "Orta Aktivite")}</SelectItem>
                  <SelectItem value="active">{t("Very Active", "نشط جداً", "Çok Aktif")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("Health Goal", "الهدف الصحي", "Sağlık Hedefi")}</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue placeholder={t("Select your goal", "اختر هدفك", "Hedefinizi seçin")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">{t("Lose Weight", "فقدان الوزن", "Kilo Vermek")}</SelectItem>
                  <SelectItem value="maintain">{t("Maintain Weight", "المحافظة على الوزن", "Kiloyu Korumak")}</SelectItem>
                  <SelectItem value="gain">{t("Gain Weight", "زيادة الوزن", "Kilo Almak")}</SelectItem>
                  <SelectItem value="muscle">{t("Build Muscle", "بناء العضلات", "Kas Yapmak")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full bg-pink-500 hover:bg-pink-600">
          {t("Save Information", "حفظ المعلومات", "Bilgileri Kaydet")}
        </Button>
      </div>
    </PageContainer>
  );
};

export default BodyInformationPage;
