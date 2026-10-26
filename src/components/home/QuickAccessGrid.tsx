import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/common/Card';
import { useSettings } from '@/context/SettingsContext';
import { Spacing, BorderRadius } from '@/constants/layout';

export function QuickAccessGrid() {
  const router = useRouter();
  const { colors } = useSettings();

  const items = [
    {
      id: 'rights',
      title: 'Fundamental Rights',
      subtitle: 'Articles 12 – 35',
      description: 'Equality, Freedom, Protection & Remedies',
      icon: 'shield-checkmark' as const,
      color: colors.green,
      bg: colors.greenLight,
      route: '/(tabs)/rights',
    },
    {
      id: 'duties',
      title: 'Fundamental Duties',
      subtitle: 'Article 51A (11 Duties)',
      description: 'Your civic obligations to the nation',
      icon: 'ribbon' as const,
      color: colors.saffron,
      bg: colors.saffronLight,
      route: '/(tabs)/rights',
    },
    {
      id: 'principles',
      title: 'Directive Principles',
      subtitle: 'Articles 36 – 51',
      description: 'State guidelines for a just society',
      icon: 'compass' as const,
      color: colors.navy,
      bg: colors.navyLight,
      route: '/(tabs)/rights',
    },
    {
      id: 'parts',
      title: 'All 26 Parts & Schedules',
      subtitle: '500 Articles & 12 Schedules',
      description: 'Full official compendium & chapters',
      icon: 'book' as const,
      color: colors.textPrimary,
      bg: colors.surfaceSubtle,
      route: '/(tabs)/browse',
    },
  ];

  return (
    <View style={styles.container}>
      <ThemedText variant="h3" color="primary" style={styles.heading}>
        Explore by Category
      </ThemedText>
      <View style={styles.grid}>
        {items.map(item => (
          <Card
            key={item.id}
            variant="surface"
            style={styles.card}
            onPress={() => router.push(item.route as any)}>
            <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.textContainer}>
              <ThemedText variant="label" style={{ color: item.color }}>
                {item.subtitle}
              </ThemedText>
              <ThemedText variant="h3" color="primary" style={styles.cardTitle}>
                {item.title}
              </ThemedText>
              <ThemedText variant="caption" color="secondary" numberOfLines={2}>
                {item.description}
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} style={styles.arrow} />
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  heading: {
    letterSpacing: -0.2,
  },
  grid: {
    gap: Spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  arrow: {
    marginLeft: Spacing.xs,
  },
});
