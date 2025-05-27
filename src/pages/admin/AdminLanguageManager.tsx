import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit2, Trash2, Save, RotateCcw, Languages, Search, Settings, Shield, Database, Bell, Globe, BarChart2, RefreshCw, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Language {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  completionPercentage: number;
}

interface TranslationKey {
  id: string;
  key: string;
  english: string;
  translations: { [langCode: string]: string };
}

const mockLanguages: Language[] = [
  { id: '1', name: 'English', code: 'en', isActive: true, completionPercentage: 100 },
  { id: '2', name: 'Arabic', code: 'ar', isActive: true, completionPercentage: 92 },
  { id: '3', name: 'Spanish', code: 'es', isActive: true, completionPercentage: 87 },
  { id: '4', name: 'French', code: 'fr', isActive: false, completionPercentage: 65 },
  { id: '5', name: 'Chinese', code: 'zh', isActive: false, completionPercentage: 43 },
];

const mockTranslationKeys: TranslationKey[] = [
  { 
    id: '1', 
    key: 'nav.home', 
    english: 'Home',
    translations: { ar: 'الرئيسية', es: 'Inicio', fr: 'Accueil', zh: '首页' }
  },
  { 
    id: '2', 
    key: 'nav.recipes', 
    english: 'Recipes',
    translations: { ar: 'وصفات', es: 'Recetas', fr: 'Recettes', zh: '食谱' }
  },
  { 
    id: '3', 
    key: 'nav.mealPlan', 
    english: 'Meal Plan',
    translations: { ar: 'خطة الوجبات', es: 'Plan de comidas', fr: 'Plan de repas', zh: '膳食计划' }
  },
];

// Admin sidebar sections
const adminSections = [
  { id: 'dashboard', icon: BarChart2, label: 'Dashboard' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'maintenance', icon: RefreshCw, label: 'Maintenance' },
  { id: 'integrations', icon: Database, label: 'Integrations' },
  { id: 'communications', icon: Bell, label: 'Communications' },
  { id: 'languages', icon: Globe, label: 'Languages' },
  { id: 'logs', icon: FileText, label: 'View Logs' }
];

// AI integration services
const aiServices = [
  { id: 'openai', name: 'OpenAI', description: 'ChatGPT and DALL-E integrations', connected: true },
  { id: 'anthropic', name: 'Anthropic', description: 'Claude AI models', connected: false },
  { id: 'huggingface', name: 'Hugging Face', description: 'Open source AI models', connected: false },
  { id: 'perplexity', name: 'Perplexity AI', description: 'Research and knowledge AI', connected: true },
  { id: 'cohere', name: 'Cohere', description: 'Text generation and embeddings', connected: false }
];

