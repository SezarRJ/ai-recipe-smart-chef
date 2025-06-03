
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface ScanDishResult {
  id: string;
  name: string;
  confidence: number;
  calories: number;
  ingredients: string[];
  nutritionInfo: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

interface ScanDishComponentProps {
  onScanComplete: (result: ScanDishResult) => void;
}

export const ScanDishComponent: React.FC<ScanDishComponentProps> = ({ onScanComplete }) => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) {
      toast({
        title: 'No image selected',
        description: 'Please select an image to scan',
        variant: 'destructive'
      });
      return;
    }

    setIsScanning(true);

    try {
      // Simulate AI scanning
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock result
      const result: ScanDishResult = {
        id: Date.now().toString(),
        name: 'Chicken Caesar Salad',
        confidence: 85,
        calories: 320,
        ingredients: ['Chicken breast', 'Romaine lettuce', 'Caesar dressing', 'Parmesan cheese', 'Croutons'],
        nutritionInfo: {
          protein: 28,
          carbs: 12,
          fat: 18,
          fiber: 4
        }
      };

      onScanComplete(result);
      
      toast({
        title: 'Scan complete',
        description: `Identified: ${result.name} with ${result.confidence}% confidence`
      });
    } catch (error) {
      toast({
        title: 'Scan failed',
        description: 'Unable to analyze the image. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleCameraCapture = () => {
    toast({
      title: 'Camera feature',
      description: 'Camera capture will be available in the next update',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Scan Your Dish
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          {selectedImage ? (
            <div className="space-y-4">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected dish"
                className="mx-auto max-h-48 rounded-lg"
              />
              <p className="text-sm text-gray-600">{selectedImage.name}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Camera className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="text-gray-500">Upload an image of your dish to analyze</p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleCameraCapture}
            className="flex-1"
          >
            <Camera className="h-4 w-4 mr-2" />
            Camera
          </Button>
          
          <label className="flex-1">
            <Button variant="outline" className="w-full" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </span>
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
        </div>

        <Button
          onClick={handleScan}
          disabled={!selectedImage || isScanning}
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
        >
          {isScanning ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Scan Dish'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ScanDishComponent;
