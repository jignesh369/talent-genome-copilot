
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Check, ChevronRight } from "lucide-react";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [applicationData, setApplicationData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: ""
    },
    experience: {
      yearsOfExperience: "",
      currentRole: "",
      currentCompany: "",
      expectedSalary: ""
    },
    questions: {
      motivation: "",
      availability: "",
      relocation: ""
    }
  });

  const progress = (currentStep / 4) * 100;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeUploaded(true);
      // Simulate resume parsing
      setTimeout(() => {
        setApplicationData({
          ...applicationData,
          personalInfo: {
            name: "Alex Kumar",
            email: "alex@example.com",
            phone: "+1 (555) 123-4567",
            location: "San Francisco, CA"
          },
          experience: {
            yearsOfExperience: "3",
            currentRole: "Frontend Developer",
            currentCompany: "Tech Solutions",
            expectedSalary: "$120k"
          }
        });
      }, 2000);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
              <p className="text-gray-600">We'll parse your resume to speed up the application</p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900">Drop your resume here or click to browse</p>
                <p className="text-sm text-gray-500">PDF, DOC, or DOCX (max 10MB)</p>
              </label>
            </div>

            {resumeUploaded && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-green-800">Resume uploaded successfully!</p>
                  <p className="text-sm text-green-600">Parsing information...</p>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                value={applicationData.personalInfo.name}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  personalInfo: { ...applicationData.personalInfo, name: e.target.value }
                })}
              />
              <Input
                type="email"
                placeholder="Email"
                value={applicationData.personalInfo.email}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  personalInfo: { ...applicationData.personalInfo, email: e.target.value }
                })}
              />
              <Input
                placeholder="Phone"
                value={applicationData.personalInfo.phone}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  personalInfo: { ...applicationData.personalInfo, phone: e.target.value }
                })}
              />
              <Input
                placeholder="Location"
                value={applicationData.personalInfo.location}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  personalInfo: { ...applicationData.personalInfo, location: e.target.value }
                })}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Experience & Expectations</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Years of Experience"
                value={applicationData.experience.yearsOfExperience}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  experience: { ...applicationData.experience, yearsOfExperience: e.target.value }
                })}
              />
              <Input
                placeholder="Current Role"
                value={applicationData.experience.currentRole}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  experience: { ...applicationData.experience, currentRole: e.target.value }
                })}
              />
              <Input
                placeholder="Current Company"
                value={applicationData.experience.currentCompany}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  experience: { ...applicationData.experience, currentCompany: e.target.value }
                })}
              />
              <Input
                placeholder="Expected Salary"
                value={applicationData.experience.expectedSalary}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  experience: { ...applicationData.experience, expectedSalary: e.target.value }
                })}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Questions</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why are you interested in this role?
                </label>
                <Textarea
                  placeholder="Tell us what excites you about this opportunity..."
                  value={applicationData.questions.motivation}
                  onChange={(e) => setApplicationData({
                    ...applicationData,
                    questions: { ...applicationData.questions, motivation: e.target.value }
                  })}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When can you start?
                </label>
                <Input
                  placeholder="e.g., Immediately, 2 weeks notice, etc."
                  value={applicationData.questions.availability}
                  onChange={(e) => setApplicationData({
                    ...applicationData,
                    questions: { ...applicationData.questions, availability: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you open to relocation?
                </label>
                <Input
                  placeholder="Yes/No/Depends on the role"
                  value={applicationData.questions.relocation}
                  onChange={(e) => setApplicationData({
                    ...applicationData,
                    questions: { ...applicationData.questions, relocation: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit application
      navigate('/candidate-dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <CandidateLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for Frontend Developer</h1>
          <p className="text-gray-600">TechCorp • San Francisco, CA</p>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Application Progress</CardTitle>
              <span className="text-sm text-gray-500">Step {currentStep} of 4</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="p-8">
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              >
                {currentStep === 4 ? "Submit Application" : "Next"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CandidateLayout>
  );
};

export default CandidateApplication;
