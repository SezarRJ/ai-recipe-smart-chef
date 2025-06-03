import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { mockPantryItems } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { PantryItemCard } from '@/components/pantry/PantryItemCard';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PantryItem } from '@/types/index';

export default function PantryPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [pantryItems, setPantryItems] = useState(mockPantryItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PantryItem>>({
    name: '',
    quantity: 0,
    unit: '',
    category: '',
    location: 'Refrigerator',
    expiryDate: new Date(Date.now() + 7 * 86400000).toISOString()
  });

  // State for filtering and sorting
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const groupedItems = pantryItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PantryItem[]>);

  const today = new Date();
  const expiringItems = pantryItems.filter(item => {
    if (!item.expiryDate) return false;
    const expiry = new Date(item.expiryDate);
    const daysLeft = Math.round((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft >= 0 && daysLeft <= 7;
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.unit || !newItem.category) return;

    const newPantryItem: PantryItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: newItem.quantity,
      unit: newItem.unit,
      category: newItem.category,
      location: newItem.location,
      expiryDate: newItem.expiryDate
    };

    setPantryItems([newPantryItem, ...pantryItems]);
    setIsAddDialogOpen(false);
    setNewItem({
      name: '',
      quantity: 0,
      unit: '',
      category: '',
      location: 'Refrigerator',
      expiryDate: new Date(Date.now() + 7 * 86400000).toISOString()
    });
  };

  // Function to filter and sort items
  const getFilteredAndSortedItems = () => {
    let filteredItems = [...pantryItems];

    if (filterCategory !== 'All') {
      filteredItems = filteredItems.filter(item => item.category === filterCategory);
    }

    filteredItems.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'expiryDate') {
        return new Date(a.expiryDate || 0).getTime() - new Date(b.expiryDate || 0).getTime();
      }
      return 0;
    });

    return filteredItems;
  };

  const filteredAndSortedItems = getFilteredAndSortedItems();

  return (
    <PageContainer header={{ 
      title: 'My Pantry', 
      showSearch: true, 
      showBackButton: true,
      actions: (
        <Button variant="ghost" size="icon" className="text-wasfah-deep-teal" onClick={() => setIsAddDialogOpen(true)}>
          <Plus size={20} />
        </Button>
      )
    }}>
      <div className="container px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Vegetables">Vegetables</SelectItem>
                <SelectItem value="Fruits">Fruits</SelectItem>
                <SelectItem value="Meat & Poultry">Meat & Poultry</SelectItem>
                <SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem>
                <SelectItem value="Grains & Pasta">Grains & Pasta</SelectItem>
                <SelectItem value="Canned Goods">Canned Goods</SelectItem>
                <SelectItem value="Spices & Herbs">Spices & Herbs</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="expiryDate">Expiry Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="expiring">Expiring{expiringItems.length > 0 && (<span className="ml-1 bg-wasfah-coral-red text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">{expiringItems.length}</span>)}</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="shopping">Shopping</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {filteredAndSortedItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">Your pantry is empty</p>
                  <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal" onClick={() => setIsAddDialogOpen(true)}>
                    <Plus size={16} className="mr-2" /> Add Items
                  </Button>
                </div>
              ) : (
                filteredAndSortedItems.map(item => <PantryItemCard key={item.id} item={item} />)
              )}
            </div>
          </TabsContent>

          <TabsContent value="expiring">
            <div className="space-y-4">
              {expiringItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No items expiring soon</p>
                </div>
              ) : (
                expiringItems.map(item => <PantryItemCard key={item.id} item={item} />)
              )}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="space-y-6">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category}>
                  <h3 className="font-bold mb-2 text-wasfah-deep-teal">{category}</h3>
                  <div className="space-y-3">
                    {items.map(item => <PantryItemCard key={item.id} item={item} />)}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shopping">
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Your shopping list is empty</p>
              <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal" onClick={() => window.location.href = '/shopping-list'}>
                <Plus size={16} className="mr-2" /> Add Items
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Item</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Item Name</label>
              <Input id="name" placeholder="e.g., Tomatoes" value={newItem.name || ''} onChange={(e) => setNewItem({...newItem, name: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                <Input id="quantity" type="number" placeholder="e.g., 500" value={newItem.quantity || ''} onChange={(e) => setNewItem({...newItem, quantity: Number(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label htmlFor="unit" className="text-sm font-medium">Unit</label>
                <Select value={newItem.unit || ''} onValueChange={(value) => setNewItem({...newItem, unit: value})}>
                  <SelectTrigger id="unit"><SelectValue placeholder="Select unit" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="g">grams (g)</SelectItem>
                    <SelectItem value="kg">kilograms (kg)</SelectItem>
                    <SelectItem value="ml">milliliters (ml)</SelectItem>
                    <SelectItem value="L">liters (L)</SelectItem>
                    <SelectItem value="pcs">pieces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Select value={newItem.category || ''} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                <SelectTrigger id="category"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Meat & Poultry">Meat & Poultry</SelectItem>
                  <SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem>
                  <SelectItem value="Grains & Pasta">Grains & Pasta</SelectItem>
                  <SelectItem value="Canned Goods">Canned Goods</SelectItem>
                  <SelectItem value="Spices & Herbs">Spices & Herbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Storage Location</label>
              <Select value={newItem.location || 'Refrigerator'} onValueChange={(value) => setNewItem({...newItem, location: value})}>
                <SelectTrigger id="location"><SelectValue placeholder="Select location" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Refrigerator">Refrigerator</SelectItem>
                  <SelectItem value="Freezer">Freezer</SelectItem>
                  <SelectItem value="Pantry">Pantry</SelectItem>
                  <SelectItem value="Cabinet">Cabinet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="expiry" className="text-sm font-medium">Expiry Date</label>
              <Input id="expiry" type="date" value={newItem.expiryDate ? new Date(newItem.expiryDate).toISOString().split('T')[0] : ''} onChange={(e) => setNewItem({...newItem, expiryDate: new Date(e.target.value).toISOString()})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal" onClick={handleAddItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
