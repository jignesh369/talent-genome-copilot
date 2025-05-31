
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Settings, 
  Target, 
  Zap, 
  Shield, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Sliders
} from 'lucide-react';

const CustomerAIConfiguration: React.FC = () => {
  const [aiSettings, setAISettings] = useState({
    smartMatching: true,
    resumeParsing: true,
    sentimentAnalysis: false,
    biasDetection: true,
    autoScreening: false,
    matchingThreshold: [75],
    qualityThreshold: [80],
    diversityBoost: [25]
  });

  const aiFeatures = [
    { 
      id: 'smartMatching', 
      name: 'Smart Candidate Matching', 
      description: 'AI-powered candidate-job matching based on skills, experience, and cultural fit',
      impact: 'High',
      enabled: aiSettings.smartMatching,
      icon: Target
    },
    { 
      id: 'resumeParsing', 
      name: 'Advanced Resume Parsing', 
      description: 'Extract and structure data from resumes with 95%+ accuracy',
      impact: 'High',
      enabled: aiSettings.resumeParsing,
      icon: Brain
    },
    { 
      id: 'sentimentAnalysis', 
      name: 'Communication Sentiment Analysis', 
      description: 'Analyze candidate communication for engagement and interest levels',
      impact: 'Medium',
      enabled: aiSettings.sentimentAnalysis,
      icon: TrendingUp
    },
    { 
      id: 'biasDetection', 
      name: 'Bias Detection & Mitigation', 
      description: 'Identify and reduce unconscious bias in hiring decisions',
      impact: 'High',
      enabled: aiSettings.biasDetection,
      icon: Shield
    },
    { 
      id: 'autoScreening', 
      name: 'Automated Initial Screening', 
      description: 'Automatically screen candidates based on predefined criteria',
      impact: 'Medium',
      enabled: aiSettings.autoScreening,
      icon: Zap
    }
  ];

  const modelPerformance = [
    { model: 'Skill Matching', accuracy: 94, usage: 2847, status: 'optimal' },
    { model: 'Resume Parsing', accuracy: 97, usage: 1923, status: 'optimal' },
    { model: 'Quality Scoring', accuracy: 89, usage: 1567, status: 'good' },
    { model: 'Bias Detection', accuracy: 91, usage: 891, status: 'optimal' },
    { model: 'Sentiment Analysis', accuracy: 76, usage: 234, status: 'needs_improvement' }
  ];

  const toggleFeature = (featureId: string) => {
    setAISettings(prev => ({
      ...prev,
      [featureId]: !prev[featureId as keyof typeof prev]
    }));
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'needs_improvement': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return CheckCircle;
      case 'good': return CheckCircle;
      case 'needs_improvement': return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Configuration</h2>
        <p className="text-gray-600 mb-6">Configure AI models and features to optimize your hiring process</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Features Active</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {Object.values(aiSettings).filter(Boolean).length - 3}
                </p>
              </div>
              <Brain className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
                <p className="text-2xl font-bold text-green-600">92%</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Usage</p>
                <p className="text-2xl font-bold text-blue-600">7.5k</p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost Savings</p>
                <p className="text-2xl font-bold text-purple-600">$12.3k</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="features" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">AI Features</TabsTrigger>
          <TabsTrigger value="tuning">Model Tuning</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-4">
          <div className="space-y-4">
            {aiFeatures.map((feature) => (
              <Card key={feature.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-indigo-100 rounded-lg">
                        <feature.icon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-lg">{feature.name}</h3>
                          <Badge className={getImpactColor(feature.impact)}>
                            {feature.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Switch 
                        checked={feature.enabled}
                        onCheckedChange={() => toggleFeature(feature.id)}
                      />
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tuning" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sliders className="w-5 h-5 mr-2" />
                  Matching Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium">Matching Threshold</label>
                    <span className="text-sm text-gray-600">{aiSettings.matchingThreshold[0]}%</span>
                  </div>
                  <Slider
                    value={aiSettings.matchingThreshold}
                    onValueChange={(value) => setAISettings(prev => ({ ...prev, matchingThreshold: value }))}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum match score to show candidates</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium">Quality Threshold</label>
                    <span className="text-sm text-gray-600">{aiSettings.qualityThreshold[0]}%</span>
                  </div>
                  <Slider
                    value={aiSettings.qualityThreshold}
                    onValueChange={(value) => setAISettings(prev => ({ ...prev, qualityThreshold: value }))}
                    max={100}
                    min={60}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum quality score for auto-recommendations</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium">Diversity Boost</label>
                    <span className="text-sm text-gray-600">{aiSettings.diversityBoost[0]}%</span>
                  </div>
                  <Slider
                    value={aiSettings.diversityBoost}
                    onValueChange={(value) => setAISettings(prev => ({ ...prev, diversityBoost: value }))}
                    max={50}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Boost diverse candidates in recommendations</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="font-medium mb-2 block">Matching Model</label>
                  <Select defaultValue="advanced">
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Keyword Matching</SelectItem>
                      <SelectItem value="standard">Standard ML Model</SelectItem>
                      <SelectItem value="advanced">Advanced Neural Network</SelectItem>
                      <SelectItem value="custom">Custom Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="font-medium mb-2 block">Bias Detection Model</label>
                  <Select defaultValue="latest">
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v1">Bias Detection v1.0</SelectItem>
                      <SelectItem value="v2">Bias Detection v2.0</SelectItem>
                      <SelectItem value="latest">Latest (v2.1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="font-medium mb-2 block">Resume Parser</label>
                  <Select defaultValue="neural">
                    <SelectTrigger>
                      <SelectValue placeholder="Select parser" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Text Extraction</SelectItem>
                      <SelectItem value="enhanced">Enhanced NLP Parser</SelectItem>
                      <SelectItem value="neural">Neural Parser (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Save Configuration</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelPerformance.map((model, index) => {
                  const StatusIcon = getStatusIcon(model.status);
                  return (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold">{model.model}</h4>
                          <StatusIcon className={`w-4 h-4 ${getStatusColor(model.status)}`} />
                        </div>
                        <Badge variant="outline">
                          {model.accuracy}% accuracy
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Accuracy</p>
                          <div className="flex items-center space-x-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${model.accuracy}%` }}
                              ></div>
                            </div>
                            <span className="font-medium">{model.accuracy}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500">Monthly Usage</p>
                          <p className="font-semibold">{model.usage.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Status</p>
                          <p className={`font-semibold capitalize ${getStatusColor(model.status)}`}>
                            {model.status.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerAIConfiguration;
