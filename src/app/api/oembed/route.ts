import { NextRequest, NextResponse } from 'next/server';
import { fetchOEmbed } from '@/lib/oembed';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL required' }, { status: 400 });
  }

  try {
    const data = await fetchOEmbed(url);

    if (!data) {
      return NextResponse.json({ error: 'Unable to fetch embed' }, { status: 404 });
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('oEmbed error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
