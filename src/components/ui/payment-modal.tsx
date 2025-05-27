
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: number;
  features: string[];
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  planName,
  amount,
  features
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL!,
        process.env.VITE_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: Math.round(amount * 100), // Convert to cents
          currency: 'usd',
          description: `${planName} Subscription`
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        onClose();
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Failed to create payment session. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Subscribe to {planName}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold">${amount.toFixed(2)}</div>
            <p className="text-gray-600">per month</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">What's included:</h4>
            <ul className="space-y-1">
              {features.slice(0, 5).map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
              {features.length > 5 && (
                <li className="text-sm text-gray-600">
                  + {features.length - 5} more features
                </li>
              )}
            </ul>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Badge className="bg-blue-500">7-day free trial</Badge>
            <span className="text-sm text-gray-600">Cancel anytime</span>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full"
          >
            <CreditCard size={16} className="mr-2" />
            {isLoading ? 'Processing...' : 'Continue to Payment'}
          </Button>

          <p className="text-xs text-center text-gray-500">
            Secure payment powered by Stripe
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
