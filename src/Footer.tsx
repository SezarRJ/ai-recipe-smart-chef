
import React from 'react';
import { ChefHat, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  language: string;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const translations = {
    en: {
      description: 'Transform your cooking journey with AI-powered culinary intelligence and global flavors.',
      features: 'Features',
      company: 'Company',
      support: 'Support',
      legal: 'Legal',
      links: {
        smartPlanning: 'Smart Meal Planning',
        recipeScanner: 'Recipe Scanner',
        globalCuisine: 'Global Cuisine',
        healthTracking: 'Health Tracking',
        aboutUs: 'About Us',
        careers: 'Careers',
        blog: 'Blog',
        press: 'Press',
        helpCenter: 'Help Center',
        contact: 'Contact Us',
        community: 'Community',
        developers: 'Developers',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Policy'
      },
      newsletter: 'Subscribe to our newsletter',
      newsletterDescription: 'Get the latest recipes and cooking tips',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      copyright: '© 2024 Tabkha AI. All rights reserved.',
      followUs: 'Follow us'
    },
    ar: {
      description: 'حول رحلة الطبخ الخاصة بك مع الذكاء الطهوي المدعوم بالذكاء الاصطناعي والنكهات العالمية.',
      features: 'المميزات',
      company: 'الشركة',
      support: 'الدعم',
      legal: 'قانوني',
      links: {
        smartPlanning: 'التخطيط الذكي للوجبات',
        recipeScanner: 'ماسح الوصفات',
        globalCuisine: 'المأكولات العالمية',
        healthTracking: 'تتبع الصحة',
        aboutUs: 'من نحن',
        careers: 'الوظائف',
        blog: 'المدونة',
        press: 'الصحافة',
        helpCenter: 'مركز المساعدة',
        contact: 'اتصل بنا',
        community: 'المجتمع',
        developers: 'المطورون',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة',
        cookies: 'سياسة ملفات تعريف الارتباط'
      },
      newsletter: 'اشترك في نشرتنا الإخبارية',
      newsletterDescription: 'احصل على أحدث الوصفات ونصائح الطبخ',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      subscribe: 'اشترك',
      copyright: '© 2024 Tabkha AI. جميع الحقوق محفوظة.',
      followUs: 'تابعنا'
    },
    fr: {
      description: 'Transformez votre parcours culinaire avec l\'intelligence culinaire alimentée par l\'IA et les saveurs mondiales.',
      features: 'Fonctionnalités',
      company: 'Entreprise',
      support: 'Support',
      legal: 'Légal',
      links: {
        smartPlanning: 'Planification Intelligente',
        recipeScanner: 'Scanner de Recettes',
        globalCuisine: 'Cuisine Mondiale',
        healthTracking: 'Suivi de Santé',
        aboutUs: 'À Propos',
        careers: 'Carrières',
        blog: 'Blog',
        press: 'Presse',
        helpCenter: 'Centre d\'Aide',
        contact: 'Nous Contacter',
        community: 'Communauté',
        developers: 'Développeurs',
        privacy: 'Politique de Confidentialité',
        terms: 'Conditions d\'Utilisation',
        cookies: 'Politique des Cookies'
      },
      newsletter: 'Abonnez-vous à notre newsletter',
      newsletterDescription: 'Recevez les dernières recettes et conseils de cuisine',
      emailPlaceholder: 'Entrez votre email',
      subscribe: 'S\'abonner',
      copyright: '© 2024 Tabkha AI. Tous droits réservés.',
      followUs: 'Suivez-nous'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-orange-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Tabkha AI
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t.description}
            </p>
            
            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-2">{t.newsletter}</h4>
              <p className="text-gray-400 text-sm mb-4">{t.newsletterDescription}</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-md font-medium transition-colors">
                  {t.subscribe}
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.features}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.smartPlanning}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.recipeScanner}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.globalCuisine}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.healthTracking}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.company}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.aboutUs}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.careers}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.blog}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.press}</a></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.support}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.helpCenter}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.contact}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.community}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.developers}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">{t.copyright}</p>
              <div className="flex space-x-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.privacy}</a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.terms}</a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">{t.links.cookies}</a>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">{t.followUs}:</span>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
