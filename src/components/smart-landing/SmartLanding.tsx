
import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CandidatePortal from '@/pages/CandidatePortal';

const SmartLanding = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();

  console.log('SmartLanding - User:', user?.email, 'Role:', userRole, 'Loading:', loading);

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
  React.useEffect(() => {
    if (user && userRole) {
      console.log('Redirecting user with role:', userRole);
      
      switch (userRole) {
        case 'startup_admin':
          console.log('Redirecting to startup admin');
          navigate('/startup-admin');
          break;
        case 'customer_admin':
          console.log('Redirecting to customer admin');
          navigate('/customer-admin'); 
          break;
        case 'recruiter':
          console.log('Redirecting to recruiter dashboard');
          navigate('/recruiter-dashboard');
          break;
        case 'hiring_manager':
          console.log('Redirecting to hiring manager dashboard');
          navigate('/recruiter-dashboard');
          break;
        case 'candidate':
          console.log('Redirecting to candidate dashboard');
          navigate('/candidate-dashboard');
          break;
        default:
          console.log('Unknown role, redirecting to auth');
          navigate('/auth');
          break;
      }
    } else if (user && !userRole) {
      console.log('User exists but no role found, defaulting to candidate');
      navigate('/candidate-dashboard');
    }
  }, [user, userRole, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
};

export default SmartLanding;
