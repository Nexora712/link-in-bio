"use client";

import { memo, useMemo, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import type { ThemeConfig } from "@/lib/themes/theme-mappings";

// Lazy pull of theme list without importing heavy theme objects upfront
async function loadThemeList(): Promise<Pick<ThemeConfig, 'id' | 'name' | 'description' | 'styles'>[]> {
  const mod = await import('@/lib/themes/theme-mappings');
  // themeConfigs is a record<string, ThemeConfig>
  const list = Object.values(mod.themeConfigs).map(t => ({
    id: t.id,
    name: t.name,
    description: t.description,
    styles: t.styles,
  }));
  return list;
}

interface ThemeCardProps {
  theme: Pick<ThemeConfig, 'id' | 'name' | 'description' | 'styles'>;
  selected: boolean;
}

const ThemeCard = memo(function ThemeCard({ theme, selected }: ThemeCardProps) {
  return (
    <Card
      className={`
      relative overflow-hidden transition-all duration-300 hover:scale-105
      ${selected ? "ring-2 ring-blue-500 ring-offset-2" : "hover:shadow-lg"}
    `}
    >
      <CardContent className="p-0">
        <div className={`h-24 w-full relative bg-gradient-to-br ${theme.styles.background}`}>
          {selected && (
            <div className="absolute top-2 right-2 bg-white rounded-full p-1">
              <Check className="w-4 h-4 text-blue-500" />
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm mb-1">{theme.name}</h3>
          <p className="text-xs text-gray-600 h-8">
            {theme.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
});

interface ThemeSelectorProps {
  selectedTheme?: string;
  onThemeChange?: (theme: string) => void;
}

export function ThemeSelector({
  selectedTheme = "minimal",
  onThemeChange,
}: ThemeSelectorProps) {
  const [selected, setSelected] = useState(selectedTheme);
  const [visibleCount, setVisibleCount] = useState(6);

  // Use a synchronous snapshot for first render to avoid blocking
  // The detailed theme list will be hydrated on demand via dynamic import
  const [themes, setThemes] = useState<Pick<ThemeConfig, 'id' | 'name' | 'description' | 'styles'>[] | null>(null);

  // Load themes metadata on mount without blocking TTI
  useMemo(() => {
    // Fire and forget
    loadThemeList().then(setThemes).catch(() => {
      // noop: keep null, UI still works with radio value state
      setThemes([]);
    });
  }, []);

  const handleThemeChange = useCallback((themeId: string) => {
    setSelected(themeId);
    onThemeChange?.(themeId);
    // Persist to localStorage for Builder page retrieval
    try { localStorage.setItem('selected-theme', themeId); } catch {}
  }, [onThemeChange]);

  const showMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + 6, (themes?.length ?? 0)));
  }, [themes]);

  const showLess = useCallback(() => setVisibleCount(6), []);

  const allVisible = (themes?.length ?? 0) > 0 && visibleCount >= (themes?.length ?? 0);

  return (
    <div className="space-y-4">
      <RadioGroup
        value={selected}
        onValueChange={handleThemeChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {(themes ?? []).slice(0, visibleCount).map((theme) => (
          <div key={theme.id} className="relative">
            <RadioGroupItem
              value={theme.id}
              id={theme.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={theme.id}
              className="flex flex-col cursor-pointer"
            >
              <ThemeCard theme={theme} selected={selected === theme.id} />
            </Label>
          </div>
        ))}
      </RadioGroup>

      {themes && themes.length > 6 && (
        <div className="flex justify-center">
          {!allVisible ? (
            <button
              type="button"
              onClick={showMore}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Show more
            </button>
          ) : (
            <button
              type="button"
              onClick={showLess}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
}
