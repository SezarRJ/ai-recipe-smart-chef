
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChefHat, Send, Mic, MicOff, Sparkles, Clock, Users } from 'lucide-react';

const AiChefPage = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'ai',
      message: "Hello! I'm your AI Chef Assistant. I can help you with recipes, cooking techniques, ingredient substitutions, and meal planning. What would you like to cook today?",
      timestamp: '10:00 AM'
    },
    {
      id: 2,
      type: 'user',
      message: "I have chicken breast, tomatoes, and pasta. What can I make?",
      timestamp: '10:01 AM'
    },
    {
      id: 3,
      type: 'ai',
      message: "Great ingredients! I suggest making Chicken Pasta with Tomato Sauce. Here's a quick recipe: Season and cook the chicken, sauté tomatoes with garlic, cook pasta, then combine everything. Would you like detailed step-by-step instructions?",
      timestamp: '10:01 AM'
    }
  ]);

  const quickPrompts = [
    "Suggest a healthy dinner",
    "Substitute for eggs in baking",
    "30-minute meal ideas",
    "What to cook with leftovers?",
    "Vegetarian protein options",
    "Quick breakfast recipes"
  ];

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatHistory.length + 1,
        type: 'user' as const,
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: chatHistory.length + 2,
          type: 'ai' as const,
          message: "I understand you're looking for cooking guidance. Based on your request, I'd recommend... [This would be an actual AI response in a real implementation]",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Here you would implement voice recognition
  };

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <PageContainer
      header={{
        title: 'AI Chef Assistant',
        showBackButton: true
      }}
    >
      <div className="space-y-4 pb-24">
        {/* AI Chef Info */}
        <Card className="bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-white text-wasfah-bright-teal">
                  <ChefHat className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Chef AI</h3>
                <p className="text-sm opacity-90">Your personal cooking assistant</p>
              </div>
              <div className="ml-auto">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-3 text-center">
              <ChefHat className="h-6 w-6 text-wasfah-bright-teal mx-auto mb-1" />
              <div className="text-lg font-bold">10K+</div>
              <div className="text-xs text-gray-600">Recipes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Clock className="h-6 w-6 text-green-500 mx-auto mb-1" />
              <div className="text-lg font-bold">24/7</div>
              <div className="text-xs text-gray-600">Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Users className="h-6 w-6 text-blue-500 mx-auto mb-1" />
              <div className="text-lg font-bold">500K+</div>
              <div className="text-xs text-gray-600">Helped</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Prompts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quick Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-xs"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat History */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {chatHistory.map((chat) => (
            <div key={chat.id} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${chat.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`rounded-lg p-3 ${
                  chat.type === 'user' 
                    ? 'bg-wasfah-bright-teal text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{chat.message}</p>
                  <p className={`text-xs mt-1 ${
                    chat.type === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {chat.timestamp}
                  </p>
                </div>
              </div>
              {chat.type === 'ai' && (
                <Avatar className="h-8 w-8 order-0 mr-2 self-end">
                  <AvatarFallback className="bg-wasfah-bright-teal text-white text-xs">
                    <ChefHat className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t">
        <div className="max-w-md mx-auto">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Textarea
                placeholder="Ask me anything about cooking..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[40px] resize-none pr-12"
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1"
                onClick={toggleVoice}
              >
                {isListening ? 
                  <MicOff className="h-4 w-4 text-red-500" /> : 
                  <Mic className="h-4 w-4" />
                }
              </Button>
            </div>
            <Button 
              onClick={sendMessage}
              className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AiChefPage;
