
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNativeFeatures } from '@/hooks/useNativeFeatures';
import { Camera, Image, X, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileCameraScannerProps {
  onScanComplete?: (result: string) => void;
  onClose?: () => void;
  type?: 'ingredient' | 'dish' | 'barcode';
}

export const MobileCameraScanner = ({ 
  onScanComplete, 
  onClose,
  type = 'ingredient' 
}: MobileCameraScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { takePicture, selectFromGallery, hapticFeedback } = useNativeFeatures();

  const handleTakePicture = async () => {
    setIsScanning(true);
    await hapticFeedback('medium');
    
    const imageUrl = await takePicture();
    if (imageUrl) {
      setScannedImage(imageUrl);
      // Simulate AI processing
      setTimeout(() => {
        const mockResults = {
          ingredient: 'Fresh Tomatoes - 2 medium sized',
          dish: 'Mediterranean Chickpea Salad',
          barcode: 'Organic Olive Oil - 500ml'
        };
        setScanResult(mockResults[type]);
        setIsScanning(false);
        hapticFeedback('light');
      }, 2000);
    } else {
      setIsScanning(false);
    }
  };

  const handleSelectFromGallery = async () => {
    setIsScanning(true);
    await hapticFeedback('light');
    
    const imageUrl = await selectFromGallery();
    if (imageUrl) {
      setScannedImage(imageUrl);
      // Simulate AI processing
      setTimeout(() => {
        const mockResults = {
          ingredient: 'Mixed Green Vegetables',
          dish: 'Asian Stir Fry',
          barcode: 'Whole Wheat Pasta - 1kg'
        };
        setScanResult(mockResults[type]);
        setIsScanning(false);
        hapticFeedback('light');
      }, 2000);
    } else {
      setIsScanning(false);
    }
  };

  const handleConfirm = async () => {
    await hapticFeedback('medium');
    if (scanResult) {
      onScanComplete?.(scanResult);
    }
  };

  const handleRetry = async () => {
    await hapticFeedback('light');
    setScannedImage(null);
    setScanResult(null);
    setIsScanning(false);
  };

  const getScannerTitle = () => {
    switch (type) {
      case 'ingredient': return 'Scan Ingredient';
      case 'dish': return 'Identify Dish';
      case 'barcode': return 'Scan Barcode';
      default: return 'AI Scanner';
    }
  };

  const getScannerDescription = () => {
    switch (type) {
      case 'ingredient': return 'Point your camera at an ingredient to identify it';
      case 'dish': return 'Take a photo of a dish to get its recipe';
      case 'barcode': return 'Scan product barcode for nutritional info';
      default: return 'Use AI to identify food items';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md"
      >
        <Card className="mobile-card">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{getScannerTitle()}</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {!scannedImage ? (
                /* Camera Options */
                <motion.div
                  key="camera-options"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <p className="text-gray-600 text-center mb-6">
                    {getScannerDescription()}
                  </p>

                  {/* Camera Viewfinder Simulation */}
                  <div className="relative bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-6 overflow-hidden">
                    <div className="absolute inset-4 border-2 border-wasfah-orange rounded-lg border-dashed opacity-50" />
                    <Camera size={48} className="text-gray-400" />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-wasfah-orange/10 rounded-xl"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleTakePicture}
                      className="w-full mobile-button bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white"
                      disabled={isScanning}
                    >
                      <Camera className="mr-2" size={20} />
                      Take Photo
                    </Button>
                    
                    <Button
                      onClick={handleSelectFromGallery}
                      variant="outline"
                      className="w-full mobile-button"
                      disabled={isScanning}
                    >
                      <Image className="mr-2" size={20} />
                      Choose from Gallery
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Scan Results */
                <motion.div
                  key="scan-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Scanned Image */}
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={scannedImage}
                      alt="Scanned item"
                      className="w-full h-48 object-cover"
                    />
                    {isScanning && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Loader2 className="animate-spin mx-auto mb-2" size={32} />
                          <p>Analyzing with AI...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Scan Result */}
                  {scanResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-0.5" size={20} />
                        <div>
                          <h3 className="font-semibold text-green-800 mb-1">
                            Identified Successfully!
                          </h3>
                          <p className="text-green-700">{scanResult}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleRetry}
                      variant="outline"
                      className="flex-1 mobile-button"
                    >
                      Retry
                    </Button>
                    {scanResult && (
                      <Button
                        onClick={handleConfirm}
                        className="flex-1 mobile-button bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white"
                      >
                        Confirm
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
