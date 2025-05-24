
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Clock, ChefHat } from "lucide-react";

const CookingHistory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Cooking History
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Your cooking journey
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="text-wasfah-orange" size={20} />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <ChefHat size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Start cooking to see your history here!</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default CookingHistory;
