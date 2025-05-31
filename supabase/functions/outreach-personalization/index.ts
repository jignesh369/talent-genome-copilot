
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OutreachRequest {
  candidate_id: string;
  job_id?: string;
  message_type: 'initial_outreach' | 'follow_up' | 'interview_invitation' | 'assessment_request';
  channel: 'email' | 'linkedin' | 'phone_script';
  custom_context?: Record<string, string>;
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

    const { candidate_id, job_id, message_type, channel, custom_context = {} }: OutreachRequest = await req.json()

    // Fetch candidate data with insights
    const { data: candidate, error: candidateError } = await supabaseClient
      .from('candidates')
      .select(`
        *,
        candidate_insights (*),
        candidate_osint_profiles (*)
      `)
      .eq('id', candidate_id)
      .single()

    if (candidateError) {
      throw candidateError
    }

    // Fetch job data if provided
    let jobData = null
    if (job_id) {
      const { data: job, error: jobError } = await supabaseClient
        .from('jobs')
        .select('*')
        .eq('id', job_id)
        .single()

      if (!jobError) {
        jobData = job
      }
    }

    // Create personalized message using AI
    const personalizationPrompt = `
      Create a highly personalized ${message_type} message for ${channel}.
      
      Candidate Profile:
      - Name: ${candidate.first_name} ${candidate.last_name}
      - Current Role: ${candidate.current_title} at ${candidate.current_company}
      - Experience: ${candidate.experience_years} years
      - Skills: ${candidate.skills.join(', ')}
      - Bio: ${candidate.bio || 'Not provided'}
      - AI Insights: ${candidate.candidate_insights?.[0]?.ai_summary || 'Not available'}
      
      ${jobData ? `Job Opportunity:
      - Title: ${jobData.title}
      - Company: ${jobData.department}
      - Requirements: ${jobData.requirements.join(', ')}
      - Skills: ${jobData.skills.join(', ')}` : ''}
      
      ${Object.keys(custom_context).length > 0 ? `Additional Context: ${JSON.stringify(custom_context)}` : ''}
      
      Requirements:
      - Professional and engaging tone
      - Highlight specific achievements or skills from their profile
      - Make it feel personal, not templated
      - Include clear call-to-action
      - Keep it concise (max 200 words for email, 150 for LinkedIn)
      
      ${channel === 'phone_script' ? 'Format as a phone conversation script with talking points.' : channel === 'linkedin' ? 'Format for LinkedIn InMail with subject line.' : 'Format as professional email with subject line.'}
    `

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
            content: 'You are an expert recruiter and copywriter. Create compelling, personalized outreach messages that feel authentic and drive engagement.'
          },
          {
            role: 'user',
            content: personalizationPrompt
          }
        ],
        temperature: 0.8,
      }),
    })

    const aiResponse = await openaiResponse.json()
    const personalizedMessage = aiResponse.choices?.[0]?.message?.content

    // Calculate personalization quality score
    const qualityScore = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'Rate the personalization quality of this outreach message on a scale of 0-100. Consider relevance, authenticity, and engagement potential.'
          },
          {
            role: 'user',
            content: `Message: ${personalizedMessage}\n\nCandidate context: ${candidate.first_name} works as ${candidate.current_title} with skills in ${candidate.skills.join(', ')}\n\nRate this message (respond with only a number 0-100):`
          }
        ],
        temperature: 0.1,
      }),
    })

    const qualityResponse = await qualityScore.json()
    const score = parseInt(qualityResponse.choices?.[0]?.message?.content || '75')

    // Store outreach message for tracking
    await supabaseClient
      .from('outreach_messages')
      .insert({
        candidate_id,
        step_number: 1,
        channel,
        subject: personalizedMessage.includes('Subject:') ? 
          personalizedMessage.split('Subject:')[1]?.split('\n')[0]?.trim() : 
          `Exciting opportunity for ${candidate.first_name}`,
        content: personalizedMessage,
        status: 'draft',
        tracking_data: {
          personalization_score: score,
          ai_generated: true,
          context_used: custom_context
        }
      })

    return new Response(
      JSON.stringify({
        success: true,
        personalized_message: personalizedMessage,
        personalization_score: score,
        candidate_insights: candidate.candidate_insights?.[0],
        recommended_send_time: 'Tuesday-Thursday, 10-11 AM',
        channel_optimization: {
          email: score,
          linkedin: Math.max(score - 10, 0),
          phone: Math.max(score - 5, 0)
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Outreach personalization error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
