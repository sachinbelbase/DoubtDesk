import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import {
     getNotifications,
     markNotificationAsRead,
} from "../../api/notificationService";

function NotificationBell() {

     const [notifications, setNotifications] = useState([]);
     const [open, setOpen] = useState(false);

     const fetchNotifications = async () => {
          try {
               const response = await getNotifications();
               setNotifications(response.data);
          } catch (err) {
               console.error(err);
          }
     };

     useEffect(() => {
          fetchNotifications();
     }, []);

     const unreadCount = notifications.filter(
          (notification) => !notification.is_read
     ).length;

     const handleNotificationClick = async (notification) => {

          if (!notification.is_read) {
               await markNotificationAsRead(notification.notification_id);

               setNotifications((prev) =>
                    prev.map((item) =>
                         item.notification_id === notification.notification_id
                              ? { ...item, is_read: true }
                              : item
                    )
               );
          }

          // Later we can navigate to the related question.
     };

     return (
          <div className="relative">

               <button
                    onClick={() => setOpen(!open)}
                    className="relative p-2 rounded-lg hover:bg-gray-100 transition"
               >

                    <Bell size={22} />

                    {unreadCount > 0 && (
                         <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                              {unreadCount}
                         </span>
                    )}

               </button>

               {open && (

                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">

                         <div className="p-4 border-b">

                              <h3 className="font-semibold">
                                   Notifications
                              </h3>

                         </div>

                         <div className="max-h-80 overflow-y-auto">

                              {notifications.length === 0 ? (

                                   <p className="p-4 text-sm text-gray-500">
                                        No notifications.
                                   </p>

                              ) : (

                                   notifications.map((notification) => (

                                        <button
                                             key={notification.notification_id}
                                             onClick={() =>
                                                  handleNotificationClick(notification)
                                             }
                                             className={`w-full text-left p-4 border-b hover:bg-gray-50 transition
                                             ${!notification.is_read
                                                       ? "bg-blue-50"
                                                       : ""
                                                  }`}
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

               )}

          </div>
     );
}

export default NotificationBell;