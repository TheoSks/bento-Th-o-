'use client';

import Image from 'next/image';
import { ImageWidgetData } from '@/types';

interface ImageWidgetProps {
  data: ImageWidgetData;
}

export function ImageWidget({ data }: ImageWidgetProps) {
  const content = (
    <div className="image-widget group">
      <Image
        src={data.src}
        alt={data.alt || ''}
        fill
        className={`transition-transform group-hover:scale-105 ${
          data.objectFit === 'contain'
            ? 'object-contain'
            : data.objectFit === 'fill'
            ? 'object-fill'
            : 'object-cover'
        }`}
      />
    </div>
  );

  if (data.link) {
    return (
      <a href={data.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
