
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { 
  Brain, 
  Clock, 
  Award, 
  Play, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Heart,
  Zap
} from "lucide-react";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateAssessments = () => {
  const navigate = useNavigate();

  // Mock data for assessments
  const [assessments] = useState([
    {
      id: '1',
      title: 'Frontend Developer Assessment',
      company: 'TechCorp',
      status: 'completed',
      score: 85,
      completedAt: '2024-01-15',
      duration: 12,
      breakdown: {
        technical: 88,
        communication: 82,
        culture: 90,
        speed: 80
      }
    },
    {
      id: '2',
      title: 'Full Stack Developer Assessment',
      company: 'StartupXYZ',
      status: 'pending',
      invitedAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'React Developer Assessment',
      company: 'InnovateLab',
      status: 'available',
      estimatedDuration: 10
    }
  ]);

  const startAssessment = (assessmentId: string) => {
    navigate(`/assessment/${assessmentId}`);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'text-green-600 bg-green-50 border-green-200',
          label: 'Completed'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          label: 'Pending'
        };
      case 'available':
        return {
          icon: Play,
          color: 'text-blue-600 bg-blue-50 border-blue-200',
          label: 'Available'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600 bg-gray-50 border-gray-200',
          label: 'Unknown'
        };
    }
  };

  return (
    <CandidateLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessments</h1>
          <p className="text-gray-600">
            Take skill assessments to showcase your abilities to potential employers.
          </p>
        </div>

        {/* Quick Start Demo */}
        <Card className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Try Our Demo Assessment</h3>
                <p className="text-purple-100 mb-4">
                  Experience our AI-powered assessment system with a quick 8-question demo.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>~10 minutes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Brain className="w-4 h-4" />
                    <span>8 questions</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => navigate('/assessment/demo')}
                variant="secondary"
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((assessment) => {
            const statusConfig = getStatusConfig(assessment.status);
            const StatusIcon = statusConfig.icon;

            return (
              <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{assessment.title}</CardTitle>
                      <p className="text-sm text-gray-600 mb-3">{assessment.company}</p>
                      <Badge className={`${statusConfig.color} border px-2 py-1`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {assessment.status === 'completed' && (
                    <div className="space-y-4">
                      {/* Overall Score */}
                      <div className="text-center bg-gray-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {assessment.score}
                          <span className="text-base text-gray-500">/100</span>
                        </div>
                        <p className="text-sm text-gray-600">Overall Score</p>
                      </div>

                      {/* Quick Breakdown */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-50 rounded p-2 text-center">
                          <Brain className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                          <p className="text-sm font-semibold text-blue-900">{assessment.breakdown.technical}</p>
                          <p className="text-xs text-blue-600">Technical</p>
                        </div>
                        <div className="bg-green-50 rounded p-2 text-center">
                          <MessageSquare className="w-4 h-4 text-green-600 mx-auto mb-1" />
                          <p className="text-sm font-semibold text-green-900">{assessment.breakdown.communication}</p>
                          <p className="text-xs text-green-600">Communication</p>
                        </div>
                        <div className="bg-pink-50 rounded p-2 text-center">
                          <Heart className="w-4 h-4 text-pink-600 mx-auto mb-1" />
                          <p className="text-sm font-semibold text-pink-900">{assessment.breakdown.culture}</p>
                          <p className="text-xs text-pink-600">Culture</p>
                        </div>
                        <div className="bg-orange-50 rounded p-2 text-center">
                          <Zap className="w-4 h-4 text-orange-600 mx-auto mb-1" />
                          <p className="text-sm font-semibold text-orange-900">{assessment.breakdown.speed}</p>
                          <p className="text-xs text-orange-600">Speed</p>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 text-center">
                        Completed on {new Date(assessment.completedAt).toLocaleDateString()} • {assessment.duration} min
                      </div>
                    </div>
                  )}

                  {assessment.status === 'pending' && (
                    <div className="text-center py-6">
                      <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-2">
                        You've been invited to take this assessment
                      </p>
                      <p className="text-xs text-gray-500">
                        Invited on {new Date(assessment.invitedAt!).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {assessment.status === 'available' && (
                    <div className="text-center py-4">
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>~{assessment.estimatedDuration} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Brain className="w-4 h-4" />
                          <span>Skills test</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {assessment.status === 'available' && (
                    <Button 
                      onClick={() => startAssessment(assessment.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Assessment
                    </Button>
                  )}

                  {assessment.status === 'pending' && (
                    <Button 
                      onClick={() => startAssessment(assessment.id)}
                      className="w-full"
                      variant="outline"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Take Assessment
                    </Button>
                  )}

                  {assessment.status === 'completed' && (
                    <Button variant="outline" className="w-full">
                      <Award className="w-4 h-4 mr-2" />
                      View Certificate
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-3">About Our Assessments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-start space-x-2">
                <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">AI-Powered Evaluation</p>
                  <p className="text-blue-700">Smart questions adapt to your skill level</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Quick & Efficient</p>
                  <p className="text-blue-700">Most assessments take 10-15 minutes</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Detailed Feedback</p>
                  <p className="text-blue-700">Get insights into your strengths</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Shareable Results</p>
                  <p className="text-blue-700">Showcase your skills to employers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CandidateLayout>
  );
};

export default CandidateAssessments;
