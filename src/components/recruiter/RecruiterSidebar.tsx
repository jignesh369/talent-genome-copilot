
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Brain, 
  Calendar,
  MessageSquare,
  UserPlus,
  Search,
  BarChart3,
  Settings
} from 'lucide-react';

interface RecruiterSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const RecruiterSidebar: React.FC<RecruiterSidebarProps> = ({ activeTab, onTabChange }) => {
  const location = useLocation();

  // Navigation items for both dashboard tabs and page routes
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/recruiter-dashboard', isDashboardTab: true },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/jobs', isDashboardTab: false },
    { id: 'candidates', label: 'Candidates', icon: Users, href: '/candidates', isDashboardTab: false },
    { id: 'pipeline', label: 'Pipeline', icon: TrendingUp, href: '/recruiter-dashboard', isDashboardTab: true },
    { id: 'ai-matching', label: 'AI Matching', icon: Brain, href: '/recruiter-dashboard', isDashboardTab: true },
    { id: 'interviews', label: 'Interviews', icon: Calendar, href: '/recruiter-dashboard', isDashboardTab: true },
    { id: 'communication', label: 'Communications', icon: MessageSquare, href: '/recruiter-dashboard', isDashboardTab: true },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics', isDashboardTab: false },
    { id: 'search', label: 'Search', icon: Search, href: '/search', isDashboardTab: false },
    { id: 'team', label: 'Team', icon: UserPlus, href: '/recruiter-dashboard', isDashboardTab: true },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', isDashboardTab: false },
  ];

  const isItemActive = (item: any) => {
    if (item.isDashboardTab) {
      return location.pathname === '/recruiter-dashboard' && activeTab === item.id;
    } else {
      return location.pathname === item.href;
    }
  };

  const handleItemClick = (item: any) => {
    if (item.isDashboardTab && onTabChange) {
      onTabChange(item.id);
    }
    // For non-dashboard tabs, Link will handle navigation
  };

  return (
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Recruiter Platform</h2>
            <p className="text-sm text-gray-500">Command Center</p>
          </div>
        </div>
        
        <div className="space-y-1">
          {navItems.map((item) => (
            <div key={item.id}>
              {item.isDashboardTab ? (
                <button
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isItemActive(item)
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isItemActive(item)
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default RecruiterSidebar;
