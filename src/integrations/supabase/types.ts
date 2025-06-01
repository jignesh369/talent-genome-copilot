export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      application_documents: {
        Row: {
          application_id: string
          document_type: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          uploaded_at: string
        }
        Insert: {
          application_id: string
          document_type: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          uploaded_at?: string
        }
        Update: {
          application_id?: string
          document_type?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          applied_at: string
          candidate_id: string
          cover_letter: string | null
          id: string
          job_id: string
          portfolio_url: string | null
          rejection_reason: string | null
          resume_url: string | null
          score: number | null
          stage: string | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          withdrawn_at: string | null
        }
        Insert: {
          applied_at?: string
          candidate_id: string
          cover_letter?: string | null
          id?: string
          job_id: string
          portfolio_url?: string | null
          rejection_reason?: string | null
          resume_url?: string | null
          score?: number | null
          stage?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          withdrawn_at?: string | null
        }
        Update: {
          applied_at?: string
          candidate_id?: string
          cover_letter?: string | null
          id?: string
          job_id?: string
          portfolio_url?: string | null
          rejection_reason?: string | null
          resume_url?: string | null
          score?: number | null
          stage?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          withdrawn_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_results: {
        Row: {
          answers: Json
          application_id: string | null
          assessment_id: string
          candidate_id: string
          completed_at: string | null
          id: string
          score: number
          started_at: string
          status: string
          time_spent_minutes: number | null
        }
        Insert: {
          answers?: Json
          application_id?: string | null
          assessment_id: string
          candidate_id: string
          completed_at?: string | null
          id?: string
          score: number
          started_at?: string
          status?: string
          time_spent_minutes?: number | null
        }
        Update: {
          answers?: Json
          application_id?: string | null
          assessment_id?: string
          candidate_id?: string
          completed_at?: string | null
          id?: string
          score?: number
          started_at?: string
          status?: string
          time_spent_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_results_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_results_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          duration_minutes: number
          id: string
          organization_id: string
          passing_score: number | null
          questions: Json
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          duration_minutes?: number
          id?: string
          organization_id: string
          passing_score?: number | null
          questions?: Json
          status?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          organization_id?: string
          passing_score?: number | null
          questions?: Json
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      candidate_experiences: {
        Row: {
          achievements: string[] | null
          candidate_id: string
          company: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_current: boolean
          location: string | null
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          achievements?: string[] | null
          candidate_id: string
          company: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean
          location?: string | null
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          achievements?: string[] | null
          candidate_id?: string
          company?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean
          location?: string | null
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_experiences_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_job_matches: {
        Row: {
          candidate_id: string | null
          created_at: string | null
          cultural_fit_score: number | null
          experience_score: number | null
          id: string
          job_id: string | null
          match_explanation: string | null
          overall_match_score: number | null
          recommendation_strength:
            | Database["public"]["Enums"]["recommendation_strength_enum"]
            | null
          relevance_factors: Json | null
          search_query_id: string | null
          technical_skills_score: number | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string | null
          cultural_fit_score?: number | null
          experience_score?: number | null
          id?: string
          job_id?: string | null
          match_explanation?: string | null
          overall_match_score?: number | null
          recommendation_strength?:
            | Database["public"]["Enums"]["recommendation_strength_enum"]
            | null
          relevance_factors?: Json | null
          search_query_id?: string | null
          technical_skills_score?: number | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string | null
          cultural_fit_score?: number | null
          experience_score?: number | null
          id?: string
          job_id?: string | null
          match_explanation?: string | null
          overall_match_score?: number | null
          recommendation_strength?:
            | Database["public"]["Enums"]["recommendation_strength_enum"]
            | null
          relevance_factors?: Json | null
          search_query_id?: string | null
          technical_skills_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_job_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "enhanced_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_job_matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_job_matches_search_query_id_fkey"
            columns: ["search_query_id"]
            isOneToOne: false
            referencedRelation: "search_queries"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_preferences: {
        Row: {
          availability_date: string | null
          candidate_id: string
          created_at: string
          id: string
          job_types: string[] | null
          notification_preferences: Json | null
          preferred_locations: string[] | null
          remote_preference: string | null
          salary_max: number | null
          salary_min: number | null
          updated_at: string
          willing_to_relocate: boolean | null
        }
        Insert: {
          availability_date?: string | null
          candidate_id: string
          created_at?: string
          id?: string
          job_types?: string[] | null
          notification_preferences?: Json | null
          preferred_locations?: string[] | null
          remote_preference?: string | null
          salary_max?: number | null
          salary_min?: number | null
          updated_at?: string
          willing_to_relocate?: boolean | null
        }
        Update: {
          availability_date?: string | null
          candidate_id?: string
          created_at?: string
          id?: string
          job_types?: string[] | null
          notification_preferences?: Json | null
          preferred_locations?: string[] | null
          remote_preference?: string | null
          salary_max?: number | null
          salary_min?: number | null
          updated_at?: string
          willing_to_relocate?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_preferences_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: true
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_skills: {
        Row: {
          candidate_id: string
          proficiency_level: number | null
          skill_id: string
        }
        Insert: {
          candidate_id: string
          proficiency_level?: number | null
          skill_id: string
        }
        Update: {
          candidate_id?: string
          proficiency_level?: number | null
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_skills_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          availability_date: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          current_company: string | null
          current_title: string | null
          email: string
          experience_years: number
          first_name: string
          id: string
          last_name: string
          linkedin_url: string | null
          location: string
          organization_id: string
          phone: string | null
          portfolio_url: string | null
          preferred_salary_max: number | null
          preferred_salary_min: number | null
          resume_url: string | null
          score: number
          source: Database["public"]["Enums"]["candidate_source"]
          status: Database["public"]["Enums"]["candidate_status"]
          updated_at: string
          willing_to_relocate: boolean | null
          years_of_experience: number | null
        }
        Insert: {
          availability_date?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          current_company?: string | null
          current_title?: string | null
          email: string
          experience_years?: number
          first_name: string
          id?: string
          last_name: string
          linkedin_url?: string | null
          location: string
          organization_id: string
          phone?: string | null
          portfolio_url?: string | null
          preferred_salary_max?: number | null
          preferred_salary_min?: number | null
          resume_url?: string | null
          score?: number
          source?: Database["public"]["Enums"]["candidate_source"]
          status?: Database["public"]["Enums"]["candidate_status"]
          updated_at?: string
          willing_to_relocate?: boolean | null
          years_of_experience?: number | null
        }
        Update: {
          availability_date?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          current_company?: string | null
          current_title?: string | null
          email?: string
          experience_years?: number
          first_name?: string
          id?: string
          last_name?: string
          linkedin_url?: string | null
          location?: string
          organization_id?: string
          phone?: string | null
          portfolio_url?: string | null
          preferred_salary_max?: number | null
          preferred_salary_min?: number | null
          resume_url?: string | null
          score?: number
          source?: Database["public"]["Enums"]["candidate_source"]
          status?: Database["public"]["Enums"]["candidate_status"]
          updated_at?: string
          willing_to_relocate?: boolean | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      career_trajectories: {
        Row: {
          analysis_date: string | null
          candidate_id: string | null
          growth_rate: number | null
          id: string
          next_likely_move: string | null
          progression_type:
            | Database["public"]["Enums"]["progression_type_enum"]
            | null
          stability_score: number | null
          timeline_events: Json | null
        }
        Insert: {
          analysis_date?: string | null
          candidate_id?: string | null
          growth_rate?: number | null
          id?: string
          next_likely_move?: string | null
          progression_type?:
            | Database["public"]["Enums"]["progression_type_enum"]
            | null
          stability_score?: number | null
          timeline_events?: Json | null
        }
        Update: {
          analysis_date?: string | null
          candidate_id?: string | null
          growth_rate?: number | null
          id?: string
          next_likely_move?: string | null
          progression_type?:
            | Database["public"]["Enums"]["progression_type_enum"]
            | null
          stability_score?: number | null
          timeline_events?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "career_trajectories_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "enhanced_candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      communication_messages: {
        Row: {
          channel:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          clicked_at: string | null
          content: string
          delivered_at: string | null
          id: string
          metadata: Json | null
          opened_at: string | null
          recipient_type:
            | Database["public"]["Enums"]["recipient_type_enum"]
            | null
          responded_at: string | null
          sender_id: string | null
          sent_at: string | null
          subject: string | null
          template_id: string | null
          thread_id: string | null
        }
        Insert: {
          channel?:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          clicked_at?: string | null
          content: string
          delivered_at?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          recipient_type?:
            | Database["public"]["Enums"]["recipient_type_enum"]
            | null
          responded_at?: string | null
          sender_id?: string | null
          sent_at?: string | null
          subject?: string | null
          template_id?: string | null
          thread_id?: string | null
        }
        Update: {
          channel?:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          clicked_at?: string | null
          content?: string
          delivered_at?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          recipient_type?:
            | Database["public"]["Enums"]["recipient_type_enum"]
            | null
          responded_at?: string | null
          sender_id?: string | null
          sent_at?: string | null
          subject?: string | null
          template_id?: string | null
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communication_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "communication_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      communication_templates: {
        Row: {
          ai_personalization_enabled: boolean | null
          channel:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          content_template: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          effectiveness_score: number | null
          id: string
          name: string
          organization_id: string | null
          personalization_variables: string[] | null
          subject_template: string | null
          template_type:
            | Database["public"]["Enums"]["template_type_enum"]
            | null
          tone: Database["public"]["Enums"]["tone_enum"] | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          ai_personalization_enabled?: boolean | null
          channel?:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          content_template?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          effectiveness_score?: number | null
          id?: string
          name: string
          organization_id?: string | null
          personalization_variables?: string[] | null
          subject_template?: string | null
          template_type?:
            | Database["public"]["Enums"]["template_type_enum"]
            | null
          tone?: Database["public"]["Enums"]["tone_enum"] | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          ai_personalization_enabled?: boolean | null
          channel?:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          content_template?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          effectiveness_score?: number | null
          id?: string
          name?: string
          organization_id?: string | null
          personalization_variables?: string[] | null
          subject_template?: string | null
          template_type?:
            | Database["public"]["Enums"]["template_type_enum"]
            | null
          tone?: Database["public"]["Enums"]["tone_enum"] | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "communication_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_templates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      communication_threads: {
        Row: {
          candidate_id: string | null
          created_at: string | null
          id: string
          is_automated: boolean | null
          job_id: string | null
          last_activity_at: string | null
          primary_channel:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          priority: Database["public"]["Enums"]["priority_enum"] | null
          recruiter_id: string | null
          sequence_id: string | null
          status: Database["public"]["Enums"]["thread_status_enum"] | null
          subject: string | null
          thread_type: Database["public"]["Enums"]["thread_type_enum"] | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string | null
          id?: string
          is_automated?: boolean | null
          job_id?: string | null
          last_activity_at?: string | null
          primary_channel?:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          priority?: Database["public"]["Enums"]["priority_enum"] | null
          recruiter_id?: string | null
          sequence_id?: string | null
          status?: Database["public"]["Enums"]["thread_status_enum"] | null
          subject?: string | null
          thread_type?: Database["public"]["Enums"]["thread_type_enum"] | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string | null
          id?: string
          is_automated?: boolean | null
          job_id?: string | null
          last_activity_at?: string | null
          primary_channel?:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          priority?: Database["public"]["Enums"]["priority_enum"] | null
          recruiter_id?: string | null
          sequence_id?: string | null
          status?: Database["public"]["Enums"]["thread_status_enum"] | null
          subject?: string | null
          thread_type?: Database["public"]["Enums"]["thread_type_enum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "communication_threads_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "enhanced_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_threads_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_threads_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cultural_fit_indicators: {
        Row: {
          aspect: Database["public"]["Enums"]["cultural_aspect_enum"] | null
          candidate_id: string | null
          confidence: number | null
          created_at: string | null
          evidence: Json | null
          id: string
          score: number | null
        }
        Insert: {
          aspect?: Database["public"]["Enums"]["cultural_aspect_enum"] | null
          candidate_id?: string | null
          confidence?: number | null
          created_at?: string | null
          evidence?: Json | null
          id?: string
          score?: number | null
        }
        Update: {
          aspect?: Database["public"]["Enums"]["cultural_aspect_enum"] | null
          candidate_id?: string | null
          confidence?: number | null
          created_at?: string | null
          evidence?: Json | null
          id?: string
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cultural_fit_indicators_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "enhanced_candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      education: {
        Row: {
          candidate_id: string
          created_at: string
          degree: string
          end_year: number | null
          field: string
          id: string
          institution: string
          start_year: number
        }
        Insert: {
          candidate_id: string
          created_at?: string
          degree: string
          end_year?: number | null
          field: string
          id?: string
          institution: string
          start_year: number
        }
        Update: {
          candidate_id?: string
          created_at?: string
          degree?: string
          end_year?: number | null
          field?: string
          id?: string
          institution?: string
          start_year?: number
        }
        Relationships: [
          {
            foreignKeyName: "education_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      enhanced_candidates: {
        Row: {
          ai_summary: string | null
          availability_status:
            | Database["public"]["Enums"]["availability_status_enum"]
            | null
          avatar_url: string | null
          bio: string | null
          community_influence_score: number | null
          created_at: string | null
          current_company: string | null
          current_title: string | null
          email: string
          experience_years: number | null
          handle: string | null
          id: string
          learning_velocity_score: number | null
          location: string | null
          name: string
          organization_id: string | null
          osint_last_fetched: string | null
          preferred_contact_method:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          profile_last_updated: string | null
          salary_currency: string | null
          salary_expectation_max: number | null
          salary_expectation_min: number | null
          skills: string[] | null
          technical_depth_score: number | null
          updated_at: string | null
        }
        Insert: {
          ai_summary?: string | null
          availability_status?:
            | Database["public"]["Enums"]["availability_status_enum"]
            | null
          avatar_url?: string | null
          bio?: string | null
          community_influence_score?: number | null
          created_at?: string | null
          current_company?: string | null
          current_title?: string | null
          email: string
          experience_years?: number | null
          handle?: string | null
          id?: string
          learning_velocity_score?: number | null
          location?: string | null
          name: string
          organization_id?: string | null
          osint_last_fetched?: string | null
          preferred_contact_method?:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          profile_last_updated?: string | null
          salary_currency?: string | null
          salary_expectation_max?: number | null
          salary_expectation_min?: number | null
          skills?: string[] | null
          technical_depth_score?: number | null
          updated_at?: string | null
        }
        Update: {
          ai_summary?: string | null
          availability_status?:
            | Database["public"]["Enums"]["availability_status_enum"]
            | null
          avatar_url?: string | null
          bio?: string | null
          community_influence_score?: number | null
          created_at?: string | null
          current_company?: string | null
          current_title?: string | null
          email?: string
          experience_years?: number | null
          handle?: string | null
          id?: string
          learning_velocity_score?: number | null
          location?: string | null
          name?: string
          organization_id?: string | null
          osint_last_fetched?: string | null
          preferred_contact_method?:
            | Database["public"]["Enums"]["communication_channel_enum"]
            | null
          profile_last_updated?: string | null
          salary_currency?: string | null
          salary_expectation_max?: number | null
          salary_expectation_min?: number | null
          skills?: string[] | null
          technical_depth_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enhanced_candidates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_feedback_detailed: {
        Row: {
          areas_for_improvement: string | null
          communication_rating: number | null
          cultural_fit_rating: number | null
          detailed_notes: string | null
          id: string
          interview_id: string | null
          overall_recommendation:
            | Database["public"]["Enums"]["recommendation_enum"]
            | null
          panel_member_id: string | null
          problem_solving_rating: number | null
          strengths: string | null
          submitted_at: string | null
          technical_skills_rating: number | null
        }
        Insert: {
          areas_for_improvement?: string | null
          communication_rating?: number | null
          cultural_fit_rating?: number | null
          detailed_notes?: string | null
          id?: string
          interview_id?: string | null
          overall_recommendation?:
            | Database["public"]["Enums"]["recommendation_enum"]
            | null
          panel_member_id?: string | null
          problem_solving_rating?: number | null
          strengths?: string | null
          submitted_at?: string | null
          technical_skills_rating?: number | null
        }
        Update: {
          areas_for_improvement?: string | null
          communication_rating?: number | null
          cultural_fit_rating?: number | null
          detailed_notes?: string | null
          id?: string
          interview_id?: string | null
          overall_recommendation?:
            | Database["public"]["Enums"]["recommendation_enum"]
            | null
          panel_member_id?: string | null
          problem_solving_rating?: number | null
          strengths?: string | null
          submitted_at?: string | null
          technical_skills_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_feedback_detailed_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_feedback_detailed_panel_member_id_fkey"
            columns: ["panel_member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_panels: {
        Row: {
          created_at: string | null
          default_duration: number | null
          description: string | null
          id: string
          interview_template_id: string | null
          name: string
          organization_id: string | null
          panel_members: Json | null
        }
        Insert: {
          created_at?: string | null
          default_duration?: number | null
          description?: string | null
          id?: string
          interview_template_id?: string | null
          name: string
          organization_id?: string | null
          panel_members?: Json | null
        }
        Update: {
          created_at?: string | null
          default_duration?: number | null
          description?: string | null
          id?: string
          interview_template_id?: string | null
          name?: string
          organization_id?: string | null
          panel_members?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_panels_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_question_banks: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          difficulty_level: number | null
          effectiveness_score: number | null
          estimated_time: number | null
          id: string
          organization_id: string | null
          question: string
          subcategory: string | null
          suggested_answer: string | null
          tags: string[] | null
          usage_count: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          difficulty_level?: number | null
          effectiveness_score?: number | null
          estimated_time?: number | null
          id?: string
          organization_id?: string | null
          question: string
          subcategory?: string | null
          suggested_answer?: string | null
          tags?: string[] | null
          usage_count?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          difficulty_level?: number | null
          effectiveness_score?: number | null
          estimated_time?: number | null
          id?: string
          organization_id?: string | null
          question?: string
          subcategory?: string | null
          suggested_answer?: string | null
          tags?: string[] | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_question_banks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_question_banks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          application_id: string
          created_at: string
          duration: number
          feedback: string | null
          id: string
          interviewer: string
          location: string | null
          meeting_link: string | null
          rating: number | null
          scheduled_at: string
          status: Database["public"]["Enums"]["interview_status"]
          type: Database["public"]["Enums"]["interview_type"]
          updated_at: string
        }
        Insert: {
          application_id: string
          created_at?: string
          duration?: number
          feedback?: string | null
          id?: string
          interviewer: string
          location?: string | null
          meeting_link?: string | null
          rating?: number | null
          scheduled_at: string
          status?: Database["public"]["Enums"]["interview_status"]
          type: Database["public"]["Enums"]["interview_type"]
          updated_at?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          duration?: number
          feedback?: string | null
          id?: string
          interviewer?: string
          location?: string | null
          meeting_link?: string | null
          rating?: number | null
          scheduled_at?: string
          status?: Database["public"]["Enums"]["interview_status"]
          type?: Database["public"]["Enums"]["interview_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      job_skills: {
        Row: {
          job_id: string
          required: boolean
          skill_id: string
        }
        Insert: {
          job_id: string
          required?: boolean
          skill_id: string
        }
        Update: {
          job_id?: string
          required?: boolean
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_skills_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          applications_count: number
          closing_date: string | null
          created_at: string
          created_by: string
          department: string
          description: string
          experience: string | null
          hiring_manager: string | null
          id: string
          location: string
          organization_id: string
          posted_date: string | null
          priority: Database["public"]["Enums"]["job_priority"]
          remote: boolean
          requirements: string[] | null
          salary_max: number | null
          salary_min: number | null
          status: Database["public"]["Enums"]["job_status"]
          title: string
          type: Database["public"]["Enums"]["job_type"]
          updated_at: string
          views: number
        }
        Insert: {
          applications_count?: number
          closing_date?: string | null
          created_at?: string
          created_by: string
          department: string
          description: string
          experience?: string | null
          hiring_manager?: string | null
          id?: string
          location: string
          organization_id: string
          posted_date?: string | null
          priority?: Database["public"]["Enums"]["job_priority"]
          remote?: boolean
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          status?: Database["public"]["Enums"]["job_status"]
          title: string
          type?: Database["public"]["Enums"]["job_type"]
          updated_at?: string
          views?: number
        }
        Update: {
          applications_count?: number
          closing_date?: string | null
          created_at?: string
          created_by?: string
          department?: string
          description?: string
          experience?: string | null
          hiring_manager?: string | null
          id?: string
          location?: string
          organization_id?: string
          posted_date?: string | null
          priority?: Database["public"]["Enums"]["job_priority"]
          remote?: boolean
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          status?: Database["public"]["Enums"]["job_status"]
          title?: string
          type?: Database["public"]["Enums"]["job_type"]
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "jobs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          application_id: string | null
          content: string
          created_at: string
          id: string
          message_type: string
          read_at: string | null
          recipient_id: string
          sender_id: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          application_id?: string | null
          content: string
          created_at?: string
          id?: string
          message_type?: string
          read_at?: string | null
          recipient_id: string
          sender_id: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          application_id?: string | null
          content?: string
          created_at?: string
          id?: string
          message_type?: string
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          application_id: string | null
          author_id: string
          author_name: string
          candidate_id: string | null
          content: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          application_id?: string | null
          author_id: string
          author_name: string
          candidate_id?: string | null
          content: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          application_id?: string | null
          author_id?: string
          author_name?: string
          candidate_id?: string | null
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          application_id: string
          benefits: string[] | null
          created_at: string
          created_by: string
          expiry_date: string | null
          id: string
          notes: string | null
          offer_letter_url: string | null
          salary_amount: number
          salary_currency: string
          start_date: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          application_id: string
          benefits?: string[] | null
          created_at?: string
          created_by: string
          expiry_date?: string | null
          id?: string
          notes?: string | null
          offer_letter_url?: string | null
          salary_amount: number
          salary_currency?: string
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          benefits?: string[] | null
          created_at?: string
          created_by?: string
          expiry_date?: string | null
          id?: string
          notes?: string | null
          offer_letter_url?: string | null
          salary_amount?: number
          salary_currency?: string
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          id: string
          joined_at: string
          organization_id: string
          status: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          organization_id: string
          status?: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          organization_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          contact_email: string
          contact_name: string
          created_at: string
          current_jobs: number
          current_users: number
          description: string | null
          domain: string | null
          id: string
          industry: string | null
          job_limit: number
          monthly_amount: number
          name: string
          next_billing: string | null
          plan: string
          size: string | null
          status: string
          updated_at: string
          user_limit: number
          website: string | null
        }
        Insert: {
          contact_email: string
          contact_name: string
          created_at?: string
          current_jobs?: number
          current_users?: number
          description?: string | null
          domain?: string | null
          id?: string
          industry?: string | null
          job_limit?: number
          monthly_amount?: number
          name: string
          next_billing?: string | null
          plan?: string
          size?: string | null
          status?: string
          updated_at?: string
          user_limit?: number
          website?: string | null
        }
        Update: {
          contact_email?: string
          contact_name?: string
          created_at?: string
          current_jobs?: number
          current_users?: number
          description?: string | null
          domain?: string | null
          id?: string
          industry?: string | null
          job_limit?: number
          monthly_amount?: number
          name?: string
          next_billing?: string | null
          plan?: string
          size?: string | null
          status?: string
          updated_at?: string
          user_limit?: number
          website?: string | null
        }
        Relationships: []
      }
      osint_profiles: {
        Row: {
          availability_signals: Json | null
          candidate_id: string | null
          community_engagement: number | null
          github_commits: number | null
          github_repos: number | null
          github_stars: number | null
          github_username: string | null
          id: string
          influence_score: number | null
          last_updated: string | null
          linkedin_connections: number | null
          linkedin_url: string | null
          overall_score: number | null
          reddit_username: string | null
          stackoverflow_id: string | null
          stackoverflow_reputation: number | null
          technical_depth: number | null
          twitter_followers: number | null
          twitter_username: string | null
        }
        Insert: {
          availability_signals?: Json | null
          candidate_id?: string | null
          community_engagement?: number | null
          github_commits?: number | null
          github_repos?: number | null
          github_stars?: number | null
          github_username?: string | null
          id?: string
          influence_score?: number | null
          last_updated?: string | null
          linkedin_connections?: number | null
          linkedin_url?: string | null
          overall_score?: number | null
          reddit_username?: string | null
          stackoverflow_id?: string | null
          stackoverflow_reputation?: number | null
          technical_depth?: number | null
          twitter_followers?: number | null
          twitter_username?: string | null
        }
        Update: {
          availability_signals?: Json | null
          candidate_id?: string | null
          community_engagement?: number | null
          github_commits?: number | null
          github_repos?: number | null
          github_stars?: number | null
          github_username?: string | null
          id?: string
          influence_score?: number | null
          last_updated?: string | null
          linkedin_connections?: number | null
          linkedin_url?: string | null
          overall_score?: number | null
          reddit_username?: string | null
          stackoverflow_id?: string | null
          stackoverflow_reputation?: number | null
          technical_depth?: number | null
          twitter_followers?: number | null
          twitter_username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "osint_profiles_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "enhanced_candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      outreach_sequence_steps: {
        Row: {
          created_at: string | null
          delay_days: number | null
          id: string
          response_count: number | null
          send_condition: Json | null
          sent_count: number | null
          sequence_id: string | null
          step_number: number
          stop_condition: Json | null
          template_id: string | null
        }
        Insert: {
          created_at?: string | null
          delay_days?: number | null
          id?: string
          response_count?: number | null
          send_condition?: Json | null
          sent_count?: number | null
          sequence_id?: string | null
          step_number: number
          stop_condition?: Json | null
          template_id?: string | null
        }
        Update: {
          created_at?: string | null
          delay_days?: number | null
          id?: string
          response_count?: number | null
          send_condition?: Json | null
          sent_count?: number | null
          sequence_id?: string | null
          step_number?: number
          stop_condition?: Json | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outreach_sequence_steps_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "outreach_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outreach_sequence_steps_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "communication_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      outreach_sequences: {
        Row: {
          conversion_rate: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          max_candidates: number | null
          name: string
          organization_id: string | null
          sequence_type:
            | Database["public"]["Enums"]["sequence_type_enum"]
            | null
          target_criteria: Json | null
          total_responses: number | null
          total_sent: number | null
          updated_at: string | null
        }
        Insert: {
          conversion_rate?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_candidates?: number | null
          name: string
          organization_id?: string | null
          sequence_type?:
            | Database["public"]["Enums"]["sequence_type_enum"]
            | null
          target_criteria?: Json | null
          total_responses?: number | null
          total_sent?: number | null
          updated_at?: string | null
        }
        Update: {
          conversion_rate?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_candidates?: number | null
          name?: string
          organization_id?: string | null
          sequence_type?:
            | Database["public"]["Enums"]["sequence_type_enum"]
            | null
          target_criteria?: Json | null
          total_responses?: number | null
          total_sent?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outreach_sequences_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outreach_sequences_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_analytics: {
        Row: {
          analysis_date: string
          created_at: string | null
          final_round_candidates: number | null
          id: string
          interview_to_offer_rate: number | null
          interviewed_candidates: number | null
          job_id: string | null
          offer_acceptance_rate: number | null
          offers_accepted: number | null
          offers_extended: number | null
          organization_id: string | null
          qualified_candidates: number | null
          qualified_to_interview_rate: number | null
          source_to_qualified_rate: number | null
          sourced_candidates: number | null
        }
        Insert: {
          analysis_date: string
          created_at?: string | null
          final_round_candidates?: number | null
          id?: string
          interview_to_offer_rate?: number | null
          interviewed_candidates?: number | null
          job_id?: string | null
          offer_acceptance_rate?: number | null
          offers_accepted?: number | null
          offers_extended?: number | null
          organization_id?: string | null
          qualified_candidates?: number | null
          qualified_to_interview_rate?: number | null
          source_to_qualified_rate?: number | null
          sourced_candidates?: number | null
        }
        Update: {
          analysis_date?: string
          created_at?: string | null
          final_round_candidates?: number | null
          id?: string
          interview_to_offer_rate?: number | null
          interviewed_candidates?: number | null
          job_id?: string | null
          offer_acceptance_rate?: number | null
          offers_accepted?: number | null
          offers_extended?: number | null
          organization_id?: string | null
          qualified_candidates?: number | null
          qualified_to_interview_rate?: number | null
          source_to_qualified_rate?: number | null
          sourced_candidates?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_analytics_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_analytics_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          department: string | null
          first_name: string
          id: string
          last_name: string
          organization_id: string | null
          phone: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          department?: string | null
          first_name: string
          id: string
          last_name: string
          organization_id?: string | null
          phone?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          department?: string | null
          first_name?: string
          id?: string
          last_name?: string
          organization_id?: string | null
          phone?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      recruiter_performance_metrics: {
        Row: {
          avg_candidate_quality: number | null
          avg_response_time_hours: number | null
          candidates_contacted: number | null
          cost_per_hire: number | null
          created_at: string | null
          hires_completed: number | null
          id: string
          interviews_scheduled: number | null
          metric_date: string
          offers_made: number | null
          organization_id: string | null
          period_type: Database["public"]["Enums"]["period_type_enum"] | null
          pipeline_conversion_rate: number | null
          recruiter_id: string | null
          responses_received: number | null
          searches_performed: number | null
          time_to_hire_avg_days: number | null
        }
        Insert: {
          avg_candidate_quality?: number | null
          avg_response_time_hours?: number | null
          candidates_contacted?: number | null
          cost_per_hire?: number | null
          created_at?: string | null
          hires_completed?: number | null
          id?: string
          interviews_scheduled?: number | null
          metric_date: string
          offers_made?: number | null
          organization_id?: string | null
          period_type?: Database["public"]["Enums"]["period_type_enum"] | null
          pipeline_conversion_rate?: number | null
          recruiter_id?: string | null
          responses_received?: number | null
          searches_performed?: number | null
          time_to_hire_avg_days?: number | null
        }
        Update: {
          avg_candidate_quality?: number | null
          avg_response_time_hours?: number | null
          candidates_contacted?: number | null
          cost_per_hire?: number | null
          created_at?: string | null
          hires_completed?: number | null
          id?: string
          interviews_scheduled?: number | null
          metric_date?: string
          offers_made?: number | null
          organization_id?: string | null
          period_type?: Database["public"]["Enums"]["period_type_enum"] | null
          pipeline_conversion_rate?: number | null
          recruiter_id?: string | null
          responses_received?: number | null
          searches_performed?: number | null
          time_to_hire_avg_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_performance_metrics_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_performance_metrics_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_jobs: {
        Row: {
          candidate_id: string
          id: string
          job_id: string
          saved_at: string
        }
        Insert: {
          candidate_id: string
          id?: string
          job_id: string
          saved_at?: string
        }
        Update: {
          candidate_id?: string
          id?: string
          job_id?: string
          saved_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_jobs_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_jobs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      search_feedback: {
        Row: {
          candidate_id: string | null
          created_at: string | null
          feedback_notes: string | null
          feedback_type:
            | Database["public"]["Enums"]["feedback_type_enum"]
            | null
          id: string
          recruiter_id: string | null
          search_query_id: string | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string | null
          feedback_notes?: string | null
          feedback_type?:
            | Database["public"]["Enums"]["feedback_type_enum"]
            | null
          id?: string
          recruiter_id?: string | null
          search_query_id?: string | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string | null
          feedback_notes?: string | null
          feedback_type?:
            | Database["public"]["Enums"]["feedback_type_enum"]
            | null
          id?: string
          recruiter_id?: string | null
          search_query_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "search_feedback_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "enhanced_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_feedback_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_feedback_search_query_id_fkey"
            columns: ["search_query_id"]
            isOneToOne: false
            referencedRelation: "search_queries"
            referencedColumns: ["id"]
          },
        ]
      }
      search_queries: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          extracted_requirements: Json | null
          id: string
          interpreted_intent: string | null
          organization_id: string | null
          original_query: string
          recruiter_id: string | null
          search_quality_score: number | null
          search_strategy: string | null
          total_candidates_found: number | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          extracted_requirements?: Json | null
          id?: string
          interpreted_intent?: string | null
          organization_id?: string | null
          original_query: string
          recruiter_id?: string | null
          search_quality_score?: number | null
          search_strategy?: string | null
          total_candidates_found?: number | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          extracted_requirements?: Json | null
          id?: string
          interpreted_intent?: string | null
          organization_id?: string | null
          original_query?: string
          recruiter_id?: string | null
          search_quality_score?: number | null
          search_strategy?: string | null
          total_candidates_found?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "search_queries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_queries_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_email: {
        Args: { user_uuid: string }
        Returns: string
      }
      get_user_organization: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: { target_org_id?: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_startup_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "startup_admin"
        | "customer_admin"
        | "recruiter"
        | "hiring_manager"
        | "candidate"
      application_status:
        | "applied"
        | "screening"
        | "interview"
        | "final"
        | "offer"
        | "hired"
        | "rejected"
      availability_status_enum: "active" | "passive" | "unavailable"
      candidate_source:
        | "direct"
        | "referral"
        | "job_board"
        | "linkedin"
        | "agency"
        | "other"
      candidate_status:
        | "new"
        | "screening"
        | "interviewing"
        | "offer"
        | "hired"
        | "rejected"
      communication_channel_enum:
        | "email"
        | "linkedin"
        | "phone"
        | "sms"
        | "slack"
      cultural_aspect_enum:
        | "communication_style"
        | "work_values"
        | "collaboration"
        | "innovation"
      feedback_type_enum:
        | "positive"
        | "negative"
        | "contacted"
        | "hired"
        | "not_interested"
      interview_status: "scheduled" | "completed" | "cancelled" | "rescheduled"
      interview_type: "phone" | "video" | "onsite" | "technical" | "panel"
      job_priority: "low" | "medium" | "high" | "urgent"
      job_status: "draft" | "active" | "paused" | "closed"
      job_type: "full-time" | "part-time" | "contract" | "internship"
      period_type_enum: "daily" | "weekly" | "monthly" | "quarterly"
      priority_enum: "low" | "medium" | "high" | "urgent"
      progression_type_enum:
        | "ascending"
        | "lateral"
        | "transitioning"
        | "consulting"
      recipient_type_enum: "candidate" | "recruiter"
      recommendation_enum: "strong_yes" | "yes" | "neutral" | "no" | "strong_no"
      recommendation_strength_enum:
        | "weak"
        | "moderate"
        | "strong"
        | "exceptional"
      sequence_type_enum: "general" | "role_specific" | "personalized"
      template_type_enum:
        | "initial_outreach"
        | "follow_up"
        | "interview_invitation"
        | "offer_discussion"
        | "rejection"
      thread_status_enum: "active" | "paused" | "completed" | "cancelled"
      thread_type_enum:
        | "outreach"
        | "interview_coordination"
        | "follow_up"
        | "offer_discussion"
      tone_enum: "casual" | "professional" | "enthusiastic" | "formal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "startup_admin",
        "customer_admin",
        "recruiter",
        "hiring_manager",
        "candidate",
      ],
      application_status: [
        "applied",
        "screening",
        "interview",
        "final",
        "offer",
        "hired",
        "rejected",
      ],
      availability_status_enum: ["active", "passive", "unavailable"],
      candidate_source: [
        "direct",
        "referral",
        "job_board",
        "linkedin",
        "agency",
        "other",
      ],
      candidate_status: [
        "new",
        "screening",
        "interviewing",
        "offer",
        "hired",
        "rejected",
      ],
      communication_channel_enum: [
        "email",
        "linkedin",
        "phone",
        "sms",
        "slack",
      ],
      cultural_aspect_enum: [
        "communication_style",
        "work_values",
        "collaboration",
        "innovation",
      ],
      feedback_type_enum: [
        "positive",
        "negative",
        "contacted",
        "hired",
        "not_interested",
      ],
      interview_status: ["scheduled", "completed", "cancelled", "rescheduled"],
      interview_type: ["phone", "video", "onsite", "technical", "panel"],
      job_priority: ["low", "medium", "high", "urgent"],
      job_status: ["draft", "active", "paused", "closed"],
      job_type: ["full-time", "part-time", "contract", "internship"],
      period_type_enum: ["daily", "weekly", "monthly", "quarterly"],
      priority_enum: ["low", "medium", "high", "urgent"],
      progression_type_enum: [
        "ascending",
        "lateral",
        "transitioning",
        "consulting",
      ],
      recipient_type_enum: ["candidate", "recruiter"],
      recommendation_enum: ["strong_yes", "yes", "neutral", "no", "strong_no"],
      recommendation_strength_enum: [
        "weak",
        "moderate",
        "strong",
        "exceptional",
      ],
      sequence_type_enum: ["general", "role_specific", "personalized"],
      template_type_enum: [
        "initial_outreach",
        "follow_up",
        "interview_invitation",
        "offer_discussion",
        "rejection",
      ],
      thread_status_enum: ["active", "paused", "completed", "cancelled"],
      thread_type_enum: [
        "outreach",
        "interview_coordination",
        "follow_up",
        "offer_discussion",
      ],
      tone_enum: ["casual", "professional", "enthusiastic", "formal"],
    },
  },
} as const
