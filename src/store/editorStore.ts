import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Layout, Widget, WidgetData, widgetSizes, WidgetSize } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface EditorState {
  layout: Layout;
  widgets: Widget[];
  selectedWidget: string | null;
  isDirty: boolean;
  isEditing: boolean;
  theme: 'light' | 'dark';

  // Actions
  updateLayout: (layout: Layout) => void;
  addWidget: (type: Widget['type'], data: WidgetData, size?: WidgetSize) => void;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, data: Partial<Widget>) => void;
  updateWidgetData: (id: string, data: Partial<WidgetData>) => void;
  selectWidget: (id: string | null) => void;
  setEditing: (isEditing: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  save: () => Promise<void>;
  load: (data: { layout: Layout; widgets: Widget[] }) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      layout: [],
      widgets: [],
      selectedWidget: null,
      isDirty: false,
      isEditing: false,
      theme: 'dark',

      updateLayout: (layout) => set({ layout, isDirty: true }),

      addWidget: (type, data, size = 'small') => {
        const id = uuidv4();
        const defaultSize = widgetSizes[size];

        const newWidget: Widget = {
          id,
          type,
          data,
          defaultSize,
        };

        const newLayoutItem = {
          i: id,
          x: 0,
          y: Infinity,
          w: defaultSize.w,
          h: defaultSize.h,
          minW: 2,
          minH: 2,
        };

        set((state) => ({
          widgets: [...state.widgets, newWidget],
          layout: [...state.layout, newLayoutItem],
          isDirty: true,
          selectedWidget: id,
        }));
      },

      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
          layout: state.layout.filter((l) => l.i !== id),
          isDirty: true,
          selectedWidget: state.selectedWidget === id ? null : state.selectedWidget,
        })),

      updateWidget: (id, data) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, ...data } : w
          ),
          isDirty: true,
        })),

      updateWidgetData: (id, data) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, data: { ...w.data, ...data } as WidgetData } : w
          ),
          isDirty: true,
        })),

      selectWidget: (id) => set({ selectedWidget: id }),

      setEditing: (isEditing) => set({ isEditing }),

      setTheme: (theme) => set({ theme, isDirty: true }),

      save: async () => {
        const { layout, widgets, theme } = get();
        try {
          await fetch('/api/bento/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ layout, widgets, theme }),
          });
          set({ isDirty: false });
        } catch (error) {
          console.error('Failed to save:', error);
          throw error;
        }
      },

      load: (data) =>
        set({
          layout: data.layout,
          widgets: data.widgets,
          isDirty: false,
        }),

      reset: () =>
        set({
          layout: [],
          widgets: [],
          selectedWidget: null,
          isDirty: false,
        }),
    }),
    {
      name: 'bento-editor',
      partialize: (state) => ({
        layout: state.layout,
        widgets: state.widgets,
        theme: state.theme,
      }),
    }
  )
);
