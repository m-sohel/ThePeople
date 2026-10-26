import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { useSettings } from '@/context/SettingsContext';
import { useQuizProgress } from '@/hooks/useQuizProgress';
import { QUIZ_TOPICS, QuizTopic } from '@/data/quiz-data';
import { Spacing, BorderRadius, Accessibility } from '@/constants/layout';

export default function QuizTabScreen() {
  const router = useRouter();
  const { colors } = useSettings();
  const { getTopicScore, saveScore, scores } = useQuizProgress();

  // Active quiz runner state
  const [activeTopic, setActiveTopic] = useState<QuizTopic | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Calculate total mastery statistics
  const totalStats = useMemo(() => {
    let completedCount = 0;
    let earnedPoints = 0;
    let possiblePoints = 0;

    for (const t of QUIZ_TOPICS) {
      const saved = scores[t.id];
      possiblePoints += t.questions.length;
      if (saved) {
        completedCount++;
        earnedPoints += saved.highScore;
      }
    }

    return {
      completedCount,
      totalTopics: QUIZ_TOPICS.length,
      earnedPoints,
      possiblePoints,
      percentage: possiblePoints > 0 ? Math.round((earnedPoints / possiblePoints) * 100) : 0,
    };
  }, [scores]);

  const startQuiz = (topic: QuizTopic) => {
    setActiveTopic(topic);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentScore(0);
    setQuizFinished(false);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return; // Locked once answered
    setSelectedOption(index);
    setIsAnswerSubmitted(true);

    const question = activeTopic!.questions[currentQuestionIdx];
    if (index === question.correctIndex) {
      setCurrentScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = async () => {
    if (!activeTopic) return;

    if (currentQuestionIdx < activeTopic.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz complete
      setQuizFinished(true);
      await saveScore(activeTopic.id, currentScore, activeTopic.questions.length);
    }
  };

  const quitQuiz = () => {
    setActiveTopic(null);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizFinished(false);
  };

  const shareQuizScore = async () => {
    if (!activeTopic) return;
    try {
      const pct = Math.round((currentScore / activeTopic.questions.length) * 100);
      const message = `🇮🇳 Constitution Quiz — ThePeople App
I scored ${currentScore}/${activeTopic.questions.length} (${pct}%) on the "${activeTopic.title}" Quiz!

Test your constitutional knowledge and learn your rights:
Download ThePeople App.`;

      await Share.share({ message });
    } catch (e) {
      console.warn('Share quiz score error:', e);
    }
  };

  // ----------------------------------------------------
  // VIEW 1: ACTIVE QUIZ RUNNER
  // ----------------------------------------------------
  if (activeTopic) {
    const currentQ = activeTopic.questions[currentQuestionIdx];
    const totalQ = activeTopic.questions.length;
    const progressPercent = ((currentQuestionIdx + (isAnswerSubmitted ? 1 : 0)) / totalQ) * 100;

    if (quizFinished) {
      const percentage = Math.round((currentScore / totalQ) * 100);
      const isPerfect = currentScore === totalQ;

      return (
        <ThemedView variant="background" style={styles.container}>
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <Header title="Quiz Complete" showBack onBack={quitQuiz} />
            <ScrollView contentContainerStyle={styles.resultScroll} showsVerticalScrollIndicator={false}>
              <Card variant="surfaceElevated" style={styles.resultCard}>
                <View style={styles.resultBadgeWrap}>
                  <Badge
                    label={isPerfect ? 'PERFECT SCORE' : percentage >= 70 ? 'PASSED' : 'COMPLETED'}
                    variant={isPerfect ? 'saffron' : percentage >= 70 ? 'green' : 'navy'}
                  />
                </View>

                <ThemedText variant="display" color={isPerfect ? 'saffron' : 'navy'} style={styles.resultScoreText}>
                  {currentScore} / {totalQ}
                </ThemedText>

                <ThemedText variant="h2" color="navy" style={styles.resultHeadline}>
                  {isPerfect
                    ? '🌟 Samvidhan Scholar!'
                    : percentage >= 70
                    ? '🎉 Well Done, Citizen!'
                    : '📚 Keep Learning!'}
                </ThemedText>

                <ThemedText variant="body" color="secondary" style={styles.resultSubtext}>
                  {isPerfect
                    ? `You scored a perfect 100% on "${activeTopic.title}". You have an exceptional grasp of India’s constitutional foundations!`
                    : percentage >= 70
                    ? `You scored ${percentage}% on "${activeTopic.title}". Great understanding of your rights and duties!`
                    : `You scored ${percentage}%. Review the articles and take the quiz again to master this topic.`}
                </ThemedText>

                <View style={styles.resultActions}>
                  <Button
                    title="Share Score with Friends"
                    onPress={shareQuizScore}
                    variant="secondary"
                    icon={<Ionicons name="share-social-outline" size={18} color="#FFFFFF" />}
                  />
                  <Button
                    title="Retake Quiz"
                    onPress={() => startQuiz(activeTopic)}
                    variant="outline"
                    icon={<Ionicons name="refresh-outline" size={18} color={colors.navy} />}
                  />
                  <Button
                    title="Back to All Topics"
                    onPress={quitQuiz}
                    variant="ghost"
                  />
                </View>
              </Card>
            </ScrollView>
          </SafeAreaView>
        </ThemedView>
      );
    }

    return (
      <ThemedView variant="background" style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Runner Header */}
          <View style={[styles.runnerHeader, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={quitQuiz}
              accessibilityRole="button"
              accessibilityLabel="Exit quiz">
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <View style={styles.runnerTitleGroup}>
              <ThemedText variant="caption" color="saffron" style={{ fontWeight: '700' }}>
                {activeTopic.title.toUpperCase()}
              </ThemedText>
              <ThemedText variant="h3" color="navy">
                Question {currentQuestionIdx + 1} of {totalQ}
              </ThemedText>
            </View>
            <Badge label={`SCORE ${currentScore}`} variant="navy" />
          </View>

          {/* Progress Bar */}
          <View style={[styles.progressTrack, { backgroundColor: colors.surfaceSubtle }]}>
            <View
              style={[
                styles.progressBar,
                {
                  backgroundColor: colors.saffron,
                  width: `${progressPercent}%`,
                },
              ]}
            />
          </View>

          <ScrollView contentContainerStyle={styles.questionScroll} showsVerticalScrollIndicator={false}>
            {/* Question Text Card */}
            <Card variant="surfaceElevated" style={styles.questionCard}>
              <ThemedText variant="h2" color="navy" style={styles.questionText}>
                {currentQ.question}
              </ThemedText>
            </Card>

            {/* Options List */}
            <View style={styles.optionsList}>
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let optBg = colors.surface;
                let optBorder = colors.border;
                let optText = colors.textPrimary;

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optBg = colors.greenLight;
                    optBorder = colors.green;
                    optText = colors.green;
                  } else if (isSelected && !isCorrect) {
                    optBg = colors.errorLight;
                    optBorder = colors.error;
                    optText = colors.error;
                  }
                } else if (isSelected) {
                  optBg = colors.navyLight;
                  optBorder = colors.navy;
                  optText = colors.navy;
                }

                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.optionButton,
                      {
                        backgroundColor: optBg,
                        borderColor: optBorder,
                      },
                    ]}
                    onPress={() => handleSelectOption(idx)}
                    activeOpacity={0.7}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: isSelected, disabled: isAnswerSubmitted }}>
                    <View
                      style={[
                        styles.radioCircle,
                        {
                          borderColor: optBorder,
                          backgroundColor: isAnswerSubmitted && isCorrect ? colors.green : 'transparent',
                        },
                      ]}>
                      {isAnswerSubmitted && isCorrect && (
                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <Ionicons name="close" size={14} color={colors.error} />
                      )}
                      {!isAnswerSubmitted && isSelected && (
                        <View style={[styles.radioDot, { backgroundColor: colors.navy }]} />
                      )}
                    </View>
                    <ThemedText variant="body" style={[styles.optionText, { color: optText }]}>
                      {option}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Post-Answer Explanation Banner */}
            {isAnswerSubmitted && (
              <Card
                variant="surface"
                style={[
                  styles.explanationCard,
                  {
                    borderLeftColor: selectedOption === currentQ.correctIndex ? colors.green : colors.saffron,
                    borderLeftWidth: 4,
                  },
                ]}>
                <View style={styles.expHeaderRow}>
                  <Ionicons
                    name={selectedOption === currentQ.correctIndex ? 'checkmark-circle' : 'information-circle'}
                    size={22}
                    color={selectedOption === currentQ.correctIndex ? colors.green : colors.saffron}
                  />
                  <ThemedText
                    variant="label"
                    color={selectedOption === currentQ.correctIndex ? 'green' : 'saffron'}>
                    {selectedOption === currentQ.correctIndex ? 'CORRECT ANSWER' : 'CONSTITUTIONAL EXPLANATION'}
                  </ThemedText>
                </View>

                <ThemedText variant="body" color="primary" style={styles.expText}>
                  {currentQ.explanation}
                </ThemedText>

                {currentQ.relatedArticle && (
                  <TouchableOpacity
                    style={[styles.readRelatedBtn, { backgroundColor: colors.surfaceSubtle }]}
                    onPress={() => router.push(`/article/${currentQ.relatedArticle}` as any)}>
                    <ThemedText variant="caption" color="navy" style={{ fontWeight: '600' }}>
                      Read Article in detail →
                    </ThemedText>
                  </TouchableOpacity>
                )}

                <Button
                  title={currentQuestionIdx < totalQ - 1 ? 'Next Question →' : 'See Final Score 🎉'}
                  onPress={handleNextQuestion}
                  variant="primary"
                  style={{ marginTop: Spacing.sm }}
                />
              </Card>
            )}
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    );
  }

  // ----------------------------------------------------
  // VIEW 2: TOPIC SELECTION & STATS DIRECTORY
  // ----------------------------------------------------
  return (
    <ThemedView variant="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
          <View>
            <ThemedText variant="caption" color="saffron" style={styles.subTitle}>
              INTERACTIVE CITIZEN CHALLENGE
            </ThemedText>
            <ThemedText variant="h1" color="navy">
              Constitution Quiz
            </ThemedText>
          </View>
          <Badge label="LEARN & TEST" variant="navy" />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Overall Citizen Mastery Banner */}
          <Card variant="surfaceElevated" style={styles.masteryBanner}>
            <View style={styles.masteryHeader}>
              <View>
                <Badge label="YOUR CONSTITUTIONAL MASTERY" variant="saffron" />
                <ThemedText variant="h2" color="navy" style={{ marginTop: Spacing.xs }}>
                  {totalStats.percentage}% Citizen Score
                </ThemedText>
              </View>
              <View style={[styles.masteryPill, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
                <ThemedText variant="h3" color="saffron">
                  {totalStats.earnedPoints}/{totalStats.possiblePoints}
                </ThemedText>
                <ThemedText variant="caption" color="muted">
                  Points
                </ThemedText>
              </View>
            </View>

            <ThemedText variant="body" color="secondary">
              Answer quick multiple-choice quizzes designed to teach you your fundamental rights, duties, and how the Republic of India works.
            </ThemedText>

            {/* Badges Earned */}
            <View style={styles.badgesRow}>
              <View
                style={[
                  styles.badgePill,
                  {
                    backgroundColor: totalStats.percentage >= 100 ? colors.saffronLight : colors.surfaceSubtle,
                    borderColor: totalStats.percentage >= 100 ? colors.saffron : colors.border,
                  },
                ]}>
                <Ionicons
                  name="ribbon"
                  size={16}
                  color={totalStats.percentage >= 100 ? colors.saffron : colors.textMuted}
                />
                <ThemedText
                  variant="caption"
                  color={totalStats.percentage >= 100 ? 'saffron' : 'muted'}
                  style={{ fontWeight: '600' }}>
                  Samvidhan Scholar
                </ThemedText>
              </View>

              <View
                style={[
                  styles.badgePill,
                  {
                    backgroundColor: scores['rights']?.highScore >= 4 ? colors.greenLight : colors.surfaceSubtle,
                    borderColor: scores['rights']?.highScore >= 4 ? colors.green : colors.border,
                  },
                ]}>
                <Ionicons
                  name="shield-checkmark"
                  size={16}
                  color={scores['rights']?.highScore >= 4 ? colors.green : colors.textMuted}
                />
                <ThemedText
                  variant="caption"
                  color={scores['rights']?.highScore >= 4 ? 'green' : 'muted'}
                  style={{ fontWeight: '600' }}>
                  Rights Defender
                </ThemedText>
              </View>
            </View>
          </Card>

          {/* Topics List */}
          <ThemedText variant="h3" color="primary" style={styles.sectionHeading}>
            Select a Quiz Topic
          </ThemedText>

          <View style={styles.topicsGrid}>
            {QUIZ_TOPICS.map(topic => {
              const saved = getTopicScore(topic.id);
              const isPassed = saved && saved.highScore === topic.questions.length;

              return (
                <Card key={topic.id} variant="surface" style={styles.topicCard}>
                  <View style={styles.topicHeader}>
                    <View style={styles.topicBadgeRow}>
                      <Badge label={`${topic.questions.length} QUESTIONS`} variant={topic.badge} />
                      {saved && (
                        <ThemedText
                          variant="caption"
                          color={isPassed ? 'saffron' : 'navy'}
                          style={{ fontWeight: '700' }}>
                          Best: {saved.highScore}/{topic.questions.length} {isPassed ? '⭐' : ''}
                        </ThemedText>
                      )}
                    </View>
                    <ThemedText variant="h2" color="navy" style={styles.topicTitle}>
                      {topic.title}
                    </ThemedText>
                    <ThemedText variant="body" color="secondary" style={styles.topicSubtitle}>
                      {topic.subtitle}
                    </ThemedText>
                  </View>

                  <Button
                    title={saved ? 'Retake Challenge' : 'Start Quiz'}
                    onPress={() => startQuiz(topic)}
                    variant={saved ? 'outline' : 'primary'}
                    icon={<Ionicons name="play" size={16} color={saved ? colors.navy : colors.textInverse} />}
                  />
                </Card>
              );
            })}
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
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  masteryBanner: {
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  masteryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masteryPill: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  sectionHeading: {
    marginBottom: -Spacing.xs,
  },
  topicsGrid: {
    gap: Spacing.md,
  },
  topicCard: {
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  topicHeader: {
    gap: Spacing.xs,
  },
  topicBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topicTitle: {
    marginTop: 2,
    letterSpacing: -0.2,
  },
  topicSubtitle: {
    lineHeight: 22,
  },

  // Runner Styles
  runnerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  closeBtn: {
    width: Accessibility.minTouchTarget,
    height: Accessibility.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -Spacing.sm,
  },
  runnerTitleGroup: {
    flex: 1,
    alignItems: 'center',
  },
  progressTrack: {
    height: 4,
    width: '100%',
  },
  progressBar: {
    height: '100%',
  },
  questionScroll: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  questionCard: {
    padding: Spacing.lg,
  },
  questionText: {
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  optionsList: {
    gap: Spacing.sm,
  },
  optionButton: {
    minHeight: Accessibility.minTouchTarget + 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    gap: Spacing.md,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  explanationCard: {
    padding: Spacing.lg,
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  expHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  expText: {
    lineHeight: 24,
  },
  readRelatedBtn: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: Spacing.xs,
  },

  // Result Styles
  resultScroll: {
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  resultCard: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
  },
  resultBadgeWrap: {
    marginBottom: Spacing.xs,
  },
  resultScoreText: {
    letterSpacing: -0.5,
  },
  resultHeadline: {
    textAlign: 'center',
  },
  resultSubtext: {
    textAlign: 'center',
    lineHeight: 24,
  },
  resultActions: {
    width: '100%',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
});
