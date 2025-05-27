
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { CheckSquare, Edit2, Trash2, Users, Plus, Save, X, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const mockUserTypes: UserType[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full access to all features',
    userCount: 3,
    color: '#FF4500',
    permissions: [
      'view_recipes', 'create_recipes', 'edit_recipes', 'delete_recipes',
      'view_users', 'edit_users', 'delete_users',
      'edit_settings',
      'view_finances', 'edit_finances',
      'view_analytics', 'export_analytics',
    ],
    isDefault: false,
    isSystemType: true,
  },
  {
    id: '2',
    name: 'Content Manager',
    description: 'Can manage recipes and content',
    userCount: 8,
    color: '#4169E1',
    permissions: [
      'view_recipes', 'create_recipes', 'edit_recipes', 'delete_recipes',
      'view_users',
      'view_analytics',
    ],
    isDefault: false,
    isSystemType: false,
  },
  {
    id: '3',
    name: 'User',
    description: 'Standard user permissions',
    userCount: 1248,
    color: '#32CD32',
    permissions: [
      'view_recipes', 'create_recipes',
    ],
    isDefault: true,
    isSystemType: true,
  },
  {
    id: '4',
    name: 'Finance Manager',
    description: 'Can view and edit financial data',
    userCount: 5,
    color: '#9932CC',
    permissions: [
      'view_recipes',
      'view_users',
      'view_finances', 'edit_finances',
      'view_analytics', 'export_analytics',
    ],
    isDefault: false,
    isSystemType: false,
  },
];

const AdminUserTypesManager: React.FC = () => {
  const [userTypes, setUserTypes] = useState<UserType[]>(mockUserTypes);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [editingType, setEditingType] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{name: string, description: string, color: string, permissions: string[]}>({
    name: '',
    description: '',
    color: '',
    permissions: [],
  });
  
  const { toast } = useToast();
  
  const handleSetDefault = (id: string) => {
    setUserTypes(userTypes.map(type => ({
      ...type,
      isDefault: type.id === id
    })));
    
    toast({
      title: 'Default User Type Updated',
      description: `New users will now be assigned this user type.`,
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
      title: 'User Type Updated',
      description: 'The user type has been successfully updated.',
    });
  };
  
  const handleTogglePermission = (permissionId: string) => {
    setEditForm(prev => {
      const permissions = prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId];
      
      return { ...prev, permissions };
    });
  };
  
  const handleDeleteType = (id: string) => {
    const type = userTypes.find(t => t.id === id);
    
    if (type?.isSystemType) {
      toast({
        title: 'Cannot Delete System Type',
        description: 'System-defined user types cannot be deleted.',
        variant: 'destructive',
      });
      return;
    }
    
    setUserTypes(userTypes.filter(type => type.id !== id));
    toast({
      title: 'User Type Deleted',
      description: 'The user type has been deleted successfully.',
    });
  };
  
  const getPermissionName = (id: string) => {
    return permissions.find(p => p.id === id)?.name || id;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <Users className="mr-2 h-6 w-6" /> User Types
          </h1>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create User Type
        </Button>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {userTypes.map((type) => (
          <Card key={type.id} className={editingType === type.id ? 'border-wasfah-bright-teal' : ''}>
            <CardHeader className="pb-3">
              {editingType === type.id ? (
                <div className="space-y-2">
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="font-semibold"
                  />
                  <Input
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    placeholder="Description"
                  />
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`color-${type.id}`}>Color:</Label>
                    <Input
                      id={`color-${type.id}`}
                      type="color"
                      value={editForm.color}
                      onChange={(e) => setEditForm({...editForm, color: e.target.value})}
                      className="w-12 h-8 p-1"
                    />
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
                      {type.name}
                      {type.isDefault && (
                        <Badge className="ml-2 bg-wasfah-bright-teal text-xs">Default</Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {!type.isSystemType && (
                      <>
                        <Button variant="ghost" size="sm" onClick={() => handleEditType(type)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteType(type.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {editingType === type.id ? (
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Permissions:</h4>
                  <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-2">
                    {permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <Switch
                            id={`permission-${permission.id}`}
                            checked={editForm.permissions.includes(permission.id)}
                            onCheckedChange={() => handleTogglePermission(permission.id)}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`permission-${permission.id}`}
                            className="font-medium text-sm cursor-pointer"
                          >
                            {permission.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleSaveType(type.id)}>
                      <Save className="h-4 w-4 mr-1" /> Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Users with this type: {type.userCount}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Permissions:</h4>
                    <div className="space-y-1">
                      {type.permissions.slice(0, 4).map((permId) => (
                        <div key={permId} className="flex items-center text-sm">
                          <CheckSquare className="h-3 w-3 text-wasfah-bright-teal mr-2" />
                          {getPermissionName(permId)}
                        </div>
                      ))}
                      {type.permissions.length > 4 && (
                        <div className="text-xs text-muted-foreground">
                          +{type.permissions.length - 4} more permissions
                        </div>
                      )}
                    </div>
                  </div>
                  {!type.isDefault && !type.isSystemType && (
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleSetDefault(type.id)}
                      >
                        Set as Default
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Type Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Users</TableHead>
                <TableHead className="hidden md:table-cell">Default</TableHead>
                <TableHead className="hidden md:table-cell">System Type</TableHead>
                <TableHead className="hidden lg:table-cell">Permission Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userTypes.map((type) => (
                <TableRow key={type.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: type.color }}
                      ></div>
                      <span>{type.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{type.userCount}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {type.isDefault ? (
                      <CheckSquare className="h-4 w-4 text-wasfah-bright-teal" />
                    ) : (
                      <span>—</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {type.isSystemType ? (
                      <CheckSquare className="h-4 w-4 text-wasfah-bright-teal" />
                    ) : (
                      <span>—</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{type.permissions.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start">
        <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-amber-800">User Types Best Practices</h3>
          <ul className="text-sm space-y-1 text-amber-800 mt-2 list-disc pl-5">
            <li>Limit the number of custom user types to avoid complexity</li>
            <li>Always review permissions carefully before assigning them</li>
            <li>System-defined types cannot be modified or deleted</li>
            <li>Use the "Default" type for new user registrations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminUserTypesManager;
