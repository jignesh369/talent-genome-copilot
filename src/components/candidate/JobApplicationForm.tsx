
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, X, CheckCircle, MapPin, DollarSign, Clock } from "lucide-react";

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  onSubmit: (applicationData: any) => void;
  onCancel: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  jobId,
  jobTitle,
  company,
  location,
  salary,
  onSubmit,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    
    // Professional Information
    currentTitle: '',
    experience: '',
    expectedSalary: '',
    availableStart: '',
    
    // Application Details
    coverLetter: '',
    whyInterested: '',
    relevantExperience: '',
    
    // Documents
    resume: null as File | null,
    portfolio: '',
    additionalDocuments: [] as File[],
    
    // Preferences
    remoteWork: false,
    relocate: false,
    visaSponsorship: false,
    
    // Consent
    terms: false,
    communications: false
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: any) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setApplicationData(prev => ({ ...prev, [field]: file }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit({ ...applicationData, jobId });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={applicationData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={applicationData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={applicationData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="candidateLocation">Current Location *</Label>
                  <Input
                    id="candidateLocation"
                    value={applicationData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="San Francisco, CA"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentTitle">Current Job Title</Label>
                  <Input
                    id="currentTitle"
                    value={applicationData.currentTitle}
                    onChange={(e) => handleInputChange('currentTitle', e.target.value)}
                    placeholder="Senior Frontend Developer"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select value={applicationData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-3">2-3 years</SelectItem>
                      <SelectItem value="4-5">4-5 years</SelectItem>
                      <SelectItem value="6-8">6-8 years</SelectItem>
                      <SelectItem value="9+">9+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expectedSalary">Expected Salary</Label>
                    <Input
                      id="expectedSalary"
                      value={applicationData.expectedSalary}
                      onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                      placeholder="$120,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="availableStart">Available Start Date</Label>
                    <Input
                      id="availableStart"
                      type="date"
                      value={applicationData.availableStart}
                      onChange={(e) => handleInputChange('availableStart', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remoteWork"
                      checked={applicationData.remoteWork}
                      onCheckedChange={(checked) => handleInputChange('remoteWork', checked)}
                    />
                    <Label htmlFor="remoteWork">Open to remote work</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="relocate"
                      checked={applicationData.relocate}
                      onCheckedChange={(checked) => handleInputChange('relocate', checked)}
                    />
                    <Label htmlFor="relocate">Willing to relocate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="visaSponsorship"
                      checked={applicationData.visaSponsorship}
                      onCheckedChange={(checked) => handleInputChange('visaSponsorship', checked)}
                    />
                    <Label htmlFor="visaSponsorship">Require visa sponsorship</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Application Details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="coverLetter">Cover Letter *</Label>
                  <Textarea
                    id="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                    placeholder="Tell us why you're interested in this position..."
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="whyInterested">Why are you interested in this role?</Label>
                  <Textarea
                    id="whyInterested"
                    value={applicationData.whyInterested}
                    onChange={(e) => handleInputChange('whyInterested', e.target.value)}
                    placeholder="What excites you about this opportunity?"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="relevantExperience">Relevant Experience</Label>
                  <Textarea
                    id="relevantExperience"
                    value={applicationData.relevantExperience}
                    onChange={(e) => handleInputChange('relevantExperience', e.target.value)}
                    placeholder="Describe your most relevant experience for this role..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio/Website URL</Label>
                  <Input
                    id="portfolio"
                    value={applicationData.portfolio}
                    onChange={(e) => handleInputChange('portfolio', e.target.value)}
                    placeholder="https://your-portfolio.com"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Documents & Final Steps</h3>
              <div className="space-y-4">
                <div>
                  <Label>Resume *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {applicationData.resume ? (
                      <div className="flex items-center justify-center space-x-2">
                        <FileText className="w-6 h-6 text-green-500" />
                        <span className="text-sm text-gray-700">{applicationData.resume.name}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleFileUpload('resume', null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Drop your resume here or click to browse</p>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload('resume', e.target.files?.[0] || null)}
                          className="hidden"
                          id="resume-upload"
                        />
                        <Label htmlFor="resume-upload" className="cursor-pointer">
                          <Button variant="outline" className="mt-2">
                            Choose File
                          </Button>
                        </Label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={applicationData.terms}
                      onCheckedChange={(checked) => handleInputChange('terms', checked)}
                      required
                    />
                    <Label htmlFor="terms">I agree to the terms and conditions *</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="communications"
                      checked={applicationData.communications}
                      onCheckedChange={(checked) => handleInputChange('communications', checked)}
                    />
                    <Label htmlFor="communications">I agree to receive communications about this application</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Job Summary */}
      <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{jobTitle}</h2>
              <p className="text-lg text-purple-600 font-medium mb-2">{company}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {salary}
                </div>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Apply</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Personal Info</span>
            <span>Professional</span>
            <span>Application</span>
            <span>Documents</span>
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!applicationData.terms || !applicationData.resume}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;
