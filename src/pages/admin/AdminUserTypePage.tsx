
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Plus, Edit, Trash2, Users, Shield, Crown } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const mockUserTypes = [
  {
    id: 'UT-001',
    name: 'Free User',
    description: 'Basic access to recipes and features',
    permissions: ['view_recipes', 'create_favorites', 'basic_search'],
    userCount: 12500,
    color: 'bg-gray-100 text-gray-800',
    icon: Users
  },
  {
    id: 'UT-002',
    name: 'Premium User',
    description: 'Enhanced features and unlimited access',
    permissions: ['view_recipes', 'create_favorites', 'advanced_search', 'meal_planning', 'nutrition_tracking'],
    userCount: 3200,
    color: 'bg-blue-100 text-blue-800',
    icon: Crown
  },
  {
    id: 'UT-003',
    name: 'Admin',
    description: 'Full system administration access',
    permissions: ['all_permissions', 'user_management', 'system_settings', 'content_moderation'],
    userCount: 15,
    color: 'bg-purple-100 text-purple-800',
    icon: Shield
  },
  {
    id: 'UT-004',
    name: 'Chef',
    description: 'Content creator with recipe publishing rights',
    permissions: ['view_recipes', 'create_recipes', 'publish_recipes', 'manage_own_content'],
    userCount: 450,
    color: 'bg-orange-100 text-orange-800',
    icon: Users
  }
];

const AdminUserTypePage = () => {
  const { toast } = useToast();
  const [userTypes, setUserTypes] = useState(mockUserTypes);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<any>(null);

  const handleCreateUserType = () => {
    setSelectedUserType(null);
    setDialogOpen(true);
  };

  const handleEditUserType = (userType: any) => {
    setSelectedUserType(userType);
    setDialogOpen(true);
  };

  const handleDeleteUserType = (id: string) => {
    setUserTypes(prev => prev.filter(ut => ut.id !== id));
    toast({
      title: "User Type Deleted",
      description: "User type has been deleted successfully.",
    });
  };

  const filteredUserTypes = userTypes.filter(userType =>
    userType.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    userType.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUsers = userTypes.reduce((sum, type) => sum + type.userCount, 0);

  return (
    <AdminPageWrapper title="User Types Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">User Types Management</h1>
            <p className="text-muted-foreground">Manage user roles, permissions, and access levels.</p>
          </div>
          <Button onClick={handleCreateUserType}>
            <Plus className="h-4 w-4 mr-2" />
            Add User Type
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{userTypes.length}</div>
                <div className="text-sm text-gray-600">User Types</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{totalUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">{userTypes.filter(t => t.name.includes('Admin')).length}</div>
            <div className="text-sm text-gray-600">Admin Types</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-orange-600">{userTypes.filter(t => t.name.includes('Premium')).length}</div>
            <div className="text-sm text-gray-600">Premium Types</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search user types..."
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
                <TableHead>User Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>User Count</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUserTypes.map((userType) => {
                const Icon = userType.icon;
                return (
                  <TableRow key={userType.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{userType.name}</div>
                          <Badge className={userType.color}>{userType.name}</Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate" title={userType.description}>
                        {userType.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="text-lg font-semibold">{userType.userCount.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {userType.permissions.slice(0, 2).map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                        {userType.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{userType.permissions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditUserType(userType)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteUserType(userType.id)}
                          disabled={userType.name === 'Admin'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedUserType ? 'Edit User Type' : 'Add New User Type'}
              </DialogTitle>
              <DialogDescription>
                {selectedUserType ? 'Update the user type configuration.' : 'Create a new user type with specific permissions.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">User Type Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Premium User"
                  defaultValue={selectedUserType?.name || ''}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the user type and its purpose"
                  defaultValue={selectedUserType?.description || ''}
                />
              </div>
              <div>
                <Label htmlFor="permissions">Permissions (comma-separated)</Label>
                <Textarea
                  id="permissions"
                  placeholder="e.g. view_recipes, create_favorites, advanced_search"
                  defaultValue={selectedUserType?.permissions.join(', ') || ''}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                {selectedUserType ? 'Update User Type' : 'Add User Type'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminUserTypePage;
