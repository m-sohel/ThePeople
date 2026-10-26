import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { useSettings } from '@/context/SettingsContext';
import { useBookmarks } from '@/context/BookmarksContext';
import { searchConstitution, SearchResult } from '@/utils/searchEngine';
import { getItem, setItem } from '@/utils/storage';
import { Spacing, BorderRadius, Accessibility } from '@/constants/layout';

const RECENT_SEARCHES_KEY = '@thepeople_recent_searches';

const SUGGESTED_QUERIES = [
  'Article 21',
  'Equality',
  'Free Speech',
  'Education 21A',
  'Arrest 22',
  'Duties 51A',
  'Panchayat',
  'Remedies 32',
  'Emergency',
  'Untouchability',
];

export default function SearchScreen() {
  const router = useRouter();
  const { colors } = useSettings();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches
  useEffect(() => {
    async function loadRecent() {
      const saved = await getItem<string[]>(RECENT_SEARCHES_KEY, []);
      setRecentSearches(saved);
    }
    loadRecent();
  }, []);

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 120);
    return () => clearTimeout(handler);
  }, [query]);

  // Execute search
  const searchResults = useMemo(() => {
    return searchConstitution(debouncedQuery);
  }, [debouncedQuery]);

  const handleSelectQuery = (text: string) => {
    setQuery(text);
    saveRecentSearch(text);
    Keyboard.dismiss();
  };

  const saveRecentSearch = async (text: string) => {
    if (!text.trim()) return;
    const clean = text.trim();
    const updated = [clean, ...recentSearches.filter(s => s.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    await setItem(RECENT_SEARCHES_KEY, updated);
  };

  const clearRecentSearches = async () => {
    setRecentSearches([]);
    await setItem(RECENT_SEARCHES_KEY, []);
  };

  const renderResultItem = ({ item }: { item: SearchResult }) => {
    const art = item.article;
    const bookmarked = isBookmarked(art.id);
    const isOmitted = art.status === 'omitted' || art.status === 'repealed';

    return (
      <Card
        variant="surface"
        style={styles.resultCard}
        onPress={() => {
          saveRecentSearch(debouncedQuery || art.number);
          router.push(`/article/${art.id}` as any);
        }}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.badgeRow}>
            <Badge label={`ART. ${art.number}`} variant={isOmitted ? 'neutral' : 'saffron'} />
            <Badge label={art.part || 'CONSTITUTION'} variant="navy" />
            {item.matchedField === 'number' && <Badge label="EXACT NUMBER" variant="green" />}
          </View>
          <TouchableOpacity
            style={styles.bookmarkBtn}
            onPress={() => toggleBookmark(art)}
            accessibilityRole="button"
            accessibilityLabel={bookmarked ? `Remove Article ${art.number} from bookmarks` : `Bookmark Article ${art.number}`}>
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={bookmarked ? colors.saffron : colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <ThemedText variant="h3" color={isOmitted ? 'muted' : 'primary'} style={styles.artTitle}>
          {art.title}
        </ThemedText>

        <ThemedText variant="caption" color="secondary" numberOfLines={2} style={styles.snippetText}>
          {item.snippet}
        </ThemedText>

        <View style={styles.cardFooter}>
          <ThemedText variant="caption" color="saffron" style={{ fontWeight: '600' }}>
            Tap to read article →
          </ThemedText>
        </View>
      </Card>
    );
  };

  return (
    <ThemedView variant="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Header title="Search Constitution" subtitle="500 Articles • Fast Offline Index" showBack />

        {/* Search Input Bar */}
        <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <View
            style={[
              styles.inputBox,
              { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
            ]}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: colors.textPrimary }]}
              placeholder="Search by article number (e.g. 21A) or keyword..."
              placeholderTextColor={colors.textMuted}
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => saveRecentSearch(query)}
              returnKeyType="search"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            {query ? (
              <TouchableOpacity
                onPress={() => setQuery('')}
                accessibilityRole="button"
                accessibilityLabel="Clear search input">
                <Ionicons name="close-circle" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* When search input is empty: Show Suggested Queries & Recent Searches */}
        {!query.trim() && (
          <FlatList
            data={[]}
            renderItem={() => null}
            ListHeaderComponent={
              <View style={styles.emptySearchContent}>
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <View style={styles.sectionBlock}>
                    <View style={styles.sectionHeaderRow}>
                      <ThemedText variant="label" color="primary">
                        RECENT SEARCHES
                      </ThemedText>
                      <TouchableOpacity onPress={clearRecentSearches}>
                        <ThemedText variant="caption" color="saffron" style={{ fontWeight: '600' }}>
                          Clear All
                        </ThemedText>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.pillsWrap}>
                      {recentSearches.map((item, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={[
                            styles.queryPill,
                            { backgroundColor: colors.surface, borderColor: colors.border },
                          ]}
                          onPress={() => handleSelectQuery(item)}>
                          <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                          <ThemedText variant="bodySmall" color="primary">
                            {item}
                          </ThemedText>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Popular Topics */}
                <View style={styles.sectionBlock}>
                  <ThemedText variant="label" color="primary">
                    POPULAR CIVIC TOPICS
                  </ThemedText>
                  <View style={styles.pillsWrap}>
                    {SUGGESTED_QUERIES.map((item, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={[
                          styles.queryPill,
                          { backgroundColor: colors.surface, borderColor: colors.border },
                        ]}
                        onPress={() => handleSelectQuery(item)}>
                        <Ionicons name="sparkles-outline" size={14} color={colors.saffron} />
                        <ThemedText variant="bodySmall" color="primary">
                          {item}
                        </ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Search Tips Card */}
                <Card variant="surfaceSubtle" style={styles.tipsCard}>
                  <ThemedText variant="label" color="navy">
                    💡 Search Tips:
                  </ThemedText>
                  <ThemedText variant="caption" color="secondary" style={styles.tipLine}>
                    • Type <ThemedText style={{ fontWeight: '700' }}>21A</ThemedText> or <ThemedText style={{ fontWeight: '700' }}>Art 19</ThemedText> to jump straight to an article.
                  </ThemedText>
                  <ThemedText variant="caption" color="secondary" style={styles.tipLine}>
                    • Search legal terms like <ThemedText style={{ fontWeight: '700' }}>untouchability, bail, privacy, environment, panchayat</ThemedText>.
                  </ThemedText>
                  <ThemedText variant="caption" color="secondary" style={styles.tipLine}>
                    • All search happens 100% offline on your device with zero internet needed.
                  </ThemedText>
                </Card>
              </View>
            }
          />
        )}

        {/* When search input is entered: Show Results List */}
        {!!query.trim() && (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsCountBar}>
              <ThemedText variant="caption" color="secondary" style={{ fontWeight: '600' }}>
                FOUND {searchResults.length} {searchResults.length === 1 ? 'ARTICLE' : 'ARTICLES'}
              </ThemedText>
            </View>

            <FlatList
              data={searchResults}
              keyExtractor={item => item.article.id}
              renderItem={renderResultItem}
              contentContainerStyle={styles.resultsList}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <View style={styles.noResultsBox}>
                  <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
                  <ThemedText variant="h3" color="navy">
                    No matching articles
                  </ThemedText>
                  <ThemedText variant="body" color="secondary" style={{ textAlign: 'center' }}>
                    No constitutional provisions match &ldquo;{debouncedQuery}&rdquo;. Try searching by article number or a broader keyword.
                  </ThemedText>
                </View>
              }
            />
          </View>
        )}
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
  inputContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    height: 46,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  emptySearchContent: {
    padding: Spacing.lg,
    gap: Spacing.xl,
  },
  sectionBlock: {
    gap: Spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  queryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  tipsCard: {
    gap: Spacing.xs,
    padding: Spacing.md,
  },
  tipLine: {
    lineHeight: 18,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsCountBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  resultsList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  resultCard: {
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
  artTitle: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 2,
  },
  snippetText: {
    lineHeight: 18,
  },
  cardFooter: {
    paddingTop: Spacing.xs,
  },
  noResultsBox: {
    padding: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
});
