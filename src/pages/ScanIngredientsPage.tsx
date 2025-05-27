
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Activity, Camera, Upload, X, Search, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { NutritionTip } from '@/components/nutrition/NutritionTip';

// Sample data for ingredient detection results
const sampleIngredients = [
  { id: '1', name: 'Chicken breast', quantity: '200g', calories: 330, protein: 62, carbs: 0, fat: 8 },
  { id: '2', name: 'Broccoli', quantity: '150g', calories: 50, protein: 4, carbs: 10, fat: 0.5 },
  { id: '3', name: 'Olive oil', quantity: '15ml', calories: 120, protein: 0, carbs: 0, fat: 14 },
  { id: '4', name: 'Brown rice', quantity: '100g', calories: 111, protein: 2.6, carbs: 23, fat: 0.9 }
];

// Sample data for recommended recipes based on detected ingredients
const sampleRecommendedRecipes = [
  { id: '1', name: 'Chicken Stir Fry', ingredients: 4, matchPercentage: '95%', image: '/placeholder.svg' },
  { id: '2', name: 'Roasted Chicken with Vegetables', ingredients: 5, matchPercentage: '85%', image: '/placeholder.svg' },
  { id: '3', name: 'Rice Bowl with Grilled Chicken', ingredients: 6, matchPercentage: '80%', image: '/placeholder.svg' }
];

