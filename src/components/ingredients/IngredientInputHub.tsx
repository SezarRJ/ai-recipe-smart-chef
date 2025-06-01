
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IngredientAutocomplete } from './IngredientAutocomplete';
import { 
  Camera, Upload, Mic, MicOff, X, 
  Plus, Scan, Image as ImageIcon, Check 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IngredientInputHubProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
  placeholder?: string;
}

export const IngredientInputHub: React.FC<IngredientInputHubProps> = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  placeholder = "Add ingredients..."
}) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Voice recording functionality
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        await processVoiceInput(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);

      toast({
        title: "Recording Started",
        description: "Speak your ingredients clearly...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive"
      });
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsRecording(false);
    }
  };

  const processVoiceInput = async (audioBlob: Blob) => {
    // Mock voice processing - in real app, this would use speech-to-text API
    const mockIngredients = ['tomatoes', 'onions', 'garlic', 'olive oil'];
    const randomIngredient = mockIngredients[Math.floor(Math.random() * mockIngredients.length)];
    
    onAddIngredient(randomIngredient);
    toast({
      title: "Voice Recognized",
      description: `Added "${randomIngredient}" from voice input`,
    });
  };

  // Camera functionality
  const startCamera = async () => {
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
      toast({
        title: "Error",
        description: "Could not access camera",
        variant: "destructive"
      });
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        // Mock image processing - in real app, this would use image recognition
        const mockIngredients = ['carrots', 'potatoes', 'broccoli', 'peppers'];
        const detectedIngredient = mockIngredients[Math.floor(Math.random() * mockIngredients.length)];
        
        onAddIngredient(detectedIngredient);
        closeCamera();
        
        toast({
          title: "Ingredient Detected",
          description: `Found "${detectedIngredient}" in the image`,
        });
      }
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  // File upload functionality
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    // Mock image processing
    const mockIngredients = ['flour', 'eggs', 'milk', 'butter', 'sugar'];
    const detectedIngredient = mockIngredients[Math.floor(Math.random() * mockIngredients.length)];
    
    onAddIngredient(detectedIngredient);
    
    toast({
      title: "Image Processed",
      description: `Detected "${detectedIngredient}" in uploaded image`,
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Input */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <IngredientAutocomplete
            onAddIngredient={onAddIngredient}
            placeholder={placeholder}
          />
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
              className={isRecording ? "bg-red-50 border-red-200" : ""}
            >
              {isRecording ? (
                <>
                  <MicOff className="h-4 w-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Input
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={startCamera}
            >
              <Camera className="h-4 w-4 mr-2" />
              Use Camera
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Scan Ingredients</CardTitle>
                <Button variant="ghost" size="sm" onClick={closeCamera}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={captureImage} className="flex-1">
                  <Scan className="h-4 w-4 mr-2" />
                  Capture & Analyze
                </Button>
                <Button variant="outline" onClick={closeCamera}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Current Ingredients */}
      {ingredients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Selected Ingredients ({ingredients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-wasfah-cream text-wasfah-dark-green pr-1"
                >
                  {ingredient}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 ml-1 hover:bg-red-100"
                    onClick={() => onRemoveIngredient(ingredient)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
