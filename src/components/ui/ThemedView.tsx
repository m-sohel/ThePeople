import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useSettings } from '@/context/SettingsContext';

export interface ThemedViewProps extends ViewProps {
  variant?: 'background' | 'surface' | 'surfaceSubtle' | 'surfaceElevated';
  withBorder?: boolean;
}

export function ThemedView({
  variant = 'background',
  withBorder = false,
  style,
  children,
  ...rest
}: ThemedViewProps) {
  const { colors } = useSettings();

  let backgroundColor = colors.background;
  switch (variant) {
    case 'surface':
      backgroundColor = colors.surface;
      break;
    case 'surfaceSubtle':
      backgroundColor = colors.surfaceSubtle;
      break;
    case 'surfaceElevated':
      backgroundColor = colors.surfaceElevated;
      break;
    case 'background':
    default:
      backgroundColor = colors.background;
      break;
  }

  return (
    <View
      style={[
        {
          backgroundColor,
          borderColor: withBorder ? colors.border : undefined,
          borderWidth: withBorder ? StyleSheet.hairlineWidth : undefined,
        },
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
}

