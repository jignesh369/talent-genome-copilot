
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, Trophy, Brain, Target, Zap } from "lucide-react";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateAssessments = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const assessments = [
    {
      id: 1,
      title: "Cognitive Ability Assessment",
      company: "TechCorp",
      type: "reasoning",
      duration: "20 mins",
      status: "pending",
      description: "Test your logical reasoning and problem-solving skills",
      icon: Brain,
      color: "purple"
    },
    {
      id: 2,
      title: "Role Simulation: Frontend Developer",
      company: "TechCorp", 
      type: "simulation",
      duration: "45 mins",
      status: "pending",
      description: "Work through real-world frontend development scenarios",
      icon: Target,
      color: "blue"
    },
    {
      id: 3,
      title: "Personality & Culture Fit",
      company: "StartupXYZ",
      type: "personality",
      duration: "15 mins",
      status: "completed",
      score: 85,
      description: "Assess your fit with company culture and values",
      icon: Trophy,
      color: "green"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const startAssessment = (assessmentId: number) => {
    console.log("Starting assessment:", assessmentId);
    // Navigate to assessment interface
  };

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessments</h1>
          <p className="text-gray-600">Complete your assessments to strengthen your applications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assessments.map((assessment) => {
            const IconComponent = assessment.icon;
            return (
              <Card key={assessment.id} className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl bg-${assessment.color}-100`}>
                        <IconComponent className={`w-6 h-6 text-${assessment.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{assessment.title}</CardTitle>
                        <p className="text-sm text-gray-600">{assessment.company}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(assessment.status)}>
                      {assessment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{assessment.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {assessment.duration}
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      {assessment.type}
                    </div>
                  </div>

                  {assessment.status === "completed" && assessment.score && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-800">Score</span>
                        <span className="text-lg font-bold text-green-600">{assessment.score}%</span>
                      </div>
                      <Progress value={assessment.score} className="h-2" />
                    </div>
                  )}

                  <div className="pt-4">
                    {assessment.status === "pending" ? (
                      <Button 
                        onClick={() => startAssessment(assessment.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Assessment
                      </Button>
                    ) : assessment.status === "completed" ? (
                      <Button variant="outline" className="w-full">
                        <Trophy className="w-4 h-4 mr-2" />
                        View Results
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        Continue Assessment
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
              <p className="text-gray-600">Assessments Available</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1</h3>
              <p className="text-gray-600">Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">85%</h3>
              <p className="text-gray-600">Average Score</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateAssessments;
