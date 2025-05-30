
// src/pages/AdminUserTypesManager.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Users, Plus, Edit2, Trash2, Settings, FileText, DollarSign, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'users' | 'settings' | 'finances' | 'analytics';
}

interface UserType {
  id: string;
  name: string;
  description: string;
  userCount: number;
  color: string;
  permissions: string[];
  isDefault: boolean;
  isSystemType: boolean;
}

const mockPermissions: Permission[] = [
  { id: 'view_recipes', name: 'View Recipes', description: 'Can view all recipes', category: 'content' },
  { id: 'create_recipes', name: 'Create Recipes', description: 'Can create new recipes', category: 'content' },
  { id: 'edit_recipes', name: 'Edit Recipes', description: 'Can edit existing recipes', category: 'content' },
  { id: 'delete_recipes', name: 'Delete Recipes', description: 'Can delete recipes', category: 'content' },
  { id: 'view_users', name: 'View Users', description: 'Can view user accounts', category: 'users' },
  { id: 'edit_users', name: 'Edit Users', description: 'Can edit user accounts', category: 'users' },
  { id: 'delete_users', name: 'Delete Users', description: 'Can delete user accounts', category: 'users' },
  { id: 'edit_settings', name: 'Edit Settings', description: 'Can modify application settings', category: 'settings' },
  { id: 'view_finances', name: 'View Finances', description: 'Can view financial information', category: 'finances' },
  { id: 'edit_finances', name: 'Edit Finances', description: 'Can edit financial information', category: 'finances' },
  { id: 'view_analytics', name: 'View Analytics', description: 'Can view analytics data', category: 'analytics' },
  { id: 'export_analytics', name: 'Export Analytics', description: 'Can export analytics data', category: 'analytics' },
];

const initialMockUserTypes: UserType[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full access to all features',
    userCount: 3,
    color: '#FF4500',
    permissions: ['view_recipes', 'create_recipes', 'edit_recipes', 'delete_recipes', 'view_users', 'edit_users', 'delete_users', 'edit_settings', 'view_finances', 'edit_finances', 'view_analytics', 'export_analytics'],
    isDefault: false,
    isSystemType: true,
  },
  {
    id: '2',
    name: 'Content Manager',
    description: 'Can manage recipes and content',
    userCount: 8,
    color: '#4169E1',
    permissions: ['view_recipes', 'create_recipes', 'edit_recipes', 'delete_recipes', 'view_users', 'view_analytics'],
    isDefault: false,
    isSystemType: false,
  },
  {
    id: '3',
    name: 'User',
    description: 'Standard user permissions',
    userCount: 1248,
    color: '#32CD32',
    permissions: ['view_recipes', 'create_recipes'],
    isDefault: true,
    isSystemType: true,
  },
];

