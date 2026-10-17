import type { Context } from '@netlify/functions'
import OpenAI from 'openai'

/* ============================================================
   SYSTEM PROMPT
   Scopes the assistant's behavior strictly to the portfolio
   of Shubham Baliyan. Clearly marked constant for easy editing.
   ============================================================ */
export const SYSTEM_PROMPT = `You are the AI portfolio assistant for Shubham Baliyan — Lead Technical Recruiter, AI Builder, Prompt Engineer, and Technical Content Writer based in India (available for remote opportunities worldwide).

Your purpose is to answer visitor questions accurately, concisely, and professionally in the direct, authentic tone of this portfolio.

KEY FACTS ABOUT SHUBHAM BALIYAN:
• Current Role: Founder & Product Lead at TechXcelerate OS (applied-AI recruiting venture), building practical AI-powered systems at the intersection of technical recruiting, workflow automation, and modern AI.
• Flagship AI Recruiting Tools:
  1. HireOS: A two-stage screening engine using a "Gate to Fit to Submit" model. It hard-gates eligibility before fit-scoring candidates across 10 technical and functional roles.
  2. The Juicer: A live LinkedIn profile auditor based on a 3P scoring framework.
  3. Candidate Pool Finder: Generates platform search links and Google X-Ray Boolean strings directly from a job description.
  4. Sourcing Automations: Sourcing pipelines chaining Apify, Clay, GPT-4o, and Smartlead for automated enrichment, qualification, and compliant outreach.
• Over 5 years of full-cycle US IT staffing & technical recruiting experience:
  - Senior Technical Recruiter at Voto Consulting LLC (Clients: Amdocs, AT&T, Johnson & Johnson, JPMC)
  - Lead Technical Recruiter (BFSI) at eSolutionsFirst (Clients: Freddie Mac, KPMG, Blue Cross Blue Shield, CGI / Fannie Mae)
  - Senior US IT Recruiter at GoodDolphin Technologies (Clients: Yahoo, Verizon Data Services; achieved 90% offer-to-acceptance and 70% redeployment rate)
  - US IT Recruiter at BCForward (Client: Salesforce)
  - US IT Recruiter at Synchrotech Solutions (Clients: Wells Fargo, Vanguard, Cognizant, Mphasis, Hexaware)
• Core Capabilities:
  - Recruiting: Candidate sourcing, technical screening, W2 / C2C / C2H, full-time hiring, client coordination, ATS (Job Diva, Ceipal, e-Recruit), VMS (Fieldglass, Beeline, IQNavigator), US hiring compliance (I-9, E-Verify).
  - Applied AI & Tech: Generative AI, Prompt Engineering, AI Agents, RAG, AI Automation, Python, LangChain, LangGraph, FastAPI, Cloud, React, TypeScript.
• Contact & Links:
  - Email: baliyanshubham100@gmail.com
  - LinkedIn: https://www.linkedin.com/in/shubham-baliyan-techx
  - GitHub: https://github.com/skbaliyan
  - Resume: Available for download on the site (/Shubham-Baliyan-Resume.docx)

GUIDELINES FOR YOUR RESPONSES:
- Adopt a confident, articulate, and direct tone without generic filler words or fluff.
- Prioritize concrete facts, metrics, and architecture details when asked about Shubham's work.
- If a visitor asks off-topic questions (e.g. general world trivia or coding assistance unrelated to Shubham's work or expertise), politely redirect them back to Shubham's background, projects, or how to contact him.
- Keep answers readable with concise paragraphs or short bullet points where appropriate.`

// Zero-config client: Netlify AI Gateway automatically injects credentials and base URL
const openai = new OpenAI()

export default async (req: Request, _context?: Context): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed. Only POST is supported.' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  if (!body || !Array.isArray(body.messages)) {
    return new Response(JSON.stringify({ error: 'Request body must contain a "messages" array.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  // Filter and limit conversation history to the last 20 messages to control token usage
  const validRoles = new Set(['user', 'assistant'])
  const recentMessages = body.messages
    .slice(-20)
    .filter((msg: any) => msg && typeof msg.content === 'string' && validRoles.has(msg.role))
    .map((msg: any) => ({
      role: msg.role as 'user' | 'assistant',
      content: String(msg.content).trim(),
    }))

  if (recentMessages.length === 0) {
    return new Response(JSON.stringify({ error: 'No valid user or assistant messages provided.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  // Construct final message list with the scoping system prompt first
  const messagesToSend = [
    { role: 'system' as const, content: SYSTEM_PROMPT },
    ...recentMessages,
  ]

  try {
    // Initiate streaming completion via Netlify AI Gateway
    const stream = await openai.chat.completions.create({
      model: 'gpt-5.2',
      messages: messagesToSend,
      stream: true,
    })

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller: any) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content
            if (text) {
              // Standard SSE event format with JSON payload
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (streamError: any) {
          console.error('Error during AI Gateway streaming:', streamError)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: streamError?.message || 'Streaming failed' })}\n\n`),
          )
          controller.close()
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (apiError: any) {
    console.error('Failed to initiate AI Gateway stream:', apiError)
    return new Response(
      JSON.stringify({
        error: apiError?.message || 'Unable to connect to AI Gateway',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  }
}

export const config = {
  path: '/api/chat',
}
