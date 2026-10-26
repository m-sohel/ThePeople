import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Share } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { useSettings } from '@/context/SettingsContext';
import { useConstitution } from '@/hooks/useConstitution';
import { Spacing, BorderRadius, Accessibility } from '@/constants/layout';

export default function ScheduleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useSettings();
  const { schedules } = useConstitution();

  const schedule = schedules.find(s => s.id === id || s.number.toString() === id);

  const handleShare = async () => {
    if (!schedule) return;
    try {
      await Share.share({
        title: schedule.name,
        message: `📜 Constitution of India — ${schedule.name}
Title: ${schedule.title}

${schedule.fullText.slice(0, 1000)}${schedule.fullText.length > 1000 ? '...' : ''}

— Shared via ThePeople App`,
      });
    } catch (e) {
      console.warn('Share failed:', e);
    }
  };

  if (!schedule) {
    return (
      <ThemedView variant="background" style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <Header title="Schedule Not Found" showBack />
          <View style={styles.notFound}>
            <ThemedText variant="body" color="secondary">
              Could not locate schedule data for {id}.
            </ThemedText>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView variant="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Header
          title={schedule.name}
          subtitle={`Schedule ${schedule.number} of 12`}
          showBack
          rightAction={
            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}
              onPress={handleShare}
              accessibilityRole="button"
              accessibilityLabel="Share schedule">
              <Ionicons name="share-social-outline" size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          }
        />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Schedule Banner */}
          <Card variant="surfaceElevated" style={styles.bannerCard}>
            <Badge label={`CONSTITUTIONAL SCHEDULE ${schedule.number}`} variant="saffron" />
            <ThemedText variant="h1" color="navy" style={styles.scheduleTitle}>
              {schedule.title}
            </ThemedText>
            <ThemedText variant="caption" color="secondary">
              Official Gazette Pages {schedule.startPage} – {schedule.endPage}
            </ThemedText>
          </Card>

          {/* Operative Full Text */}
          <Card variant="surface" style={styles.textCard}>
            <View style={styles.textHeaderRow}>
              <ThemedText variant="label" color="primary">
                Official Verbatim Text
              </ThemedText>
              <Badge label="OFFICIAL RECORD" variant="navy" />
            </View>
            <ThemedText variant="legalText" color="primary" style={styles.legalBody}>
              {schedule.fullText}
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
  iconBtn: {
    width: Accessibility.minTouchTarget,
    height: Accessibility.minTouchTarget,
    borderRadius: BorderRadius.md,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  bannerCard: {
    gap: Spacing.xs,
  },
  scheduleTitle: {
    letterSpacing: -0.3,
  },
  textCard: {
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  textHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.xs,
  },
  legalBody: {
    lineHeight: 26,
  },
});

