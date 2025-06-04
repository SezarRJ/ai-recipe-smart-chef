
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Plus, Edit, Trash2, Globe, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const mockLanguages = [
  {
    id: 'LANG-001',
    name: 'English',
    nativeName: 'English',
    code: 'en',
    direction: 'ltr',
    isActive: true,
    isDefault: true,
    completionRate: 100
  },
  {
    id: 'LANG-002',
    name: 'Arabic',
    nativeName: 'العربية',
    code: 'ar',
    direction: 'rtl',
    isActive: true,
    isDefault: false,
    completionRate: 95
  },
  {
    id: 'LANG-003',
    name: 'French',
    nativeName: 'Français',
    code: 'fr',
    direction: 'ltr',
    isActive: true,
    isDefault: false,
    completionRate: 80
  },
  {
    id: 'LANG-004',
    name: 'Spanish',
    nativeName: 'Español',
    code: 'es',
    direction: 'ltr',
    isActive: false,
    isDefault: false,
    completionRate: 45
  }
];

const AdminLanguagePage = () => {
  const { toast } = useToast();
  const [languages, setLanguages] = useState(mockLanguages);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);

  const handleCreateLanguage = () => {
    setSelectedLanguage(null);
    setDialogOpen(true);
  };

  const handleEditLanguage = (language: any) => {
    setSelectedLanguage(language);
    setDialogOpen(true);
  };

  const handleToggleActive = (id: string) => {
    setLanguages(prev => 
      prev.map(lang => 
        lang.id === id ? { ...lang, isActive: !lang.isActive } : lang
      )
    );
    toast({
      title: "Language Status Updated",
      description: "Language status has been updated successfully.",
    });
  };

  const handleSetDefault = (id: string) => {
    setLanguages(prev => 
      prev.map(lang => ({
        ...lang,
        isDefault: lang.id === id
      }))
    );
    toast({
      title: "Default Language Set",
      description: "Default language has been updated successfully.",
    });
  };

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    language.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    language.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCompletionBadge = (rate: number) => {
    if (rate >= 90) return <Badge className="bg-green-100 text-green-800">{rate}%</Badge>;
    if (rate >= 70) return <Badge className="bg-yellow-100 text-yellow-800">{rate}%</Badge>;
    return <Badge className="bg-red-100 text-red-800">{rate}%</Badge>;
  };

  return (
    <AdminPageWrapper title="Language Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Language Management</h1>
            <p className="text-muted-foreground">Manage supported languages and their configurations.</p>
          </div>
          <Button onClick={handleCreateLanguage}>
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{languages.length}</div>
                <div className="text-sm text-gray-600">Total Languages</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{languages.filter(l => l.isActive).length}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">{languages.filter(l => l.direction === 'rtl').length}</div>
            <div className="text-sm text-gray-600">RTL Languages</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(languages.reduce((sum, l) => sum + l.completionRate, 0) / languages.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Completion</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search languages..."
              className="pl-8 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Language</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Default</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLanguages.map((language) => (
                <TableRow key={language.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{language.name}</div>
                      <div className="text-sm text-gray-500">{language.nativeName}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{language.code}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{language.direction.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>{getCompletionBadge(language.completionRate)}</TableCell>
                  <TableCell>
                    <Switch
                      checked={language.isActive}
                      onCheckedChange={() => handleToggleActive(language.id)}
                    />
                  </TableCell>
                  <TableCell>
                    {language.isDefault ? (
                      <Badge className="bg-blue-100 text-blue-800">
                        <Check className="h-3 w-3 mr-1" />
                        Default
                      </Badge>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetDefault(language.id)}
                        disabled={!language.isActive}
                      >
                        Set Default
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditLanguage(language)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={language.isDefault}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {selectedLanguage ? 'Edit Language' : 'Add New Language'}
              </DialogTitle>
              <DialogDescription>
                {selectedLanguage ? 'Update the language configuration.' : 'Add a new language to the platform.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Language Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. English"
                  defaultValue={selectedLanguage?.name || ''}
                />
              </div>
              <div>
                <Label htmlFor="nativeName">Native Name</Label>
                <Input
                  id="nativeName"
                  placeholder="e.g. English"
                  defaultValue={selectedLanguage?.nativeName || ''}
                />
              </div>
              <div>
                <Label htmlFor="code">Language Code</Label>
                <Input
                  id="code"
                  placeholder="e.g. en"
                  defaultValue={selectedLanguage?.code || ''}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="rtl" defaultChecked={selectedLanguage?.direction === 'rtl'} />
                <Label htmlFor="rtl">Right-to-Left (RTL)</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                {selectedLanguage ? 'Update Language' : 'Add Language'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminLanguagePage;
