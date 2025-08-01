import { useState, useEffect } from 'react';
import { getTheme, applyTheme, getAvailableThemes } from '@/lib/themes/theme-utils';
import type { ThemeConfig } from '@/lib/themes/theme-mappings';

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<string>('minimal');
  const [availableThemes] = useState<ThemeConfig[]>(getAvailableThemes());

  useEffect(() => {
    const savedThemeId = localStorage.getItem('selected-theme');
    if (savedThemeId && availableThemes.some(t => t.id === savedThemeId)) {
      setCurrentTheme(savedThemeId);
      applyTheme(savedThemeId);
    }
  }, [availableThemes]);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
    localStorage.setItem('selected-theme', themeId);
  };

  return {
    currentTheme,
    availableThemes,
    changeTheme,
    getTheme: () => getTheme(currentTheme),
  };
}