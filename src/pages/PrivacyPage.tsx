
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Shield, Download, Lock, Eye, BarChart3, Trash2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PrivacyPage() {
  const { toast } = useToast();
  const [dataCollection, setDataCollection] = React.useState(true);
  const [personalizedAds, setPersonalizedAds] = React.useState(true);
  const [recipePreferences, setRecipePreferences] = React.useState(true);
  const [cookingHistory, setCookingHistory] = React.useState(true);
  const [ingredientScanning, setIngredientScanning] = React.useState(true);

  const handleDownloadData = () => {
    toast({
      title: "Data export initiated",
      description: "Your data will be prepared and sent to your email address",
    });
  };

  const handleDeleteAllData = () => {
    toast({
      title: "Delete account data",
      description: "Please confirm this action by email. A confirmation link has been sent.",
      variant: "destructive"
    });
  };

  return (
    <PageContainer header={{ title: "Privacy & Data", showBackButton: true }}>
      <div className="space-y-6 pb-24 p-4">
        <Card className="bg-gradient-to-br from-wasfah-deep-teal to-wasfah-bright-teal text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Privacy & Data</h2>
                <p className="text-sm opacity-90">Manage your data and privacy settings</p>
              </div>
              <Shield size={48} className="opacity-70" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2 text-wasfah-bright-teal" />
              Data Collection Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium">AI Features Data Collection</h4>
                <p className="text-xs text-gray-500">Allow data collection to improve AI features</p>
              </div>
              <Switch 
                checked={dataCollection} 
                onCheckedChange={setDataCollection} 
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium">Personalized Content</h4>
                <p className="text-xs text-gray-500">Allow data usage for personalized recipes</p>
              </div>
              <Switch 
                checked={recipePreferences} 
                onCheckedChange={setRecipePreferences} 
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium">Cooking History</h4>
                <p className="text-xs text-gray-500">Store your cooking and recipe browsing history</p>
              </div>
              <Switch 
                checked={cookingHistory} 
                onCheckedChange={setCookingHistory} 
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium">Ingredient Scanning</h4>
                <p className="text-xs text-gray-500">Store data from scanned ingredients and dishes</p>
              </div>
              <Switch 
                checked={ingredientScanning} 
                onCheckedChange={setIngredientScanning} 
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium">Personalized Ads</h4>
                <p className="text-xs text-gray-500">Allow data usage for personalized advertisements</p>
              </div>
              <Switch 
                checked={personalizedAds} 
                onCheckedChange={setPersonalizedAds} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2 text-wasfah-bright-teal" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleDownloadData}
            >
              <Download size={16} />
              Download My Data
            </Button>
            
            <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-amber-800">Data Deletion</h4>
                  <p className="text-xs text-amber-700">
                    Deleting your data will permanently remove all your personal information, 
                    recipes, and preferences from our servers. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleDeleteAllData}
            >
              <Trash2 size={16} />
              Delete All My Data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-wasfah-bright-teal" />
              Data Usage Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Here's how your data improves your experience with Wasfah AI:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="text-sm font-medium">Recipe Personalization</h4>
                <p className="text-xs text-gray-500">Used to suggest recipes matching your preferences</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="text-sm font-medium">AI Scanning Technology</h4>
                <p className="text-xs text-gray-500">Improves the accuracy of ingredient recognition</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="text-sm font-medium">Health Recommendations</h4>
                <p className="text-xs text-gray-500">Provides nutritional guidance based on your health goals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
