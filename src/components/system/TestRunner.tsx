
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play } from 'lucide-react';

interface TestRunner {
  name: string;
  component: string;
}

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'running';
  message: string;
  duration?: number;
}

interface TestRunnerProps {
  tests: TestRunner[];
  isRunning: boolean;
  progress: number;
  onRunTests: () => void;
}

const TestRunner: React.FC<TestRunnerProps> = ({
  tests,
  isRunning,
  progress,
  onRunTests
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Integration Tests</h2>
        <p className="text-gray-600 mt-1">
          Verify all components are working together correctly
        </p>
      </div>
      <Button onClick={onRunTests} disabled={isRunning}>
        <Play className="h-4 w-4 mr-2" />
        {isRunning ? 'Running Tests...' : 'Run Tests'}
      </Button>
      {isRunning && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Test Progress</span>
            <span className="text-sm text-gray-500">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default TestRunner;
