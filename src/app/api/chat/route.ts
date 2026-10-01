import { NextRequest, NextResponse } from 'next/server';
import { getScheme, getAppConfig, buildSystemPrompt, validateResponse, getSafeFallback } from '@/lib/scheme';
import { DEMO_FLOW, getNextDemoStep } from '@/lib/demo';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

interface ChatRequestBody {
  message: string;
  history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;
  demoStepIndex?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json();
    const { message, history, demoStepIndex } = body;

    const config = getAppConfig();
    const scheme = getScheme(config.scheme);

    // Check if demo mode is enabled
    const isDemoMode = process.env.DEMO_MODE === 'true';

    if (isDemoMode) {
      return handleDemoMode(demoStepIndex ?? 0, message);
    }

    // Live Gemini mode
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured', fallback: scheme.conversation_flow.uncertainty_hi },
        { status: 500 }
      );
    }

    const systemPrompt = buildSystemPrompt(scheme, config.language);

    // Build conversation contents for Gemini
    const contents = [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents,
        generationConfig: {
          temperature: 0.3,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 300,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return NextResponse.json({
        reply: getSafeFallback(scheme),
        error: 'API request failed',
      });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return NextResponse.json({
        reply: getSafeFallback(scheme),
        error: 'Empty response from AI',
      });
    }

    // Validate the response
    const validation = validateResponse(reply, scheme);
    if (!validation.valid) {
      console.warn('Response validation failed:', validation.reason);
      return NextResponse.json({
        reply: getSafeFallback(scheme),
        validationError: validation.reason,
      });
    }

    return NextResponse.json({
      reply,
      sources: scheme.sources.map(s => ({ source_name: s.source_name, url: s.url, last_verified: s.last_verified })),
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', reply: 'मुझसे कुछ गड़बड़ हो गई। कृपया दोबारा कोशिश करें।' },
      { status: 500 }
    );
  }
}

function handleDemoMode(currentStep: number, userMessage: string) {
  let stepIndex = currentStep;
  
  // If it's the initial call (step 0 and no user message), return greeting
  if (stepIndex === 0 && (!userMessage || userMessage === '__init__')) {
    const step = DEMO_FLOW[0];
    return NextResponse.json({
      reply: step.assistantResponse,
      demoStepIndex: 0,
      nextStepIndex: step.nextStep ?? 1,
      showButtons: step.showButtons,
      phase: step.phase,
      isDemo: true,
    });
  }

  // Find next step based on user input
  const nextIndex = getNextDemoStep(stepIndex, userMessage);
  
  if (nextIndex < 0 || nextIndex >= DEMO_FLOW.length) {
    return NextResponse.json({
      reply: DEMO_FLOW[DEMO_FLOW.length - 1].assistantResponse,
      demoStepIndex: DEMO_FLOW.length - 1,
      nextStepIndex: -1,
      phase: 'closing',
      isDemo: true,
    });
  }

  const nextStep = DEMO_FLOW[nextIndex];
  return NextResponse.json({
    reply: nextStep.assistantResponse,
    demoStepIndex: nextIndex,
    nextStepIndex: nextStep.nextStep ?? nextIndex + 1,
    showButtons: nextStep.showButtons,
    phase: nextStep.phase,
    isDemo: true,
  });
}
