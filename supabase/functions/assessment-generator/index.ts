
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AssessmentRequest {
  job_id: string;
  candidate_id?: string;
  job_requirements: string[];
  skills_required: string[];
  experience_level: string;
  assessment_type: 'technical' | 'behavioral' | 'comprehensive';
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

    const { job_id, candidate_id, job_requirements, skills_required, experience_level, assessment_type }: AssessmentRequest = await req.json()

    // Generate dynamic assessment questions using AI
    const questionPrompt = `
      Generate a comprehensive ${assessment_type} assessment for a ${experience_level} level position.
      
      Job Requirements: ${job_requirements.join(', ')}
      Required Skills: ${skills_required.join(', ')}
      
      Create 15 questions covering:
      - Technical knowledge (40%)
      - Problem-solving scenarios (30%)
      - Behavioral questions (20%)
      - Role-specific challenges (10%)
      
      Format as JSON with: { "questions": [{ "id": number, "type": "multiple_choice|scenario|coding", "question": string, "options": string[], "correct_answer": string, "explanation": string, "category": string, "difficulty": "easy|medium|hard", "points": number }] }
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
            content: 'You are an expert assessment designer. Generate high-quality, job-specific assessment questions that accurately evaluate candidate capabilities.'
          },
          {
            role: 'user',
            content: questionPrompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    })

    const aiResponse = await openaiResponse.json()
    const assessmentData = JSON.parse(aiResponse.choices?.[0]?.message?.content || '{"questions": []}')

    // Create assessment template
    const { data: template, error: templateError } = await supabaseClient
      .from('assessment_templates')
      .insert({
        name: `${assessment_type} Assessment - ${new Date().toLocaleDateString()}`,
        description: `AI-generated assessment for job requirements: ${job_requirements.join(', ')}`,
        job_roles: skills_required,
        question_pool: assessmentData,
        scoring_criteria: {
          total_points: assessmentData.questions.reduce((acc: number, q: any) => acc + q.points, 0),
          passing_score: Math.floor(assessmentData.questions.reduce((acc: number, q: any) => acc + q.points, 0) * 0.7),
          categories: {
            technical: assessmentData.questions.filter((q: any) => q.category === 'technical').length,
            behavioral: assessmentData.questions.filter((q: any) => q.category === 'behavioral').length,
            problem_solving: assessmentData.questions.filter((q: any) => q.category === 'problem_solving').length
          }
        },
        time_limit_minutes: 60
      })
      .select()
      .single()

    if (templateError) {
      throw templateError
    }

    // If candidate_id provided, create assessment session
    let sessionData = null
    if (candidate_id) {
      const { data: session, error: sessionError } = await supabaseClient
        .from('assessment_sessions')
        .insert({
          candidate_id,
          job_id,
          template_id: template.id,
          questions: assessmentData.questions,
          status: 'in_progress'
        })
        .select()
        .single()

      if (sessionError) {
        throw sessionError
      }
      sessionData = session
    }

    return new Response(
      JSON.stringify({
        success: true,
        template,
        session: sessionData,
        preview_questions: assessmentData.questions.slice(0, 3) // Preview first 3 questions
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Assessment generation error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
