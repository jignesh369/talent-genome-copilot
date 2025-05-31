
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Lightbulb, Users } from 'lucide-react';

interface EmptyStateProps {
  onStartSearch?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onStartSearch }) => {
  const searchExamples = [
    "Find React developers with 5+ years experience in San Francisco",
    "Senior Python engineers with machine learning background",
    "Frontend developers who know TypeScript and have startup experience",
    "DevOps engineers with AWS certification in remote locations"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardContent className="text-center py-12">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Candidate Search</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Use natural language to find the perfect candidates. Our AI understands your requirements 
              and matches them with real candidate profiles from across the web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900">Search Examples</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {searchExamples.map((example, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>"{example}"</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-left">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-900">What You'll Get</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Real candidate profiles with contact information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>AI-powered matching scores and insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Social media and professional network data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Skills analysis and experience verification</span>
                </li>
              </ul>
            </div>
          </div>

          {onStartSearch && (
            <Button onClick={onStartSearch} size="lg" className="px-8">
              <Search className="w-5 h-5 mr-2" />
              Start Your Search
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyState;
