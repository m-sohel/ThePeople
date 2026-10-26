import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { SearchBar } from '@/components/common/SearchBar';
import { DailyArticleCard } from '@/components/home/DailyArticleCard';
import { PreambleHero } from '@/components/home/PreambleHero';
import { QuickAccessGrid } from '@/components/home/QuickAccessGrid';
import { KeyRightsCarousel } from '@/components/home/KeyRightsCarousel';
import { useSettings } from '@/context/SettingsContext';
import { useConstitution } from '@/hooks/useConstitution';
import { useTranslation } from '@/i18n';
import { Spacing, BorderRadius } from '@/constants/layout';

export default function HomeScreen() {
  const router = useRouter();
  const { colors, fontScale, setFontScale, setThemeMode, isDark } = useSettings();
  const { dailyArticle, metadata } = useConstitution();
  const { t } = useTranslation();

  return (
    <ThemedView variant="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Tricolour Accent Line */}
        <View style={styles.tricolourStrip}>
          <View style={[styles.colourBand, { backgroundColor: '#FF9933' }]} />
          <View style={[styles.colourBand, { backgroundColor: '#FFFFFF' }]} />
          <View style={[styles.colourBand, { backgroundColor: '#138808' }]} />
        </View>

        {/* Top Header */}
        <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
          <View>
            <ThemedText variant="caption" color="saffron" style={styles.appSuper}>
              {t('home.superTitle')}
            </ThemedText>
            <ThemedText variant="h1" color="navy">
              {t('home.appTitle')}
            </ThemedText>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.iconButton, { borderColor: colors.border, backgroundColor: colors.surfaceSubtle }]}
              onPress={() => setThemeMode(isDark ? 'light' : 'dark')}
              accessibilityRole="button"
              accessibilityLabel="Toggle Dark/Light Mode">
              <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={20} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, { borderColor: colors.border, backgroundColor: colors.surfaceSubtle }]}
              onPress={() => {
                const nextScale = fontScale === 'normal' ? 'large' : fontScale === 'large' ? 'extra-large' : 'normal';
                setFontScale(nextScale);
              }}
              accessibilityRole="button"
              accessibilityLabel="Cycle Font Scale">
              <ThemedText style={{ fontWeight: '700', fontSize: 14 }}>
                {fontScale === 'normal' ? 'A' : fontScale === 'large' ? 'A+' : 'A++'}
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, { borderColor: colors.border, backgroundColor: colors.surfaceSubtle }]}
              onPress={() => router.push('/settings' as any)}
              accessibilityRole="button"
              accessibilityLabel="Open Settings">
              <Ionicons name="settings-outline" size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Instant Search Bar Trigger */}
          <SearchBar onPress={() => router.push('/search' as any)} />

          {/* Daily Featured Article */}
          <DailyArticleCard article={dailyArticle} />

          {/* Key Civic Rights Carousel */}
          <KeyRightsCarousel />

          {/* Preamble Hero Card */}
          <PreambleHero />

          {/* Category Gateway */}
          <QuickAccessGrid />

          {/* Footer Metadata */}
          <View style={[styles.footerCard, { borderColor: colors.border, backgroundColor: colors.surfaceSubtle }]}>
            <Ionicons name="information-circle-outline" size={20} color={colors.navy} />
            <View style={styles.footerText}>
              <ThemedText variant="caption" color="primary" style={{ fontWeight: '600' }}>
                {metadata.title} ({metadata.officialDate})
              </ThemedText>
              <ThemedText variant="caption" color="secondary">
                {metadata.source} • All text verified
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  tricolourStrip: {
    height: 4,
    flexDirection: 'row',
    width: '100%',
  },
  colourBand: {
    flex: 1,
    height: '100%',
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  appSuper: {
    letterSpacing: 1.2,
    fontWeight: '700',
    fontSize: 11,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.xl,
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: StyleSheet.hairlineWidth,
    gap: Spacing.sm,
    marginTop: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  footerText: {
    flex: 1,
    gap: 2,
  },
});
