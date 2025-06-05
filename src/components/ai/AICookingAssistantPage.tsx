// src/components/ai/AICookingAssistantPage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

const AICookingAssistantPage = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t, direction } = useRTL();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      // Mock AI response
      const mockAIResponse = (userMessage: string) => {
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes('vegetarian')) {
          return t('Okay, I will provide you with vegetarian recipes.', 'حسنًا، سأقدم لك وصفات نباتية.');
        } else if (lowerMessage.includes('healthy')) {
          return t('Sure, let us focus on healthy options.', 'بالتأكيد، دعنا نركز على الخيارات الصحية.');
        } else {
          return t('Understood. How can I assist you further?', 'فهمت. كيف يمكنني مساعدتك أيضًا؟');
        }
      };

      const aiResponse = mockAIResponse(userMessage);
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('AI Cooking Assistant error:', error);
      toast({
        title: t('Error', 'خطأ'),
        description: t('An error occurred while processing your request.', 'حدث خطأ أثناء معالجة طلبك.'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer header={{ title: t('AI Cooking Assistant', 'مساعد الطبخ بالذكاء الاصطناعي'), showBackButton: true }}>
      <div className={`flex flex-col h-full p-4 pb-20 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="flex-grow space-y-4">
          <Card className="bg-gradient-to-br from-blue-100 to-purple-50 dark:from-gray-800 dark:to-gray-700 text-center">
            <CardContent className="p-6">
              <Bot className="h-10 w-10 mx-auto mb-4 text-blue-500 dark:text-blue-400" />
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">{t('Your Personal Cooking Assistant', 'مساعدك الشخصي في الطبخ')}</h1>
              <p className="text-gray-600 dark:text-gray-400">{t('Ask me anything about cooking, recipes, or ingredients!', 'اسألني أي شيء عن الطبخ أو الوصفات أو المكونات!')}</p>
            </CardContent>
          </Card>

          <div className="flex-grow overflow-y-auto">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4 p-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'ai' && (
                      <Avatar className="w-8 h-8 mr-3">
                        <AvatarImage>
                          <Bot className="w-5 h-5" />
                        </AvatarImage>
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg p-3 w-fit max-w-[80%] ${message.type === 'user' ? 'bg-wasfah-light-teal text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                      {message.content}
                    </div>
                    {message.type === 'user' && (
                      <Avatar className="w-8 h-8 ml-3">
                        <AvatarImage>
                          <User className="w-5 h-5" />
                        </AvatarImage>
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start justify-start">
                    <Avatar className="w-8 h-8 mr-3">
                      <AvatarImage>
                        <Bot className="w-5 h-5" />
                      </AvatarImage>
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center space-x-3">
            <Input
              type="text"
              placeholder={t('Ask me anything...', 'اسألني أي شيء...')}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              className="flex-grow bg-white dark:bg-gray-700 dark:text-white"
            />
            <Button onClick={handleSendMessage} disabled={isLoading} className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AICookingAssistantPage;
