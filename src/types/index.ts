// Grid types
export interface GridConfig {
  cols: number;
  rowHeight: number;
  gap: number;
  maxRows: number;
  compactType: 'vertical' | 'horizontal' | null;
  preventCollision: boolean;
}

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
}

export type Layout = LayoutItem[];

export type Layouts = {
  lg: Layout;
  md: Layout;
  sm: Layout;
  xs: Layout;
};

// Widget types
export type WidgetSize = 'small' | 'wide' | 'tall' | 'large';

export const widgetSizes: Record<WidgetSize, { w: number; h: number }> = {
  small: { w: 2, h: 2 },
  wide: { w: 4, h: 2 },
  tall: { w: 2, h: 4 },
  large: { w: 4, h: 4 },
};

export type WidgetType =
  | 'link'
  | 'text'
  | 'image'
  | 'video'
  | 'avatar'
  | 'map'
  | 'twitter'
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'youtube'
  | 'spotify'
  | 'soundcloud'
  | 'twitch'
  | 'dribbble'
  | 'figma'
  | 'behance'
  | 'github'
  | 'producthunt'
  | 'substack'
  | 'medium'
  | 'gumroad'
  | 'buymeacoffee'
  | 'patreon'
  | 'appstore'
  | 'calendly'
  | 'discord'
  | 'custom';

export interface WidgetStyle {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
}

export interface Widget {
  id: string;
  type: WidgetType;
  data: WidgetData;
  style?: WidgetStyle;
  defaultSize: { w: number; h: number };
}

// Widget data types
export type WidgetData =
  | LinkWidgetData
  | TextWidgetData
  | ImageWidgetData
  | VideoWidgetData
  | TwitterWidgetData
  | SpotifyWidgetData
  | YouTubeWidgetData
  | GitHubWidgetData
  | SocialWidgetData
  | MapWidgetData;

export interface LinkWidgetData {
  url: string;
  title?: string;
  description?: string;
  favicon?: string;
  thumbnail?: string;
}

export interface TextWidgetData {
  content: string;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
}

export interface ImageWidgetData {
  src: string;
  alt?: string;
  link?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

export interface VideoWidgetData {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export interface TwitterWidgetData {
  type: 'profile' | 'tweet';
  username?: string;
  tweetId?: string;
}

export interface SpotifyWidgetData {
  type: 'track' | 'album' | 'playlist' | 'artist' | 'podcast' | 'episode';
  spotifyId: string;
  theme?: 'light' | 'dark';
  compact?: boolean;
}

export interface YouTubeWidgetData {
  type: 'video' | 'channel';
  videoId?: string;
  channelId?: string;
  playlistId?: string;
}

export interface GitHubWidgetData {
  type: 'profile' | 'repo';
  username: string;
  repo?: string;
  showContributions?: boolean;
}

export interface SocialWidgetData {
  platform: string;
  username: string;
  url: string;
  icon?: string;
}

export interface MapWidgetData {
  location: string;
  lat?: number;
  lng?: number;
  zoom?: number;
}

// OEmbed types
export interface OEmbedResponse {
  type: 'photo' | 'video' | 'link' | 'rich';
  version: string;
  title?: string;
  author_name?: string;
  author_url?: string;
  provider_name?: string;
  provider_url?: string;
  cache_age?: number;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
  html?: string;
  width?: number;
  height?: number;
  url?: string;
}

// Widget picker categories
export interface WidgetCategory {
  name: string;
  icon: string;
  widgets: WidgetOption[];
}

export interface WidgetOption {
  type: WidgetType;
  name: string;
  icon: string;
  description: string;
  defaultSize: WidgetSize;
  defaultData: WidgetData;
}

// Grid breakpoints
export const gridBreakpoints = {
  lg: 1200,
  md: 768,
  sm: 480,
  xs: 0,
};

export const gridCols = {
  lg: 12,
  md: 8,
  sm: 4,
  xs: 4,
};

// Default grid config
export const defaultGridConfig: GridConfig = {
  cols: 12,
  rowHeight: 80,
  gap: 16,
  maxRows: 20,
  compactType: 'vertical',
  preventCollision: false,
};
