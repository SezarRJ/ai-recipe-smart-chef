
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Plus, Edit, Trash2, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

const mockTranslations = [
  {
    id: 'TRL-001',
    key: 'home.welcome',
    english: 'Welcome to Wasfah',
    arabic: 'مرحباً بك في وصفة',
    french: 'Bienvenue à Wasfah',
    status: 'completed'
  },
  {
    id: 'TRL-002',
    key: 'recipe.ingredients',
    english: 'Ingredients',
    arabic: 'المكونات',
    french: 'Ingrédients',
    status: 'completed'
  },
  {
    id: 'TRL-003',
    key: 'common.save',
    english: 'Save',
    arabic: 'حفظ',
    french: 'Sauvegarder',
    status: 'pending'
  }
];

const AdminTranslationsPage = () => {
  const { toast } = useToast();
  const [translations, setTranslations] = useState(mockTranslations);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTranslation, setSelectedTranslation] = useState<any>(null);

  const handleCreateTranslation = () => {
    setSelectedTranslation(null);
    setDialogOpen(true);
  };

  const handleEditTranslation = (translation: any) => {
    setSelectedTranslation(translation);
    setDialogOpen(true);
  };

  const handleDeleteTranslation = (id: string) => {
    setTranslations(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Translation Deleted",
      description: "Translation has been deleted successfully.",
    });
  };

  const filteredTranslations = translations.filter(translation =>
    translation.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.english.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      missing: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>{status}</Badge>;
  };

  return (
    <AdminPageWrapper title="Translations Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Translations Management</h1>
            <p className="text-muted-foreground">Manage multi-language translations for the platform.</p>
          </div>
          <Button onClick={handleCreateTranslation}>
            <Plus className="h-4 w-4 mr-2" />
            Add Translation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{translations.length}</div>
                <div className="text-sm text-gray-600">Total Keys</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{translations.filter(t => t.status === 'completed').length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-yellow-600">{translations.filter(t => t.status === 'pending').length}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search translations..."
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
                <TableHead>Key</TableHead>
                <TableHead>English</TableHead>
                <TableHead>Arabic</TableHead>
                <TableHead>French</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTranslations.map((translation) => (
                <TableRow key={translation.id}>
                  <TableCell className="font-mono text-sm">{translation.key}</TableCell>
                  <TableCell>{translation.english}</TableCell>
                  <TableCell>{translation.arabic}</TableCell>
                  <TableCell>{translation.french}</TableCell>
                  <TableCell>{getStatusBadge(translation.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditTranslation(translation)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteTranslation(translation.id)}>
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
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedTranslation ? 'Edit Translation' : 'Add New Translation'}
              </DialogTitle>
              <DialogDescription>
                {selectedTranslation ? 'Update the translation values below.' : 'Add a new translation key with values in all languages.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="key">Translation Key</Label>
                <Input
                  id="key"
                  placeholder="e.g. home.welcome"
                  defaultValue={selectedTranslation?.key || ''}
                />
              </div>
              <div>
                <Label htmlFor="english">English</Label>
                <Input
                  id="english"
                  placeholder="English translation"
                  defaultValue={selectedTranslation?.english || ''}
                />
              </div>
              <div>
                <Label htmlFor="arabic">Arabic</Label>
                <Input
                  id="arabic"
                  placeholder="الترجمة العربية"
                  defaultValue={selectedTranslation?.arabic || ''}
                />
              </div>
              <div>
                <Label htmlFor="french">French</Label>
                <Input
                  id="french"
                  placeholder="Traduction française"
                  defaultValue={selectedTranslation?.french || ''}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                {selectedTranslation ? 'Update Translation' : 'Add Translation'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminTranslationsPage;
