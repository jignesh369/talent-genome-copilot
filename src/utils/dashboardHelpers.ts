
export const getPageTitle = (activeTab: string) => {
  const titles = {
    overview: 'Recruiter Platform',
    pipeline: 'Pipeline Analytics',
    'ai-matching': 'AI Matching Engine',
    interviews: 'Interview Management',
    communication: 'Communication Hub',
    team: 'Team Management'
  };
  return titles[activeTab as keyof typeof titles] || 'Recruiter Platform';
};

export const getPageSubtitle = (activeTab: string) => {
  const subtitles = {
    overview: 'Your unified recruiting command center',
    pipeline: 'Track and optimize your hiring funnel',
    'ai-matching': 'Leverage AI to find the perfect candidates',
    interviews: 'Schedule and manage candidate interviews',
    communication: 'Centralized communication hub',
    team: 'Manage your recruiting team'
  };
  return subtitles[activeTab as keyof typeof subtitles];
};
