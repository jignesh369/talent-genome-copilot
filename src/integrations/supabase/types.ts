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
      interview_status: "scheduled" | "completed" | "cancelled" | "rescheduled"
      interview_type: "phone" | "video" | "onsite" | "technical" | "panel"
      job_priority: "low" | "medium" | "high" | "urgent"
      job_status: "draft" | "active" | "paused" | "closed"
      job_type: "full-time" | "part-time" | "contract" | "internship"
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
      interview_status: ["scheduled", "completed", "cancelled", "rescheduled"],
      interview_type: ["phone", "video", "onsite", "technical", "panel"],
      job_priority: ["low", "medium", "high", "urgent"],
      job_status: ["draft", "active", "paused", "closed"],
      job_type: ["full-time", "part-time", "contract", "internship"],
    },
  },
} as const
