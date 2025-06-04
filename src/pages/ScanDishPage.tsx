import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ScanDishComponent, ScanDishResult } from '@/components/dish/ScanDishComponent';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, ChevronDown, ChevronUp, Camera, Upload, X } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';

interface ScanHistoryItem extends ScanDishResult {
  timestamp: string;
}

const LOCAL_STORAGE_KEY = 'wasfah_scan_history';

export default function ScanDishPage() {
  const { t } = useRTL();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [scanResult, setScanResult] = useState<ScanDishResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [sortHistoryBy, setSortHistoryBy] = useState<'dateDesc' | 'nameAsc' | 'caloriesDesc'>('dateDesc');
  const [cameraActive, setCameraActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedHistory) {
      try {
        const history: ScanHistoryItem[] = JSON.parse(savedHistory);
        setScanHistory(history);
      } catch (error) {
        console.error("Failed to parse scan history from localStorage", error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: t('Camera Error', 'خطأ في الكاميرا'),
        description: t('Unable to access camera. Please check permissions.', 'غير قادر على الوصول للكاميرا. يرجى التحقق من الأذونات.'),
        variant: 'destructive',
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            analyzeImage(blob);
          }
        });
      }
    }
    stopCamera();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      analyzeImage(file);
    }
  };

  const analyzeImage = async (imageBlob: Blob) => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: ScanDishResult = {
        id: Date.now().toString(),
        name: t('Grilled Chicken Salad', 'سلطة الدجاج المشوي'),
        calories: 350,
        protein: 25,
        carbs: 15,
        fat: 8,
        ingredients: [
          t('Grilled chicken breast', 'صدر دجاج مشوي'),
          t('Mixed greens', 'خضار ورقية مشكلة'),
          t('Cherry tomatoes', 'طماطم كرزية'),
          t('Olive oil dressing', 'تتبيلة زيت الزيتون')
        ]
      };
      
      setScanResult(mockResult);
      
      const newItem: ScanHistoryItem = {
        ...mockResult,
        timestamp: new Date().toISOString(),
      };
      
      const updatedHistory = [newItem, ...scanHistory];
      setScanHistory(updatedHistory);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
      
      setAnalyzing(false);
      
      toast({
        title: t('Analysis Complete', 'اكتمل التحليل'),
        description: t('Dish analyzed successfully!', 'تم تحليل الطبق بنجاح!'),
      });
    }, 2000);
  };

  const addToTracking = () => {
    if (scanResult) {
      toast({
        title: t('Added to Health Tracking', 'تمت الإضافة إلى تتبع الصحة'),
        description: t(`${scanResult.name} added to your health log.`, `تمت إضافة ${scanResult.name} إلى سجل صحتك.`),
      });
    }
  };

  const handleRemoveHistoryItem = (id: string) => {
    const updatedHistory = scanHistory.filter(item => item.id !== id);
    setScanHistory(updatedHistory);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
    toast({
      title: t('Item Removed', 'تم حذف العنصر'),
      description: t('Scan history item removed.', 'تم حذف عنصر من سجل المسح.'),
    });
  };

  const handleClearHistory = () => {
    if (scanHistory.length === 0) {
      toast({
        title: t("History is already empty", "السجل فارغ بالفعل"),
        description: t("There are no items to clear.", "لا توجد عناصر لمسحها."),
      });
      return;
    }
    if (window.confirm(t("Are you sure you want to clear your entire scan history?", "هل أنت متأكد أنك تريد مسح سجل المسح بالكامل؟"))) {
      setScanHistory([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      toast({
        title: t('History Cleared', 'تم مسح السجل'),
        description: t('Your scan history has been cleared.', 'تم مسح سجل المسح الخاص بك.'),
      });
    }
  };

  const getSortedHistory = () => {
    const sorted = [...scanHistory];
    switch (sortHistoryBy) {
      case 'dateDesc':
        return sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      case 'nameAsc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'caloriesDesc':
        return sorted.sort((a, b) => b.calories - a.calories);
      default:
        return sorted;
    }
  };

  const sortedHistory = getSortedHistory();

  if (analyzing) {
    return (
      <PageContainer header={{ title: t('Scan Dish', 'مسح الطبق'), showBackButton: true }}>
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center space-y-4">
              <div className="animate-pulse">
                <Camera className="h-12 w-12 mx-auto text-wasfah-bright-teal mb-4" />
                <h3 className="text-lg font-semibold">{t('Analyzing Image', 'تحليل الصورة')}</h3>
                <p className="text-sm text-gray-500 mt-2">
                  {t('AI is identifying ingredients and calculating nutrition...', 'الذكاء الاصطناعي يحدد المكونات ويحسب التغذية...')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    );
  }

  if (cameraActive) {
    return (
      <PageContainer header={{ title: t('Scan Dish', 'مسح الطبق'), showBackButton: true }}>
        <div className="relative h-[calc(100vh-120px)]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded-lg"
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <Button
              onClick={capturePhoto}
              size="lg"
              className="bg-wasfah-bright-teal hover:bg-wasfah-deep-teal rounded-full w-16 h-16"
            >
              <Camera className="h-8 w-8" />
            </Button>
            <Button
              onClick={stopCamera}
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer header={{ title: t('Scan Dish', 'مسح الطبق'), showBackButton: true }}>
      <div className="space-y-4 sm:space-y-6 pb-6 px-3 sm:px-4">
        {!scanResult && (
          <Card>
            <CardContent className="p-4 sm:p-6 text-center space-y-4">
              <Camera className="h-12 w-12 mx-auto text-wasfah-bright-teal mb-4" />
              <h2 className="text-xl font-bold text-wasfah-deep-teal">
                {t('Scan Your Dish', 'امسح طبقك')}
              </h2>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                {t('Take a photo to identify ingredients and get nutrition info', 'التقط صورة لتحديد المكونات والحصول على معلومات التغذية')}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={startCamera}
                  className="bg-wasfah-bright-teal hover:bg-wasfah-deep-teal"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  {t('Take Photo', 'التقط صورة')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-5 w-5 mr-2" />
                  {t('Upload Image', 'ارفع صورة')}
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </CardContent>
          </Card>
        )}

        {scanResult && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-wasfah-deep-teal">{scanResult.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setScanResult(null)}>
                  <X className="h-4 w-4 mr-1" />
                  {t('New Scan', 'مسح جديد')}
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('Calories', 'سعرات حرارية')}</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200">{scanResult.calories}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('Protein', 'بروتين')}</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200">{scanResult.protein}g</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('Carbs', 'كربوهيدرات')}</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200">{scanResult.carbs}g</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('Fat', 'دهون')}</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200">{scanResult.fat}g</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">{t('Ingredients', 'المكونات')}</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {scanResult.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="text-sm">{ingredient}</li>
                  ))}
                </ul>
              </div>

              <Button onClick={addToTracking} className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                {t('Add to Health Tracking', 'أضف إلى تتبع الصحة')}
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('Scan History', 'سجل المسح')}</h2>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Select value={sortHistoryBy} onValueChange={(value: 'dateDesc' | 'nameAsc' | 'caloriesDesc') => setSortHistoryBy(value)}>
                <SelectTrigger className="w-[140px] text-sm">
                  <SelectValue placeholder={t("Sort By", "ترتيب حسب")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dateDesc">{t("Date (Newest)", "التاريخ (الأحدث)")}</SelectItem>
                  <SelectItem value="nameAsc">{t("Name (A-Z)", "الاسم (أ-ي)")}</SelectItem>
                  <SelectItem value="caloriesDesc">{t("Calories (High)", "السعرات (الأعلى)")}</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearHistory}
                disabled={scanHistory.length === 0}
                className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-700/30 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {sortedHistory.length > 0 ? (
            <div className="space-y-3">
              {sortedHistory.map((item) => (
                <Card key={item.id + item.timestamp}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('Calories', 'سعرات حرارية')}: {item.calories} • {t('Protein', 'بروتين')}: {item.protein}g • {t('Carbs', 'كربوهيدرات')}: {item.carbs}g • {t('Fat', 'دهون')}: {item.fat}g
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveHistoryItem(item.id)}
                      className="text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 ml-4 rtl:mr-4 rtl:ml-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500 dark:text-gray-400">
                {t('No scan history yet.', 'لا يوجد سجل مسح حتى الآن.')}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
