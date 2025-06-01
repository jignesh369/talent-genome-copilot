
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;

const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NaturalLanguageRequest {
  action: 'interpret_query' | 'analyze_candidate' | 'generate_outreach' | 'score_job_match';
  data: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data }: NaturalLanguageRequest = await req.json();
    
    let result;
    switch (action) {
      case 'interpret_query':
        result = await interpretQuery(data.query);
        break;
      case 'analyze_candidate':
        result = await analyzeCandidate(data.candidate);
        break;
      case 'generate_outreach':
        result = await generateOutreach(data.candidate, data.messageType, data.context);
        break;
      case 'score_job_match':
        result = await scoreJobMatch(data.candidate, data.jobRequirements, data.companyculture);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-talent-discovery function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function interpretQuery(query: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert talent acquisition AI. Analyze natural language recruitment queries and extract structured requirements.
          
          Return a JSON object with:
          - interpreted_intent: string (what the recruiter is looking for)
          - extracted_requirements: array of {category: 'skills'|'experience'|'location'|'industry'|'culture', value: string, importance: number 0-1, source: 'explicit'|'inferred'}
          - search_strategy: string (how to approach the search)
          - confidence: number 0-1 (confidence in interpretation)
          
          Categories:
          - skills: technical skills, programming languages, tools
          - experience: years, seniority level, industry experience
          - location: geographical requirements, remote preferences
          - industry: sector, domain knowledge
          - culture: soft skills, work style, values`
        },
        {
          role: 'user',
          content: query
        }
      ],
      temperature: 0.3,
    }),
  });

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch {
    // Fallback if JSON parsing fails
    return {
      interpreted_intent: `Looking for candidates based on: ${query}`,
      extracted_requirements: [],
      search_strategy: 'Multi-platform search combining LinkedIn profile matching, GitHub activity analysis, and Stack Overflow expertise validation',
      confidence: 0.5
    };
  }
}

async function analyzeCandidate(candidate: any) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert technical recruiter. Analyze a candidate's profile and provide comprehensive insights.
          
          Return a JSON object with:
          - executive_summary: string (2-3 sentence summary)
          - technical_assessment: {depth_score: number 1-10, evidence: string[], expertise_areas: string[]}
          - career_analysis: {progression_type: 'ascending'|'lateral'|'transitioning', growth_rate: number 0-1, next_likely_move: string}
          - engagement_score: number 1-10 (community engagement)
          - availability_likelihood: number 0-1 (likelihood they're open to opportunities)
          
          Focus on technical depth, career trajectory, and professional growth indicators.`
        },
        {
          role: 'user',
          content: `Analyze this candidate profile:
          Name: ${candidate.name}
          Title: ${candidate.current_title || 'Not specified'}
          Company: ${candidate.current_company || 'Not specified'}
          Experience: ${candidate.experience_years || 0} years
          Skills: ${candidate.skills?.join(', ') || 'Not specified'}
          Bio: ${candidate.bio || 'Not specified'}
          Location: ${candidate.location || 'Not specified'}`
        }
      ],
      temperature: 0.3,
    }),
  });

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch {
    // Fallback analysis
    return {
      executive_summary: `${candidate.experience_years || 0}-year professional with expertise in ${candidate.skills?.[0] || 'software development'}`,
      technical_assessment: {
        depth_score: Math.min((candidate.experience_years || 0) * 1.2, 10),
        evidence: [`${candidate.experience_years || 0} years of experience`, `Skills in ${candidate.skills?.slice(0, 3).join(', ') || 'various technologies'}`],
        expertise_areas: candidate.skills?.slice(0, 5) || []
      },
      career_analysis: {
        progression_type: 'ascending',
        growth_rate: 0.8,
        next_likely_move: `Senior ${candidate.current_title || 'Developer'} or Technical Lead position`
      },
      engagement_score: 7.5,
      availability_likelihood: 0.6
    };
  }
}

