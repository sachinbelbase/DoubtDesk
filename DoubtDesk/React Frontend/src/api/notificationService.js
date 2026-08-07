import axiosClient from "./axiosClient";

// Get all notifications
export const getNotifications = () => axiosClient.get("/notifications");

// Mark notification as read
export const markNotificationAsRead = (notificationId) =>
  axiosClient.put(`/notifications/${notificationId}/read`);
