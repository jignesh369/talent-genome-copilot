
import { useState } from 'react';
import { testExecutionService } from '@/services/testExecutionService';
import { useRecruitingIntelligence } from './useRecruitingIntelligence';
import { useToast } from '@/hooks/use-toast';

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

const tests: TestRunner[] = [
  { name: 'Enhanced Candidates Hook', component: 'useRecruitingIntelligence' },
  { name: 'OSINT Monitoring Service', component: 'osintMonitoring' },
  { name: 'Alert System', component: 'alerts' },
  { name: 'Communication Automation', component: 'communication' },
  { name: 'Predictive Analytics', component: 'predictions' },
  { name: 'Performance Optimization', component: 'performance' }
];

export const useSystemTests = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const { toast } = useToast();
  const { enhancedCandidates, osintMonitoring, alerts } = useRecruitingIntelligence();

  const runTests = async () => {
    setIsRunning(true);
    setProgress(0);
    setTestResults([]);

    const context = { enhancedCandidates, osintMonitoring, alerts };

    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      
      setProgress((i / tests.length) * 100);
      
      setTestResults(prev => [...prev, {
        name: test.name,
        status: 'running',
        message: 'Running test...'
      }]);

      const result = await testExecutionService.executeTest(test.name, test.component, context);

      setTestResults(prev => prev.map((r, idx) => 
        idx === i ? result : r
      ));
    }

    setProgress(100);
    setIsRunning(false);

    const passCount = testResults.filter(r => r.status === 'pass').length;
    const totalTests = tests.length;

    toast({
      title: "Integration Tests Complete",
      description: `${passCount}/${totalTests} tests passed`,
      variant: passCount === totalTests ? 'default' : 'destructive'
    });
  };

  return {
    tests,
    isRunning,
    progress,
    testResults,
    runTests
  };
};
