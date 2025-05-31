
import { UserRole } from './auth';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'draft' | 'active' | 'paused' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  requirements: string[];
  skills: string[];
  experience: string;
  salary_min?: number;
  salary_max?: number;
  remote: boolean;
  applications_count: number;
  views: number;
  posted_date: string;
  closing_date?: string;
  hiring_manager: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location: string;
  current_title?: string;
  current_company?: string;
  experience_years: number;
  skills: string[];
  education: Education[];
  resume_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  score: number;
  status: 'new' | 'screening' | 'interviewing' | 'offer' | 'hired' | 'rejected';
  source: 'direct' | 'referral' | 'job_board' | 'linkedin' | 'agency' | 'other';
  notes: Note[];
  applications: Application[];
  interviews: Interview[];
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  start_year: number;
  end_year?: number;
}

export interface Note {
  id: string;
  content: string;
  author: string;
  created_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  status: 'applied' | 'screening' | 'interview' | 'final' | 'offer' | 'hired' | 'rejected';
  stage: string;
  score?: number;
  applied_at: string;
  updated_at: string;
}

export interface Interview {
  id: string;
  application_id: string;
  type: 'phone' | 'video' | 'onsite' | 'technical' | 'panel';
  scheduled_at: string;
  duration: number;
  interviewer: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  feedback?: string;
  rating?: number;
  created_at: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  order: number;
  automated_actions?: string[];
}

export interface JobMetrics {
  applications_today: number;
  applications_week: number;
  applications_month: number;
  conversion_rate: number;
  avg_time_to_hire: number;
  quality_score: number;
}

export interface CandidateSearch {
  query?: string;
  skills?: string[];
  location?: string;
  experience_min?: number;
  experience_max?: number;
  status?: string;
  source?: string;
  sort_by?: 'relevance' | 'date' | 'score' | 'name';
  sort_order?: 'asc' | 'desc';
}
