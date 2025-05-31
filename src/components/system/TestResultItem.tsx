
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'running';
  message: string;
  duration?: number;
}

interface TestResultItemProps {
  result: TestResult;
}

const TestResultItem: React.FC<TestResultItemProps> = ({ result }) => {
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
    <div className="flex items-center justify-between p-4 border rounded-lg">
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
  );
};

export default TestResultItem;
