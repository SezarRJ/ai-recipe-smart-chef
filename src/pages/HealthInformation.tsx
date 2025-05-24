
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Activity, Heart, Scale, Target } from "lucide-react";

const HealthInformation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Health Information
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Track your health metrics and goals
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Scale className="mx-auto mb-2 text-wasfah-orange" size={24} />
              <p className="text-sm text-gray-600">Weight</p>
              <p className="text-xl font-bold">-- kg</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="mx-auto mb-2 text-red-500" size={24} />
              <p className="text-sm text-gray-600">Heart Rate</p>
              <p className="text-xl font-bold">-- bpm</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-wasfah-orange" size={20} />
              Health Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center py-8">
              Health tracking features coming soon!
            </p>
          </CardContent>
        </Card>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default HealthInformation;
