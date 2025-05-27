
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, ArrowRight, Leaf, CircleDashed, AlertCircle, CheckCircle2, CircleMinus 
} from 'lucide-react';

// Sample data for ingredient swaps
const swapSuggestions = [
  {
    id: '1',
    name: 'Butter',
    alternatives: [
      {
        name: 'Olive Oil',
        benefits: ['Heart Healthy', 'Lower Saturated Fat'],
        impact: { calories: -15, fat: -5, saturatedFat: -8 },
        suitability: ['Vegan', 'Dairy-Free']
      },
      {
        name: 'Coconut Oil',
        benefits: ['MCT Content', 'Heat Stable'],
        impact: { calories: -5, fat: 0, saturatedFat: +2 },
        suitability: ['Vegan', 'Dairy-Free']
      },
      {
        name: 'Avocado',
        benefits: ['Heart Healthy', 'Added Nutrients'],
        impact: { calories: -10, fat: -3, saturatedFat: -7 },
        suitability: ['Vegan', 'Dairy-Free']
      }
    ]
  },
  {
    id: '2',
    name: 'White Sugar',
    alternatives: [
      {
        name: 'Honey',
        benefits: ['Natural Sweetener', 'Contains Minerals'],
        impact: { calories: -5, sugar: -3, glycemicIndex: -10 },
        suitability: ['Natural', 'Less Processed']
      },
      {
        name: 'Maple Syrup',
        benefits: ['Contains Antioxidants', 'Lower GI'],
        impact: { calories: -5, sugar: -3, glycemicIndex: -15 },
        suitability: ['Vegan', 'Natural']
      },
      {
        name: 'Stevia',
        benefits: ['Zero Calories', 'No Sugar'],
        impact: { calories: -50, sugar: -12, glycemicIndex: -50 },
        suitability: ['Diabetic-Friendly', 'Keto']
      }
    ]
  }
];

export default function IngredientSwapPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<any>(null);
  const [selectedAlternative, setSelectedAlternative] = useState<any>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = swapSuggestions.find(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (found) {
      setSelectedIngredient(found);
      setSelectedAlternative(null);
    }
  };
  
  const handleSelectAlternative = (alternative: any) => {
    setSelectedAlternative(alternative);
  };
  
  return (
    <PageContainer header={{ title: 'Ingredient Swap', showBackButton: true }}>
      <div className="space-y-6 pb-6">
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search an ingredient to swap..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button type="submit" className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                Search
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {!selectedIngredient && (
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-wasfah-deep-teal mb-4">Popular Swaps</h3>
            <div className="space-y-2">
              {swapSuggestions.map(item => (
                <Card 
                  key={item.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedIngredient(item);
                    setSelectedAlternative(null);
                    setSearchTerm(item.name);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center text-wasfah-bright-teal">
                        <span className="text-sm">{item.alternatives.length} alternatives</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {selectedIngredient && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-wasfah-deep-teal">
                Alternatives for {selectedIngredient.name}
              </h3>
              <Button 
                variant="ghost" 
                className="text-sm text-wasfah-bright-teal p-1 h-auto"
                onClick={() => {
                  setSelectedIngredient(null);
                  setSelectedAlternative(null);
                }}
              >
                Clear
              </Button>
            </div>
            
            <div className="space-y-3">
              {selectedIngredient.alternatives.map((alt: any, index: number) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all ${selectedAlternative?.name === alt.name ? 'border-2 border-wasfah-bright-teal' : 'hover:shadow-md'}`}
                  onClick={() => handleSelectAlternative(alt)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{alt.name}</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {alt.benefits.map((benefit: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-1 bg-wasfah-light-gray rounded-full">
                              {benefit}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {alt.suitability.map((suit: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-0.5 border border-wasfah-bright-teal text-wasfah-bright-teal rounded-full flex items-center">
                              <Leaf className="h-3 w-3 mr-1" />
                              {suit}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center justify-end text-sm">
                            <span className="font-medium">Nutrition Impact</span>
                          </div>
                          {Object.entries(alt.impact).map(([key, value]) => {
                            const valueNum = value as number;
                            let Icon = CircleDashed;
                            let colorClass = 'text-gray-500';
                            
                            if (valueNum < 0) {
                              Icon = CheckCircle2;
                              colorClass = 'text-green-500';
                            } else if (valueNum > 0) {
                              Icon = AlertCircle;
                              colorClass = 'text-orange-500';
                            } else {
                              Icon = CircleMinus;
                              colorClass = 'text-gray-500';
                            }
                            
                            return (
                              <div key={key} className={`flex items-center justify-end text-xs ${colorClass}`}>
                                <span className="capitalize mr-1">{key}:</span> 
                                <span>{valueNum > 0 ? '+' : ''}{valueNum}</span>
                                <Icon className="h-3 w-3 ml-1" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedAlternative && (
              <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal mt-4">
                Use {selectedAlternative.name}
              </Button>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
