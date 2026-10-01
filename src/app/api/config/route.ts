import { NextResponse } from 'next/server';
import { getScheme, getAppConfig } from '@/lib/scheme';

/**
 * Returns scheme data and app config for client use
 * Only exposes safe, non-sensitive configuration
 */
export async function GET() {
  try {
    const config = getAppConfig();
    const scheme = getScheme(config.scheme);

    return NextResponse.json({
      config: {
        language: config.language,
        scheme: config.scheme,
        app_name: config.app_name,
        app_tagline: config.app_tagline,
      },
      scheme: {
        scheme_name: scheme.scheme_name,
        description: scheme.description,
        documents: scheme.documents,
        where_to_apply: scheme.where_to_apply,
        helpline: scheme.helpline,
        benefits: scheme.benefits,
        conversation_flow: scheme.conversation_flow,
        sources: scheme.sources,
      },
      isDemoMode: process.env.DEMO_MODE === 'true',
    });
  } catch (error) {
    console.error('Config API error:', error);
    return NextResponse.json(
      { error: 'Failed to load configuration' },
      { status: 500 }
    );
  }
}
