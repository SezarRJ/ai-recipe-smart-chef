
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Phone } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const { language } = useLanguage();
  const { signIn, signInWithPhone, signUp, signUpWithPhone, sendOTP, verifyOTP, signInWithGoogle, signInWithFacebook } = useAuth();
  const { toast } = useToast();
  
  const currentLanguage = lang || language || 'en';
  
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
        navigate(`/${currentLanguage}/home`);
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
        navigate(`/${currentLanguage}/home`);
      } else {
        if (authMethod === 'email') {
          await signUp(formData.email, formData.password);
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
    if (!formData.phone) {
      toast({
        title: 'Error',
        description: 'Please enter your phone number.',
        variant: 'destructive'
      });
      return;
    }

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

  const handleGoogleAuth = async () => {
    await signInWithGoogle();
  };

  const handleFacebookAuth = async () => {
    await signInWithFacebook();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleFacebookAuth}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Auth Method Tabs */}
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

            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

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
                      required
                    />
                  </div>
                )}

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
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="phone" className="space-y-4">
              {!showOTPForm ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1234567890"
                      required
                    />
                  </div>

                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

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
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button type="button" onClick={handleSubmit} className="w-full" disabled={loading}>
                        {loading ? 'Processing...' : 'Sign Up'}
                      </Button>
                    </>
                  )}

                  {isLogin && (
                    <Button type="button" onClick={handleSendOTP} className="w-full" disabled={loading}>
                      {loading ? 'Sending...' : 'Send OTP'}
                    </Button>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      name="otp"
                      type="text"
                      value={formData.otp}
                      onChange={handleInputChange}
                      placeholder="Enter 6-digit code"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify & Sign In'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowOTPForm(false)}
                  >
                    Back
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-600"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
