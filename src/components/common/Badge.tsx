import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { useSettings } from '@/context/SettingsContext';
import { Spacing, BorderRadius } from '@/constants/layout';

export type BadgeVariant = 'saffron' | 'navy' | 'green' | 'neutral' | 'error';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export function Badge({ label, variant = 'navy', style }: BadgeProps) {
  const { colors } = useSettings();

  let bg = colors.navyLight;
  let border = colors.navyBorder;
  let text = colors.navy;

  switch (variant) {
    case 'saffron':
      bg = colors.saffronLight;
      border = colors.saffronBorder;
      text = colors.saffron;
      break;
    case 'green':
      bg = colors.greenLight;
      border = colors.greenBorder;
      text = colors.green;
      break;
    case 'error':
      bg = colors.errorLight;
      border = colors.error;
      text = colors.error;
      break;
    case 'neutral':
      bg = colors.surfaceSubtle;
      border = colors.border;
      text = colors.textSecondary;
      break;
    case 'navy':
    default:
      bg = colors.navyLight;
      border = colors.navyBorder;
      text = colors.navy;
      break;
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg, borderColor: border }, style]}>
      <ThemedText style={[styles.text, { color: text }]}>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: BorderRadius.round,
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

