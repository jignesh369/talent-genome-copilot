
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import JobApplicationForm from "@/components/candidate/JobApplicationForm";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock job data - in a real app, this would be fetched based on jobId
  const jobData = {
    id: jobId || "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    type: "Full-time",
    description: "We're looking for a passionate frontend developer to join our team...",
    requirements: ["3+ years React experience", "TypeScript proficiency", "Team collaboration"],
    benefits: ["Health insurance", "401k matching", "Flexible PTO"]
  };

  const handleSubmit = async (applicationData: any) => {
    setIsSubmitting(true);
    
    try {
      // Here you would submit to your backend
      console.log("Submitting application:", applicationData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted!",
        description: "Your application has been successfully submitted. We'll be in touch soon!",
      });
      
      navigate("/candidate-dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isSubmitting) {
    return (
      <CandidateLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900">Submitting your application...</h2>
            <p className="text-gray-600">Please wait while we process your application.</p>
          </div>
        </div>
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobApplicationForm
          jobId={jobData.id}
          jobTitle={jobData.title}
          company={jobData.company}
          location={jobData.location}
          salary={jobData.salary}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </CandidateLayout>
  );
};

export default CandidateApplication;
