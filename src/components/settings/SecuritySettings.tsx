
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Shield, Key, LogOut } from 'lucide-react';
import FormSection from '@/components/shared/FormSection';

const SecuritySettings: React.FC = () => {
  const { userRole, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <FormSection title="Security Settings" icon={Shield}>
      <div className="space-y-4">
        <div>
          <Label>Current Role</Label>
          <div className="mt-1">
            <Badge className="capitalize">{userRole}</Badge>
          </div>
        </div>

        <Separator />

        <div>
          <Label>Change Password</Label>
          <p className="text-sm text-gray-600 mb-2">Update your password to keep your account secure</p>
          <Button variant="outline">
            <Key className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>

        <Separator />

        <div>
          <Label>Two-Factor Authentication</Label>
          <p className="text-sm text-gray-600 mb-2">Add an extra layer of security to your account</p>
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Enable 2FA
          </Button>
        </div>

        <Separator />

        <div>
          <Label className="text-red-600">Danger Zone</Label>
          <p className="text-sm text-gray-600 mb-2">Sign out of your account</p>
          <Button variant="destructive" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </FormSection>
  );
};

export default SecuritySettings;
