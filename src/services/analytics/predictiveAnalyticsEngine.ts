
interface JobSuccessPrediction {
  overall_score: number;
  technical_fit: number;
  cultural_fit: number;
  experience_alignment: number;
  success_probability: number;
  risk_factors: string[];
  strengths: string[];
  recommendations: string[];
}

interface AssessmentGeneration {
  questions: AssessmentQuestion[];
  estimated_duration: number;
  difficulty_level: 'junior' | 'mid' | 'senior' | 'lead';
  focus_areas: string[];
}

interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'coding' | 'scenario' | 'technical_explanation';
  options?: string[];
  expected_answer?: string;
  skill_area: string;
  difficulty: number;
}

interface MarketTrends {
  demand_score: number;
  salary_trends: {
    median: number;
    trend: 'increasing' | 'stable' | 'decreasing';
    percentage_change: number;
  };
  competition_level: 'low' | 'medium' | 'high';
  growth_projection: number;
  top_companies_hiring: string[];
  emerging_skills: string[];
}

class PredictiveAnalyticsEngine {
  async predictJobSuccess(candidate: any, jobRequirements: string[]): Promise<JobSuccessPrediction> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const technical_fit = this.calculateTechnicalFit(candidate, jobRequirements);
    const cultural_fit = this.calculateCulturalFit(candidate);
    const experience_alignment = this.calculateExperienceAlignment(candidate, jobRequirements);
    
    const overall_score = (technical_fit + cultural_fit + experience_alignment) / 3;
    const success_probability = Math.min(overall_score * 1.2, 10) / 10; // Cap at 100%

