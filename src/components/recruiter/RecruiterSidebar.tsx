
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { navigationItems } from './navigation/NavigationItems';
import NavigationItem from './navigation/NavigationItem';

interface RecruiterSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const RecruiterSidebar: React.FC<RecruiterSidebarProps> = ({ activeTab, onTabChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isItemActive = (item: any) => {
    if (item.isDashboardTab) {
      return location.pathname === '/recruiter-dashboard' && activeTab === item.id;
    } else {
      return location.pathname === item.href;
    }
  };

  const handleItemClick = (item: any) => {
    if (item.isDashboardTab) {
      if (location.pathname !== '/recruiter-dashboard') {
        navigate('/recruiter-dashboard');
        setTimeout(() => {
          if (onTabChange) {
            onTabChange(item.id);
          }
        }, 100);
      } else {
        if (onTabChange) {
          onTabChange(item.id);
        }
      }
    }
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
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={isItemActive(item)}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default RecruiterSidebar;
