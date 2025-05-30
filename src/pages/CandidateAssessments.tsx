import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, AlertCircle, Play, FileText, Brain } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateAssessments = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<number | null>(null);
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: "React Technical Assessment",
      company: "TechCorp",
      type: "coding",
      status: "pending",
      timeLimit: "90 minutes",
      questions: 15,
      difficulty: "Intermediate",
      dueDate: "2 days",
      description: "Test your React knowledge with practical coding challenges"
    },
    {
      id: 2,
      title: "System Design Challenge",
      company: "StartupXYZ",
      type: "design",
      status: "completed",
      timeLimit: "60 minutes",
      questions: 3,
      difficulty: "Advanced",
      score: 85,
      completedDate: "3 days ago",
      description: "Design a scalable web application architecture"
    },
    {
      id: 3,
      title: "Behavioral Assessment",
      company: "MegaCorp",
      type: "behavioral",
      status: "available",
      timeLimit: "45 minutes",
      questions: 20,
      difficulty: "All Levels",
      dueDate: "1 week",
      description: "Personality and work style assessment"
    }
  ]);

  const handleStartAssessment = (assessmentId: number) => {
    setAssessments(prev => prev.map(assessment => 
      assessment.id === assessmentId 
        ? { ...assessment, status: "pending" }
        : assessment
    ));
    
    toast({
      title: "Assessment Started!",
      description: "Your assessment has been initiated. Good luck!",
    });
  };

  const handleContinueAssessment = (assessmentId: number) => {
    toast({
      title: "Continuing Assessment",
      description: "Resuming your assessment where you left off...",
    });
  };

  const handleViewResults = (assessmentId: number) => {
    const assessment = assessments.find(a => a.id === assessmentId);
    toast({
      title: "Assessment Results",
      description: `You scored ${assessment?.score}% on this assessment. Great job!`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "available": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "available": return <Play className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "coding": return <Brain className="w-5 h-5" />;
      case "design": return <FileText className="w-5 h-5" />;
      case "behavioral": return <CheckCircle className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
            <p className="text-gray-600 mt-2">Complete assessments to showcase your skills</p>
          </div>
          <div className="flex space-x-2">
            <Badge className="bg-yellow-100 text-yellow-800">2 Pending</Badge>
            <Badge className="bg-green-100 text-green-800">1 Completed</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <Card 
              key={assessment.id} 
              className={`bg-white hover:shadow-lg transition-all duration-300 cursor-pointer ${
                selectedAssessment === assessment.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedAssessment(assessment.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      {getTypeIcon(assessment.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <p className="text-sm text-gray-600">{assessment.company}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(assessment.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(assessment.status)}
                      <span>{assessment.status}</span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">{assessment.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Time Limit:</span>
                    <p className="font-medium">{assessment.timeLimit}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Questions:</span>
                    <p className="font-medium">{assessment.questions}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Difficulty:</span>
                    <p className="font-medium">{assessment.difficulty}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">
                      {assessment.status === 'completed' ? 'Completed:' : 'Due:'}
                    </span>
                    <p className="font-medium">
                      {assessment.status === 'completed' ? assessment.completedDate : assessment.dueDate}
                    </p>
                  </div>
                </div>

                {assessment.status === 'completed' && assessment.score && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span className="font-medium">{assessment.score}%</span>
                    </div>
                    <Progress value={assessment.score} className="h-2" />
                  </div>
                )}

                <div className="pt-2">
                  {assessment.status === 'available' && (
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartAssessment(assessment.id);
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Assessment
                    </Button>
                  )}
                  {assessment.status === 'pending' && (
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContinueAssessment(assessment.id);
                      }}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Continue Assessment
                    </Button>
                  )}
                  {assessment.status === 'completed' && (
                    <Button variant="outline" className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewResults(assessment.id);
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Results
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              Assessment Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Before Starting:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Ensure stable internet connection</li>
                  <li>• Find a quiet environment</li>
                  <li>• Read instructions carefully</li>
                  <li>• Have necessary tools ready</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">During Assessment:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Manage your time wisely</li>
                  <li>• Read questions thoroughly</li>
                  <li>• Use available resources</li>
                  <li>• Don't panic if stuck</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CandidateLayout>
  );
};

export default CandidateAssessments;
