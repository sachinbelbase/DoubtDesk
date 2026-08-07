import { useEffect, useState } from "react";
import {
     getNotifications,
     markNotificationAsRead,
} from "../../api/notificationService";
import { useNotifications } from "../../context/NotificationsContext";

function NotificationDropdown() {

     const fetchNotifications = async () => {
          try {
               const response = await getNotifications();
               setNotifications(response.data);
          } catch (err) {
               console.error(err);
          }
     };

     const {
          notifications,
          refreshNotifications,
     } = useNotifications();

     const handleRead = async (notification) => {
          if (!notification.is_read) {
               await markNotificationAsRead(notification.notification_id);
               refreshNotifications();

               setNotifications((prev) =>
                    prev.map((item) =>
                         item.notification_id === notification.notification_id
                              ? { ...item, is_read: true }
                              : item
                    )
               );
          }
     };

     return (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">

               <div className="p-4 border-b">
                    <h3 className="font-semibold">
                         Notifications
                    </h3>
               </div>

               <div className="max-h-80 overflow-y-auto">

                    {notifications.length === 0 ? (

                         <p className="p-4 text-sm text-gray-500">
                              No notifications yet.
                         </p>

                    ) : (

                         notifications.map((notification) => (

                              <button
                                   key={notification.notification_id}
                                   onClick={() => handleRead(notification)}
                                   className={`w-full text-left p-4 border-b hover:bg-gray-50 transition
                            ${!notification.is_read ? "bg-blue-50" : ""}`}
                              >

                                   <p className="text-sm font-medium">
                                        {notification.message}
                                   </p>

                                   <p className="text-xs text-gray-500 mt-1">
                                        {new Date(
                                             notification.created_at
                                        ).toLocaleString()}
                                   </p>

                              </button>

                         ))

                    )}

               </div>

          </div>
     );
}

export default NotificationDropdown;