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
  Brain, Users, Heart, Menu, Utensils, GlassWater, 
  Camera, Upload, Mic, MicOff, X, Plus, Scan, 
  Image as ImageIcon, Check, CheckCircle2, Droplet, 
  Wine, Volume2, VolumeX, Play, Pause, SkipForward, 
  SkipBack, Timer as TimerIcon, RotateCcw, ArrowLeft, 
  ArrowRight, ChevronLeft, ChevronRight 
} from 'lucide-react';

// Enhanced recipe type with all alcohol-specific details
interface AlcoholRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: Array<{ name: string; amount: string; type: 'alcohol' | 'mixer' | 'garnish' }>;
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
}

// Enhanced AI Drink Generator Component
const AIDrinkGenerator = () => {
  const { t } = useRTL();
  const { toast } = useToast();
  const [pantryIngredients, setPantryIngredients] = useState<string[]>([]);
  const [mood, setMood] = useState('');
  const [baseAlcohol, setBaseAlcohol] = useState('');
  const [flavorProfile, setFlavorProfile] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState<AlcoholRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setIsVoiceRecording(true);

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
    if (mediaRecorder && isVoiceRecording) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsVoiceRecording(false);
    }
  };

  const processVoiceInput = async (audioBlob: Blob) => {
    // Mock voice processing - in real app, this would use speech-to-text API
    const mockIngredients = ['lime juice', 'simple syrup', 'mint leaves', 'tonic water', 'orange bitters'];
    const randomIngredient = mockIngredients[Math.floor(Math.random() * mockIngredients.length)];
    
    setPantryIngredients(prev => [...prev, randomIngredient]);
    toast({
      title: "Voice Recognized",
      description: `Added "${randomIngredient}" from voice input`,
    });
  };

  // Image scan functionality
  const handleImageScan = () => {
    setShowScanner(true);
  };

  const handleScanComplete = (result: string) => {
    setPantryIngredients(prev => [...prev, result]);
    setShowScanner(false);
    toast({
      title: "Ingredient Detected",
      description: `Added "${result}" from image scan`,
    });
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
    const mockIngredients = ['vodka', 'gin', 'rum', 'whiskey', 'tequila', 'brandy'];
    const detectedIngredient = mockIngredients[Math.floor(Math.random() * mockIngredients.length)];
    
    setPantryIngredients(prev => [...prev, detectedIngredient]);
    
    toast({
      title: "Image Processed",
      description: `Detected "${detectedIngredient}" in uploaded image`,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Load pantry ingredients (mock integration)
  const loadFromPantry = () => {
    const mockPantryItems = ['vodka', 'lime', 'cranberry juice', 'triple sec', 'simple syrup', 'mint'];
    setPantryIngredients(prev => [...prev, ...mockPantryItems.slice(0, 3)]);
    toast({
      title: "Pantry Loaded",
      description: "Added ingredients from your smart pantry",
    });
  };

  const generateDrink = async (isSurprise = false) => {
    setIsLoading(true);
    setGeneratedRecipe(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Enhanced mock recipe generation
      const mockRecipe: AlcoholRecipe = {
        id: Date.now().toString(),
        name: isSurprise ? "Midnight Sparkler" : "Custom Crafted Cocktail",
        description: "A perfectly balanced drink crafted just for you with premium ingredients and expert technique.",
        ingredients: [
          { name: "Premium Vodka", amount: "2 oz", type: "alcohol" },
          { name: "Fresh Lime Juice", amount: "0.75 oz", type: "mixer" },
          { name: "Simple Syrup", amount: "0.5 oz", type: "mixer" },
          { name: "Sparkling Water", amount: "2 oz", type: "mixer" },
          { name: "Fresh Mint Sprig", amount: "1", type: "garnish" },
          { name: "Lime Wheel", amount: "1", type: "garnish" }
        ],
        instructions: [
          "Add vodka, lime juice, and simple syrup to a cocktail shaker",
          "Fill shaker with ice and shake vigorously for 15 seconds",
          "Double strain into a chilled highball glass filled with fresh ice",
          "Top with sparkling water",
          "Gently stir to combine",
          "Garnish with fresh mint sprig and lime wheel"
        ],
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop",
        category: "Cocktail",
        difficulty: "Medium",
        abv: "15-18% ABV",
        servingSuggestions: "Serve immediately in a chilled highball glass. Best enjoyed during golden hour with light appetizers.",
        glassType: "Highball Glass",
        garnish: "Fresh mint sprig and lime wheel",
        preparationTime: "3 minutes",
        tips: [
          "Use freshly squeezed lime juice for the best flavor",
          "Chill your glass beforehand for optimal temperature",
          "Gently bruise the mint to release aromatic oils"
        ]
      };

      setGeneratedRecipe(mockRecipe);
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold text-primary">
          AI Drink Recipe Creator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enhanced Pantry Integration */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Available Ingredients</h3>
            <Button variant="outline" size="sm" onClick={loadFromPantry}>
              <Plus className="h-4 w-4 mr-2" />
              Load from Pantry
            </Button>
          </div>

          {/* Advanced Input Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleImageScan}
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Scan Ingredient</span>
              <span className="sm:hidden">Scan</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload Image</span>
              <span className="sm:hidden">Upload</span>
            </Button>
            
            <Button
              variant={isVoiceRecording ? "destructive" : "outline"}
              size="sm"
              onClick={isVoiceRecording ? stopVoiceRecording : startVoiceRecording}
              className="flex items-center gap-2"
            >
              {isVoiceRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              <span className="hidden sm:inline">
                {isVoiceRecording ? "Stop Recording" : "Voice Input"}
              </span>
              <span className="sm:hidden">
                {isVoiceRecording ? "Stop" : "Voice"}
              </span>
            </Button>
          </div>

          {/* Ingredient Tags */}
          {pantryIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {pantryIngredients.map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
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
          )}
        </div>

        {/* Recipe Preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Mood/Occasion</label>
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="">Select mood...</option>
              <option value="Relaxing">Relaxing Evening</option>
              <option value="Party">Lively Party</option>
              <option value="Romantic">Romantic Night</option>
              <option value="Celebration">Celebration</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Base Alcohol</label>
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={baseAlcohol}
              onChange={(e) => setBaseAlcohol(e.target.value)}
            >
              <option value="">Select base...</option>
              <option value="Vodka">Vodka</option>
              <option value="Gin">Gin</option>
              <option value="Rum">Rum</option>
              <option value="Whiskey">Whiskey</option>
              <option value="Tequila">Tequila</option>
              <option value="Non-alcoholic">Non-alcoholic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Flavor Profile</label>
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={flavorProfile}
              onChange={(e) => setFlavorProfile(e.target.value)}
            >
              <option value="">Select flavor...</option>
              <option value="Sweet">Sweet</option>
              <option value="Sour">Sour/Tart</option>
              <option value="Bitter">Bitter</option>
              <option value="Spicy">Spicy</option>
              <option value="Balanced">Balanced</option>
            </select>
          </div>
        </div>

        {/* Generate Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => generateDrink(false)}
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate My Drink!'}
          </Button>
          <Button
            onClick={() => generateDrink(true)}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? 'Surprising...' : 'Surprise Me!'}
          </Button>
        </div>

        {/* Generated Recipe Display */}
        {generatedRecipe && !isLoading && (
          <div className="mt-6 bg-secondary/20 p-6 rounded-xl border">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={generatedRecipe.image}
                alt={generatedRecipe.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-xl font-bold text-primary mb-2">{generatedRecipe.name}</h4>
                <p className="text-muted-foreground text-sm mb-2">{generatedRecipe.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{generatedRecipe.difficulty}</Badge>
                  <Badge variant="outline">{generatedRecipe.abv}</Badge>
                  <Badge variant="outline">{generatedRecipe.preparationTime}</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <Droplet className="h-4 w-4" />
                  Ingredients
                </h5>
                <ul className="space-y-1 text-sm">
                  {generatedRecipe.ingredients.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">{item.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <Wine className="h-4 w-4" />
                  Serving Details
                </h5>
                <div className="space-y-2 text-sm">
                  <p><strong>Glass:</strong> {generatedRecipe.glassType}</p>
                  <p><strong>Garnish:</strong> {generatedRecipe.garnish}</p>
                  <p><strong>ABV:</strong> {generatedRecipe.abv}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold mb-2">Instructions</h5>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                {generatedRecipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold mb-2">Serving Suggestions</h5>
              <p className="text-sm text-muted-foreground">{generatedRecipe.servingSuggestions}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                Save to Favorites
              </Button>
              <Button size="sm" variant="outline">
                Share Recipe
              </Button>
              <Button size="sm" className="bg-primary">
                Start Cook Mode
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
        />

        {/* Camera Scanner Modal */}
        {showScanner && (
          <MobileCameraScanner
            onScanComplete={handleScanComplete}
            onClose={() => setShowScanner(false)}
            type="ingredient"
          />
        )}
      </CardContent>
    </Card>
  );
};

// Enhanced Recipe Browsing Component
const RecipeBrowsing = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedABV, setSelectedABV] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<AlcoholRecipe | null>(null);

  const mockRecipes: AlcoholRecipe[] = [
    {
      id: '1',
      name: "Classic Margarita",
      description: "A timeless cocktail with a perfect balance of tequila, lime, and orange liqueur",
      ingredients: [
        { name: "Tequila Blanco", amount: "2 oz", type: "alcohol" },
        { name: "Fresh Lime Juice", amount: "1 oz", type: "mixer" },
        { name: "Triple Sec", amount: "0.5 oz", type: "mixer" },
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
      preparationTime: "3 minutes"
    },
    {
      id: '2',
      name: "Virgin Mojito",
      description: "A refreshing non-alcoholic version of the classic Cuban cocktail",
      ingredients: [
        { name: "Fresh Mint Leaves", amount: "10", type: "garnish" },
        { name: "Fresh Lime Juice", amount: "1 oz", type: "mixer" },
        { name: "Simple Syrup", amount: "0.5 oz", type: "mixer" },
        { name: "Soda Water", amount: "4 oz", type: "mixer" }
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
      preparationTime: "2 minutes"
    }
  ];

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    const matchesDifficulty = selectedDifficulty ? recipe.difficulty === selectedDifficulty : true;
    const matchesABV = selectedABV ? recipe.abv.includes(selectedABV) : true;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesABV;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <select
            className="p-2 border rounded-lg text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Cocktail">Cocktails</option>
            <option value="Mocktail">Mocktails</option>
            <option value="Shot">Shots</option>
          </select>
          
          <select
            className="p-2 border rounded-lg text-sm"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          
          <select
            className="p-2 border rounded-lg text-sm"
            value={selectedABV}
            onChange={(e) => setSelectedABV(e.target.value)}
          >
            <option value="">All ABV</option>
            <option value="0%">Non-alcoholic</option>
            <option value="Low">Low (5-15%)</option>
            <option value="Moderate">Moderate (15-25%)</option>
            <option value="High">High (25%+)</option>
          </select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory('');
              setSelectedDifficulty('');
              setSelectedABV('');
              setSearchTerm('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map(recipe => (
          <Card
            key={recipe.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{recipe.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {recipe.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                <Badge variant="outline" className="text-xs">{recipe.difficulty}</Badge>
                <Badge variant="outline" className="text-xs">{recipe.abv}</Badge>
              </div>
              <Button size="sm" className="w-full">
                View Recipe
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{selectedRecipe.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRecipe(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <p className="text-muted-foreground">{selectedRecipe.description}</p>
              
              <div className="flex flex-wrap gap-2">
                <Badge>{selectedRecipe.category}</Badge>
                <Badge variant="outline">{selectedRecipe.difficulty}</Badge>
                <Badge variant="outline">{selectedRecipe.abv}</Badge>
                <Badge variant="outline">{selectedRecipe.preparationTime}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <ul className="space-y-1 text-sm">
                    {selectedRecipe.ingredients.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">{item.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Serving Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Glass:</strong> {selectedRecipe.glassType}</p>
                    <p><strong>Garnish:</strong> {selectedRecipe.garnish}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Instructions</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {selectedRecipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Serving Suggestions</h4>
                <p className="text-sm text-muted-foreground">{selectedRecipe.servingSuggestions}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                <Button size="sm" variant="outline">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Favorites
                </Button>
                <Button size="sm" variant="outline">
                  Share Recipe
                </Button>
                <Button size="sm" className="bg-primary">
                  Start Cook Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Enhanced Cook Mode Component
const CookMode = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Mock recipe for cook mode
  const mockRecipe: AlcoholRecipe = {
    id: 'cook-1',
    name: "Perfect Moscow Mule",
    description: "A classic copper mug cocktail with vodka, ginger beer, and lime",
    ingredients: [
      { name: "Premium Vodka", amount: "2 oz", type: "alcohol" },
      { name: "Fresh Lime Juice", amount: "0.5 oz", type: "mixer" },
      { name: "Ginger Beer", amount: "4 oz", type: "mixer" },
      { name: "Fresh Lime Wedge", amount: "1", type: "garnish" },
      { name: "Fresh Mint Sprig", amount: "1", type: "garnish" }
    ],
    instructions: [
      "Fill copper mug with ice cubes",
      "Add vodka and fresh lime juice",
      "Top with ginger beer and stir gently",
      "Garnish with lime wedge and mint sprig",
      "Serve immediately with a copper straw"
    ],
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
    category: "Cocktail",
    difficulty: "Easy",
    abv: "12-15% ABV",
    servingSuggestions: "Best served in a traditional copper mug for optimal temperature and presentation",
    glassType: "Copper Mug",
    garnish: "Lime wedge and mint sprig",
    preparationTime: "2 minutes",
    tips: [
      "Use a copper mug for the authentic experience and optimal temperature",
      "Fresh lime juice makes all the difference",
      "Don't over-stir - gentle mixing preserves the ginger beer's fizz"
    ]
  };

  const totalSteps = mockRecipe.instructions.length;
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speakCurrentStep = () => {
    if (!synthRef.current) return;

    synthRef.current.cancel();
    
    const stepText = `Step ${currentStep + 1}: ${mockRecipe.instructions[currentStep]}`;
    const utterance = new SpeechSynthesisUtterance(stepText);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast({
        title: "Cocktail Complete! 🍹",
        description: "Your drink is ready to enjoy. Cheers!",
      });
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleIngredientCheck = (ingredient: string) => {
    setCheckedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <div className="space-y-6">
      {/* Recipe Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <img
              src={mockRecipe.image}
              alt={mockRecipe.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-primary mb-1">{mockRecipe.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">{mockRecipe.description}</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">{mockRecipe.difficulty}</Badge>
                <Badge variant="outline" className="text-xs">{mockRecipe.abv}</Badge>
                <Badge variant="outline" className="text-xs">{mockRecipe.preparationTime}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Ingredients Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ingredients Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockRecipe.ingredients.map((ingredient, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/20 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={checkedIngredients.includes(ingredient.name)}
                  onChange={() => handleIngredientCheck(ingredient.name)}
                />
                <div className="flex-1 flex justify-between items-center">
                  <span className={`text-sm ${checkedIngredients.includes(ingredient.name) ? 'line-through text-muted-foreground' : ''}`}>
                    {ingredient.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{ingredient.amount}</span>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            Step {currentStep + 1}: Current Instruction
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={speakCurrentStep}
              disabled={isSpeaking}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            {timer && (
              <Button variant="outline" size="sm">
                <TimerIcon className="h-4 w-4 mr-2" />
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed mb-4">
            {mockRecipe.instructions[currentStep]}
          </p>
          
          {mockRecipe.tips && mockRecipe.tips[currentStep] && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
              <p className="text-sm">
                <strong>Pro Tip:</strong> {mockRecipe.tips[currentStep]}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep(0)}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        
        <Button
          onClick={nextStep}
          disabled={currentStep === totalSteps - 1}
          className="flex items-center gap-2 bg-primary"
        >
          {currentStep === totalSteps - 1 ? 'Finish!' : 'Next Step'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const CommunityFeed = () => (
  <Card>
    <CardContent className="p-6 text-center">
      <Users className="w-16 h-16 mx-auto text-primary mb-4" />
      <h3 className="text-lg font-semibold mb-2">Community Creations</h3>
      <p className="text-muted-foreground mb-4">
        Discover trending drinks and share your own unique recipes!
      </p>
      <Button className="bg-primary">
        Share Your Recipe
      </Button>
    </CardContent>
  </Card>
);

const Favorites = () => (
  <Card>
    <CardContent className="p-6 text-center">
      <Heart className="w-16 h-16 mx-auto text-red-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">Your Favorite Drinks</h3>
      <p className="text-muted-foreground mb-4">
        Save recipes from AI Generator or Browse Recipes to see them here.
      </p>
      <Button className="bg-primary">
        Find New Favorites
      </Button>
    </CardContent>
  </Card>
);

const FoodPairing = () => {
  const foodPairings = [
    { drink: "Classic Margarita", food: "Tacos, Nachos, Spicy Mexican Dishes" },
    { drink: "Moscow Mule", food: "Sushi, Asian Fusion, Light Appetizers" },
    { drink: "Old Fashioned", food: "Steak, BBQ Ribs, Dark Chocolate" },
    { drink: "Mojito", food: "Cuban Sandwiches, Fresh Salads, Grilled Seafood" },
    { drink: "Gin & Tonic", food: "Mediterranean Tapas, Olives, Cured Meats" },
    { drink: "Cosmopolitan", food: "Sushi, Seafood Pasta, Goat Cheese Salad" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {foodPairings.map((pair, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <h4 className="font-semibold text-primary mb-2">{pair.drink}</h4>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Pairs well with:</span> {pair.food}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Main Component
const AlcoholRecipeAI = () => {
  const { t, direction } = useRTL();
  const [activeTab, setActiveTab] = useState<string>('ai-generator');

  return (
    <div className={`min-h-screen bg-background ${direction === 'rtl' ? 'rtl' : 'ltr'}`} dir={direction}>
      {/* Header */}
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">
              🍹 Craft Your Perfect Drink
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Generate unique recipes with AI, discover popular drinks, or master your favorite cocktails step-by-step.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Enhanced Mobile-First Tab Navigation */}
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 bg-muted p-1 h-auto">
            <TabsTrigger value="ai-generator" className="flex flex-col items-center gap-1 p-2">
              <Brain className="h-4 w-4" />
              <span className="text-xs">AI Create</span>
            </TabsTrigger>
            <TabsTrigger value="browse" className="flex flex-col items-center gap-1 p-2">
              <Menu className="h-4 w-4" />
              <span className="text-xs">Browse</span>
            </TabsTrigger>
            <TabsTrigger value="cook-mode" className="flex flex-col items-center gap-1 p-2">
              <Utensils className="h-4 w-4" />
              <span className="text-xs">Cook</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex flex-col items-center gap-1 p-2 hidden sm:flex">
              <Users className="h-4 w-4" />
              <span className="text-xs">Community</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex flex-col items-center gap-1 p-2 hidden sm:flex">
              <Heart className="h-4 w-4" />
              <span className="text-xs">Favorites</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="ai-generator">
            <AIDrinkGenerator />
          </TabsContent>

          <TabsContent value="browse">
            <RecipeBrowsing />
          </TabsContent>

          <TabsContent value="cook-mode">
            <CookMode />
          </TabsContent>

          <TabsContent value="community">
            <CommunityFeed />
          </TabsContent>

          <TabsContent value="favorites">
            <Favorites />
          </TabsContent>
        </Tabs>

        {/* Food Pairing Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-primary">
                🍽️ Perfect Food Pairings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FoodPairing />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlcoholRecipeAI;
