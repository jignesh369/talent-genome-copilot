
import React from 'react';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import OutreachSequenceBuilder from '@/components/recruiter/outreach/OutreachSequenceBuilder';
import SequenceAnalyticsDashboard from '@/components/recruiter/outreach/SequenceAnalyticsDashboard';
import CandidatePersonalizationEngine from '@/components/recruiter/outreach/CandidatePersonalizationEngine';
import { PRESET_TEMPLATES } from '@/services/outreachTemplateService';
import { MessageSquare, Clock, TrendingUp, Users, Sparkles } from 'lucide-react';

const OutreachSequences = () => {
  return (
    <RecruiterLayout 
      title="Outreach Sequences" 
      subtitle="AI-powered personalized candidate outreach and automation"
    >
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="builder">Sequence Builder</TabsTrigger>
          <TabsTrigger value="personalization">AI Personalization</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRESET_TEMPLATES.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge className="bg-green-100 text-green-800">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {template.success_rate}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{template.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {template.steps} steps
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {template.duration_days} days
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-700">Target Audience:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.target_audience.slice(0, 3).map((audience, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {audience}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-700">Steps Preview:</div>
                    <div className="space-y-1">
                      {template.sequence_steps.slice(0, 2).map((step, idx) => (
                        <div key={idx} className="text-xs text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 flex-shrink-0"></div>
                          Step {step.step_number}: {step.channel} - {step.delay_days === 0 ? 'immediate' : `${step.delay_days} days`}
                        </div>
                      ))}
                      {template.sequence_steps.length > 2 && (
                        <div className="text-xs text-gray-400">
                          +{template.sequence_steps.length - 2} more steps
                        </div>
                      )}
                    </div>
                  </div>

                  <Button className="w-full" size="sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder">
          <OutreachSequenceBuilder />
        </TabsContent>

        <TabsContent value="personalization">
          <CandidatePersonalizationEngine />
        </TabsContent>

        <TabsContent value="analytics">
          <SequenceAnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </RecruiterLayout>
  );
};

export default OutreachSequences;
