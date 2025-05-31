
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { AssessmentQuestion, AssessmentAnswer, AssessmentSession } from '@/types/assessment';
import ConversationalScenario from './ConversationalScenario';
import RolePlaySimulation from './RolePlaySimulation';
import ProgressHeader from './ProgressHeader';
import BotHeader from './BotHeader';
import QuestionRenderer from './QuestionRenderer';
import SubmitButton from './SubmitButton';

interface AssessmentInterfaceProps {
  session: AssessmentSession;
  onAnswerSubmit: (answer: AssessmentAnswer) => void;
  onComplete: () => void;
}

const AssessmentInterface: React.FC<AssessmentInterfaceProps> = ({
  session,
  onAnswerSubmit,
  onComplete
}) => {
  const [currentAnswer, setCurrentAnswer] = useState<string | number>('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = session.questions[session.currentQuestionIndex];
  const isLastQuestion = session.currentQuestionIndex === session.questions.length - 1;

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setCurrentAnswer('');
    setTimeSpent(0);
  }, [session.currentQuestionIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Date.now() - questionStartTime);
    }, 100);

    return () => clearInterval(timer);
  }, [questionStartTime]);

  const handleSubmitAnswer = () => {
    const answer: AssessmentAnswer = {
      questionId: currentQuestion.id,
      answer: currentAnswer,
      timeSpent,
      timestamp: new Date()
    };

    onAnswerSubmit(answer);

    if (isLastQuestion) {
      onComplete();
    }
  };

  // Handle conversational scenario completion
  const handleConversationalComplete = (responses: string[]) => {
    const answer: AssessmentAnswer = {
      questionId: currentQuestion.id,
      answer: JSON.stringify(responses),
      timeSpent,
      timestamp: new Date()
    };

    onAnswerSubmit(answer);

    if (isLastQuestion) {
      onComplete();
    }
  };

  // Handle role-play simulation completion
  const handleRolePlayComplete = (responses: { situation: string; action: string; result: string }) => {
    const answer: AssessmentAnswer = {
      questionId: currentQuestion.id,
      answer: JSON.stringify(responses),
      timeSpent,
      timestamp: new Date()
    };

    onAnswerSubmit(answer);

    if (isLastQuestion) {
      onComplete();
    }
  };

  // Special handling for conversational scenarios
  if (currentQuestion.type === 'scenario' && currentQuestion.category === 'communication') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          <ProgressHeader
            currentQuestionIndex={session.currentQuestionIndex}
            totalQuestions={session.questions.length}
          />

          <ConversationalScenario
            scenario={{
              title: "Technical Communication Challenge",
              context: currentQuestion.question,
              initialMessage: "Hi! I'm here to understand this new feature you've been working on. Can you walk me through what it does and why it's important for our users?",
              expectedResponses: []
            }}
            onComplete={handleConversationalComplete}
            timeLimit={300}
          />
        </div>
      </div>
    );
  }

  // Special handling for role-play simulations
  if (currentQuestion.type === 'scenario' && currentQuestion.category === 'culture') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <ProgressHeader
            currentQuestionIndex={session.currentQuestionIndex}
            totalQuestions={session.questions.length}
          />

          <RolePlaySimulation
            simulation={{
              title: "Team Conflict Resolution",
              scenario: currentQuestion.question,
              yourRole: "Senior Developer and Team Lead",
              otherRole: "Junior Developer who missed a critical deadline",
              objectives: [
                "Address the missed deadline professionally",
                "Understand the root cause of the issue",
                "Provide constructive feedback and support",
                "Establish a plan to prevent future issues"
              ],
              timeLimit: 240
            }}
            onComplete={handleRolePlayComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <ProgressHeader
          currentQuestionIndex={session.currentQuestionIndex}
          totalQuestions={session.questions.length}
        />

        {/* Question Card */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-8">
            <BotHeader question={currentQuestion} />

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-relaxed">
                {currentQuestion.question}
              </h2>
              
              {currentQuestion.timeLimit && (
                <div className="flex items-center space-x-2 text-sm text-orange-600 bg-orange-50 p-2 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span>Time limit: {currentQuestion.timeLimit}s</span>
                </div>
              )}
            </div>

            {/* Answer Input */}
            <div className="mb-8">
              <QuestionRenderer
                question={currentQuestion}
                currentAnswer={currentAnswer}
                onAnswerChange={setCurrentAnswer}
              />
            </div>

            <SubmitButton
              onSubmit={handleSubmitAnswer}
              disabled={!currentAnswer && currentAnswer !== 0}
              isLastQuestion={isLastQuestion}
              currentQuestionIndex={session.currentQuestionIndex}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentInterface;
