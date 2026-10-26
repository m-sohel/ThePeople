import { FontScale } from '@/types/constitution';

export const FontScaleMultipliers: Record<FontScale, number> = {
  normal: 1.0,
  large: 1.15,
  'extra-large': 1.35,
};

export const BaseTypography = {
  // Headings
  display: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  
  // Body text
  bodyLarge: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500' as const,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },

  // Captions & Metadata
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  },
  legalText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400' as const,
    letterSpacing: 0.15,
  }
};

