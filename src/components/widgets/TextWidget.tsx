'use client';

import { TextWidgetData } from '@/types';

interface TextWidgetProps {
  data: TextWidgetData;
}

export function TextWidget({ data }: TextWidgetProps) {
  return (
    <div
      className={`text-widget text-${data.fontSize || 'md'} text-${
        data.align || 'center'
      }`}
    >
      {data.content}
    </div>
  );
}
