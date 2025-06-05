// src/pages/ai/RecipePersonalizerPage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, BookOpen } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const RecipePersonalizerPage = () => {
  const { t, direction } = useRTL();
  const [originalRecipe, setOriginalRecipe] = useState(
    "Classic Chocolate Chip Cookies (yields 24 cookies)\n\nIngredients:\n1 cup (2 sticks) unsalted butter, softened\n0.75 cup granulated sugar\n0.75 cup packed light brown sugar\n2 large eggs\n1 tsp vanilla extract\n2.25 cups all-purpose flour\n1 tsp baking soda\n0.5 tsp salt\n1 cup chocolate chips\n\nInstructions:\n1. Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.\n2. Cream butter and sugars until light and fluffy.\n3. Beat in eggs one at a time, then stir in vanilla.\n4. In a separate bowl, whisk together flour, baking soda, and salt.\n5. Gradually add dry ingredients to wet ingredients, mixing until just combined.\n6. Stir in chocolate chips.\n7. Drop rounded tablespoons of dough onto prepared baking sheets.\n8. Bake for 9-11 minutes, or until edges are golden brown and centers are still soft.\n9. Let cool on baking sheets for a few minutes before transferring to a wire rack."
  );
  const [personalizationRequest, setPersonalizationRequest] = useState('');
  const [personalizedRecipe, setPersonalizedRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mockAIPersonalizer = async (recipe: string, request: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(Math.random() * 2000 + 1500, resolve)); // 1.5 to 3.5 seconds

    let response = t("I've personalized your recipe based on your request:\n\n", "لقد قمت بتخصيص وصفتك بناءً على طلبك:\n\n");

    const lowerRequest = request.toLowerCase();

    if (lowerRequest.includes('vegan')) {
      response += recipe.replace(/butter/g, 'vegan butter').replace(/eggs/g, 'flax eggs (2 tbsp ground flaxseed + 6 tbsp water per egg)').replace(/milk/g, 'plant-based milk').replace(/chocolate chips/g, 'vegan chocolate chips');
      response += t("\n\nNote: Baking times/textures might vary slightly with vegan substitutes.", "\n\nملاحظة: قد تختلف أوقات الخبز/القوام قليلاً مع البدائل النباتية.");
    } else if (lowerRequest.includes('half') || lowerRequest.includes('smaller batch')) {
        const lines = recipe.split('\n');
        const scaledLines = lines.map(line => {
            const match = line.match(/^(\d+(\.\d+)?)\s*([a-zA-Z]+)?\s*(.*)$/);
            if (match) {
                const quantity = parseFloat(match[1]);
                return `${(quantity / 2).toFixed(2).replace(/\.00$/, '')} ${match[3] || ''} ${match[4]}`.trim();
            }
            return line;
        });
        response += scaledLines.join('\n');
        response += t("\n\nRecipe scaled to half! Remember to adjust baking time accordingly.", "\n\nتم تقليص الوصفة إلى النصف! تذكر تعديل وقت الخبز وفقًا لذلك.");
    } else if (lowerRequest.includes('gluten-free')) {
      response += recipe.replace(/all-purpose flour/g, 'gluten-free flour blend');
      response += t("\n\nNote: Using gluten-free flour may require adding xanthan gum or adjusting liquid. Check your GF flour blend instructions.", "\n\nملاحظة: قد يتطلب استخدام دقيق خالٍ من الغلوتين إضافة صمغ الزانثان أو تعديل السائل. تحقق من تعليمات مزيج دقيق خالي من الغلوتين.");
    } else if (lowerRequest.includes('spicy')) {
      response += recipe + t("\n\nTo make it spicy, consider adding 1/2 tsp cayenne pepper or 1 chopped jalapeño to the dough.", "\n\لجعله حارًا، فكر في إضافة 1/2 ملعقة صغيرة من فلفل الكايين أو حبة هلابينو مفرومة إلى العجين.");
    } else {
      response += t("I've made some general adjustments to your recipe. For best results, be specific about what you'd like to change!", "لقد أجريت بعض التعديلات العامة على وصفتك. للحصول على أفضل النتائج، كن محددًا بشأن ما ترغب في تغييره!");
      response += "\n\n" + recipe; // Fallback to original
    }
    return response;
  };

  const handlePersonalizeRecipe = async () => {
    if (!originalRecipe.trim() || !personalizationRequest.trim()) {
      toast({
        title: t("Missing Information", "معلومات مفقودة"),
        description: t("Please provide both the original recipe and your personalization request.", "الرجاء توفير الوصفة الأصلية وطلب التخصيص الخاص بك."),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setPersonalizedRecipe(''); // Clear previous results

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing

      const result = await mockAIPersonalizer(originalRecipe, personalizationRequest);
      setPersonalizedRecipe(result);
      toast({
        title: t("Recipe Personalized!", "تم تخصيص الوصفة!"),
        description: t("Your recipe has been successfully adjusted.", "تم تعديل وصفتك بنجاح."),
      });
    } catch (error) {
      console.error('Recipe personalization error:', error);
      toast({
        title: t("Error", "خطأ"),
        description: t("An error occurred during personalization.", "حدث خطأ أثناء التخصيص."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer header={{ title: t('Recipe Personalizer', 'مخصص الوصفات'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-orange-500 to-yellow-600 p-6 rounded-lg text-white text-center mb-6">
          <BookOpen className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Tailor Recipes to Your Needs', 'صمم الوصفات حسب احتياجاتك')}</h1>
          <p className="opacity-90">{t('Adjust any recipe to fit your taste, dietary needs, or ingredients on hand.', 'عدّل أي وصفة لتناسب ذوقك، احتياجاتك الغذائية، أو المكونات المتوفرة لديك.')}</p>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label htmlFor="original-recipe" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Original Recipe Text', 'نص الوصفة الأصلي')}
              </label>
              <Textarea
                id="original-recipe"
                placeholder={t('Paste your recipe here...', 'الصق وصفتك هنا...')}
                value={originalRecipe}
                onChange={(e) => setOriginalRecipe(e.target.value)}
                rows={10}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="personalize-request" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('How do you want to personalize it?', 'كيف تريد تخصيصها؟')}
              </label>
              <Input
                id="personalize-request"
                placeholder={t('e.g., "Make it vegan", "Less spicy", "For 2 servings"', 'مثال: "اجعلها نباتية"، "أقل حرارة"، "لشخصين"')}
                value={personalizationRequest}
                onChange={(e) => setPersonalizationRequest(e.target.value)}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handlePersonalizeRecipe}
              disabled={isLoading || !originalRecipe.trim() || !personalizationRequest.trim()}
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
                  {t('Personalize Recipe', 'تخصيص الوصفة')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {personalizedRecipe && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <BookOpen className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
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
