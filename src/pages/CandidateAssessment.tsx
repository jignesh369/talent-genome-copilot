import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AssessmentInterface from '@/components/assessment/AssessmentInterface';
import AssessmentComplete from '@/components/assessment/AssessmentComplete';
import { AssessmentQuestion, AssessmentAnswer, AssessmentSession } from '@/types/assessment';
import CandidateLayout from '@/components/candidate/CandidateLayout';

// Sample questions for demo
const sampleQuestions: AssessmentQuestion[] = [
  {
    id: '1',
    type: 'mcq',
    category: 'speed',
    question: 'Which of the following is NOT a JavaScript data type?',
    options: ['String', 'Boolean', 'Float', 'Number'],
    difficulty: 'easy',
    timeLimit: 30
  },
  {
    id: '2',
    type: 'slider',
    category: 'culture',
    question: 'How comfortable are you working in a fast-paced startup environment?',
    min: 1,
    max: 5,
    difficulty: 'medium'
  },
  {
    id: '3',
    type: 'emoji',
    category: 'culture',
    question: 'How do you typically react when facing a challenging problem?',
    emojis: ['🤔', '😤', '💪', '🚀', '🧠', '⚡'],
    difficulty: 'easy'
  },
  {
    id: '4',
    type: 'mcq',
    category: 'technical',
    question: 'What is the main purpose of version control systems like Git?',
    options: [
      'To compile code faster',
      'To track changes and collaborate on code',
      'To debug applications',
      'To deploy applications'
    ],
    difficulty: 'medium'
  },
  {
    id: '5',
    type: 'scenario',
    category: 'communication',
    question: 'Describe how you would explain a complex technical concept to a non-technical stakeholder. Use a specific example.',
    difficulty: 'hard'
  },
  {
    id: '6',
    type: 'slider',
    category: 'culture',
    question: 'How important is work-life balance to you?',
    min: 1,
    max: 5,
    difficulty: 'easy'
  },
  {
    id: '7',
    type: 'mcq',
    category: 'speed',
    question: 'Which HTTP status code indicates a successful request?',
    options: ['404', '500', '200', '301'],
    difficulty: 'easy',
    timeLimit: 20
  },
  {
    id: '8',
    type: 'text',
    category: 'communication',
    question: 'Tell us about a time when you had to learn a new technology quickly. What was your approach?',
    difficulty: 'medium'
  }
];

const CandidateAssessment: React.FC = () => {
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const { toast } = useToast();
  
  const [session, setSession] = useState<AssessmentSession>({
    id: assessmentId || 'demo-session-1',
    candidateId: 'candidate-1',
    jobId: assessmentId === 'demo' ? undefined : assessmentId,
    questions: sampleQuestions,
    answers: [],
    currentQuestionIndex: 0,
    startTime: new Date(),
    status: 'in_progress'
  });
  
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerSubmit = (answer: AssessmentAnswer) => {
    console.log('Answer submitted:', answer);
    
    setSession(prev => ({
      ...prev,
      answers: [...prev.answers, answer],
      currentQuestionIndex: prev.currentQuestionIndex + 1
    }));

    toast({
      title: "Answer Saved",
      description: "Your response has been recorded.",
    });
  };

  const handleComplete = () => {
    console.log('Assessment completed');
    
    const totalTime = Math.round((Date.now() - session.startTime.getTime()) / 60000);
    
    setSession(prev => ({
      ...prev,
      endTime: new Date(),
      status: 'completed'
    }));

    setIsCompleted(true);

    toast({
      title: "Assessment Complete",
      description: `You completed the assessment in ${totalTime} minutes.`,
    });
  };

  const handleReturnToDashboard = () => {
    navigate('/candidate-dashboard');
  };

  if (isCompleted) {
    const totalTime = Math.round((Date.now() - session.startTime.getTime()) / 60000);
    return (
      <AssessmentComplete
        totalTime={totalTime}
        onReturnToDashboard={handleReturnToDashboard}
      />
    );
  }

  // Don't wrap in CandidateLayout for the assessment to have full control
  return (
    <AssessmentInterface
      session={session}
      onAnswerSubmit={handleAnswerSubmit}
      onComplete={handleComplete}
    />
  );
};

export default CandidateAssessment;
