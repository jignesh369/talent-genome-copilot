
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

  // Get default title based on current route or active tab
  const getDefaultTitle = () => {
    if (location.pathname === '/recruiter-dashboard') {
      switch (activeTab) {
        case 'overview':
          return 'Dashboard Overview';
        case 'candidates':
          return 'Candidate Pipeline';
        case 'jobs':
          return 'AI Matching & Jobs';
        case 'analytics':
          return 'Interview Management';
        case 'team':
          return 'Team Management';
        default:
          return 'Recruiter Platform';
      }
    }

    switch (location.pathname) {
      case '/candidates':
        return 'Talent Pipeline';
      case '/jobs':
        return 'Job Openings';
      case '/analytics':
        return 'Analytics & Intelligence';
      case '/search':
        return 'AI-Powered Talent Discovery';
      case '/settings':
        return 'Settings';
      default:
        return 'Recruiter Platform';
    }
  };

  const getDefaultSubtitle = () => {
    if (location.pathname === '/recruiter-dashboard') {
      switch (activeTab) {
        case 'overview':
          return 'Your unified recruiting command center';
        case 'candidates':
          return 'Manage your candidate pipeline and track progress';
        case 'jobs':
          return 'AI-powered job matching and management';
        case 'analytics':
          return 'Schedule and manage candidate interviews';
        case 'team':
          return 'Manage team members and permissions';
        default:
          return 'Your unified recruiting command center';
      }
    }

    switch (location.pathname) {
      case '/candidates':
        return 'Discover and manage your top candidates';
      case '/jobs':
        return 'Manage your open positions and hiring pipeline';
      case '/analytics':
        return 'Advanced insights and custom reporting';
      case '/search':
        return 'Discover exceptional talent with comprehensive analysis and AI insights';
      case '/settings':
        return 'Manage your account and preferences';
      default:
        return 'Your unified recruiting command center';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Single Sidebar Instance */}
      <RecruiterSidebar activeTab={activeTab} onTabChange={onTabChange} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <RecruiterHeader 
          title={title || getDefaultTitle()}
          subtitle={subtitle || getDefaultSubtitle()}
          showSearch={showSearch}
        />

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RecruiterLayout;