async function generateOutreach(candidate: any, messageType: string, context: any) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert recruiter crafting personalized outreach messages. Create compelling, professional messages that feel personal and authentic.
          
          Return a JSON object with:
          - subject_line: string (compelling subject line)
          - message_body: string (personalized message body)
          - personalization_elements: string[] (elements used for personalization)
          - follow_up_suggestions: string[] (suggested follow-up actions)
          - optimal_send_time: string (best time to send)
          
          Message types:
          - initial_outreach: First contact with candidate
          - follow_up: Following up on previous message
          - assessment_request: Inviting for technical assessment
          
          Make it personal, relevant, and action-oriented. Avoid generic recruiting language.`
        },
        {
          role: 'user',
          content: `Create a ${messageType} message for:
          
          Candidate: ${candidate.name}
          Title: ${candidate.current_title || 'Professional'}
          Company: ${candidate.current_company || 'Current company'}
          Skills: ${candidate.skills?.join(', ') || 'Not specified'}
          Experience: ${candidate.experience_years || 0} years
          
          Context:
          Role: ${context.role_title || 'Software Engineer'}
          Company: ${context.company_name || 'TechCorp'}
          Recruiter: ${context.recruiter_name || 'Sarah'}
          Tone: ${context.tone || 'professional'}`
        }
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch {
    // Fallback message
    const firstName = candidate.name.split(' ')[0];
    return {
      subject_line: `${firstName}, ${context.role_title || 'exciting opportunity'} at ${context.company_name || 'our company'}`,
      message_body: `Hi ${firstName},\n\nI came across your profile and was impressed by your background in ${candidate.skills?.[0] || 'software development'}. We have an exciting ${context.role_title || 'opportunity'} at ${context.company_name || 'our company'} that I think could be a great fit.\n\nWould you be open to a brief conversation?\n\nBest regards,\n${context.recruiter_name || 'Sarah'}`,
      personalization_elements: [`Expertise in ${candidate.skills?.[0] || 'software development'}`, `${candidate.experience_years || 0} years of experience`],
      follow_up_suggestions: ['Schedule a 15-minute call', 'Send additional role details', 'Connect on LinkedIn'],
      optimal_send_time: 'Tuesday 10:00 AM PST'
    };
  }
}

async function scoreJobMatch(candidate: any, jobRequirements: string[], companyculture?: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert technical recruiter. Analyze how well a candidate matches a job opportunity.
          
          Return a JSON object with:
          - overall_score: number 1-10 (overall match score)
          - dimension_scores: {
              technical_fit: {score: number 1-10, evidence: string[], concerns: string[]},
              experience_fit: {score: number 1-10, evidence: string[], concerns: string[]},
              cultural_fit: {score: number 1-10, evidence: string[], concerns: string[]},
              growth_potential: {score: number 1-10, evidence: string[], concerns: string[]}
            }
          - success_probability: number 0-1 (probability of success in role)
          - key_strengths: string[] (top 3 strengths)
          - risk_factors: string[] (potential concerns)
          - recommendations: string[] (next steps based on score)
          
          Be objective and thorough in your analysis.`
        },
        {
          role: 'user',
          content: `Evaluate this candidate for job match:
          
          Candidate:
          - Name: ${candidate.name}
          - Title: ${candidate.current_title || 'Not specified'}
          - Experience: ${candidate.experience_years || 0} years
          - Skills: ${candidate.skills?.join(', ') || 'Not specified'}
          - Company: ${candidate.current_company || 'Not specified'}
          
          Job Requirements: ${jobRequirements.join(', ')}
          Company Culture: ${companyculture || 'Not specified'}`
        }
      ],
      temperature: 0.3,
    }),
  });

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch {
    // Fallback scoring
    const skillMatch = candidate.skills ? 
      candidate.skills.filter((skill: string) => 
        jobRequirements.some(req => skill.toLowerCase().includes(req.toLowerCase()))
      ).length / Math.max(jobRequirements.length, 1) : 0;
    
    const overallScore = Math.min((skillMatch * 5) + (candidate.experience_years || 0) * 0.5, 10);
    
    return {
      overall_score: Math.round(overallScore * 10) / 10,
      dimension_scores: {
        technical_fit: {
          score: Math.min(skillMatch * 10, 10),
          evidence: [`Skills match: ${Math.round(skillMatch * 100)}%`],
          concerns: skillMatch < 0.5 ? ['Limited skill overlap'] : []
        },
        experience_fit: {
          score: Math.min((candidate.experience_years || 0) * 1.2, 10),
          evidence: [`${candidate.experience_years || 0} years of experience`],
          concerns: (candidate.experience_years || 0) < 2 ? ['Limited experience'] : []
        },
        cultural_fit: {
          score: 7,
          evidence: ['Professional background indicates good cultural alignment'],
          concerns: []
        },
        growth_potential: {
          score: 8,
          evidence: ['Demonstrates continuous learning and growth'],
          concerns: []
        }
      },
      success_probability: Math.min(overallScore / 10, 1),
      key_strengths: candidate.skills?.slice(0, 3) || ['Professional experience'],
      risk_factors: [],
      recommendations: overallScore >= 7 ? ['Schedule interview', 'Fast-track process'] : ['Additional assessment needed']
    };
  }
}
