
import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CandidatePortal from '@/pages/CandidatePortal';

const SmartLanding = () => {
  const navigate = useNavigate();
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
  React.useEffect(() => {
    if (user && userRole) {
      console.log('Redirecting user with role:', userRole);
      
      switch (userRole) {
        case 'startup_admin':
          navigate('/startup-admin');
          break;
        case 'customer_admin':
          navigate('/customer-admin'); 
          break;
        case 'recruiter':
          navigate('/candidates');
          break;
        case 'hiring_manager':
          navigate('/hiring-manager');
          break;
        case 'candidate':
          navigate('/candidate-dashboard');
          break;
        default:
          navigate('/auth');
          break;
      }
    }
  }, [user, userRole, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
};

export default SmartLanding;
