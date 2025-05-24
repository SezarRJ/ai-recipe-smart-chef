
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/MobileNavigation";
import { CreditCard, Plus } from "lucide-react";

const PaymentMethods = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Payment Methods
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your payment options
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="text-wasfah-orange" size={20} />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <CreditCard size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">No payment methods added yet</p>
              <Button>
                <Plus size={16} className="mr-2" />
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default PaymentMethods;
