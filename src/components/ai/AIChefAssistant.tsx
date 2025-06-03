
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, ChefHat, Lightbulb, Utensils, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAIChef } from '@/hooks/useAIChef';
import { useRTL } from '@/contexts/RTLContext';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'recipe' | 'tip' | 'substitution' | 'general';
}

const quickQuestions = [
  {
    en: "How do I substitute eggs in baking?",
    ar: "كيف أستبدل البيض في الخبز؟",
    type: 'substitution'
  },
  {
    en: "What's a quick 30-minute dinner?",
    ar: "ما هو عشاء سريع لمدة 30 دقيقة؟",
    type: 'recipe'
  },
  {
    en: "How to properly season a dish?",
    ar: "كيفية تتبيل الطبق بشكل صحيح؟",
    type: 'tip'
  },
  {
    en: "Best way to store fresh herbs?",
    ar: "أفضل طريقة لحفظ الأعشاب الطازجة؟",
    type: 'tip'
  }
];

const AIChefAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '',
      isUser: false,
      timestamp: new Date(),
      type: 'general'
    },
  ]);
  const [input, setInput] = useState('');
  const { askAIChef, isLoading } = useAIChef();
  const { t, language } = useRTL();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial welcome message based on language
    const welcomeMessage = language === 'ar' 
      ? 'مرحباً! أنا مساعد الطبخ الذكي. يمكنني مساعدتك في الوصفات، تقنيات الطبخ، بدائل المكونات، ونصائح الطبخ. ماذا تريد أن تطبخ اليوم؟'
      : 'Hi! I\'m your AI Chef Assistant. I can help you with recipes, cooking techniques, ingredient substitutions, and culinary tips. What would you like to cook today?';
    
    setMessages([{
      id: '1',
      content: welcomeMessage,
      isUser: false,
      timestamp: new Date(),
      type: 'general'
    }]);
  }, [language]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Enhanced prompt for better cooking assistance
    const enhancedPrompt = `As an expert chef assistant, please help with this cooking query: "${textToSend}"
    
    Please provide detailed, helpful advice. If it's about:
    - Recipes: Include ingredients, steps, cooking tips, and timing
    - Techniques: Explain the method clearly with helpful tips
    - Substitutions: Suggest alternatives with ratios and notes
    - Storage: Provide best practices for freshness
    
    Keep responses practical and easy to follow. Use ${language === 'ar' ? 'Arabic' : 'English'} language.`;

    const response = await askAIChef(enhancedPrompt);

    // Determine message type based on content
    let messageType: 'recipe' | 'tip' | 'substitution' | 'general' = 'general';
    const content = response.response.toLowerCase();
    if (content.includes('recipe') || content.includes('ingredients') || content.includes('وصفة')) {
      messageType = 'recipe';
    } else if (content.includes('substitute') || content.includes('alternative') || content.includes('بديل')) {
      messageType = 'substitution';
    } else if (content.includes('tip') || content.includes('technique') || content.includes('نصيحة')) {
      messageType = 'tip';
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response.response,
      isUser: false,
      timestamp: new Date(),
      type: messageType
    };

    setMessages(prev => [...prev, aiMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'recipe': return <ChefHat className="h-4 w-4 text-green-600" />;
      case 'tip': return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      case 'substitution': return <Utensils className="h-4 w-4 text-blue-600" />;
      default: return <Bot className="h-4 w-4 text-wasfah-bright-teal" />;
    }
  };

  const getMessageTypeLabel = (type?: string) => {
    switch (type) {
      case 'recipe': return t('Recipe', 'وصفة');
      case 'tip': return t('Tip', 'نصيحة');
      case 'substitution': return t('Substitution', 'بديل');
      default: return '';
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-wasfah-bright-teal" />
          {t("AI Chef Assistant", "مساعد الطبخ الذكي")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-wasfah-bright-teal text-white'
                      : 'bg-gray-50 border'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!message.isUser && getMessageIcon(message.type)}
                    {message.isUser && <User className="h-4 w-4 mt-0.5" />}
                    <div className="flex-1">
                      {!message.isUser && message.type && message.type !== 'general' && (
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {getMessageTypeLabel(message.type)}
                        </Badge>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-1 ${message.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-wasfah-bright-teal" />
                    <span className="text-sm">{t("Thinking...", "جاري التفكير...")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="p-4 border-t bg-gray-50">
            <h4 className="text-sm font-medium mb-3">{t("Quick Questions", "أسئلة سريعة")}</h4>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSend(language === 'ar' ? question.ar : question.en)}
                  className="justify-start text-left h-auto py-2 px-3"
                >
                  {getMessageIcon(question.type)}
                  <span className="ml-2 text-xs">
                    {language === 'ar' ? question.ar : question.en}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("Ask me about cooking...", "اسألني عن الطبخ...")}
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSend()} 
              disabled={isLoading || !input.trim()}
              className="bg-wasfah-bright-teal hover:bg-wasfah-deep-teal"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChefAssistant;
