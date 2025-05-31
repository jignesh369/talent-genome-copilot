
import React from 'react';
import { useAuth } from './AuthProvider';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles,
  fallback 
}) => {
  const { user, userRole, loading } = useAuth();

  console.log('ProtectedRoute - User:', user?.email, 'Role:', userRole, 'Loading:', loading, 'AllowedRoles:', allowedRoles);

  // Show loading spinner while authentication is being checked
  if (loading) {
    console.log('ProtectedRoute: Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth page if not authenticated
  if (!user) {
    console.log('User not authenticated, redirecting to /auth');
    window.location.href = '/auth';
    return null;
  }

  // Check role authorization if roles are specified
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    console.log('Access denied - User role:', userRole, 'Required roles:', allowedRoles);
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-500 mt-2">Current role: {userRole}</p>
          <p className="text-sm text-gray-500">Required roles: {allowedRoles.join(', ')}</p>
        </div>
      </div>
    );
  }

  // Show loading if user exists but role is still being fetched
  if (user && allowedRoles && !userRole) {
    console.log('User exists but no role found - showing permissions loading');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading user permissions...</p>
          <p className="text-xs text-gray-400 mt-2">User: {user.email}</p>
        </div>
      </div>
    );
  }

  console.log('ProtectedRoute: Rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
