'use client';

import { Widget, WidgetData, LinkWidgetData, ImageWidgetData, TextWidgetData, SpotifyWidgetData, YouTubeWidgetData, GitHubWidgetData, SocialWidgetData } from '@/types';
import { LinkWidget } from './LinkWidget';
import { ImageWidget } from './ImageWidget';
import { TextWidget } from './TextWidget';
import { SpotifyWidget } from './SpotifyWidget';
import { YouTubeWidget } from './YouTubeWidget';
import { GitHubWidget } from './GitHubWidget';
import { SocialWidget } from './SocialWidget';

interface WidgetRendererProps {
  widget: Widget;
  isEditing?: boolean;
  onSelect?: () => void;
}

export function WidgetRenderer({ widget, isEditing, onSelect }: WidgetRendererProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (isEditing && onSelect) {
      e.preventDefault();
      e.stopPropagation();
      onSelect();
    }
  };

  const renderWidget = () => {
    switch (widget.type) {
      case 'link':
        return <LinkWidget data={widget.data as LinkWidgetData} />;

      case 'image':
        return <ImageWidget data={widget.data as ImageWidgetData} />;

      case 'text':
        return <TextWidget data={widget.data as TextWidgetData} />;

      case 'spotify':
        return <SpotifyWidget data={widget.data as SpotifyWidgetData} />;

      case 'youtube':
        return <YouTubeWidget data={widget.data as YouTubeWidgetData} />;

      case 'github':
        return <GitHubWidget data={widget.data as GitHubWidgetData} />;

      case 'twitter':
      case 'instagram':
      case 'tiktok':
      case 'linkedin':
      case 'discord':
      case 'twitch':
      case 'dribbble':
      case 'behance':
      case 'figma':
      case 'medium':
      case 'substack':
      case 'buymeacoffee':
      case 'patreon':
        return <SocialWidget data={widget.data as SocialWidgetData} />;

      default:
        return (
          <div className="widget-content centered">
            <p className="text-muted text-sm">Unsupported widget type: {widget.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      className="w-full h-full"
      onClick={handleClick}
      style={{
        backgroundColor: widget.style?.backgroundColor,
        color: widget.style?.textColor,
        borderRadius: widget.style?.borderRadius,
        padding: widget.style?.padding,
        pointerEvents: isEditing ? 'all' : undefined,
      }}
    >
      {renderWidget()}
    </div>
  );
}
