
import React from 'react';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OutreachSequenceBuilder from '@/components/recruiter/outreach/OutreachSequenceBuilder';
import SequenceAnalyticsDashboard from '@/components/recruiter/outreach/SequenceAnalyticsDashboard';
import CandidatePersonalizationEngine from '@/components/recruiter/outreach/CandidatePersonalizationEngine';

const OutreachSequences = () => {
  return (
    <RecruiterLayout 
      title="Outreach Sequences" 
      subtitle="AI-powered personalized candidate outreach and automation"
    >
      <Tabs defaultValue="builder" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="builder">Sequence Builder</TabsTrigger>
          <TabsTrigger value="personalization">AI Personalization</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="builder">
          <OutreachSequenceBuilder />
        </TabsContent>

        <TabsContent value="personalization">
          <CandidatePersonalizationEngine />
        </TabsContent>

        <TabsContent value="analytics">
          <SequenceAnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </RecruiterLayout>
  );
};

export default OutreachSequences;
