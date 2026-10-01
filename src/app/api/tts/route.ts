import { NextRequest, NextResponse } from 'next/server';

/**
 * Text-to-Speech API route
 * Uses Google Cloud TTS if available, otherwise returns text for browser synthesis
 */
export async function POST(request: NextRequest) {
  try {
    const { text, language = 'hi-IN' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    // For MVP, we'll use browser-based speech synthesis (Web Speech API)
    // This avoids additional API key requirements
    // Return the text and let the client handle TTS via speechSynthesis
    return NextResponse.json({
      text,
      language,
      method: 'browser', // Indicates client should use Web Speech API
    });

  } catch (error) {
    console.error('TTS API error:', error);
    return NextResponse.json(
      { error: 'TTS generation failed' },
      { status: 500 }
    );
  }
}
