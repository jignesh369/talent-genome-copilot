
import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserProfileDropdown } from '@/components/navigation/UserProfileDropdown';
import { NotificationDropdown } from '@/components/navigation/NotificationDropdown';
import { Bell, Briefcase, User, MessageCircle, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const CandidateLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/candidate-dashboard', label: 'Dashboard', icon: Briefcase },
    { path: '/candidate-jobs', label: 'Jobs', icon: Briefcase },
    { path: '/candidate-applications', label: 'Applications', icon: FileText },
    { path: '/candidate-assessments', label: 'Assessments', icon: FileText },
    { path: '/candidate-interviews', label: 'Interviews', icon: MessageCircle },
    { path: '/candidate-offers', label: 'Offers', icon: FileText },
    { path: '/candidate-messages', label: 'Messages', icon: MessageCircle },
    { path: '/candidate-profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">TalentGenome</h1>
            <span className="text-sm text-gray-500">Candidate Portal</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationDropdown />
            <UserProfileDropdown />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActivePath(item.path) ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;
