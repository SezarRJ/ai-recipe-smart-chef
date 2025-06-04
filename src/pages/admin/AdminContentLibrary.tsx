// src/pages/AdminContentLibrary.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, Eye, Edit, Trash2, RefreshCw } from 'lucide-react'; // Added RefreshCw
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'; // Import Dialog components
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast'; // Assuming you have this hook
import { useRTL } from '@/contexts/RTLContext'; // Assuming you have this context

// Define the ContentItem type based on your mock data
interface ContentItem {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'PDF' | string; // Allow other types
  status: 'Published' | 'Draft' | 'Review' | string; // Allow other statuses
  author: string;
  date: string; // ISO date string or similar
  views: number;
}

// Mock content data (replace with API calls in a real app)
const initialContentItems: ContentItem[] = [
  {
    id: 'c1',
    title: 'Getting Started with Wasfah',
    type: 'Article',
    status: 'Published',
    author: 'Admin',
    date: '2023-09-10',
    views: 1245
  },
  {
    id: 'c2',
    title: 'How to Cook Perfect Rice',
    type: 'Video',
    status: 'Published',
    author: 'Chef Ali',
    date: '2023-09-15',
    views: 3782
  },
  {
    id: 'c3',
    title: 'Healthy Breakfast Ideas',
    type: 'Article',
    status: 'Draft',
    author: 'Nutritionist Sara',
    date: '2023-09-18',
    views: 0
  },
  {
    id: 'c4',
    title: 'Seasonal Cooking Tips',
    type: 'Article',
    status: 'Published',
    author: 'Admin',
    date: '2023-09-20',
    views: 856
  },
  {
    id: 'c5',
    title: 'Kitchen Safety Guide',
    type: 'PDF',
    status: 'Review',
    author: 'Safety Team',
    date: '2023-09-22',
    views: 421
  },
   { id: 'c6', title: 'Advanced Baking Techniques', type: 'Video', status: 'Published', author: 'Chef System', date: '2023-10-01', views: 1500 },
   { id: 'c7', title: 'Understanding Spices', type: 'Article', status: 'Published', author: 'Admin', date: '2023-10-05', views: 980 },
   { id: 'c8', title: 'Meal Prep for Beginners', type: 'Article', status: 'Draft', author: 'Nutritionist Sara', date: '2023-10-10', views: 50 },
   { id: 'c9', title: 'Quick & Easy Weeknight Meals', type: 'Video', status: 'Review', author: 'Chef Ali', date: '2023-10-12', views: 120 },
   { id: 'c10', title: 'Guide to Fermentation', type: 'PDF', status: 'Published', author: 'Admin', date: '2023-10-15', views: 650 },
];


