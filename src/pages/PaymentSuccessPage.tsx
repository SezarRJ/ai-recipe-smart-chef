
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Receipt } from 'lucide-react';
import { AnimationWrapper } from '@/components/ui/enhanced-animations';
import Confetti from 'react-confetti';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer
      header={{
        title: 'Payment Successful',
        showBackButton: false,
      }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      <div className="container px-4 py-8">
        <AnimationWrapper type="scale" duration="slow">
          <Card className="max-w-md mx-auto text-center border-green-200 bg-green-50">
            <CardContent className="p-8">
              <AnimationWrapper type="bounce" delay={200}>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </AnimationWrapper>

              <AnimationWrapper type="fade" delay={400}>
                <h1 className="text-2xl font-bold text-green-800 mb-2">
                  Payment Successful!
                </h1>
              </AnimationWrapper>

              <AnimationWrapper type="fade" delay={600}>
                <p className="text-green-700 mb-6">
                  Welcome to Wasfah AI Premium! Your account has been upgraded and you now have access to all premium features.
                </p>
              </AnimationWrapper>

              <AnimationWrapper type="fade" delay={800}>
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/home')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Go to Home
                  </Button>

                  {sessionId && (
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/receipt/${sessionId}`)}
                      className="w-full border-green-300 text-green-700 hover:bg-green-50"
                    >
                      <Receipt className="h-4 w-4 mr-2" />
                      View Receipt
                    </Button>
                  )}
                </div>
              </AnimationWrapper>

              <AnimationWrapper type="fade" delay={1000}>
                <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Unlimited recipe access</li>
                    <li>• Advanced AI recommendations</li>
                    <li>• Premium meal planning</li>
                    <li>• Priority support</li>
                  </ul>
                </div>
              </AnimationWrapper>
            </CardContent>
          </Card>
        </AnimationWrapper>
      </div>
    </PageContainer>
  );
}
