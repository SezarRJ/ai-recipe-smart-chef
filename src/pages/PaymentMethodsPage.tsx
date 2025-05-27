import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card'; // Removed CardHeader, CardTitle as they weren't used in the map
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Trash2, CheckCircle } from 'lucide-react'; // Removed non-existent card brand icons
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'; // For the Add Payment Method modal
import { Input } from '@/components/ui/input'; // For inputs in the Add Payment Method modal
import { Label } from '@/components/ui/label'; // For labels in the Add Payment Method modal
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // For month/year selection

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string; // e.g., 'visa', 'mastercard', 'amex', 'discover'
  expiryMonth?: number;
  expiryYear?: number;
  email?: string; // For PayPal
  isDefault: boolean;
}

// Helper to get card brand icon - using only available Lucide icons
const getCardBrandIcon = (brand?: string) => {
  // For now, use CreditCard icon for all types since specific brand icons aren't available in lucide-react
  if (brand === 'paypal') {
    return <CreditCard className="h-8 w-8 text-blue-700 dark:text-blue-400" />;
  }
  return <CreditCard className="h-8 w-8 text-gray-600 dark:text-gray-300" />;
};

export default function PaymentMethodsPage() {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'card_1',
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 'card_2',
      type: 'card',
      last4: '1234',
      brand: 'mastercard',
      expiryMonth: 10,
      expiryYear: 2026,
      isDefault: false
    },
    {
      id: 'paypal_1',
      type: 'paypal',
      email: 'user@example.com',
      isDefault: false
    }
  ]);
  const [isAddMethodDialogOpen, setIsAddMethodDialogOpen] = useState(false);
  const [newMethodType, setNewMethodType] = useState<'card' | 'paypal'>('card');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiryMonth, setNewCardExpiryMonth] = useState('');
  const [newCardExpiryYear, setNewCardExpiryYear] = useState('');
  const [newCardCVC, setNewCardCVC] = useState('');
  const [newPaypalEmail, setNewPaypalEmail] = useState('');


  const handleAddPaymentMethod = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    let newMethod: PaymentMethod | null = null;
    const newId = `new_method_${Date.now()}`;

    if (newMethodType === 'card') {
      if (!newCardNumber || !newCardExpiryMonth || !newCardExpiryYear || !newCardCVC) {
        toast({ title: "Error", description: "Please fill all card details.", variant: "destructive" });
        return;
      }
      // Basic mock validation for card number to determine brand
      const brand = newCardNumber.startsWith('4') ? 'visa' : newCardNumber.startsWith('5') ? 'mastercard' : 'card';
      newMethod = {
        id: newId,
        type: 'card',
        last4: newCardNumber.slice(-4),
        brand: brand,
        expiryMonth: parseInt(newCardExpiryMonth),
        expiryYear: parseInt(newCardExpiryYear),
        isDefault: false
      };
    } else if (newMethodType === 'paypal') {
      if (!newPaypalEmail) {
        toast({ title: "Error", description: "Please enter your PayPal email.", variant: "destructive" });
        return;
      }
      newMethod = {
        id: newId,
        type: 'paypal',
        email: newPaypalEmail,
        isDefault: false
      };
    }

    if (newMethod) {
      setPaymentMethods(prevMethods => {
        // If it's the first method, make it default
        if (prevMethods.length === 0) {
          return [{ ...newMethod!, isDefault: true }];
        }
        return [...prevMethods, newMethod!];
      });

      toast({
        title: "Payment Method Added",
        description: `Your new ${newMethodType === 'card' ? 'card' : 'PayPal'} has been added.`,
      });

      // Reset form and close dialog
      setNewCardNumber('');
      setNewCardExpiryMonth('');
      setNewCardExpiryYear('');
      setNewCardCVC('');
      setNewPaypalEmail('');
      setNewMethodType('card'); // Reset to default
      setIsAddMethodDialogOpen(false);
    }
  };

  const handleRemovePaymentMethod = (id: string) => {
    // Prevent removing the last payment method
    if (paymentMethods.length === 1) {
      toast({
        title: "Cannot Remove Last Method",
        description: "You must have at least one payment method. Please add another before removing this one.",
        variant: "destructive"
      });
      return;
    }

    setPaymentMethods(methods => {
      const remainingMethods = methods.filter(method => method.id !== id);
      // If the removed method was default, set a new default
      if (methods.find(method => method.id === id)?.isDefault) {
        if (remainingMethods.length > 0) {
          remainingMethods[0].isDefault = true;
        }
      }
      return remainingMethods;
    });

    toast({
      title: "Payment Method Removed",
      description: "Your payment method has been removed successfully.",
    });
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated.",
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear + i)); // Next 10 years

  return (
    <PageContainer header={{ title: 'Payment Methods', showBackButton: true }}>
      <div className="p-4 space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Payment Methods</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your payment methods for subscriptions and purchases.</p>
          </div>
          <Dialog open={isAddMethodDialogOpen} onOpenChange={setIsAddMethodDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 px-4 py-2 text-base">
                <Plus size={20} />
                Add New Method
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:text-gray-100">
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>
                  Choose your preferred payment method.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPaymentMethod} className="grid gap-4 py-4">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={newMethodType === 'card' ? 'default' : 'outline'}
                    onClick={() => setNewMethodType('card')}
                    className="flex-1"
                  >
                    <CreditCard className="mr-2 h-4 w-4" /> Card
                  </Button>
                  <Button
                    type="button"
                    variant={newMethodType === 'paypal' ? 'default' : 'outline'}
                    onClick={() => setNewMethodType('paypal')}
                    className="flex-1"
                  >
                    <CreditCard className="mr-2 h-4 w-4" /> PayPal
                  </Button>
                </div>

                {newMethodType === 'card' && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={newCardNumber}
                        onChange={(e) => setNewCardNumber(e.target.value)}
                        required
                        className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiryMonth">Expiry Month</Label>
                        <Select value={newCardExpiryMonth} onValueChange={setNewCardExpiryMonth} required>
                          <SelectTrigger id="expiryMonth" className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                            {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(month => (
                              <SelectItem key={month} value={month}>{month}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="expiryYear">Expiry Year</Label>
                        <Select value={newCardExpiryYear} onValueChange={setNewCardExpiryYear} required>
                          <SelectTrigger id="expiryYear" className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                            {years.map(year => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          type="text"
                          placeholder="123"
                          value={newCardCVC}
                          onChange={(e) => setNewCardCVC(e.target.value)}
                          maxLength={4}
                          required
                          className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  </>
                )}

                {newMethodType === 'paypal' && (
                  <div className="grid gap-2">
                    <Label htmlFor="paypalEmail">PayPal Email</Label>
                    <Input
                      id="paypalEmail"
                      type="email"
                      placeholder="paypal@example.com"
                      value={newPaypalEmail}
                      onChange={(e) => setNewPaypalEmail(e.target.value)}
                      required
                      className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    />
                  </div>
                )}

                <DialogFooter className="mt-6">
                  <Button type="submit" className="w-full">Add Method</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`transition-all duration-200 ease-in-out ${
                  method.isDefault
                    ? 'border-2 border-wasfah-bright-teal dark:border-wasfah-mint shadow-md'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {method.type === 'card' ? getCardBrandIcon(method.brand) : getCardBrandIcon('paypal')}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800 dark:text-gray-100 capitalize">
                          {method.type === 'card'
                            ? `${method.brand || 'Card'} ending in ${method.last4}`
                            : `PayPal (${method.email})`}
                        </span>
                        {method.isDefault && (
                          <Badge className="bg-wasfah-bright-teal dark:bg-wasfah-mint text-white">
                            Default
                          </Badge>
                        )}
                      </div>
                      {method.type === 'card' && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Expires {method.expiryMonth?.toString().padStart(2, '0')}/{method.expiryYear}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                        className="text-wasfah-bright-teal border-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white dark:text-wasfah-mint dark:border-wasfah-mint dark:hover:bg-wasfah-mint"
                      >
                        <CheckCircle size={16} className="mr-1" /> Set as Default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePaymentMethod(method.id)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">No Payment Methods</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Add a payment method to manage your subscriptions.</p>
                <Dialog open={isAddMethodDialogOpen} onOpenChange={setIsAddMethodDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="px-4 py-2 text-base">
                      Add Your First Payment Method
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:text-gray-100">
                    <DialogHeader>
                      <DialogTitle>Add Payment Method</DialogTitle>
                      <DialogDescription>
                        Choose your preferred payment method.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddPaymentMethod} className="grid gap-4 py-4">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={newMethodType === 'card' ? 'default' : 'outline'}
                          onClick={() => setNewMethodType('card')}
                          className="flex-1"
                        >
                          <CreditCard className="mr-2 h-4 w-4" /> Card
                        </Button>
                        <Button
                          type="button"
                          variant={newMethodType === 'paypal' ? 'default' : 'outline'}
                          onClick={() => setNewMethodType('paypal')}
                          className="flex-1"
                        >
                          <CreditCard className="mr-2 h-4 w-4" /> PayPal
                        </Button>
                      </div>

                      {newMethodType === 'card' && (
                        <>
                          <div className="grid gap-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              type="text"
                              placeholder="•••• •••• •••• ••••"
                              value={newCardNumber}
                              onChange={(e) => setNewCardNumber(e.target.value)}
                              required
                              className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="expiryMonth">Expiry Month</Label>
                              <Select value={newCardExpiryMonth} onValueChange={setNewCardExpiryMonth} required>
                                <SelectTrigger id="expiryMonth" className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                                  <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                                  {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(month => (
                                    <SelectItem key={month} value={month}>{month}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="expiryYear">Expiry Year</Label>
                              <Select value={newCardExpiryYear} onValueChange={setNewCardExpiryYear} required>
                                <SelectTrigger id="expiryYear" className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                                  <SelectValue placeholder="YYYY" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                                  {years.map(year => (
                                    <SelectItem key={year} value={year}>{year}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input
                                id="cvc"
                                type="text"
                                placeholder="123"
                                value={newCardCVC}
                                onChange={(e) => setNewCardCVC(e.target.value)}
                                maxLength={4}
                                required
                                className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {newMethodType === 'paypal' && (
                        <div className="grid gap-2">
                          <Label htmlFor="paypalEmail">PayPal Email</Label>
                          <Input
                            id="paypalEmail"
                            type="email"
                            placeholder="paypal@example.com"
                            value={newPaypalEmail}
                            onChange={(e) => setNewPaypalEmail(e.target.value)}
                            required
                            className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                          />
                        </div>
                      )}

                      <DialogFooter className="mt-6">
                        <Button type="submit" className="w-full">Add Method</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
