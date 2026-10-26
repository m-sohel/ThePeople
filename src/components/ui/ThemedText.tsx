import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useSettings } from '@/context/SettingsContext';
import { BaseTypography } from '@/constants/typography';

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bodyLarge'
  | 'body'
  | 'bodyMedium'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'legalText';

export type TextColorVariant =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'saffron'
  | 'navy'
  | 'green'
  | 'inverse'
  | 'error';

export interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: TextColorVariant;
  style?: TextStyle | TextStyle[];
}

export function ThemedText({
  variant = 'body',
  color = 'primary',
  style,
  children,
  ...rest
}: ThemedTextProps) {
  const { colors, scaleFont } = useSettings();
  const baseStyle = BaseTypography[variant];

  // Resolve color token
  let resolvedColor = colors.textPrimary;
  switch (color) {
    case 'secondary':
      resolvedColor = colors.textSecondary;
      break;
    case 'muted':
      resolvedColor = colors.textMuted;
      break;
    case 'saffron':
      resolvedColor = colors.saffron;
      break;
    case 'navy':
      resolvedColor = colors.navy;
      break;
    case 'green':
      resolvedColor = colors.green;
      break;
    case 'inverse':
      resolvedColor = colors.textInverse;
      break;
    case 'error':
      resolvedColor = colors.error;
      break;
    case 'primary':
    default:
      resolvedColor = colors.textPrimary;
      break;
  }

  const scaledFontSize = scaleFont(baseStyle.fontSize);
  const scaledLineHeight = Math.round(baseStyle.lineHeight * (scaledFontSize / baseStyle.fontSize));

  return (
    <Text
      style={[
        {
          fontSize: scaledFontSize,
          lineHeight: scaledLineHeight,
          fontWeight: baseStyle.fontWeight,
          letterSpacing: 'letterSpacing' in baseStyle ? baseStyle.letterSpacing : undefined,
          color: resolvedColor,
        },
        style,
      ]}
      accessibilityRole="text"
      {...rest}>
      {children}
    </Text>
  );
}