const AdminLanguageManager: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>(mockLanguages);
  const [translationKeys, setTranslationKeys] = useState<TranslationKey[]>(mockTranslationKeys);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ar');
  const [editingTranslation, setEditingTranslation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeAdminTab, setActiveAdminTab] = useState<string>('languages');
  const { toast } = useToast();

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
              } 
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

  const filteredKeys = translationKeys.filter(tk => 
    tk.key.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tk.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConnectAI = (serviceId: string) => {
    toast({
      title: 'AI Service Integration',
      description: `Connecting to ${serviceId} integration...`,
    });
  };

  const renderAdminContent = () => {
    switch (activeAdminTab) {
      case 'languages':
        return (
          <Tabs defaultValue="languages">
            <TabsList className="mb-4">
              <TabsTrigger value="languages">Available Languages</TabsTrigger>
              <TabsTrigger value="translations">Translations</TabsTrigger>
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
                          <TableHead>Code</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Completion</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {languages.map((language) => (
                          <TableRow key={language.id}>
                            <TableCell className="font-medium">{language.name}</TableCell>
                            <TableCell>{language.code}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                language.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                              }`}>
                                {language.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div 
                                  className="bg-wasfah-bright-teal h-2.5 rounded-full" 
                                  style={{ width: `${language.completionPercentage}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{language.completionPercentage}%</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  onClick={() => handleToggleLanguage(language.id)} 
                                  variant="outline" 
                                  size="sm"
                                  className="border-gray-300 dark:border-gray-700"
                                >
                                  {language.isActive ? 'Deactivate' : 'Activate'}
                                </Button>
                                <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-700">
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
                      <div className="relative w-full md:w-auto md:flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search translation keys..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                        />
                      </div>
                      <div className="flex-shrink-0">
                        <Select 
                          value={selectedLanguage}
                          onValueChange={(value) => setSelectedLanguage(value)}
                        >
                          <SelectTrigger className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                            {languages.filter(l => l.code !== 'en').map((lang) => (
                              <SelectItem key={lang.id} value={lang.code}>
                                {lang.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Key</TableHead>
                          <TableHead>English (Source)</TableHead>
                          <TableHead>Translation</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredKeys.map((tk) => (
                          <TableRow key={tk.id}>
                            <TableCell className="font-mono text-sm">{tk.key}</TableCell>
                            <TableCell>{tk.english}</TableCell>
                            <TableCell>
                              {editingTranslation === tk.id ? (
                                <Input 
                                  defaultValue={tk.translations[selectedLanguage] || ''}
                                  id={`translation-${tk.id}`}
                                  autoFocus
                                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                                />
                              ) : (
                                <span 
                                  className={!tk.translations[selectedLanguage] ? 'text-gray-400 italic' : ''}
                                >
                                  {tk.translations[selectedLanguage] || 'Not translated'}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingTranslation === tk.id ? (
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                                    onClick={() => handleSaveTranslation(
                                      tk.id, 
                                      (document.getElementById(`translation-${tk.id}`) as HTMLInputElement).value
                                    )}
                                  >
                                    <Save className="h-4 w-4 mr-1" /> Save
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-gray-300 dark:border-gray-700"
                                    onClick={() => setEditingTranslation(null)}
                                  >
                                    <RotateCcw className="h-4 w-4 mr-1" /> Cancel
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-gray-300 dark:border-gray-700" 
                                    onClick={() => setEditingTranslation(tk.id)}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                </div>
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
          </Tabs>
        );
      
      case 'integrations':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" /> AI Service Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
                    </div>
                    <Button 
                      variant={service.connected ? "default" : "outline"} 
                      className={service.connected ? "bg-green-600 hover:bg-green-700" : "border-gray-300 dark:border-gray-700"}
                      onClick={() => handleConnectAI(service.id)}
                    >
                      {service.connected ? 'Connected' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      
      case 'maintenance':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="mr-2 h-5 w-5" /> System Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <h3 className="font-medium">Database Maintenance</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Optimize database performance and clean up unused records
                  </p>
                  <Button className="bg-wasfah-deep-teal hover:bg-wasfah-deep-teal/90">
                    <RefreshCw className="mr-2 h-4 w-4" /> Run Optimization
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <h3 className="font-medium">Cache Management</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Clear system cache to resolve potential display issues
                  </p>
                  <Button variant="outline" className="border-gray-300 dark:border-gray-700">
                    Clear Cache
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <h3 className="font-medium">System Backup</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Create a backup of the entire system including database and files
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Create Backup
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'security':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" /> Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Require 2FA for all admin users
                  </p>
                  <div className="flex items-center">
                    <input type="checkbox" id="require-2fa" className="mr-2" defaultChecked />
                    <label htmlFor="require-2fa">Enforce 2FA for all administrators</label>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <h3 className="font-medium">Session Management</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Control how user sessions are handled
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label>Session timeout (minutes)</label>
                      <Input type="number" defaultValue="60" className="w-24 border-gray-300 dark:border-gray-700 dark:bg-gray-800" />
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="single-session" className="mr-2" />
                      <label htmlFor="single-session">Allow only one active session per user</label>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">Save Security Settings</Button>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" /> Admin Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admin Panel Theme</label>
                  <Select defaultValue="system">
                    <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Dashboard View</label>
                  <Select defaultValue="overview">
                    <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                      <SelectValue placeholder="Select default view" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectItem value="overview">Overview</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="users">Users</SelectItem>
                      <SelectItem value="content">Content</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notifications</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="notify-users" className="mr-2" defaultChecked />
                      <label htmlFor="notify-users">New user registrations</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="notify-content" className="mr-2" defaultChecked />
                      <label htmlFor="notify-content">New content submissions</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="notify-reports" className="mr-2" defaultChecked />
                      <label htmlFor="notify-reports">User reports</label>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'communications':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" /> Communications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <h3 className="font-medium">Email Templates</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Manage system email templates
                  </p>
                  <Select defaultValue="welcome">
                    <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 mb-3">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectItem value="welcome">Welcome Email</SelectItem>
                      <SelectItem value="reset">Password Reset</SelectItem>
                      <SelectItem value="verify">Email Verification</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-gray-300 dark:border-gray-700">
                    <Edit2 className="h-4 w-4 mr-1" /> Edit Template
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Configure push notification settings
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span>Enable push notifications</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                    Configure
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <h3 className="font-medium">Bulk Messaging</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Send announcements to all users
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Create Announcement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'logs':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" /> System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Select defaultValue="error">
                  <SelectTrigger className="w-[180px] border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                    <SelectValue placeholder="Log level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-gray-300 dark:border-gray-700">
                  <RefreshCw className="h-4 w-4 mr-1" /> Refresh
                </Button>
              </div>
              <div className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 h-80 overflow-y-auto font-mono text-sm">
                <div className="text-red-600 dark:text-red-400">[ERROR] 2024-05-21 08:15:23 - Failed to connect to external API: Timeout</div>
                <div className="text-red-600 dark:text-red-400">[ERROR] 2024-05-21 07:42:19 - Database query failed: Invalid syntax in query string</div>
                <div className="text-red-600 dark:text-red-400">[ERROR] 2024-05-20 23:11:05 - Authentication failed for user: admin@example.com</div>
                <div className="text-red-600 dark:text-red-400">[ERROR] 2024-05-20 20:55:30 - Memory limit exceeded during image processing</div>
                <div className="text-red-600 dark:text-red-400">[ERROR] 2024-05-20 14:22:17 - Unable to send email: SMTP connection refused</div>
              </div>
              <div className="flex justify-end mt-3">
                <Button variant="outline" className="border-gray-300 dark:border-gray-700">
                  Download Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-40">
            <p>Select a section from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Admin Sidebar */}
      <div className="hidden md:block md:col-span-1">
        <Card className="h-full">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-4">Admin Panel</h2>
            <div className="space-y-1">
              {adminSections.map((section) => (
                <div 
                  key={section.id}
                  onClick={() => setActiveAdminTab(section.id)}
                  className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer ${
                    activeAdminTab === section.id 
                      ? 'bg-wasfah-bright-teal/10 text-wasfah-bright-teal'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <section.icon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{section.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Admin Content */}
      <div className="col-span-1 md:col-span-4">
        <div className="space-y-6">
          {/* Mobile Navigation for Admin Sections */}
          <div className="md:hidden">
            <div className="grid grid-cols-4 gap-2 mb-4">
              <Button 
                variant={activeAdminTab === 'languages' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveAdminTab('languages')}
                className="flex flex-col items-center py-2"
              >
                <Globe className="h-4 w-4 mb-1" />
                <span className="text-xs">Languages</span>
              </Button>
              <Button 
                variant={activeAdminTab === 'settings' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveAdminTab('settings')}
                className="flex flex-col items-center py-2"
              >
                <Settings className="h-4 w-4 mb-1" />
                <span className="text-xs">Settings</span>
              </Button>
              <Button 
                variant={activeAdminTab === 'security' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveAdminTab('security')}
                className="flex flex-col items-center py-2"
              >
                <Shield className="h-4 w-4 mb-1" />
                <span className="text-xs">Security</span>
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setActiveAdminTab('integrations')}
                className="flex flex-col items-center py-2"
              >
                <span className="text-xs">More...</span>
              </Button>
            </div>
          </div>
          
          {/* Page header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold flex items-center">
                {adminSections.find(s => s.id === activeAdminTab)?.icon && 
                  React.createElement(adminSections.find(s => s.id === activeAdminTab)?.icon as any, { className: "mr-2 h-6 w-6" })
                }
                {adminSections.find(s => s.id === activeAdminTab)?.label || 'Admin Panel'}
              </h1>
              <p className="text-muted-foreground">Manage system settings and configurations</p>
            </div>
            {activeAdminTab === 'languages' && (
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Language
              </Button>
            )}
          </div>

          {/* Render the active admin content */}
          {renderAdminContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminLanguageManager;
