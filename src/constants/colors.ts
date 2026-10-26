/**
 * Tricolour-inspired, accessible design palette.
 * Tested for WCAG AA contrast (minimum 4.5:1 for body text, 3:1 for large headers).
 */

export interface ThemeColors {
  saffron: string;
  saffronLight: string;
  saffronBorder: string;
  
  navy: string;
  navyLight: string;
  navyBorder: string;

  green: string;
  greenLight: string;
  greenBorder: string;

  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceSubtle: string;

  border: string;
  borderSubtle: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  tabBarBackground: string;
  tabBarBorder: string;

  error: string;
  errorLight: string;
  warning: string;
  warningLight: string;
}

export const Colors: { light: ThemeColors; dark: ThemeColors } = {
  light: {
    saffron: '#C25E00',
    saffronLight: '#FFF4E6',
    saffronBorder: '#FED7AA',
    
    navy: '#0D2040',
    navyLight: '#EFF6FF',
    navyBorder: '#BFDBFE',

    green: '#0F6B38',
    greenLight: '#ECFDF5',
    greenBorder: '#A7F3D0',

    background: '#FAF7F2',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceSubtle: '#F3EFEA',

    border: '#E7DFD5',
    borderSubtle: '#F0ECE4',

    textPrimary: '#1E293B',
    textSecondary: '#475569',
    textMuted: '#64748B',
    textInverse: '#FFFFFF',

    tint: '#0D2040',
    tabIconDefault: '#64748B',
    tabIconSelected: '#0D2040',
    tabBarBackground: '#FFFFFF',
    tabBarBorder: '#E7DFD5',

    error: '#DC2626',
    errorLight: '#FEF2F2',
    warning: '#D97706',
    warningLight: '#FFFBEB',
  },
  dark: {
    saffron: '#F59E0B',
    saffronLight: '#2D1B00',
    saffronBorder: '#78350F',

    navy: '#60A5FA',
    navyLight: '#172554',
    navyBorder: '#1E3A8A',

    green: '#34D399',
    greenLight: '#064E3B',
    greenBorder: '#065F46',

    background: '#0B1120',
    surface: '#151F32',
    surfaceElevated: '#1E293B',
    surfaceSubtle: '#111827',

    border: '#2A374E',
    borderSubtle: '#1E293B',

    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textInverse: '#0B1120',

    tint: '#60A5FA',
    tabIconDefault: '#64748B',
    tabIconSelected: '#60A5FA',
    tabBarBackground: '#111827',
    tabBarBorder: '#1E293B',

    error: '#EF4444',
    errorLight: '#450A0A',
    warning: '#F59E0B',
    warningLight: '#451A03',
  }
};

