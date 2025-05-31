
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DocumentRequest {
  file_path: string;
  entity_type: 'candidate' | 'job' | 'application';
  entity_id: string;
  processing_type: 'resume_parse' | 'text_extraction' | 'ai_analysis';
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

    const { file_path, entity_type, entity_id, processing_type }: DocumentRequest = await req.json()

    // Download file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabaseClient.storage
      .from('documents')
      .download(file_path)

    if (downloadError) {
      throw downloadError
    }

    // Convert file to text for processing
    const fileText = await fileData.text()

    let processedData = {}

    if (processing_type === 'resume_parse') {
      // AI-powered resume parsing
      const parsePrompt = `
        Parse this resume and extract structured information:
        
        Resume Content:
        ${fileText}
        
        Extract and format as JSON:
        {
          "personal_info": {
            "name": string,
            "email": string,
            "phone": string,
            "location": string,
            "linkedin": string
          },
          "summary": string,
          "experience": [
            {
              "title": string,
              "company": string,
              "duration": string,
              "description": string,
              "achievements": string[]
            }
          ],
          "education": [
            {
              "degree": string,
              "institution": string,
              "graduation_year": string,
              "gpa": string
            }
          ],
          "skills": {
            "technical": string[],
            "soft": string[],
            "languages": string[]
          },
          "certifications": string[],
          "projects": [
            {
              "name": string,
              "description": string,
              "technologies": string[]
            }
          ]
        }
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
              content: 'You are an expert resume parser. Extract structured information accurately from resumes.'
            },
            {
              role: 'user',
              content: parsePrompt
            }
          ],
          temperature: 0.1,
          response_format: { type: "json_object" }
        }),
      })

      const aiResponse = await openaiResponse.json()
      processedData = JSON.parse(aiResponse.choices?.[0]?.message?.content || '{}')

      // Update candidate profile if entity_type is candidate
      if (entity_type === 'candidate' && processedData.personal_info) {
        const updateData = {
          first_name: processedData.personal_info.name?.split(' ')[0],
          last_name: processedData.personal_info.name?.split(' ').slice(1).join(' '),
          email: processedData.personal_info.email,
          phone: processedData.personal_info.phone,
          location: processedData.personal_info.location,
          linkedin_url: processedData.personal_info.linkedin,
          skills: [
            ...(processedData.skills?.technical || []),
            ...(processedData.skills?.soft || [])
          ],
          experience_years: processedData.experience?.length || 0,
          bio: processedData.summary
        }

        await supabaseClient
          .from('candidates')
          .update(updateData)
          .eq('id', entity_id)
      }
    }

    // Update document metadata
    await supabaseClient
      .from('documents')
      .update({
        upload_status: 'completed',
        metadata: {
          processed_at: new Date().toISOString(),
          processing_type,
          extracted_data: processedData
        }
      })
      .eq('storage_path', file_path)

    return new Response(
      JSON.stringify({
        success: true,
        processed_data: processedData,
        processing_type,
        entity_updated: entity_type === 'candidate'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Document processing error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
