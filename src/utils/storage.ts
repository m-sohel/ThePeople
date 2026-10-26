import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  SETTINGS: '@thepeople_settings',
  BOOKMARKS: '@thepeople_bookmarks',
  QUIZ_SCORES: '@thepeople_quiz_scores',
  READING_HISTORY: '@thepeople_history',
} as const;

export async function getItem<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[Storage] Failed to read key: ${key}`, error);
    return defaultValue;
  }
}

export async function setItem<T>(key: string, value: T): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[Storage] Failed to write key: ${key}`, error);
    return false;
  }
}

export async function removeItem(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`[Storage] Failed to remove key: ${key}`, error);
    return false;
  }
}

