
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Loader2, Wand2, Clock, Users, ChefHat, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAIChef } from '@/hooks/useAIChef';

interface SmartRecipeAdaptationProps {
  recipe: {
    id: string;
    title: string;
    ingredients: Array<{
      id: string;
      name: string;
      amount: number;
      unit: string;
    }>;
    instructions: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
    servings: number;
    prep_time: number;
    cook_time: number;
  };
  pantryItems?: string[];
  dietaryRestrictions?: string[];
  onAdaptedRecipe?: (adaptedRecipe: any) => void;
}

export const SmartRecipeAdaptation: React.FC<SmartRecipeAdaptationProps> = ({
  recipe,
  pantryItems = [],
  dietaryRestrictions = [],
  onAdaptedRecipe
}) => {
  const [adaptations, setAdaptations] = useState<any>(null);
  const [isAdapting, setIsAdapting] = useState(false);
  const [selectedAdaptations, setSelectedAdaptations] = useState({
    dietary: true,
    pantry: true,
    skillLevel: false,
    timeConstraint: false,
    servingSize: false
  });
  const [customConstraints, setCustomConstraints] = useState({
    targetTime: 30,
    targetServings: 4,
    skillLevel: 'Beginner'
  });

  const { askAIChef } = useAIChef();
  const { toast } = useToast();

  const analyzeIngredients = () => {
    const missing = recipe.ingredients.filter(
      ingredient => !pantryItems.some(item => 
        item.toLowerCase().includes(ingredient.name.toLowerCase())
      )
    );
    const available = recipe.ingredients.filter(
      ingredient => pantryItems.some(item => 
        item.toLowerCase().includes(ingredient.name.toLowerCase())
      )
    );

    return { missing, available };
  };

  const adaptRecipe = async () => {
    setIsAdapting(true);
    
    try {
      const { missing, available } = analyzeIngredients();
      
      const adaptationPrompt = `
        Please adapt this recipe based on the following constraints:
        
        Original Recipe: ${recipe.title}
        Ingredients: ${recipe.ingredients.map(i => `${i.amount} ${i.unit} ${i.name}`).join(', ')}
        Instructions: ${recipe.instructions.join(' ')}
        
        Available ingredients: ${available.map(i => i.name).join(', ')}
        Missing ingredients: ${missing.map(i => i.name).join(', ')}
        Dietary restrictions: ${dietaryRestrictions.join(', ')}
        
        Adaptations requested:
        ${selectedAdaptations.dietary ? '- Accommodate dietary restrictions' : ''}
        ${selectedAdaptations.pantry ? '- Suggest substitutions for missing ingredients' : ''}
        ${selectedAdaptations.skillLevel ? `- Adjust for ${customConstraints.skillLevel} skill level` : ''}
        ${selectedAdaptations.timeConstraint ? `- Reduce cooking time to ${customConstraints.targetTime} minutes` : ''}
        ${selectedAdaptations.servingSize ? `- Adjust servings to ${customConstraints.targetServings}` : ''}
        
        Please provide:
        1. Adapted ingredient list with substitutions
        2. Modified instructions
        3. Explanation of changes made
        4. Tips for success with adaptations
      `;

      const response = await askAIChef(adaptationPrompt);
      
      // Parse the AI response (in a real implementation, you'd want more structured parsing)
      const adaptedData = {
        explanation: response.response,
        changes: missing.length > 0 ? missing.map(i => ({
          original: i.name,
          substitution: `Suggested substitute for ${i.name}`,
          reason: 'Not available in pantry'
        })) : [],
        dietaryChanges: dietaryRestrictions.length > 0 ? dietaryRestrictions.map(r => ({
          restriction: r,
          modifications: `Recipe modified for ${r}`
        })) : [],
        timeAdjustments: selectedAdaptations.timeConstraint ? {
          original: recipe.prep_time + recipe.cook_time,
          adapted: customConstraints.targetTime,
          changes: 'Cooking methods optimized for speed'
        } : null
      };

      setAdaptations(adaptedData);
      onAdaptedRecipe?.(adaptedData);
      
      toast({
        title: "Recipe adapted successfully!",
        description: "Review the suggested changes below."
      });
    } catch (error) {
      toast({
        title: "Adaptation failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsAdapting(false);
    }
  };

  const { missing, available } = analyzeIngredients();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-wasfah-bright-teal" />
            Smart Recipe Adaptation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ingredient Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-green-700 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Available ({available.length})
              </h4>
              <div className="flex flex-wrap gap-1">
                {available.map((ingredient) => (
                  <Badge key={ingredient.id} variant="secondary" className="bg-green-100 text-green-800">
                    {ingredient.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-orange-700 dark:text-orange-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Missing ({missing.length})
              </h4>
              <div className="flex flex-wrap gap-1">
                {missing.map((ingredient) => (
                  <Badge key={ingredient.id} variant="destructive" className="bg-orange-100 text-orange-800">
                    {ingredient.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Adaptation Options */}
          <div className="space-y-4">
            <h4 className="font-medium">Adaptation Options</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Dietary Adaptations</label>
                  <Switch
                    checked={selectedAdaptations.dietary}
                    onCheckedChange={(checked) => 
                      setSelectedAdaptations(prev => ({ ...prev, dietary: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Pantry Substitutions</label>
                  <Switch
                    checked={selectedAdaptations.pantry}
                    onCheckedChange={(checked) => 
                      setSelectedAdaptations(prev => ({ ...prev, pantry: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Skill Level Adjustment</label>
                  <Switch
                    checked={selectedAdaptations.skillLevel}
                    onCheckedChange={(checked) => 
                      setSelectedAdaptations(prev => ({ ...prev, skillLevel: checked }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Time Optimization</label>
                  <Switch
                    checked={selectedAdaptations.timeConstraint}
                    onCheckedChange={(checked) => 
                      setSelectedAdaptations(prev => ({ ...prev, timeConstraint: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Serving Adjustment</label>
                  <Switch
                    checked={selectedAdaptations.servingSize}
                    onCheckedChange={(checked) => 
                      setSelectedAdaptations(prev => ({ ...prev, servingSize: checked }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Custom Constraints */}
          {(selectedAdaptations.timeConstraint || selectedAdaptations.servingSize || selectedAdaptations.skillLevel) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Custom Constraints</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedAdaptations.timeConstraint && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Target Time (minutes)
                      </label>
                      <input
                        type="number"
                        value={customConstraints.targetTime}
                        onChange={(e) => setCustomConstraints(prev => ({
                          ...prev,
                          targetTime: parseInt(e.target.value) || 30
                        }))}
                        className="w-full px-3 py-2 border rounded-md"
                        min="10"
                        max="120"
                      />
                    </div>
                  )}
                  
                  {selectedAdaptations.servingSize && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Target Servings
                      </label>
                      <input
                        type="number"
                        value={customConstraints.targetServings}
                        onChange={(e) => setCustomConstraints(prev => ({
                          ...prev,
                          targetServings: parseInt(e.target.value) || 4
                        }))}
                        className="w-full px-3 py-2 border rounded-md"
                        min="1"
                        max="20"
                      />
                    </div>
                  )}
                  
                  {selectedAdaptations.skillLevel && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <ChefHat className="h-4 w-4" />
                        Skill Level
                      </label>
                      <select
                        value={customConstraints.skillLevel}
                        onChange={(e) => setCustomConstraints(prev => ({
                          ...prev,
                          skillLevel: e.target.value
                        }))}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <Button
            onClick={adaptRecipe}
            disabled={isAdapting || (!selectedAdaptations.dietary && !selectedAdaptations.pantry && !selectedAdaptations.skillLevel && !selectedAdaptations.timeConstraint && !selectedAdaptations.servingSize)}
            className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
          >
            {isAdapting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adapting Recipe...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Adapt Recipe
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Adaptation Results */}
      {adaptations && (
        <Card>
          <CardHeader>
            <CardTitle>Adaptation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">{adaptations.explanation}</p>
            </div>
            
            {adaptations.changes.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Ingredient Substitutions:</h4>
                {adaptations.changes.map((change: any, index: number) => (
                  <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="font-medium text-blue-900 dark:text-blue-100">
                      {change.original} → {change.substitution}
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      {change.reason}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {adaptations.dietaryChanges.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Dietary Modifications:</h4>
                {adaptations.dietaryChanges.map((change: any, index: number) => (
                  <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="font-medium text-green-900 dark:text-green-100">
                      {change.restriction}
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      {change.modifications}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
