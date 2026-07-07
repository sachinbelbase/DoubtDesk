import Button from "./Button";

function SettingsCard({ role }) {

     const roleTitle = {
          student: "Student",
          teacher: "Teacher",
          admin: "Administrator",
     };

     return (

          <div className="bg-white rounded-xl shadow p-6">

               <h2 className="text-xl font-semibold">
                    {roleTitle[role]} Settings
               </h2>

               <p className="text-gray-500 mt-1">
                    Manage your account preferences.
               </p>

               <div className="mt-8 space-y-6">

                    {/* Change Password */}

                    <div className="flex items-center justify-between">

                         <div>

                              <h3 className="font-medium">
                                   Change Password
                              </h3>

                              <p className="text-sm text-gray-500">
                                   Update your account password.
                              </p>

                         </div>

                         <Button
                              variant="outline"
                              size="sm"
                         >
                              Coming Soon
                         </Button>

                    </div>

                    {/* Notifications */}

                    <div className="flex items-center justify-between">

                         <div>

                              <h3 className="font-medium">
                                   Notifications
                              </h3>

                              <p className="text-sm text-gray-500">
                                   Manage notification preferences.
                              </p>

                         </div>

                         <Button
                              variant="outline"
                              size="sm"
                         >
                              Coming Soon
                         </Button>

                    </div>

                    {/* Theme */}

                    <div className="flex items-center justify-between">

                         <div>

                              <h3 className="font-medium">
                                   Theme
                              </h3>

                              <p className="text-sm text-gray-500">
                                   Dark mode support will be available later.
                              </p>

                         </div>

                         <Button
                              variant="outline"
                              size="sm"
                         >
                              Coming Soon
                         </Button>

                    </div>

               </div>

          </div>

     );

}

export default SettingsCard;