
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: amount * 100, // Convert to cents
          description: `${planName} Plan - Wasfah AI`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        onClose();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-wasfah-deep-teal">
            <CreditCard className="h-5 w-5" />
            Upgrade to {planName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Card className="border-wasfah-mint/30 hover:border-wasfah-mint/50 transition-colors duration-300">
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-wasfah-deep-teal">
                  ${amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">One-time payment</div>
              </div>

              <div className="space-y-2 mb-4">
                {features.slice(0, 4).map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {features.length > 4 && (
                  <div className="text-sm text-gray-500 text-center">
                    + {features.length - 4} more features
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Instant Access
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-deep-teal transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Complete Purchase
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Powered by Stripe • Your payment information is secure
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
