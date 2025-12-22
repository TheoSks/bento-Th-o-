'use client';

import { SocialWidgetData } from '@/types';

const socialIcons: Record<string, string> = {
  twitter: '𝕏',
  instagram: '📷',
  linkedin: '💼',
  github: '🐙',
  youtube: '▶️',
  tiktok: '🎵',
  discord: '💬',
  twitch: '🎮',
  spotify: '🎧',
  dribbble: '🏀',
  behance: '🎨',
  figma: '🎯',
  medium: '📝',
  substack: '📰',
  buymeacoffee: '☕',
  patreon: '🎁',
};

const socialColors: Record<string, string> = {
  twitter: '#000000',
  instagram: '#E4405F',
  linkedin: '#0A66C2',
  github: '#181717',
  youtube: '#FF0000',
  tiktok: '#000000',
  discord: '#5865F2',
  twitch: '#9146FF',
  spotify: '#1DB954',
  dribbble: '#EA4C89',
  behance: '#1769FF',
  figma: '#F24E1E',
  medium: '#000000',
  substack: '#FF6719',
  buymeacoffee: '#FFDD00',
  patreon: '#FF424D',
};

interface SocialWidgetProps {
  data: SocialWidgetData;
}

export function SocialWidget({ data }: SocialWidgetProps) {
  const icon = socialIcons[data.platform.toLowerCase()] || '🔗';
  const color = socialColors[data.platform.toLowerCase()] || 'var(--color-primary)';

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-widget group"
      style={{
        backgroundColor: `${color}15`,
      }}
    >
      <span className="icon text-3xl">{data.icon || icon}</span>
      <div className="flex flex-col">
        <span className="username font-semibold">@{data.username}</span>
        <span className="text-sm text-muted capitalize">{data.platform}</span>
      </div>
    </a>
  );
}
