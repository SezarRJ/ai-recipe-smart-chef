import React, { useState, useRef } from 'react';
import { Camera, Upload, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

export interface ScanDishResult {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
}

interface ScanDishComponentProps {
  onScanResult?: (result: ScanDishResult) => void;
}

export const ScanDishComponent: React.FC<ScanDishComponentProps> = ({ onScanResult }) => {
  const { t } = useRTL();
  const { toast } = useToast();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
          };
          setIsCameraActive(true);
        }
      } else {
        throw new Error('getUserMedia not supported');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: t('Camera Error', 'خطأ في الكاميرا'),
        description: t('Could not access your camera. Please check permissions.', 'تعذر الوصول إلى الكاميرا الخاصة بك. يرجى التحقق من الأذونات.'),
        variant: 'destructive'
      });
    }
  };
  
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
  };
  
  const captureImage = () => {
    if (videoRef.current) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        
        if (ctx && videoRef.current.videoWidth > 0) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const imageDataUrl = canvas.toDataURL('image/png');
          setCapturedImage(imageDataUrl);
          stopCamera();
          analyzeImage(imageDataUrl);
        } else {
          throw new Error('Could not capture image');
        }
      } catch (error) {
        console.error('Error capturing image:', error);
        toast({
          title: t('Capture Error', 'خطأ في التقاط الصورة'),
          description: t('Could not capture image from camera.', 'تعذر التقاط الصورة من الكاميرا.'),
          variant: 'destructive'
        });
      }
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: t('Invalid File', 'ملف غير صالح'),
          description: t('Please upload an image file.', 'يرجى تحميل ملف صورة.'),
          variant: 'destructive'
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        setCapturedImage(imageDataUrl);
        analyzeImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const resetCapture = () => {
    setCapturedImage(null);
    setIsAnalyzing(false);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const analyzeImage = (imageUrl: string) => {
    setIsAnalyzing(true);
    
    // Simulate analysis (in a real app, this would call an AI service)
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Mock result (would be replaced with actual AI analysis)
      const mockResult: ScanDishResult = {
        id: crypto.randomUUID(), // Generate a unique ID
        name: "Vegetable Salad",
        calories: 120,
        protein: 5,
        carbs: 15,
        fat: 3,
        ingredients: ["Lettuce", "Tomato", "Cucumber", "Olive Oil"]
      };
      
      if (onScanResult) {
        onScanResult(mockResult);
      }
      
      toast({
        title: t("Dish Analyzed", "تم تحليل الطبق"),
        description: t(`Identified as ${mockResult.name}`, `تم التعرف عليه ك ${mockResult.name}`),
      });
    }, 2000);
  };
  
  React.useEffect(() => {
    // Clean up on component unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-wasfah-light-gray to-wasfah-light-mint/10 pb-2">
        <CardTitle className="flex items-center text-wasfah-deep-teal">
          <Camera className="h-5 w-5 mr-2" />
          {t('Scan Dish', 'مسح الطبق')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-4">
          {!isCameraActive && !capturedImage && (
            <>
              <Button 
                onClick={startCamera} 
                className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
              >
                <Camera className="mr-2 h-4 w-4" />
                {t('Open Camera', 'فتح الكاميرا')}
              </Button>
              
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">
                    {t('or', 'أو')}
                  </span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={triggerFileInput} 
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {t('Upload Image', 'تحميل صورة')}
              </Button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                className="hidden"
              />
            </>
          )}
          
          {isCameraActive && (
            <div className="relative w-full">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className="w-full rounded-lg"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                <Button 
                  onClick={captureImage} 
                  className="bg-wasfah-bright-teal hover:bg-wasfah-teal rounded-full h-12 w-12 flex items-center justify-center"
                >
                  <Camera className="h-6 w-6" />
                </Button>
                <Button 
                  onClick={stopCamera} 
                  variant="outline" 
                  className="bg-white/80 dark:bg-gray-700/80 border-gray-300 rounded-full h-12 w-12 flex items-center justify-center"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
          )}
          
          {capturedImage && (
            <div className="relative w-full">
              <img 
                src={capturedImage} 
                alt="Captured dish" 
                className="w-full rounded-lg"
              />
              
              {isAnalyzing ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wasfah-bright-teal mx-auto"></div>
                    <p className="mt-2">{t('Analyzing...', 'جاري التحليل...')}</p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex justify-center gap-2">
                  <Button 
                    onClick={resetCapture} 
                    variant="outline" 
                    className="border-wasfah-bright-teal text-wasfah-bright-teal"
                  >
                    {t('Scan Another', 'مسح آخر')}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
