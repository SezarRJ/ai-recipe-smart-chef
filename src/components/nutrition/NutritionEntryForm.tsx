
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';

interface NutritionEntryFormProps {
  onSubmit: (data: {
    date: Date;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    mealType: string;
  }) => void;
}

export const NutritionEntryForm: React.FC<NutritionEntryFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [calories, setCalories] = useState<string>('');
  const [protein, setProtein] = useState<string>('');
  const [carbs, setCarbs] = useState<string>('');
  const [fat, setFat] = useState<string>('');
  const [mealType, setMealType] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      date,
      calories: parseFloat(calories),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      mealType
    });
    
    // Reset form
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setMealType('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-wasfah-deep-teal">Track Nutrition</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <DatePicker date={date} setDate={setDate} />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Meal Type</label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Calories</label>
              <Input 
                type="number" 
                value={calories} 
                onChange={(e) => setCalories(e.target.value)}
                placeholder="kcal"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Protein</label>
              <Input 
                type="number" 
                value={protein} 
                onChange={(e) => setProtein(e.target.value)}
                placeholder="g"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Carbs</label>
              <Input 
                type="number" 
                value={carbs} 
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="g"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Fat</label>
              <Input 
                type="number" 
                value={fat} 
                onChange={(e) => setFat(e.target.value)}
                placeholder="g"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
          >
            Save Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
