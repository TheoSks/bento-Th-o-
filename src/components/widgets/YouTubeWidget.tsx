'use client';

import { YouTubeWidgetData } from '@/types';

interface YouTubeWidgetProps {
  data: YouTubeWidgetData;
}

export function YouTubeWidget({ data }: YouTubeWidgetProps) {
  if (data.type === 'video' && data.videoId) {
    return (
      <div className="youtube-widget">
        <iframe
          src={`https://www.youtube.com/embed/${data.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (data.playlistId) {
    return (
      <div className="youtube-widget">
        <iframe
          src={`https://www.youtube.com/embed/videoseries?list=${data.playlistId}`}
          title="YouTube playlist"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="youtube-widget flex items-center justify-center">
      <p className="text-muted">YouTube widget</p>
    </div>
  );
}
