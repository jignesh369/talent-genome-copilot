
export interface SystemConfiguration {
  // Platform Settings
  platformName: string;
  defaultPlan: 'starter' | 'professional' | 'enterprise';
  maxUsersPerOrg: number;
  maxJobsPerOrg: number;
  
  // Email Settings
  emailEnabled: boolean;
  smtpHost: string;
  smtpPort: number;
  emailFrom: string;
  
  // Security Settings
  passwordMinLength: number;
  requireMFA: boolean;
  sessionTimeout: number;
  
  // Feature Flags
  aiSearchEnabled: boolean;
  videoInterviewsEnabled: boolean;
  assessmentsEnabled: boolean;
  candidatePortalEnabled: boolean;
  
  // Notification Settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  slackIntegration: boolean;
}

export interface NotificationSettings {
  emailNewApplications: boolean;
  emailInterviewReminders: boolean;
  emailOfferUpdates: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  marketingEmails: boolean;
}
