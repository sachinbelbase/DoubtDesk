import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";

export function useBookmarks() {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error("useBookmarks must be used inside a <BookmarksProvider>");
  }

  return context;
}
