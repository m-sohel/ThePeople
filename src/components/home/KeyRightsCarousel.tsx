import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { Badge } from '@/components/common/Badge';
import { useSettings } from '@/context/SettingsContext';
import { useConstitution } from '@/hooks/useConstitution';
import { Spacing, BorderRadius } from '@/constants/layout';

export function KeyRightsCarousel() {
  const router = useRouter();
  const { colors } = useSettings();
  const { getFeaturedArticles } = useConstitution();
  const featured = getFeaturedArticles().slice(0, 8);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <ThemedText variant="h3" color="primary">
          Crucial Rights for Every Citizen
        </ThemedText>
        <ThemedText variant="caption" color="saffron" style={{ fontWeight: '600' }}>
          Swipe →
        </ThemedText>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}>
        {featured.map(article => (
          <TouchableOpacity
            key={article.id}
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            onPress={() => router.push(`/article/${article.id}` as any)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Article ${article.number}: ${article.title}`}>
            <View style={styles.badgeRow}>
              <Badge label={`ART. ${article.number}`} variant="saffron" />
              <ThemedText variant="caption" color="muted">
                Part III
              </ThemedText>
            </View>

            <ThemedText variant="h3" color="navy" numberOfLines={2} style={styles.title}>
              {article.title}
            </ThemedText>

            <ThemedText variant="caption" color="secondary" numberOfLines={3} style={styles.summary}>
              {article.fullText.slice(0, 140)}...
            </ThemedText>

            <View style={styles.footerRow}>
              <ThemedText variant="caption" color="saffron" style={{ fontWeight: '600' }}>
                Tap to read →
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollList: {
    paddingVertical: Spacing.xs,
    gap: Spacing.md,
  },
  card: {
    width: 240,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    gap: Spacing.sm,
    justifyContent: 'space-between',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
  },
  summary: {
    lineHeight: 18,
  },
  footerRow: {
    paddingTop: Spacing.xs,
  },
});

