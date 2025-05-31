
import { useState, useEffect } from 'react';
import { Job, JobMetrics } from '@/types/recruiting';

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [metrics, setMetrics] = useState<JobMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for jobs
  useEffect(() => {
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'San Francisco, CA',
        type: 'full-time',
        status: 'active',
        priority: 'high',
        description: 'We are looking for a senior frontend developer...',
        requirements: ['5+ years React experience', 'TypeScript proficiency', 'Leadership skills'],
        skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
        experience: '5+ years',
        salary_min: 120000,
        salary_max: 180000,
        remote: true,
        applications_count: 23,
        views: 156,
        posted_date: '2024-01-15',
        closing_date: '2024-02-15',
        hiring_manager: 'Sarah Johnson',
        created_by: 'current-user',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'Product Manager',
        department: 'Product',
        location: 'New York, NY',
        type: 'full-time',
        status: 'active',
        priority: 'medium',
        description: 'Seeking an experienced product manager...',
        requirements: ['3+ years PM experience', 'Technical background', 'Analytics skills'],
        skills: ['Product Management', 'Analytics', 'Roadmapping', 'Agile'],
        experience: '3+ years',
        salary_min: 100000,
        salary_max: 150000,
        remote: false,
        applications_count: 18,
        views: 89,
        posted_date: '2024-01-20',
        hiring_manager: 'Mike Chen',
        created_by: 'current-user',
        created_at: '2024-01-20T10:00:00Z',
        updated_at: '2024-01-20T10:00:00Z'
      }
    ];

    const mockMetrics: JobMetrics = {
      applications_today: 8,
      applications_week: 45,
      applications_month: 156,
      conversion_rate: 3.2,
      avg_time_to_hire: 28,
      quality_score: 8.4
    };

    setJobs(mockJobs);
    setMetrics(mockMetrics);
    setLoading(false);
  }, []);

  const createJob = (jobData: Partial<Job>) => {
    const newJob: Job = {
      id: Date.now().toString(),
      title: jobData.title || '',
      department: jobData.department || '',
      location: jobData.location || '',
      type: jobData.type || 'full-time',
      status: 'draft',
      priority: 'medium',
      description: jobData.description || '',
      requirements: jobData.requirements || [],
      skills: jobData.skills || [],
      experience: jobData.experience || '',
      salary_min: jobData.salary_min,
      salary_max: jobData.salary_max,
      remote: jobData.remote || false,
      applications_count: 0,
      views: 0,
      posted_date: new Date().toISOString().split('T')[0],
      hiring_manager: jobData.hiring_manager || '',
      created_by: 'current-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, ...updates, updated_at: new Date().toISOString() }
        : job
    ));
  };

  const deleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  return {
    jobs,
    metrics,
    loading,
    createJob,
    updateJob,
    deleteJob
  };
};
