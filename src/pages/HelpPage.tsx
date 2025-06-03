
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle, Mail, Phone, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HelpPage = () => {
  const { toast } = useToast();

  const faqs = [
    {
      question: "How do I create a recipe?",
      answer: "Go to the Recipes page and click on 'Create Recipe'. Fill in the details including ingredients, instructions, and cooking time."
    },
    {
      question: "Can I scan ingredients with my camera?",
      answer: "Yes! Use the 'Scan Ingredients' feature to identify ingredients using your device's camera."
    },
    {
      question: "How does the AI recipe generator work?",
      answer: "Our AI analyzes your preferences, dietary restrictions, and available ingredients to suggest personalized recipes."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption to protect your personal information and recipe data."
    },
    {
      question: "Can I share my recipes with others?",
      answer: "Absolutely! You can share your recipes with the community or privately with friends and family."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <PageContainer header={{ title: 'Help & Support', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-sm text-gray-600">Available 24/7</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Mail className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-sm text-gray-600">support@wasfahai.com</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Phone className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold">Phone Support</h3>
              <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Describe your issue or question..." rows={4} required />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default HelpPage;
