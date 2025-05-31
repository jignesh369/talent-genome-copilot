
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { AssessmentQuestion } from '@/types/assessment';

interface QuestionRendererProps {
  question: AssessmentQuestion;
  currentAnswer: string | number;
  onAnswerChange: (answer: string | number) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  currentAnswer,
  onAnswerChange
}) => {
  switch (question.type) {
    case 'mcq':
      return (
        <RadioGroup 
          value={currentAnswer.toString()} 
          onValueChange={(value) => onAnswerChange(value)}
          className="space-y-3"
        >
          {question.options?.map((option, index) => (
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
            <span className="text-3xl font-bold text-blue-600">{currentAnswer || question.min || 1}</span>
            <p className="text-sm text-gray-600 mt-1">out of {question.max || 5}</p>
          </div>
          <Slider
            value={[Number(currentAnswer) || question.min || 1]}
            onValueChange={(value) => onAnswerChange(value[0])}
            max={question.max || 5}
            min={question.min || 1}
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
          {question.emojis?.map((emoji, index) => (
            <button
              key={index}
              onClick={() => onAnswerChange(emoji)}
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
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your answer here..."
          className="min-h-32 text-sm"
        />
      );

    default:
      return null;
  }
};

export default QuestionRenderer;
