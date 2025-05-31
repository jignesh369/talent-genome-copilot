
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useResumeParser } from '@/hooks/useResumeParser';
import { ParsingOptions } from '@/types/resume-parser';

interface ResumeUploaderProps {
  onUploadComplete?: (resumeId: string) => void;
  onFileSelected?: (file: File) => void;
  className?: string;
  showOptions?: boolean;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onUploadComplete,
  onFileSelected,
  className = "",
  showOptions = true
}) => {
  const { uploadStatus, isUploading, uploadResume, resetParser } = useResumeParser();
  const [options, setOptions] = useState<ParsingOptions>({
    auto_detect_skills: true,
    extract_achievements: true,
    analyze_career_progression: true,
    confidence_threshold: 0.7
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    onFileSelected?.(file);
    await uploadResume(file, options);
    
    if (uploadStatus?.status === 'completed' && uploadStatus.parsed_resume) {
      onUploadComplete?.(uploadStatus.parsed_resume.id);
    }
  }, [uploadResume, options, onFileSelected, onUploadComplete, uploadStatus]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const getStatusIcon = () => {
    if (!uploadStatus) return <Upload className="h-8 w-8 text-gray-400" />;
    
    switch (uploadStatus.status) {
      case 'uploading':
      case 'parsing':
        return <FileText className="h-8 w-8 text-blue-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Upload className="h-8 w-8 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    if (!uploadStatus) return 'Drop your resume here or click to browse';
    
    switch (uploadStatus.status) {
      case 'uploading':
        return 'Uploading resume...';
      case 'parsing':
        return 'Extracting skills and experience...';
      case 'completed':
        return `Successfully parsed ${uploadStatus.filename}`;
      case 'failed':
        return `Failed to process ${uploadStatus.filename}`;
      default:
        return 'Drop your resume here or click to browse';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
              ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              ${isUploading ? 'pointer-events-none opacity-75' : ''}
            `}
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center space-y-4">
              {getStatusIcon()}
              
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  {getStatusText()}
                </p>
                
                {!uploadStatus && (
                  <p className="text-sm text-gray-500">
                    Supports PDF, DOC, and DOCX files up to 10MB
                  </p>
                )}
              </div>
              
              {uploadStatus && (
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate">{uploadStatus.filename}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        resetParser();
                      }}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {(uploadStatus.status === 'uploading' || uploadStatus.status === 'parsing') && (
                    <Progress value={uploadStatus.progress} className="w-full" />
                  )}
                  
                  {uploadStatus.status === 'completed' && uploadStatus.parsed_resume && (
                    <div className="flex flex-wrap gap-1 justify-center">
                      <Badge variant="secondary" className="text-xs">
                        {uploadStatus.parsed_resume.skills.length} skills
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {uploadStatus.parsed_resume.work_experience.length} jobs
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {Math.round(uploadStatus.parsed_resume.confidence_score * 100)}% confidence
                      </Badge>
                    </div>
                  )}
                </div>
              )}
              
              {!uploadStatus && !isUploading && (
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {showOptions && !uploadStatus && (
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-3">Parsing Options</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={options.auto_detect_skills}
                  onChange={(e) => setOptions({...options, auto_detect_skills: e.target.checked})}
                  className="rounded border-gray-300"
                />
                <span>Auto-detect skills</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={options.extract_achievements}
                  onChange={(e) => setOptions({...options, extract_achievements: e.target.checked})}
                  className="rounded border-gray-300"
                />
                <span>Extract achievements</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={options.analyze_career_progression}
                  onChange={(e) => setOptions({...options, analyze_career_progression: e.target.checked})}
                  className="rounded border-gray-300"
                />
                <span>Analyze career progression</span>
              </label>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeUploader;
