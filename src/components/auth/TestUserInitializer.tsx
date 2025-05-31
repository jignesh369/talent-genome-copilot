
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestUserService } from '@/services/testUserService';
import { useToast } from '@/hooks/use-toast';
import { Users, Loader2 } from 'lucide-react';

const TestUserInitializer: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const { toast } = useToast();

  const handleCreateTestUsers = async () => {
    setIsCreating(true);
    try {
      await TestUserService.createAllTestUsers();
      setIsCreated(true);
      toast({
        title: "Test Users Created",
        description: "All test user accounts have been created successfully.",
      });
    } catch (error) {
      console.error('Error creating test users:', error);
      toast({
        title: "Error",
        description: "Failed to create test users. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const credentials = TestUserService.getTestCredentials();

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Test User Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Create test user accounts for all role types with pre-configured data.
          </p>
          <Button 
            onClick={handleCreateTestUsers}
            disabled={isCreating || isCreated}
            className="min-w-[150px]"
          >
            {isCreating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isCreated ? 'Users Created' : 'Create Test Users'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {credentials.map((cred, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                {cred.role.replace('_', ' ').toUpperCase()}
              </h4>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {cred.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Password:</strong> {cred.password}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Org:</strong> {cred.organization}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Test Coverage</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 1 Startup Admin (full platform access)</li>
            <li>• 2 Customer Admins (organization management)</li>
            <li>• 2 Recruiters (candidate sourcing & management)</li>
            <li>• 2 Hiring Managers (interview & hiring decisions)</li>
            <li>• 3 Candidates (job application & assessment)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestUserInitializer;
