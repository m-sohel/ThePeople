import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { useSettings } from '@/context/SettingsContext';
import {
  FUNDAMENTAL_RIGHTS_GROUPS,
  FUNDAMENTAL_DUTIES,
  DIRECTIVE_PRINCIPLES_SUMMARY,
  RightGroup,
} from '@/data/rights-data';
import { Spacing, BorderRadius } from '@/constants/layout';

type RightsTab = 'rights' | 'duties' | 'dpsp';

export default function RightsTabScreen() {
  const router = useRouter();
  const { colors } = useSettings();

  const [activeTab, setActiveTab] = useState<RightsTab>('rights');
  const [filterQuery, setFilterQuery] = useState('');
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>('equality');

  // Filter Fundamental Rights
  const filteredRights = useMemo(() => {
    if (!filterQuery.trim()) return FUNDAMENTAL_RIGHTS_GROUPS;
    const q = filterQuery.toLowerCase().trim();
    return FUNDAMENTAL_RIGHTS_GROUPS.filter(
      g =>
        g.category.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.articles.some(a => a.number.includes(q) || a.title.toLowerCase().includes(q) || a.shortSummary.toLowerCase().includes(q))
    );
  }, [filterQuery]);

  // Filter Duties
  const filteredDuties = useMemo(() => {
    if (!filterQuery.trim()) return FUNDAMENTAL_DUTIES;
    const q = filterQuery.toLowerCase().trim();
    return FUNDAMENTAL_DUTIES.filter(
      d =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.everydayAction.toLowerCase().includes(q)
    );
  }, [filterQuery]);

  // Filter Directive Principles
  const filteredDpsp = useMemo(() => {
    if (!filterQuery.trim()) return DIRECTIVE_PRINCIPLES_SUMMARY;
    const q = filterQuery.toLowerCase().trim();
    return DIRECTIVE_PRINCIPLES_SUMMARY.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.focus.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.number.includes(q)
    );
  }, [filterQuery]);

  const toggleGroup = (id: string) => {
    setExpandedGroupId(prev => (prev === id ? null : id));
  };

  return (
    <ThemedView variant="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
          <View>
            <ThemedText variant="caption" color="saffron" style={styles.subTitle}>
              CITIZEN EMPOWERMENT
            </ThemedText>
            <ThemedText variant="h1" color="navy">
              Know Your Rights
            </ThemedText>
          </View>
          <Badge label="CIVIC GUIDE" variant="green" />
        </View>

        {/* Filter Input */}
        <View style={[styles.filterBarContainer, { backgroundColor: colors.surface }]}>
          <View
            style={[
              styles.filterInputRow,
              { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
            ]}>
            <Ionicons name="search" size={18} color={colors.textSecondary} />
            <TextInput
              style={[styles.filterInput, { color: colors.textPrimary }]}
              placeholder="Filter rights, duties, or principles..."
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

        {/* 3-Way Segment Selector */}
        <View style={[styles.segmentContainer, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
          <View style={[styles.segmentTrack, { backgroundColor: colors.surfaceSubtle }]}>
            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'rights' && { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setActiveTab('rights')}>
              <Ionicons
                name="shield-checkmark"
                size={16}
                color={activeTab === 'rights' ? colors.green : colors.textSecondary}
              />
              <ThemedText
                variant="label"
                color={activeTab === 'rights' ? 'green' : 'secondary'}
                style={{ fontWeight: activeTab === 'rights' ? '700' : '500' }}>
                Rights ({FUNDAMENTAL_RIGHTS_GROUPS.length})
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'duties' && { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setActiveTab('duties')}>
              <Ionicons
                name="ribbon"
                size={16}
                color={activeTab === 'duties' ? colors.saffron : colors.textSecondary}
              />
              <ThemedText
                variant="label"
                color={activeTab === 'duties' ? 'saffron' : 'secondary'}
                style={{ fontWeight: activeTab === 'duties' ? '700' : '500' }}>
                11 Duties
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'dpsp' && { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setActiveTab('dpsp')}>
              <Ionicons
                name="compass"
                size={16}
                color={activeTab === 'dpsp' ? colors.navy : colors.textSecondary}
              />
              <ThemedText
                variant="label"
                color={activeTab === 'dpsp' ? 'navy' : 'secondary'}
                style={{ fontWeight: activeTab === 'dpsp' ? '700' : '500' }}>
                Principles
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* TAB 1: FUNDAMENTAL RIGHTS */}
          {activeTab === 'rights' && (
            <View style={styles.sectionContainer}>
              {/* Banner */}
              <Card variant="surfaceElevated" style={styles.bannerCard}>
                <Badge label="PART III • ARTICLES 12 TO 35" variant="green" />
                <ThemedText variant="h2" color="navy">
                  Your 6 Fundamental Rights
                </ThemedText>
                <ThemedText variant="body" color="secondary">
                  Guaranteed by the Constitution against arbitrary government action. If any of these rights are violated, you have the constitutional power to move the High Court or Supreme Court directly.
                </ThemedText>
              </Card>

              {/* Groups Accordion */}
              {filteredRights.map((group: RightGroup) => {
                const isExpanded = expandedGroupId === group.id || !!filterQuery;

                return (
                  <Card key={group.id} variant="surface" style={styles.groupCard}>
                    <TouchableOpacity
                      style={styles.groupHeaderRow}
                      onPress={() => toggleGroup(group.id)}
                      activeOpacity={0.7}
                      accessibilityRole="button"
                      accessibilityLabel={`${group.category}, ${group.articleRange}`}>
                      <View style={styles.groupHeaderLeft}>
                        <View style={styles.groupBadgeRow}>
                          <Badge label={group.articleRange} variant={group.badge} />
                          <ThemedText variant="caption" color="muted">
                            {group.articles.length} {group.articles.length === 1 ? 'Article' : 'Articles'}
                          </ThemedText>
                        </View>
                        <ThemedText variant="h2" color="navy" style={styles.groupTitle}>
                          {group.category}
                        </ThemedText>
                        <ThemedText variant="body" color="secondary" style={styles.groupDesc}>
                          {group.description}
                        </ThemedText>
                      </View>
                      <Ionicons
                        name={isExpanded ? 'chevron-up-circle' : 'chevron-down-circle'}
                        size={24}
                        color={colors.textSecondary}
                      />
                    </TouchableOpacity>

                    {/* Articles List inside Group */}
                    {isExpanded && (
                      <View style={styles.articlesSubList}>
                        <View style={[styles.subDivider, { backgroundColor: colors.border }]} />
                        {group.articles.map(art => (
                          <TouchableOpacity
                            key={art.id}
                            style={[
                              styles.articleRow,
                              { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
                            ]}
                            onPress={() => router.push(`/article/${art.id}` as any)}
                            activeOpacity={0.8}
                            accessibilityRole="button"
                            accessibilityLabel={`Article ${art.number}: ${art.title}`}>
                            <View style={styles.artRowLeft}>
                              <Badge label={`ART. ${art.number}`} variant="saffron" />
                              <View style={styles.artTextWrap}>
                                <ThemedText variant="label" color="primary">
                                  {art.title}
                                </ThemedText>
                                <ThemedText variant="caption" color="secondary" numberOfLines={2}>
                                  {art.shortSummary}
                                </ThemedText>
                              </View>
                            </View>
                            <Ionicons name="arrow-forward" size={16} color={colors.textMuted} />
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </Card>
                );
              })}
            </View>
          )}

          {/* TAB 2: FUNDAMENTAL DUTIES */}
          {activeTab === 'duties' && (
            <View style={styles.sectionContainer}>
              <Card variant="surfaceElevated" style={styles.bannerCard}>
                <Badge label="PART IVA • ARTICLE 51A" variant="saffron" />
                <ThemedText variant="h2" color="navy">
                  11 Civic Duties of Every Citizen
                </ThemedText>
                <ThemedText variant="body" color="secondary">
                  Rights and duties are two sides of the same coin. Added by the 42nd Amendment (and 86th Amendment for education), these 11 duties remind us of our collective responsibility towards India and our fellow citizens.
                </ThemedText>
              </Card>

              {filteredDuties.map(duty => (
                <Card
                  key={duty.number}
                  variant="surface"
                  style={[styles.dutyCard, { borderLeftColor: colors[duty.badge], borderLeftWidth: 4 }]}>
                  <View style={styles.dutyBadgeRow}>
                    <Badge label={`DUTY ${duty.number} • ${duty.clause}`} variant={duty.badge} />
                  </View>
                  <ThemedText variant="h3" color="navy" style={styles.dutyTitle}>
                    {duty.title}
                  </ThemedText>
                  <ThemedText variant="body" color="primary" style={styles.dutyDesc}>
                    {duty.description}
                  </ThemedText>

                  {/* Practical everyday action */}
                  <View
                    style={[
                      styles.actionBox,
                      { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
                    ]}>
                    <Ionicons name="leaf-outline" size={18} color={colors.green} />
                    <View style={{ flex: 1, gap: 2 }}>
                      <ThemedText variant="caption" color="green" style={{ fontWeight: '700' }}>
                        YOUR CITIZEN ACTION:
                      </ThemedText>
                      <ThemedText variant="bodySmall" color="secondary">
                        {duty.everydayAction}
                      </ThemedText>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* TAB 3: DIRECTIVE PRINCIPLES */}
          {activeTab === 'dpsp' && (
            <View style={styles.sectionContainer}>
              <Card variant="surfaceElevated" style={styles.bannerCard}>
                <Badge label="PART IV • ARTICLES 36 TO 51" variant="navy" />
                <ThemedText variant="h2" color="navy">
                  Directive Principles of State Policy
                </ThemedText>
                <ThemedText variant="body" color="secondary">
                  The constitutional roadmap for building a welfare state. Although non-justiciable (courts cannot force the government to enact them immediately), they are fundamental in the governance of the country.
                </ThemedText>
              </Card>

              {filteredDpsp.map(p => (
                <Card
                  key={p.id}
                  variant="surface"
                  style={styles.dpspCard}
                  onPress={() => router.push(`/article/${p.id}` as any)}>
                  <View style={styles.dpspBadgeRow}>
                    <Badge label={`ARTICLE ${p.number}`} variant="navy" />
                    <Badge label={p.focus} variant="neutral" />
                  </View>
                  <ThemedText variant="h3" color="navy" style={styles.dpspTitle}>
                    {p.title}
                  </ThemedText>
                  <ThemedText variant="body" color="secondary" style={styles.dpspDesc}>
                    {p.description}
                  </ThemedText>
                  <ThemedText variant="caption" color="saffron" style={{ fontWeight: '600' }}>
                    Tap to view Article {p.number} →
                  </ThemedText>
                </Card>
              ))}
            </View>
          )}
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
    gap: 4,
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  sectionContainer: {
    gap: Spacing.lg,
  },
  bannerCard: {
    gap: Spacing.xs,
  },
  groupCard: {
    gap: Spacing.sm,
    padding: Spacing.lg,
  },
  groupHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  groupHeaderLeft: {
    flex: 1,
    gap: Spacing.xs,
  },
  groupBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  groupTitle: {
    letterSpacing: -0.2,
    marginTop: 2,
  },
  groupDesc: {
    lineHeight: 22,
    marginTop: 2,
  },
  articlesSubList: {
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  subDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: Spacing.xs,
  },
  articleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  artRowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  artTextWrap: {
    flex: 1,
    gap: 2,
  },
  dutyCard: {
    gap: Spacing.sm,
    padding: Spacing.lg,
  },
  dutyBadgeRow: {
    flexDirection: 'row',
  },
  dutyTitle: {
    marginTop: 2,
  },
  dutyDesc: {
    lineHeight: 24,
  },
  actionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  dpspCard: {
    gap: Spacing.xs,
    padding: Spacing.lg,
  },
  dpspBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dpspTitle: {
    marginTop: 2,
  },
  dpspDesc: {
    lineHeight: 22,
    marginBottom: Spacing.xs,
  },
});
