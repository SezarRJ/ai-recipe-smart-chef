
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Recipe } from "@/types/index";
import { VoiceRecipeAssistant } from "@/components/ai/VoiceRecipeAssistant";
import { TimerOverlay } from "@/components/recipe/TimerOverlay";

const CookingMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    // Simulate fetching recipe data
    setTimeout(() => {
      setRecipe({
        id: id || '1',
        title: "Mediterranean Chickpea Salad",
        description: "A fresh and healthy Mediterranean-style chickpea salad",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        prepTime: 15,
        prep_time: 15,
        cookTime: 0,
        cook_time: 0,
        servings: 4,
        difficulty: "Easy",
        cuisineType: "Mediterranean",
        cuisine_type: "Mediterranean",
        calories: 320,
        rating: 4.5,
        ratingCount: 128,
        instructions: [
          "Drain and rinse the chickpeas thoroughly in cold water",
          "Dice the cucumber, tomatoes, and red onion into small pieces",
          "Combine all vegetables in a large mixing bowl",
          "Whisk together olive oil, lemon juice, salt, and pepper",
          "Pour dressing over salad and toss gently to combine",
          "Crumble feta cheese on top and add fresh herbs",
          "Let salad rest for 10 minutes to allow flavors to meld",
          "Serve immediately or chill for up to 2 hours before serving"
        ],
        ingredients: [
          { id: "1", name: "Chickpeas", amount: 2, unit: "cans" },
          { id: "2", name: "Cucumber", amount: 1, unit: "large" },
          { id: "3", name: "Tomatoes", amount: 2, unit: "medium" },
          { id: "4", name: "Red onion", amount: 0.5, unit: "small" },
          { id: "5", name: "Olive oil", amount: 3, unit: "tablespoons" },
          { id: "6", name: "Lemon juice", amount: 2, unit: "tablespoons" },
          { id: "7", name: "Feta cheese", amount: 100, unit: "grams" },
          { id: "8", name: "Fresh parsley", amount: 0.25, unit: "cup" }
        ],
        categories: [],
        tags: ["Mediterranean", "Healthy", "Vegetarian"],
        isFavorite: false,
        status: "published" as const,
        author_id: "chef-1",
        is_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleCloseCooking = () => {
    navigate(`/recipe/${id}`);
  };

  const handleNextStep = () => {
    if (recipe && currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wasfah-orange mx-auto"></div>
          <p className="text-gray-600">Loading cooking mode...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Recipe Not Found</h1>
          <p className="text-gray-600">The recipe you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/recipes")}>
            Back to Recipes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleCloseCooking}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Exit Cooking Mode
          </Button>
          <h1 className="text-2xl font-bold text-center flex-1">{recipe.title}</h1>
          <div className="w-32" />
        </div>

        {/* Voice Recipe Assistant */}
        <VoiceRecipeAssistant 
          recipe={recipe} 
          onStepChange={handleStepChange}
        />

        {/* Current Step Display */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Step {currentStep + 1} of {recipe.instructions.length}</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAutoMode(!isAutoMode)}
              >
                {isAutoMode ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isAutoMode ? 'Pause Auto' : 'Auto Mode'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTimer(true)}
              >
                Timer
              </Button>
            </div>
          </div>
          
          <div className="text-lg leading-relaxed mb-6 p-4 bg-gray-50 rounded-lg">
            {recipe.instructions[currentStep]}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous Step</span>
            </Button>

            <div className="text-sm text-gray-600">
              Progress: {Math.round(((currentStep + 1) / recipe.instructions.length) * 100)}%
            </div>

            <Button
              onClick={handleNextStep}
              disabled={currentStep === recipe.instructions.length - 1}
              className="flex items-center space-x-2 bg-wasfah-bright-teal hover:bg-wasfah-teal"
            >
              <span>Next Step</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Step Progress Indicator */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex space-x-2 overflow-x-auto">
            {recipe.instructions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition-colors ${
                  index === currentStep
                    ? 'bg-wasfah-bright-teal text-white'
                    : index < currentStep
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients Reference */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Ingredients Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{ingredient.name}</span>
                <span className="text-sm text-gray-600">{ingredient.amount} {ingredient.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timer Overlay */}
        <TimerOverlay
          isOpen={showTimer}
          onClose={() => setShowTimer(false)}
          initialMinutes={5}
          stepDescription={`Step ${currentStep + 1}: ${recipe.instructions[currentStep]}`}
        />
      </div>
    </div>
  );
};

export default CookingMode;
