import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { ThemedText } from '@/components/ui/ThemedText';
import { useSettings } from '@/context/SettingsContext';
import { Spacing, BorderRadius } from '@/constants/layout';

export function PreambleHero() {
  const router = useRouter();
  const { colors } = useSettings();

  return (
    <Card
      variant="surface"
      style={[styles.card, { borderLeftColor: colors.saffron, borderLeftWidth: 4 }]}
      onPress={() => router.push('/preamble' as any)}>
      <View style={styles.badgeRow}>
        <Badge label="THE GUIDING SPIRIT" variant="navy" />
        <ThemedText variant="caption" color="muted">
          Adopted 26 Nov 1949
        </ThemedText>
      </View>

      <View style={styles.quoteBox}>
        <ThemedText variant="h2" color="navy" style={styles.headline}>
          The Preamble
        </ThemedText>
        <ThemedText variant="bodyLarge" color="primary" style={styles.quoteText}>
          “WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC...”
        </ThemedText>
      </View>

      <View style={styles.valuesRow}>
        <View style={[styles.valueTag, { backgroundColor: colors.surfaceSubtle }]}>
          <ThemedText variant="caption" color="saffron" style={styles.valueText}>
            JUSTICE
          </ThemedText>
        </View>
        <View style={[styles.valueTag, { backgroundColor: colors.surfaceSubtle }]}>
          <ThemedText variant="caption" color="navy" style={styles.valueText}>
            LIBERTY
          </ThemedText>
        </View>
        <View style={[styles.valueTag, { backgroundColor: colors.surfaceSubtle }]}>
          <ThemedText variant="caption" color="green" style={styles.valueText}>
            EQUALITY
          </ThemedText>
        </View>
        <View style={[styles.valueTag, { backgroundColor: colors.surfaceSubtle }]}>
          <ThemedText variant="caption" color="primary" style={styles.valueText}>
            FRATERNITY
          </ThemedText>
        </View>
      </View>

      <View style={styles.footerRow}>
        <ThemedText variant="label" color="saffron">
          Explore Key Terms & Meanings
        </ThemedText>
        <Ionicons name="arrow-forward-circle" size={20} color={colors.saffron} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quoteBox: {
    gap: Spacing.xs,
  },
  headline: {
    letterSpacing: -0.2,
  },
  quoteText: {
    fontStyle: 'italic',
    lineHeight: 26,
  },
  valuesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  valueTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  valueText: {
    fontWeight: '700',
    letterSpacing: 0.8,
    fontSize: 11,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.xs,
  },
});
