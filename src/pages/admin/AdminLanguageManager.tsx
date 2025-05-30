
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit2, Trash2, Save, RotateCcw, Languages, Search, Globe, Download, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Language {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  completionPercentage: number;
  nativeName: string;
  rtl: boolean;
}

interface TranslationKey {
  id: string;
  key: string;
  category: string;
  english: string;
  translations: { [langCode: string]: string };
  lastUpdated: string;
}

const mockLanguages: Language[] = [
  { id: '1', name: 'English', code: 'en', isActive: true, completionPercentage: 100, nativeName: 'English', rtl: false },
  { id: '2', name: 'Arabic', code: 'ar', isActive: true, completionPercentage: 95, nativeName: 'العربية', rtl: true },
  { id: '3', name: 'Turkish', code: 'tr', isActive: true, completionPercentage: 88, nativeName: 'Türkçe', rtl: false },
  { id: '4', name: 'Spanish', code: 'es', isActive: true, completionPercentage: 92, nativeName: 'Español', rtl: false },
  { id: '5', name: 'French', code: 'fr', isActive: false, completionPercentage: 65, nativeName: 'Français', rtl: false },
  { id: '6', name: 'Chinese', code: 'zh', isActive: false, completionPercentage: 43, nativeName: '中文', rtl: false },
];

const mockTranslationKeys: TranslationKey[] = [
  { 
    id: '1', 
    key: 'nav.home', 
    category: 'Navigation',
    english: 'Home',
    translations: { 
      ar: 'الرئيسية', 
      tr: 'Ana Sayfa',
      es: 'Inicio', 
      fr: 'Accueil', 
      zh: '首页' 
    },
    lastUpdated: '2024-01-15'
  },
  { 
    id: '2', 
    key: 'nav.recipes', 
    category: 'Navigation',
    english: 'Recipes',
    translations: { 
      ar: 'وصفات', 
      tr: 'Tarifler',
      es: 'Recetas', 
      fr: 'Recettes', 
      zh: '食谱' 
    },
    lastUpdated: '2024-01-15'
  },
  { 
    id: '3', 
    key: 'nav.profile', 
    category: 'Navigation',
    english: 'Profile',
    translations: { 
      ar: 'الملف الشخصي', 
      tr: 'Profil',
      es: 'Perfil', 
      fr: 'Profil', 
      zh: '个人资料' 
    },
    lastUpdated: '2024-01-14'
  },
  { 
    id: '4', 
    key: 'common.save', 
    category: 'Common',
    english: 'Save',
    translations: { 
      ar: 'حفظ', 
      tr: 'Kaydet',
      es: 'Guardar', 
      fr: 'Sauvegarder', 
      zh: '保存' 
    },
    lastUpdated: '2024-01-13'
  },
  { 
    id: '5', 
    key: 'common.cancel', 
    category: 'Common',
    english: 'Cancel',
    translations: { 
      ar: 'إلغاء', 
      tr: 'İptal',
      es: 'Cancelar', 
      fr: 'Annuler', 
      zh: '取消' 
    },
    lastUpdated: '2024-01-13'
  }
];

