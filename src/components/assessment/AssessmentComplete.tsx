
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Rocket, Clock, Target } from 'lucide-react';

interface AssessmentCompleteProps {
  totalTime: number; // in minutes
  onReturnToDashboard: () => void;
}

const AssessmentComplete: React.FC<AssessmentCompleteProps> = ({
  totalTime,
  onReturnToDashboard
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shadow-2xl border-0">
        <CardContent className="p-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          {/* Main Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Assessment Complete! 🚀
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Great job! You've successfully completed the assessment. 
            Your responses have been submitted and will be reviewed by our team.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-gray-900">Time Taken</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{totalTime} min</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-gray-900">Questions</span>
              </div>
              <p className="text-2xl font-bold text-green-600">Completed</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
            <p className="text-sm text-gray-600">
              You'll receive an email confirmation shortly. Our team will review your assessment 
              and get back to you within 48 hours with next steps.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onReturnToDashboard}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Return to Dashboard
            </Button>
            
            <p className="text-xs text-gray-500 mt-4">
              Thank you for taking the time to complete our assessment! 🎉
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentComplete;
