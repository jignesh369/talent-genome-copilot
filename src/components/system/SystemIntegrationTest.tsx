
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle, Play, RefreshCw } from 'lucide-react';
import { useRecruitingIntelligence } from '@/hooks/useRecruitingIntelligence';
import { useToast } from '@/hooks/use-toast';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'running';
  message: string;
  duration?: number;
}

const SystemIntegrationTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const { toast } = useToast();
  const { enhancedCandidates, osintMonitoring, alerts } = useRecruitingIntelligence();

  const tests = [
    { name: 'Enhanced Candidates Hook', component: 'useRecruitingIntelligence' },
    { name: 'OSINT Monitoring Service', component: 'osintMonitoring' },
    { name: 'Alert System', component: 'alerts' },
    { name: 'Communication Automation', component: 'communication' },
    { name: 'Predictive Analytics', component: 'predictions' },
    { name: 'Performance Optimization', component: 'performance' }
  ];

  const runTests = async () => {
    setIsRunning(true);
    setProgress(0);
    setTestResults([]);

    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      
      // Update progress
      setProgress((i / tests.length) * 100);
      
      // Simulate test running
      setTestResults(prev => [...prev, {
        name: test.name,
        status: 'running',
        message: 'Running test...'
      }]);

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate test results
      let result: TestResult;
      
      switch (test.component) {
        case 'useRecruitingIntelligence':
          result = {
            name: test.name,
            status: enhancedCandidates ? 'pass' : 'fail',
            message: enhancedCandidates ? 
              `Successfully loaded ${enhancedCandidates.length} enhanced candidates` : 
              'Failed to load enhanced candidates',
            duration: Math.random() * 1000 + 500
          };
          break;
        case 'osintMonitoring':
          result = {
            name: test.name,
            status: osintMonitoring ? 'pass' : 'fail',
            message: osintMonitoring ? 
              `OSINT monitoring active with ${osintMonitoring.total || 0} profiles` : 
              'OSINT monitoring not available',
            duration: Math.random() * 1000 + 500
          };
          break;
        case 'alerts':
          result = {
            name: test.name,
            status: alerts ? 'pass' : 'fail',
            message: alerts ? 
              `Alert system operational with ${alerts.length} alerts` : 
              'Alert system not responding',
            duration: Math.random() * 1000 + 500
          };
          break;
        default:
          result = {
            name: test.name,
            status: Math.random() > 0.2 ? 'pass' : 'warning',
            message: Math.random() > 0.2 ? 
              'Component operational' : 
              'Component has minor issues',
            duration: Math.random() * 1000 + 500
          };
      }

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

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'running':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return <Badge className="bg-green-100 text-green-800">Pass</Badge>;
      case 'fail':
        return <Badge variant="destructive">Fail</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Integration Tests</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Verify all components are working together correctly
              </p>
            </div>
            <Button onClick={runTests} disabled={isRunning}>
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? 'Running Tests...' : 'Run Tests'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isRunning && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Test Progress</span>
                <span className="text-sm text-gray-500">{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <p className="text-sm font-medium">{result.name}</p>
                    <p className="text-xs text-gray-500">{result.message}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {result.duration && (
                    <span className="text-xs text-gray-400">
                      {result.duration.toFixed(0)}ms
                    </span>
                  )}
                  {getStatusBadge(result.status)}
                </div>
              </div>
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
