import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';
import { MobileCameraScanner } from '@/components/MobileCameraScanner';
import { IngredientInputHub } from '@/components/ingredients/IngredientInputHub';
import {
  Brain, Menu, Utensils, GlassWater,
  Camera, Upload, Mic, MicOff, X, Plus, Scan,
  Image as ImageIcon, Check, CheckCircle2, Droplet,
  Wine, Volume2, VolumeX, Play, Pause, SkipForward,
  SkipBack, Timer as TimerIcon, RotateCcw, ArrowLeft,
  ArrowRight, ChevronLeft, ChevronRight, Heart,
  Star, Search, SlidersHorizontal, ListFilter, RotateCw
} from 'lucide-react';

// Enhanced recipe type with additional properties
interface AlcoholRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: Array<{
    name: string;
    amount: string;
    type: 'alcohol' | 'mixer' | 'garnish' | 'other';
    essential?: boolean;
  }>;
  instructions: string[];
  image: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  abv: string;
  servingSuggestions: string;
  glassType: string;
  garnish: string;
  preparationTime: string;
  tips?: string[];
  rating?: number;
  tags?: string[];
}

// Enhanced AI Drink Generator Component with improved state management
const AIDrinkGenerator = () => {
  const { t } = useRTL();
  const { toast } = useToast();
  const [pantryIngredients, setPantryIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    mood: '',
    baseAlcohol: '',
    flavorProfile: '',
    strength: 'medium',
    temperature: 'chilled'
  });
  const [generatedRecipe, setGeneratedRecipe] = useState<AlcoholRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice recording with improved error handling
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

      recorder.start(100); // Collect data every 100ms
      setMediaRecorder(recorder);
      setIsVoiceRecording(true);

      toast({
        title: "Recording Started",
        description: "Speak your ingredients clearly...",
      });
    } catch (error) {
      console.error("Microphone access error:", error);
      toast({
        title: "Microphone Access Denied",
        description: "Please enable microphone permissions to use voice input",
        variant: "destructive"
      });
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorder && isVoiceRecording) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsVoiceRecording(false);
    }
  };

  // Enhanced voice processing with better mock data
  const processVoiceInput = async (audioBlob: Blob) => {
    const mockIngredients = [
      'lime juice', 'simple syrup', 'mint leaves',
      'tonic water', 'orange bitters', 'vodka',
      'ginger beer', 'triple sec', 'cranberry juice'
    ];
    const randomIngredients = Array.from({ length: 2 }, () =>
      mockIngredients[Math.floor(Math.random() * mockIngredients.length)]
    );

    setPantryIngredients(prev => [...new Set([...prev, ...randomIngredients])]);
    toast({
      title: "Ingredients Added",
      description: `Added: ${randomIngredients.join(', ')} from voice input`,
    });
  };

  // Enhanced image scan functionality
  const handleImageScan = () => {
    setShowScanner(true);
  };

  const handleScanComplete = (results: string[]) => {
    setPantryIngredients(prev => [...new Set([...prev, ...results])]);
    setShowScanner(false);
    toast({
      title: "Ingredients Detected",
      description: `Added ${results.length} ingredients from scan`,
    });
  };

  // Improved file upload with better validation
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file (JPEG, PNG)",
        variant: "destructive"
      });
      return;
    }

    // Mock multiple ingredient detection
    const mockIngredients = [
      'vodka', 'gin', 'rum', 'whiskey',
      'tequila', 'brandy', 'vermouth', 'campari'
    ];
    const detectedIngredients = Array.from({ length: 3 }, () =>
      mockIngredients[Math.floor(Math.random() * mockIngredients.length)]
    );

    setPantryIngredients(prev => [...new Set([...prev, ...detectedIngredients])]);

    toast({
      title: "Image Processed",
      description: `Detected: ${detectedIngredients.join(', ')}`,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Enhanced pantry integration
  const loadFromPantry = () => {
    const mockPantryItems = [
      'vodka', 'lime', 'cranberry juice',
      'triple sec', 'simple syrup', 'mint',
      'gin', 'tonic water', 'lemon'
    ];
    const randomItems = mockPantryItems.sort(() => 0.5 - Math.random()).slice(0, 4);
    setPantryIngredients(prev => [...new Set([...prev, ...randomItems])]);
    toast({
      title: "Pantry Items Added",
      description: `Added ${randomItems.length} ingredients from your pantry`,
    });
  };

  // Enhanced recipe generation with more variety
  const generateDrink = async (isSurprise = false) => {
    setIsLoading(true);
    setGeneratedRecipe(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const recipeTemplates = [
        {
          name: "Midnight Sparkler",
          base: "Vodka",
          category: "Sparkling Cocktail",
          difficulty: "Medium"
        },
        {
          name: "Tropical Breeze",
          base: "Rum",
          category: "Tropical Drink",
          difficulty: "Easy"
        },
        {
          name: "Smoky Old Fashioned",
          base: "Whiskey",
          category: "Classic Cocktail",
          difficulty: "Hard"
        }
      ];

      const selectedTemplate = isSurprise
        ? recipeTemplates[Math.floor(Math.random() * recipeTemplates.length)]
        : {
          name: "Custom Crafted Cocktail",
          base: preferences.baseAlcohol || "Vodka",
          category: "Signature Drink",
          difficulty: "Medium"
        };

      // Enhanced mock recipe with more details
      const mockRecipe: AlcoholRecipe = {
        id: Date.now().toString(),
        name: selectedTemplate.name,
        description: `A ${selectedTemplate.difficulty.toLowerCase()} ${selectedTemplate.category.toLowerCase()} featuring ${selectedTemplate.base} with carefully balanced flavors.`,
        ingredients: [
          { name: `${selectedTemplate.base}`, amount: "2 oz", type: "alcohol", essential: true },
          { name: "Fresh Citrus Juice", amount: "0.75 oz", type: "mixer", essential: true },
          { name: "Simple Syrup", amount: "0.5 oz", type: "mixer" },
          { name: "Specialty Mixer", amount: "1 oz", type: "mixer" },
          { name: "Fresh Herb Sprig", amount: "1", type: "garnish" },
          { name: "Citrus Wheel", amount: "1", type: "garnish" }
        ],
        instructions: [
          "Chill your serving glass with ice or in freezer",
          "Add base spirits and juices to mixing glass",
          "Fill with ice and stir/shake according to technique",
          "Strain into prepared serving glass",
          "Add final touches and garnish",
          "Serve immediately and enjoy"
        ],
        image: `https://source.unsplash.com/random/300x300/?cocktail,${selectedTemplate.base.toLowerCase()}`,
        category: selectedTemplate.category,
        difficulty: selectedTemplate.difficulty as "Easy" | "Medium" | "Hard",
        abv: selectedTemplate.difficulty === "Hard" ? "20-25% ABV" :
          selectedTemplate.difficulty === "Medium" ? "15-20% ABV" : "10-15% ABV",
        servingSuggestions: `Best served in a ${selectedTemplate.base === "Whiskey" ? "rocks glass" : "chilled coupe"} with appropriate garnish.`,
        glassType: selectedTemplate.base === "Whiskey" ? "Rocks Glass" : "Coupe Glass",
        garnish: "Citrus twist and herb sprig",
        preparationTime: selectedTemplate.difficulty === "Hard" ? "5 minutes" : "3 minutes",
        tips: [
          "Use fresh ingredients whenever possible",
          "Adjust sweetness to your preference",
          "Experiment with different garnishes"
        ],
        rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
        tags: [selectedTemplate.base, selectedTemplate.category.split(' ')[0]]
      };

      setGeneratedRecipe(mockRecipe);
    } catch (error) {
      console.error("Recipe generation error:", error);
      toast({
        title: "Generation Failed",
        description: "Please try again with different parameters",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle preference changes
  const handlePreferenceChange = (field: keyof typeof preferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold text-primary">
          AI Mixology Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enhanced Pantry Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">My Bar Ingredients</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadFromPantry}>
                <Plus className="h-4 w-4 mr-2" />
                Pantry
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPantryIngredients([])}
                disabled={pantryIngredients.length === 0}
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          {/* Enhanced Input Methods */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleImageScan}
              className="flex items-center justify-center gap-1"
            >
              <Camera className="h-4 w-4" />
              <span>Scan</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-1"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>

            <Button
              variant={isVoiceRecording ? "destructive" : "outline"}
              size="sm"
              onClick={isVoiceRecording ? stopVoiceRecording : startVoiceRecording}
              className="flex items-center justify-center gap-1"
            >
              {isVoiceRecording ? (
                <MicOff className="h-4 w-4 animate-pulse" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
              <span>{isVoiceRecording ? "Stop" : "Voice"}</span>
            </Button>
          </div>

          {/* Enhanced Ingredient Display */}
          {pantryIngredients.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {pantryIngredients.map((ingredient, index) => (
                <Badge key={`${ingredient}-${index}`} variant="secondary" className="text-xs">
                  {ingredient}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => setPantryIngredients(prev => prev.filter((_, i) => i !== index))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              Add ingredients to get personalized recommendations
            </div>
          )}
        </div>

        {/* Enhanced Preferences Section */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Mood/Occasion</label>
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={preferences.mood}
              onChange={(e) => handlePreferenceChange('mood', e.target.value)}
            >
              <option value="">Select mood...</option>
              <option value="Relaxing">Relaxing Evening</option>
              <option value="Party">Lively Party</option>
              <option value="Romantic">Romantic Night</option>
              <option value="Celebration">Celebration</option>
              <option value="Refresh">Refresh & Rehydrate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Base Spirit</label>
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={preferences.baseAlcohol}
              onChange={(e) => handlePreferenceChange('baseAlcohol', e.target.value)}
            >
              <option value="">Select base...</option>
              <option value="Vodka">Vodka</option>
              <option value="Gin">Gin</option>
              <option value="Rum">Rum</option>
              <option value="Whiskey">Whiskey</option>
              <option value="Tequila">Tequila</option>
              <option value="Brandy">Brandy</option>
              <option value="Non-alcoholic">Non-alcoholic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Flavor Profile</label>
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={preferences.flavorProfile}
              onChange={(e) => handlePreferenceChange('flavorProfile', e.target.value)}
            >
              <option value="">Select flavor...</option>
              <option value="Sweet">Sweet</option>
              <option value="Sour">Sour/Tart</option>
              <option value="Bitter">Bitter</option>
              <option value="Spicy">Spicy</option>
              <option value="Herbal">Herbal</option>
              <option value="Fruity">Fruity</option>
              <option value="Balanced">Balanced</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Strength</label>
              <select
                className="w-full p-2 border rounded-lg text-xs"
                value={preferences.strength}
                onChange={(e) => handlePreferenceChange('strength', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="strong">Strong</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Temperature</label>
              <select
                className="w-full p-2 border rounded-lg text-xs"
                value={preferences.temperature}
                onChange={(e) => handlePreferenceChange('temperature', e.target.value)}
              >
                <option value="chilled">Chilled</option>
                <option value="room-temp">Room Temp</option>
                <option value="hot">Hot</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generate Buttons with Loading State */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => generateDrink(false)}
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={isLoading || pantryIngredients.length === 0}
          >
            {isLoading ? (
              <>
                <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                Crafting Your Drink...
              </>
            ) : (
              'Generate My Drink!'
            )}
          </Button>
          <Button
            onClick={() => generateDrink(true)}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                Finding Inspiration...
              </>
            ) : (
              'Surprise Me!'
            )}
          </Button>
        </div>

        {/* Enhanced Recipe Display */}
        {generatedRecipe && !isLoading && (
          <div className="mt-6 bg-secondary/20 p-4 rounded-xl border">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <img
                  src={generatedRecipe.image}
                  alt={generatedRecipe.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                {generatedRecipe.rating && (
                  <div className="absolute -top-2 -right-2 bg-background rounded-full p-1 shadow-sm">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs ml-0.5">{generatedRecipe.rating}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-primary mb-1">{generatedRecipe.name}</h4>
                <p className="text-muted-foreground text-xs mb-2">{generatedRecipe.description}</p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {generatedRecipe.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {generatedRecipe.abv}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {generatedRecipe.preparationTime}
                  </Badge>
                  {generatedRecipe.tags?.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Droplet className="h-4 w-4" />
                  Ingredients
                </h5>
                <ul className="space-y-1 text-xs">
                  {generatedRecipe.ingredients.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        {item.essential && (
                          <span className="text-red-500 mr-1">*</span>
                        )}
                        <span>{item.name}</span>
                      </div>
                      <span className="text-muted-foreground">{item.amount}</span>
                    </li>
                  ))}
                </ul>
                {generatedRecipe.ingredients.some(i => i.essential) && (
                  <p className="text-xs text-muted-foreground mt-1">
                    * Essential ingredients
                  </p>
                )}
              </div>

              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Wine className="h-4 w-4" />
                  Serving Details
                </h5>
                <div className="space-y-1 text-xs">
                  <p><strong>Glass:</strong> {generatedRecipe.glassType}</p>
                  <p><strong>Garnish:</strong> {generatedRecipe.garnish}</p>
                  <p><strong>ABV:</strong> {generatedRecipe.abv}</p>
                  <p><strong>Category:</strong> {generatedRecipe.category}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold mb-2 text-sm">Instructions</h5>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                {generatedRecipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {generatedRecipe.tips && generatedRecipe.tips.length > 0 && (
              <div className="mb-4">
                <h5 className="font-semibold mb-2 text-sm">Expert Tips</h5>
                <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                  {generatedRecipe.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-4">
              <h5 className="font-semibold mb-2 text-sm">Serving Suggestions</h5>
              <p className="text-xs text-muted-foreground">{generatedRecipe.servingSuggestions}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Heart className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                Share
              </Button>
              <Button size="sm" className="bg-primary text-xs">
                Start Making
              </Button>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          capture="environment"
        />

        {/* Enhanced Camera Scanner Modal */}
        {showScanner && (
          <MobileCameraScanner
            onScanComplete={handleScanComplete}
            onClose={() => setShowScanner(false)}
            type="ingredient"
            multiScan={true}
          />
        )}
      </CardContent>
    </Card>
  );
};

// Enhanced Recipe Browse Component with pagination and sorting
const RecipeBrowse = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    abv: '',
    searchTerm: ''
  });
  const [selectedRecipe, setSelectedRecipe] = useState<AlcoholRecipe | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const [sortBy, setSortBy] = useState<'name' | 'difficulty' | 'abv' | 'rating'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Enhanced mock recipes with more variety
  const mockRecipes: AlcoholRecipe[] = [
    {
      id: '1',
      name: "Classic Margarita",
      description: "A timeless cocktail with a perfect balance of tequila, lime, and orange liqueur",
      ingredients: [
        { name: "Tequila Blanco", amount: "2 oz", type: "alcohol", essential: true },
        { name: "Fresh Lime Juice", amount: "1 oz", type: "mixer", essential: true },
        { name: "Triple Sec", amount: "0.5 oz", type: "mixer", essential: true },
        { name: "Agave Syrup", amount: "0.25 oz", type: "mixer" },
        { name: "Salt Rim", amount: "1", type: "garnish" }
      ],
      instructions: [
        "Rim glass with salt",
        "Combine ingredients in shaker with ice",
        "Shake vigorously for 15 seconds",
        "Strain into salt-rimmed glass over ice",
        "Garnish with lime wheel"
      ],
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop",
      category: "Cocktail",
      difficulty: "Medium",
      abv: "20-25% ABV",
      servingSuggestions: "Serve in a salt-rimmed margarita glass with a lime wedge",
      glassType: "Margarita Glass",
      garnish: "Lime wheel and salt rim",
      preparationTime: "3 minutes",
      tips: [
        "Use 100% agave tequila for best results",
        "Adjust sweetness with agave syrup to taste"
      ],
      rating: 4.5,
      tags: ["Tequila", "Classic"]
    },
    {
      id: '2',
      name: "Virgin Mojito",
      description: "A refreshing non-alcoholic version of the classic Cuban cocktail",
      ingredients: [
        { name: "Fresh Mint Leaves", amount: "10", type: "garnish", essential: true },
        { name: "Fresh Lime Juice", amount: "1 oz", type: "mixer", essential: true },
        { name: "Simple Syrup", amount: "0.5 oz", type: "mixer", essential: true },
        { name: "Soda Water", amount: "4 oz", type: "mixer", essential: true }
      ],
      instructions: [
        "Muddle mint and lime juice in glass",
        "Add simple syrup and ice",
        "Top with soda water",
        "Stir gently and garnish"
      ],
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
      category: "Mocktail",
      difficulty: "Easy",
      abv: "0% ABV (Non-alcoholic)",
      servingSuggestions: "Serve in a highball glass over ice with plenty of fresh mint",
      glassType: "Highball Glass",
      garnish: "Fresh mint sprig and lime wedge",
      preparationTime: "2 minutes",
      rating: 4,
      tags: ["Non-alcoholic", "Refreshing"]
    },
    {
      id: '3',
      name: "Old Fashioned",
      description: "A whiskey classic with just the right amount of sweetness and bitterness",
      ingredients: [
        { name: "Bourbon Whiskey", amount: "2 oz", type: "alcohol", essential: true },
        { name: "Sugar Cube", amount: "1", type: "mixer", essential: true },
        { name: "Angostura Bitters", amount: "2 dashes", type: "mixer", essential: true },
        { name: "Orange Twist", amount: "1", type: "garnish", essential: true }
      ],
      instructions: [
        "Muddle sugar cube with bitters and a splash of water",
        "Add whiskey and ice",
        "Stir gently for 30 seconds",
        "Express orange twist over drink and garnish"
      ],
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
      category: "Classic Cocktail",
      difficulty: "Medium",
      abv: "30-35% ABV",
      servingSuggestions: "Serve in a rocks glass with a large ice cube",
      glassType: "Rocks Glass",
      garnish: "Orange twist and cocktail cherry",
      preparationTime: "3 minutes",
      tips: [
        "Use high-quality bourbon or rye whiskey",
        "Don't over-stir to maintain proper dilution"
      ],
      rating: 5,
      tags: ["Whiskey", "Classic"]
    },
    {
      id: '4',
      name: "Espresso Martini",
      description: "A coffee-flavored cocktail that's both energizing and delicious",
      ingredients: [
        { name: "Vodka", amount: "1.5 oz", type: "alcohol", essential: true },
        { name: "Coffee Liqueur", amount: "1 oz", type: "mixer", essential: true },
        { name: "Fresh Espresso", amount: "1 oz", type: "mixer", essential: true },
        { name: "Simple Syrup", amount: "0.5 oz", type: "mixer" },
        { name: "Coffee Beans", amount: "3", type: "garnish" }
      ],
      instructions: [
        "Chill coupe glass",
        "Combine all ingredients in shaker with ice",
        "Shake vigorously for 20 seconds",
        "Double strain into chilled glass",
        "Garnish with coffee beans"
      ],
      image: "https://images.unsplash.com/photo-1544145945-d05853753630?w=400&h=300&fit=crop",
      category: "Cocktail",
      difficulty: "Medium",
      abv: "20-25% ABV",
      servingSuggestions: "Serve immediately in a chilled coupe glass",
      glassType: "Coupe Glass",
      garnish: "Three coffee beans",
      preparationTime: "4 minutes",
      tips: [
        "Use freshly brewed espresso that's cooled slightly",
        "Shake extra hard to create the perfect foam"
      ],
      rating: 4.5,
      tags: ["Vodka", "Coffee"]
    },
    {
      id: '5',
      name: "Aperol Spritz",
      description: "The iconic Italian aperitif that's light and refreshing",
      ingredients: [
        { name: "Aperol", amount: "3 oz", type: "alcohol", essential: true },
        { name: "Prosecco", amount: "3 oz", type: "mixer", essential: true },
        { name: "Soda Water", amount: "1 oz", type: "mixer" },
        { name: "Orange Slice", amount: "1", type: "garnish", essential: true }
      ],
      instructions: [
        "Fill wine glass with ice",
        "Add Aperol first",
        "Top with Prosecco",
        "Add splash of soda water",
        "Garnish with orange slice"
      ],
      image: "https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?w=400&h=300&fit=crop",
      category: "Aperitif",
      difficulty: "Easy",
      abv: "10-12% ABV",
      servingSuggestions: "Serve in a large wine glass with plenty of ice",
      glassType: "Wine Glass",
      garnish: "Orange slice",
      preparationTime: "2 minutes",
      tips: [
        "Use well-chilled ingredients",
        "Build directly in the glass - no shaking needed"
      ],
      rating: 4,
      tags: ["Aperitif", "Italian"]
    },
    {
      id: '6',
      name: "Moscow Mule",
      description: "A refreshing vodka and ginger beer cocktail served in a copper mug",
      ingredients: [
        { name: "Vodka", amount: "2 oz", type: "alcohol", essential: true },
        { name: "Ginger Beer", amount: "4 oz", type: "mixer", essential: true },
        { name: "Lime Juice", amount: "0.5 oz", type: "mixer", essential: true },
        { name: "Lime Wedge", amount: "1", type: "garnish", essential: true }
      ],
      instructions: [
        "Fill copper mug with ice",
        "Add vodka and lime juice",
        "Top with ginger beer",
        "Stir gently",
        "Garnish with lime wedge"
      ],
      image: "https://images.unsplash.com/photo-1544145945-0110d6fc49e3?w=400&h=300&fit=crop",
      category: "Highball",
      difficulty: "Easy",
      abv: "12-15% ABV",
      servingSuggestions: "Serve in a chilled copper mug with a straw",
      glassType: "Copper Mug",
      garnish: "Lime wedge and mint sprig",
      preparationTime: "2 minutes",
      tips: [
        "Use a quality ginger beer with strong flavor",
        "The copper mug keeps the drink extra cold"
      ],
      rating: 4,
      tags: ["Vodka", "Ginger"]
    },
    {
      id: '7',
      name: "Negroni",
      description: "The perfect balance of bitter, sweet, and herbal flavors",
      ingredients: [
        { name: "Gin", amount: "1 oz", type: "alcohol", essential: true },
        { name: "Campari", amount: "1 oz", type: "mixer", essential: true },
        { name: "Sweet Vermouth", amount: "1 oz", type: "mixer", essential: true },
        { name: "Orange Twist", amount: "1", type: "garnish", essential: true }
      ],
      instructions: [
        "Combine all ingredients in mixing glass with ice",
        "Stir for 30 seconds",
        "Strain into rocks glass over large ice cube",
        "Express orange twist over drink and garnish"
      ],
      image: "https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?w=400&h=300&fit=crop",
      category: "Classic Cocktail",
      difficulty: "Medium",
      abv: "25-28% ABV",
      servingSuggestions: "Serve in a rocks glass with a single large ice cube",
      glassType: "Rocks Glass",
      garnish: "Orange twist",
      preparationTime: "3 minutes",
      tips: [
        "Use equal parts of each ingredient for perfect balance",
        "Stirring (not shaking) is essential for proper texture"
      ],
      rating: 5,
      tags: ["Gin", "Classic"]
    },
    {
      id: '8',
      name: "Whiskey Sour",
      description: "A classic cocktail balancing the sweetness of whiskey with tart lemon juice",
      ingredients: [
        { name: "Bourbon or Rye Whiskey", amount: "2 oz", type: "alcohol", essential: true },
        { name: "Fresh Lemon Juice", amount: "1 oz", type: "mixer", essential: true },
        { name: "Simple Syrup", amount: "0.75 oz", type: "mixer", essential: true },
        { name: "Egg White (optional)", amount: "1", type: "other" },
        { name: "Angostura Bitters", amount: "2 dashes", type: "mixer" },
        { name: "Lemon Slice", amount: "1", type: "garnish" },
        { name: "Maraschino Cherry", amount: "1", type: "garnish" }
      ],
      instructions: [
        "Combine whiskey, lemon juice, simple syrup, and egg white (if using) in a shaker.",
        "Dry shake (without ice) vigorously for 15 seconds to emulsify egg white.",
        "Add ice to shaker and shake again until well-chilled.",
        "Strain into a chilled coupe or rocks glass over fresh ice.",
        "Garnish with a lemon slice and a maraschino cherry, and a dash of bitters."
      ],
      image: "https://images.unsplash.com/photo-1609765279261-267923b7b252?w=400&h=300&fit=crop",
      category: "Sour Cocktail",
      difficulty: "Medium",
      abv: "20-25% ABV",
      servingSuggestions: "Serve in a chilled coupe glass (if using egg white) or a rocks glass over ice.",
      glassType: "Coupe or Rocks Glass",
      garnish: "Lemon slice and maraschino cherry",
      preparationTime: "5 minutes",
      tips: [
        "For a vegan option, use aquafaba instead of egg white.",
        "Adjust the simple syrup to your preferred sweetness.",
        "Ensure your lemon juice is freshly squeezed for the best flavor."
      ],
      rating: 4.8,
      tags: ["Whiskey", "Sour", "Classic"]
    },
    {
      id: '9',
      name: "Daiquiri",
      description: "A simple yet elegant Cuban cocktail made with rum, lime, and sugar.",
      ingredients: [
        { name: "White Rum", amount: "2 oz", type: "alcohol", essential: true },
        { name: "Fresh Lime Juice", amount: "1 oz", type: "mixer", essential: true },
        { name: "Simple Syrup", amount: "0.75 oz", type: "mixer", essential: true },
        { name: "Lime Wheel", amount: "1", type: "garnish" }
      ],
      instructions: [
        "Combine rum, lime juice, and simple syrup in a shaker with ice.",
        "Shake well until thoroughly chilled.",
        "Strain into a chilled coupe or martini glass.",
        "Garnish with a lime wheel."
      ],
      image: "https://images.unsplash.com/photo-1551021464-9f7a7f7f7f7f?w=400&h=300&fit=crop",
      category: "Sour Cocktail",
      difficulty: "Easy",
      abv: "15-20% ABV",
      servingSuggestions: "Serve in a chilled coupe glass for a sophisticated presentation.",
      glassType: "Coupe or Martini Glass",
      garnish: "Lime wheel",
      preparationTime: "3 minutes",
      tips: [
        "The key to a good Daiquiri is fresh lime juice.",
        "Adjust the simple syrup to balance the tartness of the lime."
      ],
      rating: 4.6,
      tags: ["Rum", "Classic", "Simple"]
    }
  ];

  // Filter and sort recipes
  const filteredRecipes = mockRecipes
    .filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
        recipe.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesCategory = filters.category === '' || recipe.category === filters.category;
      const matchesDifficulty = filters.difficulty === '' || recipe.difficulty === filters.difficulty;
      const matchesAbv = filters.abv === '' || recipe.abv === filters.abv;
      return matchesSearch && matchesCategory && matchesDifficulty && matchesAbv;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'difficulty') {
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      } else if (sortBy === 'abv') {
        // Simple string comparison for ABV, might need more complex logic for actual values
        comparison = a.abv.localeCompare(b.abv);
      } else if (sortBy === 'rating') {
        comparison = (a.rating || 0) - (b.rating || 0);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold text-primary">
          Explore Our Recipes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter Bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search recipes or ingredients..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <select
              className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Cocktail">Cocktail</option>
              <option value="Mocktail">Mocktail</option>
              <option value="Classic Cocktail">Classic Cocktail</option>
              <option value="Aperitif">Aperitif</option>
              <option value="Highball">Highball</option>
              <option value="Sour Cocktail">Sour Cocktail</option>
            </select>
            <select
              className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select
              className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={filters.abv}
              onChange={(e) => handleFilterChange('abv', e.target.value)}
            >
              <option value="">All ABV</option>
              <option value="0% ABV (Non-alcoholic)">Non-alcoholic</option>
              <option value="10-12% ABV">Light (10-12%)</option>
              <option value="12-15% ABV">Medium-Light (12-15%)</option>
              <option value="15-20% ABV">Medium (15-20%)</option>
              <option value="20-25% ABV">Medium-Strong (20-25%)</option>
              <option value="25-28% ABV">Strong (25-28%)</option>
              <option value="30-35% ABV">Very Strong (30-35%)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Sort By:</span>
            {['name', 'difficulty', 'abv', 'rating'].map((field) => (
              <Button
                key={field}
                variant={sortBy === field ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handleSortChange(field as typeof sortBy)}
                className="capitalize"
              >
                {field}
                {sortBy === field && (
                  sortDirection === 'asc' ? <ArrowRight className="h-3 w-3 ml-1" /> : <ArrowLeft className="h-3 w-3 ml-1" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        {currentRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <CardContent className="p-4">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h4 className="font-semibold text-base mb-1">{recipe.name}</h4>
                  <p className="text-muted-foreground text-xs line-clamp-2 mb-2">
                    {recipe.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {recipe.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {recipe.abv}
                    </Badge>
                    {recipe.rating && (
                      <Badge variant="secondary" className="text-xs flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {recipe.rating}
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-10">
            No recipes found matching your criteria. Try adjusting your filters!
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Recipe Detail Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background z-10 p-4 pb-0">
                <CardTitle className="text-xl font-bold text-primary">
                  {selectedRecipe.name}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setSelectedRecipe(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="relative">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  {selectedRecipe.rating && (
                    <div className="absolute top-2 right-2 bg-background rounded-full p-1 shadow-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-0.5">{selectedRecipe.rating}</span>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{selectedRecipe.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{selectedRecipe.difficulty}</Badge>
                  <Badge variant="outline">{selectedRecipe.abv}</Badge>
                  <Badge variant="outline">{selectedRecipe.preparationTime}</Badge>
                  {selectedRecipe.tags?.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>

                <div>
                  <h5 className="font-semibold mb-2 flex items-center gap-2 text-base">
                    <Droplet className="h-5 w-5" />
                    Ingredients
                  </h5>
                  <ul className="space-y-1 text-sm">
                    {selectedRecipe.ingredients.map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          {item.essential && (
                            <span className="text-red-500 mr-1">*</span>
                          )}
                          <span>{item.name}</span>
                        </div>
                        <span className="text-muted-foreground">{item.amount}</span>
                      </li>
                    ))}
                  </ul>
                  {selectedRecipe.ingredients.some(i => i.essential) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      * Essential ingredients
                    </p>
                  )}
                </div>

                <div>
                  <h5 className="font-semibold mb-2 flex items-center gap-2 text-base">
                    <Wine className="h-5 w-5" />
                    Serving Details
                  </h5>
                  <div className="space-y-1 text-sm">
                    <p><strong>Glass:</strong> {selectedRecipe.glassType}</p>
                    <p><strong>Garnish:</strong> {selectedRecipe.garnish}</p>
                    <p><strong>ABV:</strong> {selectedRecipe.abv}</p>
                    <p><strong>Category:</strong> {selectedRecipe.category}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-2 text-base">Instructions</h5>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    {selectedRecipe.instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                {selectedRecipe.tips && selectedRecipe.tips.length > 0 && (
                  <div>
                    <h5 className="font-semibold mb-2 text-base">Expert Tips</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {selectedRecipe.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h5 className="font-semibold mb-2 text-base">Serving Suggestions</h5>
                  <p className="text-sm text-muted-foreground">{selectedRecipe.servingSuggestions}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t mt-4">
                  <Button size="sm" variant="outline">
                    <Heart className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline">
                    Share
                  </Button>
                  <Button size="sm" className="bg-primary">
                    Start Making
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Main App Component with Tabs
const App = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Generator
          </TabsTrigger>
          <TabsTrigger value="browse" className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Browse Recipes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <AIDrinkGenerator />
        </TabsContent>
        <TabsContent value="browse">
          <RecipeBrowse />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
