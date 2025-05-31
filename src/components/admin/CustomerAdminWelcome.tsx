
import React from 'react';

interface CustomerAdminWelcomeProps {
  userName?: string;
}

const CustomerAdminWelcome: React.FC<CustomerAdminWelcomeProps> = ({ userName }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {userName || 'Admin'}! 👋
      </h2>
      <p className="text-gray-600">
        Manage your organization's advanced features, integrations, automation, and AI configuration.
      </p>
    </div>
  );
};

export default CustomerAdminWelcome;
