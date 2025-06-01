
import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface SearchCandidate {
  id: string;
  name: string;
  email: string;
  location: string;
  current_title?: string;
  current_company?: string;
  experience_years: number;
  skills: string[];
  technical_depth_score: number;
  community_influence_score: number;
  learning_velocity_score: number;
  availability_status: 'active' | 'passive' | 'unavailable';
  match_score?: number;
}

export const useCandidateConversion = () => {
  const convertToSearchCandidate = (candidate: EnhancedCandidate): SearchCandidate => {
    return {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      location: candidate.location || '',
      current_title: candidate.current_title,
      current_company: candidate.current_company,
      experience_years: candidate.experience_years,
      skills: candidate.skills || [],
      technical_depth_score: candidate.technical_depth_score,
      community_influence_score: candidate.community_influence_score,
      learning_velocity_score: candidate.learning_velocity_score,
      availability_status: candidate.availability_status,
      match_score: candidate.match_score
    };
  };

  const convertToEnhancedCandidate = (searchCandidate: SearchCandidate): Partial<EnhancedCandidate> => {
    return {
      id: searchCandidate.id,
      name: searchCandidate.name,
      email: searchCandidate.email,
      location: searchCandidate.location,
      current_title: searchCandidate.current_title,
      current_company: searchCandidate.current_company,
      experience_years: searchCandidate.experience_years,
      skills: searchCandidate.skills,
      technical_depth_score: searchCandidate.technical_depth_score,
      community_influence_score: searchCandidate.community_influence_score,
      learning_velocity_score: searchCandidate.learning_velocity_score,
      availability_status: searchCandidate.availability_status,
      match_score: searchCandidate.match_score || 0
    };
  };

  return {
    convertToSearchCandidate,
    convertToEnhancedCandidate
  };
};
