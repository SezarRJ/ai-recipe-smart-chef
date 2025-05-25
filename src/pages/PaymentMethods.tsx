
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Define payment method interface
interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  email?: string;
  bankName?: string;
  isDefault: boolean;
}

// Zod schema for form validation
const cardSchema = z.object({
  number: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
  name: z.string().min(1, 'Cardholder name is required'),
});

const paypalSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const bankSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
});

const PaymentMethods = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: "2",
      type: "paypal",
      email: "user@example.com",
      isDefault: false,
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [paymentType, setPaymentType] = useState<'card' | 'paypal' | 'bank'>('card');

  const formSchema = paymentType === 'card' ? cardSchema : paymentType === 'paypal' ? paypalSchema : bankSchema;

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: '',
      expiry: '',
      cvc: '',
      name: '',
      email: '',
      bankName: '',
    },
  });

  const addPaymentMethod = async (data: any) => {
    try {
      let newMethod: PaymentMethod;
      if (paymentType === 'card') {
        newMethod = {
          id: Date.now().toString(),
          type: "card",
          last4: data.number.slice(-4),
          brand: "visa",
          expiryMonth: parseInt(data.expiry.split('/')[0]),
          expiryYear: parseInt('20' + data.expiry.split('/')[1]),
          isDefault: paymentMethods.length === 0,
        };
      } else if (paymentType === 'paypal') {
        newMethod = {
          id: Date.now().toString(),
          type: "paypal",
          email: data.email,
          isDefault: paymentMethods.length === 0,
        };
      } else {
        newMethod = {
          id: Date.now().toString(),
          type: "bank",
          bankName: data.bankName,
          isDefault: paymentMethods.length === 0,
        };
      }

      // API call to add payment method
      await axios.post('/api/payment-methods', newMethod);
      setPaymentMethods(prev => [...prev, newMethod]);
      setShowAddForm(false);
      reset();
      toast({ title: "Payment method added", description: "Saved successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add payment method",
        variant: "destructive",
      });
    }
  };

  const removePaymentMethod = async (id: string) => {
    try {
      await axios.delete(`/api/payment-methods/${id}`);
      setPaymentMethods(prev => prev.filter(method => method.id !== id));
      toast({ title: "Payment method removed", description: "Successfully deleted" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove payment method",
        variant: "destructive",
      });
    }
  };

  const setAsDefault = async (id: string) => {
    try {
      await axios.patch(`/api/payment-methods/${id}/default`);
      setPaymentMethods(prev =>
        prev.map(method => ({
          ...method,
          isDefault: method.id === id,
        }))
      );
      toast({ title: "Default payment method updated", description: "Successfully set as default" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set default payment method",
        variant: "destructive",
      });
    }
  };

  const getCardIcon = (brand?: string) => {
    return <CreditCard size={20} className="text-wasfah-orange" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <AnimatePresence>
          {!showAddForm ? (
            <motion.div
              key="add-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <CreditCard size={48} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Add New Payment Method</h3>
                  <p className="text-gray-600 mb-4">Choose a payment method to add</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button onClick={() => { setPaymentType('card'); setShowAddForm(true); }}>
                      <Plus size={16} className="mr-2" />
                      Add Credit Card
                    </Button>
                    <Button variant="outline" onClick={() => { setPaymentType('paypal'); setShowAddForm(true); }}>
                      <Plus size={16} className="mr-2" />
                      Add PayPal
                    </Button>
                    <Button variant="outline" onClick={() => { setPaymentType('bank'); setShowAddForm(true); }}>
                      <Plus size={16} className="mr-2" />
                      Add Bank Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="add-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="text-wasfah-orange" size={20} />
                    {`Add ${paymentType.charAt(0).toUpperCase() + paymentType.slice(1)} Method`}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit(addPaymentMethod)} className="space-y-4">
                    {paymentType === 'card' && (
                      <>
                        <div>
                          <Input
                            placeholder="Card Number"
                            {...register('number')}
                          />
                          {errors.number && (
                            <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Input
                              placeholder="MM/YY"
                              {...register('expiry')}
                            />
                            {errors.expiry && (
                              <p className="text-red-500 text-sm mt-1">{errors.expiry.message}</p>
                            )}
                          </div>
                          <div>
                            <Input
                              placeholder="CVC"
                              {...register('cvc')}
                            />
                            {errors.cvc && (
                              <p className="text-red-500 text-sm mt-1">{errors.cvc.message}</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <Input
                            placeholder="Cardholder Name"
                            {...register('name')}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                          )}
                        </div>
                      </>
                    )}

                    {paymentType === 'paypal' && (
                      <div>
                        <Input
                          placeholder="PayPal Email"
                          {...register('email')}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    )}

                    {paymentType === 'bank' && (
                      <div>
                        <Input
                          placeholder="Bank Name"
                          {...register('bankName')}
                        />
                        {errors.bankName && (
                          <p className="text-red-500 text-sm mt-1">{errors.bankName.message}</p>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">Add</Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAddForm(false);
                          reset();
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getCardIcon(method.brand)}
                      <div>
                        {method.type === 'card' && (
                          <p className="font-medium">**** **** **** {method.last4}</p>
                        )}
                        {method.type === 'paypal' && (
                          <p className="font-medium">{method.email}</p>
                        )}
                        {method.type === 'bank' && (
                          <p className="font-medium">{method.bankName}</p>
                        )}
                        {method.isDefault && (
                          <span className="text-sm text-wasfah-orange">Default</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!method.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setAsDefault(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removePaymentMethod(method.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentMethods;
