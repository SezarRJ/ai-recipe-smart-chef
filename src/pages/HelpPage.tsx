
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Search, HelpCircle, MessageCircle, Mail, Phone, Book, Video, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function HelpPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: "How do I create a new recipe?",
      answer: "To create a new recipe, go to the Recipes page and click the 'Add Recipe' button. Fill in the recipe details including ingredients, instructions, and cooking time."
    },
    {
      question: "How can I share my recipes with others?",
      answer: "You can share recipes by clicking the share button on any recipe card. This will generate a shareable link that you can send to friends and family."
    },
    {
      question: "How do I manage my subscription?",
      answer: "Go to Settings > Subscription to view and manage your subscription plan. You can upgrade, downgrade, or cancel your subscription from there."
    },
    {
      question: "How do I connect my smart kitchen devices?",
      answer: "Go to Settings > Connected Devices and click 'Scan for Devices'. Make sure your device is in pairing mode and follow the on-screen instructions."
    },
    {
      question: "How do I change my dietary preferences?",
      answer: "Navigate to Settings > Dietary Preferences where you can set your allergies, dietary restrictions, and food preferences."
    },
    {
      question: "How does the AI meal planning work?",
      answer: "Our AI analyzes your dietary preferences, available ingredients, and cooking history to suggest personalized meal plans for the week."
    }
  ];

  const helpCategories = [
    { icon: <Book size={20} />, title: "Getting Started", count: 8 },
    { icon: <MessageCircle size={20} />, title: "Recipes & Cooking", count: 12 },
    { icon: <HelpCircle size={20} />, title: "Account & Settings", count: 6 },
    { icon: <Video size={20} />, title: "Video Tutorials", count: 4 }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you within 24 hours.",
    });
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer header={{ title: 'Help & Support', showBackButton: true }}>
      <div className="p-4 space-y-6">
        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search for help articles, FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Help Categories */}
        <div className="grid grid-cols-2 gap-4">
          {helpCategories.map((category, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-wasfah-bright-teal">{category.icon}</div>
                  <span className="font-medium text-sm">{category.title}</span>
                  <Badge variant="secondary">{category.count} articles</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 border rounded-lg">
                <Mail className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-2" />
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-gray-600">support@wasfahai.com</p>
                <p className="text-xs text-gray-500">Response in 24h</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <MessageCircle className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-2" />
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-gray-600">Available 9AM-6PM</p>
                <Button variant="outline" size="sm" className="mt-2">Start Chat</Button>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Phone className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-2" />
                <h3 className="font-medium">Phone Support</h3>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                <p className="text-xs text-gray-500">Mon-Fri 9AM-6PM</p>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
              <Input
                placeholder="Subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                required
              />
              <Textarea
                placeholder="How can we help you?"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={4}
                required
              />
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
