import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Article } from '@/types/constitution';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { useSettings } from '@/context/SettingsContext';
import { useBookmarks } from '@/context/BookmarksContext';
import { useConstitution } from '@/hooks/useConstitution';
import { Spacing, BorderRadius, Accessibility } from '@/constants/layout';

export default function PartDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useSettings();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { getPart, getArticlesForPart } = useConstitution();

  const [searchQuery, setSearchQuery] = useState('');

  const part = useMemo(() => {
    return getPart(id || '');
  }, [id, getPart]);

  const articles = useMemo(() => {
    if (!part) return [];
    return getArticlesForPart(part.header);
  }, [part, getArticlesForPart]);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const q = searchQuery.toLowerCase().trim();
    return articles.filter(
      a =>
        a.number.toLowerCase().includes(q) ||
        a.title.toLowerCase().includes(q) ||
        (a.chapter && a.chapter.toLowerCase().includes(q))
    );
  }, [articles, searchQuery]);

  if (!part) {
    return (
      <ThemedView variant="background" style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <Header title="Part Not Found" showBack />
          <View style={styles.notFoundContent}>
            <ThemedText variant="body" color="secondary">
              Could not locate Part details for {id}.
            </ThemedText>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  // Calculate article range (e.g. "Articles 12 – 35")
  const articleRange =
    articles.length > 0
      ? `Articles ${articles[0].number} – ${articles[articles.length - 1].number}`
      : 'No articles';

  const renderArticleItem = ({ item }: { item: Article }) => {
    const bookmarked = isBookmarked(item.id);
    const isOmitted = item.status === 'omitted' || item.status === 'repealed';

    return (
      <Card
        variant="surface"
        style={styles.articleCard}
        onPress={() => router.push(`/article/${item.id}` as any)}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.badgeRow}>
            <Badge
              label={`ARTICLE ${item.number}`}
              variant={isOmitted ? 'neutral' : 'saffron'}
            />
            {isOmitted && <Badge label="OMITTED" variant="neutral" />}
          </View>
          <TouchableOpacity
            style={styles.bookmarkBtn}
            onPress={() => toggleBookmark(item)}
            accessibilityRole="button"
            accessibilityLabel={bookmarked ? `Remove Article ${item.number} from bookmarks` : `Bookmark Article ${item.number}`}>
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={bookmarked ? colors.saffron : colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <ThemedText
          variant="h3"
          color={isOmitted ? 'muted' : 'navy'}
          style={[styles.articleTitle, isOmitted ? styles.strikethrough : {}]}>
          {item.title}
        </ThemedText>

        {item.chapter ? (
          <ThemedText variant="caption" color="muted" numberOfLines={1}>
            {item.chapter}
          </ThemedText>
        ) : null}

        <View style={styles.cardFooter}>
          <ThemedText variant="caption" color="saffron" style={{ fontWeight: '600' }}>
            Tap to read full text & explanation →
          </ThemedText>
        </View>
      </Card>
    );
  };

  return (
    <ThemedView variant="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Header title={part.header} subtitle={part.title} showBack />

        {/* Part Overview Card */}
        <View style={styles.overviewContainer}>
          <Card variant="surfaceElevated" style={styles.overviewCard}>
            <View style={styles.overviewBadgeRow}>
              <Badge label={part.header} variant="navy" />
              <ThemedText variant="caption" color="secondary" style={{ fontWeight: '600' }}>
                {articleRange}
              </ThemedText>
            </View>
            <ThemedText variant="h2" color="navy" style={styles.partHeading}>
              {part.title}
            </ThemedText>
            {part.chapters.length > 0 && (
              <ThemedText variant="caption" color="secondary">
                Contains {part.chapters.length} Chapters • {articles.length} Articles
              </ThemedText>
            )}

            {/* Quick Filter Input */}
            <View
              style={[
                styles.searchBox,
                { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
              ]}>
              <Ionicons name="search" size={18} color={colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: colors.textPrimary }]}
                placeholder="Filter articles in this Part..."
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                clearButtonMode="while-editing"
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              ) : null}
            </View>
          </Card>
        </View>

        {/* Articles List */}
        <FlatList
          data={filteredArticles}
          keyExtractor={item => item.id}
          renderItem={renderArticleItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={36} color={colors.textMuted} />
              <ThemedText variant="body" color="secondary">
                No articles matching &ldquo;{searchQuery}&rdquo;
              </ThemedText>
            </View>
          }
        />
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
  notFoundContent: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  overviewContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  overviewCard: {
    gap: Spacing.sm,
  },
  overviewBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  partHeading: {
    letterSpacing: -0.2,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    height: 42,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  listContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  articleCard: {
    gap: Spacing.xs,
    padding: Spacing.md,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  bookmarkBtn: {
    width: Accessibility.minTouchTarget,
    height: Accessibility.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -Spacing.xs,
    marginTop: -Spacing.xs,
  },
  articleTitle: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 2,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  cardFooter: {
    paddingTop: Spacing.xs,
  },
  emptyContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
});
