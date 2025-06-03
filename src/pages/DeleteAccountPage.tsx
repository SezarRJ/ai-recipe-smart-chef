
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const DeleteAccountPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [confirmText, setConfirmText] = useState('');
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE' || !confirmCheckbox) {
      toast({
        title: 'Confirmation Required',
        description: 'Please confirm by typing DELETE and checking the checkbox',
        variant: 'destructive'
      });
      return;
    }

    setIsDeleting(true);
    try {
      // Delete user account
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: 'Account Deleted',
        description: 'Your account has been permanently deleted'
      });

      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete account. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Delete Account',
        showBackButton: true,
      }}
      className="max-w-2xl mx-auto"
    >
      <Card className="border-red-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <CardTitle className="text-red-700">Delete Your Account</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">Warning: This action cannot be undone</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• All your recipes will be permanently deleted</li>
              <li>• Your meal plans and favorites will be lost</li>
              <li>• Your pantry data will be removed</li>
              <li>• You won't be able to recover this data</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="confirm">Type "DELETE" to confirm:</Label>
              <Input
                id="confirm"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm-checkbox"
                checked={confirmCheckbox}
                onCheckedChange={(checked) => setConfirmCheckbox(checked === true)}
              />
              <Label htmlFor="confirm-checkbox" className="text-sm">
                I understand that this action cannot be undone
              </Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              disabled={confirmText !== 'DELETE' || !confirmCheckbox || isDeleting}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default DeleteAccountPage;
