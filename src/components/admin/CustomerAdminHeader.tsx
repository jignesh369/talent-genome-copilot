
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building, Search } from 'lucide-react';
import NotificationDropdown from '@/components/navigation/NotificationDropdown';
import UserProfileDropdown from '@/components/navigation/UserProfileDropdown';

interface CustomerAdminHeaderProps {
  organizationName: string;
}

const CustomerAdminHeader: React.FC<CustomerAdminHeaderProps> = ({ organizationName }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Organization Admin</h1>
              <p className="text-sm text-gray-600">{organizationName} - Advanced Platform Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => window.location.href = '/search'}>
              <Search className="w-4 h-4 mr-2" />
              AI Search
            </Button>
            <NotificationDropdown />
            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerAdminHeader;
