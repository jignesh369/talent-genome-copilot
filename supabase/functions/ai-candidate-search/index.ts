
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SearchRequest {
  query: string;
  skills?: string[];
  location?: string;
  experience_range?: [number, number];
  job_requirements?: string[];
  organization_id: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { query, skills, location, experience_range, job_requirements, organization_id }: SearchRequest = await req.json()

    // AI-powered candidate search using OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI recruiting assistant. Analyze the search query and extract structured search criteria for finding candidates.'
          },
          {
            role: 'user',
            content: `Search query: "${query}"\nRequired skills: ${skills?.join(', ') || 'none'}\nLocation: ${location || 'any'}\nExperience: ${experience_range ? `${experience_range[0]}-${experience_range[1]} years` : 'any'}\n\nExtract and return structured criteria for database search.`
          }
        ],
        temperature: 0.3,
      }),
    })

    const aiAnalysis = await openaiResponse.json()
    
    // Build dynamic query based on AI analysis
    let candidateQuery = supabaseClient
      .from('candidates')
      .select(`
        *,
        candidate_insights (*),
        candidate_osint_profiles (*),
        applications (
          id,
          job_id,
          status,
          match_score
        )
      `)

    // Apply filters based on search criteria
    if (skills && skills.length > 0) {
      candidateQuery = candidateQuery.overlaps('skills', skills)
    }

    if (location) {
      candidateQuery = candidateQuery.ilike('location', `%${location}%`)
    }

    if (experience_range) {
      candidateQuery = candidateQuery
        .gte('experience_years', experience_range[0])
        .lte('experience_years', experience_range[1])
    }

    const { data: candidates, error: candidatesError } = await candidateQuery

    if (candidatesError) {
      throw candidatesError
    }

    // Calculate AI match scores for each candidate
    const enhancedCandidates = await Promise.all(
      candidates?.map(async (candidate) => {
        const matchScoreResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'Calculate a match score (0-100) for a candidate based on search criteria and job requirements.'
              },
              {
                role: 'user',
                content: `Candidate: ${JSON.stringify({
                  skills: candidate.skills,
                  experience: candidate.experience_years,
                  title: candidate.current_title,
                  bio: candidate.bio
                })}\n\nSearch criteria: ${JSON.stringify({ query, skills, job_requirements })}\n\nReturn only a number between 0-100.`
              }
            ],
            temperature: 0.1,
          }),
        })

        const matchScore = await matchScoreResponse.json()
        const score = parseInt(matchScore.choices?.[0]?.message?.content || '50')

        return {
          ...candidate,
          match_score: score,
          ai_interpretation: aiAnalysis.choices?.[0]?.message?.content
        }
      }) || []
    )

    // Sort by match score
    enhancedCandidates.sort((a, b) => (b.match_score || 0) - (a.match_score || 0))

    // Log search analytics
    await supabaseClient
      .from('analytics_events')
      .insert({
        organization_id,
        event_type: 'candidate_search',
        entity_type: 'search',
        properties: {
          query,
          skills,
          location,
          experience_range,
          results_count: enhancedCandidates.length
        }
      })

    return new Response(
      JSON.stringify({
        candidates: enhancedCandidates,
        total_found: enhancedCandidates.length,
        ai_interpretation: aiAnalysis.choices?.[0]?.message?.content,
        search_quality_score: enhancedCandidates.length > 0 ? 
          enhancedCandidates.reduce((acc, c) => acc + (c.match_score || 0), 0) / enhancedCandidates.length : 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
