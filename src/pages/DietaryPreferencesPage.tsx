
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { NutritionTip } from '@/components/nutrition/NutritionTip';

export default function DietaryPreferencesPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('diets');
  
  const dietaryPlans = [
    { id: 'vegetarian', label: 'Vegetarian', description: 'No meat, may include dairy and eggs' },
    { id: 'vegan', label: 'Vegan', description: 'No animal products at all' },
    { id: 'keto', label: 'Ketogenic', description: 'High fat, adequate protein, low carbs' },
    { id: 'paleo', label: 'Paleo', description: 'Based on foods presumed to be available to paleolithic humans' },
    { id: 'Mediterranean', label: 'Mediterranean', description: 'Plant-based foods, healthy fats, limited red meat' },
    { id: 'gluten-free', label: 'Gluten-Free', description: 'Avoids gluten, a mixture of proteins found in wheat' },
    { id: 'dairy-free', label: 'Dairy-Free', description: 'Avoids milk and ingredients derived from milk' },
    { id: 'pescatarian', label: 'Pescatarian', description: 'Vegetarian diet that includes fish' }
  ];
  
  const allergens = [
    { id: 'peanuts', label: 'Peanuts' },
    { id: 'treenuts', label: 'Tree Nuts' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'eggs', label: 'Eggs' },
    { id: 'fish', label: 'Fish' },
    { id: 'shellfish', label: 'Shellfish' },
    { id: 'soy', label: 'Soy' },
    { id: 'wheat', label: 'Wheat/Gluten' },
    { id: 'sesame', label: 'Sesame' }
  ];
  
  const [selectedDiets, setSelectedDiets] = useState(['vegetarian']);
  const [selectedAllergens, setSelectedAllergens] = useState(['shellfish']);
  const [avoidIngredients, setAvoidIngredients] = useState(['MSG']);
  
  const [newAvoidIngredient, setNewAvoidIngredient] = useState('');
  
  const handleDietToggle = (diet: string) => {
    setSelectedDiets(prev => 
      prev.includes(diet) 
        ? prev.filter(d => d !== diet) 
        : [...prev, diet]
    );
  };
  
  const handleAllergenToggle = (allergen: string) => {
    setSelectedAllergens(prev => 
      prev.includes(allergen) 
        ? prev.filter(a => a !== allergen) 
        : [...prev, allergen]
    );
  };
  
  const handleAddAvoidIngredient = () => {
    if (newAvoidIngredient && !avoidIngredients.includes(newAvoidIngredient)) {
      setAvoidIngredients([...avoidIngredients, newAvoidIngredient]);
      setNewAvoidIngredient('');
    }
  };
  
  const handleRemoveAvoidIngredient = (ingredient: string) => {
    setAvoidIngredients(prev => prev.filter(i => i !== ingredient));
  };
  
  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your dietary preferences have been updated successfully.",
    });
  };
  
  return (
    <PageContainer header={{ title: 'Dietary Preferences', showBackButton: true }}>
      <div className="space-y-6 pb-6 px-4">
        <NutritionTip 
          tip="Setting up your dietary preferences helps our AI suggest recipes that align with your needs and restrictions."
          source="Nutrition AI"
        />
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diets">Diet Plans</TabsTrigger>
            <TabsTrigger value="allergens">Allergens</TabsTrigger>
            <TabsTrigger value="avoid">Avoid List</TabsTrigger>
          </TabsList>
          
          <TabsContent value="diets" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dietary Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dietaryPlans.map(diet => (
                    <div key={diet.id} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor={diet.id} className="font-medium">{diet.label}</Label>
                        <p className="text-xs text-gray-500">{diet.description}</p>
                      </div>
                      <Switch
                        id={diet.id}
                        checked={selectedDiets.includes(diet.id)}
                        onCheckedChange={() => handleDietToggle(diet.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="allergens" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Allergens to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allergens.map(allergen => (
                    <div key={allergen.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={allergen.id}
                        checked={selectedAllergens.includes(allergen.id)}
                        onCheckedChange={() => handleAllergenToggle(allergen.id)}
                      />
                      <Label htmlFor={allergen.id} className="cursor-pointer">{allergen.label}</Label>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Recipes containing these allergens will be clearly marked with warnings.
                  For severe allergies, always double-check ingredients.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="avoid" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ingredients to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label htmlFor="avoid-ingredient" className="mb-2 block">Add ingredient to avoid:</Label>
                  <div className="flex space-x-2">
                    <input 
                      id="avoid-ingredient"
                      type="text" 
                      value={newAvoidIngredient}
                      onChange={(e) => setNewAvoidIngredient(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="e.g., Cilantro" 
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddAvoidIngredient}
                      disabled={!newAvoidIngredient}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {avoidIngredients.length > 0 ? (
                    avoidIngredients.map((ingredient, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                        <span>{ingredient}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveAvoidIngredient(ingredient)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No ingredients added yet.</p>
                  )}
                </div>
                
                <p className="text-sm text-gray-500 mt-4">
                  Add ingredients you prefer not to use in recipes. This could be due to personal taste, 
                  preference or non-severe sensitivities.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Button 
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
          onClick={handleSavePreferences}
        >
          Save Preferences
        </Button>
      </div>
    </PageContainer>
  );
}
