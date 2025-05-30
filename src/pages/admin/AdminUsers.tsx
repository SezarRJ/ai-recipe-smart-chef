// src/pages/AdminUsers.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, MoreHorizontal, RefreshCw, Plus, Edit, Eye, UserX } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  role: 'User' | 'Admin';
  plan: 'Free' | 'Premium';
  lastActive: string;
}

const initialMockUsers: User[] = [
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
  const { t } = useRTL();
  const { toast } = useToast();

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({ status: 'all', role: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', role: 'User' });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setAllUsers(initialMockUsers);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let users = [...allUsers];

    if (searchQuery) {
      users = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.plan.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCriteria.status !== 'all') {
      users = users.filter(user => user.status === filterCriteria.status);
    }
    if (filterCriteria.role !== 'all') {
      users = users.filter(user => user.role === filterCriteria.role);
    }

    setFilteredUsers(users);
    setCurrentPage(1);
  }, [allUsers, searchQuery, filterCriteria]);

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, startIndex, endIndex]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (filterName: keyof typeof filterCriteria, value: string) => {
    setFilterCriteria(prev => ({ ...prev, [filterName]: value }));
    toast({
      title: t("Filter Applied", "تم تطبيق الفلتر"),
      description: t(`Filter by ${filterName} set to ${value}`, `تم تعيين الفلتر حسب ${filterName} إلى ${value}`),
      duration: 2000,
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setSearchQuery('');
    setFilterCriteria({ status: 'all', role: 'all' });
    setCurrentPage(1);

    const timer = setTimeout(() => {
      setAllUsers(initialMockUsers);
      setIsLoading(false);
      toast({
        title: t("Refreshed", "تم التحديث"),
        description: t("User list updated.", "تم تحديث قائمة المستخدمين."),
      });
    }, 800);

    return () => clearTimeout(timer);
  };

  const handleNewUserInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setNewUserForm(prev => ({ ...prev, [id]: value }));
  };

  const handleAddNewUser = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newUserForm.name || !newUserForm.email) {
      toast({
        title: t("Error", "خطأ"),
        description: t("Name and Email are required.", "الاسم والبريد الإلكتروني مطلوبان."),
        variant: "destructive",
      });
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role as 'User' | 'Admin', // Type assertion to ensure correct type
      status: 'Inactive' as const,
      plan: 'Free' as const,
      lastActive: t('Just added', 'تمت الإضافة الآن'),
    };

    setAllUsers(prevUsers => [newUser, ...prevUsers]);
    setNewUserForm({ name: '', email: '', role: 'User' });
    setIsAddUserDialogOpen(false);

    toast({
      title: t("User Added", "تمت إضافة المستخدم"),
      description: t(`${newUser.name} has been added.`, `تمت إضافة ${newUser.name}.`),
    });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleUserAction = (action: string, user: User) => {
    console.log(`${action} action triggered for user:`, user);
    
    switch (action) {
      case 'Edit':
        toast({ 
          title: t("Edit User", "تعديل المستخدم"), 
          description: t(`Editing ${user.name} (Placeholder)`, `تعديل ${user.name} (عنصر نائب)`), 
          duration: 2000 
        });
        break;
      case 'View Profile':
        toast({ 
          title: t("View Profile", "عرض الملف الشخصي"), 
          description: t(`Viewing profile for ${user.name} (Placeholder)`, `عرض ملف ${user.name} (عنصر نائب)`), 
          duration: 2000 
        });
        break;
      case 'Disable Account':
        if (window.confirm(t(`Are you sure you want to disable ${user.name}'s account?`, `هل أنت متأكد أنك تريد تعطيل حساب ${user.name}؟`))) {
          setAllUsers(prevUsers => prevUsers.map(u => u.id === user.id ? { ...u, status: 'Inactive' as const } : u));
          toast({ 
            title: t("Account Disabled", "تم تعطيل الحساب"), 
            description: t(`${user.name}'s account has been disabled.`, `تم تعطيل حساب ${user.name}.`), 
            variant: "destructive" 
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('User Management', 'إدارة المستخدمين')}</h1>
          <p className="text-muted-foreground">{t('View and manage user accounts.', 'عرض وإدارة حسابات المستخدمين.')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('Add User', 'إضافة مستخدم')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t('Add New User', 'إضافة مستخدم جديد')}</DialogTitle>
                <DialogDescription>
                  {t('Create a new user account. They will receive an email to set their password.', 'إنشاء حساب مستخدم جديد. سيتلقى المستخدم بريدًا إلكترونيًا لتعيين كلمة المرور.')}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddNewUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      {t('Name', 'الاسم')}
                    </Label>
                    <Input
                      id="name"
                      value={newUserForm.name}
                      onChange={handleNewUserInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      {t('Email', 'البريد الإلكتروني')}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUserForm.email}
                      onChange={handleNewUserInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      {t('Role', 'الدور')}
                    </Label>
                    <select
                      id="role"
                      value={newUserForm.role}
                      onChange={handleNewUserInputChange}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="User">{t('User', 'مستخدم')}</option>
                      <option value="Admin">{t('Admin', 'مسؤول')}</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{t('Create User', 'إنشاء مستخدم')}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {t('Refresh', 'تحديث')}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('Search users...', 'البحث عن مستخدمين...')}
            className="pl-8 w-full md:w-80"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center gap-2 self-end">
          <Button variant="outline" size="sm" onClick={() => alert(t('Filter functionality placeholder', 'وظيفة الفلتر عنصر نائب'))}>
            <Filter className="h-4 w-4 mr-2" />
            {t('Filter', 'فلتر')}
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            <RefreshCw className="h-6 w-6 mx-auto mb-2 animate-spin" />
            {t('Loading users...', 'جاري تحميل المستخدمين...')}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Name', 'الاسم')}</TableHead>
                <TableHead>{t('Email', 'البريد الإلكتروني')}</TableHead>
                <TableHead>{t('Status', 'الحالة')}</TableHead>
                <TableHead>{t('Role', 'الدور')}</TableHead>
                <TableHead>{t('Plan', 'الخطة')}</TableHead>
                <TableHead>{t('Last Active', 'آخر نشاط')}</TableHead>
                <TableHead className="w-[70px] text-right">{t('Actions', 'الإجراءات')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {t(user.status, user.status === 'Active' ? 'نشط' : 'غير نشط')}
                      </span>
                    </TableCell>
                    <TableCell>{t(user.role, user.role === 'Admin' ? 'مسؤول' : 'مستخدم')}</TableCell>
                    <TableCell>{t(user.plan, user.plan === 'Premium' ? 'مميز' : 'مجاني')}</TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">{t('Actions', 'الإجراءات')}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{t('Actions', 'الإجراءات')}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleUserAction('Edit', user)}>
                            <Edit className="h-4 w-4 mr-2" /> {t('Edit User', 'تعديل المستخدم')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction('View Profile', user)}>
                            <Eye className="h-4 w-4 mr-2" /> {t('View Profile', 'عرض الملف الشخصي')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction('Disable Account', user)}>
                            <UserX className="h-4 w-4 mr-2" /> {t('Disable Account', 'تعطيل الحساب')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    {t('No users found', 'لم يتم العثور على مستخدمين')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t(`Showing ${startIndex + 1} to ${Math.min(endIndex, totalItems)} of ${totalItems} users`, 
               `عرض ${startIndex + 1} إلى ${Math.min(endIndex, totalItems)} من ${totalItems} مستخدم`)}
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              {t('Previous', 'السابق')}
            </Button>
            <span className="text-sm">
              {t(`Page ${currentPage} of ${totalPages}`, `صفحة ${currentPage} من ${totalPages}`)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {t('Next', 'التالي')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
