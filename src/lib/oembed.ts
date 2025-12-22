import { OEmbedResponse } from '@/types';

interface OEmbedProvider {
  name: string;
  patterns: RegExp[];
  endpoint: string;
  transform?: (response: unknown) => OEmbedResponse;
}

const providers: OEmbedProvider[] = [
  {
    name: 'twitter',
    patterns: [
      /^https?:\/\/(www\.)?twitter\.com\/.+\/status\/.+/,
      /^https?:\/\/(www\.)?x\.com\/.+\/status\/.+/,
    ],
    endpoint: 'https://publish.twitter.com/oembed',
  },
  {
    name: 'youtube',
    patterns: [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=.+/,
      /^https?:\/\/youtu\.be\/.+/,
    ],
    endpoint: 'https://www.youtube.com/oembed',
  },
  {
    name: 'spotify',
    patterns: [
      /^https?:\/\/open\.spotify\.com\/(track|album|playlist|artist|episode|show)\/.+/,
    ],
    endpoint: 'https://open.spotify.com/oembed',
  },
  {
    name: 'tiktok',
    patterns: [
      /^https?:\/\/(www\.)?tiktok\.com\/@.+\/video\/.+/,
    ],
    endpoint: 'https://www.tiktok.com/oembed',
  },
  {
    name: 'dribbble',
    patterns: [
      /^https?:\/\/(www\.)?dribbble\.com\/shots\/.+/,
    ],
    endpoint: 'https://api.dribbble.com/v2/oembed',
  },
  {
    name: 'figma',
    patterns: [
      /^https?:\/\/(www\.)?figma\.com\/(file|proto)\/.+/,
    ],
    endpoint: 'https://www.figma.com/api/oembed',
  },
];

export function findProvider(url: string): OEmbedProvider | null {
  return providers.find((p) =>
    p.patterns.some((pattern) => pattern.test(url))
  ) || null;
}

export async function fetchOEmbed(url: string): Promise<OEmbedResponse | null> {
  const provider = findProvider(url);

  if (!provider) {
    return fetchOpenGraphData(url);
  }

  try {
    const response = await fetch(
      `${provider.endpoint}?url=${encodeURIComponent(url)}&format=json`
    );

    if (!response.ok) throw new Error('oEmbed request failed');

    const data = await response.json();
    return provider.transform ? provider.transform(data) : data;
  } catch (error) {
    console.error(`oEmbed error for ${provider.name}:`, error);
    return null;
  }
}

interface OpenGraphData {
  title: string;
  description?: string;
  image?: string;
  favicon?: string;
  siteName?: string;
}

export async function fetchOpenGraphData(url: string): Promise<OEmbedResponse | null> {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'BentoBot/1.0' },
    });

    const html = await response.text();
    const ogData = parseOpenGraph(html, url);

    return {
      type: 'link',
      version: '1.0',
      title: ogData.title,
      thumbnail_url: ogData.image,
      provider_name: ogData.siteName,
    };
  } catch (error) {
    console.error('Open Graph fetch error:', error);
    return null;
  }
}

function parseOpenGraph(html: string, url: string): OpenGraphData {
  const getMetaContent = (property: string): string | undefined => {
    const regex = new RegExp(`<meta[^>]*(?:property|name)="${property}"[^>]*content="([^"]*)"`, 'i');
    const altRegex = new RegExp(`<meta[^>]*content="([^"]*)"[^>]*(?:property|name)="${property}"`, 'i');
    const match = html.match(regex) || html.match(altRegex);
    return match?.[1];
  };

  const getTitle = (): string => {
    const ogTitle = getMetaContent('og:title');
    if (ogTitle) return ogTitle;

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    return titleMatch?.[1] || url;
  };

  return {
    title: getTitle(),
    description: getMetaContent('og:description') || getMetaContent('description'),
    image: getMetaContent('og:image'),
    siteName: getMetaContent('og:site_name'),
    favicon: `${new URL(url).origin}/favicon.ico`,
  };
}

export async function fetchLinkMetadata(url: string): Promise<{
  title: string;
  description?: string;
  image?: string;
  favicon?: string;
  siteName?: string;
}> {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'BentoBot/1.0' },
    });

    const html = await response.text();
    return parseOpenGraph(html, url);
  } catch {
    return { title: url };
  }
}