export default function AdminContentLibrary() {
  const { t } = useRTL(); // Get translation function
  const { toast } = useToast(); // Get toast function

  // State for the original list of content (simulating fetched data)
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  // State for the currently displayed content (after search/filter)
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  // State for search input
  const [searchQuery, setSearchQuery] = useState('');
  // State for filter criteria
  const [filterCriteria, setFilterCriteria] = useState({ status: 'all', type: 'all' });
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(true);
  // State for Add New Content dialog
  const [isAddContentDialogOpen, setIsAddContentDialogOpen] = useState(false);
  // State for the new content form data
  const [newContentForm, setNewContentForm] = useState({
      title: '',
      type: 'Article', // Default type
      status: 'Draft', // Default status
      author: '', // Could default to current admin user
      // Add more fields as needed (e.g., content body, video URL, file upload)
  });

  // --- Effects ---

  // Effect to simulate fetching data on component mount
  useEffect(() => {
    setIsLoading(true);
    // Simulate a network request delay
    const timer = setTimeout(() => {
      setAllContent(initialContentItems);
      setIsLoading(false);
    }, 800); // Simulate 800ms loading time

    return () => clearTimeout(timer); // Cleanup timer
  }, []); // Empty dependency array means this runs once on mount

  // Effect to apply search and filter whenever allContent, searchQuery, or filterCriteria changes
  useEffect(() => {
    let content = [...allContent]; // Start with the full list

    // Apply Search
    if (searchQuery) {
      content = content.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply Filters
    if (filterCriteria.status !== 'all') {
      content = content.filter(item => item.status === filterCriteria.status);
    }
     if (filterCriteria.type !== 'all') {
      content = content.filter(item => item.type === filterCriteria.type);
    }
    // Add more filter logic here

    setFilteredContent(content);
    // Note: Pagination is not implemented in the original code, but if it were,
    // you would reset the currentPage here: setCurrentPage(1);
  }, [allContent, searchQuery, filterCriteria]); // Dependencies

  // --- Handlers ---

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle filter change (for Select components)
  const handleFilterChange = (filterName: keyof typeof filterCriteria, value: string) => {
      setFilterCriteria(prev => ({ ...prev, [filterName]: value }));
      // Optional: Show a toast notification
      // toast({
      //     title: t("Filter Applied", "تم تطبيق الفلتر"),
      //     description: t(`Filter by ${filterName} set to ${value}`, `تم تعيين الفلتر حسب ${filterName} إلى ${value}`),
      //     duration: 2000,
      // });
  };

  // Handle Refresh button click
  const handleRefresh = () => {
      setIsLoading(true);
      setSearchQuery(''); // Clear search on refresh
      setFilterCriteria({ status: 'all', type: 'all' }); // Reset filters on refresh
      // Note: If pagination were implemented, reset currentPage here

      // Simulate fetching fresh data
      const timer = setTimeout(() => {
        // In a real app, you would fetch data from your API here
        setAllContent(initialContentItems); // Reset to initial mock data for demo
        setIsLoading(false);
        toast({
          title: t("Refreshed", "تم التحديث"),
          description: t("Content list updated.", "تم تحديث قائمة المحتوى."),
        });
      }, 800);

      return () => clearTimeout(timer);
  };


  // Handle Add New Content form input changes
  const handleNewContentInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setNewContentForm(prev => ({ ...prev, [id]: value }));
  };

   // Handle Add New Content form select changes (for type/status)
  const handleNewContentSelectChange = (id: 'type' | 'status', value: string) => {
     setNewContentForm(prev => ({ ...prev, [id]: value }));
  };


  // Handle Add New Content form submission
  const handleAddNewContent = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    // Basic validation
    if (!newContentForm.title || !newContentForm.type || !newContentForm.status) {
      toast({
        title: t("Validation Error", "خطأ في التحقق"),
        description: t("Title, Type, and Status are required.", "العنوان والنوع والحالة مطلوبة."),
        variant: "destructive",
      });
      return;
    }

    // Create a new content object (generate a unique ID)
    const newContent: ContentItem = {
      id: `c${Date.now()}`, // Simple unique ID based on timestamp
      ...newContentForm,
      author: newContentForm.author || t('Admin', 'مسؤول'), // Default author if not provided
      date: new Date().toISOString().split('T')[0], // Current date
      views: 0, // New content starts with 0 views
    };

    // Add the new content to the beginning of the allContent list
    setAllContent(prevContent => [newContent, ...prevContent]);

    // Reset the form and close the dialog
    setNewContentForm({
        title: '',
        type: 'Article',
        status: 'Draft',
        author: '',
    });
    setIsAddContentDialogOpen(false);

    // Show success toast
    toast({
      title: t("Content Added", "تمت إضافة المحتوى"),
      description: t(`"${newContent.title}" has been added to the library.`, `تمت إضافة "${newContent.title}" إلى المكتبة.`),
    });
  };

  // Handle actions from the table row buttons
  const handleContentAction = (action: string, item: ContentItem) => {
    console.log(`${action} action triggered for content:`, item);
    // Implement actual logic here based on the action:
    switch (action) {
      case 'View':
        // Navigate to view content page or open view dialog
        toast({ title: t("View Content", "عرض المحتوى"), description: t(`Viewing "${item.title}" (Placeholder)`, `عرض "${item.title}" (عنصر نائب)`), duration: 2000 });
        // Example: navigate(`/admin/content/view/${item.id}`);
        break;
      case 'Edit':
        // Navigate to edit content page or open edit dialog
         toast({ title: t("Edit Content", "تعديل المحتوى"), description: t(`Editing "${item.title}" (Placeholder)`, `تعديل "${item.title}" (عنصر نائب)`), duration: 2000 });
         // Example: navigate(`/admin/content/edit/${item.id}`);
        break;
      case 'Delete':
        // Remove the content item from the list (simulate deletion)
        if (window.confirm(t(`Are you sure you want to delete "${item.title}"? This action cannot be undone.`, `هل أنت متأكد أنك تريد حذف "${item.title}"؟ لا يمكن التراجع عن هذا الإجراء.`))) {
             setAllContent(prevContent => prevContent.filter(content => content.id !== item.id));
             toast({
                 title: t("Content Deleted", "تم حذف المحتوى"),
                 description: t(`"${item.title}" has been deleted.`, `تم حذف "${item.title}".`),
                 variant: "destructive",
             });
        }
        break;
      default:
        break;
    }
  };

  // Helper to get status badge color
  const getStatusBadgeClasses = (status: string) => {
      switch (status) {
          case 'Published':
              return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
          case 'Draft':
              return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
          case 'Review':
              return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
          default:
              return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'; // Default color
      }
  };


  return (
    <div className="space-y-6 p-4"> {/* Added padding */}
      {/* Header and Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rtl:space-x-reverse"> {/* RTL */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{t('Content Library', 'مكتبة المحتوى')}</h1>
          <p className="text-muted-foreground">{t('Manage articles, videos, and other content available in the app.', 'إدارة المقالات ومقاطع الفيديو والمحتويات الأخرى المتاحة في التطبيق.')}</p>
        </div>
        <div className="flex items-center gap-2 rtl:space-x-reverse"> {/* RTL */}
            {/* Add New Content Dialog Trigger */}
            <Dialog open={isAddContentDialogOpen} onOpenChange={setIsAddContentDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" /> {/* RTL */}
                      {t('Add New Content', 'إضافة محتوى جديد')}
                    </Button>
                </DialogTrigger>
                 <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t('Add New Content', 'إضافة محتوى جديد')}</DialogTitle>
                    <DialogDescription>
                      {t('Enter the details for the new content item.', 'أدخل تفاصيل عنصر المحتوى الجديد.')}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddNewContent}> {/* Wrap form fields */}
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4 rtl:grid-cols-4 rtl:items-center rtl:gap-4"> {/* RTL */}
                        <Label htmlFor="title" className="text-right">
                          {t('Title', 'العنوان')}
                        </Label>
                        <Input
                          id="title"
                          value={newContentForm.title}
                          onChange={handleNewContentInputChange}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4 rtl:grid-cols-4 rtl:items-center rtl:gap-4"> {/* RTL */}
                        <Label htmlFor="type" className="text-right">
                          {t('Type', 'النوع')}
                        </Label>
                         <Select onValueChange={(value) => handleNewContentSelectChange('type', value)} value={newContentForm.type}>
                            <SelectTrigger id="type" className="col-span-3">
                                <SelectValue placeholder={t("Select Type", "اختر النوع")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Article">{t('Article', 'مقالة')}</SelectItem>
                                <SelectItem value="Video">{t('Video', 'فيديو')}</SelectItem>
                                <SelectItem value="PDF">{t('PDF', 'ملف PDF')}</SelectItem>
                                {/* Add more types as needed */}
                            </SelectContent>
                        </Select>
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4 rtl:grid-cols-4 rtl:items-center rtl:gap-4"> {/* RTL */}
                        <Label htmlFor="status" className="text-right">
                          {t('Status', 'الحالة')}
                        </Label>
                         <Select onValueChange={(value) => handleNewContentSelectChange('status', value)} value={newContentForm.status}>
                            <SelectTrigger id="status" className="col-span-3">
                                <SelectValue placeholder={t("Select Status", "اختر الحالة")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Draft">{t('Draft', 'مسودة')}</SelectItem>
                                <SelectItem value="Review">{t('Review', 'قيد المراجعة')}</SelectItem>
                                <SelectItem value="Published">{t('Published', 'منشور')}</SelectItem>
                                {/* Add more statuses as needed */}
                            </SelectContent>
                        </Select>
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4 rtl:grid-cols-4 rtl:items-center rtl:gap-4"> {/* RTL */}
                        <Label htmlFor="author" className="text-right">
                          {t('Author', 'المؤلف')}
                        </Label>
                        <Input
                          id="author"
                          value={newContentForm.author}
                          onChange={handleNewContentInputChange}
                          className="col-span-3"
                          placeholder={t("Optional", "اختياري")}
                        />
                      </div>
                       {/* Add more form fields here */}
                    </div>
                    <DialogFooter>
                      <Button type="submit">{t('Create Content', 'إنشاء محتوى')}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
            </Dialog>
             {/* Refresh Button */}
            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 ${isLoading ? 'animate-spin' : ''}`} /> {/* RTL + Spin animation */}
                {t('Refresh', 'تحديث')}
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('Content Management', 'إدارة المحتوى')}</CardTitle>
          <CardDescription>
            {t('Manage articles, videos, and other content available in the app.', 'إدارة المقالات ومقاطع الفيديو والمحتويات الأخرى المتاحة في التطبيق.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4 rtl:space-x-reverse"> {/* RTL */}
            <div className="flex w-full md:max-w-sm items-center space-x-2 rtl:space-x-reverse"> {/* RTL */}
              <Input
                 type="search"
                 placeholder={t("Search content...", "البحث عن محتوى...")}
                 className="w-full md:w-[300px]"
                 value={searchQuery}
                 onChange={handleSearchChange}
              />
               {/* The Search button next to the input is redundant if filtering happens on change */}
              {/* <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button> */}
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse self-end md:self-center"> {/* RTL */}
              <Select onValueChange={(value) => handleFilterChange('status', value)} value={filterCriteria.status}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder={t("Status", "الحالة")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('All Status', 'جميع الحالات')}</SelectItem>
                  <SelectItem value="Published">{t('Published', 'منشور')}</SelectItem>
                  <SelectItem value="Draft">{t('Draft', 'مسودة')}</SelectItem>
                  <SelectItem value="Review">{t('Under Review', 'قيد المراجعة')}</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleFilterChange('type', value)} value={filterCriteria.type}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder={t("Type", "النوع")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('All Types', 'جميع الأنواع')}</SelectItem>
                  <SelectItem value="Article">{t('Article', 'مقالة')}</SelectItem>
                  <SelectItem value="Video">{t('Video', 'فيديو')}</SelectItem>
                  <SelectItem value="PDF">{t('PDF', 'ملف PDF')}</SelectItem>
                </SelectContent>
              </Select>
               {/* The Filter button is redundant if filtering happens on select change */}
              {/* <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button> */}
            </div>
          </div>

          {/* Content Table */}
          <div className="border rounded-md overflow-x-auto"> {/* Added overflow for small screens */}
             {isLoading ? (
                 <div className="p-8 text-center text-muted-foreground">
                     <RefreshCw className="h-6 w-6 mx-auto mb-2 animate-spin" />
                     {t('Loading content...', 'جاري تحميل المحتوى...')}
                 </div>
             ) : filteredContent.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                      {t('No content found matching your criteria.', 'لم يتم العثور على محتوى يطابق معايير البحث.')}
                  </div>
             ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('Title', 'العنوان')}</TableHead>
                      <TableHead>{t('Type', 'النوع')}</TableHead>
                      <TableHead>{t('Status', 'الحالة')}</TableHead>
                      <TableHead>{t('Author', 'المؤلف')}</TableHead>
                      <TableHead>{t('Date', 'التاريخ')}</TableHead>
                      <TableHead>{t('Views', 'المشاهدات')}</TableHead>
                      <TableHead className="text-right">{t('Actions', 'الإجراءات')}</TableHead> {/* Align right for RTL */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent.map((item) => ( // Use filteredContent here
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{t(item.type, item.type)}</TableCell> {/* Translate type */}
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClasses(item.status)}`}>
                            {t(item.status, item.status === 'Published' ? 'منشور' : item.status === 'Draft' ? 'مسودة' : 'قيد المراجعة')} {/* Translate status */}
                          </span>
                        </TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.views.toLocaleString()}</TableCell>
                        <TableCell className="text-right space-x-1 rtl:space-x-reverse"> {/* RTL */}
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleContentAction('View', item)}>
                            <Eye className="h-4 w-4" />
                             <span className="sr-only">{t('View', 'عرض')}</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleContentAction('Edit', item)}>
                            <Edit className="h-4 w-4" />
                             <span className="sr-only">{t('Edit', 'تعديل')}</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleContentAction('Delete', item)}>
                            <Trash2 className="h-4 w-4" />
                             <span className="sr-only">{t('Delete', 'حذف')}</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             )}
          </div>
           {/* Pagination would go here if implemented */}
           {/* <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                    Showing <strong>{filteredContent.length}</strong> of <strong>{allContent.length}</strong> items
                </p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm">
                        Next
                    </Button>
                </div>
            </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
