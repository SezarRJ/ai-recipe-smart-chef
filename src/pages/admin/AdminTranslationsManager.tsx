
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, Languages, Download, Upload, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

interface Translation {
  id: string;
  key: string;
  language_code: string;
  value: string;
  category: string;
  created_at: string;
  updated_at: string;
}

// Comprehensive list of all app translations
const defaultTranslations = {
  // Navigation
  'nav.home': { en: 'Home', ar: 'الرئيسية', tr: 'Ana Sayfa' },
  'nav.recipes': { en: 'Recipes', ar: 'الوصفات', tr: 'Tarifler' },
  'nav.mealPlan': { en: 'Meal Plan', ar: 'خطة الوجبات', tr: 'Yemek Planı' },
  'nav.pantry': { en: 'Pantry', ar: 'المخزن', tr: 'Kiler' },
  'nav.profile': { en: 'Profile', ar: 'الملف الشخصي', tr: 'Profil' },
  'nav.favorites': { en: 'Favorites', ar: 'المفضلة', tr: 'Favoriler' },
  'nav.settings': { en: 'Settings', ar: 'الإعدادات', tr: 'Ayarlar' },
  'nav.loyalty': { en: 'Loyalty', ar: 'الولاء', tr: 'Sadakat' },
  'nav.subscription': { en: 'Subscription', ar: 'الاشتراك', tr: 'Abonelik' },
  
  // Common actions
  'common.save': { en: 'Save', ar: 'حفظ', tr: 'Kaydet' },
  'common.cancel': { en: 'Cancel', ar: 'إلغاء', tr: 'İptal' },
  'common.delete': { en: 'Delete', ar: 'حذف', tr: 'Sil' },
  'common.edit': { en: 'Edit', ar: 'تحرير', tr: 'Düzenle' },
  'common.back': { en: 'Back', ar: 'رجوع', tr: 'Geri' },
  'common.next': { en: 'Next', ar: 'التالي', tr: 'İleri' },
  'common.loading': { en: 'Loading...', ar: 'جاري التحميل...', tr: 'Yükleniyor...' },
  'common.search': { en: 'Search', ar: 'البحث', tr: 'Ara' },
  'common.add': { en: 'Add', ar: 'إضافة', tr: 'Ekle' },
  'common.remove': { en: 'Remove', ar: 'إزالة', tr: 'Kaldır' },
  'common.create': { en: 'Create', ar: 'إنشاء', tr: 'Oluştur' },
  'common.update': { en: 'Update', ar: 'تحديث', tr: 'Güncelle' },
  'common.view': { en: 'View', ar: 'عرض', tr: 'Görüntüle' },
  'common.share': { en: 'Share', ar: 'مشاركة', tr: 'Paylaş' },
  'common.close': { en: 'Close', ar: 'إغلاق', tr: 'Kapat' },
  'common.open': { en: 'Open', ar: 'فتح', tr: 'Aç' },
  'common.yes': { en: 'Yes', ar: 'نعم', tr: 'Evet' },
  'common.no': { en: 'No', ar: 'لا', tr: 'Hayır' },
  
  // Recipe related
  'recipe.ingredients': { en: 'Ingredients', ar: 'المكونات', tr: 'Malzemeler' },
  'recipe.instructions': { en: 'Instructions', ar: 'التعليمات', tr: 'Talimatlar' },
  'recipe.cookTime': { en: 'Cook Time', ar: 'وقت الطبخ', tr: 'Pişirme Süresi' },
  'recipe.prepTime': { en: 'Prep Time', ar: 'وقت التحضير', tr: 'Hazırlık Süresi' },
  'recipe.servings': { en: 'Servings', ar: 'الحصص', tr: 'Porsiyon' },
  'recipe.difficulty': { en: 'Difficulty', ar: 'الصعوبة', tr: 'Zorluk' },
  'recipe.calories': { en: 'Calories', ar: 'السعرات', tr: 'Kalori' },
  'recipe.nutrition': { en: 'Nutrition', ar: 'التغذية', tr: 'Beslenme' },
  'recipe.startCooking': { en: 'Start Cooking', ar: 'ابدأ الطبخ', tr: 'Pişirmeye Başla' },
  'recipe.addToFavorites': { en: 'Add to Favorites', ar: 'إضافة للمفضلة', tr: 'Favorilere Ekle' },
  
  // Cooking mode
  'cooking.speakInstructions': { en: 'Speak Instructions', ar: 'قراءة التعليمات', tr: 'Talimatları Oku' },
  'cooking.voiceCommands': { en: 'Voice Commands', ar: 'الأوامر الصوتية', tr: 'Sesli Komutlar' },
  'cooking.nextStep': { en: 'Next Step', ar: 'الخطوة التالية', tr: 'Sonraki Adım' },
  'cooking.previousStep': { en: 'Previous Step', ar: 'الخطوة السابقة', tr: 'Önceki Adım' },
  'cooking.finishCooking': { en: 'Finish Cooking', ar: 'إنهاء الطبخ', tr: 'Pişirmeyi Bitir' },
  'cooking.step': { en: 'Step', ar: 'خطوة', tr: 'Adım' },
  
  // Quick actions
  'quickActions.byIngredients': { en: 'By Ingredients', ar: 'حسب المكونات', tr: 'Malzemelere Göre' },
  'quickActions.globalCuisine': { en: 'Global Cuisine', ar: 'المطبخ العالمي', tr: 'Dünya Mutfağı' },
  'quickActions.scanDish': { en: 'Scan Dish', ar: 'مسح الطبق', tr: 'Yemek Tara' },
  'quickActions.createRecipe': { en: 'Create Recipe', ar: 'إنشاء وصفة', tr: 'Tarif Oluştur' },
  'quickActions.healthTracking': { en: 'Health Tracking', ar: 'تتبع الصحة', tr: 'Sağlık Takibi' },
  'quickActions.rewards': { en: 'Rewards', ar: 'المكافآت', tr: 'Ödüller' },
  'quickActions.community': { en: 'Community', ar: 'المجتمع', tr: 'Topluluk' },
  'quickActions.aiFeatures': { en: 'AI Features', ar: 'ميزات الذكاء الاصطناعي', tr: 'AI Özellikleri' },
  
  // Categories
  'category.cookingPlanning': { en: 'Cooking & Planning', ar: 'الطبخ والتخطيط', tr: 'Pişirme ve Planlama' },
  'category.communityRewards': { en: 'Community & Rewards', ar: 'المجتمع والمكافآت', tr: 'Topluluk ve Ödüller' },
  'category.navigation': { en: 'Navigation', ar: 'التنقل', tr: 'Navigasyon' },
  'category.common': { en: 'Common', ar: 'عام', tr: 'Genel' },
  'category.recipe': { en: 'Recipe', ar: 'وصفة', tr: 'Tarif' },
  'category.cooking': { en: 'Cooking', ar: 'طبخ', tr: 'Pişirme' },
  'category.admin': { en: 'Admin', ar: 'الإدارة', tr: 'Yönetici' },
  
  // Admin panel
  'admin.dashboard': { en: 'Dashboard', ar: 'لوحة التحكم', tr: 'Kontrol Paneli' },
  'admin.users': { en: 'Users', ar: 'المستخدمون', tr: 'Kullanıcılar' },
  'admin.ingredients': { en: 'Ingredients', ar: 'المكونات', tr: 'Malzemeler' },
  'admin.translations': { en: 'Translations', ar: 'الترجمات', tr: 'Çeviriler' },
  'admin.maintenance': { en: 'Maintenance', ar: 'الصيانة', tr: 'Bakım' },
  'admin.analytics': { en: 'Analytics', ar: 'التحليلات', tr: 'Analitik' },
  'admin.addTranslation': { en: 'Add Translation', ar: 'إضافة ترجمة', tr: 'Çeviri Ekle' },
  'admin.editTranslation': { en: 'Edit Translation', ar: 'تحرير الترجمة', tr: 'Çeviriyi Düzenle' },
  'admin.translationKey': { en: 'Translation Key', ar: 'مفتاح الترجمة', tr: 'Çeviri Anahtarı' },
  'admin.translationValue': { en: 'Translation Value', ar: 'قيمة الترجمة', tr: 'Çeviri Değeri' },
  'admin.language': { en: 'Language', ar: 'اللغة', tr: 'Dil' },
  'admin.category': { en: 'Category', ar: 'الفئة', tr: 'Kategori' },
  'admin.lastUpdated': { en: 'Last Updated', ar: 'آخر تحديث', tr: 'Son Güncelleme' },
  'admin.actions': { en: 'Actions', ar: 'الإجراءات', tr: 'Eylemler' },
  'admin.exportTranslations': { en: 'Export Translations', ar: 'تصدير الترجمات', tr: 'Çevirileri Dışa Aktar' },
  'admin.importTranslations': { en: 'Import Translations', ar: 'استيراد الترجمات', tr: 'Çevirileri İçe Aktar' },
  'admin.bulkActions': { en: 'Bulk Actions', ar: 'الإجراءات المجمعة', tr: 'Toplu Eylemler' },
  
  // Scanning
  'scan.analyzing': { en: 'Analyzing...', ar: 'جاري التحليل...', tr: 'Analiz ediliyor...' },
  'scan.takePhoto': { en: 'Take Photo', ar: 'التقط صورة', tr: 'Fotoğraf Çek' },
  'scan.uploadImage': { en: 'Upload Image', ar: 'ارفع صورة', tr: 'Resim Yükle' },
  'scan.scanAgain': { en: 'Scan Again', ar: 'امسح مرة أخرى', tr: 'Tekrar Tara' },
  'scan.detectedIngredients': { en: 'Detected Ingredients', ar: 'المكونات المكتشفة', tr: 'Tespit Edilen Malzemeler' },
  
  // Time units
  'time.minutes': { en: 'minutes', ar: 'دقائق', tr: 'dakika' },
  'time.hours': { en: 'hours', ar: 'ساعات', tr: 'saat' },
  'time.days': { en: 'days', ar: 'أيام', tr: 'gün' },
  
  // Messages
  'message.success': { en: 'Success', ar: 'نجح', tr: 'Başarılı' },
  'message.error': { en: 'Error', ar: 'خطأ', tr: 'Hata' },
  'message.warning': { en: 'Warning', ar: 'تحذير', tr: 'Uyarı' },
  'message.info': { en: 'Information', ar: 'معلومات', tr: 'Bilgi' },
  'message.translationAdded': { en: 'Translation added successfully', ar: 'تمت إضافة الترجمة بنجاح', tr: 'Çeviri başarıyla eklendi' },
  'message.translationUpdated': { en: 'Translation updated successfully', ar: 'تم تحديث الترجمة بنجاح', tr: 'Çeviri başarıyla güncellendi' },
  'message.translationDeleted': { en: 'Translation deleted successfully', ar: 'تم حذف الترجمة بنجاح', tr: 'Çeviri başarıyla silindi' },
};

