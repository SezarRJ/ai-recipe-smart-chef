
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { User, Heart, Activity, Target, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BodyInformationPage() {
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: '',
    medicalConditions: '',
    medications: '',
    allergies: '',
    dietaryRestrictions: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Validate required fields
      if (!formData.age || !formData.gender || !formData.height || !formData.weight) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields (age, gender, height, weight)",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for demo purposes
      localStorage.setItem('userBodyInfo', JSON.stringify(formData));
      
      toast({
        title: "Information Saved",
        description: "Your body information has been successfully saved!",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "There was an error saving your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved data on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('userBodyInfo');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  return (
    <PageContainer 
      header={{ 
        title: 'Body Information', 
        showBackButton: true,
        actions: (
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
          >
            <Save size={16} className="mr-2" />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        )
      }}
    >
      <div className="p-4 space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-wasfah-deep-teal mb-2">Body Information</h1>
          <p className="text-gray-600">Help us provide better nutrition recommendations</p>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} className="text-wasfah-bright-teal" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={(value) => handleInputChange('gender', value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm) *</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity & Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} className="text-wasfah-bright-teal" />
              Activity & Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                  <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="very">Very active (hard exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="extra">Extra active (very hard exercise, physical job)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goal">Health Goal</Label>
              <Select value={formData.goal} onValueChange={(value) => handleInputChange('goal', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose weight</SelectItem>
                  <SelectItem value="gain">Gain weight</SelectItem>
                  <SelectItem value="maintain">Maintain weight</SelectItem>
                  <SelectItem value="muscle">Build muscle</SelectItem>
                  <SelectItem value="health">Improve overall health</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Health Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart size={20} className="text-wasfah-coral-red" />
              Health Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="conditions">Medical Conditions</Label>
              <Textarea
                id="conditions"
                placeholder="List any medical conditions (optional)"
                value={formData.medicalConditions}
                onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                placeholder="List current medications (optional)"
                value={formData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="allergies">Food Allergies</Label>
              <Textarea
                id="allergies"
                placeholder="List any food allergies (optional)"
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="restrictions">Dietary Restrictions</Label>
              <Textarea
                id="restrictions"
                placeholder="List dietary restrictions (optional)"
                value={formData.dietaryRestrictions}
                onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-center pt-6">
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
            size="lg"
          >
            <Save size={20} className="mr-2" />
            {isLoading ? 'Saving Information...' : 'Save Information'}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
