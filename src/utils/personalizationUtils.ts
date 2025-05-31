
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export const generateRecentAchievement = (candidate: EnhancedCandidate): string => {
  if (candidate.osint_profile?.github?.public_repos && candidate.osint_profile.github.public_repos > 10) {
    return `your active GitHub contributions with ${candidate.osint_profile.github.public_repos} repositories`;
  }
  if (candidate.skills.length > 3) {
    return `your expertise across ${candidate.skills.slice(0, 3).join(', ')}`;
  }
  return `your ${candidate.experience_years}+ years of experience at ${candidate.current_company}`;
};

export const extractIndustryFromCompany = (company: string): string => {
  const industries = ['fintech', 'healthcare', 'e-commerce', 'AI/ML', 'cybersecurity'];
  return industries[Math.floor(Math.random() * industries.length)];
};

export const generateProjectName = (candidate: EnhancedCandidate): string => {
  if (candidate.osint_profile?.github?.public_repos && candidate.osint_profile.github.public_repos > 0) {
    return 'your recent GitHub projects';
  }
  const projectNames = ['the platform architecture', 'the API redesign', 'the performance optimization'];
  return projectNames[Math.floor(Math.random() * projectNames.length)];
};

export const generateTechnicalHighlight = (candidate: EnhancedCandidate): string => {
  const highlights = [
    'the clean architecture and scalable design',
    'the innovative approach to solving complex problems',
    'the attention to code quality and best practices',
    'the comprehensive testing and documentation'
  ];
  return highlights[Math.floor(Math.random() * highlights.length)];
};

export const generatePersonalizationVariables = (candidate: EnhancedCandidate) => {
  return {
    candidate_name: candidate.name.split(' ')[0],
    company_name: 'TechCorp',
    role_title: 'Senior Software Engineer',
    recruiter_name: 'Sarah',
    top_skills: candidate.skills.slice(0, 3).join(', '),
    current_company: candidate.current_company,
    current_title: candidate.current_title,
    experience_years: candidate.experience_years.toString(),
    technical_skills: candidate.skills.filter(skill => 
      ['javascript', 'python', 'react', 'node', 'aws', 'kubernetes'].some(tech => 
        skill.toLowerCase().includes(tech)
      )
    ).slice(0, 2).join(' and '),
    recent_achievement: generateRecentAchievement(candidate),
    expertise_area: candidate.skills[0] || 'software development',
    industry_area: extractIndustryFromCompany(candidate.current_company),
    project_name: generateProjectName(candidate),
    technical_highlight: generateTechnicalHighlight(candidate),
    technical_challenge: 'scalability and performance optimization',
    role_description: 'lead our core platform development',
    key_benefits: 'competitive salary, equity, and remote flexibility'
  };
};