export default function AdminTranslationsManager() {
  const { toast } = useToast();
  const { t, direction } = useRTL();
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);
  const [formData, setFormData] = useState({
    key: '',
    language_code: '',
    value: '',
    category: ''
  });

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  ];

  const categories = ['navigation', 'common', 'recipe', 'cooking', 'admin', 'quickActions', 'scan', 'time', 'message'];

  useEffect(() => {
    loadDefaultTranslations();
  }, []);

  const loadDefaultTranslations = () => {
    const loadedTranslations: Translation[] = [];
    let id = 1;

    Object.entries(defaultTranslations).forEach(([key, translations]) => {
      const category = key.split('.')[0];
      Object.entries(translations).forEach(([langCode, value]) => {
        loadedTranslations.push({
          id: id.toString(),
          key,
          language_code: langCode,
          value,
          category,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        id++;
      });
    });

    setTranslations(loadedTranslations);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.key || !formData.language_code || !formData.value) {
      toast({
        title: t("Validation Error", "خطأ في التحقق"),
        description: t("All fields are required", "جميع الحقول مطلوبة"),
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingTranslation) {
        setTranslations(translations.map(t => 
          t.id === editingTranslation.id 
            ? { ...t, ...formData, updated_at: new Date().toISOString() }
            : t
        ));
        toast({
          title: t("Success", "نجح"),
          description: t("Translation updated successfully", "تم تحديث الترجمة بنجاح"),
        });
      } else {
        const newTranslation: Translation = {
          id: (translations.length + 1).toString(),
          ...formData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setTranslations([...translations, newTranslation]);
        toast({
          title: t("Success", "نجح"),
          description: t("Translation added successfully", "تمت إضافة الترجمة بنجاح"),
        });
      }

      setFormData({ key: '', language_code: '', value: '', category: '' });
      setEditingTranslation(null);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error saving translation:', error);
      toast({
        title: t("Error", "خطأ"),
        description: t("Failed to save translation", "فشل في حفظ الترجمة"),
        variant: "destructive",
      });
    }
  };

  const handleEdit = (translation: Translation) => {
    setEditingTranslation(translation);
    setFormData({
      key: translation.key,
      language_code: translation.language_code,
      value: translation.value,
      category: translation.category
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('Are you sure you want to delete this translation?', 'هل أنت متأكد من حذف هذه الترجمة؟'))) return;

    try {
      setTranslations(translations.filter(t => t.id !== id));
      toast({
        title: t("Success", "نجح"),
        description: t("Translation deleted successfully", "تم حذف الترجمة بنجاح"),
      });
    } catch (error) {
      console.error('Error deleting translation:', error);
      toast({
        title: t("Error", "خطأ"),
        description: t("Failed to delete translation", "فشل في حذف الترجمة"),
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(translations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'translations.json';
    link.click();
    
    toast({
      title: t("Success", "نجح"),
      description: t("Translations exported successfully", "تم تصدير الترجمات بنجاح"),
    });
  };

  const filteredTranslations = translations.filter(translation => {
    const matchesSearch = translation.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         translation.value.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || translation.language_code === selectedLanguage;
    const matchesCategory = selectedCategory === 'all' || translation.category === selectedCategory;
    return matchesSearch && matchesLanguage && matchesCategory;
  });

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.nativeName || code;
  };

  return (
    <div className={`space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`} dir={direction}>
      <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold tracking-tight flex items-center">
          <Languages className={`h-6 w-6 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
          {t('Translations Management', 'إدارة الترجمات')}
        </h1>
        <div className={`flex gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" onClick={handleExport}>
            <Download className={`h-4 w-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
            {t('Export', 'تصدير')}
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingTranslation(null);
                setFormData({ key: '', language_code: '', value: '', category: '' });
              }}>
                <Plus className={`h-4 w-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {t('Add Translation', 'إضافة ترجمة')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" dir={direction}>
              <DialogHeader>
                <DialogTitle>
                  {editingTranslation ? t('Edit Translation', 'تحرير الترجمة') : t('Add New Translation', 'إضافة ترجمة جديدة')}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="key">{t('Translation Key', 'مفتاح الترجمة')}</Label>
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    placeholder={t('Enter translation key', 'أدخل مفتاح الترجمة')}
                    required
                    dir={direction}
                  />
                </div>
                <div>
                  <Label htmlFor="category">{t('Category', 'الفئة')}</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger dir={direction}>
                      <SelectValue placeholder={t('Select category', 'اختر الفئة')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {t(category, category)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language_code">{t('Language', 'اللغة')}</Label>
                  <Select value={formData.language_code} onValueChange={(value) => setFormData({ ...formData, language_code: value })}>
                    <SelectTrigger dir={direction}>
                      <SelectValue placeholder={t('Select language', 'اختر اللغة')} />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.code} value={language.code}>
                          {language.nativeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="value">{t('Translation Value', 'قيمة الترجمة')}</Label>
                  <Textarea
                    id="value"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder={t('Enter translation value', 'أدخل قيمة الترجمة')}
                    required
                    dir={direction}
                  />
                </div>
                <div className={`flex justify-end space-x-2 ${direction === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    {t('Cancel', 'إلغاء')}
                  </Button>
                  <Button type="submit">
                    {editingTranslation ? t('Update', 'تحديث') : t('Add', 'إضافة')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('App Translations', 'ترجمات التطبيق')}</CardTitle>
          <CardDescription>
            {t('Manage all application translations. Changes will be reflected immediately.', 'إدارة جميع ترجمات التطبيق. ستنعكس التغييرات فوراً.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 mb-4 ${direction === 'rtl' ? 'md:space-x-reverse' : ''}`}>
            <div className="relative flex-1">
              <Search className={`absolute top-2.5 h-4 w-4 text-gray-500 ${direction === 'rtl' ? 'right-2' : 'left-2'}`} />
              <Input
                placeholder={t('Search translations...', 'البحث في الترجمات...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={direction === 'rtl' ? 'pr-8' : 'pl-8'}
                dir={direction}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]" dir={direction}>
                <SelectValue placeholder={t('Filter by category', 'تصفية حسب الفئة')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All Categories', 'جميع الفئات')}</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {t(category, category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[180px]" dir={direction}>
                <SelectValue placeholder={t('Filter by language', 'تصفية حسب اللغة')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All Languages', 'جميع اللغات')}</SelectItem>
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.nativeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={direction === 'rtl' ? 'text-right' : 'text-left'}>
                    {t('Key', 'المفتاح')}
                  </TableHead>
                  <TableHead className={direction === 'rtl' ? 'text-right' : 'text-left'}>
                    {t('Category', 'الفئة')}
                  </TableHead>
                  <TableHead className={direction === 'rtl' ? 'text-right' : 'text-left'}>
                    {t('Language', 'اللغة')}
                  </TableHead>
                  <TableHead className={direction === 'rtl' ? 'text-right' : 'text-left'}>
                    {t('Translation', 'الترجمة')}
                  </TableHead>
                  <TableHead className={direction === 'rtl' ? 'text-right' : 'text-left'}>
                    {t('Updated', 'محدث')}
                  </TableHead>
                  <TableHead className={`${direction === 'rtl' ? 'text-left' : 'text-right'}`}>
                    {t('Actions', 'الإجراءات')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTranslations.map((translation) => (
                  <TableRow key={translation.id}>
                    <TableCell className="font-mono text-sm">{translation.key}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {translation.category}
                      </span>
                    </TableCell>
                    <TableCell>{getLanguageName(translation.language_code)}</TableCell>
                    <TableCell className="max-w-xs truncate" dir={translation.language_code === 'ar' ? 'rtl' : 'ltr'}>
                      {translation.value}
                    </TableCell>
                    <TableCell>
                      {new Date(translation.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className={`space-x-1 ${direction === 'rtl' ? 'text-left space-x-reverse' : 'text-right'}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(translation)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDelete(translation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTranslations.length === 0 && !loading && (
            <div className="text-center py-8">
              <Languages className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">{t('No translations found', 'لم يتم العثور على ترجمات')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
