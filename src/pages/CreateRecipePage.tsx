
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Plus, X, Upload, Clock, Users } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const CreateRecipePage = () => {
  const { t } = useRTL();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [newIngredient, setNewIngredient] = useState('');

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  return (
    <PageContainer
      header={{
        title: t('Create Recipe', 'إنشاء وصفة'),
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-6">
        <div className="text-center space-y-4">
          <ChefHat className="h-12 w-12 mx-auto text-wasfah-bright-teal" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Create Your Recipe', 'أنشئ وصفتك')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Share your culinary creation with the world', 'شارك إبداعك الطبخي مع العالم')}
          </p>
        </div>

        <form className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('Basic Information', 'المعلومات الأساسية')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('Recipe Title', 'عنوان الوصفة')}
                </label>
                <Input placeholder={t('Enter recipe title', 'أدخل عنوان الوصفة')} />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('Description', 'الوصف')}
                </label>
                <Textarea 
                  placeholder={t('Describe your recipe', 'صف وصفتك')}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    {t('Prep Time (min)', 'وقت التحضير (دقيقة)')}
                  </label>
                  <Input type="number" placeholder="30" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    {t('Cook Time (min)', 'وقت الطبخ (دقيقة)')}
                  </label>
                  <Input type="number" placeholder="45" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    {t('Servings', 'الحصص')}
                  </label>
                  <Input type="number" placeholder="4" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>{t('Recipe Image', 'صورة الوصفة')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('Click to upload or drag and drop', 'انقر للتحميل أو اسحب وأفلت')}
                </p>
                <Button variant="outline">
                  {t('Choose Image', 'اختر صورة')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>{t('Ingredients', 'المكونات')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  placeholder={t('Add ingredient', 'أضف مكون')}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                />
                <Button onClick={addIngredient} type="button">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {ingredient}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeIngredient(index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>{t('Instructions', 'التعليمات')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      {t('Step', 'خطوة')} {index + 1}
                    </label>
                    <Textarea
                      value={instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      placeholder={t('Describe this step', 'صف هذه الخطوة')}
                      rows={2}
                    />
                  </div>
                  {instructions.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeInstruction(index)}
                      className="mt-6"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button onClick={addInstruction} variant="outline" type="button">
                <Plus className="h-4 w-4 mr-2" />
                {t('Add Step', 'أضف خطوة')}
              </Button>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button className="flex-1">
              {t('Publish Recipe', 'نشر الوصفة')}
            </Button>
            <Button variant="outline" className="flex-1">
              {t('Save as Draft', 'حفظ كمسودة')}
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default CreateRecipePage;
