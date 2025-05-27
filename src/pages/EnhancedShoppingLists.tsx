import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, Search, Filter, SortAsc, CheckCircle, Circle, 
  AlertCircle, Star, Trash2, Edit, ShoppingCart 
} from 'lucide-react';
import { MobileHeader } from '@/components/MobileHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

type Priority = 'low' | 'medium' | 'high';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  priority: Priority;
  completed: boolean;
  notes?: string;
  estimatedPrice?: number;
  createdAt: Date;
}

export default function EnhancedShoppingLists() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    unit: 'pcs',
    category: 'other',
    priority: 'medium' as Priority,
    notes: '',
    estimatedPrice: 0
  });

  const isMobile = useIsMobile();
  const { t } = useLanguage();

  // Sample data - in real app this would come from database
  useEffect(() => {
    const sampleItems: ShoppingItem[] = [
      {
        id: '1',
        name: 'Tomatoes',
        quantity: 2,
        unit: 'kg',
        category: 'vegetables',
        priority: 'high',
        completed: false,
        notes: 'For pasta sauce',
        estimatedPrice: 5.99,
        createdAt: new Date()
      },
      {
        id: '2', 
        name: 'Milk',
        quantity: 1,
        unit: 'liter',
        category: 'dairy',
        priority: 'medium',
        completed: true,
        estimatedPrice: 3.50,
        createdAt: new Date()
      }
    ];
    setItems(sampleItems);
  }, []);

  const categories = ['all', 'vegetables', 'fruits', 'dairy', 'meat', 'grains', 'other'];
  const priorities = ['all', 'low', 'medium', 'high'];
  const units = ['pcs', 'kg', 'g', 'liter', 'ml', 'cups', 'tbsp', 'tsp'];

  const filteredAndSortedItems = items
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
      return matchesSearch && matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'priority': 
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'category': return a.category.localeCompare(b.category);
        default: return 0;
      }
    });

  const completedItems = items.filter(item => item.completed);
  const completionProgress = items.length > 0 ? (completedItems.length / items.length) * 100 : 0;
  const totalEstimatedCost = items.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);

  const handleAddItem = () => {
    const item: ShoppingItem = {
      id: Date.now().toString(),
      ...newItem,
      completed: false,
      createdAt: new Date()
    };
    setItems(prev => [...prev, item]);
    setNewItem({
      name: '',
      quantity: 1,
      unit: 'pcs',
      category: 'other',
      priority: 'medium',
      notes: '',
      estimatedPrice: 0
    });
    setIsDialogOpen(false);
    toast({
      title: "Item Added!",
      description: `${item.name} has been added to your shopping list.`
    });
  };

  const handleEditItem = (item: ShoppingItem) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: item.category,
      priority: item.priority,
      notes: item.notes || '',
      estimatedPrice: item.estimatedPrice || 0
    });
    setIsDialogOpen(true);
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      setItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...newItem }
          : item
      ));
      setEditingItem(null);
      setNewItem({
        name: '',
        quantity: 1,
        unit: 'pcs',
        category: 'other',
        priority: 'medium',
        notes: '',
        estimatedPrice: 0
      });
      setIsDialogOpen(false);
      toast({
        title: "Item Updated!",
        description: "Your shopping item has been updated."
      });
    }
  };

  const toggleItemCompletion = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "The item has been removed from your shopping list."
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle size={14} />;
      case 'medium': return <Circle size={14} />;
      case 'low': return <CheckCircle size={14} />;
      default: return <Circle size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {isMobile && <MobileHeader title="Shopping Lists" />}
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header with Stats */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Smart Shopping Lists
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <ShoppingCart className="w-8 h-8 text-wasfah-orange mx-auto mb-2" />
                  <h3 className="font-semibold text-lg">{items.length}</h3>
                  <p className="text-sm text-gray-600">Total Items</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-lg">{completedItems.length}</h3>
                  <p className="text-sm text-gray-600">Completed</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 text-wasfah-gold mx-auto mb-2" />
                  <h3 className="font-semibold text-lg">${totalEstimatedCost.toFixed(2)}</h3>
                  <p className="text-sm text-gray-600">Estimated Total</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Shopping Progress</span>
                  <span className="text-sm text-gray-600">{Math.round(completionProgress)}%</span>
                </div>
                <Progress value={completionProgress} className="h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-4 mb-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Shopping Item' : 'Add New Shopping Item'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Item Name</Label>
                      <Input
                        id="name"
                        value={newItem.name}
                        onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter item name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={newItem.quantity}
                          onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unit</Label>
                        <Select value={newItem.unit} onValueChange={(value) => setNewItem(prev => ({ ...prev, unit: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {units.map(unit => (
                              <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={newItem.category} onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.filter(c => c !== 'all').map(category => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={newItem.priority} onValueChange={(value: Priority) => setNewItem(prev => ({ ...prev, priority: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="estimatedPrice">Estimated Price ($)</Label>
                      <Input
                        id="estimatedPrice"
                        type="number"
                        step="0.01"
                        value={newItem.estimatedPrice}
                        onChange={(e) => setNewItem(prev => ({ ...prev, estimatedPrice: parseFloat(e.target.value) || 0 }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={newItem.notes}
                        onChange={(e) => setNewItem(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Any additional notes..."
                      />
                    </div>
                    
                    <Button 
                      onClick={editingItem ? handleUpdateItem : handleAddItem}
                      className="w-full"
                      disabled={!newItem.name.trim()}
                    >
                      {editingItem ? 'Update Item' : 'Add Item'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters and Sort */}
            <div className="flex gap-2 flex-wrap">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="priority">Sort by Priority</SelectItem>
                  <SelectItem value="category">Sort by Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Shopping Items */}
          <div className="space-y-3">
            {filteredAndSortedItems.map((item) => (
              <Card 
                key={item.id} 
                className={`transition-all duration-200 ${
                  item.completed ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleItemCompletion(item.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${item.completed ? 'line-through text-gray-500' : ''}`}>
                          {item.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {item.quantity} {item.unit}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>
                          <span className="flex items-center gap-1">
                            {getPriorityIcon(item.priority)}
                            {item.priority}
                          </span>
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      
                      {item.notes && (
                        <p className="text-sm text-gray-600 mb-1">{item.notes}</p>
                      )}
                      
                      {item.estimatedPrice && item.estimatedPrice > 0 && (
                        <p className="text-sm font-medium text-wasfah-orange">
                          ${item.estimatedPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditItem(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredAndSortedItems.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No items found</h3>
                  <p className="text-gray-500">
                    {items.length === 0 
                      ? "Start by adding some items to your shopping list"
                      : "Try adjusting your search or filters"
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