const AdminUserTypesManager: React.FC = () => {
  const { t } = useRTL();
  const { toast } = useToast();

  const [userTypes, setUserTypes] = useState<UserType[]>(initialMockUserTypes);
  const [editingType, setEditingType] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{name: string, description: string, color: string, permissions: string[]}>({
    name: '',
    description: '',
    color: '',
    permissions: [],
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createForm, setCreateForm] = useState<{name: string, description: string, color: string, permissions: string[]}>({
    name: '',
    description: '',
    color: '#000000',
    permissions: [],
  });

  const handleSetDefault = (id: string) => {
    setUserTypes(userTypes.map(type => ({
      ...type,
      isDefault: type.id === id
    })));

    toast({
      title: t('Default User Type Updated', 'تم تحديث نوع المستخدم الافتراضي'),
      description: t('New users will now be assigned this user type.', 'سيتم الآن تعيين هذا النوع من المستخدمين للمستخدمين الجدد.'),
    });
  };

  const handleEditType = (type: UserType) => {
    setEditingType(type.id);
    setEditForm({
      name: type.name,
      description: type.description,
      color: type.color,
      permissions: [...type.permissions],
    });
  };

  const handleCancelEdit = () => {
    setEditingType(null);
  };

  const handleSaveType = (id: string) => {
    if (!editForm.name) {
      toast({
        title: t('Validation Error', 'خطأ في التحقق'),
        description: t('User type name is required.', 'اسم نوع المستخدم مطلوب.'),
        variant: 'destructive',
      });
      return;
    }

    setUserTypes(userTypes.map(type =>
      type.id === id ? {
        ...type,
        name: editForm.name,
        description: editForm.description,
        color: editForm.color,
        permissions: editForm.permissions,
      } : type
    ));

    setEditingType(null);
    toast({
      title: t('User Type Updated', 'تم تحديث نوع المستخدم'),
      description: t('The user type has been successfully updated.', 'تم تحديث نوع المستخدم بنجاح.'),
    });
  };

  const handleToggleEditPermission = (permissionId: string) => {
    setEditForm(prev => {
      const permissions = prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId];

      return { ...prev, permissions };
    });
  };

  const handleToggleCreatePermission = (permissionId: string) => {
    setCreateForm(prev => {
      const permissions = prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId];

      return { ...prev, permissions };
    });
  };

  const handleDeleteType = (id: string) => {
    const type = userTypes.find(t => t.id === id);
    if (!type || type.isSystemType || type.isDefault) {
      toast({
        title: t('Cannot Delete', 'لا يمكن الحذف'),
        description: t('System types and default types cannot be deleted.', 'لا يمكن حذف أنواع النظام والأنواع الافتراضية.'),
        variant: 'destructive',
      });
      return;
    }

    if (window.confirm(t(`Are you sure you want to delete "${type.name}"?`, `هل أنت متأكد أنك تريد حذف "${type.name}"؟`))) {
      setUserTypes(userTypes.filter(type => type.id !== id));
      toast({
        title: t('User Type Deleted', 'تم حذف نوع المستخدم'),
        description: t('The user type has been deleted successfully.', 'تم حذف نوع المستخدم بنجاح.'),
      });
    }
  };

  const handleCreateFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setCreateForm(prev => ({ ...prev, [id]: value }));
  };

  const handleCreateNewType = (event: React.FormEvent) => {
    event.preventDefault();

    if (!createForm.name || !createForm.description) {
      toast({
        title: t('Validation Error', 'خطأ في التحقق'),
        description: t('Name and description are required.', 'الاسم والوصف مطلوبان.'),
        variant: "destructive",
      });
      return;
    }

    const newType: UserType = {
      id: Date.now().toString(),
      ...createForm,
      userCount: 0,
      isDefault: false,
      isSystemType: false,
    };

    setUserTypes(prevTypes => [...prevTypes, newType]);
    setCreateForm({ name: '', description: '', color: '#000000', permissions: [] });
    setIsCreateDialogOpen(false);

    toast({
      title: t("User Type Created", "تم إنشاء نوع المستخدم"),
      description: t(`User type "${newType.name}" has been created.`, `تم إنشاء نوع المستخدم "${newType.name}".`),
    });
  };

  const groupedPermissionsForForms = useMemo(() => {
    return mockPermissions.reduce((acc, perm) => {
      if (!acc[perm.category]) {
        acc[perm.category] = [];
      }
      acc[perm.category].push(perm);
      return acc;
    }, {} as Record<Permission['category'], Permission[]>);
  }, []);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center text-gray-900 dark:text-white">
            <Users className="mr-2 h-6 w-6" /> {t('User Types', 'أنواع المستخدمين')}
          </h1>
          <p className="text-muted-foreground">{t('Manage user roles and permissions', 'إدارة أدوار المستخدمين وصلاحياتهم')}</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> {t('Create User Type', 'إنشاء نوع مستخدم')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('Create New User Type', 'إنشاء نوع مستخدم جديد')}</DialogTitle>
              <DialogDescription>
                {t('Define a new user type with specific permissions.', 'تحديد نوع مستخدم جديد بصلاحيات محددة.')}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateNewType}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    {t('Name', 'الاسم')}
                  </Label>
                  <Input
                    id="name"
                    value={createForm.name}
                    onChange={handleCreateFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    {t('Description', 'الوصف')}
                  </Label>
                  <Input
                    id="description"
                    value={createForm.description}
                    onChange={handleCreateFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="color" className="text-right">
                    {t('Color', 'اللون')}
                  </Label>
                  <Input
                    id="color"
                    type="color"
                    value={createForm.color}
                    onChange={handleCreateFormChange}
                    className="col-span-3 w-12 h-8 p-1"
                    required
                  />
                </div>

                <div className="col-span-4">
                  <h4 className="font-medium text-sm mb-2">{t('Permissions', 'الصلاحيات')}:</h4>
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {Object.entries(groupedPermissionsForForms).map(([category, perms]) => (
                      <div key={category} className="space-y-2 border-b pb-3 last:border-b-0">
                        <h5 className="text-sm font-semibold capitalize text-gray-700 dark:text-gray-300">
                          {category === 'content' && <FileText className="inline h-4 w-4 mr-1 text-blue-500" />}
                          {category === 'users' && <Users className="inline h-4 w-4 mr-1 text-purple-500" />}
                          {category === 'settings' && <Settings className="inline h-4 w-4 mr-1 text-gray-500" />}
                          {category === 'finances' && <DollarSign className="inline h-4 w-4 mr-1 text-green-500" />}
                          {category === 'analytics' && <BarChart className="inline h-4 w-4 mr-1 text-red-500" />}
                          {t(category.charAt(0).toUpperCase() + category.slice(1), category)}
                        </h5>
                        {perms.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                          >
                            <Switch
                              id={`create-permission-${permission.id}`}
                              checked={createForm.permissions.includes(permission.id)}
                              onCheckedChange={() => handleToggleCreatePermission(permission.id)}
                            />
                            <Label
                              htmlFor={`create-permission-${permission.id}`}
                              className="font-medium text-sm cursor-pointer text-gray-800 dark:text-gray-200"
                            >
                              {t(permission.name, permission.name)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{t('Create User Type', 'إنشاء نوع مستخدم')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {userTypes.map((type) => (
          <Card key={type.id} className={editingType === type.id ? 'border-2 border-primary' : ''}>
            <CardHeader className="pb-3">
              {editingType === type.id ? (
                <div className="space-y-2">
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="font-semibold"
                    placeholder={t('User Type Name', 'اسم نوع المستخدم')}
                    required
                  />
                  <Input
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    placeholder={t('Description', 'الوصف')}
                    required
                  />
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`color-${type.id}`}>{t('Color', 'اللون')}:</Label>
                    <Input
                      id={`color-${type.id}`}
                      type="color"
                      value={editForm.color}
                      onChange={(e) => setEditForm({...editForm, color: e.target.value})}
                      className="w-12 h-8 p-1"
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleSaveType(type.id)}>
                      {t('Save', 'حفظ')}
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                      {t('Cancel', 'إلغاء')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: type.color }}
                      ></div>
                      {t(type.name, type.name)}
                      {type.isDefault && (
                        <Badge className="ml-2 bg-primary text-primary-foreground text-xs">{t('Default', 'افتراضي')}</Badge>
                      )}
                      {type.isSystemType && (
                        <Badge variant="secondary" className="ml-2 text-xs">{t('System', 'نظام')}</Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{t(type.description, type.description)}</p>
                  </div>
                  {!type.isSystemType && (
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEditType(type)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteType(type.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('Users', 'المستخدمون')}</span>
                  <span className="font-medium">{type.userCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('Permissions', 'الصلاحيات')}</span>
                  <span className="font-medium">{type.permissions.length}</span>
                </div>
                {!type.isDefault && !type.isSystemType && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => handleSetDefault(type.id)}
                  >
                    {t('Set as Default', 'تعيين كافتراضي')}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUserTypesManager;
