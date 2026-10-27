import { useEffect, useState } from "react";

const BOOKMARKS_KEY = "acadexa_bookmarks";

export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (courseId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const isBookmarked = (courseId: string) => bookmarkedIds.includes(courseId);

  const clearBookmarks = () => setBookmarkedIds([]);

  return {
    bookmarkedIds,
    toggleBookmark,
    isBookmarked,
    clearBookmarks,
  };
}
