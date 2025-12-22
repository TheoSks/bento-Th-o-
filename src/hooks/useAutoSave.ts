'use client';

import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useEditorStore } from '@/store/editorStore';

export function useAutoSave(enabled: boolean = true) {
  const { isDirty, save } = useEditorStore();

  const debouncedSave = useDebouncedCallback(async () => {
    if (isDirty && enabled) {
      try {
        await save();
        console.log('Auto-saved successfully');
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }
  }, 2000);

  useEffect(() => {
    if (isDirty && enabled) {
      debouncedSave();
    }
  }, [isDirty, enabled, debouncedSave]);

  return { save, isDirty };
}
