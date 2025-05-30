
import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Loader2, Users, Building, Search, Settings, BarChart3, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CandidatePortal from '@/pages/CandidatePortal';

const SmartLanding = () => {
  // TEMPORARY: Show development navigation instead of role-based routing
  const SHOW_DEV_NAV = true;
  
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Show development navigation
  if (SHOW_DEV_NAV) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TalentGenome - Development Navigation</h1>
                <p className="text-sm text-gray-600">Choose a page to preview</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Admin Pages */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-purple-600" />
                  Startup Admin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Platform administration panel</p>
                <Button 
                  className="w-full" 
                  onClick={() => window.location.href = '/startup-admin'}
                >
                  View Page
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-600" />
                  Customer Admin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Organization administration panel</p>
                <Button 
                  className="w-full" 
                  onClick={() => window.location.href = '/customer-admin'}
                >
                  View Page
                </Button>
              </CardContent>
            </Card>

            {/* Main App Pages */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                  Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Main recruitment dashboard</p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.location.href = '/dashboard'}
                >
                  View Page
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Candidates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Candidate management</p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.location.href = '/candidates'}
                >
                  View Page
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                  Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Job posting management</p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.location.href = '/jobs'}
                >
                  View Page
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2 text-orange-600" />
                  AI Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Mind-reader search interface</p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.location.href = '/search'}
                >
                  View Page
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-red-600" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Recruitment analytics</p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.location.href = '/analytics'}
                >
                  View Page
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-gray-600" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Application settings</p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.location.href = '/settings'}
                >
                  View Page
                </Button>
              </CardContent>
            </Card>

            {/* Candidate Pages */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Candidate Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Public candidate portal</p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.location.href = '/candidate-portal'}
                >
                  View Page
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Candidate Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Candidate personal dashboard</p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.location.href = '/candidate-dashboard'}
                >
                  View Page
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Hiring Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Hiring manager dashboard</p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.location.href = '/hiring-manager'}
                >
                  View Page
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Development Mode:</strong> Authentication is temporarily disabled. 
              Remember to re-enable it before production by setting BYPASS_AUTH to false in ProtectedRoute.tsx and SHOW_DEV_NAV to false in SmartLanding.tsx.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // If not authenticated, show candidate portal
  if (!user) {
    return <CandidatePortal />;
  }

  // Route authenticated users based on their role
  switch (userRole) {
    case 'startup_admin':
      window.location.href = '/startup-admin';
      break;
    case 'customer_admin':
      window.location.href = '/customer-admin'; 
      break;
    case 'recruiter':
      window.location.href = '/candidates';
      break;
    case 'hiring_manager':
      window.location.href = '/hiring-manager';
      break;
    case 'candidate':
      window.location.href = '/candidate-dashboard';
      break;
    default:
      window.location.href = '/auth';
      break;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
};

export default SmartLanding;
