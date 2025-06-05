// src/pages/ai/SmartRecipeAdaptation.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Lightbulb, Utensils } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const SmartRecipeAdaptation = () => {
  const { t, direction } = useRTL();
  const [originalRecipe, setOriginalRecipe] = useState(
    "Classic Chocolate Chip Cookies (yields 24 cookies)\n\nIngredients:\n1 cup (2 sticks) unsalted butter, softened\n0.75 cup granulated sugar\n0.75 cup packed light brown sugar\n2 large eggs\n1 tsp vanilla extract\n2.25 cups all-purpose flour\n1 tsp baking soda\n0.5 tsp salt\n1 cup chocolate chips\n\nInstructions:\n1. Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.\n2. Cream butter and sugars until light and fluffy.\n3. Beat in eggs one at a time, then stir in vanilla.\n4. In a separate bowl, whisk together flour, baking soda, and salt.\n5. Gradually add dry ingredients to wet ingredients, mixing until just combined.\n6. Stir in chocolate chips.\n7. Drop rounded tablespoons of dough onto prepared baking sheets.\n8. Bake for 9-11 minutes, or until edges are golden brown and centers are still soft.\n9. Let cool on baking sheets for a few minutes before transferring to a wire rack."
  );
  const [adaptationRequest, setAdaptationRequest] = useState('');
  const [adaptedRecipe, setAdaptedRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mockAIAdaptation = async (recipe: string, request: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1500)); // 1.5 to 3.5 seconds

    let response = t("Here is your recipe, adapted based on your request:\n\n", "إليك وصفتك، معدلة بناءً على طلبك:\n\n");

    const lowerRequest = request.toLowerCase();

    if (lowerRequest.includes('no dairy') || lowerRequest.includes('dairy-free')) {
      response += recipe.replace(/butter/g, 'dairy-free butter alternative').replace(/milk/g, 'plant-based milk');
      response += t("\n\nNote: Dairy-free alternatives may alter texture slightly. Ensure all other ingredients are dairy-free.", "\n\nملاحظة: قد تغير بدائل الألبان القوام قليلاً. تأكد من أن جميع المكونات الأخرى خالية من الألبان.");
    } else if (lowerRequest.includes('instant pot') || lowerRequest.includes('pressure cooker')) {
      response += t("Adaptation for Instant Pot:\n", "تكيف لطنجرة الضغط:\n") + recipe.replace(/\nInstructions:\n(.|\n)*/, "\nInstructions:\n1. Sauté as needed in Instant Pot on SAUTE mode.\n2. Add liquids and main ingredients, scrape bottom of pot.\n3. Pressure cook according to ingredient type (e.g., chicken for 10-15 min, beans 20-30 min).\n4. Use natural or quick release as per recipe.\n");
      response += t("\n\n(This is a generic Instant Pot adaptation. Specific times will vary.)", "\n\n(هذا تكيف عام لطنجرة الضغط. تختلف الأوقات المحددة.)");
    } else if (lowerRequest.includes('only chicken and potatoes')) {
      response = t("Here's a simpler recipe using only chicken and potatoes, inspired by your original:\n\n", "إليك وصفة أبسط باستخدام الدجاج والبطاطس فقط، مستوحاة من وصفتك الأصلية:\n\n");
      response += t("Simple Roasted Chicken and Potatoes (yields 4 servings)\n\nIngredients:\n4 chicken thighs or breasts\n2 large potatoes, cut into wedges\n2 tbsp olive oil\n1 tsp dried rosemary\n0.5 tsp garlic powder\nSalt and pepper to taste\n\nInstructions:\n1. Preheat oven to 400°F (200°C).\n2. In a large bowl, toss chicken and potatoes with olive oil, rosemary, garlic powder, salt, and pepper.\n3. Spread in a single layer on a baking sheet.\n4. Bake for 30-40 minutes, or until chicken is cooked through and potatoes are tender and golden.\n", "دجاج وبطاطس مشوية بسيطة (تكفي 4 وجبات)\n\nالمكونات:\n4 أفخاذ دجاج أو صدور\n2 بطاطس كبيرة، مقطعة إلى شرائح\n2 ملعقة كبيرة زيت زيتون\n1 ملعقة صغيرة روزماري مجفف\n0.5 ملعقة صغيرة مسحوق ثوم\nملح وفلفل حسب الرغبة\n\nالتعليمات:\n1. سخن الفرن إلى 400 درجة فهرنهايت (200 درجة مئوية).\n2. في وعاء كبير، اخلط الدجاج والبطاطس بزيت الزيتون والروزماري ومسحوق الثوم والملح والفلفل.\n3. وزعها في طبقة واحدة على صينية خبز.\n4. اخبز لمدة 30-40 دقيقة، أو حتى ينضج الدجاج وتصبح البطاطس طرية وذهبية.");
    }
    else {
      response += t("I've made some general adaptations to your recipe. For best results, be specific about the dietary restrictions, equipment, or ingredients you want to adapt for!", "لقد أجريت بعض التعديلات العامة على وصفتك. للحصول على أفضل النتائج، كن محددًا بشأن القيود الغذائية، المعدات، أو المكونات التي تريد التكيف معها!");
      response += "\n\n" + recipe; // Fallback to original
    }
    return response;
  };

  const handleAdaptRecipe = async () => {
    if (!originalRecipe.trim() || !adaptationRequest.trim()) {
      toast({
        title: t("Missing Information", "معلومات مفقودة"),
        description: t("Please provide both the original recipe and your adaptation request.", "الرجاء توفير الوصفة الأصلية وطلب التكيف الخاص بك."),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAdaptedRecipe(''); // Clear previous results

    try {
      const result = await mockAIAdaptation(originalRecipe, adaptationRequest);
      setAdaptedRecipe(result);
      toast({
        title: t("Recipe Adapted!", "تم تكييف الوصفة!"),
        description: t("Your recipe has been successfully adapted.", "تم تعديل وصفتك بنجاح."),
      });
    } catch (error) {
      console.error('Recipe adaptation error:', error);
      toast({
        title: t("Error", "خطأ"),
        description: t("An error occurred during adaptation.", "حدث خطأ أثناء التكيف."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer header={{ title: t('Smart Recipe Adaptation', 'التكيف الذكي للوصفات'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-lg text-white text-center mb-6">
          <Lightbulb className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Smartly Adapt Any Recipe', 'كيف بذكاء أي وصفة')}</h1>
          <p className="opacity-90">{t('Modify recipes to fit dietary restrictions, available equipment, or specific ingredients.', 'عدّل الوصفات لتناسب القيود الغذائية، المعدات المتاحة، أو المكونات المحددة.')}</p>
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
              <label htmlFor="adaptation-request" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('How do you want to adapt it?', 'كيف تريد تكييفها؟')}
              </label>
              <Input
                id="adaptation-request"
                placeholder={t('e.g., "Make it dairy-free", "Use instant pot", "Only chicken and potatoes"', 'مثال: "اجعلها خالية من الألبان"، "استخدم طنجرة الضغط"، "فقط دجاج وبطاطس"')}
                value={adaptationRequest}
                onChange={(e) => setAdaptationRequest(e.target.value)}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleAdaptRecipe}
              disabled={isLoading || !originalRecipe.trim() || !adaptationRequest.trim()}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 animate-spin`} />
                  {t('Adapting...', 'جاري التكييف...')}
                </>
              ) : (
                <>
                  <Sparkles className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t('Adapt Recipe', 'تكييف الوصفة')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {adaptedRecipe && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <Utensils className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('Your Adapted Recipe', 'وصفتك المعدلة')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <pre className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                {adaptedRecipe}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default SmartRecipeAdaptation;
