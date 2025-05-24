
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, ArrowUp, Check, Clock, Pause, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CookingMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching recipe data
    setTimeout(() => {
      setRecipe({
        id: id,
        title: "Mediterranean Chickpea Salad",
        instructions: [
          { step: "Drain and rinse the chickpeas", time: 2 },
          { step: "Dice the cucumber, tomatoes, and red onion", time: 5 },
          { step: "Combine all vegetables in a large bowl", time: 2 },
          { step: "Whisk together olive oil and lemon juice", time: 1 },
          { step: "Pour dressing over salad and toss", time: 1 },
          { step: "Crumble feta cheese on top", time: 1 },
          { step: "Serve immediately or chill for 30 minutes", time: 30 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => {
          if (timer <= 1) {
            setIsTimerRunning(false);
            toast({
              title: "Timer finished!",
              description: "Time to move to the next step",
            });
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  const nextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
      resetTimer();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      resetTimer();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinishCooking = () => {
    toast({
      title: "Congratulations!",
      description: "You've completed the recipe! How did it turn out?",
    });
    navigate(`/recipe/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wasfah-orange"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h1>
          <Button onClick={() => navigate("/explore")}>Back to Explore</Button>
        </div>
      </div>
    );
  }

  const currentInstruction = recipe.instructions[currentStep];
  const isLastStep = currentStep === recipe.instructions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <div className="text-center">
            <h1 className="font-semibold">{recipe.title}</h1>
            <p className="text-sm text-gray-600">
              Step {currentStep + 1} of {recipe.instructions.length}
            </p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-wasfah-orange to-wasfah-green h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / recipe.instructions.length) * 100}%` }}
          ></div>
        </div>

        {/* Timer */}
        {timer > 0 && (
          <Card className="bg-wasfah-orange/10 border-wasfah-orange/20">
            <CardContent className="p-4">
              <div className="text-center">
                <Clock className="mx-auto mb-2 text-wasfah-orange" size={24} />
                <div className="text-2xl font-bold text-wasfah-orange mb-2">
                  {formatTime(timer)}
                </div>
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleTimer}
                    className="border-wasfah-orange text-wasfah-orange"
                  >
                    {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={resetTimer}
                    className="border-wasfah-orange text-wasfah-orange"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Step */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">{currentStep + 1}</span>
              </div>
              
              <h2 className="text-xl font-semibold leading-relaxed">
                {currentInstruction.step}
              </h2>
              
              {currentInstruction.time > 0 && (
                <div className="flex justify-center">
                  <Button
                    onClick={() => startTimer(currentInstruction.time)}
                    className="bg-wasfah-orange hover:bg-wasfah-orange/90"
                    disabled={timer > 0}
                  >
                    <Clock className="mr-2" size={16} />
                    Set Timer ({currentInstruction.time} min)
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="space-y-3">
          {isLastStep ? (
            <Button
              onClick={handleFinishCooking}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              <Check className="mr-2" size={16} />
              Finish Cooking
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="w-full bg-gradient-to-r from-wasfah-orange to-wasfah-green"
            >
              Next Step
              <ArrowRight className="ml-2" size={16} />
            </Button>
          )}
          
          {currentStep > 0 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="mr-2" size={16} />
              Previous Step
            </Button>
          )}
        </div>

        {/* Step Overview */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">All Steps</h3>
            <div className="space-y-2">
              {recipe.instructions.map((instruction: any, index: number) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded ${
                    index === currentStep ? 'bg-wasfah-orange/10' : 
                    index < currentStep ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === currentStep ? 'bg-wasfah-orange text-white' :
                    index < currentStep ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index < currentStep ? <Check size={12} /> : index + 1}
                  </div>
                  <span className={`text-sm ${
                    index === currentStep ? 'font-medium' : 
                    index < currentStep ? 'text-gray-600 line-through' : 'text-gray-600'
                  }`}>
                    {instruction.step}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookingMode;
