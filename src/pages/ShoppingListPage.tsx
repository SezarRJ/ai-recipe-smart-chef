
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Plus, Trash2, Share2, Search, Filter, Edit3, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useRTL } from '@/contexts/RTLContext';

// Sample shopping list data
const initialItems = [
  { id: '1', name: 'Chicken breast', quantity: 500, unit: 'g', category: 'Meat', checked: false, dateAdded: new Date(), priority: 'high' },
  { id: '2', name: 'Olive oil', quantity: 1, unit: 'bottle', category: 'Oils', checked: false, dateAdded: new Date(), priority: 'medium' },
  { id: '3', name: 'Garlic', quantity: 5, unit: 'cloves', category: 'Vegetables', checked: false, dateAdded: new Date(), priority: 'low' },
  { id: '4', name: 'Onions', quantity: 2, unit: '', category: 'Vegetables', checked: true, dateAdded: new Date(), priority: 'medium' },
  { id: '5', name: 'Rice', quantity: 1, unit: 'kg', category: 'Grains', checked: false, dateAdded: new Date(), priority: 'high' },
  { id: '6', name: 'Tomatoes', quantity: 4, unit: '', category: 'Vegetables', checked: false, dateAdded: new Date(), priority: 'medium' },
  { id: '7', name: 'Greek yogurt', quantity: 500, unit: 'g', category: 'Dairy', checked: true, dateAdded: new Date(), priority: 'low' },
  { id: '8', name: 'Lemons', quantity: 3, unit: '', category: 'Fruits', checked: false, dateAdded: new Date(), priority: 'low' },
];

