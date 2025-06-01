
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2 } from "lucide-react";
import { SearchProgress } from '@/services/search/enhancedSearchPipeline';

interface SearchProgressIndicatorProps {
  progress: SearchProgress;
}

const SearchProgressIndicator: React.FC<SearchProgressIndicatorProps> = ({ progress }) => {
  const stageLabels = {
    interpreting: 'Interpreting Query',
    searching_db: 'Searching Database',
    osint_discovery: 'OSINT Discovery',
    ai_analysis: 'AI Analysis',
    completed: 'Completed'
  };

  const allStages = Object.keys(stageLabels) as Array<keyof typeof stageLabels>;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Search Progress</h3>
            <Badge variant={progress.stage === 'completed' ? 'default' : 'secondary'}>
              {progress.progress}%
            </Badge>
          </div>
          
          <Progress value={progress.progress} className="w-full" />
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{progress.currentOperation}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
            {allStages.map((stage) => {
              const isCompleted = progress.stagesCompleted.includes(stage);
              const isCurrent = progress.stage === stage;
              
              return (
                <div
                  key={stage}
                  className={`flex items-center space-x-2 p-2 rounded-lg text-xs ${
                    isCompleted
                      ? 'bg-green-100 text-green-800'
                      : isCurrent
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : isCurrent ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <div className="h-3 w-3 rounded-full border border-gray-300" />
                  )}
                  <span className="font-medium">{stageLabels[stage]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchProgressIndicator;
