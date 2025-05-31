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
      ai_configurations: {
        Row: {
          api_keys_encrypted: string | null
          created_at: string | null
          id: string
          model_settings: Json
          organization_id: string | null
          service_type: string
          updated_at: string | null
          usage_limits: Json | null
        }
        Insert: {
          api_keys_encrypted?: string | null
          created_at?: string | null
          id?: string
          model_settings: Json
          organization_id?: string | null
          service_type: string
          updated_at?: string | null
          usage_limits?: Json | null
        }
        Update: {
          api_keys_encrypted?: string | null
          created_at?: string | null
          id?: string
          model_settings?: Json
          organization_id?: string | null
          service_type?: string
          updated_at?: string | null
          usage_limits?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_configurations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          entity_id: string | null
          entity_type: string | null
          event_type: string
          id: string
          organization_id: string | null
          properties: Json | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          entity_id?: string | null
          entity_type?: string | null
          event_type: string
          id?: string
          organization_id?: string | null
          properties?: Json | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          entity_id?: string | null
          entity_type?: string | null
          event_type?: string
          id?: string
          organization_id?: string | null
          properties?: Json | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          ai_recommendation: string | null
          applied_at: string | null
          candidate_id: string | null
          id: string
          job_id: string | null
          match_score: number | null
          source: string | null
          stage: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          ai_recommendation?: string | null
          applied_at?: string | null
          candidate_id?: string | null
          id?: string
          job_id?: string | null
          match_score?: number | null
          source?: string | null
          stage?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_recommendation?: string | null
          applied_at?: string | null
          candidate_id?: string | null
          id?: string
          job_id?: string | null
          match_score?: number | null
          source?: string | null
          stage?: string | null
          status?: string | null
          updated_at?: string | null
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
      assessment_sessions: {
        Row: {
          ai_recommendation: string | null
          answers: Json | null
          candidate_id: string | null
          category_scores: Json | null
          current_question_index: number | null
          end_time: string | null
          id: string
          job_id: string | null
          questions: Json
          start_time: string | null
          status: string | null
          template_id: string | null
          total_score: number | null
        }
        Insert: {
          ai_recommendation?: string | null
          answers?: Json | null
          candidate_id?: string | null
          category_scores?: Json | null
          current_question_index?: number | null
          end_time?: string | null
          id?: string
          job_id?: string | null
          questions: Json
          start_time?: string | null
          status?: string | null
          template_id?: string | null
          total_score?: number | null
        }
        Update: {
          ai_recommendation?: string | null
          answers?: Json | null
          candidate_id?: string | null
          category_scores?: Json | null
          current_question_index?: number | null
          end_time?: string | null
          id?: string
          job_id?: string | null
          questions?: Json
          start_time?: string | null
          status?: string | null
          template_id?: string | null
          total_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_sessions_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_sessions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_sessions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "assessment_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          job_roles: string[] | null
          name: string
          organization_id: string | null
          question_pool: Json
          scoring_criteria: Json | null
          time_limit_minutes: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          job_roles?: string[] | null
          name: string
          organization_id?: string | null
          question_pool: Json
          scoring_criteria?: Json | null
          time_limit_minutes?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          job_roles?: string[] | null
          name?: string
          organization_id?: string | null
          question_pool?: Json
          scoring_criteria?: Json | null
          time_limit_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_templates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          organization_id: string | null
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          organization_id?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          organization_id?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_integrations: {
        Row: {
          access_token_encrypted: string | null
          calendar_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          provider: string | null
          refresh_token_encrypted: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_token_encrypted?: string | null
          calendar_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider?: string | null
          refresh_token_encrypted?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_token_encrypted?: string | null
          calendar_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider?: string | null
          refresh_token_encrypted?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      candidate_insights: {
        Row: {
          ai_summary: string | null
          best_contact_method: Json | null
          candidate_id: string | null
          career_trajectory: Json | null
          community_influence_score: number | null
          cultural_fit_indicators: Json | null
          generated_at: string | null
          id: string
          learning_velocity_score: number | null
          salary_expectation: Json | null
          technical_depth_score: number | null
          updated_at: string | null
        }
        Insert: {
          ai_summary?: string | null
          best_contact_method?: Json | null
          candidate_id?: string | null
          career_trajectory?: Json | null
          community_influence_score?: number | null
          cultural_fit_indicators?: Json | null
          generated_at?: string | null
          id?: string
          learning_velocity_score?: number | null
          salary_expectation?: Json | null
          technical_depth_score?: number | null
          updated_at?: string | null
        }
        Update: {
          ai_summary?: string | null
          best_contact_method?: Json | null
          candidate_id?: string | null
          career_trajectory?: Json | null
          community_influence_score?: number | null
          cultural_fit_indicators?: Json | null
          generated_at?: string | null
          id?: string
          learning_velocity_score?: number | null
          salary_expectation?: Json | null
          technical_depth_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_insights_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_notes: {
        Row: {
          author_id: string | null
          candidate_id: string | null
          content: string
          created_at: string | null
          id: string
          note_type: string | null
          visibility: string | null
        }
        Insert: {
          author_id?: string | null
          candidate_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          note_type?: string | null
          visibility?: string | null
        }
        Update: {
          author_id?: string | null
          candidate_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          note_type?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_notes_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_osint_profiles: {
        Row: {
          candidate_id: string | null
          community_engagement: number | null
          id: string
          influence_score: number | null
          last_updated: string | null
          overall_score: number | null
          platform: string
          profile_data: Json
          technical_depth: number | null
        }
        Insert: {
          candidate_id?: string | null
          community_engagement?: number | null
          id?: string
          influence_score?: number | null
          last_updated?: string | null
          overall_score?: number | null
          platform: string
          profile_data: Json
          technical_depth?: number | null
        }
        Update: {
          candidate_id?: string | null
          community_engagement?: number | null
          id?: string
          influence_score?: number | null
          last_updated?: string | null
          overall_score?: number | null
          platform?: string
          profile_data?: Json
          technical_depth?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_osint_profiles_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_predictions: {
        Row: {
          candidate_id: string | null
          cultural_fit_score: number | null
          generated_at: string | null
          id: string
          job_id: string | null
          model_version: string | null
          performance_prediction: Json | null
          risk_factors: Json | null
          success_probability: number | null
        }
        Insert: {
          candidate_id?: string | null
          cultural_fit_score?: number | null
          generated_at?: string | null
          id?: string
          job_id?: string | null
          model_version?: string | null
          performance_prediction?: Json | null
          risk_factors?: Json | null
          success_probability?: number | null
        }
        Update: {
          candidate_id?: string | null
          cultural_fit_score?: number | null
          generated_at?: string | null
          id?: string
          job_id?: string | null
          model_version?: string | null
          performance_prediction?: Json | null
          risk_factors?: Json | null
          success_probability?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_predictions_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_predictions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          availability_status: string | null
          bio: string | null
          created_at: string | null
          current_company: string | null
          current_title: string | null
          email: string
          experience_years: number | null
          first_name: string
          id: string
          last_name: string
          linkedin_url: string | null
          location: string | null
          phone: string | null
          portfolio_url: string | null
          resume_url: string | null
          skills: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          availability_status?: string | null
          bio?: string | null
          created_at?: string | null
          current_company?: string | null
          current_title?: string | null
          email: string
          experience_years?: number | null
          first_name: string
          id?: string
          last_name: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          availability_status?: string | null
          bio?: string | null
          created_at?: string | null
          current_company?: string | null
          current_title?: string | null
          email?: string
          experience_years?: number | null
          first_name?: string
          id?: string
          last_name?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      custom_field_definitions: {
        Row: {
          created_at: string | null
          display_order: number | null
          entity_type: string
          field_name: string
          field_options: Json | null
          field_type: string | null
          id: string
          is_required: boolean | null
          organization_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          entity_type: string
          field_name: string
          field_options?: Json | null
          field_type?: string | null
          id?: string
          is_required?: boolean | null
          organization_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          entity_type?: string
          field_name?: string
          field_options?: Json | null
          field_type?: string | null
          id?: string
          is_required?: boolean | null
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_field_definitions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_field_values: {
        Row: {
          created_at: string | null
          entity_id: string
          field_definition_id: string | null
          id: string
          updated_at: string | null
          value: Json | null
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          field_definition_id?: string | null
          id?: string
          updated_at?: string | null
          value?: Json | null
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          field_definition_id?: string | null
          id?: string
          updated_at?: string | null
          value?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_field_values_field_definition_id_fkey"
            columns: ["field_definition_id"]
            isOneToOne: false
            referencedRelation: "custom_field_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      data_retention_policies: {
        Row: {
          auto_delete: boolean | null
          created_at: string | null
          entity_type: string
          id: string
          organization_id: string | null
          retention_period_days: number
          updated_at: string | null
        }
        Insert: {
          auto_delete?: boolean | null
          created_at?: string | null
          entity_type: string
          id?: string
          organization_id?: string | null
          retention_period_days: number
          updated_at?: string | null
        }
        Update: {
          auto_delete?: boolean | null
          created_at?: string | null
          entity_type?: string
          id?: string
          organization_id?: string | null
          retention_period_days?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_retention_policies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          entity_id: string
          entity_type: string
          file_name: string
          file_size: number | null
          file_type: string | null
          id: string
          metadata: Json | null
          organization_id: string | null
          storage_path: string
          upload_status: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          entity_type: string
          file_name: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          storage_path: string
          upload_status?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          storage_path?: string
          upload_status?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          application_id: string | null
          created_at: string | null
          duration_minutes: number | null
          feedback: Json | null
          id: string
          interview_type: string | null
          interviewer_id: string | null
          meeting_link: string | null
          notes: string | null
          rating: number | null
          scheduled_at: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          feedback?: Json | null
          id?: string
          interview_type?: string | null
          interviewer_id?: string | null
          meeting_link?: string | null
          notes?: string | null
          rating?: number | null
          scheduled_at: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          feedback?: Json | null
          id?: string
          interview_type?: string | null
          interviewer_id?: string | null
          meeting_link?: string | null
          notes?: string | null
          rating?: number | null
          scheduled_at?: string
          status?: string | null
          updated_at?: string | null
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
      job_metrics: {
        Row: {
          applications_count: number | null
          conversion_rate: number | null
          id: string
          job_id: string | null
          quality_score: number | null
          recorded_at: string | null
          time_to_hire_avg: number | null
          views_count: number | null
        }
        Insert: {
          applications_count?: number | null
          conversion_rate?: number | null
          id?: string
          job_id?: string | null
          quality_score?: number | null
          recorded_at?: string | null
          time_to_hire_avg?: number | null
          views_count?: number | null
        }
        Update: {
          applications_count?: number | null
          conversion_rate?: number | null
          id?: string
          job_id?: string | null
          quality_score?: number | null
          recorded_at?: string | null
          time_to_hire_avg?: number | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_metrics_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          closing_date: string | null
          created_at: string | null
          created_by: string | null
          department: string | null
          description: string | null
          experience_required: string | null
          hiring_manager_id: string | null
          id: string
          job_type: string | null
          location: string | null
          organization_id: string | null
          posted_date: string | null
          priority: string | null
          remote_allowed: boolean | null
          requirements: string[] | null
          salary_max: number | null
          salary_min: number | null
          skills: string[] | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          closing_date?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          description?: string | null
          experience_required?: string | null
          hiring_manager_id?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          organization_id?: string | null
          posted_date?: string | null
          priority?: string | null
          remote_allowed?: boolean | null
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: string[] | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          closing_date?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          description?: string | null
          experience_required?: string | null
          hiring_manager_id?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          organization_id?: string | null
          posted_date?: string | null
          priority?: string | null
          remote_allowed?: boolean | null
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: string[] | null
          status?: string | null
          title?: string
          updated_at?: string | null
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
      notification_preferences: {
        Row: {
          channel: string | null
          created_at: string | null
          event_type: string
          id: string
          is_enabled: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          channel?: string | null
          created_at?: string | null
          event_type: string
          id?: string
          is_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          channel?: string | null
          created_at?: string | null
          event_type?: string
          id?: string
          is_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          id: string
          invited_by: string | null
          joined_at: string | null
          organization_id: string | null
          role: string
          user_id: string | null
        }
        Insert: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          organization_id?: string | null
          role: string
          user_id?: string | null
        }
        Update: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          organization_id?: string | null
          role?: string
          user_id?: string | null
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
          created_at: string | null
          domain: string | null
          id: string
          name: string
          settings: Json | null
          subscription_plan: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          domain?: string | null
          id?: string
          name: string
          settings?: Json | null
          subscription_plan?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string | null
          id?: string
          name?: string
          settings?: Json | null
          subscription_plan?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      outreach_campaigns: {
        Row: {
          candidate_id: string | null
          completed_at: string | null
          created_at: string | null
          current_step: number | null
          id: string
          personalized_content: Json | null
          recruiter_id: string | null
          started_at: string | null
          status: string | null
          template_id: string | null
        }
        Insert: {
          candidate_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: number | null
          id?: string
          personalized_content?: Json | null
          recruiter_id?: string | null
          started_at?: string | null
          status?: string | null
          template_id?: string | null
        }
        Update: {
          candidate_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: number | null
          id?: string
          personalized_content?: Json | null
          recruiter_id?: string | null
          started_at?: string | null
          status?: string | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outreach_campaigns_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outreach_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "outreach_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      outreach_messages: {
        Row: {
          campaign_id: string | null
          channel: string | null
          content: string | null
          id: string
          opened_at: string | null
          replied_at: string | null
          sent_at: string | null
          status: string | null
          step_number: number | null
          subject: string | null
          tracking_data: Json | null
        }
        Insert: {
          campaign_id?: string | null
          channel?: string | null
          content?: string | null
          id?: string
          opened_at?: string | null
          replied_at?: string | null
          sent_at?: string | null
          status?: string | null
          step_number?: number | null
          subject?: string | null
          tracking_data?: Json | null
        }
        Update: {
          campaign_id?: string | null
          channel?: string | null
          content?: string | null
          id?: string
          opened_at?: string | null
          replied_at?: string | null
          sent_at?: string | null
          status?: string | null
          step_number?: number | null
          subject?: string | null
          tracking_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "outreach_messages_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "outreach_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      outreach_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          organization_id: string | null
          sequence_steps: Json
          success_rate: number | null
          target_audience: string[] | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          organization_id?: string | null
          sequence_steps: Json
          success_rate?: number | null
          target_audience?: string[] | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          organization_id?: string | null
          sequence_steps?: Json
          success_rate?: number | null
          target_audience?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "outreach_templates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_stages: {
        Row: {
          automated_actions: Json | null
          color: string | null
          created_at: string | null
          id: string
          name: string
          order_index: number | null
          organization_id: string | null
        }
        Insert: {
          automated_actions?: Json | null
          color?: string | null
          created_at?: string | null
          id?: string
          name: string
          order_index?: number | null
          organization_id?: string | null
        }
        Update: {
          automated_actions?: Json | null
          color?: string | null
          created_at?: string | null
          id?: string
          name?: string
          order_index?: number | null
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_stages_organization_id_fkey"
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
          created_at: string | null
          department: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      risk_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          description: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          organization_id: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          organization_id?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          organization_id?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "risk_alerts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          monthly_amount: number | null
          organization_id: string | null
          plan_type: string | null
          status: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          monthly_amount?: number | null
          organization_id?: string | null
          plan_type?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          monthly_amount?: number | null
          organization_id?: string | null
          plan_type?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      team_messages: {
        Row: {
          channel_id: string | null
          content: string | null
          id: string
          message_type: string | null
          metadata: Json | null
          organization_id: string | null
          sender_id: string | null
          sent_at: string | null
        }
        Insert: {
          channel_id?: string | null
          content?: string | null
          id?: string
          message_type?: string | null
          metadata?: Json | null
          organization_id?: string | null
          sender_id?: string | null
          sent_at?: string | null
        }
        Update: {
          channel_id?: string | null
          content?: string | null
          id?: string
          message_type?: string | null
          metadata?: Json | null
          organization_id?: string | null
          sender_id?: string | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_messages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_metrics: {
        Row: {
          count: number | null
          id: string
          metric_type: string
          organization_id: string | null
          period_end: string | null
          period_start: string | null
          recorded_at: string | null
        }
        Insert: {
          count?: number | null
          id?: string
          metric_type: string
          organization_id?: string | null
          period_end?: string | null
          period_start?: string | null
          recorded_at?: string | null
        }
        Update: {
          count?: number | null
          id?: string
          metric_type?: string
          organization_id?: string | null
          period_end?: string | null
          period_start?: string | null
          recorded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_metrics_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_availability: {
        Row: {
          created_at: string | null
          day_of_week: number | null
          end_time: string
          id: string
          is_active: boolean | null
          start_time: string
          timezone: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week?: number | null
          end_time: string
          id?: string
          is_active?: boolean | null
          start_time: string
          timezone?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number | null
          end_time?: string
          id?: string
          is_active?: boolean | null
          start_time?: string
          timezone?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_notifications: {
        Row: {
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          message: string
          read: boolean | null
          read_at: string | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          message: string
          read?: boolean | null
          read_at?: string | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          message?: string
          read?: boolean | null
          read_at?: string | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Relationships: []
      }
      webhook_configs: {
        Row: {
          created_at: string | null
          created_by: string | null
          events: string[]
          id: string
          is_active: boolean | null
          name: string
          organization_id: string | null
          secret_key: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          events: string[]
          id?: string
          is_active?: boolean | null
          name: string
          organization_id?: string | null
          secret_key?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          events?: string[]
          id?: string
          is_active?: boolean | null
          name?: string
          organization_id?: string | null
          secret_key?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_configs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_deliveries: {
        Row: {
          attempt_count: number | null
          created_at: string | null
          delivered_at: string | null
          event_type: string
          id: string
          payload: Json
          response_body: string | null
          status_code: number | null
          webhook_config_id: string | null
        }
        Insert: {
          attempt_count?: number | null
          created_at?: string | null
          delivered_at?: string | null
          event_type: string
          id?: string
          payload: Json
          response_body?: string | null
          status_code?: number | null
          webhook_config_id?: string | null
        }
        Update: {
          attempt_count?: number | null
          created_at?: string | null
          delivered_at?: string | null
          event_type?: string
          id?: string
          payload?: Json
          response_body?: string | null
          status_code?: number | null
          webhook_config_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_deliveries_webhook_config_id_fkey"
            columns: ["webhook_config_id"]
            isOneToOne: false
            referencedRelation: "webhook_configs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_organization: {
        Args: { _user_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
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
    },
  },
} as const