const AdminLanguageManager: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>(mockLanguages);
  const [translationKeys, setTranslationKeys] = useState<TranslationKey[]>(mockTranslationKeys);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ar');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingTranslation, setEditingTranslation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { toast } = useToast();

  const categories = ['all', ...Array.from(new Set(translationKeys.map(tk => tk.category)))];

  const handleToggleLanguage = (id: string) => {
    setLanguages(languages.map(lang => 
      lang.id === id ? { ...lang, isActive: !lang.isActive } : lang
    ));
    
    toast({
      title: 'Language Status Updated',
      description: `Language availability has been updated.`,
    });
  };

  const handleSaveTranslation = (keyId: string, value: string) => {
    setTranslationKeys(
      translationKeys.map(tk => 
        tk.id === keyId 
          ? { 
              ...tk, 
              translations: { 
                ...tk.translations, 
                [selectedLanguage]: value 
              },
              lastUpdated: new Date().toISOString().split('T')[0]
            } 
          : tk
      )
    );
    
    setEditingTranslation(null);
    toast({
      title: 'Translation Saved',
      description: 'The translation has been updated successfully.',
    });
  };

  const handleExportTranslations = () => {
    const dataStr = JSON.stringify(translationKeys, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'translations.json';
    link.click();
    
    toast({
      title: 'Export Complete',
      description: 'Translations have been exported successfully.',
    });
  };

  const filteredKeys = translationKeys.filter(tk => {
    const matchesSearch = tk.key.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tk.english.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tk.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || code;
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center">
            <Languages className="mr-2 h-6 w-6" />
            Language Management
          </h1>
          <p className="text-gray-600">Manage app languages and translations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportTranslations}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        </div>
      </div>

      <Tabs defaultValue="languages">
        <TabsList className="mb-4">
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="translations">Translations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="languages">
          <Card>
            <CardHeader>
              <CardTitle>Supported Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Language</TableHead>
                      <TableHead>Native Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Direction</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {languages.map((language) => (
                      <TableRow key={language.id}>
                        <TableCell className="font-medium">{language.name}</TableCell>
                        <TableCell>{language.nativeName}</TableCell>
                        <TableCell className="font-mono">{language.code}</TableCell>
                        <TableCell>
                          <Badge variant={language.rtl ? 'secondary' : 'outline'}>
                            {language.rtl ? 'RTL' : 'LTR'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={language.isActive ? 'default' : 'secondary'}>
                            {language.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={language.completionPercentage} className="w-20" />
                            <span className={`text-sm font-medium ${getCompletionColor(language.completionPercentage)}`}>
                              {language.completionPercentage}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleToggleLanguage(language.id)} 
                              variant="outline" 
                              size="sm"
                            >
                              {language.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="translations">
          <Card>
            <CardHeader className="space-y-4">
              <CardTitle>Manage Translations</CardTitle>
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search translation keys..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.filter(l => l.code !== 'en' && l.isActive).map((lang) => (
                      <SelectItem key={lang.id} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Key</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>English (Source)</TableHead>
                      <TableHead>Translation ({getLanguageName(selectedLanguage)})</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKeys.map((tk) => (
                      <TableRow key={tk.id}>
                        <TableCell className="font-mono text-sm">{tk.key}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tk.category}</Badge>
                        </TableCell>
                        <TableCell>{tk.english}</TableCell>
                        <TableCell>
                          {editingTranslation === tk.id ? (
                            <Input 
                              defaultValue={tk.translations[selectedLanguage] || ''}
                              id={`translation-${tk.id}`}
                              autoFocus
                              className="max-w-xs"
                            />
                          ) : (
                            <span 
                              className={!tk.translations[selectedLanguage] ? 'text-gray-400 italic' : ''}
                            >
                              {tk.translations[selectedLanguage] || 'Not translated'}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {tk.lastUpdated}
                        </TableCell>
                        <TableCell>
                          {editingTranslation === tk.id ? (
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleSaveTranslation(
                                  tk.id, 
                                  (document.getElementById(`translation-${tk.id}`) as HTMLInputElement).value
                                )}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setEditingTranslation(null)}
                              >
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setEditingTranslation(tk.id)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Translation Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {languages.filter(l => l.code !== 'en').map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{lang.name}</span>
                        <Badge variant={lang.isActive ? 'default' : 'secondary'} className="text-xs">
                          {lang.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={lang.completionPercentage} className="w-24" />
                        <span className="text-sm font-medium">{lang.completionPercentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Languages:</span>
                    <span className="font-semibold">{languages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Languages:</span>
                    <span className="font-semibold">{languages.filter(l => l.isActive).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Translation Keys:</span>
                    <span className="font-semibold">{translationKeys.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Categories:</span>
                    <span className="font-semibold">{categories.length - 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Completion:</span>
                    <span className="font-semibold">
                      {Math.round(languages.reduce((acc, lang) => acc + lang.completionPercentage, 0) / languages.length)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLanguageManager;
