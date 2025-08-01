import { themeConfigs, ThemeConfig } from "./theme-mappings";

export function getTheme(themeId: string): ThemeConfig | undefined {
  return themeConfigs[themeId];
}

export function applyTheme(themeId: string) {
  const theme = getTheme(themeId);
  if (!theme) return;

  const element = document.documentElement;
  // You can apply styles here if needed, for example:
  // element.style.setProperty('--background-color', theme.exportStyles.background);
  // element.style.setProperty('--text-color', theme.exportStyles.text.primary);
}

export function getAvailableThemes(): ThemeConfig[] {
  return Object.values(themeConfigs);
}