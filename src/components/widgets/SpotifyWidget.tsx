'use client';

import { SpotifyWidgetData } from '@/types';

interface SpotifyWidgetProps {
  data: SpotifyWidgetData;
}

export function SpotifyWidget({ data }: SpotifyWidgetProps) {
  const height = data.compact ? 152 : 352;
  const theme = data.theme === 'light' ? 1 : 0;

  const embedUrl = `https://open.spotify.com/embed/${data.type}/${data.spotifyId}?utm_source=generator&theme=${theme}`;

  return (
    <div className="spotify-widget">
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: 'var(--widget-radius)' }}
      />
    </div>
  );
}
