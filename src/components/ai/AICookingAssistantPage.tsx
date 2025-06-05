// src/pages/ai/AICookingAssistantPage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Loader2, Bot, User } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const AICookingAssistantPage = () => {
  const { t, direction } = useRTL();
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const mockAIAssistantResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(Math.random() * 1500 + 1000, resolve)); // 1 to 2.5 seconds

    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return t("Hello! How can I assist you with your cooking today?", "مرحبًا! كيف يمكنني مساعدتك في طهيك اليوم؟");
    } else if (lowerMessage.includes('recipe for')) {
      const dish = userMessage.split('recipe for')[1]?.trim() || t('something delicious', 'شيء لذيذ');
      return t(`I can help you with a recipe for ${dish}. What kind of ingredients do you have?`, `يمكنني مساعدتك بوصفة لـ ${dish}. ما نوع المكونات المتوفرة لديك؟`);
    } else if (lowerMessage.includes('troubleshoot') || lowerMessage.includes('problem')) {
      return t("Tell me more about the issue you're facing. What recipe are you making and what's going wrong?", "أخبرني المزيد عن المشكلة التي تواجهها. ما هي الوصفة التي تعدها وما الخطأ الذي يحدث؟");
    } else if (lowerMessage.includes('tips')) {
      return t("Sure! Are you looking for tips on a specific cuisine, technique, or ingredient?", "بالتأكيد! هل تبحث عن نصائح حول مطبخ معين، أو تقنية، أو مكون؟");
    } else if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
      return t("You're most welcome! Happy cooking!", "على الرحب والسعة! طبخ سعيد!");
    } else {
      return t("I'm an AI Cooking Assistant. I can help with recipes, cooking tips, substitutions, and troubleshooting. What's on your mind?", "أنا مساعد طبخ بالذكاء الاصطناعي. يمكنني المساعدة في الوصفات، نصائح الطبخ، البدائل، واستكشاف الأخطاء. ما الذي يدور في ذهنك؟");
    }
  };

  const handleSendMessage = async () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    const newUserMessage: ChatMessage = { id: `user-${Date.now()}`, sender: 'user', text: trimmedMessage };
    setChatHistory(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponseText = await mockAIAssistantResponse(trimmedMessage);
      const newAIMessage: ChatMessage = { id: `ai-${Date.now()}`, sender: 'ai', text: aiResponseText };
      setChatHistory(prev => [...prev, newAIMessage]);
    } catch (error) {
      console.error('AI assistant error:', error);
      toast({
        title: t("Error", "خطأ"),
        description: t("Failed to get response from AI assistant.", "فشل الحصول على رد من مساعد الذكاء الاصطناعي."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handleSendMessage();
    }
  };

  return (
    <PageContainer header={{ title: t('AI Cooking Assistant', 'مساعد الطبخ بالذكاء الاصطناعي'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-lg text-white text-center mb-6">
          <MessageSquare className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Your Smart Kitchen Companion', 'رفيق مطبخك الذكي')}</h1>
          <p className="opacity-90">{t('Ask me anything about cooking, recipes, or ingredients!', 'اسألني أي شيء عن الطهي أو الوصفات أو المكونات!')}</p>
        </div>

        <Card className="flex flex-col h-[50vh]">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <p>{t("Start a conversation! Ask me about a recipe, a cooking tip, or troubleshoot a dish.", "ابدأ محادثة! اسألني عن وصفة، نصيحة طهي، أو استكشاف الأخطاء في طبق.")}</p>
              </div>
            )}
            {chatHistory.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? (direction === 'rtl' ? 'justify-start' : 'justify-end') : (direction === 'rtl' ? 'justify-end' : 'justify-start')}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg shadow-md flex items-start space-x-2 rtl:space-x-reverse ${
                    message.sender === 'user'
                      ? 'bg-wasfah-bright-teal text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {message.sender === 'ai' && <Bot size={20} className="flex-shrink-0" />}
                  <p>{message.text}</p>
                  {message.sender === 'user' && <User size={20} className="flex-shrink-0" />}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`flex ${direction === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[70%] p-3 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 flex items-center space-x-2 rtl:space-x-reverse">
                  <Bot size={20} className="animate-pulse" />
                  <span>{t('AI is thinking...', 'الذكاء الاصطناعي يفكر...')}</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardHeader className="p-4 border-t dark:border-gray-700 flex flex-row items-center">
            <Textarea
              placeholder={t('Type your message...', 'اكتب رسالتك...')}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 resize-none h-12 pr-12 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className={`absolute bottom-6 ${direction === 'rtl' ? 'left-6' : 'right-6'} bg-wasfah-bright-teal hover:bg-wasfah-teal`}
            >
              <Send size={20} />
            </Button>
          </CardHeader>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AICookingAssistantPage;
