import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Activity, Heart, Scale, Target, TrendingUp, Calendar, Plus, AlertTriangle, Edit2, Trash2, Download, Filter, Check, X, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, isWithinInterval, parseISO } from 'date-fns';
import { Toast } from "@/components/ui/toast";

const HealthTracking = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [weight, setWeight] = useState("74.6");
  const [height, setHeight] = useState("175");
  const [heartRate, setHeartRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [entries, setEntries] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(true);
  const [showTimeline, setShowTimeline] = useState(true);
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
  const [metricFilter, setMetricFilter] = useState("all");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  const healthGoals = [
    "Weight Loss", "Muscle Gain", "Heart Healthy", "Low Sodium", 
    "High Protein", "Low Carb", "High Fiber", "Diabetes Management"
  ];

  const allergens = [
    "Dairy", "Gluten", "Tree Nuts", "Shellfish", "Soy", "Eggs", 
    "Fish", "Peanuts", "Sesame", "Sulfites"
  ];

  // Load saved data on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('healthEntries');
    const savedGoal = localStorage.getItem('healthGoal');
    const savedAllergens = localStorage.getItem('allergens');
    
    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedGoal) setSelectedGoal(savedGoal);
    if (savedAllergens) setSelectedAllergens(JSON.parse(savedAllergens));
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }
    
    autoSaveTimer.current = setTimeout(() => {
      if (weight || height || heartRate || bloodPressure) {
        showNotification("Auto-saving...");
        localStorage.setItem('draftEntry', JSON.stringify({
          weight, height, heartRate, bloodPressure
        }));
      }
    }, 2000);

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, [weight, height, heartRate, bloodPressure]);

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const calculateBMI = (w: string = weight, h: string = height) => {
    const weightKg = parseFloat(w);
    const heightM = parseFloat(h) / 100;
    if (weightKg && heightM) {
      return (weightKg / (heightM * heightM)).toFixed(1);
    }
    return "0";
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  const handleAllergenToggle = (allergen: string) => {
    const newAllergens = selectedAllergens.includes(allergen) 
      ? selectedAllergens.filter(a => a !== allergen)
      : [...selectedAllergens, allergen];
    
    setSelectedAllergens(newAllergens);
    localStorage.setItem('allergens', JSON.stringify(newAllergens));
    showNotification(`${allergen} ${newAllergens.includes(allergen) ? 'added to' : 'removed from'} allergen list`);
  };

  const handleGoalSelect = (goal: string) => {
    const newGoal = selectedGoal === goal ? "" : goal;
    setSelectedGoal(newGoal);
    localStorage.setItem('healthGoal', newGoal);
    showNotification(newGoal ? `Goal set to ${newGoal}` : 'Goal cleared');
  };

  const generateTestData = () => {
    const testEntries = [];
    for (let i = 30; i >= 0; i--) {
      const date = subDays(new Date(), i);
      testEntries.push({
        id: `test-${i}`,
        date: date.toISOString(),
        weight: (74.6 + (Math.random() - 0.5) * 3).toFixed(1),
        height: "175",
        heartRate: Math.floor(65 + Math.random() * 20),
        bloodPressure: `${Math.floor(110 + Math.random() * 20)}/${Math.floor(70 + Math.random() * 15)}`,
        bmi: ""
      });
    }
    testEntries.forEach(entry => {
      entry.bmi = calculateBMI(entry.weight, entry.height);
    });
    setEntries(testEntries);
    localStorage.setItem('healthEntries', JSON.stringify(testEntries));
    showNotification('Test data generated successfully');
  };

  const saveEntry = () => {
    if (!weight && !heartRate && !bloodPressure) {
      showNotification('Please enter at least one metric');
      return;
    }

    const newEntry = {
      id: editingId || Date.now().toString(),
      date: new Date().toISOString(),
      weight: weight || '',
      height: height || '',
      heartRate: heartRate || '',
      bloodPressure: bloodPressure || '',
      bmi: calculateBMI()
    };

    let updatedEntries;
    if (editingId) {
      updatedEntries = entries.map(e => e.id === editingId ? newEntry : e);
      setEditingId(null);
    } else {
      updatedEntries = [...entries, newEntry];
    }

    setEntries(updatedEntries);
    localStorage.setItem('healthEntries', JSON.stringify(updatedEntries));
    localStorage.removeItem('draftEntry');
    
    // Clear form
    setWeight("");
    setHeartRate("");
    setBloodPressure("");
    
    showNotification(editingId ? 'Entry updated successfully' : 'Entry saved successfully');
  };

  const editEntry = (entry: any) => {
    setWeight(entry.weight);
    setHeight(entry.height);
    setHeartRate(entry.heartRate);
    setBloodPressure(entry.bloodPressure);
    setEditingId(entry.id);
    showNotification('Editing entry');
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter(e => e.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('healthEntries', JSON.stringify(updatedEntries));
    showNotification('Entry deleted');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setWeight("74.6");
    setHeight("175");
    setHeartRate("");
    setBloodPressure("");
    showNotification('Edit cancelled');
  };

  const getFilteredEntries = () => {
    let filtered = [...entries];
    
    // Date filter
    if (dateFilter.start && dateFilter.end) {
      filtered = filtered.filter(entry => 
        isWithinInterval(parseISO(entry.date), {
          start: parseISO(dateFilter.start),
          end: parseISO(dateFilter.end)
        })
      );
    }
    
    // Metric filter
    if (metricFilter !== 'all') {
      filtered = filtered.filter(entry => {
        switch(metricFilter) {
          case 'weight': return entry.weight;
          case 'heartRate': return entry.heartRate;
          case 'bloodPressure': return entry.bloodPressure;
          default: return true;
        }
      });
    }
    
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const exportData = (format: 'csv' | 'pdf') => {
    const data = getFilteredEntries();
    
    if (format === 'csv') {
      const headers = ['Date', 'Weight (kg)', 'Height (cm)', 'BMI', 'Heart Rate', 'Blood Pressure'];
      const csvContent = [
        headers.join(','),
        ...data.map(entry => [
          format(parseISO(entry.date), 'yyyy-MM-dd HH:mm'),
          entry.weight,
          entry.height,
          entry.bmi,
          entry.heartRate,
          entry.bloodPressure
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `health-data-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showNotification('Data exported as CSV');
    } else {
      // For PDF, we'd normally use a library like jsPDF
      showNotification('PDF export would require additional libraries');
    }
  };

  const getChartData = () => {
    return getFilteredEntries()
      .filter(entry => entry.weight)
      .map(entry => ({
        date: format(parseISO(entry.date), 'MM/dd'),
        weight: parseFloat(entry.weight),
        bmi: parseFloat(entry.bmi)
      }))
      .reverse();
  };

  const getLatestMetrics = () => {
    const sorted = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sorted[0] || {};
  };

  const latest = getLatestMetrics();
  const bmi = parseFloat(calculateBMI(latest.weight || weight, latest.height || height));
  const bmiInfo = getBMICategory(bmi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
              <Check size={16} />
              {toastMessage}
            </div>
          </div>
        )}

        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
              Health Tracking
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Monitor your health metrics and progress
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateTestData}
            className="hidden sm:flex"
          >
            Generate Test Data
          </Button>
        </div>

        {/* Quick Stats with BMI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Scale className="mx-auto mb-2 text-wasfah-orange" size={24} />
              <p className="text-sm text-gray-600">Weight</p>
              <p className="text-xl font-bold">{latest.weight || weight} kg</p>
              <p className="text-xs text-green-600">
                {entries.length >= 2 && `${(parseFloat(entries[0].weight) - parseFloat(entries[1].weight)).toFixed(1)} kg change`}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="mx-auto mb-2 text-purple-500" size={24} />
              <p className="text-sm text-gray-600">BMI</p>
              <p className="text-xl font-bold">{bmi.toFixed(1)}</p>
              <p className={`text-xs ${bmiInfo.color}`}>{bmiInfo.category}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="mx-auto mb-2 text-red-500" size={24} />
              <p className="text-sm text-gray-600">Heart Rate</p>
              <p className="text-xl font-bold">{latest.heartRate || "72"} bpm</p>
              <p className="text-xs text-green-600">Normal</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="mx-auto mb-2 text-blue-500" size={24} />
              <p className="text-sm text-gray-600">Blood Pressure</p>
              <p className="text-xl font-bold">{latest.bloodPressure || "120/80"}</p>
              <p className="text-xs text-green-600">Healthy</p>
            </CardContent>
          </Card>
        </div>

        {/* Weight Chart */}
        {showChart && entries.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-wasfah-orange" size={20} />
                Weight & BMI Trends
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChart(!showChart)}
              >
                <EyeOff size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#f97316" name="Weight (kg)" />
                  <Line yAxisId="right" type="monotone" dataKey="bmi" stroke="#a855f7" name="BMI" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Allergen-Free Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-wasfah-orange" size={20} />
              Allergen-Free Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Select allergens you want to avoid in your recipes</p>
            <div className="flex flex-wrap gap-2">
              {allergens.map((allergen) => (
                <Button
                  key={allergen}
                  variant={selectedAllergens.includes(allergen) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAllergenToggle(allergen)}
                  className="flex items-center gap-1"
                >
                  {allergen}
                </Button>
              ))}
            </div>
            {selectedAllergens.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-800">Active Allergen Restrictions:</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedAllergens.map((allergen) => (
                    <Badge key={allergen} variant="destructive" className="text-xs">
                      {allergen}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Health Goals */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-wasfah-orange" size={20} />
              Health Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {healthGoals.map((goal) => (
                <Button
                  key={goal}
                  variant={selectedGoal === goal ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleGoalSelect(goal)}
                >
                  {goal}
                </Button>
              ))}
            </div>
            {selectedGoal && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-800">Active Goal: {selectedGoal}</p>
                <p className="text-sm text-blue-600">Track your progress and get personalized recipe recommendations</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Entry */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {editingId ? <Edit2 className="text-wasfah-orange" size={20} /> : <Plus className="text-wasfah-orange" size={20} />}
              {editingId ? 'Edit Entry' : 'Add New Entry'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <Input
                  type="number"
                  placeholder="75.0"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height (cm)</label>
                <Input
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Heart Rate (bpm)</label>
                <Input
                  type="number"
                  placeholder="72"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Blood Pressure</label>
                <Input
                  type="text"
                  placeholder="120/80"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={saveEntry}
                className="flex-1 bg-gradient-to-r from-wasfah-orange to-wasfah-green"
              >
                {editingId ? 'Update Entry' : 'Save Entry'}
              </Button>
              {editingId && (
                <Button onClick={cancelEdit} variant="outline">
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Filters and Export */}
        {entries.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="text-wasfah-orange" size={20} />
                Filter & Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <Input
                    type="date"
                    value={dateFilter.start}
                    onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date</label>
                  <Input
                    type="date"
                    value={dateFilter.end}
                    onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Metric</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    value={metricFilter}
                    onChange={(e) => setMetricFilter(e.target.value)}
                  >
                    <option value="all">All Metrics</option>
                    <option value="weight">Weight Only</option>
                    <option value="heartRate">Heart Rate Only</option>
                    <option value="bloodPressure">Blood Pressure Only</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => exportData('csv')}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => exportData('pdf')}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Export PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Entry History Timeline */}
        {showTimeline && entries.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-wasfah-orange" size={20} />
                Entry History
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTimeline(!showTimeline)}
              >
                <EyeOff size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {getFilteredEntries().map((entry) => (
                  <div key={entry.id} className="border-l-4 border-wasfah-orange pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-sm">
                          {format(parseISO(entry.date), 'MMM dd, yyyy - HH:mm')}
                        </p>
                        <div className="text-sm text-gray-600 mt-1 space-y-1">
                          {entry.weight && <p>Weight: {entry.weight} kg (BMI: {entry.bmi})</p>}
                          {entry.heartRate && <p>Heart Rate: {entry.heartRate} bpm</p>}
                          {entry.bloodPressure && <p>Blood Pressure: {entry.bloodPressure}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editEntry(entry)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default HealthTracking;