export default function ShoppingListPage() {
  const { toast } = useToast();
  const { t } = useRTL();
  const [items, setItems] = useState(initialItems);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Other');
  const [newItemPriority, setNewItemPriority] = useState('medium');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const categories = [...new Set(items.map(item => item.category))].sort();
  const priorities = ['high', 'medium', 'low'];

  const handleCheck = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    if (!newItemName.trim()) {
      toast({
        title: t("Error", "خطأ"),
        description: t("Please enter an item name", "يرجى إدخال اسم العنصر"),
        variant: "destructive",
      });
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: Number(newItemQuantity) || 1,
      unit: newItemUnit.trim(),
      category: newItemCategory,
      priority: newItemPriority,
      checked: false,
      dateAdded: new Date(),
    };

    setItems([newItem, ...items]);
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('');
    setNewItemCategory('Other');
    setNewItemPriority('medium');
    setShowAddForm(false);

    toast({
      title: t("Item added", "تمت إضافة العنصر"),
      description: t(`${newItem.name} added to your shopping list.`, `تمت إضافة ${newItem.name} إلى قائمة التسوق.`),
    });
  };

  const handleRemoveChecked = () => {
    const checkedItems = items.filter(item => item.checked);
    if (checkedItems.length === 0) {
      toast({
        title: t("No items selected", "لم يتم تحديد عناصر"),
        description: t("Please check items to remove.", "يرجى تحديد العناصر للإزالة."),
      });
      return;
    }

    setItems(items.filter(item => !item.checked));
    toast({
      title: t("Items removed", "تمت إزالة العناصر"),
      description: t(`${checkedItems.length} item(s) removed from your list.`, `تمت إزالة ${checkedItems.length} عنصر من قائمتك.`),
    });
  };

  const handleClearAll = () => {
    setItems([]);
    toast({
      title: t("List cleared", "تم مسح القائمة"),
      description: t("All items have been removed from your list.", "تمت إزالة جميع العناصر من قائمتك."),
    });
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setEditingItemId(id);
      setNewItemName(itemToEdit.name);
      setNewItemQuantity(itemToEdit.quantity.toString());
      setNewItemUnit(itemToEdit.unit);
      setNewItemCategory(itemToEdit.category);
      setNewItemPriority(itemToEdit.priority);
      setShowAddForm(true);
    }
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();

    if (!newItemName.trim()) {
      toast({
        title: t("Error", "خطأ"),
        description: t("Please enter an item name", "يرجى إدخال اسم العنصر"),
        variant: "destructive",
      });
      return;
    }

    setItems(items.map(item =>
      item.id === editingItemId
        ? {
            ...item,
            name: newItemName.trim(),
            quantity: Number(newItemQuantity) || 1,
            unit: newItemUnit.trim(),
            category: newItemCategory,
            priority: newItemPriority,
          }
        : item
    ));

    setEditingItemId(null);
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('');
    setNewItemCategory('Other');
    setNewItemPriority('medium');
    setShowAddForm(false);

    toast({
      title: t("Item updated", "تم تحديث العنصر"),
      description: t("Your item has been updated.", "تم تحديث العنصر."),
    });
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'category') {
      return a.category.localeCompare(b.category);
    } else if (sortOption === 'priority') {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortOption === 'checked') {
      return a.checked === b.checked ? 0 : a.checked ? 1 : -1;
    }
    return 0;
  });

  const filteredItems = sortedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <PageContainer header={{ title: t('Shopping List', 'قائمة التسوق'), showBackButton: true }}>
      <div className="space-y-6 pb-6">
        {/* Header Card with Progress */}
        <Card className="bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal text-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">{t('My Shopping List', 'قائمة التسوق الخاصة بي')}</CardTitle>
                  <p className="text-white/80 text-sm">
                    {t(`${totalCount} items total`, `${totalCount} عنصر إجمالي`)}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-white border-white/30 hover:bg-white/20">
                <Share2 className="h-4 w-4 mr-2" />
                {t('Share', 'مشاركة')}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('Progress', 'التقدم')}</span>
                <span>{completedCount}/{totalCount}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-wasfah-bright-teal hover:bg-wasfah-teal h-12"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('Add Item', 'إضافة عنصر')}
          </Button>
          <Button
            variant="outline"
            onClick={handleRemoveChecked}
            className="h-12 border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {t('Clear Checked', 'مسح المحدد')}
          </Button>
        </div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-4">
                  <form onSubmit={editingItemId ? handleUpdateItem : handleAddItem} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <Input
                          placeholder={t("Item name", "اسم العنصر")}
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                        />
                      </div>
                      <Input
                        placeholder={t("Quantity", "الكمية")}
                        type="number"
                        value={newItemQuantity}
                        onChange={(e) => setNewItemQuantity(e.target.value)}
                      />
                      <Input
                        placeholder={t("Unit", "الوحدة")}
                        value={newItemUnit}
                        onChange={(e) => setNewItemUnit(e.target.value)}
                      />
                      <Select value={newItemCategory} onValueChange={setNewItemCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("Category", "الفئة")} />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                          <SelectItem value="Other">{t("Other", "أخرى")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={newItemPriority} onValueChange={setNewItemPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("Priority", "الأولوية")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">{t("High", "عالية")}</SelectItem>
                          <SelectItem value="medium">{t("Medium", "متوسطة")}</SelectItem>
                          <SelectItem value="low">{t("Low", "منخفضة")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingItemId(null);
                          setNewItemName('');
                          setNewItemQuantity('');
                          setNewItemUnit('');
                          setNewItemCategory('Other');
                          setNewItemPriority('medium');
                        }}
                      >
                        {t('Cancel', 'إلغاء')}
                      </Button>
                      <Button type="submit" className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                        {editingItemId ? t('Update', 'تحديث') : t('Add', 'إضافة')}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder={t('Search items...', 'البحث عن العناصر...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder={t("Sort", "ترتيب")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">{t("Name", "الاسم")}</SelectItem>
                    <SelectItem value="category">{t("Category", "الفئة")}</SelectItem>
                    <SelectItem value="priority">{t("Priority", "الأولوية")}</SelectItem>
                    <SelectItem value="checked">{t("Status", "الحالة")}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder={t("Category", "الفئة")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All", "الكل")}</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder={t("Priority", "الأولوية")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All", "الكل")}</SelectItem>
                    <SelectItem value="high">{t("High", "عالية")}</SelectItem>
                    <SelectItem value="medium">{t("Medium", "متوسطة")}</SelectItem>
                    <SelectItem value="low">{t("Low", "منخفضة")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <div className="space-y-2">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`${item.checked ? 'opacity-60' : ''}`}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => handleCheck(item.id)}
                        className="h-5 w-5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}>
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getPriorityColor(item.priority)}>
                              {t(item.priority, item.priority)}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditItem(item.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-500">
                            {item.quantity} {item.unit} • {item.category}
                          </p>
                          {item.checked && (
                            <div className="flex items-center text-green-600 text-xs">
                              <Check className="h-3 w-3 mr-1" />
                              {t('Completed', 'مكتمل')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">
                {t('No items found', 'لم يتم العثور على عناصر')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
