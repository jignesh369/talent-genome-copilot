
import { useState, useEffect } from 'react';
import { Candidate, CandidateSearch } from '@/types/recruiting';

export const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for candidates
  useEffect(() => {
    const mockCandidates: Candidate[] = [
      {
        id: '1',
        first_name: 'Alex',
        last_name: 'Kumar',
        email: 'alex.kumar@email.com',
        phone: '+1-555-0123',
        location: 'San Francisco, CA',
        current_title: 'Senior Software Engineer',
        current_company: 'TechCorp',
        experience_years: 7,
        skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
        education: [{
          institution: 'Stanford University',
          degree: 'MS',
          field: 'Computer Science',
          start_year: 2015,
          end_year: 2017
        }],
        score: 85,
        status: 'interviewing',
        source: 'linkedin',
        notes: [],
        applications: [],
        interviews: [],
        created_at: '2024-01-10T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        first_name: 'Sarah',
        last_name: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1-555-0124',
        location: 'Austin, TX',
        current_title: 'Product Manager',
        current_company: 'StartupXYZ',
        experience_years: 5,
        skills: ['Product Management', 'Analytics', 'Agile', 'SQL', 'Figma'],
        education: [{
          institution: 'UT Austin',
          degree: 'MBA',
          field: 'Business Administration',
          start_year: 2018,
          end_year: 2020
        }],
        score: 92,
        status: 'offer',
        source: 'referral',
        notes: [],
        applications: [],
        interviews: [],
        created_at: '2024-01-05T10:00:00Z',
        updated_at: '2024-01-20T10:00:00Z'
      }
    ];

    setCandidates(mockCandidates);
    setFilteredCandidates(mockCandidates);
    setLoading(false);
  }, []);

  const searchCandidates = (searchParams: CandidateSearch) => {
    let filtered = [...candidates];

    if (searchParams.query) {
      const query = searchParams.query.toLowerCase();
      filtered = filtered.filter(candidate =>
        candidate.first_name.toLowerCase().includes(query) ||
        candidate.last_name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.current_title?.toLowerCase().includes(query) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    if (searchParams.skills && searchParams.skills.length > 0) {
      filtered = filtered.filter(candidate =>
        searchParams.skills!.some(skill =>
          candidate.skills.some(cSkill => 
            cSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    if (searchParams.status) {
      filtered = filtered.filter(candidate => candidate.status === searchParams.status);
    }

    if (searchParams.experience_min) {
      filtered = filtered.filter(candidate => candidate.experience_years >= searchParams.experience_min!);
    }

    if (searchParams.experience_max) {
      filtered = filtered.filter(candidate => candidate.experience_years <= searchParams.experience_max!);
    }

    // Sort results
    if (searchParams.sort_by) {
      filtered.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (searchParams.sort_by) {
          case 'score':
            aValue = a.score;
            bValue = b.score;
            break;
          case 'date':
            aValue = new Date(a.created_at);
            bValue = new Date(b.created_at);
            break;
          case 'name':
            aValue = `${a.first_name} ${a.last_name}`;
            bValue = `${b.first_name} ${b.last_name}`;
            break;
          default:
            aValue = a.score;
            bValue = b.score;
        }

        if (searchParams.sort_order === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    setFilteredCandidates(filtered);
  };

  const updateCandidate = (candidateId: string, updates: Partial<Candidate>) => {
    setCandidates(prev => prev.map(candidate =>
      candidate.id === candidateId
        ? { ...candidate, ...updates, updated_at: new Date().toISOString() }
        : candidate
    ));
  };

  const addNote = (candidateId: string, content: string) => {
    const note = {
      id: Date.now().toString(),
      content,
      author: 'Current User',
      created_at: new Date().toISOString()
    };

    updateCandidate(candidateId, {
      notes: [...(candidates.find(c => c.id === candidateId)?.notes || []), note]
    });
  };

  return {
    candidates: filteredCandidates,
    allCandidates: candidates,
    loading,
    searchCandidates,
    updateCandidate,
    addNote
  };
};
