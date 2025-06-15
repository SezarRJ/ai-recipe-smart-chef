import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';
import { usePantry } from '@/hooks/usePantry';
import { IngredientInputHub } from '@/components/ingredients/IngredientInputHub';
import {
  Brain, Utensils, GlassWater, Camera, Upload, Mic, MicOff, X, Plus, 
  Scan, Check, CheckCircle2, Droplet, Wine, Volume2, VolumeX, Play, Pause, 
  SkipForward, SkipBack, Timer as TimerIcon, RotateCcw, ArrowLeft, ArrowRight, 
  ChevronLeft, ChevronRight, Heart, Star, Search, Package, Users, Share2,
  Clock, ChefHat, Sparkles, Volume1, PlayCircle, PauseCircle
} from 'lucide-react';

// Enhanced recipe type
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
  foodPairings?: string[];
}

// Enhanced AI Drink Generator Component
const AIDrinkGenerator = () => {
  const { t } = useRTL();
  const { toast } = useToast();
  const { pantryItems } = usePantry();
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

  // Add ingredient from pantry
  const addFromPantry = (ingredient: string) => {
    if (!pantryIngredients.includes(ingredient)) {
      setPantryIngredients(prev => [...prev, ingredient]);
      toast({
        title: "Added from Pantry",
        description: `${ingredient} added to your ingredients`,
      });
    }
  };

  // Remove ingredient
  const removeIngredient = (ingredient: string) => {
    setPantryIngredients(prev => prev.filter(item => item !== ingredient));
  };

  // Enhanced recipe generation
  const generateDrink = async (isSurprise = false) => {
    setIsLoading(true);
    setGeneratedRecipe(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockRecipe: AlcoholRecipe = {
        id: Date.now().toString(),
        name: isSurprise ? "Sunset Spritz" : "Custom Craft Cocktail",
        description: "A refreshing cocktail with balanced flavors and elegant presentation",
        ingredients: [
          { name: "Vodka", amount: "2 oz", type: "alcohol", essential: true },
          { name: "Fresh Lime Juice", amount: "0.75 oz", type: "mixer", essential: true },
          { name: "Simple Syrup", amount: "0.5 oz", type: "mixer" },
          { name: "Soda Water", amount: "2 oz", type: "mixer" },
          { name: "Lime Wheel", amount: "1", type: "garnish" },
          { name: "Fresh Mint", amount: "3 leaves", type: "garnish" }
        ],
        instructions: [
          "Chill your serving glass with ice",
          "Add vodka and lime juice to shaker with ice",
          "Shake vigorously for 15 seconds",
          "Strain into chilled glass over fresh ice",
          "Top with soda water and gently stir",
          "Garnish with lime wheel and mint leaves"
        ],
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop",
        category: "Refreshing Cocktail",
        difficulty: "Medium",
        abv: "15-18% ABV",
        servingSuggestions: "Serve in a highball glass over ice, best enjoyed immediately while chilled",
        glassType: "Highball Glass",
        garnish: "Lime wheel and fresh mint sprig",
        preparationTime: "3 minutes",
        tips: [
          "Use fresh lime juice for best flavor",
          "Chill all ingredients beforehand",
          "Don't over-dilute with ice"
        ],
        rating: 4.5,
        tags: ["Refreshing", "Citrus", "Light"],
        foodPairings: [
          "Grilled seafood",
          "Light appetizers", 
          "Fresh salads",
          "Cheese and crackers"
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
    <div className="space-y-6">
      {/* Pantry Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="h-5 w-5" />
            Select from Pantry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {pantryItems.slice(0, 6).map((item) => (
              <Button
                key={item.id}
                variant="outline"
                size="sm"
                onClick={() => addFromPantry(item.name)}
                className="h-auto p-3 text-left flex flex-col items-start"
              >
                <span className="font-medium text-xs">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.quantity} {item.unit}</span>
              </Button>
            ))}
          </div>
          
          <IngredientInputHub
            ingredients={pantryIngredients}
            onAddIngredient={addFromPantry}
            onRemoveIngredient={removeIngredient}
            placeholder="Add cocktail ingredients..."
          />
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Drink Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Base Spirit</label>
              <select
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={preferences.baseAlcohol}
                onChange={(e) => setPreferences(prev => ({ ...prev, baseAlcohol: e.target.value }))}
              >
                <option value="">Select base...</option>
                <option value="Vodka">Vodka</option>
                <option value="Gin">Gin</option>
                <option value="Rum">Rum</option>
                <option value="Whiskey">Whiskey</option>
                <option value="Tequila">Tequila</option>
                <option value="Brandy">Brandy</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Flavor Profile</label>
              <select
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={preferences.flavorProfile}
                onChange={(e) => setPreferences(prev => ({ ...prev, flavorProfile: e.target.value }))}
              >
                <option value="">Select flavor...</option>
                <option value="Sweet">Sweet</option>
                <option value="Sour">Sour/Tart</option>
                <option value="Bitter">Bitter</option>
                <option value="Spicy">Spicy</option>
                <option value="Herbal">Herbal</option>
                <option value="Fruity">Fruity</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Strength</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={preferences.strength}
                onChange={(e) => setPreferences(prev => ({ ...prev, strength: e.target.value }))}
              >
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="strong">Strong</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Temperature</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={preferences.temperature}
                onChange={(e) => setPreferences(prev => ({ ...prev, temperature: e.target.value }))}
              >
                <option value="chilled">Chilled</option>
                <option value="room-temp">Room Temp</option>
                <option value="hot">Hot</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button
          onClick={() => generateDrink(false)}
          className="h-12 bg-primary hover:bg-primary/90"
          disabled={isLoading || pantryIngredients.length === 0}
        >
          {isLoading ? (
            <>
              <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
              Crafting...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Generate My Drink
            </>
          )}
        </Button>
        <Button
          onClick={() => generateDrink(true)}
          variant="outline"
          className="h-12"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
              Surprising...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Surprise Me!
            </>
          )}
        </Button>
      </div>

      {/* Generated Recipe */}
      {generatedRecipe && (
        <Card className="bg-gradient-to-r from-orange-50 to-pink-50 border-2 border-primary/20">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <img
                src={generatedRecipe.image}
                alt={generatedRecipe.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-primary mb-2">{generatedRecipe.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{generatedRecipe.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{generatedRecipe.difficulty}</Badge>
                  <Badge variant="outline">{generatedRecipe.abv}</Badge>
                  <Badge variant="outline">{generatedRecipe.preparationTime}</Badge>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              <Button size="sm" variant="outline">
                <Heart className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button size="sm" className="bg-primary">
                <PlayCircle className="h-4 w-4 mr-1" />
                Start Making
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Cook Mode Component
const CookMode = ({ recipe }: { recipe: AlcoholRecipe }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const speakInstruction = (text: string) => {
    if ('speechSynthesis' in window && isVoiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const nextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      speakInstruction(recipe.instructions[newStep]);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      speakInstruction(recipe.instructions[newStep]);
    }
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    toast({
      title: isVoiceEnabled ? "Voice Disabled" : "Voice Enabled",
      description: isVoiceEnabled ? "Voice instructions turned off" : "Voice instructions turned on",
    });
  };

  useEffect(() => {
    if (isVoiceEnabled && currentStep === 0) {
      speakInstruction(`Starting to make ${recipe.name}. ${recipe.instructions[0]}`);
    }
  }, [isVoiceEnabled]);

  return (
    <div className="space-y-6">
      {/* Recipe Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold">{recipe.name}</h3>
              <p className="text-sm text-muted-foreground">{recipe.preparationTime} • {recipe.difficulty}</p>
            </div>
            <Button
              variant={isVoiceEnabled ? "default" : "outline"}
              size="sm"
              onClick={toggleVoice}
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Step {currentStep + 1} of {recipe.instructions.length}</span>
              <span>{Math.round(((currentStep + 1) / recipe.instructions.length) * 100)}%</span>
            </div>
            <Progress value={((currentStep + 1) / recipe.instructions.length) * 100} />
          </div>
        </CardContent>
      </Card>

      {/* Current Instruction */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              {currentStep + 1}
            </div>
            <h4 className="text-lg font-semibold">Current Step</h4>
          </div>
          
          <p className="text-lg leading-relaxed mb-6 p-4 bg-white rounded-lg border-l-4 border-primary">
            {recipe.instructions[currentStep]}
          </p>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={() => speakInstruction(recipe.instructions[currentStep])}
              variant="outline"
              disabled={!isVoiceEnabled}
            >
              <Volume1 className="h-4 w-4 mr-2" />
              Repeat
            </Button>

            <Button
              onClick={nextStep}
              disabled={currentStep === recipe.instructions.length - 1}
              className="bg-primary"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ingredients Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Ingredients Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  checkedIngredients.has(index) 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
                onClick={() => toggleIngredient(index)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    checkedIngredients.has(index) 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300'
                  }`}>
                    {checkedIngredients.has(index) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className={checkedIngredients.has(index) ? 'line-through text-muted-foreground' : ''}>
                    {ingredient.name}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{ingredient.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Serving Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GlassWater className="h-5 w-5" />
            Serving & Pairing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h5 className="font-semibold mb-2">Serving Suggestions</h5>
            <p className="text-sm text-muted-foreground">{recipe.servingSuggestions}</p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-2">Food Pairings</h5>
            <div className="flex flex-wrap gap-2">
              {recipe.foodPairings?.map((pairing, index) => (
                <Badge key={index} variant="secondary">{pairing}</Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Glass:</span> {recipe.glassType}
            </div>
            <div>
              <span className="font-medium">ABV:</span> {recipe.abv}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main App Component
const AlcoholRecipeAI = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<AlcoholRecipe | null>(null);
  const [cookModeRecipe, setCookModeRecipe] = useState<AlcoholRecipe | null>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (cookModeRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-4">
        {/* Back Button */}
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setCookModeRecipe(null)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Cook Mode
            </Button>
            <h1 className="text-2xl font-bold">Cook Mode</h1>
          </div>
          <CookMode recipe={cookModeRecipe} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button for /alcohol-drinks */}
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Back"
            onClick={handleBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left h-5 w-5"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            <span className="ml-2 hidden sm:inline font-medium">Back</span>
          </Button>
          <h1 className="text-xl font-bold text-primary">Alcohol Drinks AI</h1>
        </div>
        {/* Existing Content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            AI Mixology Assistant
          </h1>
          <p className="text-muted-foreground">
            Create perfect cocktails with AI-powered recipes and guidance
          </p>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">AI Generator</span>
              <span className="sm:hidden">Create</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Community</span>
              <span className="sm:hidden">Share</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
              <span className="sm:hidden">Saved</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <AIDrinkGenerator />
          </TabsContent>

          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Recipes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Connect with other mixologists and share your creations</p>
                  <Button className="mt-4">Join Community</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Your Favorite Recipes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Save your favorite cocktail recipes here</p>
                  <Button variant="outline" className="mt-4">Browse Recipes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AlcoholRecipeAI;
