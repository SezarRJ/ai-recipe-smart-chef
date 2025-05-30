
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Loader2 } from 'lucide-react';

export const RecipeScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedRecipe, setScannedRecipe] = useState<any>(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setScannedRecipe({
        name: 'Mediterranean Quinoa Bowl',
        ingredients: ['Quinoa', 'Cucumber', 'Tomatoes', 'Feta'],
        cookingTime: 25,
        difficulty: 'Easy'
      });
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Camera className="h-5 w-5 mr-2" />
          Recipe Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!scannedRecipe ? (
          <>
            <Button 
              onClick={handleScan} 
              disabled={isScanning}
              className="w-full"
            >
              {isScanning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4 mr-2" />
                  Scan Recipe
                </>
              )}
            </Button>
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Recipe Image
            </Button>
          </>
        ) : (
          <div>
            <h3 className="font-medium mb-2">{scannedRecipe.name}</h3>
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="outline">{scannedRecipe.cookingTime} min</Badge>
              <Badge variant="outline">{scannedRecipe.difficulty}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Ingredients:</p>
              <ul className="text-sm list-disc list-inside">
                {scannedRecipe.ingredients.map((ingredient: string, i: number) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <Button className="w-full mt-4">View Full Recipe</Button>
            <Button variant="outline" className="w-full mt-2" onClick={() => setScannedRecipe(null)}>
              Scan Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeScanner;
