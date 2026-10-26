import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys } from '@/utils/storage';

export interface SavedTopicScore {
  highScore: number;
  total: number;
  completedAt: string;
}

export function useQuizProgress() {
  const [scores, setScores] = useState<Record<string, SavedTopicScore>>({});

  useEffect(() => {
    async function loadScores() {
      const saved = await getItem<Record<string, SavedTopicScore>>(StorageKeys.QUIZ_SCORES, {});
      setScores(saved);
    }
    loadScores();
  }, []);

  const saveScore = useCallback(async (topicId: string, currentScore: number, total: number) => {
    setScores(prev => {
      const existing = prev[topicId];
      const highest = existing ? Math.max(existing.highScore, currentScore) : currentScore;
      const updated = {
        ...prev,
        [topicId]: {
          highScore: highest,
          total,
          completedAt: new Date().toISOString(),
        },
      };
      setItem(StorageKeys.QUIZ_SCORES, updated);
      return updated;
    });
  }, []);

  const getTopicScore = useCallback(
    (topicId: string): SavedTopicScore | null => {
      return scores[topicId] || null;
    },
    [scores]
  );

  return {
    scores,
    saveScore,
    getTopicScore,
  };
}

