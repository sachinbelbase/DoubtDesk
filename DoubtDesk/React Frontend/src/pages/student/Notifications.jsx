import DashboardLayout from "../../components/layout/DashboardLayout";
import NotificationList from "../../components/student/NotificationList";

function Notifications() {
     return (
          <DashboardLayout role="student">

               <div className="mb-6">

                    <h1 className="text-3xl font-bold">
                         Notifications
                    </h1>

                    <p className="text-gray-500 mt-2">
                         Stay updated on activity related to your questions.
                    </p>

               </div>

               <NotificationList />

          </DashboardLayout>
     );
}

export default Notifications;
