
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: any) => void;
}

export const AdvancedFilters = ({ isOpen, onClose, onFiltersChange }: AdvancedFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<any>({
    dietary: "all",
    cookingTime: "all",
    difficulty: "all",
    cuisineType: "all",
    allergenFree: [],
    mealType: "all",
    religiousDiet: "all",
    healthGoal: "all"
  });

  const filterOptions = {
    dietary: ["Normal", "Healthy", "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Low-Carb", "Paleo", "Mediterranean"],
    cookingTime: ["Under 15 min", "15-30 min", "30-60 min", "1-2 hours", "Over 2 hours"],
    difficulty: ["Beginner", "Intermediate", "Expert"],
    cuisineType: [
      "Levant", "Italian", "Mexican", "Chinese", "Indian", "Japanese", "Thai", "Turkish", 
      "Syrian", "Iraqi", "Yemeni", "American", "Moroccan", "Lebanese", "German", "French",
      "Greek", "Korean", "Brazilian", "Spanish"
    ],
    allergenFree: ["Dairy", "Gluten", "Tree Nuts", "Shellfish", "Soy", "Eggs"],
    mealType: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"],
    religiousDiet: ["Halal", "Kosher"],
    healthGoal: ["Low Calorie", "Low Carb", "High Protein", "Low Fat", "Heart Healthy", "Weight Loss"]
  };

  const handleFilterChange = (category: string, value: string) => {
    const newFilters = { ...selectedFilters };
    
    if (Array.isArray(newFilters[category])) {
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter((item: string) => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
    } else {
      newFilters[category] = newFilters[category] === value ? "all" : value;
    }
    
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dietary: "all",
      cookingTime: "all",
      difficulty: "all",
      cuisineType: "all",
      allergenFree: [],
      mealType: "all",
      religiousDiet: "all",
      healthGoal: "all"
    };
    setSelectedFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    Object.values(selectedFilters).forEach(filter => {
      if (Array.isArray(filter)) {
        count += filter.length;
      } else if (filter && filter !== "all") {
        count += 1;
      }
    });
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="text-wasfah-orange" size={20} />
              Advanced Filters
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary">
                  {getActiveFiltersCount()} active
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dietary Preferences */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Dietary Preferences</label>
              <Select value={selectedFilters.dietary} onValueChange={(value) => handleFilterChange("dietary", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dietary type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All dietary types</SelectItem>
                  {filterOptions.dietary.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cooking Time */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Cooking Time</label>
              <Select value={selectedFilters.cookingTime} onValueChange={(value) => handleFilterChange("cookingTime", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cooking time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any cooking time</SelectItem>
                  {filterOptions.cookingTime.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Level */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Difficulty Level</label>
              <Select value={selectedFilters.difficulty} onValueChange={(value) => handleFilterChange("difficulty", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any difficulty</SelectItem>
                  {filterOptions.difficulty.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cuisine Type */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Cuisine Type</label>
              <Select value={selectedFilters.cuisineType} onValueChange={(value) => handleFilterChange("cuisineType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All cuisines</SelectItem>
                  {filterOptions.cuisineType.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Meal Type */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Meal Type</label>
              <Select value={selectedFilters.mealType} onValueChange={(value) => handleFilterChange("mealType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any meal type</SelectItem>
                  {filterOptions.mealType.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Religious Dietary */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Religious Dietary</label>
              <Select value={selectedFilters.religiousDiet} onValueChange={(value) => handleFilterChange("religiousDiet", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select religious diet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any religious diet</SelectItem>
                  {filterOptions.religiousDiet.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Health Goal */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Health Goals</label>
              <Select value={selectedFilters.healthGoal} onValueChange={(value) => handleFilterChange("healthGoal", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select health goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any health goal</SelectItem>
                  {filterOptions.healthGoal.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Allergen-Free Section */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Allergen-Free Options</h3>
              <ChevronDown size={16} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="flex flex-wrap gap-2">
                {filterOptions.allergenFree.map((option) => (
                  <Button
                    key={option}
                    variant={selectedFilters.allergenFree.includes(option) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("allergenFree", option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={clearAllFilters} className="flex-1">
              Clear All
            </Button>
            <Button onClick={onClose} className="flex-1 bg-gradient-to-r from-wasfah-orange to-wasfah-green">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
