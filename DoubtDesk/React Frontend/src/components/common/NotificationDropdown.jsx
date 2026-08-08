import {
     markNotificationAsRead,
} from "../../api/notificationService";
import { useNotifications } from "../../context/NotificationsContext";

function NotificationDropdown() {

     const {
          notifications,
          refreshNotifications,
     } = useNotifications();

     const handleRead = async (notification) => {
          if (!notification.is_read) {
               await markNotificationAsRead(notification.notification_id);
               refreshNotifications();
          }
     };

     return (
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">

               <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                         Notifications
                    </h3>
               </div>

               <div className="max-h-80 overflow-y-auto">

                    {notifications.length === 0 ? (

                         <p className="p-4 text-sm text-gray-500 dark:text-gray-400">
                              No notifications yet.
                         </p>

                    ) : (

                         notifications.map((notification) => (

                              <button
                                   key={notification.notification_id}
                                   onClick={() => handleRead(notification)}
                                   className={`w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition
                            ${!notification.is_read ? "bg-blue-50 dark:bg-blue-950" : ""}`}
                              >

                                   <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {notification.message}
                                   </p>

                                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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