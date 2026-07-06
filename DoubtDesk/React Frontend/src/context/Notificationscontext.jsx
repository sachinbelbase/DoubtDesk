import { createContext, useEffect, useState } from "react";
import { notifications as seedNotifications } from "../data/notifications";

export const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Load saved state, or fall back to the seed data on first run
  useEffect(() => {
    const stored = localStorage.getItem("doubtdesk_notifications");
    setNotifications(stored ? JSON.parse(stored) : seedNotifications);
  }, []);

  const persist = (next) => {
    setNotifications(next);
    localStorage.setItem("doubtdesk_notifications", JSON.stringify(next));
  };

  const markAsRead = (id) => {
    persist(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    persist(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{ notifications, markAsRead, markAllAsRead, unreadCount }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
