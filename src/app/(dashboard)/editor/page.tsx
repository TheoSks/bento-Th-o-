'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BentoEditor, WidgetPicker, WidgetSettings } from '@/components/editor';
import { useEditorStore } from '@/store/editorStore';
import { useAutoSave } from '@/hooks/useAutoSave';

export default function EditorPage() {
  const [isWidgetPickerOpen, setIsWidgetPickerOpen] = useState(false);
  const { selectedWidget, widgets, selectWidget, theme, setTheme, isDirty } = useEditorStore();
  const { save } = useAutoSave(true);

  const selectedWidgetData = widgets.find((w) => w.id === selectedWidget) || null;

  return (
    <div className={`min-h-screen bg-background ${theme}`}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-secondary/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Bento Editor
            </h1>
            {isDirty && (
              <span className="text-xs text-muted">Unsaved changes</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-10 h-10 rounded-full bg-widget-bg flex items-center justify-center hover:bg-opacity-80 transition-colors"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWidgetPickerOpen(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              + Add Widget
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => save()}
              className="px-4 py-2 bg-widget-bg rounded-lg font-medium hover:bg-opacity-80 transition-colors border border-border"
            >
              💾 Save
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex">
        {/* Editor area */}
        <main className="flex-1 editor-container">
          <div className="max-w-7xl mx-auto py-8">
            {widgets.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <p className="text-muted text-lg mb-4">
                  Your Bento is empty. Start adding widgets!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWidgetPickerOpen(true)}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  + Add Your First Widget
                </motion.button>
              </motion.div>
            ) : (
              <BentoEditor />
            )}
          </div>
        </main>

        {/* Settings sidebar */}
        {selectedWidgetData && (
          <aside className="w-80 p-4 border-l border-border">
            <WidgetSettings
              widget={selectedWidgetData}
              onClose={() => selectWidget(null)}
            />
          </aside>
        )}
      </div>

      {/* Widget picker modal */}
      <WidgetPicker
        isOpen={isWidgetPickerOpen}
        onClose={() => setIsWidgetPickerOpen(false)}
      />
    </div>
  );
}
