
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  from?: string;
  reply_to?: string;
  template_id?: string;
  template_data?: Record<string, any>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, html, from = 'noreply@hireai.dev', reply_to, template_id, template_data }: EmailRequest = await req.json()

    // Send email using Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        reply_to: reply_to || from,
        tags: [
          { name: 'category', value: 'recruiting' },
          { name: 'environment', value: 'production' }
        ]
      }),
    })

    const emailResult = await resendResponse.json()

    if (!resendResponse.ok) {
      throw new Error(`Email sending failed: ${emailResult.message}`)
    }

    return new Response(
      JSON.stringify({
        success: true,
        email_id: emailResult.id,
        status: 'sent'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Email service error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
