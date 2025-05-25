import React, { useEffect, useState } from "react";
import axios from "axios";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { NutritionTip } from "@/components/nutrition/NutritionTip";
import { AlertCircle, TrendingUp, Award, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export default function HealthInformation() {
  const [loading, setLoading] = useState(true);
  const [availableTabs, setAvailableTabs] = useState<string[]>([]);
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [goalData, setGoalData] = useState<any>(null);
  const [allergenData, setAllergenData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, nutrition, goals, allergens] = await Promise.all([
          axios.get("/api/user/profile"),
          axios.get("/api/health/nutrition"),
          axios.get("/api/health/goals"),
          axios.get("/api/health/allergens"),
        ]);

        setAvailableTabs(profile.data.allowedTabs); // e.g. ['nutrition', 'goals']
        setNutritionData(nutrition.data);
        setGoalData(goals.data);
        setAllergenData(allergens.data);
      } catch (error) {
        console.error("Failed to load health info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <PageContainer header={{ title: "Health Information", showBackButton: true }}>
        <div className="space-y-6 px-4 pb-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-48 w-full" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer header={{ title: "Health Information", showBackButton: true }}>
      <div className="space-y-6 pb-6 px-4">
        <Tabs defaultValue={availableTabs[0]}>
          <TabsList className={`grid grid-cols-${availableTabs.length} mb-4`}>
            {availableTabs.includes("nutrition") && <TabsTrigger value="nutrition">Nutrition</TabsTrigger>}
            {availableTabs.includes("goals") && <TabsTrigger value="goals">Goals</TabsTrigger>}
            {availableTabs.includes("allergens") && <TabsTrigger value="allergens">Allergens</TabsTrigger>}
          </TabsList>

          {availableTabs.includes("nutrition") && (
            <TabsContent value="nutrition">
              <section>
                <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">Today's Nutrition</h2>
                <Card className="mb-6">
                  <CardHeader><CardTitle className="text-lg">Daily Progress</CardTitle></CardHeader>
                  <CardContent>
                    {nutritionData.daily.map((item: any) => (
                      <div key={item.name} className="mb-4">
                        <div className="flex justify-between">
                          <span>{item.name}</span>
                          <span>{item.amount} / {item.goal} {item.unit}</span>
                        </div>
                        <Progress value={(item.amount / item.goal) * 100} />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg">Weekly Overview</CardTitle></CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={nutritionData.weekly}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="calories" stroke="#05BFDB" />
                        <Line type="monotone" dataKey="goal" stroke="#F97316" strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <NutritionTip 
                    tip="Lean proteins help keep you full and support muscle growth."
                    source="Nutrition AI"
                    type="info"
                  />
                </div>
              </section>
            </TabsContent>
          )}

          {availableTabs.includes("goals") && (
            <TabsContent value="goals">
              <section>
                <h2 className="text-xl font-bold flex items-center text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">
                  <Award className="mr-2 h-5 w-5" />
                  Goal Tracking
                </h2>

                <div className="space-y-4">
                  {goalData.map((goal: any) => (
                    <Card key={goal.name}>
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <h3>{goal.name}</h3>
                          <div className="flex items-center">
                            <span className="text-sm text-amber-500 mr-1">{goal.percentComplete}%</span>
                            {goal.current > goal.goal ? <ArrowUp className="text-green-500 h-4 w-4" /> : <ArrowDown className="text-amber-500 h-4 w-4" />}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Current: {goal.current}</span>
                          <span>Goal: {goal.goal}</span>
                        </div>
                        <Progress value={goal.percentComplete} className="mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-4 flex gap-4">
                  <Link to="/nutrition-goals" className="flex-1">
                    <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Update Goals
                    </Button>
                  </Link>
                  <Link to="/health-tracking" className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </section>
            </TabsContent>
          )}

          {availableTabs.includes("allergens") && (
            <TabsContent value="allergens">
              <section>
                <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">Your Allergen Profile</h2>
                <Card>
                  <CardHeader><CardTitle>Registered Allergens</CardTitle></CardHeader>
                  <CardContent>
                    {allergenData.length > 0 ? (
                      allergenData.map((allergen: string) => (
                        <div key={allergen} className="flex items-center text-red-800 bg-red-50 p-2 rounded-md">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          {allergen}
                        </div>
                      ))
                    ) : (
                      <p>No allergens registered.</p>
                    )}
                  </CardContent>
                </Card>
              </section>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </PageContainer>
  );
}import React, { useEffect, useState } from "react";
import axios from "axios";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { NutritionTip } from "@/components/nutrition/NutritionTip";
import { AlertCircle, TrendingUp, Award, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export default function HealthInformation() {
  const [loading, setLoading] = useState(true);
  const [availableTabs, setAvailableTabs] = useState<string[]>([]);
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [goalData, setGoalData] = useState<any>(null);
  const [allergenData, setAllergenData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, nutrition, goals, allergens] = await Promise.all([
          axios.get("/api/user/profile"),
          axios.get("/api/health/nutrition"),
          axios.get("/api/health/goals"),
          axios.get("/api/health/allergens"),
        ]);

        setAvailableTabs(profile.data.allowedTabs); // e.g. ['nutrition', 'goals']
        setNutritionData(nutrition.data);
        setGoalData(goals.data);
        setAllergenData(allergens.data);
      } catch (error) {
        console.error("Failed to load health info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <PageContainer header={{ title: "Health Information", showBackButton: true }}>
        <div className="space-y-6 px-4 pb-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-48 w-full" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer header={{ title: "Health Information", showBackButton: true }}>
      <div className="space-y-6 pb-6 px-4">
        <Tabs defaultValue={availableTabs[0]}>
          <TabsList className={`grid grid-cols-${availableTabs.length} mb-4`}>
            {availableTabs.includes("nutrition") && <TabsTrigger value="nutrition">Nutrition</TabsTrigger>}
            {availableTabs.includes("goals") && <TabsTrigger value="goals">Goals</TabsTrigger>}
            {availableTabs.includes("allergens") && <TabsTrigger value="allergens">Allergens</TabsTrigger>}
          </TabsList>

          {availableTabs.includes("nutrition") && (
            <TabsContent value="nutrition">
              <section>
                <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">Today's Nutrition</h2>
                <Card className="mb-6">
                  <CardHeader><CardTitle className="text-lg">Daily Progress</CardTitle></CardHeader>
                  <CardContent>
                    {nutritionData.daily.map((item: any) => (
                      <div key={item.name} className="mb-4">
                        <div className="flex justify-between">
                          <span>{item.name}</span>
                          <span>{item.amount} / {item.goal} {item.unit}</span>
                        </div>
                        <Progress value={(item.amount / item.goal) * 100} />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg">Weekly Overview</CardTitle></CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={nutritionData.weekly}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="calories" stroke="#05BFDB" />
                        <Line type="monotone" dataKey="goal" stroke="#F97316" strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <NutritionTip 
                    tip="Lean proteins help keep you full and support muscle growth."
                    source="Nutrition AI"
                    type="info"
                  />
                </div>
              </section>
            </TabsContent>
          )}

          {availableTabs.includes("goals") && (
            <TabsContent value="goals">
              <section>
                <h2 className="text-xl font-bold flex items-center text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">
                  <Award className="mr-2 h-5 w-5" />
                  Goal Tracking
                </h2>

                <div className="space-y-4">
                  {goalData.map((goal: any) => (
                    <Card key={goal.name}>
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <h3>{goal.name}</h3>
                          <div className="flex items-center">
                            <span className="text-sm text-amber-500 mr-1">{goal.percentComplete}%</span>
                            {goal.current > goal.goal ? <ArrowUp className="text-green-500 h-4 w-4" /> : <ArrowDown className="text-amber-500 h-4 w-4" />}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Current: {goal.current}</span>
                          <span>Goal: {goal.goal}</span>
                        </div>
                        <Progress value={goal.percentComplete} className="mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-4 flex gap-4">
                  <Link to="/nutrition-goals" className="flex-1">
                    <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Update Goals
                    </Button>
                  </Link>
                  <Link to="/health-tracking" className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </section>
            </TabsContent>
          )}

          {availableTabs.includes("allergens") && (
            <TabsContent value="allergens">
              <section>
                <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">Your Allergen Profile</h2>
                <Card>
                  <CardHeader><CardTitle>Registered Allergens</CardTitle></CardHeader>
                  <CardContent>
                    {allergenData.length > 0 ? (
                      allergenData.map((allergen: string) => (
                        <div key={allergen} className="flex items-center text-red-800 bg-red-50 p-2 rounded-md">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          {allergen}
                        </div>
                      ))
                    ) : (
                      <p>No allergens registered.</p>
                    )}
                  </CardContent>
                </Card>
              </section>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </PageContainer>
  );
}
