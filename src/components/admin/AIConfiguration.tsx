
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Settings,
  Zap,
  BarChart3
} from 'lucide-react';

const AIConfiguration = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    candidateScoring: {
      enabled: true,
      threshold: [75],
      factors: ['experience', 'skills', 'education', 'cultural_fit']
    },
    jobMatching: {
      enabled: true,
      algorithm: 'advanced',
      weights: {
        skills: [80],
        experience: [70],
        location: [40]
      }
    },
    predictiveAnalytics: {
      enabled: true,
      hiringPrediction: true,
      performancePrediction: false,
      retentionAnalysis: true
    },
    recommendations: {
      enabled: true,
      frequency: 'daily',
      types: ['candidate_suggestions', 'job_optimization', 'process_improvements']
    }
  });

  const handleToggle = (section: string, field: string) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field]
      }
    }));
    
    toast({
      title: "Configuration Updated",
      description: "AI settings have been saved successfully.",
    });
  };

  const handleSliderChange = (section: string, field: string, value: number[]) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleWeightChange = (weightType: string, value: number[]) => {
    setConfig(prev => ({
      ...prev,
      jobMatching: {
        ...prev.jobMatching,
        weights: {
          ...prev.jobMatching.weights,
          [weightType]: value
        }
      }
    }));
  };

  const handleSelectChange = (section: string, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Configuration</h3>
          <p className="text-sm text-gray-600">Configure AI-powered features for your organization</p>
        </div>
        <Button>
          <Settings className="w-4 h-4 mr-2" />
          Advanced Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Features Active</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accuracy Score</p>
                <p className="text-3xl font-bold text-gray-900">94%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Predictions Made</p>
                <p className="text-3xl font-bold text-gray-900">1.2k</p>
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
                <p className="text-sm font-medium text-gray-600">Model Usage</p>
                <p className="text-3xl font-bold text-gray-900">87%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Candidate Scoring Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Candidate Scoring
            </CardTitle>
            <Switch
              checked={config.candidateScoring.enabled}
              onCheckedChange={() => handleToggle('candidateScoring', 'enabled')}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Score Threshold: {config.candidateScoring.threshold[0]}%
            </label>
            <Slider
              value={config.candidateScoring.threshold}
              onValueChange={(value) => handleSliderChange('candidateScoring', 'threshold', value)}
              max={100}
              min={0}
              step={5}
              className="w-full"
              disabled={!config.candidateScoring.enabled}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Scoring Factors</label>
            <div className="flex flex-wrap gap-2">
              {config.candidateScoring.factors.map((factor) => (
                <Badge key={factor} variant="secondary">
                  {factor.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Matching Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Job Matching
            </CardTitle>
            <Switch
              checked={config.jobMatching.enabled}
              onCheckedChange={() => handleToggle('jobMatching', 'enabled')}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Algorithm</label>
            <Select
              value={config.jobMatching.algorithm}
              onValueChange={(value) => handleSelectChange('jobMatching', 'algorithm', value)}
              disabled={!config.jobMatching.enabled}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic Matching</SelectItem>
                <SelectItem value="advanced">Advanced AI Matching</SelectItem>
                <SelectItem value="ml">Machine Learning</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Skills Weight: {config.jobMatching.weights.skills[0]}%
              </label>
              <Slider
                value={config.jobMatching.weights.skills}
                onValueChange={(value) => handleWeightChange('skills', value)}
                max={100}
                min={0}
                step={5}
                disabled={!config.jobMatching.enabled}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Experience Weight: {config.jobMatching.weights.experience[0]}%
              </label>
              <Slider
                value={config.jobMatching.weights.experience}
                onValueChange={(value) => handleWeightChange('experience', value)}
                max={100}
                min={0}
                step={5}
                disabled={!config.jobMatching.enabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Predictive Analytics
            </CardTitle>
            <Switch
              checked={config.predictiveAnalytics.enabled}
              onCheckedChange={() => handleToggle('predictiveAnalytics', 'enabled')}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Hiring Success Prediction</span>
              <Switch
                checked={config.predictiveAnalytics.hiringPrediction}
                onCheckedChange={() => handleToggle('predictiveAnalytics', 'hiringPrediction')}
                disabled={!config.predictiveAnalytics.enabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Performance Prediction</span>
              <Switch
                checked={config.predictiveAnalytics.performancePrediction}
                onCheckedChange={() => handleToggle('predictiveAnalytics', 'performancePrediction')}
                disabled={!config.predictiveAnalytics.enabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Retention Analysis</span>
              <Switch
                checked={config.predictiveAnalytics.retentionAnalysis}
                onCheckedChange={() => handleToggle('predictiveAnalytics', 'retentionAnalysis')}
                disabled={!config.predictiveAnalytics.enabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Smart Recommendations
            </CardTitle>
            <Switch
              checked={config.recommendations.enabled}
              onCheckedChange={() => handleToggle('recommendations', 'enabled')}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Frequency</label>
            <Select
              value={config.recommendations.frequency}
              onValueChange={(value) => handleSelectChange('recommendations', 'frequency', value)}
              disabled={!config.recommendations.enabled}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="real-time">Real-time</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Recommendation Types</label>
            <div className="flex flex-wrap gap-2">
              {config.recommendations.types.map((type) => (
                <Badge key={type} variant="secondary">
                  {type.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIConfiguration;
