
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Sparkles, ChefHat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AiChefPage = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: "Hello! I'm your AI Chef assistant. I can help you create recipes, suggest cooking techniques, and answer any culinary questions. What would you like to cook today?"
    }
  ]);

  const quickPrompts = [
    "Quick dinner for 2 people",
    "Healthy breakfast ideas",
    "Italian pasta recipes",
    "Vegetarian meal prep",
    "Easy dessert recipes",
    "Low-carb lunch options"
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      setChatHistory(prev => [...prev, { type: 'ai', message: aiResponse }]);
      setLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string) => {
    const responses = [
      "Based on your request, I'd recommend a delicious Mediterranean chicken with roasted vegetables. Here's a quick recipe: Season chicken breast with herbs, roast with bell peppers, zucchini, and tomatoes at 400°F for 25 minutes. Serve with quinoa for a complete meal!",
      "That sounds like a great idea! For a healthy breakfast, try overnight oats with fresh berries, chia seeds, and a drizzle of honey. Or perhaps some avocado toast with a poached egg and everything bagel seasoning?",
      "Perfect! For pasta lovers, I suggest Cacio e Pepe - it's simple but elegant. Just pasta, Pecorino Romano cheese, black pepper, and pasta water. The key is creating a creamy emulsion without cream!",
      "For meal prep, consider making a big batch of chickpea curry with vegetables. It stores well, reheats beautifully, and is packed with protein and fiber. Serve over rice or with naan bread."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <PageContainer header={{ title: 'AI Chef Assistant', showBackButton: true }}>
      <div className="flex flex-col h-[calc(100vh-140px)] pb-20">
        {/* Header Card */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Chef Assistant</CardTitle>
                <p className="text-sm text-gray-600">Your personal cooking companion</p>
              </div>
              <Sparkles className="h-5 w-5 text-yellow-500 ml-auto" />
            </div>
          </CardHeader>
        </Card>

        {/* Quick Prompts */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleQuickPrompt(prompt)}
              >
                {prompt}
              </Badge>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 mb-4">
          <CardContent className="p-4 h-full overflow-y-auto">
            <div className="space-y-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    chat.type === 'user' 
                      ? 'bg-wasfah-bright-teal text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {chat.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <ChefHat className="h-4 w-4" />
                        <span className="text-xs font-medium">AI Chef</span>
                      </div>
                    )}
                    <p className="text-sm">{chat.message}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-wasfah-bright-teal"></div>
                      <span className="text-sm">AI Chef is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about cooking, recipes, or ingredients..."
                className="flex-1 min-h-[40px] max-h-32"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || loading}
                size="icon"
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AiChefPage;
