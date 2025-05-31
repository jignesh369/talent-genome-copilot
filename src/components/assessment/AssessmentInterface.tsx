import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AssessmentQuestion, AssessmentAnswer, AssessmentSession } from '@/types/assessment';
import { Bot, Clock, Zap, Heart, Users, MessageSquare } from 'lucide-react';
import ConversationalScenario from './ConversationalScenario';
import RolePlaySimulation from './RolePlaySimulation';

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
  const progress = ((session.currentQuestionIndex + 1) / session.questions.length) * 100;
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
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {session.currentQuestionIndex + 1} of {session.questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

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
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {session.currentQuestionIndex + 1} of {session.questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

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

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case 'mcq':
        return (
          <RadioGroup 
            value={currentAnswer.toString()} 
            onValueChange={(value) => setCurrentAnswer(value)}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'slider':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-3xl font-bold text-blue-600">{currentAnswer || currentQuestion.min || 1}</span>
              <p className="text-sm text-gray-600 mt-1">out of {currentQuestion.max || 5}</p>
            </div>
            <Slider
              value={[Number(currentAnswer) || currentQuestion.min || 1]}
              onValueChange={(value) => setCurrentAnswer(value[0])}
              max={currentQuestion.max || 5}
              min={currentQuestion.min || 1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
          </div>
        );

      case 'emoji':
        return (
          <div className="grid grid-cols-3 gap-4">
            {currentQuestion.emojis?.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setCurrentAnswer(emoji)}
                className={`p-6 text-4xl bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 ${
                  currentAnswer === emoji ? 'bg-blue-100 ring-2 ring-blue-500' : ''
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        );

      case 'text':
        return (
          <Textarea
            value={currentAnswer.toString()}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-32 text-sm"
          />
        );

      default:
        return null;
    }
  };

  const getEncouragementMessage = () => {
    const messages = [
      "You're doing great! 🌟",
      "Keep it up! 🚀",
      "Almost there! 💪",
      "Excellent progress! ⭐",
      "You've got this! 🎯"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getCategoryIcon = () => {
    switch (currentQuestion.category) {
      case 'technical': return <Zap className="w-5 h-5 text-blue-500" />;
      case 'speed': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'culture': return <Heart className="w-5 h-5 text-pink-500" />;
      case 'communication': return <MessageSquare className="w-5 h-5 text-green-500" />;
      default: return <Bot className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {session.currentQuestionIndex + 1} of {session.questions.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-8">
            {/* Bot Avatar & Category */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">AI Assessment Bot</p>
                <div className="flex items-center space-x-2">
                  {getCategoryIcon()}
                  <span className="text-sm font-medium capitalize text-gray-700">
                    {currentQuestion.category}
                  </span>
                </div>
              </div>
            </div>

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
              {renderQuestionInput()}
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {session.currentQuestionIndex > 5 && (
                  <span className="text-green-600 font-medium">
                    {getEncouragementMessage()}
                  </span>
                )}
              </div>
              <Button
                onClick={handleSubmitAnswer}
                disabled={!currentAnswer && currentAnswer !== 0}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
              >
                {isLastQuestion ? 'Finish Assessment' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentInterface;
