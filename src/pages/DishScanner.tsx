
import { useState } from "react";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Scan, Info, Utensils, Heart, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DishScanner = () => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedDish, setScannedDish] = useState<any>(null);

  const handleCameraCapture = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScannedDish({
        name: "Chicken Biryani",
        cuisine: "Indian",
        confidence: 95,
        ingredients: [
          { name: "Basmati Rice", amount: "2 cups" },
          { name: "Chicken", amount: "500g" },
          { name: "Onions", amount: "2 large" },
          { name: "Yogurt", amount: "1 cup" },
          { name: "Garam Masala", amount: "2 tsp" },
          { name: "Saffron", amount: "1 pinch" },
          { name: "Mint Leaves", amount: "1/4 cup" },
          { name: "Cilantro", amount: "1/4 cup" }
        ],
        nutrition: {
          calories: 420,
          protein: 28,
          carbs: 52,
          fat: 12,
          fiber: 3
        },
        cookingTime: 60,
        difficulty: "Medium",
        description: "A fragrant and flavorful Indian rice dish with spiced chicken, aromatic basmati rice, and traditional seasonings."
      });
      toast({
        title: "Dish Identified!",
        description: "Analysis complete with 95% confidence"
      });
    }, 3000);
  };

  const handleFileUpload = () => {
    // Simulate file upload and analysis
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsScanning(true);
        setTimeout(() => {
          setIsScanning(false);
          handleCameraCapture(); // Use same mock data
        }, 2000);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2 flex items-center gap-2">
            <Scan className="text-wasfah-orange" size={28} />
            Dish Scanner
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Scan any dish to get ingredients and nutrition information
          </p>
        </div>

        {!scannedDish ? (
          <div className="space-y-6">
            {/* Scanner Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="text-wasfah-orange" size={20} />
                  Scan Your Dish
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isScanning ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-wasfah-orange border-t-transparent mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold mb-2">Analyzing Dish...</h3>
                    <p className="text-gray-600">AI is identifying ingredients and nutrition</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
                      <div className="text-center">
                        <Camera size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 mb-4">Position your dish in the camera view</p>
                        <p className="text-sm text-gray-500">Make sure the dish is well-lit and clearly visible</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button 
                        onClick={handleCameraCapture}
                        className="bg-gradient-to-r from-wasfah-orange to-wasfah-green flex items-center gap-2"
                      >
                        <Camera size={20} />
                        Take Photo
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleFileUpload}
                        className="flex items-center gap-2"
                      >
                        <Upload size={20} />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="text-wasfah-orange" size={20} />
                  Scanning Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-wasfah-orange rounded-full mt-2 flex-shrink-0"></span>
                    Ensure good lighting and clear visibility of the dish
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-wasfah-orange rounded-full mt-2 flex-shrink-0"></span>
                    Include the entire dish in the frame
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-wasfah-orange rounded-full mt-2 flex-shrink-0"></span>
                    Avoid shadows and reflections on the dish
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-wasfah-orange rounded-full mt-2 flex-shrink-0"></span>
                    Hold the camera steady for best results
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Scan Results */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="text-wasfah-orange" size={20} />
                    {scannedDish.name}
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    {scannedDish.confidence}% Match
                  </Badge>
                </div>
                <p className="text-gray-600">{scannedDish.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Clock className="mx-auto mb-1 text-wasfah-orange" size={20} />
                    <p className="text-sm text-gray-600">{scannedDish.cookingTime} min</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary">{scannedDish.difficulty}</Badge>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-blue-100 text-blue-800">{scannedDish.cuisine}</Badge>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setScannedDish(null)}
                  variant="outline"
                  className="w-full"
                >
                  Scan Another Dish
                </Button>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scannedDish.ingredients.map((ingredient: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-gray-600">{ingredient.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="text-wasfah-orange" size={20} />
                  Nutrition Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-wasfah-orange">{scannedDish.nutrition.calories}</p>
                    <p className="text-sm text-gray-600">Calories</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-wasfah-orange">{scannedDish.nutrition.protein}g</p>
                    <p className="text-sm text-gray-600">Protein</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-wasfah-orange">{scannedDish.nutrition.carbs}g</p>
                    <p className="text-sm text-gray-600">Carbs</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-wasfah-orange">{scannedDish.nutrition.fat}g</p>
                    <p className="text-sm text-gray-600">Fat</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-wasfah-orange">{scannedDish.nutrition.fiber}g</p>
                    <p className="text-sm text-gray-600">Fiber</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button className="bg-gradient-to-r from-wasfah-orange to-wasfah-green">
                Find Similar Recipes
              </Button>
              <Button variant="outline">
                Add to Meal Plan
              </Button>
            </div>
          </div>
        )}
      </div>

      <MobileNavigation />
    </div>
  );
};

export default DishScanner;
