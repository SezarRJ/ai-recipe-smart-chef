
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  Plus, 
  Edit,
  Trash2,
  Search,
  Settings,
  Check,
  AlertTriangle,
  Languages as LanguagesIcon
} from 'lucide-react';

interface Language {
  id: string;
  name: string;
  code: string;
  flag: string;
  status: 'active' | 'inactive' | 'beta';
  rtl: boolean;
  completion: number;
  total_strings: number;
  translated_strings: number;
  last_updated: string;
}

export default function LanguagesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [languages] = useState<Language[]>([
    {
      id: '1',
      name: 'English',
      code: 'en',
      flag: '🇺🇸',
      status: 'active',
      rtl: false,
      completion: 100,
      total_strings: 1250,
      translated_strings: 1250,
      last_updated: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Arabic',
      code: 'ar',
      flag: '🇸🇦',
      status: 'active',
      rtl: true,
      completion: 95,
      total_strings: 1250,
      translated_strings: 1188,
      last_updated: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      name: 'Turkish',
      code: 'tr',
      flag: '🇹🇷',
      status: 'active',
      rtl: false,
      completion: 88,
      total_strings: 1250,
      translated_strings: 1100,
      last_updated: '2024-01-13T16:45:00Z'
    },
    {
      id: '4',
      name: 'French',
      code: 'fr',
      flag: '🇫🇷',
      status: 'beta',
      rtl: false,
      completion: 65,
      total_strings: 1250,
      translated_strings: 813,
      last_updated: '2024-01-12T09:15:00Z'
    },
    {
      id: '5',
      name: 'Spanish',
      code: 'es',
      flag: '🇪🇸',
      status: 'inactive',
      rtl: false,
      completion: 35,
      total_strings: 1250,
      translated_strings: 438,
      last_updated: '2024-01-10T11:30:00Z'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'inactive': 'secondary',
      'beta': 'outline'
    };
    return <Badge variant={variants[status] as any}>{status}</Badge>;
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 90) return 'bg-green-500';
    if (completion >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const stats = {
    totalLanguages: languages.length,
    activeLanguages: languages.filter(l => l.status === 'active').length,
    betaLanguages: languages.filter(l => l.status === 'beta').length,
    avgCompletion: Math.round(languages.reduce((sum, l) => sum + l.completion, 0) / languages.length)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Language Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Language</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Language Name</Label>
                  <Input id="name" placeholder="e.g., German" />
                </div>
                <div>
                  <Label htmlFor="code">Language Code</Label>
                  <Input id="code" placeholder="e.g., de" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="flag">Flag Emoji</Label>
                  <Input id="flag" placeholder="🇩🇪" />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="beta">Beta</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="rtl" />
                <Label htmlFor="rtl">Right-to-Left (RTL) Language</Label>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Add Language</Button>
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
                <LanguagesIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Languages</p>
                <p className="text-2xl font-bold">{stats.totalLanguages}</p>
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
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold">{stats.activeLanguages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Beta</p>
                <p className="text-2xl font-bold">{stats.betaLanguages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Globe className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                <p className="text-2xl font-bold">{stats.avgCompletion}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Languages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Languages</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search languages..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="beta">Beta</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Language</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Translations</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {languages.map((language) => (
                <TableRow key={language.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{language.flag}</span>
                      <span className="font-medium">{language.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {language.code}
                    </code>
                  </TableCell>
                  <TableCell>{getStatusBadge(language.status)}</TableCell>
                  <TableCell>
                    <Badge variant={language.rtl ? "default" : "outline"}>
                      {language.rtl ? 'RTL' : 'LTR'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{language.completion}%</span>
                      </div>
                      <Progress 
                        value={language.completion} 
                        className="w-full h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{language.translated_strings} / {language.total_strings}</p>
                      <p className="text-gray-500">
                        {language.total_strings - language.translated_strings} missing
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(language.last_updated).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {language.status === 'inactive' && (
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
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
