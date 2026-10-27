import { useEffect, useState } from "react";

const BOOKMARKS_KEY = "acadexa_bookmarks";

let globalBookmarkedIds: string[] = [];
const listeners = new Set<(ids: string[]) => void>();

const loadFromStorage = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveToStorage = (ids: string[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
};

export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    if (globalBookmarkedIds.length === 0) {
      globalBookmarkedIds = loadFromStorage();
    }
    return globalBookmarkedIds;
  });

  useEffect(() => {
    const listener = (ids: string[]) => {
      setBookmarkedIds(ids);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const updateBookmarks = (ids: string[]) => {
    globalBookmarkedIds = ids;
    saveToStorage(ids);
    listeners.forEach((listener) => listener(ids));
  };

  const toggleBookmark = (courseId: string) => {
    const newIds = globalBookmarkedIds.includes(courseId)
      ? globalBookmarkedIds.filter((id) => id !== courseId)
      : [...globalBookmarkedIds, courseId];
    updateBookmarks(newIds);
  };

  const isBookmarked = (courseId: string) => globalBookmarkedIds.includes(courseId);

  const clearBookmarks = () => {
    updateBookmarks([]);
  };

  return {
    bookmarkedIds,
    toggleBookmark,
    isBookmarked,
    clearBookmarks,
  };
}
