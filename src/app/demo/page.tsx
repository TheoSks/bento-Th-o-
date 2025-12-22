'use client';

import { BentoPage } from '@/components/public/BentoPage';
import { Layout, Widget } from '@/types';

const demoLayout: Layout = [
  { i: '1', x: 0, y: 0, w: 4, h: 4 },
  { i: '2', x: 4, y: 0, w: 4, h: 2 },
  { i: '3', x: 8, y: 0, w: 2, h: 2 },
  { i: '4', x: 10, y: 0, w: 2, h: 2 },
  { i: '5', x: 4, y: 2, w: 4, h: 2 },
  { i: '6', x: 8, y: 2, w: 4, h: 4 },
  { i: '7', x: 0, y: 4, w: 4, h: 2 },
  { i: '8', x: 4, y: 4, w: 2, h: 2 },
  { i: '9', x: 6, y: 4, w: 2, h: 2 },
];

const demoWidgets: Widget[] = [
  {
    id: '1',
    type: 'image',
    data: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
      alt: 'Profile cover',
      objectFit: 'cover',
    },
    defaultSize: { w: 4, h: 4 },
  },
  {
    id: '2',
    type: 'text',
    data: {
      content: 'Welcome to my Bento! 👋',
      fontSize: 'xl',
      align: 'center',
    },
    defaultSize: { w: 4, h: 2 },
  },
  {
    id: '3',
    type: 'twitter',
    data: {
      platform: 'twitter',
      username: 'demo',
      url: 'https://twitter.com/demo',
    },
    defaultSize: { w: 2, h: 2 },
  },
  {
    id: '4',
    type: 'github',
    data: {
      type: 'profile',
      username: 'octocat',
      showContributions: false,
    },
    defaultSize: { w: 2, h: 2 },
  },
  {
    id: '5',
    type: 'spotify',
    data: {
      type: 'track',
      spotifyId: '4cOdK2wGLETKBW3PvgPWqT',
      theme: 'dark',
      compact: true,
    },
    defaultSize: { w: 4, h: 2 },
  },
  {
    id: '6',
    type: 'youtube',
    data: {
      type: 'video',
      videoId: 'dQw4w9WgXcQ',
    },
    defaultSize: { w: 4, h: 4 },
  },
  {
    id: '7',
    type: 'link',
    data: {
      url: 'https://example.com',
      title: 'My Portfolio',
      description: 'Check out my work and projects',
      favicon: 'https://example.com/favicon.ico',
    },
    defaultSize: { w: 4, h: 2 },
  },
  {
    id: '8',
    type: 'instagram',
    data: {
      platform: 'instagram',
      username: 'demo',
      url: 'https://instagram.com/demo',
    },
    defaultSize: { w: 2, h: 2 },
  },
  {
    id: '9',
    type: 'linkedin',
    data: {
      platform: 'linkedin',
      username: 'demo',
      url: 'https://linkedin.com/in/demo',
    },
    defaultSize: { w: 2, h: 2 },
  },
];

export default function DemoPage() {
  return (
    <BentoPage
      username="demo"
      name="Demo User"
      bio="This is a demo Bento page. Create your own!"
      layout={demoLayout}
      widgets={demoWidgets}
      theme="dark"
    />
  );
}
