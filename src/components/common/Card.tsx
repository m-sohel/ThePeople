import React from 'react';
import { View, StyleSheet, ViewProps, TouchableOpacity } from 'react-native';
import { useSettings } from '@/context/SettingsContext';
import { Spacing, BorderRadius } from '@/constants/layout';

export interface CardProps extends ViewProps {
  onPress?: () => void;
  variant?: 'surface' | 'surfaceElevated' | 'surfaceSubtle';
  bordered?: boolean;
}

export function Card({
  children,
  onPress,
  variant = 'surface',
  bordered = true,
  style,
  ...rest
}: CardProps) {
  const { colors, isDark } = useSettings();

  const cardBackground =
    variant === 'surfaceElevated'
      ? colors.surfaceElevated
      : variant === 'surfaceSubtle'
      ? colors.surfaceSubtle
      : colors.surface;

  const cardStyle = [
    styles.card,
    {
      backgroundColor: cardBackground,
      borderColor: bordered ? colors.border : 'transparent',
      borderWidth: bordered ? StyleSheet.hairlineWidth : 0,
      shadowColor: isDark ? '#000000' : '#475569',
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        {...rest}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});

