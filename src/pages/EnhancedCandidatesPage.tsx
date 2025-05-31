
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import EnhancedCandidateProfile from '@/components/candidates/EnhancedCandidateProfile';
import CandidatePipelineManager from '@/components/candidates/CandidatePipelineManager';
import CandidateAnalyticsDashboard from '@/components/candidates/CandidateAnalyticsDashboard';
import { useEnhancedCandidateOperations } from '@/hooks/useEnhancedCandidateOperations';
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

const EnhancedCandidatesPage = () => {
  const {
    enhancedCandidates,
    selectedCandidate,
    setSelectedCandidate,
    handleStageChange,
    handleAddNote,
    handleScheduleInterview
  } = useEnhancedCandidateOperations();

  const [activeTab, setActiveTab] = useState('pipeline');
  const [viewingCandidate, setViewingCandidate] = useState<EnhancedCandidate | null>(null);

  const handleViewCandidate = (candidate: EnhancedCandidate) => {
    setViewingCandidate(candidate);
    setActiveTab('profile');
  };

  const handleBackToPipeline = () => {
    setViewingCandidate(null);
    setActiveTab('pipeline');
  };

  return (
    <RecruiterLayout 
      title="Enhanced Candidate Management" 
      subtitle="Advanced candidate tracking and analytics"
    >
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pipeline">Pipeline Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
            <TabsTrigger value="profile">Candidate Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline">
            <CandidatePipelineManager
              candidates={enhancedCandidates}
              onMoveCandidate={handleStageChange}
              onViewCandidate={handleViewCandidate}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <CandidateAnalyticsDashboard candidates={enhancedCandidates} />
          </TabsContent>

          <TabsContent value="profile">
            {viewingCandidate ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {viewingCandidate.first_name} {viewingCandidate.last_name}
                  </h2>
                  <button
                    onClick={handleBackToPipeline}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    ← Back to Pipeline
                  </button>
                </div>
                <EnhancedCandidateProfile
                  candidate={viewingCandidate}
                  onUpdateStage={(newStage) => handleStageChange(viewingCandidate.id, newStage)}
                  onAddNote={(note) => handleAddNote(viewingCandidate.id, note)}
                  onScheduleInterview={() => handleScheduleInterview(viewingCandidate.id)}
                />
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Select a candidate from the pipeline to view their detailed profile</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </RecruiterLayout>
  );
};

export default EnhancedCandidatesPage;
