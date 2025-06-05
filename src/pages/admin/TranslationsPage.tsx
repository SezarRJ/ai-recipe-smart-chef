
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Languages, 
  Plus, 
  Edit,
  Trash2,
  Search,
  Globe,
  FileText,
  Check,
  AlertTriangle
} from 'lucide-react';

interface Translation {
  id: string;
  key: string;
  language_code: string;
  value: string;
  status: 'approved' | 'pending' | 'needs_review';
  context?: string;
  created_at: string;
  updated_at: string;
}

export default function TranslationsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [translations] = useState<Translation[]>([
    {
      id: '1',
      key: 'welcome_message',
      language_code: 'ar',
      value: 'مرحباً بك في وصفة',
      status: 'approved',
      context: 'Home page greeting',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      key: 'welcome_message',
      language_code: 'tr',
      value: 'Wasfah\'ya Hoş Geldiniz',
      status: 'approved',
      context: 'Home page greeting',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '3',
      key: 'recipe_not_found',
      language_code: 'ar',
      value: 'لم يتم العثور على الوصفة',
      status: 'pending',
      context: 'Error message when recipe is not found',
      created_at: '2024-01-14T14:20:00Z',
      updated_at: '2024-01-14T14:20:00Z'
    },
    {
      id: '4',
      key: 'save_recipe',
      language_code: 'tr',
      value: 'Tarifi Kaydet',
      status: 'needs_review',
      context: 'Button to save a recipe',
      created_at: '2024-01-13T16:45:00Z',
      updated_at: '2024-01-13T16:45:00Z'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      'approved': 'default',
      'pending': 'secondary',
      'needs_review': 'destructive'
    };
    return <Badge variant={variants[status] as any}>{status.replace('_', ' ')}</Badge>;
  };

  const getLanguageFlag = (code: string) => {
    const flags = {
      'en': '🇺🇸',
      'ar': '🇸🇦',
      'tr': '🇹🇷',
      'fr': '🇫🇷',
      'es': '🇪🇸'
    };
    return flags[code] || '🌐';
  };

  const stats = {
    totalTranslations: translations.length,
    approved: translations.filter(t => t.status === 'approved').length,
    pending: translations.filter(t => t.status === 'pending').length,
    needsReview: translations.filter(t => t.status === 'needs_review').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Translation Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Translation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Translation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="key">Translation Key</Label>
                  <Input id="key" placeholder="e.g., welcome_message" />
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                      <SelectItem value="ar">🇸🇦 Arabic</SelectItem>
                      <SelectItem value="tr">🇹🇷 Turkish</SelectItem>
                      <SelectItem value="fr">🇫🇷 French</SelectItem>
                      <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="value">Translation Value</Label>
                <Textarea id="value" placeholder="Enter the translated text" rows={3} />
              </div>
              <div>
                <Label htmlFor="context">Context (Optional)</Label>
                <Input id="context" placeholder="Where is this text used?" />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Add Translation</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Languages className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Translations</p>
                <p className="text-2xl font-bold">{stats.totalTranslations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Needs Review</p>
                <p className="text-2xl font-bold">{stats.needsReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Translations Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Translations</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search translations..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="tr">Turkish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="needs_review">Needs Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Translation</TableHead>
                <TableHead>Context</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {translations.map((translation) => (
                <TableRow key={translation.id}>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {translation.key}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getLanguageFlag(translation.language_code)}</span>
                      <span className="uppercase">{translation.language_code}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={translation.value}>
                      {translation.value}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {translation.context || '-'}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(translation.status)}</TableCell>
                  <TableCell>
                    {new Date(translation.updated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {translation.status === 'pending' && (
                        <Button size="sm">
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
