
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, Loader2, Zap, Clock, Utensils } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAIChef } from '@/hooks/useAIChef';
import { ScanHistoryItem } from '@/types/index';

interface ScanDishComponentProps {
  onScanResult?: (result: ScanHistoryItem) => void;
}

export const ScanDishComponent: React.FC<ScanDishComponentProps> = ({ onScanResult }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ScanHistoryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { askAIChef } = useAIChef();

  const handleImageSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const response = await askAIChef(
        'Analyze this food image and provide nutritional information, ingredients, and cooking tips. Return the analysis in a structured format.',
        { requestType: 'dish_analysis', image: selectedImage }
      );

      // Create a mock result for now - in real implementation, parse AI response
      const result: ScanHistoryItem = {
        id: `scan_${Date.now()}`,
        name: 'Analyzed Dish',
        calories: 450,
        protein: 25,
        carbs: 35,
        fat: 18,
        timestamp: new Date().toISOString(),
        image: selectedImage,
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3']
      };

      setAnalysisResult(result);
      onScanResult?.(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedImage, askAIChef, onScanResult]);

  const handleCameraCapture = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageSelect}
        className="hidden"
      />

      {!selectedImage ? (
        <div className="space-y-4">
          <div className="text-center py-8">
            <Utensils className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Scan Your Dish</h3>
            <p className="text-gray-600 mb-6">
              Take a photo or upload an image of your dish to get instant nutritional analysis
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleCameraCapture} className="gap-2">
                <Camera className="h-4 w-4" />
                Take Photo
              </Button>
              <Button onClick={handleUpload} variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <img
                  src={selectedImage}
                  alt="Selected dish"
                  className="mx-auto max-w-full h-64 object-cover rounded-lg mb-4"
                />
                
                <div className="flex gap-2 justify-center">
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="gap-2"
                  >
                    {isAnalyzing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Zap className="h-4 w-4" />
                    )}
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Dish'}
                  </Button>
                  
                  <Button 
                    onClick={() => setSelectedImage(null)}
                    variant="outline"
                  >
                    Choose Another
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {analysisResult && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{analysisResult.calories}</div>
                    <div className="text-sm text-gray-600">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{analysisResult.protein}g</div>
                    <div className="text-sm text-gray-600">Protein</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{analysisResult.carbs}g</div>
                    <div className="text-sm text-gray-600">Carbs</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{analysisResult.fat}g</div>
                    <div className="text-sm text-gray-600">Fat</div>
                  </div>
                </div>

                {analysisResult.ingredients && analysisResult.ingredients.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Detected Ingredients:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.ingredients.map((ingredient, index) => (
                        <Badge key={index} variant="secondary">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
