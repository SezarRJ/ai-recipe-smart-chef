import { useState } from "react";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarIcon, Search as SearchIcon } from "lucide-react"; // Corrected import - removed duplicate
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeSearch } from "@/components/RecipeSearch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const MealPlanning = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("plan");

  // Placeholder data for meal planning
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  const handleGenerateAIPlan = () => {
    toast({
      title: "AI Plan Generation",
      description: "This feature will be available in the premium version"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20">
      <div className="pt-4 px-4 pb-2">
        <h1 className="text-3xl font-display font-bold">{t("nav.mealPlan")}</h1>
        <p className="text-gray-600">Plan your meals for the week</p>
      </div>

      <Tabs defaultValue="plan" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="plan">Meal Plan</TabsTrigger>
            <TabsTrigger value="find">Find Recipes</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="plan" className="p-4 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <CalendarIcon className="text-wasfah-orange" />
              <h2 className="text-xl font-display font-semibold">This Week's Plan</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-3 text-left"></th>
                    {daysOfWeek.map(day => (
                      <th key={day} className="py-2 px-3 text-left text-sm font-medium">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mealTypes.map(mealType => (
                    <tr key={mealType} className="border-b">
                      <td className="py-2 px-3 font-medium text-sm">{mealType}</td>
                      {daysOfWeek.map(day => (
                        <td key={`${mealType}-${day}`} className="py-2 px-3">
                          <div className="bg-gray-100 rounded-lg p-2 text-xs h-16 flex items-center justify-center text-center">
                            Tap to add {mealType}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Button
            onClick={handleGenerateAIPlan}
            className="w-full bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white py-3 rounded-xl font-semibold"
          >
            Generate AI Meal Plan
          </Button>
        </TabsContent>

        <TabsContent value="find" className="p-4">
          <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <div className="flex items-center space-x-2 mb-4">
              <SearchIcon className="text-wasfah-orange" />
              <h2 className="text-xl font-display font-semibold">AI Recipe Search</h2>
            </div>

            <RecipeSearch />
          </div>
        </TabsContent>
      </Tabs>

      <MobileNavigation />
    </div>
  );
};

export default MealPlanning;
