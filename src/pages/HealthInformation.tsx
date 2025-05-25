import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Activity, User, Save, AlertCircle } from 'lucide-react';

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

  const [healthProfile, setHealthProfile] = useState<HealthProfile>(() => {
    // Attempt to load from localStorage, otherwise use default
    const savedProfile = localStorage.getItem('healthInformation');
    return savedProfile ? JSON.parse(savedProfile) : {
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
    };
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

  const timeframes = [ // Centralized timeframes
    { value: "1_month", label: "1 Month" },
    { value: "3_months", label: "3 Months" },
    { value: "6_months", label: "6 Months" },
    { value: "1_year", label: "1 Year" },
    { value: "long_term", label: "Long Term" }
  ];

  const updateProfileField = (section: keyof HealthProfile, field: string, value: string) => {
    setHealthProfile(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const addMedicalItem = (type: 'conditions' | 'medications') => {
    const newItem = type === 'conditions' ? newCondition : newMedication;
    if (newItem.trim()) {
      setHealthProfile(prev => {
        const currentItems = prev.medicalInfo[type];
        const updatedItems = type === 'conditions'
          ? [...currentItems.filter(c => c !== "None"), newItem.trim()]
          : [...currentItems, newItem.trim()];
        return {
          ...prev,
          medicalInfo: {
            ...prev.medicalInfo,
            [type]: updatedItems
          }
        };
      });
      if (type === 'conditions') setNewCondition("");
      else setNewMedication("");
    }
  };

  const removeMedicalItem = (type: 'conditions' | 'medications', itemToRemove: string) => {
    setHealthProfile(prev => {
      const updatedItems = prev.medicalInfo[type].filter(item => item !== itemToRemove);
      return {
        ...prev,
        medicalInfo: {
          ...prev.medicalInfo,
          [type]: type === 'conditions' && updatedItems.length === 0 ? ["None"] : updatedItems
        }
      };
    });
  };

  const calculateBMI = useMemo(() => {
    const weight = parseFloat(healthProfile.personalInfo.weight);
    const height = parseFloat(healthProfile.personalInfo.height) / 100; // convert cm to m
    if (weight > 0 && height > 0) {
      return (weight / (height * height)).toFixed(1);
    }
    return "0";
  }, [healthProfile.personalInfo.weight, healthProfile.personalInfo.height]);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  const bmiValue = parseFloat(calculateBMI);
  const bmiInfo = getBMICategory(bmiValue);

  const saveHealthInfo = () => {
    localStorage.setItem('healthInformation', JSON.stringify(healthProfile));
    toast({
      title: "Health information saved",
      description: "Your health profile has been updated successfully.",
    });
  };

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="text-wasfah-orange" size={20} />
                  Personal & Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="age">Age</label>
                    <Input
                      id="age"
                      type="number"
                      value={healthProfile.personalInfo.age}
                      onChange={(e) => updateProfileField('personalInfo', 'age', e.target.value)}
                      placeholder="Enter your age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      value={healthProfile.personalInfo.gender}
                      onChange={(e) => updateProfileField('personalInfo', 'gender', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="height">Height (cm)</label>
                    <Input
                      id="height"
                      type="number"
                      value={healthProfile.personalInfo.height}
                      onChange={(e) => updateProfileField('personalInfo', 'height', e.target.value)}
                      placeholder="Enter your height"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="weight">Weight (kg)</label>
                    <Input
                      id="weight"
                      type="number"
                      value={healthProfile.personalInfo.weight}
                      onChange={(e) => updateProfileField('personalInfo', 'weight', e.target.value)}
                      placeholder="Enter your weight"
                    />
                  </div>
                  <div className="sm:col-span-2"> {/* Takes full width on small screens and up */}
                    <label className="block text-sm font-medium mb-1" htmlFor="activityLevel">Activity Level</label>
                    <select
                      id="activityLevel"
                      value={healthProfile.personalInfo.activityLevel}
                      onChange={(e) => updateProfileField('personalInfo', 'activityLevel', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      {activityLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {bmiValue > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Body Mass Index (BMI)</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold">{calculateBMI}</span>
                      <span className={`font-medium ${bmiInfo.color}`}>{bmiInfo.category}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Health Goals */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
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
                    <label className="block text-sm font-medium mb-1" htmlFor="weightGoal">Weight Goal</label>
                    <select
                      id="weightGoal"
                      value={healthProfile.goals.weightGoal}
                      onChange={(e) => updateProfileField('goals', 'weightGoal', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      {weightGoals.map(goal => (
                        <option key={goal.value} value={goal.value}>{goal.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="fitnessGoal">Fitness Goal</label>
                    <select
                      id="fitnessGoal"
                      value={healthProfile.goals.fitnessGoal}
                      onChange={(e) => updateProfileField('goals', 'fitnessGoal', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      {fitnessGoals.map(goal => (
                        <option key={goal.value} value={goal.value}>{goal.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2"> {/* Takes full width on small screens and up */}
                    <label className="block text-sm font-medium mb-1" htmlFor="timeframe">Timeframe</label>
                    <select
                      id="timeframe"
                      value={healthProfile.goals.timeframe}
                      onChange={(e) => updateProfileField('goals', 'timeframe', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      {timeframes.map(frame => (
                        <option key={frame.value} value={frame.value}>{frame.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Medical Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
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
                      onKeyPress={(e) => e.key === 'Enter' && addMedicalItem('conditions')}
                    />
                    <Button onClick={() => addMedicalItem('conditions')}>Add</Button>
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
                            onClick={() => removeMedicalItem('conditions', condition)}
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
                      onKeyPress={(e) => e.key === 'Enter' && addMedicalItem('medications')}
                    />
                    <Button onClick={() => addMedicalItem('medications')}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {healthProfile.medicalInfo.medications.map((medication, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {medication}
                        <button
                          onClick={() => removeMedicalItem('medications', medication)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  {healthProfile.medicalInfo.medications.length === 0 && (
                    <p className="text-gray-500 text-sm mt-2">No medications added.</p>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="notes">Additional Notes</label>
                  <Textarea
                    id="notes"
                    value={healthProfile.medicalInfo.notes}
                    onChange={(e) => updateProfileField('medicalInfo', 'notes', e.target.value)}
                    placeholder="Any additional health information, allergies, or notes..."
                    rows={3}
                  />
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
