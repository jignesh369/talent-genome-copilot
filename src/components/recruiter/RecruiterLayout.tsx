
import React from 'react';
import { useLocation } from 'react-router-dom';
import RecruiterSidebar from './RecruiterSidebar';
import RecruiterHeader from './RecruiterHeader';

interface RecruiterLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const RecruiterLayout: React.FC<RecruiterLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  showSearch = true,
  activeTab,
  onTabChange 
}) => {
  const location = useLocation();

  // Get default title based on current route
  const getDefaultTitle = () => {
    switch (location.pathname) {
      case '/candidates':
        return 'Talent Pipeline';
      case '/jobs':
        return 'Job Openings';
      case '/analytics':
        return 'Analytics & Genome';
      case '/search':
        return 'AI-Powered Talent Discovery';
      case '/settings':
        return 'Settings';
      case '/recruiter-dashboard':
        return 'Recruiter Platform';
      default:
        return 'Recruiter Platform';
    }
  };

  const getDefaultSubtitle = () => {
    switch (location.pathname) {
      case '/candidates':
        return 'Discover and manage your top candidates';
      case '/jobs':
        return 'Manage your open positions and hiring pipeline';
      case '/analytics':
        return 'Insights that compound over time';
      case '/search':
        return 'Discover exceptional talent with comprehensive OSINT analysis and AI insights';
      case '/settings':
        return 'Manage your account and preferences';
      default:
        return 'Your unified recruiting command center';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <RecruiterSidebar activeTab={activeTab} onTabChange={onTabChange} />

      {/* Main Content */}
      <div className="flex-1">
        <RecruiterHeader 
          title={title || getDefaultTitle()}
          subtitle={subtitle || getDefaultSubtitle()}
          showSearch={showSearch}
        />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RecruiterLayout;
