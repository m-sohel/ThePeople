import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Part, Schedule } from '@/types/constitution';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { useSettings } from '@/context/SettingsContext';
import { useConstitution } from '@/hooks/useConstitution';
import { Spacing, BorderRadius } from '@/constants/layout';

type DirectoryTab = 'parts' | 'schedules';

export default function BrowseTab() {
  const router = useRouter();
  const { colors } = useSettings();
  const { parts, schedules } = useConstitution();

  const [activeTab, setActiveTab] = useState<DirectoryTab>('parts');
  const [filterQuery, setFilterQuery] = useState('');

  // Filter Parts based on search query
  const filteredParts = useMemo(() => {
    if (!filterQuery.trim()) return parts;
    const q = filterQuery.toLowerCase().trim();
    return parts.filter(
      p =>
        p.header.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.chapters.some(c => c.toLowerCase().includes(q))
    );
  }, [parts, filterQuery]);

  // Filter Schedules based on search query
  const filteredSchedules = useMemo(() => {
    if (!filterQuery.trim()) return schedules;
    const q = filterQuery.toLowerCase().trim();
    return schedules.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.number.toString() === q
    );
  }, [schedules, filterQuery]);

  const renderPartItem = ({ item }: { item: Part }) => {
    const isSpecialPart =
      item.header === 'PART III' ||
      item.header === 'PART IVA' ||
      item.header === 'PART IV';

    return (
      <Card
        variant="surface"
        style={styles.cardItem}
        onPress={() => router.push(`/part/${item.id}` as any)}>
        <View style={styles.cardRow}>
          <View style={styles.cardContent}>
            <View style={styles.tagRow}>
              <Badge
                label={item.header}
                variant={
                  item.header === 'PART III'
                    ? 'green'
                    : item.header === 'PART IVA'
                    ? 'saffron'
                    : isSpecialPart
                    ? 'navy'
                    : 'neutral'
                }
              />
              <ThemedText variant="caption" color="secondary" style={{ fontWeight: '600' }}>
                {item.articleIds.length} {item.articleIds.length === 1 ? 'Article' : 'Articles'}
              </ThemedText>
            </View>

            <ThemedText variant="h3" color="navy" style={styles.itemTitle}>
              {item.title}
            </ThemedText>

            {item.chapters.length > 0 && (
              <ThemedText variant="caption" color="muted">
                {item.chapters.length} Chapters
              </ThemedText>
            )}
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </View>
      </Card>
    );
  };

  const renderScheduleItem = ({ item }: { item: Schedule }) => {
    return (
      <Card
        variant="surface"
        style={styles.cardItem}
        onPress={() => router.push(`/schedule/${item.id}` as any)}>
        <View style={styles.cardRow}>
          <View style={styles.cardContent}>
            <View style={styles.tagRow}>
              <Badge label={`SCHEDULE ${item.number}`} variant="saffron" />
              <ThemedText variant="caption" color="muted">
                Pages {item.startPage} – {item.endPage}
              </ThemedText>
            </View>

            <ThemedText variant="h3" color="navy" style={styles.itemTitle}>
              {item.title}
            </ThemedText>

            <ThemedText variant="caption" color="secondary" numberOfLines={1}>
              {item.name}
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </View>
      </Card>
    );
  };

  return (
    <ThemedView variant="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Top Header */}
        <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
          <View>
            <ThemedText variant="caption" color="saffron" style={styles.subTitle}>
              OFFICIAL COMPENDIUM
            </ThemedText>
            <ThemedText variant="h1" color="navy">
              Constitutional Index
            </ThemedText>
          </View>
          <Badge label="26 PARTS • 12 SCHEDULES" variant="navy" />
        </View>

        {/* Filter Bar */}
        <View style={[styles.filterBarContainer, { backgroundColor: colors.surface }]}>
          <View
            style={[
              styles.filterInputRow,
              { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
            ]}>
            <Ionicons name="filter-outline" size={18} color={colors.textSecondary} />
            <TextInput
              style={[styles.filterInput, { color: colors.textPrimary }]}
              placeholder={
                activeTab === 'parts'
                  ? 'Filter by Part (e.g. Fundamental Rights, Part III)...'
                  : 'Filter by Schedule (e.g. Languages, Seventh)...'
              }
              placeholderTextColor={colors.textMuted}
              value={filterQuery}
              onChangeText={setFilterQuery}
              clearButtonMode="while-editing"
            />
            {filterQuery ? (
              <TouchableOpacity onPress={() => setFilterQuery('')}>
                <Ionicons name="close-circle" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Segmented Tab Selector */}
        <View style={[styles.segmentContainer, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
          <View style={[styles.segmentTrack, { backgroundColor: colors.surfaceSubtle }]}>
            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'parts' && { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setActiveTab('parts')}>
              <Ionicons
                name="book-outline"
                size={16}
                color={activeTab === 'parts' ? colors.navy : colors.textSecondary}
              />
              <ThemedText
                variant="label"
                color={activeTab === 'parts' ? 'navy' : 'secondary'}
                style={{ fontWeight: activeTab === 'parts' ? '700' : '500' }}>
                All 26 Parts ({parts.length})
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'schedules' && { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setActiveTab('schedules')}>
              <Ionicons
                name="document-text-outline"
                size={16}
                color={activeTab === 'schedules' ? colors.saffron : colors.textSecondary}
              />
              <ThemedText
                variant="label"
                color={activeTab === 'schedules' ? 'saffron' : 'secondary'}
                style={{ fontWeight: activeTab === 'schedules' ? '700' : '500' }}>
                12 Schedules ({schedules.length})
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Directory List */}
        {activeTab === 'parts' ? (
          <FlatList
            data={filteredParts}
            keyExtractor={item => item.id}
            renderItem={renderPartItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Ionicons name="search-outline" size={36} color={colors.textMuted} />
                <ThemedText variant="body" color="secondary">
                  No parts match &ldquo;{filterQuery}&rdquo;
                </ThemedText>
              </View>
            }
          />
        ) : (
          <FlatList
            data={filteredSchedules}
            keyExtractor={item => item.id}
            renderItem={renderScheduleItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Ionicons name="search-outline" size={36} color={colors.textMuted} />
                <ThemedText variant="body" color="secondary">
                  No schedules match &ldquo;{filterQuery}&rdquo;
                </ThemedText>
              </View>
            }
          />
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
  filterBarContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  filterInputRow: {
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
  segmentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  segmentTrack: {
    flexDirection: 'row',
    borderRadius: BorderRadius.md,
    padding: 3,
  },
  segmentTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md - 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    gap: Spacing.xs,
  },
  listContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  cardItem: {
    padding: Spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  itemTitle: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  emptyBox: {
    padding: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
});
