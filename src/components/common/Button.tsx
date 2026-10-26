import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { useSettings } from '@/context/SettingsContext';
import { Spacing, BorderRadius, Accessibility } from '@/constants/layout';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  accessibilityLabel,
  style,
  textStyle,
}: ButtonProps) {
  const { colors } = useSettings();

  let bg = colors.navy;
  let textColor = colors.textInverse;
  let borderColor = 'transparent';

  switch (variant) {
    case 'secondary':
      bg = colors.saffron;
      textColor = '#FFFFFF';
      break;
    case 'outline':
      bg = 'transparent';
      textColor = colors.navy;
      borderColor = colors.navy;
      break;
    case 'ghost':
      bg = 'transparent';
      textColor = colors.textPrimary;
      break;
    case 'primary':
    default:
      bg = colors.navy;
      textColor = colors.textInverse;
      break;
  }

  if (disabled) {
    bg = colors.surfaceSubtle;
    textColor = colors.textMuted;
    borderColor = colors.border;
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: bg,
          borderColor,
          borderWidth: variant === 'outline' || disabled ? 1 : 0,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: disabled || loading }}>
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {icon}
          <ThemedText style={[styles.text, { color: textColor }, textStyle ?? {}]}>{title}</ThemedText>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: Accessibility.minTouchTarget,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
