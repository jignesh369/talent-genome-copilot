
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Star, 
  Clock, 
  Users, 
  MessageSquare, 
  Mail, 
  Linkedin, 
  Phone,
  Sparkles,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Edit
} from 'lucide-react';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { OutreachTemplate, SequenceRecommendation, PersonalizedSequence } from '@/types/outreach-sequence';
import { OutreachTemplateService } from '@/services/outreachTemplateService';
import { usePersonalizationEngine } from '@/hooks/usePersonalizationEngine';
import { useToast } from '@/hooks/use-toast';

interface OutreachSequenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: EnhancedCandidate;
  onSequenceStart: (personalizedSequence: PersonalizedSequence) => void;
}

const OutreachSequenceModal: React.FC<OutreachSequenceModalProps> = ({
  isOpen,
  onClose,
  candidate,
  onSequenceStart
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<OutreachTemplate | null>(null);
  const [recommendations, setRecommendations] = useState<SequenceRecommendation[]>([]);
  const [personalizedSequence, setPersonalizedSequence] = useState<PersonalizedSequence | null>(null);
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const { generatePersonalizedSequence } = usePersonalizationEngine();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && candidate) {
      const recs = OutreachTemplateService.getRecommendedTemplates(candidate);
      setRecommendations(recs);
      if (recs.length > 0) {
        setSelectedTemplate(recs[0].template);
      }
    }
  }, [isOpen, candidate]);

  const handleTemplateSelect = async (template: OutreachTemplate) => {
    setSelectedTemplate(template);
    setIsPersonalizing(true);
    
    try {
      const personalized = await generatePersonalizedSequence(candidate, template);
      setPersonalizedSequence(personalized);
    } catch (error) {
      toast({
        title: "Personalization Error",
        description: "Failed to generate personalized content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsPersonalizing(false);
    }
  };

  const handleContentEdit = (stepNumber: number, newContent: string) => {
    if (personalizedSequence) {
      const updatedSteps = personalizedSequence.personalized_steps.map(step =>
        step.step_number === stepNumber 
          ? { ...step, personalized_content: newContent }
          : step
      );
      setPersonalizedSequence({
        ...personalizedSequence,
        personalized_steps: updatedSteps
      });
    }
  };

  const handleStartSequence = () => {
    if (personalizedSequence) {
      onSequenceStart(personalizedSequence);
      toast({
        title: "Sequence Started",
        description: `${selectedTemplate?.name} sequence initiated for ${candidate.name}`,
      });
      onClose();
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return Mail;
      case 'linkedin': return Linkedin;
      case 'phone': return Phone;
      default: return MessageSquare;
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Sparkles className="h-6 w-6 mr-3 text-purple-600" />
            Start Outreach Sequence - {candidate.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Candidate Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{candidate.current_title} at {candidate.current_company}</h3>
                  <p className="text-gray-600">{candidate.experience_years}+ years • {candidate.location}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-100 text-green-800">
                    <Star className="h-3 w-3 mr-1" />
                    {candidate.match_score}% match
                  </Badge>
                  <Badge variant="outline">{candidate.availability_status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">Template Selection</TabsTrigger>
              <TabsTrigger value="preview" disabled={!personalizedSequence}>
                Personalized Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                  <Card 
                    key={rec.template.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedTemplate?.id === rec.template.id 
                        ? 'ring-2 ring-purple-500 bg-purple-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleTemplateSelect(rec.template)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{rec.template.name}</CardTitle>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-800">
                            <Star className="h-3 w-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{rec.template.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {rec.template.steps} steps • {rec.template.duration_days} days
                        </div>
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {rec.predicted_success_rate}%
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-medium text-gray-700">Why this template:</div>
                        {rec.reasoning.slice(0, 2).map((reason, idx) => (
                          <div key={idx} className="text-xs text-gray-600 flex items-start">
                            <CheckCircle className="h-3 w-3 mr-1 mt-0.5 text-green-500 flex-shrink-0" />
                            {reason}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Confidence: {Math.round(rec.confidence * 100)}%
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          disabled={isPersonalizing}
                        >
                          {isPersonalizing && selectedTemplate?.id === rec.template.id 
                            ? 'Personalizing...' 
                            : 'Select & Personalize'
                          }
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              {personalizedSequence && (
                <div className="space-y-4">
                  <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">Personalized {selectedTemplate?.name}</h3>
                          <p className="text-gray-600">AI-customized for {candidate.name}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-blue-100 text-blue-800">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Quality: {personalizedSequence.confidence_score.toFixed(1)}/10
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {personalizedSequence.estimated_success_rate}% success rate
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {personalizedSequence.personalized_steps.map((step, index) => {
                      const IconComponent = getChannelIcon(step.channel);
                      return (
                        <Card key={step.step_number} className="border-l-4 border-l-purple-500">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                  <IconComponent className="w-4 h-4 text-purple-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Step {step.step_number}</h4>
                                  <p className="text-sm text-gray-500">
                                    {step.delay_days === 0 ? 'Send immediately' : `Send after ${step.delay_days} days`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant="outline" 
                                  className={getQualityColor(step.quality_score)}
                                >
                                  Quality: {step.quality_score.toFixed(1)}/10
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingStep(editingStep === step.step_number ? null : step.step_number)}
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  {editingStep === step.step_number ? 'Done' : 'Edit'}
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {step.personalized_subject && (
                              <div>
                                <label className="block text-sm font-medium mb-1">Subject:</label>
                                <div className="p-2 bg-gray-50 rounded border">
                                  {step.personalized_subject}
                                </div>
                              </div>
                            )}

                            <div>
                              <label className="block text-sm font-medium mb-1">Message:</label>
                              {editingStep === step.step_number ? (
                                <Textarea
                                  value={step.personalized_content}
                                  onChange={(e) => handleContentEdit(step.step_number, e.target.value)}
                                  rows={6}
                                  className="w-full"
                                />
                              ) : (
                                <div className="p-3 bg-gray-50 rounded border whitespace-pre-wrap">
                                  {step.personalized_content}
                                </div>
                              )}
                            </div>

                            {step.personalization_highlights.length > 0 && (
                              <div>
                                <label className="block text-sm font-medium mb-2">AI Personalizations:</label>
                                <div className="flex flex-wrap gap-1">
                                  {step.personalization_highlights.map((highlight, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      <Sparkles className="h-2 w-2 mr-1" />
                                      {highlight}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleStartSequence}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Start Sequence
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutreachSequenceModal;
