
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-sm">Last updated: January 15, 2024</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                By downloading, installing, or using the Wasfah AI application, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Wasfah AI is an AI-powered mobile application that provides recipe recommendations, meal planning, 
                and cooking assistance. Our service uses artificial intelligence to personalize your cooking experience 
                based on your preferences, dietary restrictions, and available ingredients.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                To access certain features of our service, you must create an account. You are responsible for:
              </p>
              <ul className="text-gray-700 space-y-1 list-disc list-inside">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acceptable Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700 leading-relaxed">You agree not to:</p>
              <ul className="text-gray-700 space-y-1 list-disc list-inside">
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Attempt to gain unauthorized access to the service</li>
                <li>Upload malicious code or harmful content</li>
                <li>Impersonate another person or entity</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content and Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                All content, features, and functionality of the Wasfah AI service are owned by us and protected by 
                copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, 
                sell, or lease any part of our service without our written permission.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer of Warranties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                The service is provided "as is" without warranties of any kind. We do not guarantee that the service 
                will be uninterrupted, error-free, or secure. Recipe recommendations are for informational purposes only, 
                and you should always use your own judgment when preparing food.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by law, Wasfah AI shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including but not limited to loss of profits, data, 
                or use, arising out of or relating to your use of the service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes 
                through the app or by email. Your continued use of the service after such changes constitutes acceptance 
                of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at legal@wasfah-ai.com 
                or through the app's support section.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default TermsOfService;
