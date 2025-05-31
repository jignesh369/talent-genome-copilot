
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import IntegrationHub from '@/components/integrations/IntegrationHub';
import AutomationRules from '@/components/automation/AutomationRules';
import PredictiveScoringEngine from '@/components/ai/PredictiveScoringEngine';
import ThemeCustomization from '@/components/customization/ThemeCustomization';
import { 
  Settings, 
  Zap, 
  Brain, 
  Palette,
  Link
} from 'lucide-react';

const PlatformSettings = () => {
  const [activeTab, setActiveTab] = useState('integrations');

  return (
    <RecruiterLayout 
      title="Platform Configuration" 
      subtitle="Advanced settings, integrations, and customization"
    >
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="integrations" className="flex items-center space-x-2">
              <Link className="h-4 w-4" />
              <span>Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Automation</span>
            </TabsTrigger>
            <TabsTrigger value="ai-scoring" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>AI Scoring</span>
            </TabsTrigger>
            <TabsTrigger value="customization" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Themes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="integrations">
            <IntegrationHub />
          </TabsContent>

          <TabsContent value="automation">
            <AutomationRules />
          </TabsContent>

          <TabsContent value="ai-scoring">
            <PredictiveScoringEngine />
          </TabsContent>

          <TabsContent value="customization">
            <ThemeCustomization />
          </TabsContent>
        </Tabs>
      </div>
    </RecruiterLayout>
  );
};

export default PlatformSettings;
