
import { useState, useCallback } from 'react';
import { ResumeParserService } from '@/services/resumeParserService';
import { BulkUploadResult, ParsingOptions } from '@/types/resume-parser';
import { useToast } from '@/hooks/use-toast';

export const useBulkUpload = () => {
  const [uploadResult, setUploadResult] = useState<BulkUploadResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const bulkUploadResumes = useCallback(async (files: File[], options?: ParsingOptions) => {
    try {
      setIsUploading(true);
      setProgress(0);
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 90) {
            return prev + 5;
          }
          return prev;
        });
      }, 300);

      const result = await ResumeParserService.bulkUploadResumes(files, options);
      
      clearInterval(progressInterval);
      setProgress(100);
      setUploadResult(result);
      
      toast({
        title: "Bulk Upload Complete",
        description: `Successfully processed ${result.successful}/${result.total_files} resumes.`,
      });
    } catch (error) {
      console.error('Error in bulk upload:', error);
      toast({
        title: "Bulk Upload Failed",
        description: "Failed to process resumes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [toast]);

  const resetBulkUpload = useCallback(() => {
    setUploadResult(null);
    setIsUploading(false);
    setProgress(0);
  }, []);

  return {
    uploadResult,
    isUploading,
    progress,
    bulkUploadResumes,
    resetBulkUpload
  };
};
