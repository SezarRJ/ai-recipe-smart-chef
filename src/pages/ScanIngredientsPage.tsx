
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Scan, Image, History, CheckCircle } from 'lucide-react';

const ScanIngredientsPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState([
    { id: 1, name: 'Tomatoes', confidence: 95, category: 'Vegetables', timestamp: '2 mins ago' },
    { id: 2, name: 'Chicken Breast', confidence: 92, category: 'Protein', timestamp: '5 mins ago' },
    { id: 3, name: 'Onions', confidence: 88, category: 'Vegetables', timestamp: '8 mins ago' },
  ]);

  const scanHistory = [
    { id: 1, date: '2024-01-15', items: ['Tomatoes', 'Chicken Breast', 'Onions', 'Garlic'], time: '10:30 AM' },
    { id: 2, date: '2024-01-14', items: ['Milk', 'Eggs', 'Bread', 'Cheese'], time: '2:15 PM' },
    { id: 3, date: '2024-01-13', items: ['Apples', 'Bananas', 'Oranges'], time: '9:45 AM' },
  ];

  const startScanning = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Add a new scanned item
      const newItem = {
        id: scannedItems.length + 1,
        name: 'Bell Peppers',
        confidence: 94,
        category: 'Vegetables',
        timestamp: 'Just now'
      };
      setScannedItems([newItem, ...scannedItems]);
    }, 3000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <PageContainer
      header={{
        title: 'Scan Ingredients',
        showBackButton: true
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Scanner Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center border-4 border-dashed border-gray-300">
                {isScanning ? (
                  <div className="animate-pulse">
                    <Scan className="h-16 w-16 text-wasfah-bright-teal" />
                  </div>
                ) : (
                  <Camera className="h-16 w-16 text-gray-400" />
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {isScanning ? 'Scanning...' : 'Ready to Scan'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isScanning 
                    ? 'Identifying ingredients in your image...' 
                    : 'Point your camera at ingredients or upload a photo'
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={startScanning}
                  disabled={isScanning}
                  className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {isScanning ? 'Scanning...' : 'Take Photo'}
                </Button>
                <Button variant="outline">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan Results */}
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Scan</TabsTrigger>
            <TabsTrigger value="history">Scan History</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Detected Ingredients</span>
                  <Badge variant="outline">{scannedItems.length} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {scannedItems.length > 0 ? (
                  <div className="space-y-3">
                    {scannedItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getConfidenceColor(item.confidence)}>
                            {item.confidence}%
                          </Badge>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t">
                      <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                        Add to Pantry ({scannedItems.length} items)
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Scan className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No ingredients scanned yet</p>
                    <p className="text-sm">Start scanning to see detected ingredients here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Scan History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanHistory.map((scan) => (
                    <div key={scan.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{scan.date}</h4>
                        <span className="text-sm text-gray-600">{scan.time}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {scan.items.map((item, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        {scan.items.length} ingredients detected
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Scanning Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-wasfah-bright-teal rounded-full mt-2 flex-shrink-0"></div>
                <p>Ensure good lighting for better recognition accuracy</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-wasfah-bright-teal rounded-full mt-2 flex-shrink-0"></div>
                <p>Keep ingredients clearly visible and separated</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-wasfah-bright-teal rounded-full mt-2 flex-shrink-0"></div>
                <p>Review detected items before adding to your pantry</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ScanIngredientsPage;
