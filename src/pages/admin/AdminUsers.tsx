
import React from 'react';
import { Search, Filter, MoreHorizontal, RefreshCw, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    status: 'Active',
    role: 'User',
    plan: 'Premium',
    lastActive: '2h ago',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    status: 'Active',
    role: 'User',
    plan: 'Free',
    lastActive: '1d ago',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    status: 'Inactive',
    role: 'User',
    plan: 'Premium',
    lastActive: '1w ago',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.k@example.com',
    status: 'Active',
    role: 'Admin',
    plan: 'Premium',
    lastActive: '3h ago',
  },
  {
    id: '5',
    name: 'Sophia Nguyen',
    email: 'sophia.n@example.com',
    status: 'Active',
    role: 'User',
    plan: 'Free',
    lastActive: '5m ago',
  },
];

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-muted-foreground">View and manage user accounts.</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account. They will receive an email to set their password.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <select id="role" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>User</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8 w-full md:w-80"
          />
        </div>
        <div className="flex items-center gap-2 self-end">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.plan}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Impersonate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Disable Account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>5</strong> of <strong>100</strong> users
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
