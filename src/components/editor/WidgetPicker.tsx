'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditorStore } from '@/store/editorStore';
import { WidgetType, WidgetSize } from '@/types';

interface WidgetOption {
  type: WidgetType;
  name: string;
  icon: string;
  description: string;
  defaultSize: WidgetSize;
  defaultData: Record<string, unknown>;
}

const widgetCategories = [
  {
    name: 'Basic',
    icon: '📦',
    widgets: [
      {
        type: 'link' as WidgetType,
        name: 'Link',
        icon: '🔗',
        description: 'Add a link with preview',
        defaultSize: 'wide' as WidgetSize,
        defaultData: { url: '', title: 'New Link' },
      },
      {
        type: 'text' as WidgetType,
        name: 'Text',
        icon: '📝',
        description: 'Add custom text',
        defaultSize: 'small' as WidgetSize,
        defaultData: { content: 'Hello World', fontSize: 'md', align: 'center' },
      },
      {
        type: 'image' as WidgetType,
        name: 'Image',
        icon: '🖼️',
        description: 'Upload an image',
        defaultSize: 'large' as WidgetSize,
        defaultData: { src: '', alt: '', objectFit: 'cover' },
      },
    ],
  },
  {
    name: 'Social',
    icon: '👥',
    widgets: [
      {
        type: 'twitter' as WidgetType,
        name: 'Twitter/X',
        icon: '𝕏',
        description: 'Link your Twitter profile',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'twitter', username: '', url: '' },
      },
      {
        type: 'instagram' as WidgetType,
        name: 'Instagram',
        icon: '📷',
        description: 'Link your Instagram',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'instagram', username: '', url: '' },
      },
      {
        type: 'linkedin' as WidgetType,
        name: 'LinkedIn',
        icon: '💼',
        description: 'Link your LinkedIn',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'linkedin', username: '', url: '' },
      },
      {
        type: 'github' as WidgetType,
        name: 'GitHub',
        icon: '🐙',
        description: 'Show your GitHub profile',
        defaultSize: 'wide' as WidgetSize,
        defaultData: { type: 'profile', username: '', showContributions: false },
      },
      {
        type: 'discord' as WidgetType,
        name: 'Discord',
        icon: '💬',
        description: 'Link your Discord',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'discord', username: '', url: '' },
      },
    ],
  },
  {
    name: 'Media',
    icon: '🎬',
    widgets: [
      {
        type: 'youtube' as WidgetType,
        name: 'YouTube',
        icon: '▶️',
        description: 'Embed a YouTube video',
        defaultSize: 'large' as WidgetSize,
        defaultData: { type: 'video', videoId: '' },
      },
      {
        type: 'spotify' as WidgetType,
        name: 'Spotify',
        icon: '🎧',
        description: 'Embed Spotify music',
        defaultSize: 'wide' as WidgetSize,
        defaultData: { type: 'track', spotifyId: '', theme: 'dark', compact: false },
      },
      {
        type: 'twitch' as WidgetType,
        name: 'Twitch',
        icon: '🎮',
        description: 'Link your Twitch',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'twitch', username: '', url: '' },
      },
    ],
  },
  {
    name: 'Design',
    icon: '🎨',
    widgets: [
      {
        type: 'dribbble' as WidgetType,
        name: 'Dribbble',
        icon: '🏀',
        description: 'Link your Dribbble',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'dribbble', username: '', url: '' },
      },
      {
        type: 'behance' as WidgetType,
        name: 'Behance',
        icon: '🎨',
        description: 'Link your Behance',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'behance', username: '', url: '' },
      },
      {
        type: 'figma' as WidgetType,
        name: 'Figma',
        icon: '🎯',
        description: 'Link your Figma',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'figma', username: '', url: '' },
      },
    ],
  },
  {
    name: 'Writing',
    icon: '✍️',
    widgets: [
      {
        type: 'medium' as WidgetType,
        name: 'Medium',
        icon: '📝',
        description: 'Link your Medium',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'medium', username: '', url: '' },
      },
      {
        type: 'substack' as WidgetType,
        name: 'Substack',
        icon: '📰',
        description: 'Link your Substack',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'substack', username: '', url: '' },
      },
    ],
  },
  {
    name: 'Support',
    icon: '❤️',
    widgets: [
      {
        type: 'buymeacoffee' as WidgetType,
        name: 'Buy Me a Coffee',
        icon: '☕',
        description: 'Accept donations',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'buymeacoffee', username: '', url: '' },
      },
      {
        type: 'patreon' as WidgetType,
        name: 'Patreon',
        icon: '🎁',
        description: 'Link your Patreon',
        defaultSize: 'small' as WidgetSize,
        defaultData: { platform: 'patreon', username: '', url: '' },
      },
    ],
  },
];

interface WidgetPickerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WidgetPicker({ isOpen, onClose }: WidgetPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const addWidget = useEditorStore((state) => state.addWidget);

  const handleAddWidget = (option: WidgetOption) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addWidget(option.type, option.defaultData as any, option.defaultSize);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-secondary rounded-2xl p-6 z-50 max-h-[80vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Add Widget</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-widget-bg flex items-center justify-center hover:bg-opacity-80 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 mb-4 border-b border-border">
              {widgetCategories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === index
                      ? 'bg-primary text-white'
                      : 'bg-widget-bg hover:bg-opacity-80'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto flex-1">
              {widgetCategories[selectedCategory].widgets.map((widget) => (
                <motion.button
                  key={widget.type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddWidget(widget as WidgetOption)}
                  className="flex flex-col items-center gap-2 p-4 bg-widget-bg rounded-xl hover:bg-opacity-80 transition-colors text-center"
                >
                  <span className="text-3xl">{widget.icon}</span>
                  <span className="font-medium">{widget.name}</span>
                  <span className="text-xs text-muted">{widget.description}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
