
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wand2, Lightbulb, Users, Target, CheckCircle } from 'lucide-react';

interface AIJobCreationWizardProps {
  onSubmit: (jobData: any) => void;
  onCancel: () => void;
}

const AIJobCreationWizard: React.FC<AIJobCreationWizardProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    description: '',
    requirements: [] as string[],
    skills: [] as string[],
    experience: '',
    salary_min: '',
    salary_max: '',
    remote: false,
    priority: 'medium'
  });

  const [aiSuggestions, setAiSuggestions] = useState({
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
    requirements: ['Bachelor\'s degree', '3+ years experience', 'Strong communication skills'],
    salaryRange: { min: 80000, max: 120000 }
  });

  const steps = [
    { id: 1, title: 'Basic Info', icon: Target },
    { id: 2, title: 'AI Enhancement', icon: Wand2 },
    { id: 3, title: 'Requirements', icon: Users },
    { id: 4, title: 'Review', icon: CheckCircle }
  ];

  const currentStepData = steps.find(s => s.id === step);
  const progress = (step / steps.length) * 100;

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onSubmit(jobData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const addSkill = (skill: string) => {
    if (!jobData.skills.includes(skill)) {
      setJobData({ ...jobData, skills: [...jobData.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setJobData({ ...jobData, skills: jobData.skills.filter(s => s !== skill) });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <currentStepData.icon className="h-5 w-5 text-purple-600" />
            <span>AI Job Creation Wizard - {currentStepData.title}</span>
          </CardTitle>
          <div className="text-sm text-gray-500">
            Step {step} of {steps.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Job Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title</label>
                <Input
                  value={jobData.title}
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <Select value={jobData.department} onValueChange={(value) => setJobData({ ...jobData, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  value={jobData.location}
                  onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Job Type</label>
                <Select value={jobData.type} onValueChange={(value) => setJobData({ ...jobData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Wand2 className="h-5 w-5 mr-2 text-purple-600" />
              AI-Powered Enhancements
            </h3>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">AI Suggestions</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Recommended Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {aiSuggestions.skills.map((skill) => (
                      <Button
                        key={skill}
                        variant="outline"
                        size="sm"
                        onClick={() => addSkill(skill)}
                        disabled={jobData.skills.includes(skill)}
                      >
                        + {skill}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Selected Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {jobData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">AI Salary Recommendation</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Min salary"
                      value={jobData.salary_min}
                      onChange={(e) => setJobData({ ...jobData, salary_min: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Max salary"
                      value={jobData.salary_max}
                      onChange={(e) => setJobData({ ...jobData, salary_max: e.target.value })}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    AI suggests: ${aiSuggestions.salaryRange.min.toLocaleString()} - ${aiSuggestions.salaryRange.max.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Job Requirements & Description</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Job Description</label>
              <Textarea
                value={jobData.description}
                onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                rows={6}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Experience Level</label>
              <Select value={jobData.experience} onValueChange={(value) => setJobData({ ...jobData, experience: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                  <SelectItem value="lead">Lead Level (8+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority Level</label>
              <Select value={jobData.priority} onValueChange={(value) => setJobData({ ...jobData, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Job Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div><strong>Title:</strong> {jobData.title}</div>
              <div><strong>Department:</strong> {jobData.department}</div>
              <div><strong>Location:</strong> {jobData.location}</div>
              <div><strong>Type:</strong> {jobData.type}</div>
              <div><strong>Experience:</strong> {jobData.experience}</div>
              <div><strong>Priority:</strong> {jobData.priority}</div>
              {jobData.salary_min && jobData.salary_max && (
                <div><strong>Salary:</strong> ${parseInt(jobData.salary_min).toLocaleString()} - ${parseInt(jobData.salary_max).toLocaleString()}</div>
              )}
              <div>
                <strong>Skills:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {jobData.skills.map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div><strong>Description:</strong> {jobData.description}</div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={step === 1 ? onCancel : handleBack}>
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
            {step === steps.length ? 'Create Job' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIJobCreationWizard;
