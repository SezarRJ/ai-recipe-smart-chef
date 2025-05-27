
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { verifyAdminCredentials, setAdminAuth } from '@/lib/adminAuth';
import { WasfahLogo } from '@/components/icons/WasfahLogo';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      const result = verifyAdminCredentials(email, password);
      if (result.success && result.role) {
        // Set admin authentication with role
        setAdminAuth(result.role);
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 items-center text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your admin credentials to access the dashboard.
          </CardDescription>
          {error && (
            <div className="bg-red-50 text-red-800 rounded-md p-3 text-sm">
              {error}
            </div>
          )}
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@wasfahai.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Key className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-center text-sm text-gray-500">
              <p>Demo credentials:</p>
              <p><strong>Regular Admin:</strong></p>
              <p>Email: admin@wasfahai.com | Password: admin123</p>
              <p><strong>Super Admin:</strong></p>
              <p>Email: superadmin@wasfahai.com | Password: superadmin123</p>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>
                <a href="/" className="underline underline-offset-4 hover:text-primary">
                  Return to main application
                </a>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
