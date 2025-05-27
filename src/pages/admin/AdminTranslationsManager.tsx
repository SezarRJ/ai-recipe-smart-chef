
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Translation {
  id: string;
  key: string;
  language_code: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export default function AdminTranslationsManager() {
  const { toast } = useToast();
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);
  const [formData, setFormData] = useState({
    key: '',
    language_code: '',
    value: ''
  });

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文' },
  ];

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .order('key');

      if (error) throw error;
      setTranslations(data || []);
    } catch (error) {
      console.error('Error fetching translations:', error);
      toast({
        title: "Error",
        description: "Failed to load translations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.key || !formData.language_code || !formData.value) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingTranslation) {
        const { error } = await supabase
          .from('translations')
          .update({
            key: formData.key,
            language_code: formData.language_code,
            value: formData.value,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingTranslation.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Translation updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('translations')
          .insert({
            key: formData.key,
            language_code: formData.language_code,
            value: formData.value
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Translation added successfully",
        });
      }

      setFormData({ key: '', language_code: '', value: '' });
      setEditingTranslation(null);
      setIsAddDialogOpen(false);
      fetchTranslations();
    } catch (error) {
      console.error('Error saving translation:', error);
      toast({
        title: "Error",
        description: "Failed to save translation",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (translation: Translation) => {
    setEditingTranslation(translation);
    setFormData({
      key: translation.key,
      language_code: translation.language_code,
      value: translation.value
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this translation?')) return;

    try {
      const { error } = await supabase
        .from('translations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Translation deleted successfully",
      });

      fetchTranslations();
    } catch (error) {
      console.error('Error deleting translation:', error);
      toast({
        title: "Error",
        description: "Failed to delete translation",
        variant: "destructive",
      });
    }
  };

  const filteredTranslations = translations.filter(translation => {
    const matchesSearch = translation.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         translation.value.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || translation.language_code === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || code;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Translations Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingTranslation(null);
              setFormData({ key: '', language_code: '', value: '' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Translation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingTranslation ? 'Edit Translation' : 'Add New Translation'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  placeholder="Enter translation key"
                  required
                />
              </div>
              <div>
                <Label htmlFor="language_code">Language</Label>
                <Select value={formData.language_code} onValueChange={(value) => setFormData({ ...formData, language_code: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.code} value={language.code}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="value">Translation</Label>
                <Textarea
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="Enter translation value"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTranslation ? 'Update' : 'Add'} Translation
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Translations</CardTitle>
          <CardDescription>
            Manage app translations for different languages. All changes will be reflected immediately in the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search translations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Translation</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTranslations.map((translation) => (
                  <TableRow key={translation.id}>
                    <TableCell className="font-medium">{translation.key}</TableCell>
                    <TableCell>{getLanguageName(translation.language_code)}</TableCell>
                    <TableCell className="max-w-xs truncate">{translation.value}</TableCell>
                    <TableCell>
                      {new Date(translation.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
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
              <p className="text-gray-500">No translations found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
