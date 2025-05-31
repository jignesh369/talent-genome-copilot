
import { useState, useCallback } from 'react';
import { ResumeParserService } from '@/services/resumeParserService';
import { ParsedResume, ResumeUploadStatus, ParsingOptions } from '@/types/resume-parser';
import { useToast } from '@/hooks/use-toast';

export const useResumeParser = () => {
  const [uploadStatus, setUploadStatus] = useState<ResumeUploadStatus | null>(null);
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const uploadResume = useCallback(async (file: File, options?: ParsingOptions) => {
    try {
      setIsUploading(true);
      setUploadStatus({
        file_id: `temp_${Date.now()}`,
        filename: file.name,
        size: file.size,
        status: 'uploading',
        progress: 0
      });

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadStatus(prev => {
          if (prev && prev.progress < 90) {
            return { ...prev, progress: prev.progress + 10 };
          }
          return prev;
        });
      }, 200);

      const result = await ResumeParserService.uploadResume(file, options);
      
      clearInterval(progressInterval);
      setUploadStatus(result);
      
      if (result.parsed_resume) {
        setParsedResume(result.parsed_resume);
        toast({
          title: "Resume Parsed Successfully",
          description: `Extracted ${result.parsed_resume.skills.length} skills and ${result.parsed_resume.work_experience.length} work experiences.`,
        });
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload and parse resume. Please try again.",
        variant: "destructive",
      });
      setUploadStatus(prev => prev ? { ...prev, status: 'failed', error_message: 'Upload failed' } : null);
    } finally {
      setIsUploading(false);
    }
  }, [toast]);

  const updateSkills = useCallback(async (skills: any[]) => {
    if (!parsedResume) return;
    
    try {
      setIsProcessing(true);
      const updatedResume = await ResumeParserService.updateSkills(parsedResume.id, skills);
      setParsedResume(updatedResume);
      toast({
        title: "Skills Updated",
        description: "Your skills have been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating skills:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update skills. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [parsedResume, toast]);

  const updateWorkExperience = useCallback(async (experience: any[]) => {
    if (!parsedResume) return;
    
    try {
      setIsProcessing(true);
      const updatedResume = await ResumeParserService.updateWorkExperience(parsedResume.id, experience);
      setParsedResume(updatedResume);
      toast({
        title: "Experience Updated",
        description: "Your work experience has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating experience:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update work experience. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [parsedResume, toast]);

  const resetParser = useCallback(() => {
    setUploadStatus(null);
    setParsedResume(null);
    setIsUploading(false);
    setIsProcessing(false);
  }, []);

  return {
    uploadStatus,
    parsedResume,
    isUploading,
    isProcessing,
    uploadResume,
    updateSkills,
    updateWorkExperience,
    resetParser
  };
};
