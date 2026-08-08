import { createContext, useEffect, useState, useContext } from "react";
import { getNotifications } from "../api/notificationService";

export const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("doubtdesk_access_token");
    if (token) {
      fetchNotifications();
    }

    // Keep notifications (and the unread badge) live without needing a
    // manual reload — poll every 20s while a user is logged in.
    const intervalId = setInterval(() => {
      if (localStorage.getItem("doubtdesk_access_token")) {
        fetchNotifications();
      }
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter(
    (n) => !n.is_read
  ).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        refreshNotifications: fetchNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}