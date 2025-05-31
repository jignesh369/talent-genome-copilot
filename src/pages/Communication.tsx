
import React from 'react';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import EnhancedCommunicationHub from '@/components/recruiter/EnhancedCommunicationHub';

const Communication = () => {
  return (
    <RecruiterLayout 
      title="Communications" 
      subtitle="Enhanced team collaboration and candidate communication"
    >
      <EnhancedCommunicationHub />
    </RecruiterLayout>
  );
};

export default Communication;
