
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Cpu, 
  BarChart3, 
  DollarSign, 
  Zap,
  Settings,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const AIModelManagement = () => {
  const { toast } = useToast();
  const [globalConfig, setGlobalConfig] = useState({
    primaryModel: 'gpt-4o',
    fallbackModel: 'gpt-4o-mini',
    costLimit: [1000],
    rateLimits: {
      requestsPerMinute: [100],
      tokensPerDay: [50000]
    },
    qualityThreshold: [85]
  });

  const [models, setModels] = useState([
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      provider: 'OpenAI',
      status: 'active',
      usage: 87,
      cost: 245.32,
      accuracy: 94,
      speed: 'Fast'
    },
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini',
      provider: 'OpenAI',
      status: 'active',
      usage: 45,
      cost: 89.14,
      accuracy: 89,
      speed: 'Very Fast'
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      provider: 'Anthropic',
      status: 'inactive',
      usage: 0,
      cost: 0,
      accuracy: 92,
      speed: 'Fast'
    }
  ]);

  const handleModelToggle = (modelId: string) => {
    setModels(prev =>
      prev.map(model =>
        model.id === modelId
          ? { ...model, status: model.status === 'active' ? 'inactive' : 'active' }
          : model
      )
    );
    
    const model = models.find(m => m.id === modelId);
    toast({
      title: model?.status === 'active' ? "Model Deactivated" : "Model Activated",
      description: `${model?.name} has been ${model?.status === 'active' ? 'deactivated' : 'activated'}.`,
    });
  };

  const handleConfigChange = (field: string, value: any) => {
    setGlobalConfig(prev => ({
      ...prev,
      [field]: value
    }));
    
    toast({
      title: "Configuration Updated",
      description: "Global AI model settings have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Model Management</h3>
          <p className="text-sm text-gray-600">Configure AI models and usage across the entire platform</p>
        </div>
        <Button>
          <Settings className="w-4 h-4 mr-2" />
          Advanced Config
        </Button>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total API Calls</p>
                <p className="text-3xl font-bold text-gray-900">47.3k</p>
                <p className="text-xs text-green-600">↑ 23% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Cpu className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
                <p className="text-3xl font-bold text-gray-900">$334</p>
                <p className="text-xs text-gray-500">of $1,000 limit</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
                <p className="text-3xl font-bold text-gray-900">92%</p>
                <p className="text-xs text-green-600">Above threshold</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Performance</p>
                <p className="text-3xl font-bold text-gray-900">98%</p>
                <p className="text-xs text-green-600">Uptime</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Global Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Global Model Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Primary Model</label>
              <Select 
                value={globalConfig.primaryModel} 
                onValueChange={(value) => handleConfigChange('primaryModel', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Fallback Model</label>
              <Select 
                value={globalConfig.fallbackModel} 
                onValueChange={(value) => handleConfigChange('fallbackModel', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Monthly Cost Limit: ${globalConfig.costLimit[0]}
            </label>
            <Slider
              value={globalConfig.costLimit}
              onValueChange={(value) => handleConfigChange('costLimit', value)}
              max={5000}
              min={100}
              step={100}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Requests per Minute: {globalConfig.rateLimits.requestsPerMinute[0]}
              </label>
              <Slider
                value={globalConfig.rateLimits.requestsPerMinute}
                onValueChange={(value) => handleConfigChange('rateLimits', { ...globalConfig.rateLimits, requestsPerMinute: value })}
                max={1000}
                min={10}
                step={10}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Quality Threshold: {globalConfig.qualityThreshold[0]}%
              </label>
              <Slider
                value={globalConfig.qualityThreshold}
                onValueChange={(value) => handleConfigChange('qualityThreshold', value)}
                max={100}
                min={50}
                step={5}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Model Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {models.map((model) => (
              <div key={model.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Brain className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{model.name}</h4>
                    <p className="text-sm text-gray-600">{model.provider}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{model.usage}%</p>
                    <p className="text-xs text-gray-500">Usage</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">${model.cost}</p>
                    <p className="text-xs text-gray-500">Cost</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{model.accuracy}%</p>
                    <p className="text-xs text-gray-500">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline">{model.speed}</Badge>
                  </div>
                  <Switch
                    checked={model.status === 'active'}
                    onCheckedChange={() => handleModelToggle(model.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Cost Monitoring & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Current Usage</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">33%</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">$334 of $1,000</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Rate Limits</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Healthy</Badge>
              </div>
              <p className="text-xs text-gray-500">67 RPM average</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Quality Score</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">92%</Badge>
              </div>
              <p className="text-xs text-gray-500">Above 85% threshold</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelManagement;
