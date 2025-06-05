
// src/pages/AdminIngredientImagesManager.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Upload, MoreHorizontal, RefreshCw, Plus, Edit, Trash2, Eye } from 'lucide-react';
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

interface IngredientImage {
  id: string;
  ingredientName: string;
  imageUrl: string;
  altText: string;
  createdAt: string;
  updatedAt: string;
}

const initialMockImages: IngredientImage[] = [
  {
    id: '1',
    ingredientName: 'Tomato',
    imageUrl: '/api/placeholder/150/150',
    altText: 'Fresh red tomato',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    ingredientName: 'Onion',
    imageUrl: '/api/placeholder/150/150',
    altText: 'Yellow onion',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
  },
];

const AdminIngredientImagesManager = () => {
  const { t } = useRTL();
  const { toast } = useToast();

  const [allImages, setAllImages] = useState<IngredientImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<IngredientImage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({ ingredientName: '', altText: '', imageFile: null as File | null });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setAllImages(initialMockImages);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let images = [...allImages];

    if (searchQuery) {
      images = images.filter(image =>
        image.ingredientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.altText.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredImages(images);
    setCurrentPage(1);
  }, [allImages, searchQuery]);

  const totalItems = filteredImages.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedImages = useMemo(() => {
    return filteredImages.slice(startIndex, endIndex);
  }, [filteredImages, startIndex, endIndex]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setSearchQuery('');
    setCurrentPage(1);

    const timer = setTimeout(() => {
      setAllImages(initialMockImages);
      setIsLoading(false);
      toast({
        title: t("Refreshed", "تم التحديث"),
        description: t("Image list updated.", "تم تحديث قائمة الصور."),
      });
    }, 800);

    return () => clearTimeout(timer);
  };

  const handleUploadFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = event.target;
    if (id === 'imageFile' && files) {
      setUploadForm(prev => ({ ...prev, imageFile: files[0] }));
    } else {
      setUploadForm(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleUploadImage = (event: React.FormEvent) => {
    event.preventDefault();

    if (!uploadForm.ingredientName || !uploadForm.imageFile) {
      toast({
        title: t("Error", "خطأ"),
        description: t("Ingredient name and image file are required.", "اسم المكون وملف الصورة مطلوبان."),
        variant: "destructive",
      });
      return;
    }

    const newImage: IngredientImage = {
      id: Date.now().toString(),
      ingredientName: uploadForm.ingredientName,
      imageUrl: URL.createObjectURL(uploadForm.imageFile),
      altText: uploadForm.altText || uploadForm.ingredientName,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setAllImages(prevImages => [newImage, ...prevImages]);
    setUploadForm({ ingredientName: '', altText: '', imageFile: null });
    setIsUploadDialogOpen(false);

    toast({
      title: t("Image Uploaded", "تم تحميل الصورة"),
      description: t(`Image for ${newImage.ingredientName} has been uploaded.`, `تم تحميل صورة ${newImage.ingredientName}.`),
    });
  };

  const handleImageAction = (action: string, image: IngredientImage) => {
    console.log(`${action} action triggered for image:`, image);
    
    switch (action) {
      case 'View':
        toast({ 
          title: t("View Image", "عرض الصورة"), 
          description: t(`Viewing image for ${image.ingredientName}`, `عرض صورة ${image.ingredientName}`), 
          duration: 2000 
        });
        break;
      case 'Edit':
        toast({ 
          title: t("Edit Image", "تعديل الصورة"), 
          description: t(`Editing image for ${image.ingredientName} (Placeholder)`, `تعديل صورة ${image.ingredientName} (عنصر نائب)`), 
          duration: 2000 
        });
        break;
      case 'Delete':
        if (window.confirm(t(`Are you sure you want to delete the image for "${image.ingredientName}"?`, `هل أنت متأكد أنك تريد حذف صورة "${image.ingredientName}"؟`))) {
          setAllImages(prevImages => prevImages.filter(img => img.id !== image.id));
          toast({ 
            title: t("Image Deleted", "تم حذف الصورة"), 
            description: t(`Image for ${image.ingredientName} has been deleted.`, `تم حذف صورة ${image.ingredientName}.`), 
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
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('Ingredient Images', 'صور المكونات')}</h1>
          <p className="text-muted-foreground">{t('Manage images for recipe ingredients.', 'إدارة صور مكونات الوصفات.')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                {t('Upload Image', 'تحميل صورة')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t('Upload Ingredient Image', 'تحميل صورة مكون')}</DialogTitle>
                <DialogDescription>
                  {t('Upload a new image for an ingredient.', 'تحميل صورة جديدة لمكون.')}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUploadImage}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ingredientName" className="text-right">
                      {t('Ingredient', 'المكون')}
                    </Label>
                    <Input
                      id="ingredientName"
                      value={uploadForm.ingredientName}
                      onChange={handleUploadFormChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="altText" className="text-right">
                      {t('Alt Text', 'النص البديل')}
                    </Label>
                    <Input
                      id="altText"
                      value={uploadForm.altText}
                      onChange={handleUploadFormChange}
                      className="col-span-3"
                      placeholder={t('Optional description', 'وصف اختياري')}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imageFile" className="text-right">
                      {t('Image File', 'ملف الصورة')}
                    </Label>
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleUploadFormChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{t('Upload Image', 'تحميل الصورة')}</Button>
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
            placeholder={t('Search ingredient images...', 'البحث عن صور المكونات...')}
            className="pl-8 w-full md:w-80"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="border rounded-md overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            <RefreshCw className="h-6 w-6 mx-auto mb-2 animate-spin" />
            {t('Loading images...', 'جاري تحميل الصور...')}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Image', 'الصورة')}</TableHead>
                <TableHead>{t('Ingredient', 'المكون')}</TableHead>
                <TableHead>{t('Alt Text', 'النص البديل')}</TableHead>
                <TableHead>{t('Created', 'تاريخ الإنشاء')}</TableHead>
                <TableHead>{t('Updated', 'تاريخ التحديث')}</TableHead>
                <TableHead className="w-[70px] text-right">{t('Actions', 'الإجراءات')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedImages.length > 0 ? (
                paginatedImages.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <img 
                        src={image.imageUrl} 
                        alt={image.altText} 
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{image.ingredientName}</TableCell>
                    <TableCell>{image.altText}</TableCell>
                    <TableCell>{image.createdAt}</TableCell>
                    <TableCell>{image.updatedAt}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleImageAction('View', image)}>
                            <Eye className="h-4 w-4 mr-2" /> {t('View Image', 'عرض الصورة')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleImageAction('Edit', image)}>
                            <Edit className="h-4 w-4 mr-2" /> {t('Edit Image', 'تعديل الصورة')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleImageAction('Delete', image)}>
                            <Trash2 className="h-4 w-4 mr-2" /> {t('Delete Image', 'حذف الصورة')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    {t('No images found', 'لم يتم العثور على صور')}
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

export default AdminIngredientImagesManager;
