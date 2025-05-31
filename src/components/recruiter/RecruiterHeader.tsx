
import React from 'react';
import { Button } from '@/components/ui/button';
import UserProfileDropdown from '@/components/navigation/UserProfileDropdown';
import NotificationDropdown from '@/components/navigation/NotificationDropdown';
import { Search, Sparkles } from 'lucide-react';

interface RecruiterHeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
}

const RecruiterHeader: React.FC<RecruiterHeaderProps> = ({ 
  title, 
  subtitle = "Your unified recruiting command center",
  showSearch = true 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          {showSearch && (
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={() => window.location.href = '/search'}
            >
              <Search className="w-4 h-4" />
              <span>AI Search</span>
            </Button>
          )}
          <Button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600">
            <Sparkles className="w-4 h-4" />
            <span>AI Insights</span>
          </Button>
          <NotificationDropdown />
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default RecruiterHeader;
