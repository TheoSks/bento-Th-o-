'use client';

import Image from 'next/image';
import { LinkWidgetData } from '@/types';

interface LinkWidgetProps {
  data: LinkWidgetData;
}

export function LinkWidget({ data }: LinkWidgetProps) {
  const domain = data.url ? new URL(data.url).hostname.replace('www.', '') : '';

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-widget group"
    >
      {data.thumbnail && (
        <div className="thumbnail">
          <Image
            src={data.thumbnail}
            alt={data.title || ''}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="content">
        <div className="header">
          {data.favicon && (
            <Image
              src={data.favicon}
              alt=""
              width={16}
              height={16}
              className="favicon"
            />
          )}
          <span className="title">{data.title || domain}</span>
        </div>
        {data.description && (
          <p className="description">{data.description}</p>
        )}
      </div>
    </a>
  );
}
