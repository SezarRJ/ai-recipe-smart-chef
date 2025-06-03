
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Phone } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const { signIn, signInWithPhone, signUp, signUpWithPhone, sendOTP, verifyOTP } = useAuth();
  const { toast } = useToast();
  
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    fullName: '',
    otp: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (showOTPForm) {
        await verifyOTP(formData.phone, formData.otp);
        toast({
          title: 'Success!',
          description: 'Phone verified successfully!'
        });
        navigate('/home');
        return;
      }

      if (isLogin) {
        if (authMethod === 'email') {
          await signIn(formData.email, formData.password);
        } else {
          await signInWithPhone(formData.phone, formData.password);
        }
        toast({
          title: 'Welcome back!',
          description: 'You have been signed in successfully.'
        });
        navigate('/home');
      } else {
        if (authMethod === 'email') {
          await signUp(formData.email, formData.password, formData.fullName);
          toast({
            title: 'Account created!',
            description: 'Please check your email to verify your account.'
          });
        } else {
          await signUpWithPhone(formData.phone, formData.password, formData.fullName);
          toast({
            title: 'Account created!',
            description: 'Please verify your phone number.'
          });
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred during authentication.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      await sendOTP(formData.phone);
      setShowOTPForm(true);
      toast({
        title: 'OTP Sent!',
        description: 'Please check your phone for the verification code.'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send OTP.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wasfah-light-gray to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-wasfah-bright-teal">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </CardTitle>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Join WasfahAI today'}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={authMethod} onValueChange={(value) => setAuthMethod(value as 'email' | 'phone')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              )}

              <TabsContent value="email" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required={authMethod === 'email'}
                  />
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1234567890"
                    required={authMethod === 'phone'}
                  />
                </div>

                {authMethod === 'phone' && !showOTPForm && (
                  <Button
                    type="button"
                    onClick={handleSendOTP}
                    variant="outline"
                    className="w-full"
                    disabled={loading || !formData.phone}
                  >
                    Send OTP
                  </Button>
                )}

                {showOTPForm && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      name="otp"
                      type="text"
                      value={formData.otp}
                      onChange={handleInputChange}
                      placeholder="Enter OTP"
                      required={showOTPForm}
                    />
                  </div>
                )}
              </TabsContent>

              {!showOTPForm && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required={!showOTPForm}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                disabled={loading}
              >
                {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setShowOTPForm(false);
                  setFormData({ email: '', phone: '', password: '', fullName: '', otp: '' });
                }}
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
