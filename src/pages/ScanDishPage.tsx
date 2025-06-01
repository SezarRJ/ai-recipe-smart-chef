
import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Loader2, Utensils, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/components/layout/PageContainer';
import { useToast } from '@/hooks/use-toast';
import { useAIChef } from '@/hooks/useAIChef';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ScanDishPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const { askAIChef } = useAIChef();
  const { t } = useLanguage();

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context?.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      stopCamera();
      analyzeImage(imageData);
    }
  }, [stopCamera]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
        analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData: string) => {
    setIsScanning(true);
    setScanResult(null);
    
    try {
      const query = `Analyze this food image and provide:
1. Dish name and cuisine type
2. Main ingredients you can identify
3. Estimated nutritional information
4. Recipe suggestions or cooking tips

Respond in a natural, helpful way as a food expert.`;

      const response = await askAIChef(query, {
        requestType: 'dish_analysis',
        image: imageData
      });

      setScanResult(response.response);
      
      toast({
        title: "Analysis Complete",
        description: "Successfully analyzed the dish!",
      });
      
    } catch (error) {
      console.error('Scan error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the dish. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  };

  const resetScan = () => {
    setCapturedImage(null);
    setScanResult(null);
    stopCamera();
  };

  return (
    <PageContainer
      header={{
        title: t('scan.title') || 'Scan Dish',
        showBackButton: true
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-20">
        {!showCamera && !capturedImage && (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <Utensils className="h-16 w-16 mx-auto text-wasfah-bright-teal" />
                <h2 className="text-xl font-semibold">
                  {t('scan.subtitle') || 'Identify Any Dish'}
                </h2>
                <p className="text-gray-600">
                  {t('scan.description') || 'Take a photo or upload an image to get dish information, ingredients, and recipe suggestions'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={startCamera}
                    className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                    size="lg"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    {t('scan.takePhoto') || 'Take Photo'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    size="lg"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    {t('scan.uploadPhoto') || 'Upload Photo'}
                  </Button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {showCamera && (
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg"
                />
                <canvas ref={canvasRef} className="hidden" />
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                  <Button
                    onClick={capturePhoto}
                    className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                    size="lg"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Capture
                  </Button>
                  <Button
                    variant="outline"
                    onClick={stopCamera}
                    size="lg"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {capturedImage && (
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <img 
                  src={capturedImage} 
                  alt="Captured dish" 
                  className="w-full rounded-lg"
                />
                
                {isScanning && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-wasfah-bright-teal mr-2" />
                    <span>Analyzing dish...</span>
                  </div>
                )}
                
                {scanResult && (
                  <div className="bg-wasfah-light-gray p-4 rounded-lg">
                    <h3 className="font-semibold text-wasfah-deep-teal mb-2">Analysis Results:</h3>
                    <div className="whitespace-pre-line text-gray-700">
                      {scanResult}
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={resetScan}
                  variant="outline"
                  className="w-full"
                >
                  Scan Another Dish
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
