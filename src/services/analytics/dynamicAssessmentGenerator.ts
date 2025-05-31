
interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'coding' | 'scenario' | 'open_ended';
  question: string;
  options?: string[];
  expected_answer?: string;
  scoring_criteria: string[];
  weight: number;
  skill_category: string;
}

interface GeneratedAssessment {
  id: string;
  role_title: string;
  requirements: string[];
  questions: AssessmentQuestion[];
  estimated_duration: number;
  difficulty_level: 'junior' | 'mid' | 'senior' | 'expert';
  created_at: string;
}

class DynamicAssessmentGenerator {
  async generateAssessment(
    roleTitle: string,
    requirements: string[],
    seniorityLevel: string
  ): Promise<GeneratedAssessment> {
    console.log('Generating dynamic assessment for:', roleTitle);

    const questions = await this.generateQuestions(requirements, seniorityLevel);
    const duration = this.calculateDuration(questions);

    return {
      id: `assessment_${Date.now()}`,
      role_title: roleTitle,
      requirements,
      questions,
      estimated_duration: duration,
      difficulty_level: this.mapSeniorityLevel(seniorityLevel),
      created_at: new Date().toISOString()
    };
  }

  private async generateQuestions(requirements: string[], seniority: string): Promise<AssessmentQuestion[]> {
    const questions: AssessmentQuestion[] = [];

    // Technical questions based on requirements
    for (const requirement of requirements.slice(0, 3)) {
      questions.push(await this.generateTechnicalQuestion(requirement, seniority));
    }

    // Scenario-based questions
    questions.push(await this.generateScenarioQuestion(requirements, seniority));

    // Coding challenge (for technical roles)
    if (this.isTechnicalRole(requirements)) {
      questions.push(await this.generateCodingQuestion(requirements, seniority));
    }

    // Cultural fit questions
    questions.push(await this.generateCultureQuestion());

    return questions;
  }

