import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Bookmark } from '@/types/constitution';
import { getItem, setItem, StorageKeys } from '@/utils/storage';

interface BookmarksContextValue {
  bookmarks: Bookmark[];
  isBookmarked: (articleId: string) => boolean;
  toggleBookmark: (article: { id: string; number: string; title: string; part: string | null }) => Promise<boolean>;
  removeBookmark: (articleId: string) => Promise<void>;
  clearBookmarks: () => Promise<void>;
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    async function loadBookmarks() {
      const saved = await getItem<Bookmark[]>(StorageKeys.BOOKMARKS, []);
      setBookmarks(saved);
    }
    loadBookmarks();
  }, []);

  const isBookmarked = useCallback((articleId: string) => {
    return bookmarks.some(b => b.articleId === articleId);
  }, [bookmarks]);

  const toggleBookmark = useCallback(async (article: { id: string; number: string; title: string; part: string | null }) => {
    let updated: Bookmark[];
    let wasAdded = false;

    if (bookmarks.some(b => b.articleId === article.id)) {
      updated = bookmarks.filter(b => b.articleId !== article.id);
    } else {
      const newBookmark: Bookmark = {
        id: `bm-${Date.now()}-${article.id}`,
        articleId: article.id,
        articleNumber: article.number,
        title: article.title,
        part: article.part,
        savedAt: new Date().toISOString(),
      };
      updated = [newBookmark, ...bookmarks];
      wasAdded = true;
    }

    setBookmarks(updated);
    await setItem(StorageKeys.BOOKMARKS, updated);
    return wasAdded;
  }, [bookmarks]);

  const removeBookmark = useCallback(async (articleId: string) => {
    const updated = bookmarks.filter(b => b.articleId !== articleId);
    setBookmarks(updated);
    await setItem(StorageKeys.BOOKMARKS, updated);
  }, [bookmarks]);

  const clearBookmarks = useCallback(async () => {
    setBookmarks([]);
    await setItem(StorageKeys.BOOKMARKS, []);
  }, []);

  const value = useMemo(
    () => ({
      bookmarks,
      isBookmarked,
      toggleBookmark,
      removeBookmark,
      clearBookmarks,
    }),
    [bookmarks, isBookmarked, toggleBookmark, removeBookmark, clearBookmarks]
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
}

