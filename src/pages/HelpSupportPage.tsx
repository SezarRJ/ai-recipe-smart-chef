
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone, Book, Search, FileText, Users } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export default function HelpSupportPage() {
  const { t } = useRTL();

  const supportOptions = [
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
      title: t('Live Chat', 'دردشة مباشرة'),
      description: t('Get instant help from our support team', 'احصل على مساعدة فورية من فريق الدعم'),
      action: t('Start Chat', 'بدء دردشة')
    },
    {
      icon: <Mail className="h-8 w-8 text-green-500" />,
      title: t('Email Support', 'الدعم عبر البريد الإلكتروني'),
      description: t('Send us an email and we will get back to you', 'أرسل لنا بريد إلكتروني وسنرد عليك'),
      action: t('Send Email', 'إرسال بريد إلكتروني')
    },
    {
      icon: <Phone className="h-8 w-8 text-purple-500" />,
      title: t('Phone Support', 'الدعم الهاتفي'),
      description: t('Call us for immediate assistance', 'اتصل بنا للحصول على مساعدة فورية'),
      action: t('Call Now', 'اتصل الآن')
    }
  ];

  const helpResources = [
    {
      icon: <Book className="h-6 w-6 text-blue-600" />,
      title: t('User Guide', 'دليل المستخدم'),
      description: t('Complete guide to using WasfahAI', 'دليل شامل لاستخدام وصفة الذكية')
    },
    {
      icon: <FileText className="h-6 w-6 text-green-600" />,
      title: t('FAQ', 'الأسئلة الشائعة'),
      description: t('Frequently asked questions', 'الأسئلة المتكررة')
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: t('Community Forum', 'منتدى المجتمع'),
      description: t('Connect with other users', 'تواصل مع المستخدمين الآخرين')
    }
  ];

  return (
    <PageContainer header={{ title: t('Help & Support', 'المساعدة والدعم'), showBackButton: true }}>
      <div className="space-y-6 pb-24 p-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg text-white text-center mb-6">
          <MessageCircle className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('How can we help?', 'كيف يمكننا مساعدتك؟')}</h1>
          <p className="opacity-90">{t('We are here to assist you with any questions', 'نحن هنا لمساعدتك في أي أسئلة')}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">{t('Contact Support', 'الاتصال بالدعم')}</h2>
          {supportOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full p-3 bg-gray-100">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <Button variant="outline">{option.action}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">{t('Help Resources', 'مصادر المساعدة')}</h3>
            <div className="space-y-3">
              {helpResources.map((resource, index) => (
                <Button key={index} variant="ghost" className="w-full justify-start h-auto p-4">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full p-2 bg-gray-100">
                      {resource.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{resource.title}</div>
                      <div className="text-sm text-gray-600">{resource.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">{t('Quick Links', 'روابط سريعة')}</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                {t('Search FAQs', 'البحث في الأسئلة الشائعة')}
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Book className="h-4 w-4 mr-2" />
                {t('Getting Started', 'البدء')}
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                {t('Contact Information', 'معلومات الاتصال')}
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                {t('Report a Bug', 'الإبلاغ عن خطأ')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="font-medium mb-2">{t('Contact Information', 'معلومات الاتصال')}</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{t('Email: support@wasfah.ai', 'البريد الإلكتروني: support@wasfah.ai')}</p>
              <p>{t('Phone: +1 (555) 123-4567', 'الهاتف: +1 (555) 123-4567')}</p>
              <p>{t('Hours: Monday - Friday, 9 AM - 6 PM EST', 'الساعات: الاثنين - الجمعة، 9 صباحاً - 6 مساءً بتوقيت شرق أمريكا')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