  private async generateTechnicalQuestion(skill: string, seniority: string): Promise<AssessmentQuestion> {
    const questionTemplates = {
      junior: {
        react: "What is the difference between state and props in React?",
        python: "Explain the difference between a list and a tuple in Python.",
        javascript: "What is the difference between let, const, and var in JavaScript?"
      },
      senior: {
        react: "How would you optimize a React application that's experiencing performance issues with frequent re-renders?",
        python: "Design a Python decorator that implements retry logic with exponential backoff.",
        javascript: "Explain the event loop in JavaScript and how it handles asynchronous operations."
      }
    };

    const level = seniority.toLowerCase().includes('senior') ? 'senior' : 'junior';
    const skillKey = skill.toLowerCase().replace(/[^a-z]/g, '');
    
    const questionText = questionTemplates[level][skillKey] || 
      `Describe your experience with ${skill} and provide an example of how you've used it in a recent project.`;

    return {
      id: `tech_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'open_ended',
      question: questionText,
      scoring_criteria: [
        'Technical accuracy',
        'Depth of understanding',
        'Real-world application',
        'Communication clarity'
      ],
      weight: 0.3,
      skill_category: skill
    };
  }

  private async generateScenarioQuestion(requirements: string[], seniority: string): Promise<AssessmentQuestion> {
    const scenarios = [
      "You're working on a critical project with a tight deadline, but you discover a fundamental flaw in the current approach that would require significant rework. How do you handle this situation?",
      "A team member consistently delivers code that doesn't meet quality standards, causing delays and technical debt. How would you address this issue?",
      "You need to implement a feature that requires a technology you're not familiar with. The deadline is in two weeks. Walk me through your approach."
    ];

    return {
      id: `scenario_${Date.now()}`,
      type: 'scenario',
      question: scenarios[Math.floor(Math.random() * scenarios.length)],
      scoring_criteria: [
        'Problem-solving approach',
        'Communication skills',
        'Leadership potential',
        'Decision-making process'
      ],
      weight: 0.25,
      skill_category: 'soft_skills'
    };
  }

  private async generateCodingQuestion(requirements: string[], seniority: string): Promise<AssessmentQuestion> {
    const codingChallenges = {
      junior: "Write a function that takes an array of numbers and returns the sum of all even numbers.",
      senior: "Design and implement a rate limiter that allows a maximum of N requests per minute for each user."
    };

    const level = seniority.toLowerCase().includes('senior') ? 'senior' : 'junior';

    return {
      id: `coding_${Date.now()}`,
      type: 'coding',
      question: codingChallenges[level],
      scoring_criteria: [
        'Code correctness',
        'Algorithm efficiency',
        'Code readability',
        'Edge case handling',
        'Testing approach'
      ],
      weight: 0.35,
      skill_category: 'technical_implementation'
    };
  }

  private async generateCultureQuestion(): Promise<AssessmentQuestion> {
    const cultureQuestions = [
      "Describe a time when you had to give difficult feedback to a colleague. How did you approach it?",
      "Tell me about a project where you had to work with a team that had different working styles. How did you adapt?",
      "What motivates you most in your work, and how do you stay engaged during challenging periods?"
    ];

    return {
      id: `culture_${Date.now()}`,
      type: 'open_ended',
      question: cultureQuestions[Math.floor(Math.random() * cultureQuestions.length)],
      scoring_criteria: [
        'Cultural alignment',
        'Self-awareness',
        'Collaboration skills',
        'Growth mindset'
      ],
      weight: 0.2,
      skill_category: 'cultural_fit'
    };
  }

  private isTechnicalRole(requirements: string[]): boolean {
    const technicalKeywords = ['programming', 'coding', 'development', 'engineering', 'react', 'python', 'javascript'];
    return requirements.some(req => 
      technicalKeywords.some(keyword => req.toLowerCase().includes(keyword))
    );
  }

  private calculateDuration(questions: AssessmentQuestion[]): number {
    const timePerType = {
      multiple_choice: 2,
      open_ended: 8,
      scenario: 10,
      coding: 20
    };

    return questions.reduce((total, question) => {
      return total + timePerType[question.type];
    }, 0);
  }

  private mapSeniorityLevel(seniority: string): 'junior' | 'mid' | 'senior' | 'expert' {
    const level = seniority.toLowerCase();
    if (level.includes('junior')) return 'junior';
    if (level.includes('senior') || level.includes('lead')) return 'senior';
    if (level.includes('expert') || level.includes('principal')) return 'expert';
    return 'mid';
  }

  async scoreAssessment(assessmentId: string, responses: Record<string, string>): Promise<{
    overall_score: number;
    category_scores: Record<string, number>;
    strengths: string[];
    areas_for_improvement: string[];
    recommendation: string;
  }> {
    // Mock scoring logic - in reality this would use AI/ML models
    const categoryScores = {
      technical_implementation: Math.random() * 30 + 70,
      soft_skills: Math.random() * 20 + 75,
      cultural_fit: Math.random() * 25 + 70
    };

    const overallScore = Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / Object.keys(categoryScores).length;

    const strengths = [];
    const improvements = [];

    if (categoryScores.technical_implementation > 80) {
      strengths.push('Strong technical implementation skills');
    } else if (categoryScores.technical_implementation < 70) {
      improvements.push('Technical implementation needs development');
    }

    if (categoryScores.soft_skills > 80) {
      strengths.push('Excellent communication and problem-solving');
    } else if (categoryScores.soft_skills < 70) {
      improvements.push('Communication skills could be enhanced');
    }

    let recommendation = 'Move to next round';
    if (overallScore > 85) {
      recommendation = 'Strongly recommend for hire';
    } else if (overallScore < 65) {
      recommendation = 'Consider for junior role or additional training';
    }

    return {
      overall_score: overallScore,
      category_scores: categoryScores,
      strengths,
      areas_for_improvement: improvements,
      recommendation
    };
  }
}

export const dynamicAssessmentGenerator = new DynamicAssessmentGenerator();
