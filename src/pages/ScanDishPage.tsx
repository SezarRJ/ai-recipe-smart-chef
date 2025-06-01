
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ScanDishComponent } from '@/components/dish/ScanDishComponent';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';
import { ScanHistoryItem } from '@/types/index';

interface ScanHistoryItemExtended extends ScanHistoryItem {
  timestamp: string;
}

const LOCAL_STORAGE_KEY = 'wasfah_scan_history';

export default function ScanDishPage() {
  const { t } = useRTL();
  const { toast } = useToast();
  const [scanResult, setScanResult] = useState<ScanHistoryItem | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItemExtended[]>([]);
  const [sortHistoryBy, setSortHistoryBy] = useState<'dateDesc' | 'nameAsc' | 'caloriesDesc'>('dateDesc');

  useEffect(() => {
    const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedHistory) {
      try {
        const history: ScanHistoryItemExtended[] = JSON.parse(savedHistory);
        setScanHistory(history);
      } catch (error) {
        console.error("Failed to parse scan history from localStorage", error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  const handleScanResult = (result: ScanHistoryItem) => {
    setScanResult(result);

    const newItem: ScanHistoryItemExtended = {
      ...result,
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [newItem, ...scanHistory];
    setScanHistory(updatedHistory);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const addToTracking = () => {
    if (scanResult) {
      console.log("Adding to health tracking:", scanResult);
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
      title: t('Item Removed', 'تمت إزالة العنصر'),
      description: t('Scan history item removed.', 'تمت إزالة عنصر من سجل المسح.'),
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

  return (
    <PageContainer header={{ title: t('Scan Dish', 'مسح الطبق'), showBackButton: true }}>
      <div className="space-y-6 pb-6">
        <ScanDishComponent onScanResult={handleScanResult} />

        {scanResult && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal">{scanResult.name}</h2>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('Calories', 'سعرات حرارية')}</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200">{scanResult.calories} kcal</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('Protein', 'بروتين')}</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200">{scanResult.protein}g</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('Carbs', 'كربوهيدرات')}</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200">{scanResult.carbs}g</p>
                </div>
              </div>

              {scanResult.ingredients && (
                <div>
                  <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">{t('Ingredients', 'المكونات')}</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {scanResult.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="text-sm">{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

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
                <SelectTrigger className="w-[150px] text-sm">
                  <SelectValue placeholder={t("Sort By", "ترتيب حسب")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dateDesc">{t("Date (Newest)", "التاريخ (الأحدث)")}</SelectItem>
                  <SelectItem value="nameAsc">{t("Name (A-Z)", "الاسم (أ-ي)")}</SelectItem>
                  <SelectItem value="caloriesDesc">{t("Calories (High-Low)", "السعرات (الأعلى)")}</SelectItem>
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
                        {t('Calories', 'سعرات حرارية')}: {item.calories} kcal • {t('Protein', 'بروتين')}: {item.protein}g • {t('Carbs', 'كربوهيدرات')}: {item.carbs}g
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
