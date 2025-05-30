
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, MapPin, Clock, Star, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useParams, Link } from "react-router-dom";

const CandidateApplication = () => {
  const { jobId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    experience: "",
    availability: "",
    consent: false
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Mock job data - in real app, fetch based on jobId
  const jobData = {
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    salary: "₹8-15L",
    type: "Full-time",
    skills: ["React", "TypeScript", "Tailwind"],
    description: "Join our amazing team and build the future of web development!"
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Application submitted:", formData);
    setCurrentStep(totalSteps + 1); // Show success step
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Hey there! Let's get to know you 👋
              </h2>
              <p className="text-gray-600">
                First, tell us a bit about yourself. This won't take long, promise!
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  What should we call you? ✨
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 rounded-xl border-gray-200 focus:border-purple-500"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address 📧
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 rounded-xl border-gray-200 focus:border-purple-500"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone number 📱
                </Label>
                <Input
                  id="phone"
                  placeholder="+91 12345 67890"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-1 rounded-xl border-gray-200 focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Show us your awesome resume! 📄
              </h2>
              <p className="text-gray-600">
                Drop your resume here and let our AI do the magic ✨
              </p>
            </div>
            
            <div className="border-2 border-dashed border-purple-300 rounded-2xl p-12 text-center hover:border-purple-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drag & drop your resume here
              </p>
              <p className="text-gray-500 mb-4">
                or click to browse (PDF, DOC, DOCX)
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                💡 <strong>Pro tip:</strong> Our AI will automatically extract your skills, experience, and achievements from your resume!
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Tell us about your superpowers! 💪
              </h2>
              <p className="text-gray-600">
                A few quick questions to make sure you're a perfect fit
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  How many years of experience do you have? 🚀
                </Label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {["0-1 years", "2-3 years", "4-5 years", "6+ years"].map((exp) => (
                    <Button
                      key={exp}
                      variant={formData.experience === exp ? "default" : "outline"}
                      onClick={() => setFormData({...formData, experience: exp})}
                      className="rounded-xl py-3"
                    >
                      {exp}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  When can you start? ⏰
                </Label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {["Immediately", "2 weeks", "1 month", "2+ months"].map((avail) => (
                    <Button
                      key={avail}
                      variant={formData.availability === avail ? "default" : "outline"}
                      onClick={() => setFormData({...formData, availability: avail})}
                      className="rounded-xl py-3"
                    >
                      {avail}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm text-green-700">
                  🎯 <strong>Great!</strong> Your experience matches what TechCorp is looking for!
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Almost done! Just one more thing 🏁
              </h2>
              <p className="text-gray-600">
                Review your application and let's make it official!
              </p>
            </div>
            
            <Card className="bg-gray-50 border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Application Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{formData.name || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{formData.email || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{formData.experience || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className="font-medium">{formData.availability || "Not selected"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-yellow-50 rounded-xl p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                  className="mt-1 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  I agree to the Terms & Conditions and Privacy Policy. I'm excited to hear from TechCorp! 🎉
                </span>
              </label>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Woohoo! Application submitted! 🎉
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Your application is now with TechCorp. We'll keep you updated every step of the way!
            </p>
            <div className="space-y-3">
              <Link to="/candidate-dashboard">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8">
                  Go to Dashboard
                </Button>
              </Link>
              <p className="text-sm text-gray-500">
                Expected response time: 24-48 hours ⏰
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white shadow-2xl border-0">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/candidate-portal">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            Application for Job #{jobId}
          </Badge>
        </div>

        {/* Job Info */}
        <Card className="bg-white shadow-lg border-0 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{jobData.title}</h1>
                <p className="text-gray-600 font-medium mb-2">{jobData.company}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {jobData.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {jobData.salary}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-700 border-green-200 mb-2">
                  {jobData.type}
                </Badge>
                <div className="flex space-x-1">
                  {jobData.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white shadow-2xl border-0">
          <CardContent className="p-8">
            {renderStep()}
            
            {currentStep <= totalSteps && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="rounded-full px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={currentStep === totalSteps ? handleSubmit : nextStep}
                  disabled={currentStep === 4 && !formData.consent}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6"
                >
                  {currentStep === totalSteps ? "Submit Application" : "Next"}
                  {currentStep !== totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandidateApplication;