    return {
      overall_score,
      technical_fit,
      cultural_fit,
      experience_alignment,
      success_probability,
      risk_factors: this.identifyRiskFactors(candidate),
      strengths: this.identifyStrengths(candidate),
      recommendations: this.generateRecommendations(candidate, overall_score)
    };
  }

  async generateAssessment(role: string, seniority: string, skills: string[]): Promise<AssessmentGeneration> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const difficulty_level = this.mapSeniorityToDifficulty(seniority);
    const questions = this.generateQuestions(role, difficulty_level, skills);
    
    return {
      questions,
      estimated_duration: questions.length * 5, // 5 minutes per question
      difficulty_level,
      focus_areas: skills.slice(0, 3) // Top 3 skills
    };
  }

  async analyzeMarketTrends(skills: string[], location: string): Promise<MarketTrends> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const demandScore = this.calculateDemandScore(skills);
    
    return {
      demand_score: demandScore,
      salary_trends: {
        median: this.calculateMedianSalary(skills, location),
        trend: demandScore > 7 ? 'increasing' : demandScore > 4 ? 'stable' : 'decreasing',
        percentage_change: (demandScore - 5) * 2 // Mock percentage
      },
      competition_level: demandScore > 8 ? 'high' : demandScore > 5 ? 'medium' : 'low',
      growth_projection: demandScore * 1.2,
      top_companies_hiring: this.getTopCompaniesForSkills(skills),
      emerging_skills: this.getEmergingSkills(skills)
    };
  }

  private calculateTechnicalFit(candidate: any, jobRequirements: string[]): number {
    if (!candidate.skills || !Array.isArray(candidate.skills)) return 5;
    
    const candidateSkills = candidate.skills.map((skill: string) => skill.toLowerCase());
    const matchingSkills = jobRequirements.filter(req => 
      candidateSkills.some(skill => skill.includes(req.toLowerCase()))
    );
    
    const baseScore = (matchingSkills.length / Math.max(jobRequirements.length, 1)) * 10;
    const experienceBonus = Math.min(candidate.experience_years * 0.2, 2);
    const technicalDepthBonus = (candidate.technical_depth_score || 5) * 0.1;
    
    return Math.min(baseScore + experienceBonus + technicalDepthBonus, 10);
  }

  private calculateCulturalFit(candidate: any): number {
    const base = 6; // Default neutral score
    const communityBonus = (candidate.community_influence_score || 5) * 0.1;
    const learningBonus = (candidate.learning_velocity_score || 5) * 0.1;
    
    return Math.min(base + communityBonus + learningBonus, 10);
  }

  private calculateExperienceAlignment(candidate: any, jobRequirements: string[]): number {
    const years = candidate.experience_years || 0;
    const baseScore = Math.min(years * 1.5, 8); // Cap at 8 for experience alone
    const roleAlignment = this.assessRoleAlignment(candidate, jobRequirements);
    
    return Math.min(baseScore + roleAlignment, 10);
  }

  private assessRoleAlignment(candidate: any, jobRequirements: string[]): number {
    if (!candidate.current_title) return 1;
    
    const title = candidate.current_title.toLowerCase();
    const hasRelevantTitle = jobRequirements.some(req => 
      title.includes(req.toLowerCase()) || req.toLowerCase().includes('engineer')
    );
    
    return hasRelevantTitle ? 2 : 0.5;
  }

  private identifyRiskFactors(candidate: any): string[] {
    const risks: string[] = [];
    
    if (candidate.experience_years < 2) {
      risks.push('Limited professional experience');
    }
    
    if (candidate.technical_depth_score < 5) {
      risks.push('Below-average technical assessment score');
    }
    
    if (candidate.availability_status === 'unavailable') {
      risks.push('Currently unavailable for new opportunities');
    }
    
    if (!candidate.skills || candidate.skills.length < 3) {
      risks.push('Limited skill diversity documented');
    }
    
    return risks;
  }

  private identifyStrengths(candidate: any): string[] {
    const strengths: string[] = [];
    
    if (candidate.technical_depth_score >= 8) {
      strengths.push('Exceptional technical depth');
    }
    
    if (candidate.community_influence_score >= 7) {
      strengths.push('Strong community engagement');
    }
    
    if (candidate.learning_velocity_score >= 8) {
      strengths.push('High learning velocity');
    }
    
    if (candidate.experience_years >= 5) {
      strengths.push('Substantial professional experience');
    }
    
    if (candidate.skills && candidate.skills.length >= 8) {
      strengths.push('Diverse technical skill set');
    }
    
    return strengths;
  }

  private generateRecommendations(candidate: any, overallScore: number): string[] {
    const recommendations: string[] = [];
    
    if (overallScore >= 8) {
      recommendations.push('Prioritize for immediate interview');
      recommendations.push('Consider fast-track hiring process');
    } else if (overallScore >= 6) {
      recommendations.push('Schedule technical assessment');
      recommendations.push('Conduct behavioral interview');
    } else {
      recommendations.push('Additional skill validation required');
      recommendations.push('Consider for junior or training roles');
    }
    
    if (candidate.availability_status === 'passive') {
      recommendations.push('Craft personalized outreach strategy');
    }
    
    return recommendations;
  }

  private mapSeniorityToDifficulty(seniority: string): 'junior' | 'mid' | 'senior' | 'lead' {
    const level = seniority.toLowerCase();
    if (level.includes('senior') || level.includes('lead')) return 'senior';
    if (level.includes('mid') || level.includes('intermediate')) return 'mid';
    if (level.includes('lead') || level.includes('principal')) return 'lead';
    return 'junior';
  }

  private generateQuestions(role: string, difficulty: string, skills: string[]): AssessmentQuestion[] {
    const questions: AssessmentQuestion[] = [];
    
    // Generate technical questions based on skills
    skills.slice(0, 3).forEach((skill, index) => {
      questions.push({
        id: `q_${index + 1}`,
        question: `Explain a complex project where you used ${skill} and the challenges you faced.`,
        type: 'technical_explanation',
        skill_area: skill,
        difficulty: difficulty === 'senior' ? 8 : difficulty === 'mid' ? 6 : 4
      });
    });
    
    // Add scenario-based questions
    questions.push({
      id: `q_scenario_1`,
      question: `You're tasked with optimizing a slow-performing application. Walk me through your approach.`,
      type: 'scenario',
      skill_area: 'problem_solving',
      difficulty: difficulty === 'senior' ? 9 : 7
    });
    
    return questions;
  }

  private calculateDemandScore(skills: string[]): number {
    const highDemandSkills = ['react', 'node.js', 'python', 'aws', 'kubernetes', 'typescript'];
    const matches = skills.filter(skill => 
      highDemandSkills.some(high => skill.toLowerCase().includes(high.toLowerCase()))
    );
    
    return Math.min(5 + matches.length * 1.5, 10);
  }

  private calculateMedianSalary(skills: string[], location: string): number {
    const baseSalary = location.toLowerCase().includes('san francisco') ? 120000 : 
                     location.toLowerCase().includes('new york') ? 110000 : 
                     location.toLowerCase().includes('seattle') ? 115000 : 95000;
    
    const skillMultiplier = skills.length * 0.02;
    return Math.round(baseSalary * (1 + skillMultiplier));
  }

  private getTopCompaniesForSkills(skills: string[]): string[] {
    const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Uber', 'Airbnb'];
    return companies.slice(0, 5);
  }

  private getEmergingSkills(skills: string[]): string[] {
    const emerging = ['AI/ML', 'Web3', 'Edge Computing', 'Quantum Computing', 'AR/VR'];
    return emerging.slice(0, 3);
  }
}

export const predictiveAnalyticsEngine = new PredictiveAnalyticsEngine();
