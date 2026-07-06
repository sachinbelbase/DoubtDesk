import { Bell } from "lucide-react";
import Button from "../common/Button";
import { useNotifications } from "../../hooks/useNotifications";

function NotificationList() {

     const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

     if (notifications.length === 0) {
          return (
               <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
                    You're all caught up — no notifications yet.
               </div>
          );
     }

     return (
          <div className="bg-white rounded-xl shadow overflow-hidden">

               {unreadCount > 0 && (
                    <div className="flex justify-end p-4 border-b">
                         <Button
                              variant="outline"
                              size="sm"
                              onClick={markAllAsRead}
                         >
                              Mark all as read
                         </Button>
                    </div>
               )}

               <div className="divide-y">

                    {notifications.map((notification) => (
                         <button
                              key={notification.id}
                              onClick={() => markAsRead(notification.id)}
                              className={`
                                   w-full
                                   flex
                                   items-start
                                   gap-4
                                   p-5
                                   text-left
                                   hover:bg-gray-50
                                   transition
                                   ${notification.read ? "bg-white" : "bg-blue-50"}
                              `}
                         >
                              <Bell
                                   size={20}
                                   className={`mt-1 ${notification.read ? "text-gray-400" : "text-blue-600"}`}
                              />

                              <div className="flex-1">

                                   <p className={notification.read ? "text-gray-600" : "text-gray-900 font-medium"}>
                                        {notification.message}
                                   </p>

                                   <p className="text-sm text-gray-400 mt-1">
                                        {notification.time}
                                   </p>

                              </div>

                              {!notification.read && (
                                   <span className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                              )}

                         </button>
                    ))}

               </div>

          </div>
     );
}

export default NotificationList;
