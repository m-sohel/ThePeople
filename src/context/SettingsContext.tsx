import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useSyncExternalStore } from 'react';
import { useColorScheme, Platform } from 'react-native';
import { ThemeMode, FontScale, Language } from '@/types/constitution';
import { Colors, ThemeColors } from '@/constants/colors';
import { FontScaleMultipliers } from '@/constants/typography';
import { getItem, setItem, StorageKeys } from '@/utils/storage';

interface SettingsState {
  themeMode: ThemeMode;
  fontScale: FontScale;
  language: Language;
}

interface SettingsContextValue extends SettingsState {
  isDark: boolean;
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setFontScale: (scale: FontScale) => Promise<void>;
  setLanguage: (lang: Language) => Promise<void>;
  scaleFont: (baseSize: number) => number;
}

const DEFAULT_SETTINGS: SettingsState = {
  themeMode: 'system',
  fontScale: 'normal',
  language: 'en',
};

// React 19 standard subscription to safely distinguish client from SSR without cascading renders
const emptySubscribe = () => () => {};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const isClientHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    async function loadSettings() {
      const saved = await getItem<SettingsState>(StorageKeys.SETTINGS, DEFAULT_SETTINGS);
      setSettings(saved);
    }
    loadSettings();
  }, []);

  const isDark = useMemo(() => {
    // Prevent SSR hydration mismatch on web by using deterministic initial render
    if (Platform.OS === 'web' && !isClientHydrated) {
      return false;
    }
    if (settings.themeMode === 'system') {
      return systemScheme === 'dark';
    }
    return settings.themeMode === 'dark';
  }, [isClientHydrated, settings.themeMode, systemScheme]);

  const colors = useMemo(() => {
    return isDark ? Colors.dark : Colors.light;
  }, [isDark]);

  const scaleFont = useCallback((baseSize: number) => {
    const multiplier = FontScaleMultipliers[settings.fontScale] || 1.0;
    return Math.round(baseSize * multiplier);
  }, [settings.fontScale]);

  const setThemeMode = useCallback(async (themeMode: ThemeMode) => {
    setSettings(prev => {
      const updated = { ...prev, themeMode };
      setItem(StorageKeys.SETTINGS, updated);
      return updated;
    });
  }, []);

  const setFontScale = useCallback(async (fontScale: FontScale) => {
    setSettings(prev => {
      const updated = { ...prev, fontScale };
      setItem(StorageKeys.SETTINGS, updated);
      return updated;
    });
  }, []);

  const setLanguage = useCallback(async (language: Language) => {
    setSettings(prev => {
      const updated = { ...prev, language };
      setItem(StorageKeys.SETTINGS, updated);
      return updated;
    });
  }, []);

  const value = useMemo(
    () => ({
      ...settings,
      isDark,
      colors,
      setThemeMode,
      setFontScale,
      setLanguage,
      scaleFont,
    }),
    [settings, isDark, colors, setThemeMode, setFontScale, setLanguage, scaleFont]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

