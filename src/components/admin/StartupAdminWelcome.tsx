
import React from 'react';

interface StartupAdminWelcomeProps {
  userName?: string;
}

const StartupAdminWelcome: React.FC<StartupAdminWelcomeProps> = ({ userName }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {userName || 'Admin'}! 👋
      </h2>
      <p className="text-gray-600">
        Monitor platform performance, manage AI models, control feature releases, and oversee customer organizations.
      </p>
    </div>
  );
};

export default StartupAdminWelcome;
