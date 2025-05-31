
// Job related types
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type JobStatus = 'draft' | 'active' | 'paused' | 'closed';
export type JobPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  status: JobStatus;
  priority: JobPriority;
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
  hiring_manager?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface JobMetrics {
  applications_today: number;
  applications_week: number;
  applications_month: number;
  conversion_rate: number;
  avg_time_to_hire: number;
  quality_score: number;
}

// Candidate related types
export type CandidateStatus = 'new' | 'screening' | 'interviewing' | 'offer' | 'hired' | 'rejected';
export type CandidateSource = 'direct' | 'referral' | 'job_board' | 'linkedin' | 'agency' | 'other';

export interface CandidateEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_year: number;
  end_year?: number;
}

export interface CandidateNote {
  id: string;
  content: string;
  author: string;
  created_at: string;
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
  education: CandidateEducation[];
  score: number;
  status: CandidateStatus;
  source: CandidateSource;
  notes: CandidateNote[];
  applications: Application[];
  interviews: Interview[];
  created_at: string;
  updated_at: string;
}

export interface CandidateSearch {
  query?: string;
  skills?: string[];
  status?: CandidateStatus;
  experience_min?: number;
  experience_max?: number;
  sort_by?: 'score' | 'date' | 'name';
  sort_order?: 'asc' | 'desc';
}

// Application related types
export type ApplicationStatus = 'applied' | 'screening' | 'interview' | 'final' | 'offer' | 'hired' | 'rejected';

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  status: ApplicationStatus;
  stage?: string;
  score?: number;
  cover_letter?: string;
  applied_at: string;
  updated_at: string;
  // Relations
  job?: Job;
  candidate?: Candidate;
}

// Interview related types
export type InterviewType = 'phone' | 'video' | 'onsite' | 'technical' | 'panel';
export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';

export interface Interview {
  id: string;
  application_id: string;
  type: InterviewType;
  scheduled_at: string;
  duration: number;
  interviewer: string;
  status: InterviewStatus;
  feedback?: string;
  rating?: number;
  meeting_link?: string;
  location?: string;
  created_at: string;
  updated_at: string;
  // Relations
  application?: Application;
}

// Skills and education
export interface Skill {
  id: string;
  name: string;
  category?: string;
  created_at: string;
}

export interface Education {
  id: string;
  candidate_id: string;
  institution: string;
  degree: string;
  field: string;
  start_year: number;
  end_year?: number;
  created_at: string;
}

// Notes
export interface Note {
  id: string;
  candidate_id?: string;
  application_id?: string;
  content: string;
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
}

// Search and filtering
export interface SearchFilters {
  query?: string;
  skills?: string[];
  experience_min?: number;
  experience_max?: number;
  location?: string;
  status?: string;
  source?: CandidateSource;
}

export interface SortOptions {
  field: 'score' | 'date' | 'name' | 'experience';
  direction: 'asc' | 'desc';
}

// Pipeline and workflow
export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  color: string;
  organization_id: string;
}

export interface WorkflowTransition {
  from_status: ApplicationStatus;
  to_status: ApplicationStatus;
  allowed_roles: string[];
  requires_approval?: boolean;
}

// Analytics and reporting
export interface RecruitingMetrics {
  total_jobs: number;
  active_jobs: number;
  total_candidates: number;
  total_applications: number;
  interviews_scheduled: number;
  offers_made: number;
  hires_made: number;
  conversion_rates: {
    application_to_interview: number;
    interview_to_offer: number;
    offer_to_hire: number;
  };
  time_to_hire_avg: number;
  source_breakdown: Record<CandidateSource, number>;
}

export interface RecruitingAnalytics {
  period: '7d' | '30d' | '90d' | '1y';
  metrics: RecruitingMetrics;
  trends: {
    applications: Array<{ date: string; count: number }>;
    hires: Array<{ date: string; count: number }>;
    pipeline_health: Array<{ stage: string; count: number }>;
  };
}
