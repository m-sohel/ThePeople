import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { useSettings } from '@/context/SettingsContext';
import { Spacing, BorderRadius, Accessibility } from '@/constants/layout';

export interface SearchBarProps {
  onPress: () => void;
  placeholder?: string;
}

export function SearchBar({
  onPress,
  placeholder = 'Search by Article number (e.g. 21A) or keyword...',
}: SearchBarProps) {
  const { colors } = useSettings();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceSubtle,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="search"
      accessibilityLabel="Search Constitution of India">
      <Ionicons name="search" size={20} color={colors.textSecondary} />
      <View style={styles.textContainer}>
        <ThemedText variant="bodyMedium" color="muted" numberOfLines={1}>
          {placeholder}
        </ThemedText>
      </View>
      <View style={[styles.filterBadge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons name="options-outline" size={16} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Accessibility.minTouchTarget,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  filterBadge: {
    padding: 6,
    borderRadius: BorderRadius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

