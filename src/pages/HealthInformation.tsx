
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Heart, Activity, User, Calendar, Save, AlertCircle } from 'lucide-react';

interface HealthProfile {
  personalInfo: {
    age: string;
    gender: string;
    height: string;
    weight: string;
    activityLevel: string;
  };
  medicalInfo: {
    conditions: string[];
    medications: string[];
    notes: string;
  };
  goals: {
    weightGoal: string;
    fitnessGoal: string;
    timeframe: string;
  };
}

const HealthInformation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [healthProfile, setHealthProfile] = useState<HealthProfile>({
    personalInfo: {
      age: "28",
      gender: "female",
      height: "165",
      weight: "65",
      activityLevel: "moderate"
    },
    medicalInfo: {
      conditions: ["None"],
      medications: [],
      notes: ""
    },
    goals: {
      weightGoal: "maintain",
      fitnessGoal: "general_health",
      timeframe: "6_months"
    }
  });

  const [newCondition, setNewCondition] = useState("");
  const [newMedication, setNewMedication] = useState("");

  const activityLevels = [
    { value: "sedentary", label: "Sedentary (little/no exercise)" },
    { value: "light", label: "Light (light exercise 1-3 days/week)" },
    { value: "moderate", label: "Moderate (moderate exercise 3-5 days/week)" },
    { value: "active", label: "Active (hard exercise 6-7 days/week)" },
    { value: "very_active", label: "Very Active (very hard exercise/training)" }
  ];

  const weightGoals = [
    { value: "lose", label: "Lose Weight" },
    { value: "maintain", label: "Maintain Weight" },
    { value: "gain", label: "Gain Weight" }
  ];

  const fitnessGoals = [
    { value: "general_health", label: "General Health" },
    { value: "weight_loss", label: "Weight Loss" },
    { value: "muscle_gain", label: "Muscle Gain" },
    { value: "endurance", label: "Improve Endurance" },
    { value: "strength", label: "Build Strength" }
  ];

  const updatePersonalInfo = (field: string, value: string) => {
    setHealthProfile(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateGoals = (field: string, value: string) => {
    setHealthProfile(prev => ({
      ...prev,
      goals: { ...prev.goals, [field]: value }
    }));
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setHealthProfile(prev => ({
        ...prev,
        medicalInfo: {
          ...prev.medicalInfo,
          conditions: [...prev.medicalInfo.conditions.filter(c => c !== "None"), newCondition.trim()]
        }
      }));
      setNewCondition("");
    }
  };

  const removeCondition = (condition: string) => {
    setHealthProfile(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        conditions: prev.medicalInfo.conditions.filter(c => c !== condition).length > 0 
          ? prev.medicalInfo.conditions.filter(c => c !== condition)
          : ["None"]
      }
    }));
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setHealthProfile(prev => ({
        ...prev,
        medicalInfo: {
          ...prev.medicalInfo,
          medications: [...prev.medicalInfo.medications, newMedication.trim()]
        }
      }));
      setNewMedication("");
    }
  };

  const removeMedication = (medication: string) => {
    setHealthProfile(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        medications: prev.medicalInfo.medications.filter(m => m !== medication)
      }
    }));
  };

  const calculateBMI = () => {
    const weight = parseFloat(healthProfile.personalInfo.weight);
    const height = parseFloat(healthProfile.personalInfo.height) / 100; // convert cm to m
    if (weight && height) {
      return (weight / (height * height)).toFixed(1);
    }
    return "0";
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  const saveHealthInfo = () => {
    // Save to localStorage for demo
    localStorage.setItem('healthInformation', JSON.stringify(healthProfile));
    
    toast({
      title: "Health information saved",
      description: "Your health profile has been updated successfully",
    });
  };

  const bmi = parseFloat(calculateBMI());
  const bmiInfo = getBMICategory(bmi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Health Information</h1>
          <p className="text-gray-600">Track your health metrics and medical information</p>
        </motion.div>

        <div className="space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="text-wasfah-orange" size={20} />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Age</label>
                    <Input
                      type="number"
                      value={healthProfile.personalInfo.age}
                      onChange={(e) => updatePersonalInfo('age', e.target.value)}
                      placeholder="Enter your age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                      value={healthProfile.personalInfo.gender}
                      onChange={(e) => updatePersonalInfo('gender', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Height (cm)</label>
                    <Input
                      type="number"
                      value={healthProfile.personalInfo.height}
                      onChange={(e) => updatePersonalInfo('height', e.target.value)}
                      placeholder="Enter your height"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                    <Input
                      type="number"
                      value={healthProfile.personalInfo.weight}
                      onChange={(e) => updatePersonalInfo('weight', e.target.value)}
                      placeholder="Enter your weight"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Activity Level</label>
                  <select
                    value={healthProfile.personalInfo.activityLevel}
                    onChange={(e) => updatePersonalInfo('activityLevel', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-white"
                  >
                    {activityLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>

                {/* BMI Display */}
                {bmi > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Body Mass Index (BMI)</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold">{calculateBMI()}</span>
                      <span className={`font-medium ${bmiInfo.color}`}>{bmiInfo.category}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Medical Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="text-red-500" size={20} />
                  Medical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Medical Conditions */}
                <div>
                  <label className="block text-sm font-medium mb-2">Medical Conditions</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      placeholder="Add a medical condition"
                      onKeyPress={(e) => e.key === 'Enter' && addCondition()}
                    />
                    <Button onClick={addCondition}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {healthProfile.medicalInfo.conditions.map((condition, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {condition}
                        {condition !== "None" && (
                          <button
                            onClick={() => removeCondition(condition)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <label className="block text-sm font-medium mb-2">Current Medications</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newMedication}
                      onChange={(e) => setNewMedication(e.target.value)}
                      placeholder="Add a medication"
                      onKeyPress={(e) => e.key === 'Enter' && addMedication()}
                    />
                    <Button onClick={addMedication}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {healthProfile.medicalInfo.medications.map((medication, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {medication}
                        <button
                          onClick={() => removeMedication(medication)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  {healthProfile.medicalInfo.medications.length === 0 && (
                    <p className="text-gray-500 text-sm">No medications added</p>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Notes</label>
                  <Textarea
                    value={healthProfile.medicalInfo.notes}
                    onChange={(e) => setHealthProfile(prev => ({
                      ...prev,
                      medicalInfo: { ...prev.medicalInfo, notes: e.target.value }
                    }))}
                    placeholder="Any additional health information, allergies, or notes..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Health Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="text-wasfah-green" size={20} />
                  Health Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Weight Goal</label>
                    <select
                      value={healthProfile.goals.weightGoal}
                      onChange={(e) => updateGoals('weightGoal', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      {weightGoals.map(goal => (
                        <option key={goal.value} value={goal.value}>{goal.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fitness Goal</label>
                    <select
                      value={healthProfile.goals.fitnessGoal}
                      onChange={(e) => updateGoals('fitnessGoal', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      {fitnessGoals.map(goal => (
                        <option key={goal.value} value={goal.value}>{goal.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Timeframe</label>
                    <select
                      value={healthProfile.goals.timeframe}
                      onChange={(e) => updateGoals('timeframe', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      <option value="1_month">1 Month</option>
                      <option value="3_months">3 Months</option>
                      <option value="6_months">6 Months</option>
                      <option value="1_year">1 Year</option>
                      <option value="long_term">Long Term</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <Button onClick={saveHealthInfo} size="lg" className="px-8">
              <Save size={16} className="mr-2" />
              Save Health Information
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HealthInformation;
