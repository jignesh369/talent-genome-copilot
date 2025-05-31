
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, X, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { useBulkUpload } from '@/hooks/useBulkUpload';
import { ParsingOptions, ResumeUploadStatus } from '@/types/resume-parser';

interface BulkResumeUploaderProps {
  onUploadComplete?: (results: any) => void;
  className?: string;
}

const BulkResumeUploader: React.FC<BulkResumeUploaderProps> = ({
  onUploadComplete,
  className = ""
}) => {
  const { uploadResult, isUploading, progress, bulkUploadResumes, resetBulkUpload } = useBulkUpload();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [options] = useState<ParsingOptions>({
    auto_detect_skills: true,
    extract_achievements: true,
    analyze_career_progression: true,
    confidence_threshold: 0.7
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024 // 10MB per file
  });

  const handleStartUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    await bulkUploadResumes(selectedFiles, options);
    if (uploadResult) {
      onUploadComplete?.(uploadResult);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const getStatusIcon = (status: ResumeUploadStatus['status']) => {
    switch (status) {
      case 'uploading':
      case 'parsing':
        return <FileText className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Bulk Resume Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!uploadResult && (
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
                ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                ${isUploading ? 'pointer-events-none opacity-75' : ''}
              `}
            >
              <input {...getInputProps()} />
              
              <div className="flex flex-col items-center space-y-3">
                <Upload className="h-8 w-8 text-gray-400" />
                <div className="space-y-1">
                  <p className="text-lg font-medium text-gray-900">
                    Drop multiple resumes here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Upload multiple PDF, DOC, or DOCX files
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedFiles.length > 0 && !uploadResult && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Selected Files ({selectedFiles.length})</h4>
                <Button
                  onClick={handleStartUpload}
                  disabled={isUploading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  {isUploading ? 'Processing...' : 'Start Upload'}
                </Button>
              </div>
              
              <div className="max-h-48 overflow-y-auto space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm truncate">{file.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {(file.size / 1024 / 1024).toFixed(1)}MB
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isUploading && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Processing resumes...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {uploadResult && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{uploadResult.total_files}</div>
                  <div className="text-xs text-blue-600">Total</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{uploadResult.successful}</div>
                  <div className="text-xs text-green-600">Successful</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{uploadResult.failed}</div>
                  <div className="text-xs text-red-600">Failed</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{uploadResult.processing}</div>
                  <div className="text-xs text-yellow-600">Processing</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Upload Results</h4>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {uploadResult.results.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(result.status)}
                        <span className="truncate">{result.filename}</span>
                      </div>
                      <Badge 
                        variant={result.status === 'completed' ? 'default' : result.status === 'failed' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {result.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    resetBulkUpload();
                    setSelectedFiles([]);
                  }}
                >
                  Upload More Resumes
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkResumeUploader;
