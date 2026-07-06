import { createContext, useEffect, useState } from "react";

export const BookmarksContext = createContext(null);

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  // Restore saved bookmarks on refresh
  useEffect(() => {
    const stored = localStorage.getItem("doubtdesk_bookmarks");
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  const persist = (next) => {
    setBookmarks(next);
    localStorage.setItem("doubtdesk_bookmarks", JSON.stringify(next));
  };

  const isBookmarked = (questionId) =>
    bookmarks.some((q) => q.id === questionId);

  const toggleBookmark = (question) => {
    const alreadySaved = isBookmarked(question.id);
    const next = alreadySaved
      ? bookmarks.filter((q) => q.id !== question.id)
      : [...bookmarks, question];
    persist(next);
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, isBookmarked, toggleBookmark }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
