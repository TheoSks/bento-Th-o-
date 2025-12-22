'use client';

import { useEditorStore } from '@/store/editorStore';
import { Widget, LinkWidgetData, TextWidgetData, ImageWidgetData, SpotifyWidgetData, YouTubeWidgetData, GitHubWidgetData, SocialWidgetData } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface WidgetSettingsProps {
  widget: Widget | null;
  onClose: () => void;
}

export function WidgetSettings({ widget, onClose }: WidgetSettingsProps) {
  const { updateWidgetData, removeWidget } = useEditorStore();

  if (!widget) return null;

  const handleChange = (key: string, value: string | boolean | number) => {
    updateWidgetData(widget.id, { [key]: value });
  };

  const renderSettings = () => {
    switch (widget.type) {
      case 'link':
        const linkData = widget.data as LinkWidgetData;
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm text-muted">URL</label>
              <input
                type="url"
                value={linkData.url || ''}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Title</label>
              <input
                type="text"
                value={linkData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Link title"
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Description</label>
              <textarea
                value={linkData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Optional description"
                rows={2}
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none resize-none"
              />
            </div>
          </>
        );

      case 'text':
        const textData = widget.data as TextWidgetData;
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm text-muted">Content</label>
              <textarea
                value={textData.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Enter your text"
                rows={3}
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Font Size</label>
              <select
                value={textData.fontSize || 'md'}
                onChange={(e) => handleChange('fontSize', e.target.value)}
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Alignment</label>
              <select
                value={textData.align || 'center'}
                onChange={(e) => handleChange('align', e.target.value)}
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        );

      case 'image':
        const imageData = widget.data as ImageWidgetData;
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm text-muted">Image URL</label>
              <input
                type="url"
                value={imageData.src || ''}
                onChange={(e) => handleChange('src', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Alt Text</label>
              <input
                type="text"
                value={imageData.alt || ''}
                onChange={(e) => handleChange('alt', e.target.value)}
                placeholder="Image description"
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Link (optional)</label>
              <input
                type="url"
                value={imageData.link || ''}
                onChange={(e) => handleChange('link', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              />
            </div>
          </>
        );

      case 'spotify':
        const spotifyData = widget.data as SpotifyWidgetData;
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm text-muted">Spotify ID</label>
              <input
                type="text"
                value={spotifyData.spotifyId || ''}
                onChange={(e) => handleChange('spotifyId', e.target.value)}
                placeholder="Track, album, or playlist ID"
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Type</label>
              <select
                value={spotifyData.type || 'track'}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              >
                <option value="track">Track</option>
                <option value="album">Album</option>
                <option value="playlist">Playlist</option>
                <option value="artist">Artist</option>
              </select>
            </div>
          </>
        );

      case 'youtube':
        const ytData = widget.data as YouTubeWidgetData;
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm text-muted">Video ID</label>
              <input
                type="text"
                value={ytData.videoId || ''}
                onChange={(e) => handleChange('videoId', e.target.value)}
                placeholder="YouTube video ID"
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              />
            </div>
          </>
        );

      case 'github':
        const ghData = widget.data as GitHubWidgetData;
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm text-muted">Username</label>
              <input
                type="text"
                value={ghData.username || ''}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="GitHub username"
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showContributions"
                checked={ghData.showContributions || false}
                onChange={(e) => handleChange('showContributions', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="showContributions" className="text-sm">
                Show contribution graph
              </label>
            </div>
          </>
        );

      case 'twitter':
      case 'instagram':
      case 'linkedin':
      case 'tiktok':
      case 'discord':
      case 'twitch':
      case 'dribbble':
      case 'behance':
      case 'figma':
      case 'medium':
      case 'substack':
      case 'buymeacoffee':
      case 'patreon':
        const socialData = widget.data as SocialWidgetData;
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm text-muted">Username</label>
              <input
                type="text"
                value={socialData.username || ''}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="Your username"
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Profile URL</label>
              <input
                type="url"
                value={socialData.url || ''}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 bg-widget-bg rounded-lg border border-border focus:border-primary outline-none"
              />
            </div>
          </>
        );

      default:
        return <p className="text-muted text-sm">No settings available</p>;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="w-80 bg-secondary rounded-2xl p-6 h-fit"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold capitalize">{widget.type} Settings</h3>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-widget-bg flex items-center justify-center hover:bg-opacity-80 transition-colors text-sm"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {renderSettings()}

          <button
            onClick={() => {
              removeWidget(widget.id);
              onClose();
            }}
            className="w-full py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors mt-6"
          >
            Delete Widget
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
