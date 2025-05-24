
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, X, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: any) => void;
}

export const AdvancedFilters = ({ isOpen, onClose, onFiltersChange }: AdvancedFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<any>({
    dietary: [],
    cookingTime: "",
    difficulty: "",
    cuisine: "",
    allergens: [],
    mealType: "",
    religious: [],
    healthGoals: []
  });

  const filterOptions = {
    dietary: ["Vegetarian", "Vegan", "Keto", "Paleo", "Mediterranean", "Gluten-Free", "Dairy-Free"],
    cookingTime: ["Under 15 min", "15-30 min", "30-60 min", "1-2 hours", "Over 2 hours"],
    difficulty: ["Easy", "Medium", "Hard", "Expert"],
    cuisine: ["Italian", "Chinese", "Mexican", "Indian", "Japanese", "French", "Thai", "Greek", "Turkish", "Lebanese", "Moroccan", "Korean", "Brazilian", "Spanish", "American"],
    allergens: ["Nut-Free", "Shellfish-Free", "Egg-Free", "Soy-Free", "Fish-Free"],
    mealType: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Appetizer"],
    religious: ["Halal", "Kosher", "Hindu Vegetarian", "Jain Vegetarian"],
    healthGoals: ["Weight Loss", "Muscle Gain", "Heart Healthy", "Low Sodium", "High Protein", "Low Carb", "High Fiber"]
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
      newFilters[category] = newFilters[category] === value ? "" : value;
    }
    
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dietary: [],
      cookingTime: "",
      difficulty: "",
      cuisine: "",
      allergens: [],
      mealType: "",
      religious: [],
      healthGoals: []
    };
    setSelectedFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    Object.values(selectedFilters).forEach(filter => {
      if (Array.isArray(filter)) {
        count += filter.length;
      } else if (filter) {
        count += 1;
      }
    });
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
          {/* Dietary Preferences */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Dietary Preferences</h3>
              <ChevronDown size={16} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="flex flex-wrap gap-2">
                {filterOptions.dietary.map((option) => (
                  <Button
                    key={option}
                    variant={selectedFilters.dietary.includes(option) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("dietary", option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Cooking Time */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Cooking Time</h3>
              <ChevronDown size={16} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="flex flex-wrap gap-2">
                {filterOptions.cookingTime.map((option) => (
                  <Button
                    key={option}
                    variant={selectedFilters.cookingTime === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("cookingTime", option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Difficulty Level */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Difficulty Level</h3>
              <ChevronDown size={16} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="flex flex-wrap gap-2">
                {filterOptions.difficulty.map((option) => (
                  <Button
                    key={option}
                    variant={selectedFilters.difficulty === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("difficulty", option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Cuisine Country */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Cuisine Country</h3>
              <ChevronDown size={16} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="flex flex-wrap gap-2">
                {filterOptions.cuisine.map((option) => (
                  <Button
                    key={option}
                    variant={selectedFilters.cuisine === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("cuisine", option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Allergen-Free */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Allergen-Free</h3>
              <ChevronDown size={16} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="flex flex-wrap gap-2">
                {filterOptions.allergens.map((option) => (
                  <Button
                    key={option}
                    variant={selectedFilters.allergens.includes(option) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("allergens", option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Meal Type */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Meal Type</h3>
              <ChevronDown size={16} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="flex flex-wrap gap-2">
                {filterOptions.mealType.map((option) => (
                  <Button
                    key={option}
                    variant={selectedFilters.mealType === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("mealType", option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Religious Dietary Restrictions */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Religious Dietary</h3>
              <ChevronDown size={16} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="flex flex-wrap gap-2">
                {filterOptions.religious.map((option) => (
                  <Button
                    key={option}
                    variant={selectedFilters.religious.includes(option) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("religious", option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Health Goals */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Health Goals</h3>
              <ChevronDown size={16} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="flex flex-wrap gap-2">
                {filterOptions.healthGoals.map((option) => (
                  <Button
                    key={option}
                    variant={selectedFilters.healthGoals.includes(option) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("healthGoals", option)}
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
