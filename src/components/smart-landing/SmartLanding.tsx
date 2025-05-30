
import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Loader2 } from 'lucide-react';
import CandidatePortal from '@/pages/CandidatePortal';

const SmartLanding = () => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
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
