
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DollarSign,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  ChevronUp,
  ChevronDown,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
}

interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-05-15',
    description: 'Premium Subscription Revenue',
    category: 'Subscription',
    type: 'income',
    amount: 1250.00,
  },
  {
    id: '2',
    date: '2025-05-14',
    description: 'Server Hosting',
    category: 'Operations',
    type: 'expense',
    amount: 450.00,
  },
  {
    id: '3',
    date: '2025-05-12',
    description: 'One-time Payment Revenue',
    category: 'Sales',
    type: 'income',
    amount: 599.00,
  },
  {
    id: '4',
    date: '2025-05-10',
    description: 'Marketing Campaign',
    category: 'Marketing',
    type: 'expense',
    amount: 850.00,
  },
  {
    id: '5',
    date: '2025-05-08',
    description: 'Staff Salaries',
    category: 'HR',
    type: 'expense',
    amount: 3200.00,
  },
];

const financialSummary: FinancialSummary = {
  totalRevenue: 8725.00,
  totalExpenses: 5430.00,
  netProfit: 3295.00,
  profitMargin: 37.8,
};

const monthlyData = [
  { month: 'Jan', revenue: 5200, expenses: 4100, profit: 1100 },
  { month: 'Feb', revenue: 5800, expenses: 4300, profit: 1500 },
  { month: 'Mar', revenue: 6400, expenses: 4500, profit: 1900 },
  { month: 'Apr', revenue: 7200, expenses: 4800, profit: 2400 },
  { month: 'May', revenue: 8700, expenses: 5400, profit: 3300 },
];

const AdminAccountingManager: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const { toast } = useToast();
  
  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);
  
  const handleAddTransaction = () => {
    toast({
      title: 'Feature Coming Soon',
      description: 'Transaction creation will be available in the next update.',
    });
  };
  
  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast({
      title: 'Transaction Deleted',
      description: 'The transaction has been successfully removed.',
    });
  };
  
  const categoryColors: Record<string, string> = {
    Subscription: 'bg-green-200 text-green-800',
    Sales: 'bg-blue-200 text-blue-800',
    Operations: 'bg-orange-200 text-orange-800',
    Marketing: 'bg-purple-200 text-purple-800',
    HR: 'bg-red-200 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <DollarSign className="mr-2 h-6 w-6" /> Financial Management
          </h1>
          <p className="text-muted-foreground">Track revenue, expenses, and financial performance</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleAddTransaction}>
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialSummary.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialSummary.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              <span className="text-red-500 font-medium">+5.4%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialSummary.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialSummary.profitMargin}%</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+2.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="flex items-center space-x-2">
                <div>
                  <Button 
                    variant={filter === 'all' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant={filter === 'income' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setFilter('income')}
                    className="ml-1"
                  >
                    Income
                  </Button>
                  <Button 
                    variant={filter === 'expense' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setFilter('expense')}
                    className="ml-1"
                  >
                    Expenses
                  </Button>
                </div>
                <Input
                  placeholder="Search transactions..."
                  className="w-60"
                />
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" /> Date
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[transaction.category] || 'bg-gray-200 text-gray-800'}`}>
                            {transaction.category}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteTransaction(transaction.id)}
                                className="text-red-600"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Expenses</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyData.map((month, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{month.month}</TableCell>
                        <TableCell>${month.revenue.toLocaleString()}</TableCell>
                        <TableCell>${month.expenses.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {month.profit > month.expenses * 0.2 ? (
                              <ChevronUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={month.profit > month.expenses * 0.2 ? 'text-green-500' : 'text-red-500'}>
                              ${month.profit.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {((month.profit / month.revenue) * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-6 flex justify-center">
                <Button>
                  <Download className="mr-2 h-4 w-4" /> Download Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forecasts">
          <Card>
            <CardHeader>
              <CardTitle>Financial Forecasting</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-64 text-muted-foreground">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Forecasting Module Coming Soon</p>
                <p className="mt-2">Advanced financial projections will be available in the next update.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAccountingManager;
