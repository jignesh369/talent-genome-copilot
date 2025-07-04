export interface AssessmentQuestion {
  id: string;
  type: 'mcq' | 'slider' | 'emoji' | 'text' | 'scenario' | 'conversation' | 'roleplay';
  category: 'technical' | 'communication' | 'culture' | 'speed';
  question: string;
  options?: string[];
  emojis?: string[];
  min?: number;
  max?: number;
  timeLimit?: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard';
  // New fields for interactive scenarios
  scenario?: {
    context: string;
    roleDescription: string;
    objectives: string[];
    expectedInteractions: number;
  };
}

export interface AssessmentAnswer {
  questionId: string;
  answer: string | number;
  timeSpent: number; // in milliseconds
  timestamp: Date;
  // Additional context for scenario-based answers
  metadata?: {
    interactionCount?: number;
    responseQuality?: 'poor' | 'fair' | 'good' | 'excellent';
    keyPoints?: string[];
  };
}

export interface AssessmentSession {
  id: string;
  candidateId: string;
  jobId?: string;
  questions: AssessmentQuestion[];
  answers: AssessmentAnswer[];
  currentQuestionIndex: number;
  startTime: Date;
  endTime?: Date;
  status: 'in_progress' | 'completed' | 'abandoned';
}

export interface AssessmentScore {
  overall: number;
  technical: number;
  communication: number;
  culture: number;
  speed: number;
  breakdown: {
    category: string;
    score: number;
    maxScore: number;
    description: string;
  }[];
}

export interface AssessmentResult {
  sessionId: string;
  candidateId: string;
  score: AssessmentScore;
  completedAt: Date;
  totalTime: number; // in minutes
  recommendation: 'strong_fit' | 'good_fit' | 'moderate_fit' | 'poor_fit';
}
