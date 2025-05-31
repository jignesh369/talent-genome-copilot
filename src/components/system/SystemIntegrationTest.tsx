
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { useSystemTests } from '@/hooks/useSystemTests';
import TestRunner from './TestRunner';
import TestResultItem from './TestResultItem';

const SystemIntegrationTest = () => {
  const {
    tests,
    isRunning,
    progress,
    testResults,
    runTests
  } = useSystemTests();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <TestRunner
            tests={tests}
            isRunning={isRunning}
            progress={progress}
            onRunTests={runTests}
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <TestResultItem key={index} result={result} />
            ))}
            
            {testResults.length === 0 && !isRunning && (
              <div className="text-center py-8 text-gray-500">
                <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Run Tests" to start system integration testing</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemIntegrationTest;
