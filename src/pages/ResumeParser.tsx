
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Users, Brain, Upload } from 'lucide-react';
import ResumeUploader from '@/components/resume/ResumeUploader';
import BulkResumeUploader from '@/components/resume/BulkResumeUploader';
import SkillsTagger from '@/components/resume/SkillsTagger';
import { useResumeParser } from '@/hooks/useResumeParser';

const ResumeParser = () => {
  const { parsedResume, updateSkills } = useResumeParser();
  const [activeTab, setActiveTab] = useState('single');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Parser</h1>
                <p className="text-gray-600">AI-powered resume analysis and skill extraction</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="single" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Single Resume</span>
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Bulk Upload</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Resume
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResumeUploader
                      onUploadComplete={(resumeId) => {
                        console.log('Resume uploaded:', resumeId);
                      }}
                      showOptions={true}
                    />
                  </CardContent>
                </Card>

                {parsedResume && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <p className="text-gray-900">{parsedResume.personal_info.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{parsedResume.personal_info.email}</p>
                      </div>
                      {parsedResume.personal_info.location && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Location</label>
                          <p className="text-gray-900">{parsedResume.personal_info.location}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                {parsedResume && (
                  <>
                    <SkillsTagger
                      skills={parsedResume.skills}
                      onSkillsChange={updateSkills}
                      isEditable={true}
                      showConfidence={true}
                    />

                    <Card>
                      <CardHeader>
                        <CardTitle>Work Experience</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {parsedResume.work_experience.map((job, index) => (
                            <div key={job.id} className="border-l-2 border-purple-200 pl-4 pb-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">{job.position}</h4>
                                  <p className="text-purple-600 font-medium">{job.company}</p>
                                  <p className="text-sm text-gray-600">
                                    {job.start_date} - {job.is_current ? 'Present' : job.end_date}
                                  </p>
                                  {job.location && (
                                    <p className="text-sm text-gray-500">{job.location}</p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-gray-500">
                                    {Math.round(job.confidence_score * 100)}% confidence
                                  </div>
                                </div>
                              </div>
                              
                              {job.description && (
                                <p className="text-gray-700 text-sm mt-2">{job.description}</p>
                              )}
                              
                              {job.achievements.length > 0 && (
                                <div className="mt-2">
                                  <h5 className="text-xs font-medium text-gray-700 mb-1">Key Achievements:</h5>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    {job.achievements.map((achievement, i) => (
                                      <li key={i} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>{achievement}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-6">
            <BulkResumeUploader
              onUploadComplete={(results) => {
                console.log('Bulk upload completed:', results);
              }}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ResumeParser;
