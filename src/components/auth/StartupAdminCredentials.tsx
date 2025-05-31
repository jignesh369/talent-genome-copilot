
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, CheckCircle } from 'lucide-react';

// Test credentials for startup admin
const STARTUP_ADMIN_CREDENTIALS = {
  email: 'admin@startup.com',
  password: 'startup123',
  role: 'startup_admin'
};

interface StartupAdminCredentialsProps {
  onSuccess: () => void;
}

const StartupAdminCredentials: React.FC<StartupAdminCredentialsProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple credential check for demo purposes
    if (email === STARTUP_ADMIN_CREDENTIALS.email && password === STARTUP_ADMIN_CREDENTIALS.password) {
      toast({
        title: "Login Successful",
        description: "Welcome to the Startup Admin panel!",
      });
      onSuccess();
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  const fillTestCredentials = () => {
    setEmail(STARTUP_ADMIN_CREDENTIALS.email);
    setPassword(STARTUP_ADMIN_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Startup Admin Login</CardTitle>
          <p className="text-gray-600">Access the administrative dashboard</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Test Credentials</span>
            </div>
            <p className="text-xs text-blue-700 mb-3">Use these credentials to access the admin panel:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Email:</strong> {STARTUP_ADMIN_CREDENTIALS.email}</p>
              <p><strong>Password:</strong> {STARTUP_ADMIN_CREDENTIALS.password}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fillTestCredentials}
              className="mt-2 w-full"
            >
              Fill Test Credentials
            </Button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartupAdminCredentials;
