
// src/pages/ai/RecipePersonalizerPage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, ChefHat, Utensils } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const RecipePersonalizerPage = () => {
  const { t, direction } = useRTL();
  const [preferences, setPreferences] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [personalizedRecipe, setPersonalizedRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const mockAIPersonalization = async (prefs: string, restrict: string): Promise<string> => {
    // Simulate AI processing time - Fixed setTimeout syntax
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1500)); // 1.5 to 3.5 seconds

    let response = t("Here's a personalized recipe based on your preferences:\n\n", "إليك وصفة مخصصة بناءً على تفضيلاتك:\n\n");

    if (prefs.toLowerCase().includes('vegetarian') || restrict.toLowerCase().includes('meat')) {
      response += t("🌱 Vegetarian Mediterranean Bowl\n\nIngredients:\n• 1 cup quinoa\n• 1 can chickpeas, drained\n• 2 cups mixed greens\n• 1 cucumber, diced\n• 1 cup cherry tomatoes\n• 1/2 red onion, sliced\n• 1/4 cup olives\n• 2 tbsp olive oil\n• 1 lemon, juiced\n• Fresh herbs (parsley, mint)\n\nInstructions:\n1. Cook quinoa according to package directions\n2. Roast chickpeas with olive oil and spices\n3. Combine all vegetables in a large bowl\n4. Add quinoa and chickpeas\n5. Dress with olive oil and lemon juice\n6. Garnish with fresh herbs", "🌱 وعاء البحر الأبيض المتوسط النباتي\n\nالمكونات:\n• كوب واحد من الكينوا\n• علبة حمص، مصفاة\n• كوبان من الخضار المشكلة\n• خيارة واحدة، مقطعة مكعبات\n• كوب طماطم كرزية\n• نصف بصلة حمراء، مقطعة شرائح\n• ربع كوب زيتون\n• ملعقتان كبيرتان زيت زيتون\n• ليمونة واحدة، معصورة\n• أعشاب طازجة (بقدونس، نعناع)\n\nالتعليمات:\n1. اطبخ الكينوا حسب تعليمات العبوة\n2. اشوِ الحمص بزيت الزيتون والتوابل\n3. اخلط جميع الخضروات في وعاء كبير\n4. أضف الكينوا والحمص\n5. تبل بزيت الزيتون وعصير الليمون\n6. زين بالأعشاب الطازجة");
    } else if (prefs.toLowerCase().includes('protein') || prefs.toLowerCase().includes('muscle')) {
      response += t("💪 High-Protein Grilled Chicken Bowl\n\nIngredients:\n• 8 oz chicken breast\n• 1 cup brown rice\n• 1 cup broccoli\n• 1/2 avocado\n• 2 eggs, boiled\n• 1 tbsp olive oil\n• Spices: garlic powder, paprika\n• Salt and pepper\n\nInstructions:\n1. Season and grill chicken breast\n2. Cook brown rice\n3. Steam broccoli until tender\n4. Boil eggs to desired doneness\n5. Slice avocado\n6. Combine all in a bowl\n7. Drizzle with olive oil", "💪 وعاء الدجاج المشوي عالي البروتين\n\nالمكونات:\n• 8 أونصات صدر دجاج\n• كوب أرز بني\n• كوب بروكلي\n• نصف أفوكادو\n• بيضتان، مسلوقتان\n• ملعقة كبيرة زيت زيتون\n• توابل: مسحوق الثوم، البابريكا\n• ملح وفلفل\n\nالتعليمات:\n1. تبل واشوِ صدر الدجاج\n2. اطبخ الأرز البني\n3. اطبخ البروكلي بالبخار حتى ينضج\n4. اسلق البيض حسب الرغبة\n5. قطع الأفوكادو شرائح\n6. اجمع الكل في وعاء\n7. رش بزيت الزيتون");
    } else {
      response += t("🍝 Classic Pasta Primavera\n\nIngredients:\n• 12 oz whole wheat pasta\n• 2 cups mixed vegetables\n• 3 cloves garlic, minced\n• 2 tbsp olive oil\n• 1/4 cup parmesan cheese\n• Fresh basil\n• Salt and pepper\n\nInstructions:\n1. Cook pasta according to package directions\n2. Sauté garlic in olive oil\n3. Add vegetables and cook until tender\n4. Toss with cooked pasta\n5. Add parmesan and fresh basil\n6. Season to taste", "🍝 باستا بريمافيرا الكلاسيكية\n\nالمكونات:\n• 12 أونصة باستا قمح كامل\n• كوبان خضار مشكلة\n• 3 فصوص ثوم، مفروم\n• ملعقتان كبيرتان زيت زيتون\n• ربع كوب جبن بارميزان\n• ريحان طازج\n• ملح وفلفل\n\nالتعليمات:\n1. اطبخ الباستا حسب تعليمات العبوة\n2. اقلِ الثوم في زيت الزيتون\n3. أضف الخضار واطبخ حتى تنضج\n4. اخلط مع الباستا المطبوخة\n5. أضف البارميزان والريحان الطازج\n6. تبل حسب الذوق");
    }

    response += t("\n\nEnjoy your personalized recipe! Adjust ingredients based on your specific needs.", "\n\nاستمتع بوصفتك المخصصة! عدّل المكونات حسب احتياجاتك المحددة.");
    return response;
  };

  const handlePersonalizeRecipe = async () => {
    if (!preferences.trim()) {
      toast({
        title: t("Missing Information", "معلومات مفقودة"),
        description: t("Please provide your food preferences.", "الرجاء تقديم تفضيلاتك الغذائية."),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasGenerated(true);
    setPersonalizedRecipe(''); // Clear previous results
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate AI processing

    try {
      const result = await mockAIPersonalization(preferences, restrictions);
      setPersonalizedRecipe(result);
      toast({
        title: t("Recipe Personalized!", "تم تخصيص الوصفة!"),
        description: t("Your personalized recipe has been generated.", "تم إنشاء وصفتك المخصصة."),
      });
    } catch (error) {
      console.error('Recipe personalization error:', error);
      toast({
        title: t("Error", "خطأ"),
        description: t("An error occurred during recipe personalization.", "حدث خطأ أثناء تخصيص الوصفة."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer header={{ title: t('Recipe Personalizer', 'مخصص الوصفات'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-lg text-white text-center mb-6">
          <ChefHat className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Get Recipes Tailored Just for You', 'احصل على وصفات مصممة خصيصًا لك')}</h1>
          <p className="opacity-90">{t('Tell us your preferences and get personalized recipe recommendations.', 'أخبرنا عن تفضيلاتك واحصل على توصيات وصفات مخصصة.')}</p>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Food Preferences', 'التفضيلات الغذائية')}
              </label>
              <Textarea
                id="preferences"
                placeholder={t('e.g., "I love Mediterranean flavors", "High protein meals", "Vegetarian options"', 'مثال: "أحب النكهات المتوسطية"، "وجبات عالية البروتين"، "خيارات نباتية"')}
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                rows={3}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="restrictions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Dietary Restrictions (Optional)', 'القيود الغذائية (اختيارية)')}
              </label>
              <Input
                id="restrictions"
                placeholder={t('e.g., "No nuts", "Gluten-free", "Dairy-free"', 'مثال: "بدون مكسرات"، "خالي من الغلوتين"، "خالي من الألبان"')}
                value={restrictions}
                onChange={(e) => setRestrictions(e.target.value)}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handlePersonalizeRecipe}
              disabled={isLoading || !preferences.trim()}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 animate-spin`} />
                  {t('Personalizing...', 'جاري التخصيص...')}
                </>
              ) : (
                <>
                  <Sparkles className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t('Get Personalized Recipe', 'احصل على وصفة مخصصة')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {hasGenerated && personalizedRecipe && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <Utensils className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('Your Personalized Recipe', 'وصفتك المخصصة')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <pre className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                {personalizedRecipe}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default RecipePersonalizerPage;
