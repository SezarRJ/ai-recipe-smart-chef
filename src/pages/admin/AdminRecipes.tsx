
// src/pages/AdminRecipes.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, MoreHorizontal, RefreshCw, Plus, Edit, Eye, Trash2 } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

interface Recipe {
  id: string;
  title: string;
  description: string;
  author: string;
  status: 'Published' | 'Draft' | 'Pending';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cookingTime: number;
  servings: number;
  createdAt: string;
  isVerified: boolean;
}

const initialMockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Chocolate Chip Cookies',
    description: 'Delicious homemade chocolate chip cookies',
    author: 'Sarah Johnson',
    status: 'Published',
    difficulty: 'Easy',
    cookingTime: 25,
    servings: 24,
    createdAt: '2024-01-15',
    isVerified: true,
  },
  {
    id: '2',
    title: 'Spaghetti Carbonara',
    description: 'Traditional Italian pasta dish',
    author: 'Michael Chen',
    status: 'Published',
    difficulty: 'Medium',
    cookingTime: 20,
    servings: 4,
    createdAt: '2024-01-14',
    isVerified: true,
  },
  {
    id: '3',
    title: 'Beef Wellington',
    description: 'Elegant beef dish wrapped in pastry',
    author: 'Emily Rodriguez',
    status: 'Draft',
    difficulty: 'Hard',
    cookingTime: 120,
    servings: 6,
    createdAt: '2024-01-13',
    isVerified: false,
  },
];

const AdminRecipes = () => {
  const { t } = useRTL();
  const { toast } = useToast();

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({ status: 'all', difficulty: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setAllRecipes(initialMockRecipes);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let recipes = [...allRecipes];

    if (searchQuery) {
      recipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCriteria.status !== 'all') {
      recipes = recipes.filter(recipe => recipe.status === filterCriteria.status);
    }
    if (filterCriteria.difficulty !== 'all') {
      recipes = recipes.filter(recipe => recipe.difficulty === filterCriteria.difficulty);
    }

    setFilteredRecipes(recipes);
    setCurrentPage(1);
  }, [allRecipes, searchQuery, filterCriteria]);

  const totalItems = filteredRecipes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecipes = useMemo(() => {
    return filteredRecipes.slice(startIndex, endIndex);
  }, [filteredRecipes, startIndex, endIndex]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setSearchQuery('');
    setFilterCriteria({ status: 'all', difficulty: 'all' });
    setCurrentPage(1);

    const timer = setTimeout(() => {
      setAllRecipes(initialMockRecipes);
      setIsLoading(false);
      toast({
        title: t("Refreshed", "تم التحديث"),
        description: t("Recipe list updated.", "تم تحديث قائمة الوصفات."),
      });
    }, 800);

    return () => clearTimeout(timer);
  };

  const handleRecipeAction = (action: string, recipe: Recipe) => {
    console.log(`${action} action triggered for recipe:`, recipe);
    
    switch (action) {
      case 'Edit':
        toast({ 
          title: t("Edit Recipe", "تعديل الوصفة"), 
          description: t(`Editing ${recipe.title} (Placeholder)`, `تعديل ${recipe.title} (عنصر نائب)`), 
          duration: 2000 
        });
        break;
      case 'View':
        toast({ 
          title: t("View Recipe", "عرض الوصفة"), 
          description: t(`Viewing ${recipe.title} (Placeholder)`, `عرض ${recipe.title} (عنصر نائب)`), 
          duration: 2000 
        });
        break;
      case 'Delete':
        if (window.confirm(t(`Are you sure you want to delete "${recipe.title}"?`, `هل أنت متأكد أنك تريد حذف "${recipe.title}"؟`))) {
          setAllRecipes(prevRecipes => prevRecipes.filter(r => r.id !== recipe.id));
          toast({ 
            title: t("Recipe Deleted", "تم حذف الوصفة"), 
            description: t(`${recipe.title} has been deleted.`, `تم حذف ${recipe.title}.`), 
            variant: "destructive" 
          });
        }
        break;
      default:
        break;
    }
  };

  const getStatusBadgeStyle = (status: Recipe['status']) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Pending':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDifficultyBadgeStyle = (difficulty: Recipe['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('Recipe Management', 'إدارة الوصفات')}</h1>
          <p className="text-muted-foreground">{t('View and manage all recipes in the system.', 'عرض وإدارة جميع الوصفات في النظام.')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('Add Recipe', 'إضافة وصفة')}
          </Button>

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
            placeholder={t('Search recipes...', 'البحث عن وصفات...')}
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
            {t('Loading recipes...', 'جاري تحميل الوصفات...')}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Title', 'العنوان')}</TableHead>
                <TableHead>{t('Author', 'المؤلف')}</TableHead>
                <TableHead>{t('Status', 'الحالة')}</TableHead>
                <TableHead>{t('Difficulty', 'الصعوبة')}</TableHead>
                <TableHead>{t('Cook Time', 'وقت الطبخ')}</TableHead>
                <TableHead>{t('Servings', 'الحصص')}</TableHead>
                <TableHead>{t('Created', 'تاريخ الإنشاء')}</TableHead>
                <TableHead className="w-[70px] text-right">{t('Actions', 'الإجراءات')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecipes.length > 0 ? (
                paginatedRecipes.map((recipe) => (
                  <TableRow key={recipe.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {recipe.title}
                        {recipe.isVerified && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {t('Verified', 'محقق')}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{recipe.author}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeStyle(recipe.status)}`}>
                        {t(recipe.status, recipe.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDifficultyBadgeStyle(recipe.difficulty)}`}>
                        {t(recipe.difficulty, recipe.difficulty)}
                      </span>
                    </TableCell>
                    <TableCell>{recipe.cookingTime} {t('min', 'دقيقة')}</TableCell>
                    <TableCell>{recipe.servings}</TableCell>
                    <TableCell>{recipe.createdAt}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleRecipeAction('View', recipe)}>
                            <Eye className="h-4 w-4 mr-2" /> {t('View Recipe', 'عرض الوصفة')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRecipeAction('Edit', recipe)}>
                            <Edit className="h-4 w-4 mr-2" /> {t('Edit Recipe', 'تعديل الوصفة')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRecipeAction('Delete', recipe)}>
                            <Trash2 className="h-4 w-4 mr-2" /> {t('Delete Recipe', 'حذف الوصفة')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    {t('No recipes found', 'لم يتم العثور على وصفات')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminRecipes;
