// src/components/dish/ScanDishComponent.tsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Camera, RefreshCcw, XCircle, ChevronRight, CheckCircle } from 'lucide-react'; // Import necessary icons
import { ScanHistoryItem } from '@/types/index'; // Import the updated ScanHistoryItem interface

// --- Named export for ScanDishResult component ---
// This component displays a single historical scan result
export function ScanDishResult({ scanResult }: { scanResult: ScanHistoryItem }) { // Ensure scanResult is typed
  return (
    <Card className="flex items-center p-4 rounded-lg shadow-sm border mb-3">
      <div className="flex-shrink-0 mr-4">
        <img
          src={scanResult.image} // Assuming image property exists
          alt={scanResult.name}
          className="w-16 h-16 object-cover rounded-md"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/64x64/cccccc/333333?text=N/A'; }}
        />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-lg">{scanResult.name}</h4>
        <p className="text-sm text-gray-600">
          {scanResult.calories} kcal • {scanResult.protein}g P • {scanResult.carbs}g C • {scanResult.fat}g F
        </p>
      </div>
      <Button variant="ghost" size="icon">
        <ChevronRight className="h-5 w-5 text-gray-500" />
      </Button>
    </Card>
  );
}


// --- Default export for the main ScanDishComponent ---
// This component manages the scanning process and displays history
export default function ScanDishComponent() { // Changed to default export
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanHistoryItem | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);

  // Mock scan function
  const mockScan = () => {
    setIsScanning(true);
    toast({
      title: "Scanning...",
      description: "Analyzing your dish...",
      variant: "default",
    });

    setTimeout(() => {
      const mockResults: ScanHistoryItem[] = [
        {
          id: 'dish1',
          name: 'Chicken and Rice',
          calories: 550,
          protein: 45,
          carbs: 50,
          fat: 20,
          timestamp: new Date().toISOString(),
          image: 'https://placehold.co/100x100/ADD8E6/000?text=Chicken',
        },
        {
          id: 'dish2',
          name: 'Vegetable Salad',
          calories: 200,
          protein: 10,
          carbs: 25,
          fat: 8,
          timestamp: new Date().toISOString(),
          image: 'https://placehold.co/100x100/90EE90/000?text=Salad',
        },
        {
          id: 'dish3',
          name: 'Beef Steak with Potatoes',
          calories: 700,
          protein: 60,
          carbs: 40,
          fat: 35,
          timestamp: new Date().toISOString(),
          image: 'https://placehold.co/100x100/FFDAB9/000?text=Steak',
        },
      ];
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setScanResult(randomResult);
      setScanHistory(prev => [randomResult, ...prev]);
      setIsScanning(false);
      toast({
        title: "Scan Complete!",
        description: `Identified: ${randomResult.name}`,
        variant: "default", // Changed from "success" for now
      });
    }, 2000);
  };

  const clearScanResult = () => {
    setScanResult(null);
  };

  return (
    <div className="space-y-6 p-4">
      <Card className="flex flex-col items-center p-6 text-center shadow-lg">
        <div className="bg-blue-100 p-4 rounded-full mb-4">
          <Camera className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">Scan Your Dish</h2>
        <p className="text-gray-600 mb-4">
          Point your camera at a dish to instantly get nutrition information and ingredients.
        </p>
        <Button onClick={mockScan} disabled={isScanning} className="w-full">
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </Button>
        {scanResult && (
          <div className="mt-4 w-full">
            <h3 className="font-semibold text-lg mb-2">Scan Result:</h3>
            <Card className="p-4 border-2 border-green-500 relative">
              <CheckCircle className="absolute top-2 right-2 h-6 w-6 text-green-500" />
              <h4 className="font-bold text-xl mb-1">{scanResult.name}</h4>
              <p className="text-sm text-gray-700">
                Calories: {scanResult.calories} kcal
              </p>
              <p className="text-sm text-gray-700">
                Protein: {scanResult.protein}g | Carbs: {scanResult.carbs}g | Fat: {scanResult.fat}g
              </p>
              <Button variant="secondary" onClick={clearScanResult} className="mt-3 w-full">
                Clear Result <XCircle className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
        )}
      </Card>

      <h3 className="font-semibold text-lg mt-6 mb-4">Scan History</h3>
      {scanHistory.length === 0 ? (
        <p className="text-gray-500 text-center">No scan history yet.</p>
      ) : (
        <div className="space-y-3">
          {scanHistory.map((item) => (
            // Using the named exported component ScanDishResult
            <ScanDishResult key={item.id} scanResult={item} />
          ))}
        </div>
      )}
      <Button variant="outline" className="w-full mt-4">
        <RefreshCcw className="h-4 w-4 mr-2" /> Refresh History
      </Button>
    </div>
  );
}
