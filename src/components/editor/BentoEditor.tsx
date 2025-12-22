'use client';

import { useCallback, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const GridLayout = require('react-grid-layout');
import { useEditorStore } from '@/store/editorStore';
import { WidgetRenderer } from '@/components/widgets';
import { Layout, LayoutItem } from '@/types';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface RGLLayoutItem {
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

export function BentoEditor() {
  const {
    layout,
    widgets,
    selectedWidget,
    updateLayout,
    selectWidget,
    removeWidget,
  } = useEditorStore();

  const handleLayoutChange = useCallback(
    (newLayout: RGLLayoutItem[]) => {
      const mutableLayout: Layout = newLayout.map((item) => ({
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        minW: item.minW,
        minH: item.minH,
        maxW: item.maxW,
        maxH: item.maxH,
        static: item.static,
        isDraggable: item.isDraggable,
        isResizable: item.isResizable,
      }));
      updateLayout(mutableLayout);
    },
    [updateLayout]
  );

  const handleWidgetClick = useCallback(
    (id: string) => {
      selectWidget(id);
    },
    [selectWidget]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedWidget && (e.key === 'Delete' || e.key === 'Backspace')) {
        removeWidget(selectedWidget);
      }
      if (e.key === 'Escape') {
        selectWidget(null);
      }
    },
    [selectedWidget, removeWidget, selectWidget]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const rglLayout = layout.map((item: LayoutItem) => ({
    i: item.i,
    x: item.x,
    y: item.y,
    w: item.w,
    h: item.h,
    minW: item.minW,
    minH: item.minH,
    maxW: item.maxW,
    maxH: item.maxH,
    static: item.static,
    isDraggable: item.isDraggable,
    isResizable: item.isResizable,
  }));

  return (
    <div className="bento-editor editor-mode" style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
      <GridLayout
        className="layout"
        layout={rglLayout}
        cols={12}
        rowHeight={80}
        width={1200}
        margin={[16, 16]}
        containerPadding={[24, 24]}
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={true}
        resizeHandles={['se']}
        compactType="vertical"
        preventCollision={false}
        useCSSTransforms={true}
      >
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className={`bento-widget ${
              selectedWidget === widget.id ? 'selected' : ''
            }`}
            onClick={() => handleWidgetClick(widget.id)}
          >
            <WidgetRenderer
              widget={widget}
              isEditing={true}
              onSelect={() => handleWidgetClick(widget.id)}
            />
            {selectedWidget === widget.id && (
              <button
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  removeWidget(widget.id);
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
