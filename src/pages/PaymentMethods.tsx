
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MobileNavigation } from "@/components/MobileNavigation";
import { CreditCard, Plus, Trash2, ArrowLeft, Shield, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  email?: string;
  bankName?: string;
}

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: "2",
      type: "paypal",
      email: "user@example.com",
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  });

  const addPaymentMethod = () => {
    if (!newCard.number || !newCard.expiry || !newCard.cvc || !newCard.name) {
      toast({
        title: "Error",
        description: "Please fill in all card details",
        variant: "destructive"
      });
      return;
    }

    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: "card",
      last4: newCard.number.slice(-4),
      brand: "visa", // In real app, detect from number
      expiryMonth: parseInt(newCard.expiry.split('/')[0]),
      expiryYear: parseInt('20' + newCard.expiry.split('/')[1]),
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods(prev => [...prev, newMethod]);
    setNewCard({ number: "", expiry: "", cvc: "", name: "" });
    setShowAddForm(false);
    
    toast({
      title: "Payment method added",
      description: "Your new payment method has been saved"
    });
  };

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    toast({
      title: "Payment method removed",
      description: "The payment method has been deleted"
    });
  };

  const setAsDefault = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    toast({
      title: "Default payment updated",
      description: "This payment method is now your default"
    });
  };

  const getCardIcon = (brand: string) => {
    const icons: { [key: string]: string } = {
      visa: "💳",
      mastercard: "💳",
      amex: "💳",
      discover: "💳"
    };
    return icons[brand] || "💳";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
              Payment Methods
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage your payment options securely
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-600" size={20} />
              <div>
                <p className="font-medium text-blue-800">Secure Payment Processing</p>
                <p className="text-sm text-blue-600">All payment information is encrypted and stored securely</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods List */}
        <div className="space-y-4 mb-6">
          {paymentMethods.map((method) => (
            <Card key={method.id} className={method.isDefault ? "ring-2 ring-wasfah-orange" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      {method.type === 'card' ? (
                        <span className="text-lg">{getCardIcon(method.brand || '')}</span>
                      ) : method.type === 'paypal' ? (
                        <span className="text-lg">🏦</span>
                      ) : (
                        <span className="text-lg">🏛️</span>
                      )}
                    </div>
                    <div>
                      {method.type === 'card' && (
                        <>
                          <p className="font-medium">
                            {method.brand?.toUpperCase()} •••• {method.last4}
                          </p>
                          <p className="text-sm text-gray-600">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                        </>
                      )}
                      {method.type === 'paypal' && (
                        <>
                          <p className="font-medium">PayPal</p>
                          <p className="text-sm text-gray-600">{method.email}</p>
                        </>
                      )}
                      {method.type === 'bank' && (
                        <>
                          <p className="font-medium">{method.bankName}</p>
                          <p className="text-sm text-gray-600">Bank Account</p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {method.isDefault ? (
                      <Badge className="bg-green-500">
                        <Check size={12} className="mr-1" />
                        Default
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAsDefault(method.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePaymentMethod(method.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Payment Method */}
        {!showAddForm ? (
          <Card>
            <CardContent className="p-6 text-center">
              <CreditCard size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Add New Payment Method</h3>
              <p className="text-gray-600 mb-4">Add a credit card, debit card, or bank account</p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus size={16} className="mr-2" />
                  Add Credit Card
                </Button>
                <Button variant="outline">
                  <Plus size={16} className="mr-2" />
                  Add PayPal
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="text-wasfah-orange" size={20} />
                Add New Credit Card
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={newCard.number}
                  onChange={(e) => setNewCard(prev => ({ ...prev, number: e.target.value }))}
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <Input
                    placeholder="MM/YY"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard(prev => ({ ...prev, expiry: e.target.value }))}
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVC</label>
                  <Input
                    placeholder="123"
                    value={newCard.cvc}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cvc: e.target.value }))}
                    maxLength={4}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <Input
                  placeholder="John Doe"
                  value={newCard.name}
                  onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addPaymentMethod} className="flex-1">
                  Add Card
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false);
                    setNewCard({ number: "", expiry: "", cvc: "", name: "" });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default PaymentMethods;
