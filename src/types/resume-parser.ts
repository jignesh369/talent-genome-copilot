
export interface ParsedResume {
  id: string;
  candidate_id?: string;
  original_filename: string;
  file_url: string;
  parsing_status: 'pending' | 'processing' | 'completed' | 'failed';
  confidence_score: number;
  parsed_at: string;
  personal_info: PersonalInfo;
  skills: SkillExtraction[];
  work_experience: WorkExperience[];
  education: Education[];
  achievements: Achievement[];
  summary: string;
  raw_text: string;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
}

export interface SkillExtraction {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'domain' | 'language' | 'certification';
  confidence_score: number;
  source: 'ai_detected' | 'manual_added' | 'verified';
  years_experience?: number;
  proficiency_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  location?: string;
  description: string;
  achievements: string[];
  skills_used: string[];
  confidence_score: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  gpa?: string;
  achievements: string[];
  confidence_score: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
  category: 'award' | 'certification' | 'project' | 'publication' | 'other';
  confidence_score: number;
}

export interface ResumeUploadStatus {
  file_id: string;
  filename: string;
  size: number;
  status: 'uploading' | 'uploaded' | 'parsing' | 'completed' | 'failed';
  progress: number;
  error_message?: string;
  parsed_resume?: ParsedResume;
}

export interface BulkUploadResult {
  total_files: number;
  successful: number;
  failed: number;
  processing: number;
  results: ResumeUploadStatus[];
  started_at: string;
  completed_at?: string;
}

export interface ParsingOptions {
  auto_detect_skills: boolean;
  extract_achievements: boolean;
  analyze_career_progression: boolean;
  confidence_threshold: number;
}
