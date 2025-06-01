
import { supabase } from '@/integrations/supabase/client';

export const enhancedCandidateService = {
  async populateDummyData() {
    console.log('Populating enhanced candidates with dummy data...');
    
    const dummyCandidates = [
      {
        name: "Sarah Chen",
        handle: "sarahc_dev",
        email: "sarah.chen@email.com",
        location: "San Francisco, CA",
        current_title: "Senior React Developer",
        current_company: "TechCorp",
        experience_years: 5,
        bio: "Passionate React developer with expertise in TypeScript, Node.js, and AWS. Love building scalable web applications.",
        skills: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL", "GraphQL"],
        ai_summary: "High-performing frontend developer with strong full-stack capabilities. Excellent track record in scaling applications.",
        technical_depth_score: 8.5,
        community_influence_score: 7.2,
        learning_velocity_score: 9.1,
        availability_status: "passive" as const,
        salary_expectation_min: 120000,
        salary_expectation_max: 150000,
        salary_currency: "USD",
        preferred_contact_method: "email" as const
      },
      {
        name: "Marcus Johnson",
        handle: "mjohnson_ai",
        email: "marcus.johnson@email.com",
        location: "Austin, TX",
        current_title: "Machine Learning Engineer",
        current_company: "DataFlow Inc",
        experience_years: 7,
        bio: "ML engineer specializing in NLP and computer vision. PhD in Computer Science with focus on deep learning.",
        skills: ["Python", "TensorFlow", "PyTorch", "Kubernetes", "Docker", "MLOps", "AWS"],
        ai_summary: "Expert ML engineer with strong research background. Proven ability to deploy production ML systems at scale.",
        technical_depth_score: 9.2,
        community_influence_score: 8.7,
        learning_velocity_score: 8.9,
        availability_status: "active" as const,
        salary_expectation_min: 140000,
        salary_expectation_max: 180000,
        salary_currency: "USD",
        preferred_contact_method: "linkedin" as const
      },
      {
        name: "Emily Rodriguez",
        handle: "emily_fullstack",
        email: "emily.rodriguez@email.com",
        location: "New York, NY",
        current_title: "Full Stack Developer",
        current_company: "StartupXYZ",
        experience_years: 4,
        bio: "Full-stack developer with experience in React, Node.js, and cloud infrastructure. Enjoys working in fast-paced startup environments.",
        skills: ["React", "Node.js", "Python", "MongoDB", "Redis", "Docker", "GCP"],
        ai_summary: "Versatile full-stack developer with startup experience. Strong problem-solving skills and adaptability.",
        technical_depth_score: 7.8,
        community_influence_score: 6.9,
        learning_velocity_score: 8.5,
        availability_status: "passive" as const,
        salary_expectation_min: 110000,
        salary_expectation_max: 140000,
        salary_currency: "USD",
        preferred_contact_method: "email" as const
      },
      {
        name: "David Kim",
        handle: "dkim_backend",
        email: "david.kim@email.com",
        location: "Seattle, WA",
        current_title: "Backend Architect",
        current_company: "CloudTech Solutions",
        experience_years: 8,
        bio: "Backend architect with expertise in microservices, distributed systems, and high-performance computing.",
        skills: ["Java", "Spring", "Kafka", "Redis", "PostgreSQL", "Kubernetes", "AWS"],
        ai_summary: "Senior backend architect with deep expertise in distributed systems. Strong leadership and mentoring capabilities.",
        technical_depth_score: 9.0,
        community_influence_score: 8.1,
        learning_velocity_score: 7.8,
        availability_status: "passive" as const,
        salary_expectation_min: 150000,
        salary_expectation_max: 190000,
        salary_currency: "USD",
        preferred_contact_method: "linkedin" as const
      },
      {
        name: "Lisa Wang",
        handle: "lisa_devops",
        email: "lisa.wang@email.com",
        location: "Los Angeles, CA",
        current_title: "DevOps Engineer",
        current_company: "ScaleUp Technologies",
        experience_years: 6,
        bio: "DevOps engineer passionate about automation, infrastructure as code, and CI/CD pipelines.",
        skills: ["Terraform", "Kubernetes", "Docker", "Jenkins", "Prometheus", "Grafana", "AWS"],
        ai_summary: "Expert DevOps engineer with strong automation and monitoring skills. Experienced in scaling infrastructure for high-growth companies.",
        technical_depth_score: 8.7,
        community_influence_score: 7.5,
        learning_velocity_score: 8.3,
        availability_status: "active" as const,
        salary_expectation_min: 125000,
        salary_expectation_max: 160000,
        salary_currency: "USD",
        preferred_contact_method: "email" as const
      }
    ];

    try {
      // Insert candidates one by one
      const insertedCandidates = [];
      for (const candidate of dummyCandidates) {
        const { data, error } = await supabase
          .from('enhanced_candidates')
          .insert(candidate)
          .select()
          .single();

        if (error) throw error;
        insertedCandidates.push(data);
      }

      console.log('Dummy candidates created:', insertedCandidates);

      // Add OSINT data for each candidate
      if (insertedCandidates.length > 0) {
        const osintData = insertedCandidates.map(candidate => ({
          candidate_id: candidate.id,
          overall_score: Math.random() * 3 + 7, // 7-10 range
          influence_score: Math.random() * 3 + 6, // 6-9 range
          technical_depth: Math.random() * 3 + 7, // 7-10 range
          community_engagement: Math.random() * 3 + 6, // 6-9 range
          github_username: candidate.handle?.replace('_', ''),
          github_stars: Math.floor(Math.random() * 1000) + 100,
          github_commits: Math.floor(Math.random() * 2000) + 500,
          github_repos: Math.floor(Math.random() * 50) + 10,
          linkedin_connections: Math.floor(Math.random() * 1000) + 500,
          stackoverflow_reputation: Math.floor(Math.random() * 10000) + 1000,
          twitter_followers: Math.floor(Math.random() * 5000) + 100,
          availability_signals: [
            { platform: 'github', last_activity: '2024-01-15', frequency: 'high' },
            { platform: 'linkedin', last_activity: '2024-01-10', frequency: 'medium' }
          ]
        }));

        await supabase.from('osint_profiles').insert(osintData);

        // Add career trajectories
        const careerData = insertedCandidates.map(candidate => ({
          candidate_id: candidate.id,
          progression_type: 'ascending' as const,
          growth_rate: Math.random() * 3 + 2, // 2-5 range
          stability_score: Math.random() * 3 + 7, // 7-10 range
          next_likely_move: `Senior ${candidate.current_title?.replace('Senior ', '')}`,
          timeline_events: [
            { year: 2022, role: candidate.current_title, company: candidate.current_company },
            { year: 2020, role: 'Developer', company: 'Previous Company' }
          ]
        }));

        await supabase.from('career_trajectories').insert(careerData);

        console.log('OSINT and career data added successfully');
      }

      return insertedCandidates;
    } catch (error) {
      console.error('Error creating dummy candidates:', error);
      throw error;
    }
  },

  async getCandidateInsights(candidateId: string) {
    const { data, error } = await supabase
      .from('enhanced_candidates')
      .select(`
        *,
        osint_profiles(*),
        career_trajectories(*),
        cultural_fit_indicators(*)
      `)
      .eq('id', candidateId)
      .single();

    if (error) throw error;
    return data;
  }
};
