import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { useSettings } from '@/context/SettingsContext';
import { useConstitution } from '@/hooks/useConstitution';
import { sharePreamble } from '@/utils/share';
import { PREAMBLE_TERMS, HISTORICAL_MILESTONES, PreambleWord } from '@/data/preamble-data';
import { Spacing, BorderRadius, Accessibility } from '@/constants/layout';

type TabView = 'ceremonial' | 'simple' | 'terms' | 'history';

export default function PreambleScreen() {
  const { colors } = useSettings();
  const { preamble } = useConstitution();
  const [activeTab, setActiveTab] = useState<TabView>('ceremonial');
  const [selectedWord, setSelectedWord] = useState<PreambleWord | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speech if screen unmounts
  useEffect(() => {
    return () => {
      Speech.stop().catch(() => {});
    };
  }, []);

  const handleToggleSpeech = async () => {
    if (isSpeaking) {
      await Speech.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      Speech.speak(preamble.fullText, {
        language: 'en-IN',
        rate: 0.88,
        pitch: 1.0,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  const tabs: { key: TabView; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'ceremonial', label: 'Official Text', icon: 'document-text-outline' },
    { key: 'simple', label: 'In Plain Words', icon: 'bulb-outline' },
    { key: 'terms', label: 'Key Terms', icon: 'book-outline' },
    { key: 'history', label: 'History', icon: 'time-outline' },
  ];

  return (
    <ThemedView variant="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header with Read Aloud & Share Actions */}
        <Header
          title="The Preamble"
          subtitle="Solemn Declaration of the Republic"
          showBack
          rightAction={
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  {
                    backgroundColor: isSpeaking ? colors.saffronLight : colors.surfaceSubtle,
                    borderColor: isSpeaking ? colors.saffron : colors.border,
                  },
                ]}
                onPress={handleToggleSpeech}
                accessibilityRole="button"
                accessibilityLabel={isSpeaking ? 'Stop reading Preamble aloud' : 'Listen to Preamble read aloud'}>
                <Ionicons
                  name={isSpeaking ? 'stop-circle' : 'volume-high-outline'}
                  size={20}
                  color={isSpeaking ? colors.saffron : colors.textPrimary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}
                onPress={() => sharePreamble(preamble.fullText)}
                accessibilityRole="button"
                accessibilityLabel="Share Preamble">
                <Ionicons name="share-social-outline" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          }
        />

        {/* Tab Selector */}
        <View style={[styles.tabBar, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
            {tabs.map(t => {
              const selected = activeTab === t.key;
              return (
                <TouchableOpacity
                  key={t.key}
                  style={[
                    styles.tabPill,
                    {
                      backgroundColor: selected ? colors.navy : colors.surfaceSubtle,
                      borderColor: selected ? colors.navy : colors.border,
                    },
                  ]}
                  onPress={() => setActiveTab(t.key)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected }}>
                  <Ionicons
                    name={t.icon}
                    size={16}
                    color={selected ? colors.textInverse : colors.textSecondary}
                  />
                  <ThemedText
                    variant="label"
                    style={{ color: selected ? colors.textInverse : colors.textSecondary }}>
                    {t.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Audio Speaking Notification Banner */}
          {isSpeaking && (
            <View style={[styles.audioBanner, { backgroundColor: colors.saffronLight, borderColor: colors.saffronBorder }]}>
              <Ionicons name="volume-high" size={20} color={colors.saffron} />
              <ThemedText variant="bodySmall" color="saffron" style={{ flex: 1, fontWeight: '600' }}>
                Reading Preamble aloud... Tap the speaker icon to pause.
              </ThemedText>
            </View>
          )}

          {/* TAB 1: CEREMONIAL TEXT */}
          {activeTab === 'ceremonial' && (
            <View style={styles.ceremonialContainer}>
              {/* Illuminated Card */}
              <Card
                variant="surfaceElevated"
                style={[
                  styles.parchmentCard,
                  {
                    borderColor: colors.saffron,
                    backgroundColor: colors.surface,
                  },
                ]}>
                <View style={styles.ceremonialHeader}>
                  <ThemedText variant="caption" color="saffron" style={styles.emblemText}>
                    GOVERNMENT OF INDIA • LEGISLATIVE ARCHIVES
                  </ThemedText>
                  <ThemedText variant="h1" color="navy" style={styles.ceremonialTitle}>
                    THE CONSTITUTION OF INDIA
                  </ThemedText>
                  <ThemedText variant="caption" color="muted" style={styles.preambleLabel}>
                    PREAMBLE
                  </ThemedText>
                  <View style={[styles.decorativeDivider, { backgroundColor: colors.saffron }]} />
                </View>

                {/* Main Ceremonial Body */}
                <ThemedText variant="legalText" color="primary" style={styles.preambleBody}>
                  <ThemedText style={{ fontWeight: '700', fontSize: 18, color: colors.navy }}>
                    WE, THE PEOPLE OF INDIA,{' '}
                  </ThemedText>
                  having solemnly resolved to constitute India into a{' '}
                  <ThemedText
                    onPress={() => setSelectedWord(PREAMBLE_TERMS[0])}
                    style={[styles.clickableTerm, { color: colors.saffron, backgroundColor: colors.saffronLight }]}>
                    SOVEREIGN
                  </ThemedText>{' '}
                  <ThemedText
                    onPress={() => setSelectedWord(PREAMBLE_TERMS[1])}
                    style={[styles.clickableTerm, { color: colors.green, backgroundColor: colors.greenLight }]}>
                    SOCIALIST
                  </ThemedText>{' '}
                  <ThemedText
                    onPress={() => setSelectedWord(PREAMBLE_TERMS[2])}
                    style={[styles.clickableTerm, { color: colors.navy, backgroundColor: colors.navyLight }]}>
                    SECULAR
                  </ThemedText>{' '}
                  <ThemedText
                    onPress={() => setSelectedWord(PREAMBLE_TERMS[3])}
                    style={[styles.clickableTerm, { color: colors.saffron, backgroundColor: colors.saffronLight }]}>
                    DEMOCRATIC
                  </ThemedText>{' '}
                  <ThemedText
                    onPress={() => setSelectedWord(PREAMBLE_TERMS[4])}
                    style={[styles.clickableTerm, { color: colors.green, backgroundColor: colors.greenLight }]}>
                    REPUBLIC
                  </ThemedText>{' '}
                  and to secure to all its citizens:
                </ThemedText>

                <View style={styles.clausesList}>
                  <View style={styles.clauseItem}>
                    <ThemedText
                      onPress={() => setSelectedWord(PREAMBLE_TERMS[5])}
                      style={[styles.clauseTerm, { color: colors.navy }]}>
                      JUSTICE,
                    </ThemedText>
                    <ThemedText variant="body" color="primary" style={styles.clauseText}>
                      social, economic and political;
                    </ThemedText>
                  </View>

                  <View style={styles.clauseItem}>
                    <ThemedText
                      onPress={() => setSelectedWord(PREAMBLE_TERMS[6])}
                      style={[styles.clauseTerm, { color: colors.saffron }]}>
                      LIBERTY
                    </ThemedText>
                    <ThemedText variant="body" color="primary" style={styles.clauseText}>
                      of thought, expression, belief, faith and worship;
                    </ThemedText>
                  </View>

                  <View style={styles.clauseItem}>
                    <ThemedText
                      onPress={() => setSelectedWord(PREAMBLE_TERMS[7])}
                      style={[styles.clauseTerm, { color: colors.green }]}>
                      EQUALITY
                    </ThemedText>
                    <ThemedText variant="body" color="primary" style={styles.clauseText}>
                      of status and of opportunity;
                    </ThemedText>
                  </View>

                  <View style={styles.clauseItem}>
                    <ThemedText variant="body" color="primary" style={styles.clauseLead}>
                      and to promote among them all
                    </ThemedText>
                    <ThemedText
                      onPress={() => setSelectedWord(PREAMBLE_TERMS[8])}
                      style={[styles.clauseTerm, { color: colors.navy }]}>
                      FRATERNITY
                    </ThemedText>
                    <ThemedText variant="body" color="primary" style={styles.clauseText}>
                      assuring the dignity of the individual and the unity and integrity of the Nation;
                    </ThemedText>
                  </View>
                </View>

                {/* Enactment Clause */}
                <View style={[styles.enactmentBox, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
                  <ThemedText variant="bodyMedium" color="primary" style={styles.enactmentText}>
                    IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.
                  </ThemedText>
                </View>

                <ThemedText variant="caption" color="muted" style={styles.tapHint}>
                  💡 Tip: Tap any highlighted word above to see what it means in simple everyday language.
                </ThemedText>
              </Card>

              {/* Official Footnotes */}
              <Card variant="surfaceSubtle" style={styles.footnoteCard}>
                <ThemedText variant="label" color="primary">
                  Official Constitutional Notes & Amendments
                </ThemedText>
                {preamble.footnotes.map((fn, idx) => (
                  <ThemedText key={idx} variant="caption" color="muted" style={styles.footnoteItem}>
                    {fn}
                  </ThemedText>
                ))}
              </Card>
            </View>
          )}

          {/* TAB 2: PLAIN MEANING */}
          {activeTab === 'simple' && (
            <View style={styles.plainContainer}>
              <Card variant="surfaceElevated" style={styles.plainCard}>
                <Badge label="IN SIMPLE LANGUAGE" variant="green" />
                <ThemedText variant="h2" color="navy">
                  What does the Preamble mean for you?
                </ThemedText>
                <ThemedText variant="body" color="secondary" style={styles.plainIntro}>
                  The Preamble is like the birth certificate and promise of India. It tells every citizen who we are and what guarantees the government makes to you.
                </ThemedText>

                <View style={styles.simplePillars}>
                  <View style={[styles.pillarBox, { backgroundColor: colors.surfaceSubtle }]}>
                    <ThemedText variant="label" color="saffron">
                      1. WHO HOLDS POWER?
                    </ThemedText>
                    <ThemedText variant="body" color="primary">
                      <ThemedText style={{ fontWeight: '700' }}>{'“We, the People”: '} </ThemedText>
                      Power does not belong to any royal dynasty or foreign government. Every adult Indian holds an equal share in deciding our future through voting.
                    </ThemedText>
                  </View>

                  <View style={[styles.pillarBox, { backgroundColor: colors.surfaceSubtle }]}>
                    <ThemedText variant="label" color="green">
                      2. WHAT TYPE OF COUNTRY?
                    </ThemedText>
                    <ThemedText variant="body" color="primary">
                      An independent country (Sovereign), working for everyone’s welfare (Socialist), respecting all faiths equally (Secular), run by elected representatives (Democratic), and led by an elected President rather than a king (Republic).
                    </ThemedText>
                  </View>

                  <View style={[styles.pillarBox, { backgroundColor: colors.surfaceSubtle }]}>
                    <ThemedText variant="label" color="navy">
                      3. WHAT ARE YOUR 4 PROMISES?
                    </ThemedText>
                    <ThemedText variant="body" color="primary">
                      • <ThemedText style={{ fontWeight: '700' }}>Justice: </ThemedText>Fair treatment for all, protecting the weak.{'\n'}
                      • <ThemedText style={{ fontWeight: '700' }}>Liberty: </ThemedText>Freedom to express your views, live without fear, and worship.{'\n'}
                      • <ThemedText style={{ fontWeight: '700' }}>Equality: </ThemedText>No discrimination based on birth, caste, religion, or gender.{'\n'}
                      • <ThemedText style={{ fontWeight: '700' }}>Fraternity: </ThemedText>Living together like family with mutual respect and unity.
                    </ThemedText>
                  </View>
                </View>
              </Card>
            </View>
          )}

          {/* TAB 3: KEY TERMS */}
          {activeTab === 'terms' && (
            <View style={styles.termsContainer}>
              <ThemedText variant="caption" color="secondary">
                Tap any card to view detailed explanations and everyday examples:
              </ThemedText>
              {PREAMBLE_TERMS.map(item => (
                <Card
                  key={item.id}
                  variant="surface"
                  style={styles.termCard}
                  onPress={() => setSelectedWord(item)}>
                  <View style={styles.termHeader}>
                    <View style={styles.termNameGroup}>
                      <ThemedText variant="h3" color={item.accent}>
                        {item.word}
                      </ThemedText>
                      <ThemedText variant="bodyMedium" color="muted">
                        • {item.hindi}
                      </ThemedText>
                    </View>
                    <Badge label="EXPLORE" variant={item.accent} />
                  </View>
                  <ThemedText variant="bodyMedium" color="primary" style={{ fontWeight: '600' }}>
                    {item.meaning}
                  </ThemedText>
                  <ThemedText variant="body" color="secondary" numberOfLines={2}>
                    {item.simpleExplanation}
                  </ThemedText>
                </Card>
              ))}
            </View>
          )}

          {/* TAB 4: HISTORY & MILESTONES */}
          {activeTab === 'history' && (
            <View style={styles.historyContainer}>
              <Card variant="surfaceElevated" style={styles.historyCard}>
                <Badge label="CONSTITUTIONAL ARCHIVES" variant="saffron" />
                <ThemedText variant="h2" color="navy">
                  How the Preamble Came to Be
                </ThemedText>
                <ThemedText variant="body" color="secondary">
                  The Indian Constitution is the longest written national constitution in the world. It was crafted over nearly three years through deep democratic debate.
                </ThemedText>

                <View style={styles.milestonesList}>
                  {HISTORICAL_MILESTONES.map((m, idx) => (
                    <View key={idx} style={styles.milestoneItem}>
                      <View style={[styles.timelineDot, { backgroundColor: colors.saffron }]} />
                      <View style={styles.milestoneContent}>
                        <View style={styles.milestoneDateRow}>
                          <ThemedText variant="label" color="saffron">
                            {m.date}
                          </ThemedText>
                        </View>
                        <ThemedText variant="h3" color="navy" style={styles.milestoneTitle}>
                          {m.title}
                        </ThemedText>
                        <ThemedText variant="body" color="secondary">
                          {m.description}
                        </ThemedText>
                      </View>
                    </View>
                  ))}
                </View>
              </Card>
            </View>
          )}
        </ScrollView>

        {/* Word Definition Modal */}
        {selectedWord && (
          <Modal
            visible={!!selectedWord}
            transparent
            animationType="fade"
            onRequestClose={() => setSelectedWord(null)}>
            <Pressable style={styles.modalOverlay} onPress={() => setSelectedWord(null)}>
              <Pressable
                style={[
                  styles.modalContent,
                  { backgroundColor: colors.surfaceElevated, borderColor: colors.border },
                ]}
                onPress={e => e.stopPropagation()}>
                <View style={styles.modalHeader}>
                  <View>
                    <ThemedText variant="caption" color={selectedWord.accent} style={{ fontWeight: '700' }}>
                      KEY CONSTITUTIONAL TERM
                    </ThemedText>
                    <ThemedText variant="h1" color="navy">
                      {selectedWord.word}
                    </ThemedText>
                    <ThemedText variant="bodyMedium" color="muted">
                      {selectedWord.hindi}
                    </ThemedText>
                  </View>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setSelectedWord(null)}
                    accessibilityRole="button"
                    accessibilityLabel="Close definition">
                    <Ionicons name="close" size={24} color={colors.textPrimary} />
                  </TouchableOpacity>
                </View>

                <View style={[styles.meaningBanner, { backgroundColor: colors.surfaceSubtle }]}>
                  <ThemedText variant="bodyMedium" color="primary" style={{ fontWeight: '600' }}>
                    “{selectedWord.meaning}”
                  </ThemedText>
                </View>

                <View style={styles.modalBody}>
                  <ThemedText variant="label" color="navy">
                    What does this mean for citizens?
                  </ThemedText>
                  <ThemedText variant="body" color="secondary" style={styles.modalText}>
                    {selectedWord.simpleExplanation}
                  </ThemedText>

                  <ThemedText variant="label" color="green" style={{ marginTop: Spacing.sm }}>
                    Real-Life Everyday Example:
                  </ThemedText>
                  <View style={[styles.exampleBox, { backgroundColor: colors.greenLight, borderColor: colors.greenBorder }]}>
                    <ThemedText variant="body" color="green">
                      {selectedWord.realLifeExample}
                    </ThemedText>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.dismissBtn, { backgroundColor: colors.navy }]}
                  onPress={() => setSelectedWord(null)}>
                  <ThemedText variant="label" color="inverse">
                    Got it
                  </ThemedText>
                </TouchableOpacity>
              </Pressable>
            </Pressable>
          </Modal>
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
  tabBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.sm,
  },
  tabScroll: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
    gap: Spacing.xs,
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
  ceremonialContainer: {
    gap: Spacing.md,
  },
  parchmentCard: {
    padding: Spacing.xl,
    borderWidth: 2,
    borderRadius: BorderRadius.lg,
    gap: Spacing.lg,
  },
  ceremonialHeader: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  emblemText: {
    fontWeight: '700',
    letterSpacing: 1.2,
    fontSize: 10,
  },
  ceremonialTitle: {
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  preambleLabel: {
    letterSpacing: 3,
    fontWeight: '700',
  },
  decorativeDivider: {
    width: 60,
    height: 3,
    borderRadius: 2,
    marginTop: Spacing.xs,
  },
  preambleBody: {
    lineHeight: 28,
    textAlign: 'justify',
  },
  clickableTerm: {
    fontWeight: '700',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  clausesList: {
    gap: Spacing.md,
    paddingLeft: Spacing.sm,
  },
  clauseItem: {
    gap: 2,
  },
  clauseLead: {
    fontStyle: 'italic',
    marginBottom: 2,
  },
  clauseTerm: {
    fontWeight: '700',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  clauseText: {
    lineHeight: 24,
  },
  enactmentBox: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginTop: Spacing.xs,
  },
  enactmentText: {
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
  tapHint: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footnoteCard: {
    gap: Spacing.xs,
  },
  footnoteItem: {
    lineHeight: 18,
  },
  plainContainer: {
    gap: Spacing.md,
  },
  plainCard: {
    gap: Spacing.md,
  },
  plainIntro: {
    lineHeight: 24,
  },
  simplePillars: {
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  pillarBox: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  termsContainer: {
    gap: Spacing.md,
  },
  termCard: {
    gap: Spacing.sm,
  },
  termHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  termNameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  historyContainer: {
    gap: Spacing.md,
  },
  historyCard: {
    gap: Spacing.md,
  },
  milestonesList: {
    gap: Spacing.lg,
    marginTop: Spacing.sm,
    paddingLeft: Spacing.xs,
  },
  milestoneItem: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
  },
  milestoneContent: {
    flex: 1,
    gap: 2,
  },
  milestoneDateRow: {
    marginBottom: 2,
  },
  milestoneTitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 420,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    gap: Spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  closeBtn: {
    width: Accessibility.minTouchTarget,
    height: Accessibility.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -Spacing.sm,
    marginTop: -Spacing.sm,
  },
  meaningBanner: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  modalBody: {
    gap: Spacing.xs,
  },
  modalText: {
    lineHeight: 24,
  },
  exampleBox: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginTop: 4,
  },
  dismissBtn: {
    minHeight: Accessibility.minTouchTarget,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
});
