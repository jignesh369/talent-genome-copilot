
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Github, Users } from "lucide-react";

const EmptyState: React.FC = () => {
  return (
    <Card className="max-w-3xl mx-auto shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="text-center py-16">
        <div className="relative mb-6">
          <Brain className="h-16 w-16 text-purple-400 mx-auto" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to discover exceptional talent?</h3>
        <p className="text-gray-600 mb-6 leading-relaxed max-w-lg mx-auto">
          Use natural language to describe your ideal candidate. Our AI analyzes public data across 
          multiple platforms to find perfect matches with comprehensive insights.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm">
          <div className="p-4 bg-blue-50 rounded-lg">
            <Github className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="font-medium text-blue-800">GitHub Analysis</div>
            <div className="text-blue-600">Code quality & contributions</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="font-medium text-green-800">Community Presence</div>
            <div className="text-green-600">Stack Overflow, Twitter, LinkedIn</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="font-medium text-purple-800">AI Insights</div>
            <div className="text-purple-600">Career trajectory & fit analysis</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
