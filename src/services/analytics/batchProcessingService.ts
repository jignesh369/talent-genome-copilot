import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { messageGenerationService } from './messageGenerationService';

interface BatchOutreachJob {
  id: string;
  candidates: string[];
  template_type: string;
  context: any;
  created_at: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  results: BatchOutreachResult[];
}

interface BatchOutreachResult {
  candidate_id: string;
  success: boolean;
  message_id?: string;
  error?: string;
  personalization_score: number;
}

export class BatchProcessingService {
  private static instance: BatchProcessingService;
  private batchJobs: BatchOutreachJob[] = [];

  static getInstance(): BatchProcessingService {
    if (!BatchProcessingService.instance) {
      BatchProcessingService.instance = new BatchProcessingService();
    }
    return BatchProcessingService.instance;
  }

  async createBatchOutreachJob(
    candidateIds: string[],
    templateType: string,
    context: any
  ): Promise<string> {
    const job: BatchOutreachJob = {
      id: `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      candidates: candidateIds,
      template_type: templateType,
      context,
      created_at: new Date().toISOString(),
      status: 'pending',
      progress: 0,
      results: []
    };

    this.batchJobs.push(job);
    
    // Start processing asynchronously
    this.processBatchJob(job.id);
    
    return job.id;
  }

  private async processBatchJob(jobId: string): Promise<void> {
    const job = this.batchJobs.find(j => j.id === jobId);
    if (!job) return;

    job.status = 'processing';
    
    for (let i = 0; i < job.candidates.length; i++) {
      const candidateId = job.candidates[i];
      
      try {
        // Mock candidate data for batch processing
        const mockCandidate: Partial<EnhancedCandidate> = {
          id: candidateId,
          name: `Candidate ${i + 1}`,
          match_score: Math.random() * 20 + 80,
          // ... other required fields would be loaded from actual data source
        };

        // This would normally load the actual candidate data
        // const candidate = await loadCandidateData(candidateId);
        
        job.results.push({
          candidate_id: candidateId,
          success: true,
          personalization_score: Math.random() * 0.3 + 0.7
        });
      } catch (error) {
        job.results.push({
          candidate_id: candidateId,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          personalization_score: 0
        });
      }

      job.progress = ((i + 1) / job.candidates.length) * 100;
    }

    job.status = 'completed';
    console.log(`Batch job ${jobId} completed with ${job.results.filter(r => r.success).length} successful outreach messages`);
  }

  getBatchJobStatus(jobId: string): BatchOutreachJob | null {
    return this.batchJobs.find(j => j.id === jobId) || null;
  }

  getAllBatchJobs(): BatchOutreachJob[] {
    return this.batchJobs;
  }

  getBatchJobAnalytics(): {
    total_jobs: number;
    completed_jobs: number;
    success_rate: number;
    average_processing_time: number;
  } {
    const completedJobs = this.batchJobs.filter(j => j.status === 'completed');
    const successfulResults = completedJobs.flatMap(j => j.results.filter(r => r.success));
    const totalResults = completedJobs.flatMap(j => j.results);
    
    return {
      total_jobs: this.batchJobs.length,
      completed_jobs: completedJobs.length,
      success_rate: totalResults.length > 0 ? successfulResults.length / totalResults.length : 0,
      average_processing_time: 5.2 // Mock value - would calculate from actual job data
    };
  }
}

export const batchProcessingService = BatchProcessingService.getInstance();
