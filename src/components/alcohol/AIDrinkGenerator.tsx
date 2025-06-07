
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus, X } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const AIDrinkGenerator = () => {
  const { t } = useRTL();
  const [preferences, setPreferences] = useState<string[]>([]);
  const [newPreference, setNewPreference] = useState('');
  const [prompt, setPrompt] = useState('');

  const addPreference = () => {
    if (newPreference.trim()) {
      setPreferences([...preferences, newPreference.trim()]);
      setNewPreference('');
    }
  };

  const removePreference = (index: number) => {
    setPreferences(preferences.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-wasfah-bright-teal" />
            {t('AI Drink Generator', 'مولد المشروبات بالذكاء الاصطناعي')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('Describe your ideal drink', 'صف مشروبك المثالي')}
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t('e.g., refreshing summer cocktail with citrus flavors...', 'مثال: كوكتيل منعش صيفي بنكهات الحمضيات...')}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('Preferences', 'التفضيلات')}
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newPreference}
                onChange={(e) => setNewPreference(e.target.value)}
                placeholder={t('Add preference', 'أضف تفضيل')}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPreference())}
              />
              <Button onClick={addPreference} type="button" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences.map((pref, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {pref}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removePreference(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <Button className="w-full">
            <Sparkles className="h-4 w-4 mr-2" />
            {t('Generate Drink Recipe', 'إنشاء وصفة المشروب')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('Generated Recipe', 'الوصفة المُنشأة')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            {t('Generated recipe will appear here...', 'ستظهر الوصفة المُنشأة هنا...')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIDrinkGenerator;
