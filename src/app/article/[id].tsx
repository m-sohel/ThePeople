import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { useSettings } from '@/context/SettingsContext';
import { useBookmarks } from '@/context/BookmarksContext';
import { useConstitution } from '@/hooks/useConstitution';
import { shareArticle } from '@/utils/share';
import { getExplanationForArticle } from '@/data/article-explanations';
import { Spacing, BorderRadius, Accessibility } from '@/constants/layout';

type ViewMode = 'official' | 'simple';

export default function ArticleDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, fontScale, setFontScale } = useSettings();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { getArticle, articles } = useConstitution();

  const [viewMode, setViewMode] = useState<ViewMode>('simple');
  const [showFootnotes, setShowFootnotes] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const article = useMemo(() => {
    return getArticle(id || '');
  }, [id, getArticle]);

  // Find previous and next articles in chronological order
  const { prevArticle, nextArticle } = useMemo(() => {
    if (!article) return { prevArticle: null, nextArticle: null };
    const idx = articles.findIndex(a => a.id === article.id);
    return {
      prevArticle: idx > 0 ? articles[idx - 1] : null,
      nextArticle: idx !== -1 && idx < articles.length - 1 ? articles[idx + 1] : null,
    };
  }, [article, articles]);

  const explanation = useMemo(() => {
    if (!article) return null;
    return getExplanationForArticle(article.number, article.title, article.part);
  }, [article]);

  const bookmarked = article ? isBookmarked(article.id) : false;

  // Stop speech if screen unmounts or article changes
  useEffect(() => {
    return () => {
      Speech.stop().catch(() => {});
    };
  }, [id]);

  const handleToggleSpeech = async () => {
    if (!article) return;
    if (isSpeaking) {
      await Speech.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead =
        viewMode === 'simple' && explanation
          ? `Article ${article.number}: ${article.title}. In plain language: ${explanation.explanation}. Real life example: ${explanation.realLifeExample}.`
          : `Article ${article.number}: ${article.title}. ${article.fullText}`;

      Speech.speak(textToRead, {
        language: 'en-IN',
        rate: 0.88,
        pitch: 1.0,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  if (!article) {
    return (
      <ThemedView variant="background" style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <Header title="Article Not Found" showBack />
          <View style={styles.notFound}>
            <ThemedText variant="body" color="secondary">
              Could not find article details for {id}.
            </ThemedText>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const isOmitted = article.status === 'omitted' || article.status === 'repealed';

  return (
    <ThemedView variant="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Top Header with Bookmark, Speech, and Share actions */}
        <Header
          title={`Article ${article.number}`}
          subtitle={article.part || 'Constitution of India'}
          showBack
          rightAction={
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={[
                  styles.iconBtn,
                  {
                    backgroundColor: isSpeaking ? colors.saffronLight : colors.surfaceSubtle,
                    borderColor: isSpeaking ? colors.saffron : colors.border,
                  },
                ]}
                onPress={handleToggleSpeech}
                accessibilityRole="button"
                accessibilityLabel={isSpeaking ? 'Stop reading aloud' : 'Listen to Article read aloud'}>
                <Ionicons
                  name={isSpeaking ? 'stop-circle' : 'volume-high-outline'}
                  size={20}
                  color={isSpeaking ? colors.saffron : colors.textPrimary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconBtn, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}
                onPress={() => shareArticle(article)}
                accessibilityRole="button"
                accessibilityLabel="Share Article">
                <Ionicons name="share-social-outline" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.iconBtn,
                  {
                    backgroundColor: bookmarked ? colors.saffronLight : colors.surfaceSubtle,
                    borderColor: bookmarked ? colors.saffron : colors.border,
                  },
                ]}
                onPress={() => toggleBookmark(article)}
                accessibilityRole="button"
                accessibilityLabel={bookmarked ? 'Remove bookmark' : 'Bookmark this article'}>
                <Ionicons
                  name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={20}
                  color={bookmarked ? colors.saffron : colors.textPrimary}
                />
              </TouchableOpacity>
            </View>
          }
        />

        {/* Dynamic Font Scaler & Mode Switcher Bar */}
        <View style={[styles.controlBar, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
          {/* Dual-View Mode Switcher */}
          <View style={[styles.modeSwitch, { backgroundColor: colors.surfaceSubtle }]}>
            <TouchableOpacity
              style={[
                styles.modeTab,
                viewMode === 'simple' && { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setViewMode('simple')}
              accessibilityRole="tab"
              accessibilityState={{ selected: viewMode === 'simple' }}>
              <Ionicons
                name="bulb-outline"
                size={16}
                color={viewMode === 'simple' ? colors.green : colors.textSecondary}
              />
              <ThemedText
                variant="label"
                color={viewMode === 'simple' ? 'green' : 'secondary'}
                style={{ fontWeight: viewMode === 'simple' ? '700' : '500' }}>
                Simple Explanation
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeTab,
                viewMode === 'official' && { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setViewMode('official')}
              accessibilityRole="tab"
              accessibilityState={{ selected: viewMode === 'official' }}>
              <Ionicons
                name="document-text-outline"
                size={16}
                color={viewMode === 'official' ? colors.navy : colors.textSecondary}
              />
              <ThemedText
                variant="label"
                color={viewMode === 'official' ? 'navy' : 'secondary'}
                style={{ fontWeight: viewMode === 'official' ? '700' : '500' }}>
                Official Legal Text
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Quick Font Size Switcher */}
          <View style={styles.fontControls}>
            <TouchableOpacity
              style={[
                styles.fontPill,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.surfaceSubtle,
                },
              ]}
              onPress={() => {
                const next = fontScale === 'normal' ? 'large' : fontScale === 'large' ? 'extra-large' : 'normal';
                setFontScale(next);
              }}
              accessibilityRole="button"
              accessibilityLabel="Change text size">
              <ThemedText variant="caption" color="navy" style={{ fontWeight: '700' }}>
                {fontScale === 'normal' ? 'A (16px)' : fontScale === 'large' ? 'A+ (18px)' : 'A++ (22px)'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Audio Speaking Notification Banner */}
          {isSpeaking && (
            <View style={[styles.audioBanner, { backgroundColor: colors.saffronLight, borderColor: colors.saffronBorder }]}>
              <Ionicons name="volume-high" size={20} color={colors.saffron} />
              <ThemedText variant="bodySmall" color="saffron" style={{ flex: 1, fontWeight: '600' }}>
                Reading {viewMode === 'simple' ? 'simple explanation' : 'official text'} aloud... Tap speaker icon to pause.
              </ThemedText>
            </View>
          )}

          {/* Article Title Banner */}
          <Card variant="surfaceElevated" style={styles.titleCard}>
            <View style={styles.badgeRow}>
              <Badge label={`ARTICLE ${article.number}`} variant={isOmitted ? 'neutral' : 'saffron'} />
              <Badge label={article.part || 'CONSTITUTION'} variant="navy" />
              {isOmitted && <Badge label="OMITTED / REPEALED" variant="error" />}
            </View>
            <ThemedText variant="h1" color="navy" style={styles.mainTitle}>
              {article.title}
            </ThemedText>
            {article.chapter && (
              <ThemedText variant="caption" color="muted">
                {article.chapter}
              </ThemedText>
            )}
          </Card>

          {/* MODE 1: SIMPLE EXPLANATION */}
          {viewMode === 'simple' && explanation && (
            <View style={styles.explanationSection}>
              {/* Meaning Card */}
              <Card variant="surface" style={[styles.expCard, { borderLeftColor: colors.green, borderLeftWidth: 4 }]}>
                <View style={styles.sectionHeaderRow}>
                  <Ionicons name="sparkles" size={20} color={colors.green} />
                  <ThemedText variant="label" color="green" style={styles.sectionHeading}>
                    WHAT THIS MEANS FOR CITIZENS
                  </ThemedText>
                </View>
                <ThemedText variant="body" color="primary" style={styles.expBody}>
                  {explanation.explanation}
                </ThemedText>
              </Card>

              {/* Real-Life Practical Example */}
              <Card variant="surface" style={[styles.expCard, { borderLeftColor: colors.saffron, borderLeftWidth: 4 }]}>
                <View style={styles.sectionHeaderRow}>
                  <Ionicons name="people-outline" size={20} color={colors.saffron} />
                  <ThemedText variant="label" color="saffron" style={styles.sectionHeading}>
                    REAL-LIFE EVERYDAY EXAMPLE
                  </ThemedText>
                </View>
                <ThemedText variant="body" color="secondary" style={styles.expBody}>
                  {explanation.realLifeExample}
                </ThemedText>
              </Card>

              {/* Key Takeaway */}
              <Card variant="surfaceSubtle" style={styles.takeawayCard}>
                <View style={styles.sectionHeaderRow}>
                  <Ionicons name="checkmark-circle" size={18} color={colors.navy} />
                  <ThemedText variant="label" color="navy" style={styles.sectionHeading}>
                    KEY TAKEAWAY
                  </ThemedText>
                </View>
                <ThemedText variant="bodyMedium" color="primary" style={{ fontWeight: '600' }}>
                  {explanation.keyTakeaway}
                </ThemedText>
              </Card>

              {/* Switch to Legal text hint */}
              <TouchableOpacity
                style={[styles.switchHintBtn, { borderColor: colors.border, backgroundColor: colors.surface }]}
                onPress={() => setViewMode('official')}>
                <ThemedText variant="caption" color="navy" style={{ fontWeight: '600' }}>
                  Read exact official legal wording →
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}

          {/* MODE 2: OFFICIAL LEGAL TEXT */}
          {viewMode === 'official' && (
            <View style={styles.officialSection}>
              <Card variant="surface" style={styles.legalCard}>
                <View style={styles.legalHeaderRow}>
                  <ThemedText variant="label" color="primary">
                    Official Gazette Text
                  </ThemedText>
                  <Badge label="VERBATIM LAW" variant="navy" />
                </View>
                <ThemedText variant="legalText" color="primary" style={styles.legalBody}>
                  {article.fullText}
                </ThemedText>
              </Card>

              {/* Footnotes Section */}
              {article.footnotes.length > 0 && (
                <Card variant="surfaceSubtle" style={styles.footnoteContainer}>
                  <TouchableOpacity
                    style={styles.footnoteToggleRow}
                    onPress={() => setShowFootnotes(!showFootnotes)}
                    accessibilityRole="button"
                    accessibilityLabel="Toggle historical amendment footnotes">
                    <View style={styles.fnLeft}>
                      <Ionicons name="document-text-outline" size={16} color={colors.textSecondary} />
                      <ThemedText variant="label" color="primary">
                        Historical Amendments & Footnotes ({article.footnotes.length})
                      </ThemedText>
                    </View>
                    <Ionicons
                      name={showFootnotes ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>

                  {showFootnotes && (
                    <View style={styles.footnoteList}>
                      {article.footnotes.map((fn, idx) => (
                        <ThemedText key={idx} variant="caption" color="muted" style={styles.fnText}>
                          {fn}
                        </ThemedText>
                      ))}
                    </View>
                  )}
                </Card>
              )}
            </View>
          )}

          {/* Next / Previous Article Navigation */}
          <View style={styles.navRow}>
            {prevArticle ? (
              <TouchableOpacity
                style={[styles.navBtn, { borderColor: colors.border, backgroundColor: colors.surface }]}
                onPress={() => router.replace(`/article/${prevArticle.id}` as any)}
                accessibilityRole="button"
                accessibilityLabel={`Previous: Article ${prevArticle.number}`}>
                <Ionicons name="arrow-back" size={18} color={colors.textPrimary} />
                <View style={styles.navBtnText}>
                  <ThemedText variant="caption" color="muted">
                    PREVIOUS
                  </ThemedText>
                  <ThemedText variant="label" color="primary" numberOfLines={1}>
                    Art. {prevArticle.number}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.navBtnPlaceholder} />
            )}

            {nextArticle ? (
              <TouchableOpacity
                style={[
                  styles.navBtn,
                  { borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'flex-end' },
                ]}
                onPress={() => router.replace(`/article/${nextArticle.id}` as any)}
                accessibilityRole="button"
                accessibilityLabel={`Next: Article ${nextArticle.number}`}>
                <View style={[styles.navBtnText, { alignItems: 'flex-end' }]}>
                  <ThemedText variant="caption" color="muted">
                    NEXT
                  </ThemedText>
                  <ThemedText variant="label" color="primary" numberOfLines={1}>
                    Art. {nextArticle.number}
                  </ThemedText>
                </View>
                <Ionicons name="arrow-forward" size={18} color={colors.textPrimary} />
              </TouchableOpacity>
            ) : (
              <View style={styles.navBtnPlaceholder} />
            )}
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
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  controlBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  modeSwitch: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: BorderRadius.md,
    padding: 3,
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: BorderRadius.md - 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    gap: Spacing.xs,
  },
  fontControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontPill: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 6,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  audioBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  titleCard: {
    gap: Spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  mainTitle: {
    letterSpacing: -0.2,
    lineHeight: 30,
  },
  explanationSection: {
    gap: Spacing.md,
  },
  expCard: {
    gap: Spacing.sm,
    padding: Spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  sectionHeading: {
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  expBody: {
    lineHeight: 26,
  },
  takeawayCard: {
    gap: Spacing.xs,
    padding: Spacing.md,
  },
  switchHintBtn: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xs,
  },
  officialSection: {
    gap: Spacing.md,
  },
  legalCard: {
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  legalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.xs,
  },
  legalBody: {
    lineHeight: 28,
  },
  footnoteContainer: {
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  footnoteToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: Accessibility.minTouchTarget - 12,
  },
  fnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  footnoteList: {
    gap: Spacing.xs,
    paddingTop: Spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#CBD5E1',
  },
  fnText: {
    lineHeight: 18,
  },
  navRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
    minHeight: 56,
  },
  navBtnPlaceholder: {
    flex: 1,
  },
  navBtnText: {
    flex: 1,
    gap: 2,
  },
});
