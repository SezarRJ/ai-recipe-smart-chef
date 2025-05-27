
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface SignOutProps {
  className?: string;
}

export const SignOut: React.FC<SignOutProps> = ({ className }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = () => {
    // In a real app this would clear auth state, tokens, etc.
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account."
    });
    
    // Navigate to auth page
    navigate('/auth');
  };

  return (
    <Card 
      className={`bg-red-50 hover:bg-red-100 transition-colors cursor-pointer ${className || ''}`} 
      onClick={handleSignOut}
    >
      <CardContent className="p-4 flex items-center justify-center space-x-2">
        <LogOut className="h-5 w-5 text-red-600" />
        <span className="font-medium text-red-600">Sign Out</span>
      </CardContent>
    </Card>
  );
};
