
import { ParsedResume, ResumeUploadStatus, BulkUploadResult, ParsingOptions } from '@/types/resume-parser';

// Mock API endpoints - replace with actual endpoints when backend is ready
const API_BASE = '/api/resume-parser';

export class ResumeParserService {
  static async uploadResume(file: File, options?: ParsingOptions): Promise<ResumeUploadStatus> {
    // Simulate file upload with progress
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResult: ResumeUploadStatus = {
          file_id: `file_${Date.now()}`,
          filename: file.name,
          size: file.size,
          status: 'completed',
          progress: 100,
          parsed_resume: this.generateMockParsedResume(file.name)
        };
        resolve(mockResult);
      }, 2000);
    });
  }

  static async bulkUploadResumes(files: File[], options?: ParsingOptions): Promise<BulkUploadResult> {
    const results: ResumeUploadStatus[] = [];
    
    for (const file of files) {
      const result = await this.uploadResume(file, options);
      results.push(result);
    }

    return {
      total_files: files.length,
      successful: results.filter(r => r.status === 'completed').length,
      failed: results.filter(r => r.status === 'failed').length,
      processing: results.filter(r => r.status === 'parsing').length,
      results,
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString()
    };
  }

  static async getParsedResume(resumeId: string): Promise<ParsedResume | null> {
    // Mock API call
    return this.generateMockParsedResume(`resume_${resumeId}.pdf`);
  }

  static async updateSkills(resumeId: string, skills: any[]): Promise<ParsedResume> {
    // Mock API call for updating skills
    const resume = await this.getParsedResume(resumeId);
    if (resume) {
      resume.skills = skills;
    }
    return resume!;
  }

  static async updateWorkExperience(resumeId: string, experience: any[]): Promise<ParsedResume> {
    // Mock API call for updating work experience
    const resume = await this.getParsedResume(resumeId);
    if (resume) {
      resume.work_experience = experience;
    }
    return resume!;
  }

  private static generateMockParsedResume(filename: string): ParsedResume {
    return {
      id: `resume_${Date.now()}`,
      original_filename: filename,
      file_url: `/uploads/${filename}`,
      parsing_status: 'completed',
      confidence_score: 0.87,
      parsed_at: new Date().toISOString(),
      personal_info: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        linkedin_url: "https://linkedin.com/in/sarahjohnson",
        github_url: "https://github.com/sarahjohnson"
      },
      skills: [
        {
          id: "1",
          name: "React",
          category: 'technical',
          confidence_score: 0.95,
          source: 'ai_detected',
          years_experience: 3,
          proficiency_level: 'advanced'
        },
        {
          id: "2",
          name: "TypeScript",
          category: 'technical',
          confidence_score: 0.88,
          source: 'ai_detected',
          years_experience: 2,
          proficiency_level: 'intermediate'
        },
        {
          id: "3",
          name: "Leadership",
          category: 'soft',
          confidence_score: 0.75,
          source: 'ai_detected',
          proficiency_level: 'advanced'
        }
      ],
      work_experience: [
        {
          id: "1",
          company: "TechCorp Inc",
          position: "Senior Frontend Developer",
          start_date: "2022-01",
          end_date: undefined,
          is_current: true,
          location: "San Francisco, CA",
          description: "Lead frontend development for enterprise applications",
          achievements: [
            "Increased user engagement by 40%",
            "Led team of 5 developers",
            "Implemented new design system"
          ],
          skills_used: ["React", "TypeScript", "Leadership"],
          confidence_score: 0.92
        }
      ],
      education: [
        {
          id: "1",
          institution: "Stanford University",
          degree: "Bachelor of Science",
          field_of_study: "Computer Science",
          start_date: "2018-09",
          end_date: "2022-06",
          gpa: "3.8",
          achievements: ["Dean's List", "Computer Science Honor Society"],
          confidence_score: 0.95
        }
      ],
      achievements: [
        {
          id: "1",
          title: "Best Innovation Award",
          description: "Awarded for developing revolutionary user interface",
          date: "2023-12",
          category: 'award',
          confidence_score: 0.85
        }
      ],
      summary: "Experienced frontend developer with 3+ years in React and TypeScript, passionate about creating user-centered applications.",
      raw_text: "Raw extracted text from resume..."
    };
  }
}
