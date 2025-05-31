
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import InviteMemberModal from '@/components/modals/InviteMemberModal';
import AIJobCreationWizard from '@/components/recruiter/AIJobCreationWizard';

interface DashboardModalsProps {
  showInviteModal: boolean;
  showCreateJobModal: boolean;
  onInviteModalClose: () => void;
  onCreateJobModalClose: () => void;
  onInviteMember: (memberData: any) => void;
  onCreateJob: (jobData: any) => void;
}

const DashboardModals: React.FC<DashboardModalsProps> = ({
  showInviteModal,
  showCreateJobModal,
  onInviteModalClose,
  onCreateJobModalClose,
  onInviteMember,
  onCreateJob
}) => {
  return (
    <>
      <InviteMemberModal
        isOpen={showInviteModal}
        onClose={onInviteModalClose}
        onInvite={onInviteMember}
      />

      <Dialog open={showCreateJobModal} onOpenChange={onCreateJobModalClose}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI-Powered Job Creation</DialogTitle>
          </DialogHeader>
          <AIJobCreationWizard
            onSubmit={onCreateJob}
            onCancel={onCreateJobModalClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardModals;