export default function ScanIngredientsPage() {
  const { toast } = useToast();
  const [scanActive, setScanActive] = useState(false);
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState<typeof sampleIngredients>([]);
  const [nutritionSummary, setNutritionSummary] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  
  // Function to handle camera scan
  const handleScan = () => {
    setScanActive(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setAnalyzingImage(true);
      
      // Simulate analysis completion after 2 seconds
      setTimeout(() => {
        setAnalyzingImage(false);
        setAnalysisComplete(true);
        setDetectedIngredients(sampleIngredients);
        
        // Calculate nutrition summary
        const totalNutrition = sampleIngredients.reduce((acc, ingredient) => {
          return {
            calories: acc.calories + ingredient.calories,
            protein: acc.protein + ingredient.protein,
            carbs: acc.carbs + ingredient.carbs,
            fat: acc.fat + ingredient.fat
          };
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
        
        setNutritionSummary(totalNutrition);
        
        toast({
          title: "Analysis Complete",
          description: "We've identified ingredients and nutritional information.",
        });
      }, 2000);
    }, 1000);
  };
  
  // Function to handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileUploadOpen(false);
    setAnalyzingImage(true);
    
    // Simulate analysis completion after 2 seconds
    setTimeout(() => {
      setAnalyzingImage(false);
      setAnalysisComplete(true);
      setDetectedIngredients(sampleIngredients);
      
      // Calculate nutrition summary
      const totalNutrition = sampleIngredients.reduce((acc, ingredient) => {
        return {
          calories: acc.calories + ingredient.calories,
          protein: acc.protein + ingredient.protein,
          carbs: acc.carbs + ingredient.carbs,
          fat: acc.fat + ingredient.fat
        };
      }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
      
      setNutritionSummary(totalNutrition);
      
      toast({
        title: "Analysis Complete",
        description: "We've identified ingredients and nutritional information from your image.",
      });
    }, 2000);
  };
  
  // Function to reset the scan
  const resetScan = () => {
    setScanActive(false);
    setAnalyzingImage(false);
    setAnalysisComplete(false);
    setDetectedIngredients([]);
  };
  
  // Function to add ingredients to shopping list
  const addToShoppingList = () => {
    toast({
      title: "Added to Shopping List",
      description: `${detectedIngredients.length} ingredients have been added to your shopping list.`,
    });
  };
  
  // Function to track nutrition
  const trackNutrition = () => {
    toast({
      title: "Nutrition Tracked",
      description: "The nutritional information has been added to your health tracker.",
    });
  };
  
  return (
    <PageContainer header={{ title: 'Scan Dish', showBackButton: true }}>
      <div className="px-4 space-y-6 pb-20">
        {!scanActive && !analysisComplete ? (
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-wasfah-light-mint p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="rounded-full bg-wasfah-bright-teal/20 p-4">
                    <Camera className="h-8 w-8 text-wasfah-bright-teal" />
                  </div>
                  <h2 className="text-xl font-bold text-wasfah-deep-teal">Scan Dish</h2>
                  <p className="text-sm text-gray-600 max-w-xs">
                    Take a photo of your dish to instantly identify ingredients and get nutritional information.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 w-full mt-4">
                    <Button
                      variant="default"
                      className="bg-wasfah-bright-teal hover:bg-wasfah-deep-teal"
                      onClick={handleScan}
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Take Photo
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setFileUploadOpen(true)}
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                placeholder="Search for a dish instead..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <NutritionTip 
              tip="Scanning your meals can help you track nutritional intake more accurately and make better dietary choices."
              source="Nutrition AI"
            />
            
            <h3 className="text-lg font-semibold text-wasfah-deep-teal mt-6">Recently Scanned</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Card className="overflow-hidden">
                <div className="h-24 bg-gray-100">
                  <img src="/placeholder.svg" alt="Salad" className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-2">
                  <p className="font-medium text-sm">Greek Salad</p>
                  <p className="text-xs text-gray-500">320 calories</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-24 bg-gray-100">
                  <img src="/placeholder.svg" alt="Smoothie" className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-2">
                  <p className="font-medium text-sm">Berry Smoothie</p>
                  <p className="text-xs text-gray-500">210 calories</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {analyzingImage ? (
              <Card className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-wasfah-bright-teal/20 flex items-center justify-center">
                    <Camera className="h-6 w-6 text-wasfah-bright-teal" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4">Analyzing Image</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Our AI is identifying ingredients and calculating nutritional information...
                  </p>
                </div>
              </Card>
            ) : analysisComplete ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-wasfah-deep-teal">Analysis Results</h2>
                  <Button variant="ghost" size="sm" onClick={resetScan}>
                    <X className="h-4 w-4 mr-1" />
                    New Scan
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Detected Ingredients</h3>
                    <div className="space-y-2">
                      {detectedIngredients.map((ingredient) => (
                        <div key={ingredient.id} className="flex justify-between text-sm border-b pb-2">
                          <div>
                            <p className="font-medium">{ingredient.name}</p>
                            <p className="text-xs text-gray-500">{ingredient.quantity}</p>
                          </div>
                          <p className="text-sm">{ingredient.calories} cal</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Nutrition Summary</h3>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Calories</p>
                        <p className="font-bold">{nutritionSummary.calories}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Protein</p>
                        <p className="font-bold">{nutritionSummary.protein}g</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Carbs</p>
                        <p className="font-bold">{nutritionSummary.carbs}g</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Fat</p>
                        <p className="font-bold">{nutritionSummary.fat}g</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex space-x-2">
                  <Button
                    className="flex-1 bg-wasfah-bright-teal hover:bg-wasfah-deep-teal"
                    onClick={addToShoppingList}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Shopping List
                  </Button>
                  <Button
                    variant="outline" 
                    className="flex-1"
                    onClick={trackNutrition}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Track Nutrition
                  </Button>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Recommended Recipes</h3>
                  <div className="space-y-3">
                    {sampleRecommendedRecipes.map((recipe) => (
                      <Card key={recipe.id}>
                        <div className="flex">
                          <div className="w-20 h-20">
                            <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 p-3">
                            <p className="font-medium">{recipe.name}</p>
                            <div className="flex justify-between items-center mt-1">
                              <div className="text-xs text-gray-500">
                                {recipe.ingredients} ingredients • {recipe.matchPercentage} match
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
        
        <Dialog open={fileUploadOpen} onOpenChange={setFileUploadOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="image-upload"
                  onChange={handleFileUpload}
                />
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  Select Image
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
}
