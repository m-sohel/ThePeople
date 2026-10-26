import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from '@/i18n';
import { Spacing, BorderRadius, Accessibility } from '@/constants/layout';

export default function SettingsScreen() {
  const { themeMode, setThemeMode, fontScale, setFontScale, language, setLanguage, colors } = useSettings();
  const { t } = useTranslation();

  const handleOpenGithub = async () => {
    try {
      await Linking.openURL('https://github.com/m-sohel/');
    } catch (error) {
      console.warn('Failed to open GitHub profile:', error);
    }
  };

  return (
    <ThemedView variant="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Header title={t('settings.title')} subtitle={t('settings.subtitle')} showBack />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* SECTION 1: LANGUAGE SELECTION */}
          <Card variant="surfaceElevated" style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="language" size={20} color={colors.green} />
              <ThemedText variant="h3" color="navy">
                {t('settings.language')}
              </ThemedText>
            </View>
            <ThemedText variant="bodySmall" color="secondary">
              Select your preferred language for navigation, categories, and citizen guides.
            </ThemedText>

            <View style={styles.optionsGrid}>
              {[
                { code: 'en' as const, label: 'English', sub: 'Default' },
                { code: 'hi' as const, label: 'हिंदी (Hindi)', sub: 'भारतीय राजभाषा' },
              ].map(item => {
                const isSelected = language === item.code;
                return (
                  <TouchableOpacity
                    key={item.code}
                    style={[
                      styles.langCard,
                      {
                        backgroundColor: isSelected ? colors.greenLight : colors.surfaceSubtle,
                        borderColor: isSelected ? colors.green : colors.border,
                      },
                    ]}
                    onPress={() => setLanguage(item.code)}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: isSelected }}
                    accessibilityLabel={item.label}>
                    <View style={styles.langLeft}>
                      <ThemedText
                        variant="bodyLarge"
                        color={isSelected ? 'green' : 'primary'}
                        style={{ fontWeight: isSelected ? '700' : '500' }}>
                        {item.label}
                      </ThemedText>
                      <ThemedText variant="caption" color="muted">
                        {item.sub}
                      </ThemedText>
                    </View>
                    {isSelected && <Ionicons name="checkmark-circle" size={20} color={colors.green} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>

          {/* SECTION 2: APPEARANCE (THEME) */}
          <Card variant="surfaceElevated" style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="color-palette-outline" size={20} color={colors.saffron} />
              <ThemedText variant="h3" color="navy">
                {t('settings.appearance')}
              </ThemedText>
            </View>

            <View style={styles.themeOptionsRow}>
              {[
                { mode: 'system' as const, label: 'System', icon: 'phone-portrait-outline' as const },
                { mode: 'light' as const, label: 'Light', icon: 'sunny-outline' as const },
                { mode: 'dark' as const, label: 'Dark', icon: 'moon-outline' as const },
              ].map(item => {
                const isSelected = themeMode === item.mode;
                return (
                  <TouchableOpacity
                    key={item.mode}
                    style={[
                      styles.themeCard,
                      {
                        backgroundColor: isSelected ? colors.saffronLight : colors.surfaceSubtle,
                        borderColor: isSelected ? colors.saffron : colors.border,
                      },
                    ]}
                    onPress={() => setThemeMode(item.mode)}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: isSelected }}
                    accessibilityLabel={`${item.label} theme`}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={isSelected ? colors.saffron : colors.textSecondary}
                    />
                    <ThemedText
                      variant="label"
                      color={isSelected ? 'saffron' : 'secondary'}
                      style={{ fontWeight: isSelected ? '700' : '500' }}>
                      {item.label}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>

          {/* SECTION 3: ACCESSIBILITY & TEXT SIZING */}
          <Card variant="surfaceElevated" style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="text" size={20} color={colors.navy} />
              <ThemedText variant="h3" color="navy">
                {t('settings.textSize')}
              </ThemedText>
            </View>
            <ThemedText variant="bodySmall" color="secondary">
              Recommended for elderly citizens and comfortable long-form constitutional reading.
            </ThemedText>

            <View style={styles.scaleOptionsRow}>
              {[
                { scale: 'normal' as const, label: 'Standard', size: '16px' },
                { scale: 'large' as const, label: 'Large', size: '18px' },
                { scale: 'extra-large' as const, label: 'Extra Large', size: '22px' },
              ].map(item => {
                const isSelected = fontScale === item.scale;
                return (
                  <TouchableOpacity
                    key={item.scale}
                    style={[
                      styles.scaleCard,
                      {
                        backgroundColor: isSelected ? colors.navyLight : colors.surfaceSubtle,
                        borderColor: isSelected ? colors.navy : colors.border,
                      },
                    ]}
                    onPress={() => setFontScale(item.scale)}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: isSelected }}
                    accessibilityLabel={`${item.label} text size`}>
                    <ThemedText
                      variant="h3"
                      color={isSelected ? 'navy' : 'secondary'}
                      style={{ fontWeight: '700' }}>
                      A
                    </ThemedText>
                    <ThemedText
                      variant="label"
                      color={isSelected ? 'navy' : 'secondary'}
                      style={{ fontWeight: isSelected ? '700' : '500' }}>
                      {item.label}
                    </ThemedText>
                    <ThemedText variant="caption" color="muted">
                      {item.size}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Live Interactive Preview Box */}
            <View
              style={[
                styles.previewContainer,
                { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
              ]}>
              <ThemedText variant="caption" color="saffron" style={{ fontWeight: '700' }}>
                {t('settings.previewHeading').toUpperCase()}
              </ThemedText>
              <ThemedText variant="body" color="primary" style={styles.previewContent}>
                {t('settings.previewText')}
              </ThemedText>
              <ThemedText variant="legalText" color="secondary" style={styles.previewQuote}>
                “Equality before law: The State shall not deny to any person equality before the law.” (Article 14)
              </ThemedText>
            </View>
          </Card>

          {/* SECTION 4: DEVELOPER & CREATOR */}
          <Card variant="surfaceElevated" style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="code-slash-outline" size={20} color={colors.navy} />
              <ThemedText variant="h3" color="navy">
                {t('settings.developerTitle')}
              </ThemedText>
            </View>

            <View style={styles.developerCardContent}>
              <View style={[styles.devAvatar, { backgroundColor: colors.navyLight, borderColor: colors.navyBorder }]}>
                <Ionicons name="person" size={24} color={colors.navy} />
              </View>
              <View style={styles.devMeta}>
                <ThemedText variant="bodyLarge" color="primary" style={{ fontWeight: '700' }}>
                  {t('settings.developerName')}
                </ThemedText>
                <ThemedText variant="bodySmall" color="secondary" style={styles.devBio}>
                  {t('settings.developerBio')}
                </ThemedText>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.githubButton,
                { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
              ]}
              onPress={handleOpenGithub}
              accessibilityRole="link"
              accessibilityLabel={`${t('settings.developerLinkText')} - Opens GitHub profile of M. Sohel`}>
              <View style={styles.githubButtonLeft}>
                <Ionicons name="logo-github" size={22} color={colors.textPrimary} />
                <ThemedText variant="label" color="primary" style={{ fontWeight: '600' }}>
                  {t('settings.developerLinkText')}
                </ThemedText>
              </View>
              <Ionicons name="open-outline" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </Card>

          {/* SECTION 5: OFFICIAL SOURCE & DISCLAIMER */}
          <Card variant="surfaceElevated" style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.saffron} />
              <ThemedText variant="h3" color="navy">
                {t('settings.disclaimerTitle')}
              </ThemedText>
            </View>

            <View style={styles.disclaimerBadgeRow}>
              <Badge label={t('settings.disclaimerBadge')} variant="saffron" />
            </View>

            {/* Callout 1: Official Source */}
            <View
              style={[
                styles.disclaimerCallout,
                { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
              ]}>
              <View style={styles.disclaimerCalloutHeader}>
                <Ionicons name="book-outline" size={18} color={colors.green} />
                <ThemedText variant="label" color="green" style={{ fontWeight: '700' }}>
                  Verbatim Official Source
                </ThemedText>
              </View>
              <ThemedText variant="bodySmall" color="secondary" style={styles.disclaimerText}>
                {t('settings.disclaimerSource')}
              </ThemedText>
            </View>

            {/* Callout 2: Non-Governmental */}
            <View
              style={[
                styles.disclaimerCallout,
                { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
              ]}>
              <View style={styles.disclaimerCalloutHeader}>
                <Ionicons name="information-circle-outline" size={18} color={colors.navy} />
                <ThemedText variant="label" color="navy" style={{ fontWeight: '700' }}>
                  Independent Civic Initiative
                </ThemedText>
              </View>
              <ThemedText variant="bodySmall" color="secondary" style={styles.disclaimerText}>
                {t('settings.disclaimerNonGov')}
              </ThemedText>
            </View>

            {/* Callout 3: Educational Advice */}
            <View
              style={[
                styles.disclaimerCallout,
                { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
              ]}>
              <View style={styles.disclaimerCalloutHeader}>
                <Ionicons name="scale-outline" size={18} color={colors.saffron} />
                <ThemedText variant="label" color="saffron" style={{ fontWeight: '700' }}>
                  Educational Notice
                </ThemedText>
              </View>
              <ThemedText variant="bodySmall" color="secondary" style={styles.disclaimerText}>
                {t('settings.disclaimerAdvice')}
              </ThemedText>
            </View>
          </Card>

          {/* SECTION 6: CONSTITUTIONAL ARCHIVES & ABOUT */}
          <Card variant="surface" style={styles.aboutCard}>
            <View style={styles.aboutBadgeRow}>
              <Badge label="OFFICIAL ARCHIVE" variant="saffron" />
              <Badge label="WCAG AA COMPLIANT" variant="green" />
            </View>

            <ThemedText variant="h2" color="navy">
              {t('settings.aboutTitle')}
            </ThemedText>
            <ThemedText variant="body" color="secondary" style={styles.aboutBody}>
              {t('settings.aboutDesc')}
            </ThemedText>

            <View style={[styles.statRow, { borderColor: colors.border }]}>
              <View style={styles.statCol}>
                <ThemedText variant="h3" color="navy">
                  500
                </ThemedText>
                <ThemedText variant="caption" color="muted">
                  Articles
                </ThemedText>
              </View>
              <View style={styles.statCol}>
                <ThemedText variant="h3" color="saffron">
                  26
                </ThemedText>
                <ThemedText variant="caption" color="muted">
                  Parts
                </ThemedText>
              </View>
              <View style={styles.statCol}>
                <ThemedText variant="h3" color="green">
                  12
                </ThemedText>
                <ThemedText variant="caption" color="muted">
                  Schedules
                </ThemedText>
              </View>
            </View>

            <ThemedText variant="caption" color="muted" style={styles.sourceCaption}>
              {t('settings.sourceText')}{'\n'}
              Text verified with 100% legal fidelity. Version 1.0.0
            </ThemedText>
          </Card>
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
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  sectionCard: {
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  optionsGrid: {
    gap: Spacing.sm,
  },
  langCard: {
    minHeight: Accessibility.minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  langLeft: {
    gap: 2,
  },
  themeOptionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  themeCard: {
    flex: 1,
    minHeight: Accessibility.minTouchTarget + 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    gap: Spacing.xs,
  },
  scaleOptionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  scaleCard: {
    flex: 1,
    minHeight: Accessibility.minTouchTarget + 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    gap: 2,
  },
  previewContainer: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  previewContent: {
    lineHeight: 22,
  },
  previewQuote: {
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 22,
  },
  aboutCard: {
    gap: Spacing.sm,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  aboutBadgeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  aboutBody: {
    lineHeight: 24,
  },
  statRow: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.md,
    marginVertical: Spacing.xs,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  sourceCaption: {
    lineHeight: 18,
  },
  developerCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  devAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  devMeta: {
    flex: 1,
    gap: 2,
  },
  devBio: {
    lineHeight: 18,
  },
  githubButton: {
    minHeight: Accessibility.minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    marginTop: Spacing.xs,
  },
  githubButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  disclaimerBadgeRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  disclaimerCallout: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  disclaimerCalloutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  disclaimerText: {
    lineHeight: 20,
  },
});
