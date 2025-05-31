
import React from 'react';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  onSubmit: () => void;
  disabled: boolean;
  isLastQuestion: boolean;
  currentQuestionIndex: number;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onSubmit,
  disabled,
  isLastQuestion,
  currentQuestionIndex
}) => {
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

  return (
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-500">
        {currentQuestionIndex > 5 && (
          <span className="text-green-600 font-medium">
            {getEncouragementMessage()}
          </span>
        )}
      </div>
      <Button
        onClick={onSubmit}
        disabled={disabled}
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
      >
        {isLastQuestion ? 'Finish Assessment' : 'Next Question'}
      </Button>
    </div>
  );
};

export default SubmitButton;
