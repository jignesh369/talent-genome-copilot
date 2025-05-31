
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, MessageSquare } from 'lucide-react';

interface QuickActionsGridProps {
  onCreateJob: () => void;
}

const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({ onCreateJob }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onCreateJob}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2 text-blue-600" />
            Create New Job
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Post a new job opening and start attracting candidates.
          </p>
          <Button className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Create Job
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2 text-green-600" />
            AI Candidate Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Use AI to find the perfect candidates for your roles.
          </p>
          <Button variant="outline" className="w-full">
            Search Candidates
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
            Interview Scheduling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Schedule and manage interviews with candidates.
          </p>
          <Button variant="outline" className="w-full">
            Schedule Interview
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionsGrid;
