
import React from 'react';
import SearchTabsContainer from '@/components/search/SearchTabsContainer';
import SearchHeader from '@/components/search/SearchHeader';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAuthContext } from '@/hooks/useAuthContext';

const Search: React.FC = () => {
  const { user, loading, organizationId } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search interface...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access the search functionality.</p>
          <button 
            onClick={() => window.location.href = '/auth'} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!organizationId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Organization Required</h2>
          <p className="text-gray-600 mb-4">No organization found for your account. Please contact your administrator.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <SearchHeader />
        <SearchTabsContainer />
      </div>
    </ErrorBoundary>
  );
};

export default Search;
