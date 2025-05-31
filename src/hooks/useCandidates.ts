
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

// Updated types to match database schema
export interface CandidateEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_year: number;
  end_year: number | null;
}

export interface CandidateNote {
  id: string;
  content: string;
  author: string;
  created_at: string;
}

export interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  location: string;
  current_title: string | null;
  current_company: string | null;
  experience_years: number;
  skills: string[];
  education: CandidateEducation[];
  score: number;
  status: 'new' | 'screening' | 'interviewing' | 'offer' | 'hired' | 'rejected';
  source: 'direct' | 'referral' | 'job_board' | 'linkedin' | 'agency' | 'other';
  resume_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  avatar_url: string | null;
  notes: CandidateNote[];
  applications: any[];
  interviews: any[];
  created_at: string;
  updated_at: string;
}

export interface CandidateSearch {
  query?: string;
  skills?: string[];
  status?: string;
  experience_min?: number;
  experience_max?: number;
  sort_by?: 'score' | 'date' | 'name';
  sort_order?: 'asc' | 'desc';
}

export const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { organizationId } = useAuth();
  const { toast } = useToast();

  // Fetch candidates from database
  const fetchCandidates = async () => {
    if (!organizationId) return;
    
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('candidates')
        .select(`
          *,
          education (*),
          candidate_skills (
            skill_id,
            proficiency_level,
            skills (name)
          ),
          notes (
            id,
            content,
            author_name,
            created_at
          ),
          applications (
            id,
            status,
            jobs (title)
          )
        `)
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Transform data to match expected interface
      const transformedCandidates: Candidate[] = data?.map(candidate => ({
        ...candidate,
        skills: candidate.candidate_skills?.map((cs: any) => cs.skills.name) || [],
        notes: candidate.notes?.map((note: any) => ({
          id: note.id,
          content: note.content,
          author: note.author_name,
          created_at: note.created_at
        })) || [],
        interviews: [], // Will be populated from applications if needed
      })) || [];

      setCandidates(transformedCandidates);
      setFilteredCandidates(transformedCandidates);
    } catch (err: any) {
      console.error('Error fetching candidates:', err);
      setError(err.message);
      toast({
        title: 'Error loading candidates',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (organizationId) {
      fetchCandidates();
    }
  }, [organizationId]);

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

  const createCandidate = async (candidateData: Partial<Candidate>) => {
    if (!organizationId) {
      toast({
        title: 'Error',
        description: 'Organization not found',
        variant: 'destructive',
      });
      return null;
    }

    try {
      setError(null);

      const newCandidateData = {
        first_name: candidateData.first_name || '',
        last_name: candidateData.last_name || '',
        email: candidateData.email || '',
        phone: candidateData.phone || null,
        location: candidateData.location || '',
        current_title: candidateData.current_title || null,
        current_company: candidateData.current_company || null,
        experience_years: candidateData.experience_years || 0,
        score: candidateData.score || 0,
        status: candidateData.status || 'new' as const,
        source: candidateData.source || 'direct' as const,
        resume_url: candidateData.resume_url || null,
        linkedin_url: candidateData.linkedin_url || null,
        portfolio_url: candidateData.portfolio_url || null,
        avatar_url: candidateData.avatar_url || null,
        organization_id: organizationId,
      };

      const { data, error: createError } = await supabase
        .from('candidates')
        .insert(newCandidateData)
        .select()
        .single();

      if (createError) throw createError;

      const newCandidate: Candidate = {
        ...data,
        skills: [],
        education: [],
        notes: [],
        applications: [],
        interviews: [],
      };

      setCandidates(prev => [newCandidate, ...prev]);
      setFilteredCandidates(prev => [newCandidate, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Candidate created successfully',
      });

      return newCandidate;
    } catch (err: any) {
      console.error('Error creating candidate:', err);
      setError(err.message);
      toast({
        title: 'Error creating candidate',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateCandidate = async (candidateId: string, updates: Partial<Candidate>) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('candidates')
        .update(updates)
        .eq('id', candidateId)
        .select()
        .single();

      if (updateError) throw updateError;

      const updateCandidates = (candidates: Candidate[]) =>
        candidates.map(candidate =>
          candidate.id === candidateId
            ? { ...candidate, ...data, updated_at: new Date().toISOString() }
            : candidate
        );

      setCandidates(updateCandidates);
      setFilteredCandidates(updateCandidates);

      toast({
        title: 'Success',
        description: 'Candidate updated successfully',
      });

      return data;
    } catch (err: any) {
      console.error('Error updating candidate:', err);
      setError(err.message);
      toast({
        title: 'Error updating candidate',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const addNote = async (candidateId: string, content: string) => {
    try {
      setError(null);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const { data: profileData } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', userData.user.id)
        .single();

      const authorName = profileData 
        ? `${profileData.first_name} ${profileData.last_name}`
        : userData.user.email || 'Unknown User';

      const { data, error: noteError } = await supabase
        .from('notes')
        .insert({
          candidate_id: candidateId,
          content,
          author_id: userData.user.id,
          author_name: authorName
        })
        .select()
        .single();

      if (noteError) throw noteError;

      const newNote: CandidateNote = {
        id: data.id,
        content: data.content,
        author: data.author_name,
        created_at: data.created_at
      };

      const updateCandidateNotes = (candidates: Candidate[]) =>
        candidates.map(candidate =>
          candidate.id === candidateId
            ? { ...candidate, notes: [...candidate.notes, newNote] }
            : candidate
        );

      setCandidates(updateCandidateNotes);
      setFilteredCandidates(updateCandidateNotes);

      toast({
        title: 'Success',
        description: 'Note added successfully',
      });

      return newNote;
    } catch (err: any) {
      console.error('Error adding note:', err);
      setError(err.message);
      toast({
        title: 'Error adding note',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  return {
    candidates: filteredCandidates,
    allCandidates: candidates,
    loading,
    error,
    searchCandidates,
    createCandidate,
    updateCandidate,
    addNote,
    refetch: fetchCandidates,
  };
};
