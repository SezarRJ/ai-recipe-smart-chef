
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Share2, Eye, Heart, MessageCircle } from "lucide-react";

const SharedRecipes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Shared Recipes
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Track your recipe interactions
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="text-wasfah-orange" size={20} />
              Recipe Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Share2 size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Share your first recipe to see analytics here!</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default SharedRecipes;
