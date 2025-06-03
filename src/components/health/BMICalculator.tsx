
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, Scale, Ruler } from 'lucide-react';

export const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBMI] = useState<number | null>(null);

  const calculateBMI = () => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (!heightNum || !weightNum) return;

    let bmiValue: number;
    if (unit === 'metric') {
      // Height in cm, weight in kg
      const heightM = heightNum / 100;
      bmiValue = weightNum / (heightM * heightM);
    } else {
      // Height in inches, weight in lbs
      bmiValue = (weightNum * 703) / (heightNum * heightNum);
    }

    setBMI(parseFloat(bmiValue.toFixed(1)));
  };

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { category: 'Underweight', color: 'bg-blue-500' };
    if (bmiValue < 25) return { category: 'Normal', color: 'bg-green-500' };
    if (bmiValue < 30) return { category: 'Overweight', color: 'bg-yellow-500' };
    return { category: 'Obese', color: 'bg-red-500' };
  };

  const getBMIRecommendations = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      return [
        'Increase caloric intake with nutrient-dense foods',
        'Focus on protein-rich meals',
        'Consider strength training exercises',
        'Consult with a healthcare provider'
      ];
    }
    if (bmiValue < 25) {
      return [
        'Maintain current healthy lifestyle',
        'Continue balanced nutrition',
        'Regular physical activity',
        'Monitor weight periodically'
      ];
    }
    if (bmiValue < 30) {
      return [
        'Create a moderate calorie deficit',
        'Increase physical activity',
        'Focus on whole foods',
        'Consider portion control'
      ];
    }
    return [
      'Consult with healthcare provider',
      'Create structured weight loss plan',
      'Incorporate regular exercise',
      'Consider professional nutrition guidance'
    ];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-wasfah-bright-teal" />
          BMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Unit Toggle */}
        <div className="flex gap-2">
          <Button
            variant={unit === 'metric' ? 'default' : 'outline'}
            onClick={() => setUnit('metric')}
            size="sm"
          >
            Metric
          </Button>
          <Button
            variant={unit === 'imperial' ? 'default' : 'outline'}
            onClick={() => setUnit('imperial')}
            size="sm"
          >
            Imperial
          </Button>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height" className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === 'metric' ? '170' : '68'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === 'metric' ? '70' : '154'}
            />
          </div>
        </div>

        <Button onClick={calculateBMI} className="w-full">
          Calculate BMI
        </Button>

        {/* Results */}
        {bmi && (
          <div className="space-y-4">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-wasfah-bright-teal mb-2">{bmi}</p>
              <Badge className={`${getBMICategory(bmi).color} text-white`}>
                {getBMICategory(bmi).category}
              </Badge>
            </div>

            {/* BMI Scale */}
            <div className="space-y-2">
              <p className="font-medium">BMI Scale:</p>
              <div className="flex rounded-lg overflow-hidden h-4">
                <div className="bg-blue-500 flex-1"></div>
                <div className="bg-green-500 flex-1"></div>
                <div className="bg-yellow-500 flex-1"></div>
                <div className="bg-red-500 flex-1"></div>
              </div>
              <div className="grid grid-cols-4 text-xs text-center">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-2">
              <p className="font-medium">Recommendations:</p>
              <ul className="space-y-1 text-sm text-gray-600">
                {getBMIRecommendations(bmi).map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-wasfah-bright-teal">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
