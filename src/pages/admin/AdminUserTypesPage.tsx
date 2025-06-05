
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UserCog, Crown, Shield, Users, Plus, Edit, Trash2 } from 'lucide-react';

const AdminUserTypesPage = () => {
  const [userTypes] = useState([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access and control',
      permissions: ['all'],
      userCount: 2,
      status: 'active'
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access with some restrictions',
      permissions: ['manage_users', 'manage_recipes', 'view_analytics'],
      userCount: 5,
      status: 'active'
    },
    {
      id: '3',
      name: 'Premium User',
      description: 'Premium subscription features',
      permissions: ['ai_features', 'meal_planning', 'advanced_search'],
      userCount: 150,
      status: 'active'
    },
    {
      id: '4',
      name: 'Regular User',
      description: 'Standard user access',
      permissions: ['basic_features', 'recipe_creation'],
      userCount: 1250,
      status: 'active'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'super admin': return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'admin': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'premium user': return <UserCog className="h-4 w-4 text-purple-600" />;
      default: return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <AdminPageWrapper title="User Types Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">User Types</h1>
            <p className="text-muted-foreground">Manage user roles and permissions.</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User Type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User Type</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="typeName">Type Name</Label>
                  <Input id="typeName" placeholder="Enter user type name" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Describe this user type" />
                </div>
                <div>
                  <Label htmlFor="permissions">Permissions</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select permissions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Features</SelectItem>
                      <SelectItem value="premium">Premium Features</SelectItem>
                      <SelectItem value="admin">Admin Features</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Create User Type</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {userTypes.map((type) => (
            <Card key={type.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(type.name)}
                    <CardTitle className="text-sm">{type.name}</CardTitle>
                  </div>
                  <Badge variant="outline">{type.userCount} users</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All User Types</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(type.name)}
                        {type.name}
                      </div>
                    </TableCell>
                    <TableCell>{type.description}</TableCell>
                    <TableCell>{type.userCount}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminUserTypesPage;
