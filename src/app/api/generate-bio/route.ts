import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return new NextResponse('Prompt not found', { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return new NextResponse('OpenRouter API key not found', { status: 500 });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openrouter/horizon-alpha',
        stream: false,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates a single, creative, and engaging user bio based on the information provided. Do not offer multiple options.',
          },
          {
            role: 'user',
            content: `Generate a bio based on the following information: ${prompt}`,
          },
        ],
      }),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter API Error:', data);
      return new NextResponse(data?.error?.message || 'AI error', { status: response.status });
    }

    const bio = data.choices?.[0]?.message?.content ?? '';

    const res = NextResponse.json({ bio });
    res.headers.set('Cache-Control', 'no-store');
    return res;
  } catch (error) {
    console.error('Error generating bio:', error);
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
    return new NextResponse('An unknown error occurred', { status: 500 });
  }
}