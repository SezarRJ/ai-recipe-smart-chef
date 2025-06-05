
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
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
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { t, direction } = useRTL();

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: t('Voice recognition error', 'خطأ في التعرف على الصوت'),
          description: t('Please try again', 'يرجى المحاولة مرة أخرى'),
          variant: 'destructive',
        });
      };
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const speakMessage = (text: string) => {
    if (!synthRef.current || !isVoiceEnabled) return;

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: t('Voice recognition not supported', 'التعرف على الصوت غير مدعوم'),
        description: t('Your browser doesn\'t support voice recognition', 'متصفحك لا يدعم التعرف على الصوت'),
        variant: 'destructive',
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: t('Voice assistant activated', 'تم تفعيل المساعد الصوتي'),
        description: t('Speak your message now', 'تحدث برسالتك الآن'),
      });
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const userMessage = messageText || inputMessage.trim();
    if (!userMessage) return;

    setInputMessage('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      // Mock AI response with more cooking-specific responses
      const mockAIResponse = (userMessage: string) => {
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes('vegetarian')) {
          return t('I\'ll help you with delicious vegetarian recipes! Try a Mediterranean chickpea salad with fresh herbs, olive oil, and lemon. Would you like the full recipe with step-by-step instructions?', 'سأساعدك في وصفات نباتية لذيذة! جرب سلطة الحمص المتوسطية بالأعشاب الطازجة وزيت الزيتون والليمون. هل تريد الوصفة الكاملة مع التعليمات خطوة بخطوة؟');
        } else if (lowerMessage.includes('healthy')) {
          return t('For healthy cooking, focus on fresh ingredients, lean proteins, and colorful vegetables. I can suggest quinoa bowls, grilled salmon with vegetables, or hearty lentil soups. What type of healthy meal are you craving?', 'للطبخ الصحي، ركز على المكونات الطازجة والبروتينات الخالية من الدهون والخضروات الملونة. يمكنني اقتراح أوعية الكينوا أو السلمون المشوي مع الخضار أو شوربات العدس المشبعة. ما نوع الوجبة الصحية التي تشتهيها؟');
        } else if (lowerMessage.includes('recipe') || lowerMessage.includes('cook')) {
          return t('I\'d love to help you cook! Tell me what ingredients you have, your dietary preferences, or what type of cuisine you\'re in the mood for. I can provide detailed recipes with cooking times and techniques.', 'أحب أن أساعدك في الطبخ! أخبرني عن المكونات التي لديك أو تفضيلاتك الغذائية أو نوع المطبخ الذي تريده. يمكنني تقديم وصفات مفصلة مع أوقات الطبخ والتقنيات.');
        } else {
          return t('I\'m here to help with all your cooking questions! Whether you need recipes, cooking techniques, ingredient substitutions, or meal planning advice, just ask me. What would you like to cook today?', 'أنا هنا لمساعدتك في جميع أسئلة الطبخ! سواء كنت تحتاج وصفات أو تقنيات طبخ أو بدائل المكونات أو نصائح تخطيط الوجبات، فقط اسألني. ماذا تريد أن تطبخ اليوم؟');
        }
      };

      const aiResponse = mockAIResponse(userMessage);
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
      
      // Speak the AI response if voice is enabled
      if (isVoiceEnabled) {
        setTimeout(() => speakMessage(aiResponse), 500);
      }
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
              
              {/* Voice Controls */}
              <div className={`flex items-center justify-center space-x-4 mt-4 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                <Button
                  variant={isVoiceEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className="flex items-center space-x-2"
                >
                  {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  <span>{t('Voice', 'صوت')}</span>
                </Button>
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="sm"
                  onClick={toggleListening}
                  className="flex items-center space-x-2"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  <span>{isListening ? t('Stop', 'توقف') : t('Speak', 'تحدث')}</span>
                </Button>
              </div>
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
                      {message.type === 'ai' && isVoiceEnabled && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakMessage(message.content)}
                          className="ml-2 p-1 h-6 w-6"
                          disabled={isSpeaking}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      )}
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

          {/* Voice Status Indicator */}
          {(isListening || isSpeaking) && (
            <div className={`p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
              {isListening && (
                <>
                  <Mic className="h-4 w-4 text-blue-600 animate-pulse" />
                  <span className="text-sm text-blue-600">
                    {t("Listening...", "أستمع...")}
                  </span>
                </>
              )}
              {isSpeaking && (
                <>
                  <Volume2 className="h-4 w-4 text-green-600 animate-pulse" />
                  <span className="text-sm text-green-600">
                    {t("Speaking...", "أتحدث...")}
                  </span>
                </>
              )}
            </div>
          )}
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
            <Button onClick={() => handleSendMessage()} disabled={isLoading} className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white">
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
