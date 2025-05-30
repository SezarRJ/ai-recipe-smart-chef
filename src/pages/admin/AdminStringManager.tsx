
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, Languages, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface StringEntry {
  id: string;
  key: string;
  language_code: string;
  value: string;
  category?: string; // Make category optional to match database schema
  created_at: string;
  updated_at: string;
}

export default function AdminStringManager() {
  const { toast } = useToast();
  const [strings, setStrings] = useState<StringEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingString, setEditingString] = useState<StringEntry | null>(null);
  const [formData, setFormData] = useState({
    key: '',
    language_code: '',
    value: '',
    category: 'ui'
  });

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文' },
  ];

  const categories = [
    { value: 'ui', label: 'User Interface' },
    { value: 'messages', label: 'Messages' },
    { value: 'errors', label: 'Error Messages' },
    { value: 'navigation', label: 'Navigation' },
    { value: 'forms', label: 'Forms' },
    { value: 'content', label: 'Content' },
  ];

  useEffect(() => {
    fetchStrings();
  }, []);

  const fetchStrings = async () => {
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .order('key');

      if (error) throw error;
      setStrings(data || []);
    } catch (error) {
      console.error('Error fetching strings:', error);
      toast({
        title: "Error",
        description: "Failed to load string entries",
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
      if (editingString) {
        const { error } = await supabase
          .from('translations')
          .update({
            key: formData.key,
            language_code: formData.language_code,
            value: formData.value,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingString.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "String updated successfully",
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
          description: "String added successfully",
        });
      }

      setFormData({ key: '', language_code: '', value: '', category: 'ui' });
      setEditingString(null);
      setIsAddDialogOpen(false);
      fetchStrings();
    } catch (error) {
      console.error('Error saving string:', error);
      toast({
        title: "Error",
        description: "Failed to save string",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (stringEntry: StringEntry) => {
    setEditingString(stringEntry);
    setFormData({
      key: stringEntry.key,
      language_code: stringEntry.language_code,
      value: stringEntry.value,
      category: stringEntry.category || 'ui'
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this string?')) return;

    try {
      const { error } = await supabase
        .from('translations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "String deleted successfully",
      });

      fetchStrings();
    } catch (error) {
      console.error('Error deleting string:', error);
      toast({
        title: "Error",
        description: "Failed to delete string",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "String key copied to clipboard",
    });
  };

  const filteredStrings = strings.filter(stringEntry => {
    const matchesSearch = stringEntry.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stringEntry.value.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || stringEntry.language_code === selectedLanguage;
    const matchesCategory = selectedCategory === 'all' || stringEntry.category === selectedCategory;
    return matchesSearch && matchesLanguage && matchesCategory;
  });

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || code;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">String Manager</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingString(null);
              setFormData({ key: '', language_code: '', value: '', category: 'ui' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add String
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingString ? 'Edit String' : 'Add New String'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  placeholder="e.g., button.save"
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
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
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
                  {editingString ? 'Update' : 'Add'} String
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>String Entries</CardTitle>
          <CardDescription>
            Manage application strings and translations for different languages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search strings..."
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
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
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
                  <TableHead>Category</TableHead>
                  <TableHead>Translation</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStrings.map((stringEntry) => (
                  <TableRow key={stringEntry.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <span>{stringEntry.key}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(stringEntry.key)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{getLanguageName(stringEntry.language_code)}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                        {stringEntry.category || 'ui'}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{stringEntry.value}</TableCell>
                    <TableCell>
                      {new Date(stringEntry.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(stringEntry)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDelete(stringEntry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStrings.length === 0 && !loading && (
            <div className="text-center py-8">
              <Languages className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No strings found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
