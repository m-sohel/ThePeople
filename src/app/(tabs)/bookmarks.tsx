import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Bookmark } from '@/types/constitution';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { useSettings } from '@/context/SettingsContext';
import { useBookmarks } from '@/context/BookmarksContext';
import { Spacing, BorderRadius, Accessibility } from '@/constants/layout';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatSavedDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return 'Recently saved';
  }
}

export default function BookmarksTabScreen() {
  const router = useRouter();
  const { colors } = useSettings();
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartFilter, setSelectedPartFilter] = useState<string>('all');

  // Extract unique parts present in bookmarks
  const availableParts = useMemo(() => {
    const partsSet = new Set<string>();
    for (const b of bookmarks) {
      if (b.part) partsSet.add(b.part);
    }
    return Array.from(partsSet);
  }, [bookmarks]);

  // Filter bookmarks by search and part
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter(b => {
      const matchesSearch =
        !searchQuery.trim() ||
        b.articleNumber.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (b.part && b.part.toLowerCase().includes(searchQuery.toLowerCase().trim()));

      const matchesPart = selectedPartFilter === 'all' || b.part === selectedPartFilter;

      return matchesSearch && matchesPart;
    });
  }, [bookmarks, searchQuery, selectedPartFilter]);

  const handleShareAll = async () => {
    if (bookmarks.length === 0) return;
    try {
      const listText = bookmarks
        .map((b, idx) => `${idx + 1}. Article ${b.articleNumber}: ${b.title} (${b.part || 'Constitution'})`)
        .join('\n');

      const message = `🇮🇳 My Saved Constitutional Articles — ThePeople App\n\n${listText}\n\n— Read offline anytime on ThePeople App`;
      await Share.share({ message, title: 'My Saved Articles' });
    } catch (e) {
      console.warn('Share all error:', e);
    }
  };

  const handleConfirmClearAll = () => {
    Alert.alert(
      'Clear All Bookmarks',
      'Are you sure you want to remove all saved articles from your local storage?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: clearBookmarks },
      ]
    );
  };

  const renderBookmarkItem = ({ item }: { item: Bookmark }) => {
    return (
      <Card
        variant="surface"
        style={styles.bookmarkCard}
        onPress={() => router.push(`/article/${item.articleId}` as any)}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.badgeRow}>
            <Badge label={`ARTICLE ${item.articleNumber}`} variant="saffron" />
            {item.part && <Badge label={item.part} variant="navy" />}
          </View>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => removeBookmark(item.articleId)}
            accessibilityRole="button"
            accessibilityLabel={`Remove Article ${item.articleNumber} from bookmarks`}>
            <Ionicons name="trash-outline" size={18} color={colors.error} />
          </TouchableOpacity>
        </View>

        <ThemedText variant="h3" color="navy" style={styles.itemTitle}>
          {item.title}
        </ThemedText>

        <View style={styles.cardFooter}>
          <ThemedText variant="caption" color="muted">
            Saved on {formatSavedDate(item.savedAt)}
          </ThemedText>
          <ThemedText variant="caption" color="saffron" style={{ fontWeight: '600' }}>
            Read article →
          </ThemedText>
        </View>
      </Card>
    );
  };

  return (
    <ThemedView variant="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
          <View>
            <ThemedText variant="caption" color="saffron" style={styles.subTitle}>
              OFFLINE LIBRARY
            </ThemedText>
            <ThemedText variant="h1" color="navy">
              Saved Articles
            </ThemedText>
          </View>
          {bookmarks.length > 0 && (
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={[styles.actionIconBtn, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}
                onPress={handleShareAll}
                accessibilityRole="button"
                accessibilityLabel="Share list of saved articles">
                <Ionicons name="share-social-outline" size={18} color={colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionIconBtn, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}
                onPress={handleConfirmClearAll}
                accessibilityRole="button"
                accessibilityLabel="Clear all saved articles">
                <Ionicons name="trash-outline" size={18} color={colors.error} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {bookmarks.length === 0 ? (
          /* Empty State */
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconCircle, { backgroundColor: colors.saffronLight }]}>
              <Ionicons name="bookmark" size={48} color={colors.saffron} />
            </View>
            <ThemedText variant="h2" color="navy" style={styles.emptyTitle}>
              No Saved Articles Yet
            </ThemedText>
            <ThemedText variant="body" color="secondary" style={styles.emptyDesc}>
              Tap the bookmark icon on any constitutional article while reading to save it here for quick offline reading anytime.
            </ThemedText>
            <Button
              title="Explore Fundamental Rights"
              onPress={() => router.push('/(tabs)/rights')}
              variant="primary"
              icon={<Ionicons name="shield-checkmark" size={18} color={colors.textInverse} />}
              style={{ marginTop: Spacing.md }}
            />
          </View>
        ) : (
          <>
            {/* Search / Filter Bar */}
            <View style={[styles.filterBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
              <View
                style={[
                  styles.searchInputBox,
                  { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
                ]}>
                <Ionicons name="search" size={18} color={colors.textSecondary} />
                <TextInput
                  style={[styles.filterInput, { color: colors.textPrimary }]}
                  placeholder="Filter your saved articles..."
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

              {/* Part Filter Chips (if multiple parts present) */}
              {availableParts.length > 1 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
                  <TouchableOpacity
                    style={[
                      styles.chip,
                      {
                        backgroundColor: selectedPartFilter === 'all' ? colors.navy : colors.surfaceSubtle,
                        borderColor: selectedPartFilter === 'all' ? colors.navy : colors.border,
                      },
                    ]}
                    onPress={() => setSelectedPartFilter('all')}>
                    <ThemedText
                      variant="caption"
                      style={{
                        color: selectedPartFilter === 'all' ? colors.textInverse : colors.textSecondary,
                        fontWeight: '600',
                      }}>
                      All ({bookmarks.length})
                    </ThemedText>
                  </TouchableOpacity>

                  {availableParts.map(part => {
                    const isSelected = selectedPartFilter === part;
                    return (
                      <TouchableOpacity
                        key={part}
                        style={[
                          styles.chip,
                          {
                            backgroundColor: isSelected ? colors.navy : colors.surfaceSubtle,
                            borderColor: isSelected ? colors.navy : colors.border,
                          },
                        ]}
                        onPress={() => setSelectedPartFilter(part)}>
                        <ThemedText
                          variant="caption"
                          style={{
                            color: isSelected ? colors.textInverse : colors.textSecondary,
                            fontWeight: '600',
                          }}>
                          {part}
                        </ThemedText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
            </View>

            {/* Bookmarks List */}
            <FlatList
              data={filteredBookmarks}
              keyExtractor={item => item.id}
              renderItem={renderBookmarkItem}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.noMatchBox}>
                  <Ionicons name="search-outline" size={36} color={colors.textMuted} />
                  <ThemedText variant="body" color="secondary">
                    No bookmarks matching &ldquo;{searchQuery}&rdquo;
                  </ThemedText>
                </View>
              }
            />
          </>
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
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  subTitle: {
    letterSpacing: 1.2,
    fontWeight: '700',
    fontSize: 10,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionIconBtn: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: Spacing.sm,
  },
  searchInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    height: 42,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  filterInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  chipsScroll: {
    gap: Spacing.xs,
    paddingTop: 2,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
  },
  listContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  bookmarkCard: {
    padding: Spacing.md,
    gap: Spacing.sm,
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
  removeBtn: {
    width: Accessibility.minTouchTarget,
    height: Accessibility.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -Spacing.xs,
    marginTop: -Spacing.xs,
  },
  itemTitle: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    gap: Spacing.md,
  },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyDesc: {
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  noMatchBox: {
    padding: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
});
