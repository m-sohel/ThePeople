import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Article } from '@/types/constitution';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { ThemedText } from '@/components/ui/ThemedText';
import { useSettings } from '@/context/SettingsContext';
import { useBookmarks } from '@/context/BookmarksContext';
import { shareArticle } from '@/utils/share';
import { Spacing, BorderRadius, Accessibility } from '@/constants/layout';

export interface DailyArticleCardProps {
  article: Article;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getFormattedDate(): string {
  const d = new Date();
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

export function DailyArticleCard({ article }: DailyArticleCardProps) {
  const router = useRouter();
  const { colors } = useSettings();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);

  const formattedDate = getFormattedDate();

  // Extract clean operative preview (removing leading article number/title repeat)
  let preview = article.fullText;
  const dashIdx = preview.indexOf('—');
  if (dashIdx !== -1 && dashIdx < 150) {
    preview = preview.slice(dashIdx + 1).trim();
  }

  return (
    <Card variant="surfaceElevated" style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.tagGroup}>
          <Badge label="ARTICLE OF THE DAY" variant="saffron" />
          <ThemedText variant="caption" color="muted">
            {formattedDate}
          </ThemedText>
        </View>
        <View style={styles.actionGroup}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => shareArticle(article)}
            accessibilityRole="button"
            accessibilityLabel={`Share Article ${article.number}`}>
            <Ionicons name="share-social-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => toggleBookmark(article)}
            accessibilityRole="button"
            accessibilityLabel={bookmarked ? `Remove Article ${article.number} from bookmarks` : `Bookmark Article ${article.number}`}>
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={bookmarked ? colors.saffron : colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <ThemedText variant="caption" color="saffron" style={styles.partLabel}>
          {article.part || 'CONSTITUTION OF INDIA'}
        </ThemedText>
        <ThemedText variant="h2" color="navy" style={styles.articleTitle}>
          Article {article.number}: {article.title}
        </ThemedText>
      </View>

      <ThemedText variant="body" color="secondary" numberOfLines={3} style={styles.previewText}>
        {preview}
      </ThemedText>

      <TouchableOpacity
        style={[styles.readButton, { backgroundColor: colors.navyLight, borderColor: colors.navyBorder }]}
        onPress={() => router.push(`/article/${article.id}` as any)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`Read full text and simple explanation for Article ${article.number}`}>
        <ThemedText variant="label" color="navy">
          Read Full Text & Explanation
        </ThemedText>
        <Ionicons name="arrow-forward" size={16} color={colors.navy} />
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    width: Accessibility.minTouchTarget,
    height: Accessibility.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    gap: 2,
  },
  partLabel: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  articleTitle: {
    marginTop: 2,
  },
  previewText: {
    lineHeight: 22,
  },
  readButton: {
    minHeight: Accessibility.minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
});

